/**
 * about.js — Lógica da página Sobre (versão melhorada)
 * Animações, contadores, links WhatsApp, depoimentos e revelação de elementos
 */

/* ============================================================
   1. LINKS WHATSAPP
   ============================================================ */
function initWhatsAppLinks() {
  // Aguarda a função getWhatsAppGeneral estar disponível
  if (typeof getWhatsAppGeneral !== 'function') {
    console.warn('⚠️ getWhatsAppGeneral não definido. Tentando novamente em 100ms...');
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

/* ============================================================
   2. ANIMAÇÃO DE CONTADORES
   ============================================================ */
function initCounters() {
  const counters = document.querySelectorAll('.number-value[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

/**
 * Anima um número de 0 até o valor em data-target
 * @param {HTMLElement} el
 */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 2000;
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    // Easing out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);
    el.textContent = current.toLocaleString('pt-BR');
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

/* ============================================================
   3. REVEAL ON SCROLL (Intersection Observer)
   ============================================================ */
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

/* ============================================================
   4. HEADER SCROLL EFFECT
   ============================================================ */
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

/* ============================================================
   5. GALERIA COM LIGHTBOX
   ============================================================ */
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.about-gal-item');
  
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (!img) return;
      
      // Criar lightbox simples
      const lightbox = document.createElement('div');
      lightbox.className = 'lightbox-overlay';
      lightbox.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.9);
        z-index: 2000;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease;
      `;
      
      const lightboxImg = document.createElement('img');
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxImg.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        transform: scale(0.9);
        transition: transform 0.3s ease;
      `;
      
      lightbox.appendChild(lightboxImg);
      document.body.appendChild(lightbox);
      document.body.style.overflow = 'hidden';
      
      // Animar entrada
      setTimeout(() => {
        lightbox.style.opacity = '1';
        lightboxImg.style.transform = 'scale(1)';
      }, 10);
      
      // Fechar ao clicar
      lightbox.addEventListener('click', () => {
        lightbox.style.opacity = '0';
        lightboxImg.style.transform = 'scale(0.9)';
        setTimeout(() => {
          lightbox.remove();
          document.body.style.overflow = '';
        }, 300);
      });
      
      // Fechar com ESC
      const handleEsc = (e) => {
        if (e.key === 'Escape') {
          lightbox.click();
          document.removeEventListener('keydown', handleEsc);
        }
      };
      document.addEventListener('keydown', handleEsc);
    });
  });
}

/* ============================================================
   6. ANIMAÇÃO DOS ÍCONES DOS VALORES
   ============================================================ */
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

/* ============================================================
   7. FUNÇÃO AUXILIAR PARA GERAR ESTRELAS
   ============================================================ */
function getStarRating(rating) {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars += '<i class="fas fa-star"></i>';
    } else {
      stars += '<i class="far fa-star"></i>';
    }
  }
  return stars;
}

/* ============================================================
   8. CARREGAR DEPOIMENTOS DINAMICAMENTE
   ============================================================ */
function initDepoimentos() {
  const grid = document.getElementById('depoimentos-grid');
  if (!grid) return;
  
  // Verificar se a função getDepoimentosDestaque existe
  if (typeof window.getDepoimentosDestaque !== 'function') {
    console.warn('⚠️ getDepoimentosDestaque não encontrado. Verifique se comentarios.data.js foi carregado.');
    // Fallback com depoimentos estáticos
    grid.innerHTML = getStaticDepoimentosHTML();
    return;
  }
  
  const depoimentosDestaque = window.getDepoimentosDestaque(3);
  
  if (!depoimentosDestaque.length) {
    grid.innerHTML = getStaticDepoimentosHTML();
    return;
  }
  
  grid.innerHTML = depoimentosDestaque.map(depoimento => `
    <div class="depoimento-card reveal">
      <div class="depoimento-quote">“</div>
      <p>${depoimento.comentario}</p>
      <div class="depoimento-author">
        ${depoimento.foto 
          ? `<img src="${depoimento.foto}" alt="${depoimento.nome}">`
          : `<i class="fas fa-user-circle"></i>`
        }
        <div>
          <strong>${depoimento.nome}</strong>
          <span>${depoimento.cidade}</span>
          ${depoimento.verificado ? '<div class="verificado-badge"><i class="fas fa-check-circle"></i> Compra verificada</div>' : ''}
        </div>
      </div>
      <div class="depoimento-stars">
        ${getStarRating(depoimento.rating)}
      </div>
      <div class="depoimento-produto">
        <i class="fas fa-gift"></i> ${depoimento.produtoComprado}
      </div>
    </div>
  `).join('');
  
  // Re-inicializar observer para os novos elementos
  const newRevealElements = grid.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  newRevealElements.forEach(el => observer.observe(el));
}

/* ============================================================
   9. VER MAIS DEPOIMENTOS (MODAL)
   ============================================================ */
function initVerMaisDepoimentos() {
  const btn = document.getElementById('ver-mais-depoimentos');
  if (!btn) return;
  
  btn.addEventListener('click', () => {
    if (typeof window.getTodosDepoimentos === 'function') {
      const todos = window.getTodosDepoimentos();
      mostrarModalDepoimentos(todos);
    } else {
      // Fallback com depoimentos estáticos
      const staticTodos = [
        { nome: "Mariana Silva", cidade: "São Paulo - SP", comentario: "Comprei uma caneca personalizada para minha mãe e ela amou! O acabamento é impecável e a entrega foi super rápida. Recomendo demais!", rating: 5, produtoComprado: "Caneca Personalizada Casal", verificado: true },
        { nome: "Fernanda Costa", cidade: "Rio de Janeiro - RJ", comentario: "Encomendei uma cesta de café da manhã para o dia dos namorados. Além de linda, veio com um cartão personalizado. Meu namorado adorou!", rating: 5, produtoComprado: "Cesta Romântica Deluxe", verificado: true },
        { nome: "Rafael Oliveira", cidade: "Belo Horizonte - MG", comentario: "Atendimento maravilhoso! Tirei todas as minhas dúvidas pelo WhatsApp e o produto chegou antes do prazo. Já virei cliente fiel.", rating: 5, produtoComprado: "Camisa Estampa Exclusiva", verificado: true }
      ];
      mostrarModalDepoimentos(staticTodos);
    }
  });
}

/**
 * Exibe modal com todos os depoimentos
 * @param {Array} depoimentos - Lista de depoimentos
 */
function mostrarModalDepoimentos(depoimentos) {
  // Criar modal
  const modal = document.createElement('div');
  modal.className = 'depoimentos-modal';
  
  modal.innerHTML = `
    <div class="depoimentos-modal-content">
      <div class="depoimentos-modal-header">
        <h2>
          <i class="fas fa-heart"></i> 
          Depoimentos dos Clientes
          <span>(${depoimentos.length})</span>
        </h2>
        <button class="depoimentos-modal-close" aria-label="Fechar">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="depoimentos-modal-body">
        ${depoimentos.map(d => `
          <div class="depoimento-modal-item">
            <div class="depoimento-modal-header-info">
              ${d.foto 
                ? `<img src="${d.foto}" alt="${d.nome}">`
                : `<i class="fas fa-user-circle"></i>`
              }
              <div>
                <strong>${d.nome}</strong>
                <span>${d.cidade}</span>
                ${d.verificado ? '<div class="verificado-badge-modal"><i class="fas fa-check-circle"></i> Compra verificada</div>' : ''}
              </div>
            </div>
            <div class="depoimento-modal-stars">
              ${getStarRating(d.rating)}
            </div>
            <p class="depoimento-modal-text">"${d.comentario}"</p>
            <div class="depoimento-modal-produto">
              <i class="fas fa-gift"></i> ${d.produtoComprado}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
  
  // Animar entrada
  setTimeout(() => {
    modal.classList.add('open');
  }, 10);
  
  // Fechar modal
  const closeBtn = modal.querySelector('.depoimentos-modal-close');
  closeBtn.addEventListener('click', () => {
    modal.classList.remove('open');
    setTimeout(() => {
      modal.remove();
      document.body.style.overflow = '';
    }, 300);
  });
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeBtn.click();
    }
  });
  
  // Fechar com ESC
  const handleEsc = (e) => {
    if (e.key === 'Escape') {
      closeBtn.click();
      document.removeEventListener('keydown', handleEsc);
    }
  };
  document.addEventListener('keydown', handleEsc);
}

/* ============================================================
   10. INIT PRINCIPAL
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Pequeno delay para garantir que os dados foram carregados
  setTimeout(() => {
    initWhatsAppLinks();
    initCounters();
    initRevealOnScroll();
    initHeaderScroll();
    initGalleryLightbox();
    initValueIconsAnimation();
    initDepoimentos();
    initVerMaisDepoimentos();
    
    console.log('🚀 Página Sobre inicializada com sucesso!');
  }, 100);
});