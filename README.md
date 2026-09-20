# 🏛️ 82 Tokoh Dunia - Michael H. Hart
### *Aplikasi Edukasi Interaktif, Ensiklopedia Sains & Peradaban, Arena Kuis Cerdas, dan Generator Sertifikat Digital Resmi*

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![jsPDF](https://img.shields.io/badge/jsPDF-4.2-FF0000?logo=adobe-acrobat-reader&logoColor=white)](https://github.com/parallax/jsPDF)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**Repository Resmi:** [https://github.com/mariofahmi/82-Tokoh-Dunia](https://github.com/mariofahmi/82-Tokoh-Dunia)  
**Perancang & Pengembang Aplikasi:** **Mario Fahmi Syharial**

---

## 📖 Tentang Aplikasi

**82 Tokoh Dunia** adalah aplikasi web edukatif modern yang menyajikan ensiklopedia visual dan interaktif mengenai **82 Tokoh Paling Berpengaruh dalam Sejarah** karya astronom dan sejarawan **Michael H. Hart** (fokus kurasi: tokoh sains, matematika, teknologi, kedokteran, filsafat, dan peradaban dunia).

Aplikasi ini dirancang untuk memberikan pengalaman belajar sejarah yang memikat, elegan, dan menantang bagi pelajar, mahasiswa, pengajar, maupun pencinta wawasan umum.

---

## ✨ Fitur Unggulan

### 1. 🏛️ Galeri Interaktif 82 Tokoh
- **Koleksi Arsip Terverifikasi**: Menampilkan 82 kartu tokoh lengkap dengan foto potret historis, rentang tahun kehidupan, negara/peradaban asal, dan peringkat pengaruh.
- **Pencarian Cerdas & Cepat**: Cari tokoh berdasarkan nama, asal wilayah, atau kata kunci penemuan secara instan.
- **Filter Multi-Kategori**:
  - Filter berdasarkan **Era Sejarah** (Zaman Kuno, Abad Pertengahan, Renaisans & Pencerahan, Era Modern).
  - Filter berdasarkan **Benua / Peradaban Asal**.
- **Modal Biografi Komprehensif**: Penjelasan mendalam mengenai latar belakang, karya monumental, kontribusi sains, dan dampaknya terhadap dunia modern.

### 2. 📚 Metodologi Analisis Michael H. Hart
- Halaman penjelasan kurasi ilmiah tentang bagaimana Michael H. Hart menyusun peringkat tokoh berdasarkan **dampak nyata sejarah** (*real historical impact*) bukan sekadar popularitas.

### 3. 🎮 Arena Kuis Edukasi 20 Soal Acak
- **Sesi Kuis Dinamis**: Setiap sesi terdiri dari **20 soal acak unik** yang dipilih secara acak dari 82 tokoh dunia dengan pilihan ganda 4 opsi.
- **3 Pilihan Mode Kuis**:
  1. 🖼️ **Mode Tebak Wajah**: Menguji ingatan visual wajah para tokoh sejarah.
  2. 💡 **Mode Tebak Karya & Penemuan**: Menebak tokoh berdasarkan deskripsi kutipan karya, teori, atau temuan ilmiah.
  3. ⚡ **Mode Tantangan Campuran**: Kombinasi seimbang antara tebak visual dan analisis karya secara acak bergantian.
- **Sistem Streak & Grade**: Skor akurasi persentase, streak beruntun dengan gelar dinamis (*Grade S: Master Sejarah*, *Grade A*, *Grade B*, *Grade C*).

### 4. 📜 Generator Sertifikat Digital Resmi
- **Desain Prestisius**: Kolaborasi warna **Merah Marun (*Royal Crimson*)**, **Kuning Emas (*Royal Gold*)**, dan **Putih Mutiara (*Pearl White*)**.
- **Watermark Eksklusif**: Tanda air resmi logo **MF** pada latar belakang sertifikat.
- **Atribusi & Legalitas**:
  - **Logo 82 Tokoh Dunia** berornamen emas di sisi kiri.
  - **Cap Tervalidasi Resmi** (stempel basah lingkaran ganda dengan pita `✓ TERVALIDASI`) di sisi kanan.
  - **Tanggal Penerbitan Resmi** tertera rapi di atas cap stempel.
- **Fitur Ekspor & Cetak Lengkap**:
  - 👁️ **Pratinjau Langsung (*Live Preview*)** di layar hasil kuis.
  - 🔍 **Mode Layar Penuh (*Fullscreen Modal Preview*)**.
  - 🖨️ **Cetak Langsung (*Direct Print*)**: Terhubung ke dialog cetak browser dengan orientasi *landscape* siap cetak ke kertas atau *Print to PDF*.
  - 📄 **Download PDF Siap Cetak**: Menggunakan `jsPDF` untuk konversi resolusi tinggi.
  - 🖼️ **Download PNG Resolusi Tinggi**: Gambar tajam berukuran 1200 × 860 px.

---

## 🛠️ Teknologi & Arsitektur

- **Frontend Core**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Dokumen & Canvas Generator**: HTML5 Canvas 2D API + [jsPDF](https://github.com/parallax/jsPDF)
- **Audio Feedback**: Web Audio API Synthesizer bawaan (bebas file eksternal)

---

## 🚀 Memulai Proyek (Menjalankan Secara Lokal)

### Prasyarat
- Pastikan [Node.js](https://nodejs.org/) (versi 18 ke atas) telah terinstal di komputer Anda.
- [Git](https://git-scm.com/) untuk kloning repositori.

### Langkah Instalasi

1. **Clone repositori:**
   ```bash
   git clone https://github.com/mariofahmi/82-Tokoh-Dunia.git
   cd 82-Tokoh-Dunia
   ```

2. **Instal dependensi:**
   ```bash
   npm install
   ```

3. **Jalankan development server:**
   ```bash
   npm run dev
   ```
   Buka browser Anda di `http://localhost:3000/`.

4. **Build untuk Production:**
   ```bash
   npm run build
   ```
   File hasil build akan berada di direktori `dist/`.

---

## 📁 Struktur Direktori

```text
82-tokoh-dunia/
├── public/
│   ├── logo-mf.png          # Logo Mario Fahmi Syharial (Watermark & Atribusi)
│   └── logo-unirow.png      # Logo Institusi / Mitra
├── src/
│   ├── components/
│   │   ├── GalleryView.tsx       # Tampilan Galeri 82 Tokoh Dunia
│   │   ├── MethodologyView.tsx   # Tampilan Metodologi Michael H. Hart
│   │   ├── Navbar.tsx            # Header & Navigasi Aplikasi
│   │   ├── OnboardingModal.tsx   # Disclaimer & Petunjuk Penggunaan
│   │   ├── QuizView.tsx          # Arena Kuis, Pratinjau & Generator Sertifikat
│   │   ├── TokohCard.tsx         # Kartu Satuan Tokoh
│   │   └── TokohDetailModal.tsx  # Modal Detail Biografi Tokoh
│   ├── data/
│   │   └── tokohData.ts          # Database Lengkap 82 Tokoh Dunia Michael H. Hart
│   ├── types/
│   │   └── tokoh.ts              # Definisi Tipe TypeScript
│   ├── utils/
│   │   └── audio.ts              # Generator Efek Suara Kuis (Web Audio API)
│   ├── App.tsx                   # Komponen Utama Aplikasi
│   ├── index.css                 # Konfigurasi Tailwind CSS
│   └── main.tsx                  # Entry Point React
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 👤 Perancang & Pengembang

**Mario Fahmi Syharial**  
*Aplikasi Edukasi Interaktif 82 Tokoh Dunia (Edisi Khusus Sains, Penemuan & Peradaban)*  
GitHub: [@mariofahmi](https://github.com/mariofahmi)  
Repository: [https://github.com/mariofahmi/82-Tokoh-Dunia](https://github.com/mariofahmi/82-Tokoh-Dunia)

---

## 📄 Lisensi

Proyek ini dibuat untuk tujuan edukasi dan pengembangan wawasan sejarah peradaban dunia. Didistribusikan di bawah lisensi [MIT](LICENSE).
