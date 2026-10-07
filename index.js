/* ===== GERENCIADOR DO HEADER ===== */
const HeaderManager = (() => {
  let hamburger, mobileMenu, header;

  // O link ativo do menu agora é marcado por components/layout/layout.js,
  // que gera o header de todas as páginas.
  function setActiveLink() {}

  function initDropdown() {
    // Desktop: abre/fecha por clique também (além do hover via CSS), para
    // acessibilidade via teclado e uso em telas touch grandes
    const dropdown = document.querySelector('.nav-dropdown');
    const trigger = document.querySelector('.nav-dropdown-trigger');
    const menu = document.querySelector('.nav-dropdown-menu');
    if (dropdown && trigger && menu) {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const isOpen = menu.classList.toggle('open');
        trigger.setAttribute('aria-expanded', isOpen.toString());
      });

      document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
          menu.classList.remove('open');
          trigger.setAttribute('aria-expanded', 'false');
        }
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          menu.classList.remove('open');
          trigger.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // Mobile: accordion do grupo "Produtos"
    const mobileTrigger = document.querySelector('.mobile-nav-group-trigger');
    const mobileSubmenu = document.querySelector('.mobile-nav-submenu');
    if (mobileTrigger && mobileSubmenu) {
      mobileTrigger.addEventListener('click', () => {
        const isOpen = mobileSubmenu.classList.toggle('open');
        mobileTrigger.setAttribute('aria-expanded', isOpen.toString());
      });
    }
  }

  function initHamburger() {
    hamburger = document.querySelector('.hamburger');
    mobileMenu = document.querySelector('.mobile-menu');
    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen.toString());
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Fechar ao clicar em link (exceto o próprio gatilho do submenu)
    mobileMenu.querySelectorAll('a[data-nav]').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  function closeMobileMenu() {
    if (!mobileMenu || !hamburger) return;
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function initScroll() {
    header = document.querySelector('.site-header');
    if (!header) return;
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  function init() {
    setActiveLink();
    initHamburger();
    initDropdown();
    initScroll();
    ThemeManager.init();
  }

  return { init };
})();

/* ===== REVEAL ON SCROLL ===== */
function initReveal() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ===== TOAST (NOTIFICAÇÕES) ===== */
function showToast(message, icon = 'fa-circle-check') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.setAttribute('role', 'alert');
  toast.innerHTML = `<i class="fas ${icon}"></i> ${message}`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'toastIn 0.3s ease reverse';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

const yearElement = document.getElementById('currentYear');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

/* ===== INIT GLOBAL ===== */
document.addEventListener('DOMContentLoaded', () => {
  HeaderManager.init();
  initReveal();
});

// Botões do topo das páginas (components/page-hero): o atributo data-wa-hero
// traz a mensagem que será enviada pelo WhatsApp.
document.addEventListener('DOMContentLoaded', function () {
  var numero = '5511999999999';
  if (typeof window.getWhatsAppGeneral === 'function') {
    var m = window.getWhatsAppGeneral().match(/wa\.me\/(\d+)/);
    if (m) numero = m[1];
  }
  document.querySelectorAll('[data-wa-hero]').forEach(function (a) {
    a.href = 'https://wa.me/' + numero + '?text=' + encodeURIComponent(a.getAttribute('data-wa-hero'));
    a.target = '_blank';
    a.rel = 'noopener';
  });
});
