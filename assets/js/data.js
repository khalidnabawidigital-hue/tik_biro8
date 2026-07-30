/**
 * data.js
 * -----------------------------------------------------------------------
 * Sumber data tunggal untuk seluruh roadmap Informatika Kelas VIII.
 * Ubah teks, jumlah pertemuan, atau tambahkan bab baru HANYA di file ini.
 * Semua halaman (index.html, halaman bab, halaman pertemuan)
 * membaca dari array BAB_DATA di bawah, jadi perubahan di sini otomatis
 * tampil di semua halaman.
 *
 * CARA MENAMBAH / MENGURANGI PERTEMUAN:
 *  - Ubah angka pada properti `pertemuan` (jumlah pertemuan pada bab itu).
 *  - Lalu jalankan ulang generator (lihat README.md) ATAU cukup buat/hapus
 *    folder bab{n}/pertemuan{m}/ secara manual mengikuti pola yang ada.
 * -----------------------------------------------------------------------
 */

const BAB_DATA = [
  {
    id: 1,
    slug: "bab1",
    icon: "compass",
    judul: "Informatika dan Pembelajarannya",
    cp: "Peserta didik memahami hakikat Informatika, cara belajar Informatika, melakukan refleksi pembelajaran, menyusun rencana belajar, serta membangun karakter Profil Pelajar Pancasila.",
    materi: [
      "Apa itu Informatika",
      "Cara belajar Informatika",
      "Refleksi pembelajaran kelas VII",
      "Rencana belajar kelas VIII",
      "Profil Pelajar Pancasila",
      "Target pembelajaran satu tahun",
    ],
    pertemuan: 4,
  },
  {
    id: 2,
    slug: "bab2",
    icon: "brain",
    judul: "Berpikir Komputasional",
    cp: "Peserta didik mampu menerapkan berpikir komputasional untuk menyelesaikan masalah melalui fungsi, himpunan, sistem bilangan, algoritma, dan struktur data.",
    materi: [
      "Fungsi",
      "Himpunan",
      "Bilangan Desimal",
      "Bilangan Biner",
      "Bilangan Oktal",
      "Konversi Bilangan",
      "Algoritma",
      "Stack",
      "Penyelesaian masalah",
    ],
    pertemuan: 6,
  },
  {
    id: 3,
    slug: "bab3",
    icon: "monitor",
    judul: "Teknologi Informasi dan Komunikasi",
    cp: "Peserta didik mampu menggunakan aplikasi digital secara efektif untuk membuat dokumen, laporan, serta memanfaatkan laboratorium virtual.",
    materi: [
      "Aplikasi Perkantoran",
      "Fitur Aplikasi",
      "Pengolah Kata",
      "Laporan Digital",
      "Ringkasan Konten Digital",
      "Laboratorium Virtual",
    ],
    pertemuan: 4,
  },
  {
    id: 4,
    slug: "bab4",
    icon: "cpu",
    judul: "Sistem Komputer",
    cp: "Peserta didik memahami komponen sistem komputer, pengalamatan memori, sistem heksadesimal, dan CPU.",
    materi: [
      "Hardware",
      "Software",
      "Sistem Operasi",
      "Hexadecimal",
      "Pengalamatan Memori",
      "CPU",
      "Cara kerja komputer",
    ],
    pertemuan: 5,
  },
  {
    id: 5,
    slug: "bab5",
    icon: "wifi",
    judul: "Jaringan Komputer dan Internet",
    cp: "Peserta didik memahami jaringan komputer, internet, routing, komunikasi data, dan keamanan internet.",
    materi: [
      "LAN",
      "Internet",
      "Routing",
      "Konfigurasi Jaringan",
      "Data Seluler",
      "Browser",
      "Phishing",
      "Internet Aman",
    ],
    pertemuan: 5,
  },
  {
    id: 6,
    slug: "bab6",
    icon: "bar-chart-3",
    judul: "Analisis Data",
    cp: "Peserta didik mampu mengolah, mencari, meringkas, memvisualisasikan, dan menyajikan data.",
    materi: [
      "Lookup",
      "Reference",
      "Visualisasi Data",
      "Grafik",
      "Pivot Table",
      "SUMIFS",
      "COUNTIFS",
      "Pengelolaan Data",
    ],
    pertemuan: 5,
  },
  {
    id: 7,
    slug: "bab7",
    icon: "code-2",
    judul: "Algoritma dan Pemrograman",
    cp: "Peserta didik mampu membuat program menggunakan Scratch dan Blockly serta memahami pemrograman prosedural.",
    materi: [
      "Scratch",
      "Blockly",
      "Variable",
      "Input",
      "Percabangan",
      "Perulangan",
      "Custom Block",
      "Prosedur",
      "Robot Ozobot",
    ],
    pertemuan: 6,
  },
  {
    id: 8,
    slug: "bab8",
    icon: "users",
    judul: "Dampak Sosial Informatika",
    cp: "Peserta didik memahami dampak media sosial, cyberbullying, literasi digital, serta mampu berpikir kritis terhadap informasi digital.",
    materi: [
      "Media Sosial",
      "Hoaks",
      "Validasi Informasi",
      "Cyberbullying",
      "Etika Digital",
      "Jejak Digital",
    ],
    pertemuan: 4,
  },
  {
    id: 9,
    slug: "bab9",
    icon: "rocket",
    judul: "Praktik Lintas Bidang",
    cp: "Peserta didik mampu membuat proyek Informatika dengan menggabungkan seluruh materi yang telah dipelajari.",
    materi: [
      "Media Interaktif",
      "Proyek Scratch",
      "Mesin Hitung",
      "Modifikasi Program",
      "Presentasi Proyek",
    ],
    pertemuan: 4,
  },
];

// Path root relatif terhadap letak file yang memanggilnya diatur lewat ROOT_PATH
// yang di-set di setiap halaman sebelum data.js dipakai (lihat komentar di HTML).
if (typeof module !== "undefined") module.exports = BAB_DATA;
