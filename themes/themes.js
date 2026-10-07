/* ===== GERENCIADOR DE TEMA ===== */
const ThemeManager = (() => {
  const STORAGE_KEY = 'pca-theme';
  const DARK = 'dark';
  const LIGHT = 'light';

  function getSavedTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK : LIGHT;
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme === DARK ? DARK : '');
    localStorage.setItem(STORAGE_KEY, theme);
    updateToggleIcon(theme);
  }

  function updateToggleIcon(theme) {
    const btn = document.querySelector('.theme-toggle');
    if (!btn) return;
    
    const icon = btn.querySelector('i');
    if (icon) {
      if (theme === DARK) {
        icon.className = 'fas fa-sun';
        btn.setAttribute('aria-label', 'Ativar modo claro');
      } else {
        icon.className = 'fas fa-moon';
        btn.setAttribute('aria-label', 'Ativar modo escuro');
      }
    }
  }

  function toggle() {
    const current = localStorage.getItem(STORAGE_KEY) || getSavedTheme();
    applyTheme(current === DARK ? LIGHT : DARK);
  }

  function init() {
    applyTheme(getSavedTheme());
    const btn = document.querySelector('.theme-toggle');
    if (btn) btn.addEventListener('click', toggle);
  }

  return { init, toggle };
})();