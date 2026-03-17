<div align="center">

<br/>

<img src="public/logo-daralihsan.jpg" width="80" height="80" style="border-radius: 50%;" alt="Logo Masjid Daar Al-Ihsan"/>

<br/><br/>

# Masjid Daar Al-Ihsan
### Website Resmi · daaralihsan.com

**Bersama Untuk Menjadi Lebih Baik**

[![Deploy Status](https://img.shields.io/badge/deploy-Cloudflare%20Pages-F6821F?style=flat-square&logo=cloudflare&logoColor=white)](https://pages.cloudflare.com)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/license-MIT-22c55e?style=flat-square)](LICENSE)

</div>

---

## Tentang Proyek

Landing page Masjid Daar Al-Ihsan, Cimahi Utara — dibuat sebagai **shadaqah ilmu** 🤲, dengan harapan dapat membantu syiar dakwah masjid secara digital.

> *"Sesungguhnya hanya yang memakmurkan masjid-masjid Allah ialah orang-orang yang beriman kepada Allah..."*
> — QS. At-Taubah: 18

---

## Fitur

| Fitur | Keterangan |
|-------|------------|
| 🕌 **Profil Masjid** | Tentang, sejarah, visi & misi |
| 🕐 **Jadwal Sholat Live** | Dihitung real-time via Aladhan API berdasarkan koordinat GPS masjid |
| 📚 **Program Masjid** | Kajian, Tahsin, TPA, IRMA, I'tikaf, dan kegiatan lainnya |
| 📸 **Galeri Instagram** | Foto terbaru dari @daar_al_ihsan, diperbarui otomatis 2× sehari |
| 💚 **Donasi & Infaq** | Info rekening dan program wakaf |
| 📍 **Kontak & Peta** | Google Maps embed, WhatsApp, Instagram |
| 📱 **Mobile-first** | Responsif penuh, ringan, cepat |

---

## Jadwal Sholat — Cara Kerjanya

Waktu sholat **bukan hardcode** — dihitung ulang setiap halaman dibuka:

1. Browser mengirim request ke [Aladhan API](https://aladhan.com/prayer-times-api) dengan tanggal hari ini + koordinat GPS masjid (`-6.8546641, 107.5552907`)
2. Aladhan menghitung posisi matahari secara astronomis untuk lokasi dan tanggal tersebut
3. Hasilnya: waktu yang tepat per hari, otomatis berubah setiap hari tanpa perlu update manual

```
GET https://api.aladhan.com/v1/timings/{DD-MM-YYYY}
    ?latitude=-6.8546641
    &longitude=107.5552907
    &method=11   ← MUIS (Singapura) — paling mendekati untuk wilayah Cimahi
```

Jika API gagal (offline/timeout), tampil fallback waktu statis sebagai cadangan.

---

## Galeri Instagram — Auto-sync

Galeri diperbarui otomatis via **GitHub Actions** setiap hari pukul **12:00 WIB** dan **18:00 WIB**:

```
GitHub Actions (cron)
  → scripts/update_gallery.py
      → Fetch 6 post terbaru @daar_al_ihsan (instaloader → fallback Playwright)
      → Bandingkan shortcode dengan scripts/gallery_posts.json
      → Jika ada post baru: download gambar + update Galeri.js + commit & push
```

Tidak ada post baru → tidak ada commit. Efisien.

---

## Stack Teknologi

- **Framework:** [Next.js 16](https://nextjs.org) (App Router, static export)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com)
- **Font:** Poppins (Latin) + Amiri (Arab) via Google Fonts
- **Prayer Times:** [Aladhan API](https://aladhan.com)
- **Gallery Sync:** Python + [instaloader](https://instaloader.github.io) + GitHub Actions
- **Deploy:** [Cloudflare Pages](https://pages.cloudflare.com)

---

## Menjalankan Lokal

```bash
# Clone
git clone https://github.com/k1m0ch1/daaralihsan.git
cd daaralihsan

# Install dependencies
npm install

# Jalankan dev server
npm run dev
# → http://localhost:3000

# Build static (untuk deploy)
npm run build
# → output di /out
```

---

## Struktur Proyek

```
daaralihsan/
├── app/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── Hero.js
│   │   ├── TentangKami.js
│   │   ├── Program.js
│   │   ├── JadwalSholat.js    ← live prayer times
│   │   ├── Galeri.js          ← auto-generated oleh GitHub Action
│   │   ├── Donasi.js
│   │   ├── Kontak.js
│   │   ├── Footer.js
│   │   └── FloatingWA.js
│   ├── layout.js
│   ├── page.js
│   └── globals.css
├── public/
│   ├── banner-masjid.jpg
│   ├── logo-daralihsan.jpg
│   └── galeri/                ← g1.jpg – g6.jpg (diperbarui otomatis)
├── scripts/
│   ├── update_gallery.py      ← Instagram sync script
│   ├── gallery_posts.json     ← state post saat ini
│   └── requirements.txt
└── .github/workflows/
    └── update-gallery.yml     ← cron 12:00 & 18:00 WIB
```

---

## Deploy ke Cloudflare Pages

1. Fork/push repo ke GitHub
2. Buka [Cloudflare Pages](https://pages.cloudflare.com) → Create project → Connect GitHub
3. Build settings:
   - **Framework:** Next.js
   - **Build command:** `npm run build`
   - **Output directory:** `out`
4. Deploy ✓

---

## Dibuat Oleh

<div align="center">

Dibangun dengan ❤️ sebagai **shadaqah ilmu** oleh

**[Yahya / k1m0ch1](https://github.com/k1m0ch1)**

Semoga menjadi amal jariyah dan bermanfaat untuk jamaah Masjid Daar Al-Ihsan.

*جَزَاكَ اللهُ خَيْرًا*

---

© 2025 Masjid Daar Al-Ihsan · Cimahi Utara, Jawa Barat

</div>
