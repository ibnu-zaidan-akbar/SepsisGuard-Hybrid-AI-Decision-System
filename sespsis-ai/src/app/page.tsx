"use client";

import { useState, useRef, useEffect } from "react";

export default function SepsisDashboard() {
  const [formData, setFormData] = useState<any>({
    age: "",
    gender: "", 
    weight_kg: "",
    height_cm: "",
    sysbp_mean: "", 
    gcs_total: "",  

    pao2_fio2_ratio: "",
    creatinine: "",
    lactate_mmol: "",
    ph_arterial: "",
    bicarbonate: "",
    inr: "",
    platelet_count: "",
    spo2_mean: "",
    respiratory_rate_mean: "",
    sirs_criteria: "",
    apache_iv: "",
    sofa_score: "",
    qsofa: "",
    fluids_ml_24h: "",
    antibiotics_24h: "",

    bmi: 24.0, ethnicity: "Caucasian", insurance: "Medicare", 
    hr_mean: 80, hr_max: 80, hr_min: 80, hr_std: 0, 
    sbp_max: 120, sbp_min: 120, sbp_std: 0, 
    dbp_mean: 80, dbp_max: 80, dbp_min: 80, dbp_std: 0, 
    map_mean: 90, 
    temp_celsius_mean: 36.5, temp_celsius_max: 36.5, temp_celsius_min: 36.5, temp_celsius_std: 0, 
    spo2_min: 98, spo2_max: 98, spo2_std: 0, 
    respiratory_rate_max: 16, respiratory_rate_min: 16, respiratory_rate_std: 0, 
    wbc: 7.0, bilirubin_total: 1.0, glucose: 100, sodium: 140, potassium: 4.0, chloride: 100, 
    hematocrit: 40, hemoglobin: 14, 
    diabetes: 0, hypertension: 0, chf: 0, copd: 0, chronic_kidney_disease: 0, liver_disease: 0, 
    immunosuppression: 0, cad: 0, atrial_fibrillation: 0, cancer_active: 0, 
    vasopressors_flag: 0, mechanical_ventilation: 0, fio2_percent: 21, sedation_score: 0, 
    vasopressor_dose_mcg_kg_min: 0, insulin_infusion_flag: 0, icu_los_hours: 0, 
    hospital_admit_source: "Emergency Room", icu_admit_time_hour: 12, day_of_week: 1, readmission_30day: 0
  });

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasilPrediksi, setHasilPrediksi] = useState<any>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const advancedFieldsList = Object.keys(formData).filter(
    (key) => formData[key] !== "" && typeof formData[key] === "number" && key !== "bmi"
  );

  useEffect(() => {
    if (hasilPrediksi && resultRef.current) {
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  }, [hasilPrediksi]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const payload: any = {};
    for (const key in formData) {
      if (key === "gender" || key === "ethnicity" || key === "insurance" || key === "hospital_admit_source") {
        payload[key] = formData[key]; 
      } else {
        payload[key] = Number(formData[key]); 
      }
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      setHasilPrediksi(data);
    } catch (error) {
      alert("Gagal terhubung ke Backend Python. Pastikan FastAPI sudah menyala!");
    } finally {
      setLoading(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-800 flex flex-col items-center justify-center py-12">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <div className="bg-blue-900 text-white p-6 rounded-xl shadow-md border-b-4 border-orange-500">
          <h1 className="text-3xl font-bold">Triage Sepsis Terintegrasi AI</h1>
          <p className="text-blue-200 mt-2">Deteksi Dini qSOFA & Analisis Asam Laktat XGBoost</p>
        </div>

        <div className="min-h-screen">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md border border-slate-200">
            {loading && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex items-center justify-center rounded-xl">
                <div className="text-xl font-bold text-blue-900 animate-pulse bg-white px-8 py-4 rounded-lg shadow-xl border">
                  Menganalisis Pola Medis...
                </div>
              </div>
            )}

            <h2 className="text-xl font-bold mb-4 border-b pb-2 text-red-600 flex items-center gap-2">
              Wajib Diisi (Parameter Kritis)
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div>
                <label className="block text-sm font-bold mb-1">Usia (Tahun)</label>
                <input required type="number" name="age" value={formData.age} onChange={handleInputChange} placeholder="Contoh: 45" className="w-full border-2 border-slate-300 p-2 rounded focus:border-blue-500 placeholder-slate-400" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Jenis Kelamin</label>
                <select required name="gender" value={formData.gender} onChange={handleInputChange} className="w-full border-2 border-slate-300 p-2 rounded focus:border-blue-500 text-slate-700">
                  <option value="" disabled>Pilih Kelamin...</option>
                  <option value="M">Laki-laki (M)</option>
                  <option value="F">Perempuan (F)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Berat Badan (Kg)</label>
                <input required type="number" step="0.1" name="weight_kg" value={formData.weight_kg} onChange={handleInputChange} placeholder="Contoh: 65.5" className="w-full border-2 border-slate-300 p-2 rounded focus:border-blue-500 placeholder-slate-400" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Tinggi Badan (Cm)</label>
                <input required type="number" step="0.1" name="height_cm" value={formData.height_cm} onChange={handleInputChange} placeholder="Contoh: 165" className="w-full border-2 border-slate-300 p-2 rounded focus:border-blue-500 placeholder-slate-400" />
              </div>

              <div>
                <label className="block text-sm font-bold mb-1 text-blue-700">Tensi Sistolik</label>
                <input required type="number" name="sysbp_mean" value={formData.sysbp_mean} onChange={handleInputChange} placeholder="Contoh: 120" className="w-full border-2 border-blue-200 bg-blue-50 p-2 rounded focus:border-blue-500 placeholder-blue-300" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1 text-blue-700">Laju Napas (RR)</label>
                <input required type="number" name="respiratory_rate_mean" value={formData.respiratory_rate_mean} onChange={handleInputChange} placeholder="Contoh: 16" className="w-full border-2 border-blue-200 bg-blue-50 p-2 rounded focus:border-blue-500 placeholder-blue-300" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1 text-blue-700">Skor GCS Total</label>
                <input required type="number" name="gcs_total" value={formData.gcs_total} onChange={handleInputChange} placeholder="Contoh: 15" className="w-full border-2 border-blue-200 bg-blue-50 p-2 rounded focus:border-blue-500 placeholder-blue-300" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1 text-blue-700">SpO2 (Oksigen %)</label>
                <input required type="number" name="spo2_mean" value={formData.spo2_mean} onChange={handleInputChange} placeholder="Contoh: 98" className="w-full border-2 border-blue-200 bg-blue-50 p-2 rounded focus:border-blue-500 placeholder-blue-300" />
              </div>

              <div>
                <label className="block text-sm font-bold mb-1 text-orange-600">PaO2/FiO2 Ratio</label>
                <input required type="number" step="0.1" name="pao2_fio2_ratio" value={formData.pao2_fio2_ratio} onChange={handleInputChange} placeholder="Contoh: 400" className="w-full border-2 border-orange-200 bg-orange-50 p-2 rounded focus:border-orange-500 placeholder-orange-300" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1 text-orange-600">Asam Laktat (mmol/L)</label>
                <input required type="number" step="0.1" name="lactate_mmol" value={formData.lactate_mmol} onChange={handleInputChange} placeholder="Contoh: 1.2" className="w-full border-2 border-orange-200 bg-orange-50 p-2 rounded focus:border-orange-500 placeholder-orange-300" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1 text-orange-600">Kreatinin</label>
                <input required type="number" step="0.1" name="creatinine" value={formData.creatinine} onChange={handleInputChange} placeholder="Contoh: 0.9" className="w-full border-2 border-orange-200 bg-orange-50 p-2 rounded focus:border-orange-500 placeholder-orange-300" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1 text-orange-600">pH Arteri</label>
                <input required type="number" step="0.1" name="ph_arterial" value={formData.ph_arterial} onChange={handleInputChange} placeholder="Contoh: 7.4" className="w-full border-2 border-orange-200 bg-orange-50 p-2 rounded focus:border-orange-500 placeholder-orange-300" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1 text-orange-600">Bikarbonat</label>
                <input required type="number" step="0.1" name="bicarbonate" value={formData.bicarbonate} onChange={handleInputChange} placeholder="Contoh: 24" className="w-full border-2 border-orange-200 bg-orange-50 p-2 rounded focus:border-orange-500 placeholder-orange-300" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1 text-orange-600">INR (Pembekuan)</label>
                <input required type="number" step="0.1" name="inr" value={formData.inr} onChange={handleInputChange} placeholder="Contoh: 1.0" className="w-full border-2 border-orange-200 bg-orange-50 p-2 rounded focus:border-orange-500 placeholder-orange-300" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1 text-orange-600">Platelet (Trombosit)</label>
                <input required type="number" name="platelet_count" value={formData.platelet_count} onChange={handleInputChange} placeholder="Contoh: 250" className="w-full border-2 border-orange-200 bg-orange-50 p-2 rounded focus:border-orange-500 placeholder-orange-300" />
              </div>
              
              <div>
                <label className="block text-sm font-bold mb-1 text-purple-700">Skor SIRS</label>
                <input required type="number" name="sirs_criteria" value={formData.sirs_criteria} onChange={handleInputChange} placeholder="Contoh: 0 atau 1" className="w-full border-2 border-purple-200 bg-purple-50 p-2 rounded focus:border-purple-500 placeholder-purple-300" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1 text-purple-700">Skor APACHE IV</label>
                <input required type="number" name="apache_iv" value={formData.apache_iv} onChange={handleInputChange} placeholder="Contoh: 45" className="w-full border-2 border-purple-200 bg-purple-50 p-2 rounded focus:border-purple-500 placeholder-purple-300" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1 text-purple-700">Skor SOFA</label>
                <input required type="number" name="sofa_score" value={formData.sofa_score} onChange={handleInputChange} placeholder="Contoh: 2" className="w-full border-2 border-purple-200 bg-purple-50 p-2 rounded focus:border-purple-500 placeholder-purple-300" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1 text-purple-700">Skor qSOFA Awal</label>
                <input required type="number" name="qsofa" value={formData.qsofa} onChange={handleInputChange} placeholder="Contoh: 0" className="w-full border-2 border-purple-200 bg-purple-50 p-2 rounded focus:border-purple-500 placeholder-purple-300" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1 text-emerald-600">Total Cairan (mL/24j)</label>
                <input required type="number" name="fluids_ml_24h" value={formData.fluids_ml_24h} onChange={handleInputChange} placeholder="Contoh: 1500" className="w-full border-2 border-emerald-200 bg-emerald-50 p-2 rounded focus:border-emerald-500 placeholder-emerald-300" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1 text-emerald-600">Antibiotik (24 Jam)</label>
                <select required name="antibiotics_24h" value={formData.antibiotics_24h} onChange={handleInputChange} className="w-full border-2 border-emerald-200 bg-emerald-50 p-2 rounded focus:border-emerald-500 text-emerald-800">
                  <option value="" disabled>Pilih Status...</option>
                  <option value="1">Ya (Diberikan)</option>
                  <option value="0">Tidak</option>
                </select>
              </div>
            </div>

            {/* MENU LIPAT UNTUK 50+ PARAMETER LANJUTAN */}
            {/* <div className="mt-8 border-t pt-6">
              <button 
                type="button" 
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-slate-600 hover:text-slate-900 font-black flex items-center gap-2 bg-slate-100 p-3 rounded w-full justify-between transition-colors"
              >
                <span>{showAdvanced ? "▼ Sembunyikan 54 Parameter Lainnya" : "▶ Cek & Edit 54 Parameter Pelengkap (Default Aman)"}</span>
                <span className="text-xs bg-slate-300 px-2 py-1 rounded text-slate-700">Opsional</span>
              </button>
              
              {showAdvanced && (
                <div className="mt-4 p-6 bg-slate-50 rounded-lg grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 border border-slate-200 h-96 overflow-y-auto">
                  {advancedFieldsList.map((key) => (
                    <div key={key}>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1 truncate" title={key}>
                        {key.replace(/_/g, " ").toUpperCase()}
                      </label>
                      <input 
                        type="number" 
                        step="any"
                        name={key} 
                        value={formData[key]} 
                        onChange={handleInputChange} 
                        className="w-full border border-slate-300 p-1.5 rounded text-xs focus:ring-1 focus:ring-slate-500" 
                      />
                    </div>
                  ))}
                </div>
              )}
            </div> */}

            <div className="mt-8 pt-6 flex justify-end">
              <button 
                type="submit" 
                disabled={loading}
                className="bg-blue-900 hover:bg-blue-950 text-white font-bold py-4 px-12 rounded-lg shadow-xl text-lg transition-transform hover:scale-105 disabled:bg-slate-400 disabled:hover:scale-100"
              >
                {loading ? "Menganalisis Pola Sepsis..." : "Mulai Deteksi Sepsis"}
              </button>
            </div>
          </form>
        </div>

        {hasilPrediksi && (
          <div 
            ref={resultRef} 
            className={`p-8 rounded-xl shadow-2xl border-t-8 mt-12 transition-all duration-500 ${
              hasilPrediksi.label_final === 1 
                ? "bg-red-50 border-red-600 text-red-900" 
                : "bg-green-50 border-green-600 text-green-900"
            }`}
          >
            <div className="flex justify-between items-start border-b border-black/10 pb-4 mb-6">
              <h2 className="text-4xl font-black">{hasilPrediksi.status_pasien}</h2>
              <button 
                onClick={scrollToTop}
                className="bg-black/10 hover:bg-black/20 text-black/70 font-semibold py-2 px-4 rounded-lg text-sm transition-colors"
              >
                Edit Data
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-800">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-black/5">
                <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-2">Prediksi AI (XGBoost)</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-slate-800">{hasilPrediksi.learning_engine.probabilitas_sepsis_persen}%</span>
                  <span className="text-lg font-medium text-slate-600">Probabilitas Sepsis</span>
                </div>
                <p className="mt-2 text-sm text-slate-600">{hasilPrediksi.learning_engine.pesan}</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-black/5">
                <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-2">Logika Klinis (qSOFA)</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-slate-800">{hasilPrediksi.reasoning_engine.skor_qsofa}</span>
                  <span className="text-lg font-medium text-slate-600">/ 3 Kriteria</span>
                </div>
                {hasilPrediksi.reasoning_engine.gejala_terpantau.length > 0 ? (
                  <ul className="list-disc pl-5 mt-3 text-sm text-slate-700 font-medium space-y-1">
                    {hasilPrediksi.reasoning_engine.gejala_terpantau.map((gejala: string, idx: number) => (
                      <li key={idx}>{gejala}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm text-slate-600 italic">Tidak ada gejala qSOFA terpantau.</p>
                )}
              </div>
            </div>

            <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border border-black/5 border-l-4 border-l-slate-800">
              <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-2">Insight & Rekomendasi Sistem</p>
              <p className="text-lg font-medium text-slate-700">{hasilPrediksi.insight_klinis}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}