# Roadmap Pembelajaran Informatika — Kelas VIII

Website statis (HTML + TailwindCSS via CDN + JavaScript murni, tanpa framework)
untuk memperkenalkan roadmap belajar Informatika Kelas VIII selama satu tahun
ajaran, dan sebagai portal menuju materi interaktif setiap pertemuan.

## Cara pakai

1. Buka `index.html` langsung di browser (double click), atau host foldernya
   di GitHub Pages / hosting statis apa pun. Tidak perlu server atau build step.
2. Klik salah satu kartu Bab untuk masuk ke halaman bab (Capaian Pembelajaran,
   Sekilas Materi, Progres, dan Daftar Pertemuan).
3. Di halaman bab, klik **Masuk Materi** pada pertemuan yang diinginkan.

## Struktur folder

Semua file inti — halaman utama, aset, dan semua bab — berada **satu level
(root)**, tidak dipisah folder per bab/pertemuan, supaya tautan antar halaman
selalu berupa nama file biasa (`bab2.html`, bukan `bab2/index.html` atau
`../assets/...`) dan tidak mudah rusak saat file dipindah-pindah atau di-hosting.

```
index.html                     -> landing page + roadmap Bab 1–9
bab1.html … bab9.html          -> satu file per bab, berisi overview + seluruh pertemuan (sebagai tab)
assets/css/style.css           -> semua styling (glassmorphism, gradient, dark mode, tab & panel)
assets/js/data.js              -> SUMBER DATA: judul, CP, sekilas materi, jumlah pertemuan
assets/js/theme.js             -> logika dark mode
assets/js/progress.js          -> logika progres & badge (disimpan di localStorage browser)
assets/js/landing.js           -> render kartu roadmap di index.html
assets/js/babpage.js           -> render overview + tab pertemuan di bab2.html … bab9.html
gen.py                          -> generator placeholder untuk bab2.html … bab9.html (lihat di bawah)
```

Catatan: `bab1.html` **tidak** dibuat oleh `babpage.js`/`gen.py` — isinya sudah
materi lengkap yang ditulis manual (bukan placeholder), jadi strukturnya sedikit
berbeda dari bab2–bab9 dan sengaja dilewati oleh generator.

## Mengisi materi interaktif

Setiap `babX.html` (X = 2..9) saat ini merender pertemuan sebagai panel tab
placeholder ("Halaman ini placeholder struktur…"). **Ganti isi panel tersebut**
langsung di dalam `assets/js/babpage.js` (bagian yang membuat `panel.innerHTML`)
atau, kalau materi tiap bab ingin berbeda-beda kontennya, ubah `babX.html`
menjadi halaman mandiri seperti pola `bab1.html` (lihat isi file itu sebagai
contoh: satu file, banyak `section-panel` dengan `id="section-N"`, dan sebuah
tombol tab per pertemuan). Selama nama file (`babX.html`) tidak diubah, tautan
dari `index.html` tetap berfungsi.

## Mengubah jumlah pertemuan / menambah bab

Semua teks dan jumlah pertemuan diatur di **satu tempat**: `assets/js/data.js`.

- Ubah judul bab, Capaian Pembelajaran, atau daftar "Sekilas Materi" langsung
  di objek bab yang bersangkutan.
- Ubah angka `pertemuan: n` untuk menambah/mengurangi jumlah tab pertemuan yang
  tampil di halaman bab (badge, progress bar, dan tab otomatis menyesuaikan
  lewat `babpage.js` — tidak perlu bikin file baru).
- Jika menambah bab baru, tambahkan objeknya di `data.js` **dan** di daftar
  `BABS` pada `gen.py`, lalu jalankan `python3 gen.py` (butuh Python 3) untuk
  membuat `babN.html` barunya langsung di root — tanpa folder.

## Progres & lencana

Progres disimpan di `localStorage` browser masing-masing perangkat (tidak
terkirim ke server mana pun). Guru/siswa menandai pertemuan selesai lewat
tombol centang di halaman bab. Lencana otomatis mengikuti:

- 🔒 **Belum Dibuka** — bab sebelumnya belum ada progres.
- ⚪ **Tersedia** — bisa mulai dipelajari, belum ada pertemuan yang selesai.
- 🟡 **Sedang Dipelajari** — sebagian pertemuan sudah ditandai selesai.
- 🟢 **Selesai** — seluruh pertemuan pada bab tersebut sudah ditandai selesai.

Status "terkunci" hanya penanda visual urutan belajar yang disarankan; guru
tetap bebas mengklik bab mana pun kapan saja.

## Desain

Poppins, glassmorphism, gradient biru, animasi AOS, ikon Lucide, dan mode
gelap — semua token warna & style ada di `assets/css/style.css` bila ingin
disesuaikan.
