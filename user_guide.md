# SepsisGuard - User Guide

Welcome to the **SepsisGuard Hybrid AI Decision System**. This tool is designed to assist healthcare professionals in the early detection of sepsis by combining clinical heuristic logic (qSOFA) with advanced machine learning (XGBoost).

This document serves as a comprehensive guide on how to access the system, properly input patient data, and understand the ethical implications of using AI in sepsis prediction.

---

## 1. Accessing the Web Application

The SepsisGuard application is a web-based dashboard accessible from any modern web browser.

1. Open your preferred web browser (e.g., Chrome, Firefox, Safari, Edge).
2. Navigate to the domain: **`https://SepsisDetector.my.id`**
3. You will be presented with the main SepsisGuard dashboard.
4. Fill in the required patient data in the provided form fields.
5. Click the **"Start Sepsis Detection"** button to run the analysis.
6. The system will process the data and display the analysis results below the form.

---

## 2. Detailed Input Guide

To ensure accurate predictions, it is critical to enter precise patient data. All fields marked with a red asterisk (`*`) are required.

### Patient Demographics
*   **Age (Years)**: The patient's current age. 
    *   *Constraint*: Must be between 0 and 150.
*   **Gender**: The biological sex of the patient.
    *   *Options*: Male (M) or Female (F).
*   **Body Weight (Kg)**: The patient's body weight in kilograms. 
    *   *Constraint*: Cannot be negative.
*   **Height (Cm)**: The patient's height in centimeters.
    *   *Constraint*: Cannot be negative.

### Vital Signs — qSOFA Components
These measurements are critical as they directly feed into the qSOFA (Quick Sequential Organ Failure Assessment) clinical logic.
*   **Systolic BP (mmHg)**: The maximum blood pressure during a heartbeat. A systolic blood pressure of 100 mmHg or less is one of the criteria for a positive qSOFA score.
    *   *Constraint*: Cannot be negative.
*   **Respiratory Rate (RR)**: The number of breaths the patient takes per minute. A respiratory rate of 22 breaths per minute or higher is a qSOFA criterion.
    *   *Constraint*: Cannot be negative.
*   **GCS Total Score**: The Glasgow Coma Scale (GCS) is a neurological scale used to objectively measure a person's level of consciousness. This test is often used by medical personnel in emergency situations, head injuries, or decreased consciousness due to certain illnesses. Altered mentation (a GCS score of 14 or less) is a qSOFA criterion.
    *   *Constraint*: The minimum total GCS score is 3 (deep coma) and the maximum total GCS score is 15 (fully conscious).
*   **SpO2 (Oxygen %)**: Peripheral capillary oxygen saturation, estimating the oxygen levels in the blood. Normal values are typically between 95% and 100%.
    *   *Constraint*: Must be between 0 and 100.

### Laboratory & Biomarkers
*   **PaO2/FiO2 Ratio**: The ratio of arterial oxygen partial pressure to fractional inspired oxygen. It is a clinical indicator of hypoxemia and lung function. Normal values are usually > 400.
    *   *Constraint*: Cannot be negative.
*   **Lactate (mmol/L)**: Measures the level of lactic acid in the blood. Elevated lactate (hyperlactatemia, often defined as > 2 mmol/L) is a strong indicator of tissue hypoperfusion and is a critical biomarker for severe sepsis and septic shock.
    *   *Constraint*: Cannot be negative.
*   **Creatinine**: A measure of kidney function. Elevated levels can indicate acute kidney injury, a common complication in sepsis.
    *   *Constraint*: Cannot be negative.
*   **Arterial pH**: A measure of the acidity or alkalinity of arterial blood. Normal blood pH is tightly regulated around 7.35 to 7.45.
    *   *Constraint*: Must be between 6.8 and 7.8.
*   **Bicarbonate**: Acts as a buffer to maintain normal blood pH. Abnormal levels can indicate metabolic acidosis.
    *   *Constraint*: Cannot be negative.
*   **INR (Coagulation)**: International Normalized Ratio, a measure of blood clotting time. Elevated INR indicates coagulopathy, a potential complication of severe sepsis.
    *   *Constraint*: Cannot be negative.
*   **Platelet Count**: Measures the number of platelets in the blood. A low platelet count (thrombocytopenia) is common in sepsis.
    *   *Constraint*: Cannot be negative.

### Clinical Scoring Systems
*   **SIRS Score**: Systemic Inflammatory Response Syndrome score. Evaluates clinical response to a nonspecific insult.
    *   *Constraint*: Must be between 0 and 4.
*   **APACHE IV Score**: Acute Physiology and Chronic Health Evaluation IV. A severity-of-disease classification system used for ICU patients to predict mortality.
    *   *Constraint*: Cannot be negative.
*   **SOFA Score**: Sequential Organ Failure Assessment score. Used to track a person's status during an intensive care unit (ICU) stay to determine the extent of organ function or rate of failure.
    *   *Constraint*: Must be between 0 and 24.
*   **Initial qSOFA Score**: Quick SOFA score. A bedside prompt that may identify patients with suspected infection who are at greater risk for a poor outcome outside the ICU. 
    *   *Constraint*: Must be between 0 and 3.

### Interventions & Treatment
*   **Total Fluids (mL/24h)**: The total volume of intravenous fluids administered to the patient over a 24-hour period. Important for fluid resuscitation tracking.
    *   *Constraint*: Cannot be negative.
*   **Antibiotics (24h)**: Indicates whether antibiotics were administered within the last 24 hours. Early antibiotic administration is a critical step in sepsis management.
    *   *Options*: Yes (Administered) or No.

---

## 3. Ethical Impact Assessment

The deployment of an AI-driven decision support system like SepsisGuard in a clinical setting carries significant ethical responsibilities. This assessment outlines the intended benefits, potential risks, and the mitigation strategies implemented.

### Intended Benefits
*   **Early Detection and Lifesaving Potential**: Sepsis is a time-critical medical emergency. SepsisGuard aims to identify high-risk patterns earlier than standard observation, potentially reducing mortality rates through timely intervention.
*   **Augmented Clinical Intelligence**: The system is designed to support, not replace, medical professionals. By highlighting complex patterns in patient data (via XGBoost) alongside standard bedside metrics (via qSOFA), it provides a "second opinion" to assist in critical decision-making.
*   **Resource Optimization**: By accurately triaging patients, hospitals can better allocate intensive care unit (ICU) beds and specialized staff to the patients who need them most.

### Potential Risks and Ethical Concerns
*   **Automation Bias**: There is a risk that clinicians may become overly reliant on the AI's prediction, potentially ignoring their own clinical judgment or dismissing subtle clinical signs not captured by the system. 
*   **Impact of False Positives and Negatives**:
    *   **False Positives**: Incorrectly predicting sepsis can lead to unnecessary administration of broad-spectrum antibiotics, contributing to antimicrobial resistance and potential adverse drug events for the patient. It can also cause unnecessary anxiety and resource expenditure.
    *   **False Negatives**: Failing to detect sepsis is a critical failure that can lead to delayed treatment, severe organ damage, or death.
*   **Algorithmic Fairness and Bias**: Machine learning models learn from historical data. If the training data contains biases (e.g., underrepresentation of certain demographics or ethnicities), the AI may perform less accurately for those groups, leading to unequal quality of care.
*   **Accountability and Liability**: In cases where the AI provides an incorrect recommendation and a patient suffers harm, determining liability (whether it lies with the clinician, the hospital, or the software developers) is a complex ethical and legal challenge.
*   **Data Privacy**: The system processes highly sensitive Protected Health Information (PHI). Any breach of this data represents a severe ethical and legal violation.

### Mitigation Strategies Implemented
*   **Explainability and "Human-in-the-Loop"**: SepsisGuard is fundamentally a "Hybrid" system. It does not output a "black box" decision. Instead, it presents both the Machine Learning probability and the clinical reasoning (qSOFA breakdown). The interface explicitly provides an "Insight & System Recommendation," reminding users that the final decision rests with the attending physician.
*   **Safety Nets (Hybrid Logic)**: By incorporating qSOFA, the system ensures that fundamental, critical clinical signs will trigger alerts even if the machine learning model fails to identify a complex pattern. This reduces the risk of dangerous false negatives.
*   **Transparency Guidelines**: Institutions deploying SepsisGuard must ensure that clinical staff understand the system's limitations, the data it was trained on, and the fact that it is a supplementary tool.