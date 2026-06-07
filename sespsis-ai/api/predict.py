# nyalain server api
# uvicorn predict:app --reload

# json simulasi json
# {
#   "respiratory_rate_mean": 25,
#   "sysbp_mean": 90,
#   "lactate_mmol": 4.5,
#   "age": 60,
#   "hr_mean": 110,
#   "temp_celsius_mean": 38.5,
#   "sofa_score": 4
# }

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pandas as pd
import json

app = FastAPI(title="Sepsis Hybrid AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print("Memuat Otak AI dan Komponennya...")
xgb_model = joblib.load('sepsis_xgboost_model.pkl')
preprocessor = joblib.load('sepsis_preprocessor.pkl')
with open('fitur_input.json', 'r') as f:
    urutan_fitur = json.load(f)
print("✅ AI Siap Menerima Pasien!")

@app.post("/predict")
async def prediksi_sepsis(request: Request):
    data_masuk = await request.json()
    df_input = pd.DataFrame([data_masuk], columns=urutan_fitur)

    data_siap_ai = preprocessor.transform(df_input)
    probabilitas_ai = xgb_model.predict_proba(data_siap_ai)[0][1]
    persentase_ai = round(probabilitas_ai * 100, 1)
    
    label_ai_murni = 1 if probabilitas_ai > 0.50 else 0

    skor_qsofa = 0
    alasan_medis = []
    
    napas = float(data_masuk.get('respiratory_rate_mean', 20))
    tensi = float(data_masuk.get('sysbp_mean', 120)),
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
        status_akhir = "🚨 WASPADA SEPSIS"
        label_final = 1
    else:
        status_akhir = "✅ PASIEN AMAN"
        label_final = 0

    paket_balasan = {
        "status_pasien": status_akhir,
        "label_final": label_final, 
        "learning_engine": {
            "label_ai": label_ai_murni,
            "probabilitas_sepsis_persen": persentase_ai,
        },
        "reasoning_engine": {
            "skor_qsofa": skor_qsofa,
            "gejala_terpantau": alasan_medis
        }
    }
    
    return paket_balasan