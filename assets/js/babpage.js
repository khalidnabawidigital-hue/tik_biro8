/**
 * babpage.js — dipakai oleh setiap babN.html (N = 2..9) di root.
 * Satu file HTML per bab, berisi overview + seluruh pertemuan sebagai tab,
 * jadi tidak perlu folder/subfolder terpisah.
 * Halaman HTML cukup men-set `const BAB_ID = n;` sebelum memuat script ini.
 */
document.addEventListener("DOMContentLoaded", () => {
  const bab = BAB_DATA.find((b) => b.id === BAB_ID);
  if (!bab) return;

  const babIndex = BAB_DATA.findIndex((b) => b.id === BAB_ID);

  document.title = `Bab ${bab.id}: ${bab.judul} — Informatika Kelas VIII`;

  // ---- Header / hero ----
  document.getElementById("bab-eyebrow").textContent = `Bab ${bab.id} dari ${BAB_DATA.length}`;
  document.getElementById("bab-title").textContent = bab.judul;
  document.getElementById("bab-icon").setAttribute("data-lucide", bab.icon);
  document.getElementById("bab-cp").textContent = bab.cp;

  const badgeEl = document.getElementById("bab-badge");
  function renderBadge() {
    const badge = badgeInfo(getDisplayStatus(bab, babIndex));
    badgeEl.className = `badge ${badge.cls} inline-flex items-center gap-1.5 rounded-full px-3 py-1`;
    badgeEl.innerHTML = `<i data-lucide="${badge.icon}" class="h-3.5 w-3.5"></i>${badge.label}`;
  }
  renderBadge();

  const materiWrap = document.getElementById("bab-materi");
  bab.materi.forEach((m) => {
    const chip = document.createElement("span");
    chip.className = "glass rounded-full px-3.5 py-1.5 text-xs font-medium text-[var(--text-soft)]";
    chip.textContent = m;
    materiWrap.appendChild(chip);
  });

  function renderProgressBar() {
    const progress = getBabProgress(bab);
    document.getElementById("bab-progress-fill").style.width = progress.percent + "%";
    document.getElementById("bab-progress-label").textContent = `${progress.percent}% • ${progress.done}/${progress.total} pertemuan selesai`;
  }
  renderProgressBar();

  // ---- Tab bar + panel per pertemuan (semua di satu halaman) ----
  const tabBar = document.getElementById("tab-bar");
  const panelsWrap = document.getElementById("panels-wrap");

  for (let n = 1; n <= bab.pertemuan; n++) {
    const done = isPertemuanDone(bab.slug, n);

    const tabBtn = document.createElement("button");
    tabBtn.className = "tab-pill" + (n === 1 ? " active" : "");
    tabBtn.dataset.tab = String(n);
    tabBtn.innerHTML = `<i data-lucide="calendar" class="h-3.5 w-3.5"></i>Pertemuan ${n}<span class="done-dot ${done ? "" : "hidden"}" data-dot="${n}"></span>`;
    tabBar.appendChild(tabBtn);

    const panel = document.createElement("section");
    panel.className = "section-panel mt-6" + (n === 1 ? " active" : "");
    panel.id = "section-" + n;
    panel.innerHTML = `
      <div class="glass-strong rounded-3xl p-6 md:p-8">
        <div class="flex items-start justify-between gap-3">
          <h2 class="flex items-center gap-2 text-lg font-bold md:text-xl">
            <i data-lucide="construction" class="h-5 w-5 text-[var(--blue-600)]"></i>Pertemuan ${n}
          </h2>
          <button
            class="mark-done btn-gradient flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold"
            data-nomor="${n}"
          >
            <i data-lucide="check" class="h-3.5 w-3.5"></i><span>${done ? "Sudah Selesai" : "Tandai Selesai"}</span>
          </button>
        </div>
        <p class="mt-4 text-sm leading-relaxed text-[var(--text-soft)] md:text-base">
          Halaman ini placeholder struktur. Ganti isi panel ini langsung di dalam
          <code class="rounded bg-black/5 px-1.5 py-0.5 dark:bg-white/10">${bab.slug}.html</code>
          (bagian <code class="rounded bg-black/5 px-1.5 py-0.5 dark:bg-white/10">#section-${n}</code>)
          dengan materi interaktif Pertemuan ${n} buatan Anda.
        </p>
      </div>
    `;
    panelsWrap.appendChild(panel);
  }

  function setActiveTab(n) {
    tabBar.querySelectorAll(".tab-pill").forEach((t) => t.classList.toggle("active", t.dataset.tab === String(n)));
    panelsWrap.querySelectorAll(".section-panel").forEach((p) => p.classList.toggle("active", p.id === "section-" + n));
    window.scrollTo({ top: tabBar.offsetTop - 90, behavior: "smooth" });
  }
  tabBar.querySelectorAll(".tab-pill").forEach((t) => t.addEventListener("click", () => setActiveTab(t.dataset.tab)));

  // Tandai selesai/belum per pertemuan (tersimpan di localStorage, dipakai juga oleh badge di index.html)
  panelsWrap.addEventListener("click", (e) => {
    const btn = e.target.closest(".mark-done");
    if (!btn) return;
    const n = btn.dataset.nomor;
    const nowDone = !isPertemuanDone(bab.slug, n);
    setPertemuanDone(bab.slug, n, nowDone);

    btn.querySelector("span").textContent = nowDone ? "Sudah Selesai" : "Tandai Selesai";
    const dot = tabBar.querySelector(`[data-dot="${n}"]`);
    if (dot) dot.classList.toggle("hidden", !nowDone);

    renderProgressBar();
    renderBadge();
    if (window.lucide) lucide.createIcons();
  });

  // ---- Navigasi bab sebelumnya / berikutnya ----
  const nav = document.getElementById("bab-nav");
  const prev = BAB_DATA[babIndex - 1];
  const next = BAB_DATA[babIndex + 1];
  nav.innerHTML = `
    ${prev ? `<a href="${prev.slug}.html" class="glass flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium"><i data-lucide="arrow-left" class="h-4 w-4"></i>Bab ${prev.id}</a>` : `<a href="index.html" class="glass flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium"><i data-lucide="arrow-left" class="h-4 w-4"></i>Beranda</a>`}
    <a href="index.html#roadmap" class="glass flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium"><i data-lucide="layout-grid" class="h-4 w-4"></i>Roadmap</a>
    ${next ? `<a href="${next.slug}.html" class="glass flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium">Bab ${next.id}<i data-lucide="arrow-right" class="h-4 w-4"></i></a>` : `<span></span>`}
  `;

  if (window.lucide) lucide.createIcons();
  if (window.AOS) AOS.init({ once: true, duration: 600 });
});
