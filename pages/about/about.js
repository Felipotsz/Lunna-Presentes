/* ===== LINKS WHATSAPP ===== */
function initWhatsAppLinks() {
  if (typeof getWhatsAppGeneral !== 'function') {
    setTimeout(initWhatsAppLinks, 100);
    return;
  }
  
  const generalLink = getWhatsAppGeneral();

  const ids = ['header-whatsapp', 'mobile-whatsapp', 'historia-whatsapp', 'cta-whatsapp', 'footer-whatsapp'];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.href = generalLink;
  });
}

/* ===== REVEAL ON SCROLL ===== */
function initRevealOnScroll() {
  const revealElements = document.querySelectorAll('.reveal');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  
  revealElements.forEach(el => observer.observe(el));
}

/* ===== HEADER SCROLL EFFECT ===== */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ===== ANIMAÇÃO DOS ÍCONES DOS VALORES ===== */
function initValueIconsAnimation() {
  const valueItems = document.querySelectorAll('.mvv-values li');
  
  valueItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const icon = item.querySelector('i');
      if (icon) {
        icon.style.transform = 'scale(1.2)';
        setTimeout(() => {
          icon.style.transform = '';
        }, 300);
      }
    });
  });
}

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    initWhatsAppLinks();
    initRevealOnScroll();
    initHeaderScroll();
    initValueIconsAnimation();
  }, 100);
});
