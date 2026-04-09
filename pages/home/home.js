/* ===== CONFIGURAÇÕES DE EXIBIÇÃO ===== */
const VITRINE_MAX = 8; // Máx de produtos na vitrine da home

/* ===== FUNÇÃO PARA OBTER PRODUTOS DE NOVIDADES ===== */
function getNewProducts() {
  // Verifica se o array novidadesProdutos existe globalmente
  if (window.novidadesProdutos && Array.isArray(window.novidadesProdutos)) {
    return window.novidadesProdutos;
  }
  
  return [];
}

/* ===== FUNÇÃO PARA OBTER TODOS OS PRODUTOS (para vitrine) ===== */
function getAllProducts() {
  // Tenta obter de window.produtos (se existir)
  if (window.produtos && Array.isArray(window.produtos)) {
    return window.produtos;
  }
  
  // Fallback: retorna os mesmos produtos de novidades como vitrine
  if (window.novidadesProdutos && Array.isArray(window.novidadesProdutos)) {
    return window.novidadesProdutos;
  }
  
  return [];
}

/* ===== FUNÇÃO PARA FILTRAR PRODUTOS ===== */
function filterProducts(category, searchTerm = '') {
  let products = getAllProducts();
  
  if (category !== 'all') {
    products = products.filter(p => p.category === category);
  }
  
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    products = products.filter(p => 
      p.name.toLowerCase().includes(term) || 
      (p.shortDescription && p.shortDescription.toLowerCase().includes(term))
    );
  }
  
  return products;
}

/* ===== FUNÇÃO PARA CRIAR CARD DE PRODUTO ===== */
function createProductCard(product, extraClass = '') {
  const card = document.createElement('div');
  card.className = `product-card ${extraClass}`.trim();
  card.setAttribute('data-id', product.id);
  card.setAttribute('data-category', product.category);
  
  const imageUrl = product.images && product.images[0] 
    ? product.images[0] 
    : 'https://via.placeholder.com/400x400?text=Sem+Imagem';
  
  card.innerHTML = `
    <div class="product-card-image">
      <img src="${imageUrl}" alt="${product.name}" loading="lazy">
      ${product.customizable ? '<span class="badge-custom"><i class="fas fa-palette"></i> Personalizável</span>' : ''}
      ${product.featured ? '<span class="badge-new">Novidade</span>' : ''}
    </div>
    <div class="product-card-body">
      <h3 class="product-card-name">${product.name}</h3>
      <p class="product-card-desc">${product.shortDescription || ''}</p>
      <div class="product-card-price">${product.price}</div>
      <div class="product-card-actions">
        <a href="#" class="btn btn-whatsapp product-whatsapp" data-product-id="${product.id}">
          <i class="fab fa-whatsapp"></i> Comprar
        </a>
      </div>
    </div>
  `;
  
  // Adiciona evento do WhatsApp para este produto
  const whatsappBtn = card.querySelector('.product-whatsapp');
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const whatsappLink = typeof getWhatsAppLink === 'function' 
        ? getWhatsAppLink(product) 
        : (typeof getWhatsAppGeneral === 'function' ? getWhatsAppGeneral() : '#');
      window.open(whatsappLink, '_blank');
    });
  }
  
  return card;
}

/* ===== LINKS WHATSAPP ===== */
function initWhatsAppLinks() {
  // Aguarda a função getWhatsAppGeneral estar disponível
  if (typeof getWhatsAppGeneral !== 'function') {
    setTimeout(initWhatsAppLinks, 100);
    return;
  }
  
  const generalLink = getWhatsAppGeneral();

  const ids = ['header-whatsapp', 'hero-whatsapp', 'mobile-whatsapp', 'contato-whatsapp', 'footer-whatsapp', 'monte-whatsapp'];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.href = generalLink;
  });
}

/* ===== CARROSSEL DE NOVIDADES (COM LOOP INFINITO) ===== */
const Carousel = (() => {
  let track, items, currentIndex = 0, itemsPerView = 1, totalSlides, touchStartX = 0;
  const dots = document.getElementById('carousel-dots');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');

  function getItemsPerView() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 640)  return 2;
    return 1;
  }

  function buildCards() {
    track = document.getElementById('carousel-track');
    if (!track) return false;

    const newProducts = getNewProducts();
    if (!newProducts.length) {
      const section = track.closest('.section-novidades');
      if (section) section.style.display = 'none';
      return false;
    }

    track.innerHTML = '';
    
    // Criar os itens do carrossel
    newProducts.forEach(product => {
      const item = document.createElement('div');
      item.className = 'carousel-item';
      item.setAttribute('role', 'listitem');
      item.appendChild(createProductCard(product));
      track.appendChild(item);
    });

    items = track.querySelectorAll('.carousel-item');
    totalSlides = Math.ceil(items.length / getItemsPerView());
    
    console.log(`✅ Carrossel: ${items.length} produtos carregados, ${totalSlides} slides`);
    return true;
  }

  function buildDots() {
    if (!dots) return;
    dots.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Slide ${i + 1}`);
      dot.addEventListener('click', () => goToSlide(i));
      dots.appendChild(dot);
    }
  }

  function getCardWidth() {
    const trackWrapper = track.parentElement;
    const wrapperWidth = trackWrapper.offsetWidth;
    const gap = 16; // gap em pixels (1rem)
    return (wrapperWidth - (gap * (itemsPerView - 1))) / itemsPerView;
  }

  function updateUI() {
    if (!track || !items.length) return;
    
    itemsPerView = getItemsPerView();
    totalSlides = Math.ceil(items.length / itemsPerView);
    
    const cardWidth = getCardWidth();
    const gap = 16;
    const offset = currentIndex * (cardWidth + gap) * itemsPerView;
    
    // Adiciona transição suave
    track.style.transition = 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)';
    track.style.transform = `translateX(-${offset}px)`;

    // Atualiza dots
    document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });

    // Botões sempre habilitados (loop infinito)
    if (prevBtn) prevBtn.disabled = false;
    if (nextBtn) nextBtn.disabled = false;
  }

  // Função para ir para um slide específico
  function goToSlide(index) {
    // Garante que o índice fique dentro do range (loop)
    if (index >= totalSlides) {
      currentIndex = 0;
    } else if (index < 0) {
      currentIndex = totalSlides - 1;
    } else {
      currentIndex = index;
    }
    updateUI();
  }

  // Próximo slide com loop
  function next() {
    if (currentIndex + 1 >= totalSlides) {
      // Se está no último, volta para o primeiro
      goToSlide(0);
    } else {
      goToSlide(currentIndex + 1);
    }
  }

  // Slide anterior com loop
  function prev() {
    if (currentIndex - 1 < 0) {
      // Se está no primeiro, vai para o último
      goToSlide(totalSlides - 1);
    } else {
      goToSlide(currentIndex - 1);
    }
  }

  function initTouch() {
    if (!track) return;
    
    track.addEventListener('touchstart', e => { 
      touchStartX = e.touches[0].clientX; 
    }, { passive: true });
    
    track.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? next() : prev();
      }
    }, { passive: true });
  }

  // Autoplay opcional (descomente se quiser)
  let autoplayInterval;
  function startAutoplay(interval = 5000) {
    if (autoplayInterval) clearInterval(autoplayInterval);
    autoplayInterval = setInterval(() => {
      next();
    }, interval);
  }
  
  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
  }

  function init() {
    if (!buildCards()) return;
    
    itemsPerView = getItemsPerView();
    totalSlides = Math.ceil(items.length / itemsPerView);

    buildDots();
    setTimeout(() => updateUI(), 100);
    initTouch();

    if (prevBtn) prevBtn.addEventListener('click', prev);
    if (nextBtn) nextBtn.addEventListener('click', next);

    // Pausar autoplay quando o usuário interage
    if (prevBtn) prevBtn.addEventListener('click', stopAutoplay);
    if (nextBtn) nextBtn.addEventListener('click', stopAutoplay);
    
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        itemsPerView = getItemsPerView();
        totalSlides = Math.ceil(items.length / itemsPerView);
        currentIndex = Math.min(currentIndex, totalSlides - 1);
        buildDots();
        updateUI();
      }, 200);
    }, { passive: true });
  }

  return { init, next, prev, startAutoplay, stopAutoplay };
})();

/* ===== VITRINE HOMEPAGE ===== */
const VitrineHome = (() => {
  let currentCategory = 'all';
  const grid = document.getElementById('vitrine-grid');

  function render(category = 'all') {
    if (!grid) return;
    currentCategory = category;
    const filtered = filterProducts(category, '');
    const limited = filtered.slice(0, VITRINE_MAX);

    grid.innerHTML = '';

    if (!limited.length) {
      grid.innerHTML = `
        <div class="grid-empty">
          <div class="empty-icon">🔍</div>
          <p>Nenhum produto encontrado nesta categoria.</p>
        </div>`;
      return;
    }

    limited.forEach((product, i) => {
      const card = createProductCard(product, 'reveal');
      card.style.animationDelay = `${i * 60}ms`;
      grid.appendChild(card);
    });

    // Re-inicializar observador de reveal para os novos cards
    document.querySelectorAll('#vitrine-grid .reveal:not(.visible)').forEach(el => {
      setTimeout(() => el.classList.add('visible'), 100);
    });
  }

  function initFilters() {
    document.querySelectorAll('.vitrine-filters .filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.vitrine-filters .filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        render(btn.dataset.category);
      });
    });
  }

  function init() {
    if (!grid) return;
    initFilters();
    render('all');
  }

  return { init };
})();

/* ====== FAQ ACCORDION ====== */
const FAQ = (() => {
  const faqs = [
    {
      q: "Como funciona a personalização?",
      a: "É simples! Você nos envia pelo WhatsApp as informações que deseja (nome, foto, mensagem) e nossa equipe cria um layout personalizado. Você aprova antes de seguirmos para a produção."
    },
    {
      q: "Qual é o prazo de produção?",
      a: "A maioria dos produtos é produzida em até 3 dias úteis. Para pedidos com maior complexidade ou volume, o prazo pode variar — mas sempre informamos antes de confirmar."
    },
    {
      q: "Vocês entregam em todo o Brasil?",
      a: "Sim! Entregamos por toda a cidade de São Paulo e Região Metropolitana via motoboy. Para o restante do Brasil, despachamos pelos Correios com rastreamento."
    },
    {
      q: "Quais formas de pagamento são aceitas?",
      a: "Aceitamos PIX (com 5% de desconto), cartão de crédito em até 12x e cartão de débito. O pagamento é realizado de forma segura via link ou maquininha presencial."
    },
    {
      q: "Posso pedir uma amostra antes de confirmar o pedido?",
      a: "Para pedidos maiores (acima de 10 unidades), enviamos uma foto digital da arte para aprovação sem custo. Amostras físicas podem ser solicitadas com custo adicional."
    },
    {
      q: "E se eu não gostar do produto recebido?",
      a: "Nossa prioridade é a sua satisfação! Se houver algum defeito de produção ou divergência com o que foi aprovado, refazemos o produto sem custo adicional."
    }
  ];

  function build() {
    const list = document.getElementById('faq-list');
    if (!list) return;

    list.innerHTML = '';
    faqs.forEach((faq, i) => {
      const id = `faq-answer-${i}`;
      const item = document.createElement('div');
      item.className = 'faq-item';
      item.setAttribute('role', 'listitem');
      item.innerHTML = `
        <button class="faq-question"
                aria-expanded="false"
                aria-controls="${id}"
                id="faq-btn-${i}">
          ${faq.q}
          <span class="faq-icon" aria-hidden="true">+</span>
        </button>
        <div class="faq-answer"
             id="${id}"
             role="region"
             aria-labelledby="faq-btn-${i}">
          <p>${faq.a}</p>
        </div>
      `;

      const btn = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');

      btn.addEventListener('click', () => {
        const isOpen = btn.getAttribute('aria-expanded') === 'true';

        // Fechar todos
        document.querySelectorAll('.faq-question').forEach(b => {
          b.setAttribute('aria-expanded', 'false');
          if (b.nextElementSibling) {
            b.nextElementSibling.classList.remove('open');
          }
        });

        // Abrir o clicado (se estava fechado)
        if (!isOpen) {
          btn.setAttribute('aria-expanded', 'true');
          answer.classList.add('open');
        }
      });

      list.appendChild(item);
    });
  }

  return { init: build };
})();

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

/* ====== MOBILE MENU ====== */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (!hamburger || !mobileMenu) return;
  
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    const expanded = hamburger.classList.contains('open');
    hamburger.setAttribute('aria-expanded', expanded);
  });
  
  // Fechar menu ao clicar em um link
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ====== HEADER SCROLL EFFECT ====== */
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

/* ====== INIT ====== */
document.addEventListener('DOMContentLoaded', () => {
  // Aguarda um pequeno delay para garantir que os dados foram carregados
  setTimeout(() => {
    initWhatsAppLinks();
    Carousel.init();
    VitrineHome.init();
    FAQ.init();
    initRevealOnScroll();
    initThemeToggle();
    initMobileMenu();
    initHeaderScroll();
    
    console.log('🚀 Homepage inicializada com sucesso!');
  }, 100);
});