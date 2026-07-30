/**
 * landing.js — merender kartu roadmap Bab 1–9 di index.html
 */
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("roadmap-track");
  const overall = getOverallProgress();

  // ---- Ringkasan progres tahunan di hero ----
  const overallFill = document.getElementById("overall-fill");
  const overallLabel = document.getElementById("overall-label");
  if (overallFill) overallFill.style.width = overall.percent + "%";
  if (overallLabel) overallLabel.textContent = `${overall.percent}% • ${overall.done}/${overall.total} pertemuan`;

  const lineBase = document.createElement("div");
  lineBase.className = "roadmap-line-base";
  const lineFill = document.createElement("div");
  lineFill.className = "roadmap-line-fill";
  lineFill.style.height = overall.percent + "%";
  track.appendChild(lineBase);
  track.appendChild(lineFill);

  BAB_DATA.forEach((bab, index) => {
    const progress = getBabProgress(bab);
    const badge = badgeInfo(getDisplayStatus(bab, index));
    const side = index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse";

    const node = document.createElement("div");
    node.className = `relative flex flex-col ${side} items-center gap-6 md:gap-10`;
    node.setAttribute("data-aos", index % 2 === 0 ? "fade-right" : "fade-left");
    node.setAttribute("data-aos-delay", String((index % 5) * 60));

    node.innerHTML = `
      <a href="${bab.slug}.html"
         class="node-card glass-strong group relative z-10 flex w-full max-w-xl flex-1 items-center gap-5 rounded-3xl p-5 md:p-6"
      >
        <div class="node-dot flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--blue-600)] to-[var(--sky-400)] text-white shadow-lg">
          <i data-lucide="${bab.icon}" class="h-7 w-7"></i>
        </div>
        <div class="min-w-0 flex-1">
          <div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-soft)]">
            <span>Bab ${bab.id}</span>
            <span class="badge ${badge.cls} inline-flex items-center gap-1 rounded-full px-2 py-0.5">
              <i data-lucide="${badge.icon}" class="h-3 w-3"></i>${badge.label}
            </span>
          </div>
          <h3 class="mt-1 truncate text-lg font-semibold md:text-xl">${bab.judul}</h3>
          <div class="mt-3 progress-track">
            <div class="progress-fill" style="width:${progress.percent}%"></div>
          </div>
          <p class="mt-1 text-xs text-[var(--text-soft)]">${progress.done}/${progress.total} pertemuan • ${progress.percent}%</p>
        </div>
        <i data-lucide="chevron-right" class="hidden h-5 w-5 shrink-0 text-[var(--text-soft)] transition group-hover:translate-x-1 group-hover:text-[var(--blue-600)] md:block"></i>
      </a>
      <div class="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full glass text-sm font-bold md:flex">${bab.id}</div>
    `;

    track.appendChild(node);
  });

  if (window.lucide) lucide.createIcons();
  if (window.AOS) AOS.init({ once: true, duration: 700, easing: "ease-out-cubic" });
});
