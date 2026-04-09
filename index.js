/* ===== GERENCIADOR DO HEADER ===== */
const HeaderManager = (() => {
  let hamburger, mobileMenu, header;

  function setActiveLink() {
    const path = window.location.pathname;
    document.querySelectorAll('.header-nav a, .mobile-menu a[data-nav]').forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href') || '';
      if (
        (path.endsWith('index.html') || path === '/' || path.endsWith('/')) && href.includes('index')
      ) {
        link.classList.add('active');
      } else if (path.includes('about') && href.includes('about')) {
        link.classList.add('active');
      } else if (path.includes('products') && href.includes('products')) {
        link.classList.add('active');
      }
    });
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

    // Fechar ao clicar em link
    mobileMenu.querySelectorAll('a').forEach(link => {
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
    initScroll();
    ThemeManager.init();
  }

  return { init };
})();

/* ===== MODAL DE PRODUTO ===== */
const ProductModal = (() => {
  let overlay, modal, currentImages = [], currentImgIndex = 0;

  function buildModal() {
    overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'modal-product-title');

    overlay.innerHTML = `
      <div class="modal" id="product-modal">
        <button class="modal-close" aria-label="Fechar modal">✕</button>
        <div class="modal-body">
          <div class="modal-gallery">
            <div class="modal-main-img">
              <img id="modal-main-image" src="" alt="" loading="lazy" />
            </div>
            <div class="modal-thumbs" id="modal-thumbs"></div>
          </div>
          <div class="modal-info">
            <h2 id="modal-product-title"></h2>
            <div class="modal-price" id="modal-price"></div>
            <div class="modal-tags" id="modal-tags"></div>
            <p class="modal-desc" id="modal-desc"></p>
            <div class="modal-actions">
              <a id="modal-whatsapp" class="btn btn-whatsapp" target="_blank" rel="noopener">
                💬 Pedir pelo WhatsApp
              </a>
              <button class="btn btn-outline" onclick="ProductModal.close()">
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    overlay.querySelector('.modal-close').addEventListener('click', close);
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }

  function open(product) {
    if (!overlay) buildModal();

    currentImages = product.images || [];
    currentImgIndex = 0;

    overlay.querySelector('#modal-product-title').textContent = product.name;
    overlay.querySelector('#modal-price').textContent = product.price;
    overlay.querySelector('#modal-desc').textContent = product.description;
    overlay.querySelector('#modal-whatsapp').href = getWhatsAppLink(product);

    // Tags
    const tagsEl = overlay.querySelector('#modal-tags');
    const tags = [];
    if (product.isNew) tags.push('🆕 Novidade');
    if (product.customizable) tags.push('✏️ Personalizável');
    tags.push('📦 ' + (product.category.charAt(0).toUpperCase() + product.category.slice(1)));
    tagsEl.innerHTML = tags.map(t => `<span class="modal-tag">${t}</span>`).join('');

    // Galeria
    renderGallery();

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Focus trap
    setTimeout(() => overlay.querySelector('.modal-close').focus(), 100);
  }

  function renderGallery() {
    const mainImg = overlay.querySelector('#modal-main-image');
    mainImg.src = currentImages[currentImgIndex] || '';
    mainImg.alt = '';

    const thumbsEl = overlay.querySelector('#modal-thumbs');
    thumbsEl.innerHTML = '';

    currentImages.forEach((src, i) => {
      const div = document.createElement('div');
      div.className = 'modal-thumb' + (i === currentImgIndex ? ' active' : '');
      div.innerHTML = `<img src="${src}" alt="Imagem ${i + 1}" loading="lazy" />`;
      div.addEventListener('click', () => setImage(i));
      thumbsEl.appendChild(div);
    });
  }

  function setImage(index) {
    currentImgIndex = index;
    renderGallery();
  }

  function close() {
    if (!overlay) return;
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  return { open, close };
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
function showToast(message, emoji = '✅') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.setAttribute('role', 'alert');
  toast.innerHTML = `<span>${emoji}</span> ${message}`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'toastIn 0.3s ease reverse';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/* ===== UTILITÁRIOS ===== */
/** Retorna WhatsApp link (usa função do products.data.js ou fallback) */
function getWhatsAppLink(product) {
  if (typeof window.getWhatsAppLink === 'function') {
    return window.getWhatsAppLink(product);
  }
  const text = encodeURIComponent(`Olá! Tenho interesse no produto: *${product.name}* (${product.price}).`);
  return `https://wa.me/5511999999999?text=${text}`;
}

/** Debounce simples */
function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/** Gera card de produto (usado em múltiplas páginas) */
function createProductCard(product, classes = '') {
  const card = document.createElement('article');
  card.className = `product-card ${classes}`;
  card.setAttribute('aria-label', product.name);

  const imgSrc = product.images?.[0] || 'https://via.placeholder.com/400x300?text=Imagem';

  card.innerHTML = `
    <div class="product-card-image">
      ${product.isNew ? '<span class="badge-new" aria-label="Novidade">Novidade</span>' : ''}
      ${product.customizable ? '<span class="badge-custom" aria-label="Personalizável">✏️ Personalizável</span>' : ''}
      <img src="${imgSrc}" alt="${product.name}" loading="lazy" />
    </div>
    <div class="product-card-body">
      <h3 class="product-card-name">${product.name}</h3>
      <p class="product-card-desc">${product.shortDescription}</p>
      <div class="product-card-price">${product.price}</div>
      <div class="product-card-actions">
        <button class="btn btn-outline btn-sm" 
                onclick="ProductModal.open(${JSON.stringify(product).replace(/"/g, '&quot;')})"
                aria-label="Saiba mais sobre ${product.name}">
          Saiba mais
        </button>
        <a class="btn btn-whatsapp btn-sm"
           href="${getWhatsAppLink(product)}"
           target="_blank"
           rel="noopener noreferrer"
           aria-label="Pedir ${product.name} pelo WhatsApp">
          💬 WhatsApp
        </a>
      </div>
    </div>
  `;

  return card;
}

// Atualizar o ano no footer
const yearElement = document.getElementById('currentYear');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

/* ===== INIT GLOBAL ===== */
document.addEventListener('DOMContentLoaded', () => {
  HeaderManager.init();
  initReveal();
});
