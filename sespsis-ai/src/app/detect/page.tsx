"use client";

import { useState, useRef, useEffect } from "react";

function StarburstIcon({ className = "", size = 48 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <line
          key={i}
          x1="24"
          y1="4"
          x2="24"
          y2="16"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          transform={`rotate(${i * 30} 24 24)`}
        />
      ))}
      <circle cx="24" cy="24" r="4" fill="currentColor" />
    </svg>
  );
}

function DiamondDivider() {
  return (
    <div className="flex items-center justify-center gap-3 py-2">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4a574]/40 to-transparent" />
      <div className="w-2 h-2 rotate-45 bg-[#d97642]/40" />
      <div className="w-1.5 h-1.5 rotate-45 bg-[#d4a574]/30" />
      <div className="w-2 h-2 rotate-45 bg-[#d97642]/40" />
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4a574]/40 to-transparent" />
    </div>
  );
}

function AtomicOrnament({ className = "" }: { className?: string }) {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" className={className} fill="none">
      <ellipse cx="60" cy="60" rx="50" ry="18" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <ellipse cx="60" cy="60" rx="50" ry="18" stroke="currentColor" strokeWidth="1" opacity="0.3" transform="rotate(60 60 60)" />
      <ellipse cx="60" cy="60" rx="50" ry="18" stroke="currentColor" strokeWidth="1" opacity="0.3" transform="rotate(120 60 60)" />
      <circle cx="60" cy="60" r="5" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

function SectionLabel({ 
  icon, 
  label, 
  accentColor = "#d97642" 
}: { 
  icon: React.ReactNode; 
  label: string; 
  accentColor?: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm"
        style={{ backgroundColor: accentColor }}
      >
        {icon}
      </div>
      <h3 
        className="text-xs font-bold tracking-[0.2em] uppercase"
        style={{ color: accentColor }}
      >
        {label}
      </h3>
      <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${accentColor}30, transparent)` }} />
    </div>
  );
}

function MCMField({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="group">
      <label className="block text-xs font-semibold tracking-[0.08em] uppercase text-[#6b5d4f] mb-2 transition-colors duration-200 group-focus-within:text-[#d97642]">
        {label}
        {required && <span className="text-[#e57a77] ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

export default function DeteksiPage() {
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
      const response = await fetch("https://sepsis-ai-decision-system.up.railway.app/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      setHasilPrediksi(data);
    } catch (error) {
      alert("Failed to connect to Python Backend. Make sure FastAPI is running!");
    } finally {
      setLoading(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: '#faf3eb' }}>
      
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-20 animate-starburst">
          <StarburstIcon size={280} className="text-[#d4a574]/10" />
        </div>
        <div className="absolute bottom-10 -left-10" style={{ animationDelay: '2s' }}>
          <AtomicOrnament className="text-[#d97642]/8 animate-starburst" />
        </div>
        <div className="absolute top-1/3 right-10 w-64 h-64 organic-blob bg-[#4a7c59]/[0.04]" />
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 organic-blob bg-[#d97642]/[0.04]" />
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(#2c2416 1px, transparent 1px),
              linear-gradient(90deg, #2c2416 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12 space-y-8">
        <header className="animate-fade-in-up">
          <div 
            className="relative overflow-hidden rounded-3xl px-10 py-10"
            style={{
              background: 'linear-gradient(135deg, #2c2416 0%, #3d3327 40%, #4a3f30 100%)',
              boxShadow: '0 12px 48px rgba(44, 36, 22, 0.3)',
            }}
          >
            <div className="absolute top-4 right-8 animate-starburst">
              <StarburstIcon size={80} className="text-[#d4a574]/20" />
            </div>
            <div className="absolute bottom-4 left-8">
              <StarburstIcon size={48} className="text-[#d97642]/15" />
            </div>
            
            <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, #d97642, #d4a574, #4a7c59, #7d9ba8)' }} />

            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 rounded-full bg-[#d97642] animate-pulse-warm" />
                  <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#d4a574]/70">
                    Hybrid AI Decision System
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-[#f5e6d3] tracking-tight leading-tight">
                  Start Sepsis Detection
                </h1>
                <p className="text-[#d4a574]/80 mt-2 text-base font-light tracking-wide max-w-lg">
                  Early qSOFA Detection & XGBoost Lactate Analysis
                </p>
              </div>

              <div className="flex gap-3">
                <div className="px-4 py-2.5 rounded-full border border-[#d4a574]/20 bg-[#d4a574]/5 backdrop-blur-sm">
                  <div className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#d4a574]/60">Engine</div>
                  <div className="text-sm font-bold text-[#f5e6d3]">XGBoost</div>
                </div>
                <div className="px-4 py-2.5 rounded-full border border-[#4a7c59]/20 bg-[#4a7c59]/5 backdrop-blur-sm">
                  <div className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#4a7c59]/60">Logic</div>
                  <div className="text-sm font-bold text-[#f5e6d3]">qSOFA</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="animate-fade-in-up delay-200">
          <form onSubmit={handleSubmit} className="relative">
            {loading && (
              <div className="absolute inset-0 bg-[#faf3eb]/70 backdrop-blur-sm z-10 flex items-center justify-center rounded-3xl">
                <div className="flex flex-col items-center gap-4 bg-[#fffaf5] px-10 py-8 rounded-2xl shadow-lg border border-[#d4a574]/20">
                  <div className="animate-starburst">
                    <StarburstIcon size={48} className="text-[#d97642]" />
                  </div>
                  <span className="text-lg font-bold text-[#2c2416] tracking-wide">
                    Analyzing Medical Patterns...
                  </span>
                  <div className="w-48 h-1 rounded-full bg-[#f5e6d3] overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-[#d97642] to-[#d4a574] animate-shimmer" />
                  </div>
                </div>
              </div>
            )}

            <div className="mcm-card-elevated p-8 md:p-10 space-y-10 wood-texture-overlay">
              <section>
                <SectionLabel 
                  icon="◈" 
                  label="Patient Demographics" 
                  accentColor="#6b5d4f"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                  <MCMField label="Age (Years)" required>
                    <input
                      required
                      type="number"
                      name="age"
                      min="0"
                      max="150"
                      value={formData.age}
                      onChange={handleInputChange}
                      placeholder="e.g. 45"
                      className="mcm-input"
                    />
                  </MCMField>
                  <MCMField label="Gender" required>
                    <select
                      required
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="mcm-select"
                    >
                      <option value="" disabled>Select Gender...</option>
                      <option value="M">Male (M)</option>
                      <option value="F">Female (F)</option>
                    </select>
                  </MCMField>
                  <MCMField label="Body Weight (Kg)" required>
                    <input
                      required
                      type="number"
                      step="0.1"
                      min="0"
                      name="weight_kg"
                      value={formData.weight_kg}
                      onChange={handleInputChange}
                      placeholder="e.g. 65.5"
                      className="mcm-input"
                    />
                  </MCMField>
                  <MCMField label="Height (Cm)" required>
                    <input
                      required
                      type="number"
                      step="0.1"
                      min="0"
                      name="height_cm"
                      value={formData.height_cm}
                      onChange={handleInputChange}
                      placeholder="e.g. 165"
                      className="mcm-input"
                    />
                  </MCMField>
                </div>
              </section>

              <DiamondDivider />
              <section>
                <SectionLabel 
                  icon="♦" 
                  label="Vital Signs — qSOFA Components" 
                  accentColor="#7d9ba8"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                  <MCMField label="Systolic BP (mmHg)" required>
                    <input
                      required
                      type="number"
                      min="0"
                      name="sysbp_mean"
                      value={formData.sysbp_mean}
                      onChange={handleInputChange}
                      placeholder="e.g. 120"
                      className="mcm-input"
                      style={{ borderColor: 'rgba(125, 155, 168, 0.35)' }}
                    />
                  </MCMField>
                  <MCMField label="Respiratory Rate (RR)" required>
                    <input
                      required
                      type="number"
                      min="0"
                      name="respiratory_rate_mean"
                      value={formData.respiratory_rate_mean}
                      onChange={handleInputChange}
                      placeholder="e.g. 16"
                      className="mcm-input"
                      style={{ borderColor: 'rgba(125, 155, 168, 0.35)' }}
                    />
                  </MCMField>
                  <MCMField label="GCS Total Score" required>
                    <input
                      required
                      type="number"
                      min="3"
                      max="15"
                      name="gcs_total"
                      value={formData.gcs_total}
                      onChange={handleInputChange}
                      placeholder="e.g. 15"
                      className="mcm-input"
                      style={{ borderColor: 'rgba(125, 155, 168, 0.35)' }}
                    />
                  </MCMField>
                  <MCMField label="SpO2 (Oxygen %)" required>
                    <input
                      required
                      type="number"
                      min="0"
                      max="100"
                      name="spo2_mean"
                      value={formData.spo2_mean}
                      onChange={handleInputChange}
                      placeholder="e.g. 98"
                      className="mcm-input"
                      style={{ borderColor: 'rgba(125, 155, 168, 0.35)' }}
                    />
                  </MCMField>
                </div>
              </section>

              <DiamondDivider />

              <section>
                <SectionLabel 
                  icon="✦" 
                  label="Laboratory & Biomarkers" 
                  accentColor="#d97642"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                  <MCMField label="PaO2/FiO2 Ratio" required>
                    <input
                      required
                      type="number"
                      step="0.1"
                      min="0"
                      name="pao2_fio2_ratio"
                      value={formData.pao2_fio2_ratio}
                      onChange={handleInputChange}
                      placeholder="e.g. 400"
                      className="mcm-input"
                      style={{ borderColor: 'rgba(217, 118, 66, 0.3)' }}
                    />
                  </MCMField>
                  <MCMField label="Lactate (mmol/L)" required>
                    <input
                      required
                      type="number"
                      step="0.1"
                      min="0"
                      name="lactate_mmol"
                      value={formData.lactate_mmol}
                      onChange={handleInputChange}
                      placeholder="e.g. 1.2"
                      className="mcm-input"
                      style={{ borderColor: 'rgba(217, 118, 66, 0.3)' }}
                    />
                  </MCMField>
                  <MCMField label="Creatinine" required>
                    <input
                      required
                      type="number"
                      step="0.1"
                      min="0"
                      name="creatinine"
                      value={formData.creatinine}
                      onChange={handleInputChange}
                      placeholder="e.g. 0.9"
                      className="mcm-input"
                      style={{ borderColor: 'rgba(217, 118, 66, 0.3)' }}
                    />
                  </MCMField>
                  <MCMField label="Arterial pH" required>
                    <input
                      required
                      type="number"
                      step="0.01"
                      min="6.8"
                      max="7.8"
                      name="ph_arterial"
                      value={formData.ph_arterial}
                      onChange={handleInputChange}
                      placeholder="e.g. 7.40"
                      className="mcm-input"
                      style={{ borderColor: 'rgba(217, 118, 66, 0.3)' }}
                    />
                  </MCMField>
                  <MCMField label="Bicarbonate" required>
                    <input
                      required
                      type="number"
                      step="0.1"
                      min="0"
                      name="bicarbonate"
                      value={formData.bicarbonate}
                      onChange={handleInputChange}
                      placeholder="e.g. 24"
                      className="mcm-input"
                      style={{ borderColor: 'rgba(217, 118, 66, 0.3)' }}
                    />
                  </MCMField>
                  <MCMField label="INR (Coagulation)" required>
                    <input
                      required
                      type="number"
                      step="0.1"
                      min="0"
                      name="inr"
                      value={formData.inr}
                      onChange={handleInputChange}
                      placeholder="e.g. 1.0"
                      className="mcm-input"
                      style={{ borderColor: 'rgba(217, 118, 66, 0.3)' }}
                    />
                  </MCMField>
                  <MCMField label="Platelet Count" required>
                    <input
                      required
                      type="number"
                      min="0"
                      name="platelet_count"
                      value={formData.platelet_count}
                      onChange={handleInputChange}
                      placeholder="e.g. 250"
                      className="mcm-input"
                      style={{ borderColor: 'rgba(217, 118, 66, 0.3)' }}
                    />
                  </MCMField>
                </div>
              </section>

              <DiamondDivider />

              <section>
                <SectionLabel 
                  icon="◆" 
                  label="Clinical Scoring Systems" 
                  accentColor="#4a7c59"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                  <MCMField label="SIRS Score" required>
                    <input
                      required
                      type="number"
                      min="0"
                      max="4"
                      name="sirs_criteria"
                      value={formData.sirs_criteria}
                      onChange={handleInputChange}
                      placeholder="e.g. 0 or 1"
                      className="mcm-input"
                      style={{ borderColor: 'rgba(74, 124, 89, 0.3)' }}
                    />
                  </MCMField>
                  <MCMField label="APACHE IV Score" required>
                    <input
                      required
                      type="number"
                      min="0"
                      name="apache_iv"
                      value={formData.apache_iv}
                      onChange={handleInputChange}
                      placeholder="e.g. 45"
                      className="mcm-input"
                      style={{ borderColor: 'rgba(74, 124, 89, 0.3)' }}
                    />
                  </MCMField>
                  <MCMField label="SOFA Score" required>
                    <input
                      required
                      type="number"
                      min="0"
                      max="24"
                      name="sofa_score"
                      value={formData.sofa_score}
                      onChange={handleInputChange}
                      placeholder="e.g. 2"
                      className="mcm-input"
                      style={{ borderColor: 'rgba(74, 124, 89, 0.3)' }}
                    />
                  </MCMField>
                  <MCMField label="Initial qSOFA Score" required>
                    <input
                      required
                      type="number"
                      min="0"
                      max="3"
                      name="qsofa"
                      value={formData.qsofa}
                      onChange={handleInputChange}
                      placeholder="e.g. 0"
                      className="mcm-input"
                      style={{ borderColor: 'rgba(74, 124, 89, 0.3)' }}
                    />
                  </MCMField>
                </div>
              </section>

              <DiamondDivider />

              <section>
                <SectionLabel 
                  icon="✧" 
                  label="Interventions & Treatment" 
                  accentColor="#8b7355"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <MCMField label="Total Fluids (mL/24h)" required>
                    <input
                      required
                      type="number"
                      min="0"
                      name="fluids_ml_24h"
                      value={formData.fluids_ml_24h}
                      onChange={handleInputChange}
                      placeholder="e.g. 1500"
                      className="mcm-input"
                      style={{ borderColor: 'rgba(139, 115, 85, 0.3)' }}
                    />
                  </MCMField>
                  <MCMField label="Antibiotics (24h)" required>
                    <select
                      required
                      name="antibiotics_24h"
                      value={formData.antibiotics_24h}
                      onChange={handleInputChange}
                      className="mcm-select"
                      style={{ borderColor: 'rgba(139, 115, 85, 0.3)' }}
                    >
                      <option value="" disabled>Select Status...</option>
                      <option value="1">Yes (Administered)</option>
                      <option value="0">No</option>
                    </select>
                  </MCMField>
                </div>
              </section>

              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="mcm-btn-primary flex items-center gap-3"
                >
                  <StarburstIcon size={22} className="text-white/80" />
                  {loading ? "Analyzing Sepsis Patterns..." : "Start Sepsis Detection"}
                </button>
              </div>
            </div>
          </form>
        </div>

        {hasilPrediksi && (
          <div
            ref={resultRef}
            className="animate-fade-in-up space-y-6"
          >
            <div
              className="relative overflow-hidden rounded-3xl px-10 py-8"
              style={{
                background: hasilPrediksi.label_final === 1
                  ? 'linear-gradient(135deg, #5c2a2a 0%, #7a3333 50%, #4a2020 100%)'
                  : 'linear-gradient(135deg, #2a4a33 0%, #336644 50%, #204a2a 100%)',
                boxShadow: hasilPrediksi.label_final === 1
                  ? '0 12px 48px rgba(229, 122, 119, 0.2)'
                  : '0 12px 48px rgba(74, 124, 89, 0.2)',
              }}
            >
              {/* Decorative elements */}
              <div className="absolute top-4 right-8 animate-starburst">
                <StarburstIcon size={64} className={hasilPrediksi.label_final === 1 ? 'text-[#e57a77]/15' : 'text-[#4a7c59]/20'} />
              </div>
              <div className="absolute top-0 left-0 right-0 h-1" style={{
                background: hasilPrediksi.label_final === 1
                  ? 'linear-gradient(90deg, #e57a77, #d97642, #d4a574)'
                  : 'linear-gradient(90deg, #4a7c59, #7d9ba8, #d4a574)'
              }} />

              <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${hasilPrediksi.label_final === 1 ? 'bg-[#e57a77]' : 'bg-[#4a7c59]'} animate-pulse-warm`} />
                    <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-white/50">
                      Analysis Result
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                    {hasilPrediksi.status_pasien}
                  </h2>
                </div>
                <button
                  onClick={scrollToTop}
                  className="px-6 py-2.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white font-semibold text-sm tracking-wide transition-all duration-300"
                >
                  ← Edit Data
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="mcm-card p-8 relative overflow-hidden group">
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <StarburstIcon size={32} className="text-[#d97642]/20" />
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-[#d97642]" />
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#8b7355]">
                    AI Prediction (XGBoost)
                  </p>
                </div>
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-5xl font-extrabold text-[#2c2416] tracking-tight">
                    {hasilPrediksi.learning_engine.probabilitas_sepsis_persen}%
                  </span>
                  <span className="text-base font-medium text-[#8b7355]">
                    Sepsis Probability
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#f5e6d3] mb-4 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${hasilPrediksi.learning_engine.probabilitas_sepsis_persen}%`,
                      background: hasilPrediksi.learning_engine.probabilitas_sepsis_persen > 50
                        ? 'linear-gradient(90deg, #d97642, #e57a77)'
                        : 'linear-gradient(90deg, #4a7c59, #7d9ba8)',
                    }}
                  />
                </div>
                <p className="text-sm text-[#6b5d4f] leading-relaxed">
                  {hasilPrediksi.learning_engine.pesan}
                </p>
              </div>

              <div className="mcm-card p-8 relative overflow-hidden group">
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <AtomicOrnament className="text-[#7d9ba8]/15 w-12 h-12" />
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-[#7d9ba8]" />
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#8b7355]">
                    Clinical Logic (qSOFA)
                  </p>
                </div>
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-5xl font-extrabold text-[#2c2416] tracking-tight">
                    {hasilPrediksi.reasoning_engine.skor_qsofa}
                  </span>
                  <span className="text-base font-medium text-[#8b7355]">/ 3 Criteria</span>
                </div>
                <div className="flex gap-2 mb-4">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-2 rounded-full transition-all duration-500"
                      style={{
                        background: i < hasilPrediksi.reasoning_engine.skor_qsofa
                          ? '#d97642'
                          : '#f5e6d3',
                      }}
                    />
                  ))}
                </div>
                {hasilPrediksi.reasoning_engine.gejala_terpantau.length > 0 ? (
                  <ul className="space-y-2 mt-3">
                    {hasilPrediksi.reasoning_engine.gejala_terpantau.map((gejala: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-[#6b5d4f]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#d97642] mt-1.5 shrink-0" />
                        <span>{gejala}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm text-[#8b7355] italic">
                    No qSOFA symptoms detected.
                  </p>
                )}
              </div>
            </div>

            <div className="mcm-card p-8 mcm-accent-border-left relative overflow-hidden">
              <div className="absolute top-4 right-8">
                <StarburstIcon size={36} className="text-[#d4a574]/10 animate-starburst" />
              </div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rotate-45 bg-[#d97642]" />
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#8b7355]">
                  Insight & System Recommendation
                </p>
              </div>
              <p className="text-lg font-medium text-[#2c2416] leading-relaxed">
                {hasilPrediksi.insight_klinis}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
