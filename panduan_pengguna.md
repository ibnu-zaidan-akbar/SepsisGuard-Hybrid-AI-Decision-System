# SepsisGuard - Panduan Pengguna

Selamat datang di **Sistem Keputusan AI Hibrida SepsisGuard**. Alat ini dirancang untuk membantu tenaga profesional kesehatan dalam deteksi dini sepsis dengan menggabungkan logika heuristik klinis (qSOFA) dengan pembelajaran mesin canggih (XGBoost).

Dokumen ini berfungsi sebagai panduan komprehensif tentang cara mengakses sistem, memasukkan data pasien dengan benar, dan memahami implikasi etis dari penggunaan AI dalam prediksi sepsis.

---

## 1. Mengakses Aplikasi Web

Aplikasi SepsisGuard adalah dasbor berbasis web yang dapat diakses dari browser web modern apa pun.

1. Buka browser web pilihan Anda (misalnya, Chrome, Firefox, Safari, Edge).
2. Navigasikan ke domain: **`https://SepsisDetector.my.id`**
3. Anda akan disajikan dengan dasbor utama SepsisGuard.
4. Isi data pasien yang diperlukan pada bidang formulir yang disediakan.
5. Klik tombol **"Mulai Deteksi Sepsis"** untuk menjalankan analisis.
6. Sistem akan memproses data dan menampilkan hasil analisis di bawah formulir.

---

## 2. Panduan Input Terperinci

Untuk memastikan prediksi yang akurat, sangat penting untuk memasukkan data pasien yang tepat. Semua bidang yang ditandai dengan tanda bintang merah (`*`) wajib diisi.

### Demografi Pasien
*   **Usia (Tahun)**: Usia pasien saat ini. 
    *   *Batasan*: Harus antara 0 dan 150.
*   **Jenis Kelamin**: Jenis kelamin biologis pasien.
    *   *Opsi*: Laki-laki (M) atau Perempuan (F).
*   **Berat Badan (Kg)**: Berat badan pasien dalam kilogram. 
    *   *Batasan*: Tidak boleh negatif.
*   **Tinggi Badan (Cm)**: Tinggi badan pasien dalam sentimeter.
    *   *Batasan*: Tidak boleh negatif.

### Tanda Vital — Komponen qSOFA
Pengukuran ini sangat penting karena secara langsung menjadi masukan untuk logika klinis qSOFA (Quick Sequential Organ Failure Assessment).
*   **Tensi Sistolik (mmHg)**: Tekanan darah maksimum saat detak jantung. Tekanan darah sistolik 100 mmHg atau kurang adalah salah satu kriteria untuk skor qSOFA positif.
    *   *Batasan*: Tidak boleh negatif.
*   **Laju Napas (RR)**: Jumlah napas yang diambil pasien per menit. Laju pernapasan 22 napas per menit atau lebih tinggi adalah kriteria qSOFA.
    *   *Batasan*: Tidak boleh negatif.
*   **Skor GCS Total**: Glasgow Coma Scale (GCS) adalah skala neurologis yang digunakan untuk mengukur tingkat kesadaran seseorang secara objektif. Tes ini sering digunakan oleh tenaga medis dalam situasi darurat, cedera kepala, atau penurunan kesadaran karena penyakit tertentu. Perubahan mental (skor GCS 14 atau kurang) adalah kriteria qSOFA.
    *   *Batasan*: Skor GCS total minimum adalah 3 (koma dalam) dan skor GCS total maksimum adalah 15 (sadar penuh).
*   **SpO2 (Oksigen %)**: Saturasi oksigen kapiler perifer, memperkirakan kadar oksigen dalam darah. Nilai normal biasanya antara 95% dan 100%.
    *   *Batasan*: Harus antara 0 dan 100.

### Laboratorium & Biomarker
*   **PaO2/FiO2 Ratio**: Rasio tekanan parsial oksigen arteri terhadap fraksi oksigen inspirasi. Ini adalah indikator klinis hipoksemia dan fungsi paru-paru. Nilai normal biasanya > 400.
    *   *Batasan*: Tidak boleh negatif.
*   **Asam Laktat (mmol/L)**: Mengukur kadar asam laktat dalam darah. Peningkatan laktat (hiperlaktatemia, sering didefinisikan sebagai > 2 mmol/L) adalah indikator kuat hipoperfusi jaringan dan merupakan biomarker kritis untuk sepsis berat dan syok septik.
    *   *Batasan*: Tidak boleh negatif.
*   **Kreatinin**: Ukuran fungsi ginjal. Peningkatan kadar dapat mengindikasikan cedera ginjal akut, komplikasi umum pada sepsis.
    *   *Batasan*: Tidak boleh negatif.
*   **pH Arteri**: Ukuran keasaman atau alkalinitas darah arteri. pH darah normal diatur secara ketat sekitar 7,35 hingga 7,45.
    *   *Batasan*: Harus antara 6.8 dan 7.8.
*   **Bikarbonat**: Bertindak sebagai penyangga untuk mempertahankan pH darah normal. Kadar abnormal dapat mengindikasikan asidosis metabolik.
    *   *Batasan*: Tidak boleh negatif.
*   **INR (Pembekuan)**: International Normalized Ratio, ukuran waktu pembekuan darah. Peningkatan INR menunjukkan koagulopati, komplikasi potensial dari sepsis berat.
    *   *Batasan*: Tidak boleh negatif.
*   **Platelet (Trombosit)**: Mengukur jumlah trombosit dalam darah. Jumlah trombosit yang rendah (trombositopenia) sering terjadi pada sepsis.
    *   *Batasan*: Tidak boleh negatif.

### Sistem Skoring Klinis
*   **Skor SIRS**: Skor Systemic Inflammatory Response Syndrome. Mengevaluasi respons klinis terhadap insult non-spesifik.
    *   *Batasan*: Harus antara 0 dan 4.
*   **Skor APACHE IV**: Acute Physiology and Chronic Health Evaluation IV. Sistem klasifikasi keparahan penyakit yang digunakan untuk pasien ICU untuk memprediksi mortalitas.
    *   *Batasan*: Tidak boleh negatif.
*   **Skor SOFA**: Skor Sequential Organ Failure Assessment. Digunakan untuk melacak status seseorang selama rawat inap di unit perawatan intensif (ICU) untuk menentukan sejauh mana fungsi organ atau tingkat kegagalan.
    *   *Batasan*: Harus antara 0 dan 24.
*   **Skor qSOFA Awal**: Skor Quick SOFA. Panduan di samping tempat tidur yang dapat mengidentifikasi pasien dengan dugaan infeksi yang berisiko lebih besar untuk hasil yang buruk di luar ICU. 
    *   *Batasan*: Harus antara 0 dan 3.

### Intervensi & Tatalaksana
*   **Total Cairan (mL/24j)**: Volume total cairan intravena yang diberikan kepada pasien selama periode 24 jam. Penting untuk pelacakan resusitasi cairan.
    *   *Batasan*: Tidak boleh negatif.
*   **Antibiotik (24 Jam)**: Menunjukkan apakah antibiotik diberikan dalam 24 jam terakhir. Pemberian antibiotik dini adalah langkah kritis dalam penatalaksanaan sepsis.
    *   *Opsi*: Ya (Diberikan) atau Tidak.

---

## 3. Penilaian Dampak Etis

Penerapan sistem pendukung keputusan berbasis AI seperti SepsisGuard dalam pengaturan klinis membawa tanggung jawab etis yang signifikan. Penilaian ini menguraikan manfaat yang diharapkan, potensi risiko, dan strategi mitigasi yang diimplementasikan.

### Manfaat yang Diharapkan
*   **Deteksi Dini dan Potensi Menyelamatkan Nyawa**: Sepsis adalah keadaan darurat medis yang kritis terhadap waktu. SepsisGuard bertujuan untuk mengidentifikasi pola berisiko tinggi lebih awal daripada observasi standar, berpotensi mengurangi tingkat kematian melalui intervensi tepat waktu.
*   **Peningkatan Intelijen Klinis**: Sistem ini dirancang untuk mendukung, bukan menggantikan, profesional medis. Dengan menyoroti pola kompleks dalam data pasien (melalui XGBoost) di samping metrik di samping tempat tidur standar (melalui qSOFA), ini memberikan "pendapat kedua" untuk membantu dalam pengambilan keputusan kritis.
*   **Optimalisasi Sumber Daya**: Dengan menriase pasien secara akurat, rumah sakit dapat mengalokasikan tempat tidur unit perawatan intensif (ICU) dan staf khusus dengan lebih baik kepada pasien yang paling membutuhkannya.

### Potensi Risiko dan Masalah Etis
*   **Bias Otomatisasi**: Ada risiko bahwa dokter mungkin menjadi terlalu bergantung pada prediksi AI, berpotensi mengabaikan penilaian klinis mereka sendiri atau mengabaikan tanda-tanda klinis halus yang tidak ditangkap oleh sistem.
*   **Dampak dari Positif dan Negatif Palsu**:
    *   **Positif Palsu**: Memprediksi sepsis secara tidak benar dapat menyebabkan pemberian antibiotik spektrum luas yang tidak perlu, berkontribusi pada resistensi antimikroba dan potensi efek samping obat yang merugikan bagi pasien. Ini juga dapat menyebabkan kecemasan yang tidak perlu dan pengeluaran sumber daya.
    *   **Negatif Palsu**: Gagal mendeteksi sepsis adalah kegagalan kritis yang dapat menyebabkan keterlambatan pengobatan, kerusakan organ yang parah, atau kematian.
*   **Keadilan Algoritmik dan Bias**: Model pembelajaran mesin belajar dari data historis. Jika data pelatihan mengandung bias (misalnya, kurangnya keterwakilan demografi atau etnis tertentu), AI mungkin bekerja kurang akurat untuk kelompok tersebut, yang mengarah pada kualitas perawatan yang tidak setara.
*   **Akuntabilitas dan Tanggung Jawab**: Dalam kasus di mana AI memberikan rekomendasi yang salah dan pasien menderita kerugian, menentukan tanggung jawab (apakah itu terletak pada dokter, rumah sakit, atau pengembang perangkat lunak) adalah tantangan etis dan hukum yang kompleks.
*   **Privasi Data**: Sistem memproses Informasi Kesehatan Terlindungi (PHI) yang sangat sensitif. Setiap pelanggaran data ini merupakan pelanggaran etis dan hukum yang parah.

### Strategi Mitigasi yang Diimplementasikan
*   **Keterjelasan dan "Manusia-dalam-Siklus" (Human-in-the-Loop)**: SepsisGuard pada dasarnya adalah sistem "Hibrida". Ini tidak menghasilkan keputusan "kotak hitam" (black box). Sebaliknya, ia menyajikan probabilitas Pembelajaran Mesin dan penalaran klinis (rincian qSOFA). Antarmuka secara eksplisit memberikan "Insight & Rekomendasi Sistem," mengingatkan pengguna bahwa keputusan akhir tetap berada di tangan dokter yang merawat.
*   **Jaring Pengaman (Logika Hibrida)**: Dengan menggabungkan qSOFA, sistem memastikan bahwa tanda-tanda klinis yang fundamental dan kritis akan memicu peringatan bahkan jika model pembelajaran mesin gagal mengidentifikasi pola yang kompleks. Ini mengurangi risiko negatif palsu yang berbahaya.
*   **Pedoman Transparansi**: Institusi yang menerapkan SepsisGuard harus memastikan bahwa staf klinis memahami batasan sistem, data yang dilatih, dan fakta bahwa itu adalah alat pelengkap.
