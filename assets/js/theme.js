/**
 * theme.js — toggle & persist dark mode across the whole site.
 * Panggil initTheme() di setiap halaman sebelum konten dirender agar
 * tidak ada "flash" warna terang sebelum dark mode diterapkan.
 */
(function () {
  const KEY = "informatika8_theme";

  function apply(mode) {
    document.documentElement.classList.toggle("dark", mode === "dark");
  }

  function initTheme() {
    const saved = localStorage.getItem(KEY);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    apply(saved || (prefersDark ? "dark" : "light"));
  }

  function toggleTheme() {
    const isDark = document.documentElement.classList.contains("dark");
    const next = isDark ? "light" : "dark";
    localStorage.setItem(KEY, next);
    apply(next);
    document.querySelectorAll("[data-theme-icon]").forEach((el) => {
      el.setAttribute("data-lucide", next === "dark" ? "sun" : "moon");
    });
    if (window.lucide) lucide.createIcons();
  }

  window.initTheme = initTheme;
  window.toggleTheme = toggleTheme;
  initTheme();
})();
