# nyalain server api
# uvicorn predict:app --reload

import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import joblib
import pandas as pd
import json

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("SepsisAI")
AI_ASSETS = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        logger.info("Memuat Otak AI dan Komponennya...")
        AI_ASSETS['model'] = joblib.load('sepsis_xgboost_model.pkl')
        AI_ASSETS['preprocessor'] = joblib.load('sepsis_preprocessor.pkl')
        
        with open('fitur_input.json', 'r') as f:
            AI_ASSETS['urutan_fitur'] = json.load(f)
            
        logger.info("✅ AI Siap Menerima Pasien!")
        yield
    except Exception as e:
        logger.critical(f"Gagal memuat komponen AI: {e}")
        raise SystemExit("Server dihentikan karena file .pkl/.json bermasalah.")
    finally:
        AI_ASSETS.clear()

app = FastAPI(title="Sepsis Hybrid AI Backend", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PasienInput(BaseModel):
    respiratory_rate_mean: float = Field(..., description="Laju napas per menit")
    sysbp_mean: float = Field(..., description="Tekanan darah sistolik")
    lactate_mmol: float = Field(..., description="Kadar laktat")
    age: float = Field(..., description="Usia pasien")
    hr_mean: float = Field(..., description="Rata-rata detak jantung")
    temp_celsius_mean: float = Field(..., description="Suhu tubuh celsius")
    sofa_score: float = Field(..., description="Skor SOFA awal")
    gcs_total: float = Field(15.0, description="Skor GCS (default 15 jika tidak diisi)")

    model_config = {
        "extra": "allow" 
    }

@app.post("/predict")
async def prediksi_sepsis(data_masuk: PasienInput):
    payload_dict = data_masuk.model_dump()

    try:
        df_input = pd.DataFrame([payload_dict], columns=AI_ASSETS['urutan_fitur'])
        data_siap_ai = AI_ASSETS['preprocessor'].transform(df_input)
        probabilitas_ai = float(AI_ASSETS['model'].predict_proba(data_siap_ai)[0][1])
        persentase_ai = float(round(probabilitas_ai * 100, 1))
        label_ai_murni = int(1 if probabilitas_ai > 0.50 else 0)

    except Exception as e:
        logger.error(f"Mesin AI gagal memproses data: {e}")
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Gagal memproses prediksi. Pastikan fitur data lengkap sesuai model AI."
        )

    skor_qsofa = 0
    alasan_medis = []
    
    napas = float(data_masuk.get('respiratory_rate_mean', 20))
    tensi = float(data_masuk.get('sysbp_mean', 120))
    gcs = float(data_masuk.get('gcs_total', 15))
    
    if napas >= 22:
        skor_qsofa += 1
        alasan_medis.append(f"Laju pernapasan cepat ({napas}x/menit)")
    if tensi <= 100:
        skor_qsofa += 1
        alasan_medis.append(f"Tekanan darah sistolik rendah ({tensi} mmHg)")
    if gcs < 15:
        skor_qsofa += 1
        alasan_medis.append(f"Penurunan tingkat kesadaran (Skor GCS {gcs})")

    if label_ai_murni == 1 or skor_qsofa >= 2:
        status_akhir = "WASPADA SEPSIS !"
        label_final = 1
    else:
        status_akhir = "PASIEN AMAN !"
        label_final = 0

    pesan_insight = ""
    if label_ai_murni == 1 and skor_qsofa >= 2:
        pesan_insight = "Kondisi sangat kritis. Sinyal Lab/AI dan pemeriksaan fisik qSOFA sama-sama menunjukkan syok septik akut. Segera lakukan resusitasi cairan dan berikan antibiotik spektrum luas!"
    elif label_ai_murni == 1 and skor_qsofa < 2:
        pesan_insight = "Peringatan Dini (Keunggulan AI)! Secara fisik (qSOFA) pasien terlihat aman, namun AI mendeteksi anomali kritis pada darah/oksigen (Laktat/PaO2). Waspada Sepsis tersembunyi!"
    elif label_ai_murni == 0 and skor_qsofa >= 2:
        pesan_insight = "Pola darah normal (AI Aman), namun fisik pasien memburuk (qSOFA tinggi). Kemungkinan syok non-sepsis (seperti perdarahan atau masalah jantung). Lakukan observasi."
    else:
        pesan_insight = "Seluruh parameter fisik dan laboratorium berada dalam rentang aman. Lakukan observasi rutin sesuai standar ICU."

    return {
        "status_pasien": status_akhir,
        "label_final": label_final,
        "insight_klinis": pesan_insight,
        "learning_engine": {
            "label_ai": label_ai_murni,
            "probabilitas_sepsis_persen": persentase_ai,
        },
        "reasoning_engine": {
            "skor_qsofa": skor_qsofa,
            "gejala_terpantau": alasan_medis
        }
    }