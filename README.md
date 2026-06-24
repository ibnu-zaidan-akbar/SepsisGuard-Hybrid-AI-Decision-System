# SepsisGuard-Hybrid-AI-Decision-System
## 📖 Abstract
**SepsisGuard** is a web-based clinical decision support system that uses a hybrid AI approach to detect sepsis early in ICU patients. It combines a rule-based **qSOFA assessment** with a trained **XGBoost model** to provide both sepsis risk predictions and transparent clinical explanations.

SepsisGuard, A hybrid AI-based sepsis early system. It combines adaptive machine learning predictions and a medical expert system (qSOFA) into a single, intuitive web dashboard. It is designed to improve the speed and accuracy of physician diagnoses through transparent and clinically reliable early warnings.


## 👥 Core Team
**Teknik Informatika - Universitas Padjadjaran**
* **M Arkan Bintang Pratama** (140810240037)
* **Ibnu Zaidan Akbar** (140810240043)
* **Fathan Ariiq Rasbi Yalis** (140810240057)

---

## ⚙️ Methodology

1. **Data Preparation**
   Data extraction from synthetic MIMIC-IV ICU dataset, handling missing values via `KNN Imputer`, and applying class weight adjustments (`scale_pos_weight`) to tackle the sepsis class imbalance.
2. **Hybrid Engine Development**
   Parallel processing between the Machine Learning model (XGBoost) to detect complex non-linear patterns, and the Rule-based Heuristic (qSOFA) acting as a vital sign safety net.
3. **Model Explainability (XAI)**
   Implementation of SHAP (SHapley Additive exPlanations) to dissect prediction results and provide transparent clinical reasoning for physicians.
4. **System Deployment**
   Integration of the classification model via REST API using **FastAPI**, served on a highly responsive emergency dashboard built with **Next.js**.

---

## 📊 Dataset Overview
* **Source:** Synthetic MIMIC-IV ICU Data
* **Total Patients:** 5,000 Records
* **Features:** 77 Clinical Indicators
* **Average Age:** 64.3 years old
* **Class Balance:** 85% Non-Sepsis | 15% Sepsis

---

## 📈 Algorithm Results & Effectiveness

The decision threshold was intentionally lowered to **0.30** (F₂ Optimization) to maximize recall. In sepsis detection, missing a positive case (False Negative) is fatal, whereas a False Positive only triggers closer observation.

| Metric | Score | Clinical Rationale |
| :--- | :---: | :--- |
| **ROC-AUC** | `0.93` | High overall discrimination ability between sepsis and non-sepsis. |
| **Sensitivity (Recall)** | `0.91` | Successfully identifies 91% of true sepsis patients at the optimal threshold. |
| **F1-Score** | `0.81` | Maintains a solid balance between precision and recall despite class imbalance. |

---

## ⚖️ Ethical Impact Assessment

Deploying AI in high-stakes medical environments carries profound ethical responsibilities. SepsisGuard is evaluated under three core pillars:

### ✅ Intended Benefits
* **Early Detection:** Identifies high-risk sepsis patterns before they become clinically apparent.
* **Augmented Intelligence:** XGBoost detects complex patterns, while qSOFA provides evidence-based clinical reasoning.
* **Resource Optimization:** Enhances triage, prioritizing ICU beds and critical care resources.
* **Transparency:** Eliminates "black-box" decisions using SHAP explainability.

### ⚠️ Risks & Concerns
* **Automation Bias:** Clinicians might over-rely on AI, missing subtle human intuition.
* **False Negatives:** The most critical failure; undetected sepsis leads to delayed life-saving treatment.
* **False Positives:** Triggers unnecessary antibiotics, contributing to antimicrobial resistance.
* **Data Privacy:** Handling sensitive PHI (Protected Health Information) poses strict security requirements.

### 🛡️ Mitigation Strategies
* **Human-in-the-Loop Oversight:** Explicitly reminds users that final decisions rest with physicians. No autonomous clinical action is taken.
* **Hybrid Safety Mechanism:** qSOFA rule engine acts as a fail-safe backup if the ML model underperforms.
* **Clinical Threshold Optimization:** Decision threshold is lowered to 0.30 to prioritize catching sepsis cases (minimizing false negatives).

---

## 💡 Conclusion & Recommendation

### Conclusion
SepsisGuard effectively bridges advanced machine learning (XGBoost) and established clinical heuristics (qSOFA) to provide a robust, hybrid early warning system. By presenting transparent, explainable predictions rather than "black-box" decisions, it augments medical professionals' capabilities, potentially enabling earlier life-saving interventions and optimized hospital resource allocation.

### Recommendation
To ensure maximum clinical efficacy, future iterations of SepsisGuard should integrate real-time EHR (Electronic Health Record) streaming via HL7/FHIR standards to automate data ingestion. Furthermore, continuous monitoring for algorithmic drift and comprehensive hospital staff training on interpreting SHAP values are crucial to maintain the system's role as a supplementary—not primary—diagnostic tool.

---
*Created for the SepsisGuard Project - 2026*