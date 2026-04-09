// data/configs.data.js
// CONFIGURAÇÕES GERAIS

(function() {
  'use strict';

  // ============================================================
  // 1. WHATSAPP LINKS
  // ============================================================
  
  // Função para obter link geral do WhatsApp
  window.getWhatsAppGeneral = function() {
    const phoneNumber = "5511999999999"; // Número real da Lunna Presentes
    const defaultMessage = encodeURIComponent("Olá! Gostaria de saber mais sobre os produtos personalizados da Lunna Presentes.");
    return `https://wa.me/${phoneNumber}?text=${defaultMessage}`;
  };

  // Função para obter link do WhatsApp com produto específico
  window.getWhatsAppLink = function(product) {
    const phoneNumber = product.whatsappNumber || "5511999999999";
    const message = encodeURIComponent(`Olá! Tenho interesse no produto: *${product.name}* (${product.price}).`);
    return `https://wa.me/${phoneNumber}?text=${message}`;
  };

  // ============================================================
  // 2. FUNÇÕES AUXILIARES PARA PRODUTOS
  // ============================================================

  // Escapar HTML para segurança
  window.escapeHtml = function(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  };

  // Nome da categoria em português
  window.getCategoryName = function(cat) {
    const names = {
      'canecas': 'Canecas',
      'camisas': 'Camisas',
      'cestas': 'Cestas',
      'personalizados': 'Personalizados'
    };
    return names[cat] || cat;
  };

  // Debounce para inputs de busca
  window.debounce = function(fn, delay = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  };

  // ============================================================
  // 3. CRIAÇÃO DE CARD DE PRODUTO
  // ============================================================

  window.createProductCard = function(product, classes = '') {
    const card = document.createElement('article');
    card.className = `product-card ${classes}`;
    card.setAttribute('aria-label', product.name);

    const imgSrc = product.images?.[0] || 'https://via.placeholder.com/400x300?text=Imagem';
    const escapeHtml = window.escapeHtml;
    const getWhatsAppLink = window.getWhatsAppLink;

    card.innerHTML = `
      <div class="product-card-image">
        ${product.isNew ? '<span class="badge-new" aria-label="Novidade">Novidade</span>' : ''}
        ${product.customizable ? '<span class="badge-custom" aria-label="Personalizável">✏️ Personalizável</span>' : ''}
        <img src="${imgSrc}" alt="${escapeHtml(product.name)}" loading="lazy" />
      </div>
      <div class="product-card-body">
        <h3 class="product-card-name">${escapeHtml(product.name)}</h3>
        <p class="product-card-desc">${escapeHtml(product.shortDescription)}</p>
        <div class="product-card-price">${product.price}</div>
        <div class="product-card-actions">
          <button class="btn btn-outline btn-sm" 
                  onclick="window.openProductModal(${JSON.stringify(product).replace(/"/g, '&quot;')})"
                  aria-label="Saiba mais sobre ${escapeHtml(product.name)}">
            Saiba mais
          </button>
          <a class="btn btn-whatsapp btn-sm"
             href="${getWhatsAppLink(product)}"
             target="_blank"
             rel="noopener noreferrer"
             aria-label="Pedir ${escapeHtml(product.name)} pelo WhatsApp">
            💬 WhatsApp
          </a>
        </div>
      </div>
    `;

    return card;
  };

  // ============================================================
  // 4. MODAL DE PRODUTO
  // ============================================================

  window.openProductModal = function(product) {
    const escapeHtml = window.escapeHtml;
    const getCategoryName = window.getCategoryName;
    const getWhatsAppLink = window.getWhatsAppLink;
    
    const modalHtml = `
      <div class="modal-overlay" id="product-modal-overlay" style="opacity: 0; visibility: hidden;">
        <div class="modal" style="transform: scale(0.9) translateY(20px);">
          <button class="modal-close" onclick="window.closeProductModal()">✕</button>
          <div class="modal-body">
            <div class="modal-gallery">
              <div class="modal-main-img">
                <img id="modal-main-image" src="${product.images?.[0] || ''}" alt="${escapeHtml(product.name)}" />
              </div>
            </div>
            <div class="modal-info">
              <h2>${escapeHtml(product.name)}</h2>
              <div class="modal-price">${product.price}</div>
              <div class="modal-tags">
                ${product.isNew ? '<span class="modal-tag">🆕 Novidade</span>' : ''}
                ${product.customizable ? '<span class="modal-tag">✏️ Personalizável</span>' : ''}
                <span class="modal-tag">📦 ${getCategoryName(product.category)}</span>
              </div>
              <p class="modal-desc">${escapeHtml(product.description)}</p>
              <div class="modal-actions">
                <a href="${getWhatsAppLink(product)}" class="btn btn-whatsapp" target="_blank" rel="noopener">
                  💬 Pedir pelo WhatsApp
                </a>
                <button class="btn btn-outline" onclick="window.closeProductModal()">
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    let overlay = document.getElementById('product-modal-overlay');
    if (overlay) {
      overlay.remove();
    }

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    overlay = document.getElementById('product-modal-overlay');
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
      overlay.style.opacity = '1';
      overlay.style.visibility = 'visible';
      overlay.querySelector('.modal').style.transform = 'scale(1) translateY(0)';
    }, 10);
  };

  window.closeProductModal = function() {
    const overlay = document.getElementById('product-modal-overlay');
    if (overlay) {
      overlay.style.opacity = '0';
      overlay.style.visibility = 'hidden';
      document.body.style.overflow = '';
      setTimeout(() => overlay.remove(), 300);
    }
  };

  console.log('⚙️ Configurações carregadas');
})();