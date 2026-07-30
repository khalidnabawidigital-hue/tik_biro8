/**
 * progress.js — menyimpan progres belajar siswa di localStorage perangkat
 * masing-masing (tidak dikirim ke server mana pun).
 *
 * Struktur data yang disimpan:
 * {
 *   "bab1": { "1": true, "2": false, ... },
 *   "bab2": { ... },
 *   ...
 * }
 */
const PROGRESS_KEY = "informatika8_progress";

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {};
  } catch (e) {
    return {};
  }
}

function saveProgress(data) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
}

function isPertemuanDone(babSlug, nomor) {
  const data = loadProgress();
  return !!(data[babSlug] && data[babSlug][nomor]);
}

function setPertemuanDone(babSlug, nomor, done) {
  const data = loadProgress();
  if (!data[babSlug]) data[babSlug] = {};
  data[babSlug][nomor] = done;
  saveProgress(data);
}

// Menghitung ringkasan progres satu bab: jumlah selesai, total, persen, status.
function getBabProgress(bab) {
  const data = loadProgress();
  const done = data[bab.slug]
    ? Object.values(data[bab.slug]).filter(Boolean).length
    : 0;
  const total = bab.pertemuan;
  const percent = total ? Math.round((done / total) * 100) : 0;
  let status = "available"; // belum ada pertemuan yang ditandai selesai
  if (done > 0 && done < total) status = "progress";
  if (done === total && total > 0) status = "done";
  return { done, total, percent, status };
}

function isBabUnlocked(index) {
  if (index === 0) return true;
  const prev = getBabProgress(BAB_DATA[index - 1]);
  return prev.done > 0;
}

// Status akhir yang ditampilkan di badge, memperhitungkan urutan (locked)
// selain progres bab itu sendiri. Guru tetap bisa mengklik bab manapun;
// status "locked" hanya penanda visual urutan belajar yang disarankan.
function getDisplayStatus(bab, index) {
  const progress = getBabProgress(bab);
  if (!isBabUnlocked(index)) return "locked";
  return progress.status;
}

// Ringkasan keseluruhan tahun ajaran (dipakai di landing page).
function getOverallProgress() {
  let done = 0;
  let total = 0;
  BAB_DATA.forEach((bab) => {
    const p = getBabProgress(bab);
    done += p.done;
    total += p.total;
  });
  return { done, total, percent: total ? Math.round((done / total) * 100) : 0 };
}

function badgeInfo(status) {
  if (status === "done") return { label: "Selesai", icon: "circle-check-big", cls: "badge-done" };
  if (status === "progress") return { label: "Sedang Dipelajari", icon: "circle-dot", cls: "badge-progress" };
  if (status === "available") return { label: "Tersedia", icon: "circle-dashed", cls: "badge-available" };
  return { label: "Belum Dibuka", icon: "lock", cls: "badge-locked" };
}
