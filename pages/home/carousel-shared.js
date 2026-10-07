/* Carrossel compartilhado: usado pela Home (3 carrosséis de serviço) e
   pelas páginas de serviço (carrossel de novidades). Carregar antes de
   home.js e de servico-pagina.js. */

// Caminho para produto.html muda conforme a página esteja na raiz
// (Home) ou dentro de pages/<servico>/.
function paginaProduto(product) {
  const estaDentroDePages = window.location.pathname.includes('/pages/');
  const base = estaDentroDePages ? '../produto/produto.html' : 'pages/produto/produto.html';
  return `${base}?id=${product.id}`;
}

function createProductCard(product, extraClass = '') {
  const card = document.createElement('div');
  card.className = `product-card ${extraClass}`.trim();
  card.setAttribute('data-id', product.id);
  card.setAttribute('data-category', product.category);
  
  const hasImage = product.images && product.images[0];
  const imageMarkup = hasImage
    ? `<img src="${product.images[0]}" alt="${product.name}" loading="lazy">`
    : `<div class="product-card-placeholder" aria-hidden="true"><i class="fas fa-image"></i></div>`;

  // Brindes corporativos (categoria "cestas") não têm preço fixo —
  // depende de quantidade/personalização — então o card mostra só um
  // botão "Consultar" via WhatsApp, sem preço nem "Ver produto".
  const isBrindeCorporativo = typeof window.ehBrindeCorporativo === 'function'
    ? window.ehBrindeCorporativo(product)
    : product.category === 'cestas';
  const precoTexto = (product.price && String(product.price).trim()) ? product.price : 'Valor sob consulta';

  const priceMarkup = isBrindeCorporativo
    ? `<div class="product-card-price product-card-price--consulta"><i class="fas fa-comments"></i> Valor sob consulta</div>`
    : `<div class="product-card-price${precoTexto === 'Valor sob consulta' ? ' product-card-price--consulta' : ''}">${precoTexto}</div>`;

  const actionsMarkup = isBrindeCorporativo
    ? `<div class="product-card-actions product-card-actions--consultar">
        <a href="#" class="btn btn-whatsapp btn-sm product-whatsapp" data-product-id="${product.id}">
          <i class="fab fa-whatsapp"></i> Consultar
        </a>
      </div>`
    : `<div class="product-card-actions">
        <a href="${paginaProduto(product)}" class="btn btn-outline btn-sm">Ver produto</a>
        <a href="#" class="btn btn-whatsapp btn-sm product-whatsapp" data-product-id="${product.id}">
          <i class="fab fa-whatsapp"></i> Comprar
        </a>
      </div>`;
  
  card.innerHTML = `
    <div class="product-card-image">
      ${imageMarkup}
      ${product.customizable ? '<span class="badge-custom"><i class="fas fa-palette"></i> Personalizável</span>' : ''}
      ${product.featured ? '<span class="badge-new">Novidade</span>' : ''}
    </div>
    <div class="product-card-body">
      <h3 class="product-card-name"><a class="product-card-link" href="${paginaProduto(product)}">${product.name}</a></h3>
      <p class="product-card-desc">${product.shortDescription || ''}</p>
      ${priceMarkup}
      ${actionsMarkup}
    </div>
  `;
  
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

// Fábrica de carrossel reutilizável por serviço: `itemsPerView`
// produtos por vez (padrão 5 no desktop, ajustado por breakpoint).
function createCarousel(config) {
  const {
    trackId,
    dotsId,
    prevId,
    nextId,
    products
  } = config;

  let track, items, currentIndex = 0, itemsPerView = 1, totalSlides, touchStartX = 0;
  const dots = document.getElementById(dotsId);
  const prevBtn = document.getElementById(prevId);
  const nextBtn = document.getElementById(nextId);

  function getItemsPerView() {
    if (window.innerWidth >= 1280) return 5;
    if (window.innerWidth >= 1024) return 4;
    if (window.innerWidth >= 768)  return 3;
    // 1 card + uma fatia do próximo no celular (ver getPeekFactor): com 2
    // inteiros, cada card ficava com ~140px e o conteúdo apertado.
    return 1;
  }

  // No mobile, cada card ocupa uma fração menor que 1/itemsPerView para
  // deixar uma fatia do próximo visível na borda (convite a arrastar).
  function getPeekFactor() {
    return window.innerWidth < 768 ? 0.55 : 1;
  }

  // No mobile avança 1 card por vez; no desktop avança uma página
  // inteira (itemsPerView).
  function getStep() {
    return window.innerWidth < 768 ? 1 : itemsPerView;
  }

  function buildCards() {
    track = document.getElementById(trackId);
    if (!track) return false;

    if (!products.length) {
      const section = track.closest('section');
      if (section) section.style.display = 'none';
      return false;
    }

    track.innerHTML = '';

    products.forEach(product => {
      const item = document.createElement('div');
      item.className = 'carousel-item';
      item.setAttribute('role', 'listitem');
      item.appendChild(createProductCard(product));
      track.appendChild(item);
    });

    items = track.querySelectorAll('.carousel-item');
    totalSlides = 1; // valor definitivo calculado em init()/resize

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
    const gap = 24; // --space-3
    const peek = getPeekFactor();
    const effectiveSlots = itemsPerView + (peek < 1 ? peek : 0);
    const width = (wrapperWidth - (gap * (itemsPerView - 1) + (peek < 1 ? gap * peek : 0))) / effectiveSlots;
    // Teto: com poucos produtos (ex. 1-2 em "Cestas"), dividir o espaço
    // todo por itemsPerView deixaria o card enorme e desproporcional
    // (imagem usa aspect-ratio 4/3). Acima do teto, centraliza em vez
    // de esticar (ver justify-content em updateUI).
    const MAX_CARD_WIDTH = 300;
    return Math.min(width, MAX_CARD_WIDTH);
  }

  // Celular (< 768px): em vez de carrossel, grade 2x2 com os primeiros
  // produtos — igual à grade das páginas de produtos. O "Ver mais" logo
  // abaixo leva ao catálogo completo.
  const ITENS_GRADE = 4;
  function modoGrade() { return window.innerWidth < 768; }

  function aplicarGrade() {
    const wrapper = track.closest('.carousel-wrapper');
    if (wrapper) wrapper.classList.add('carousel--grade');
    track.style.transition = 'none';
    track.style.transform = 'none';
    track.style.justifyContent = '';
    items.forEach((item, i) => {
      item.style.flex = '';
      item.style.width = '';
      item.classList.toggle('carousel-item--oculto', i >= ITENS_GRADE);
    });
    [prevBtn, nextBtn].forEach(btn => {
      if (!btn) return;
      btn.disabled = true;
      btn.setAttribute('aria-hidden', 'true');
    });
    if (dots) dots.style.display = 'none';
  }

  function sairDaGrade() {
    const wrapper = track.closest('.carousel-wrapper');
    if (wrapper) wrapper.classList.remove('carousel--grade');
    items.forEach(item => item.classList.remove('carousel-item--oculto'));
    if (dots) dots.style.display = '';
  }

  function updateUI() {
    if (!track || !items.length) return;

    if (modoGrade()) { aplicarGrade(); return; }
    sairDaGrade();

    itemsPerView = getItemsPerView();
    const step = getStep();
    totalSlides = Math.max(1, Math.ceil((items.length - itemsPerView) / step) + 1);

    const cardWidth = getCardWidth();
    const gap = 24;
    const trackWrapperWidth = track.parentElement.offsetWidth;

    items.forEach(item => {
      item.style.flex = `0 0 ${cardWidth}px`;
      item.style.width = `${cardWidth}px`;
    });

    // currentIndex é o índice do primeiro card visível, não a página.
    const offset = currentIndex * (cardWidth + gap);

    track.style.transition = 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)';
    track.style.transform = `translateX(-${offset}px)`;

    const totalContentWidth = items.length * cardWidth + (items.length - 1) * gap;
    track.style.justifyContent = totalContentWidth < trackWrapperWidth ? 'center' : 'flex-start';

    if (dots) {
      dots.querySelectorAll('.carousel-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === Math.round(currentIndex / step));
      });
    }

    // Sem itens suficientes para navegar: esconde setas e dots.
    // As setas ficam invisíveis mas continuam ocupando espaço: assim todos
    // os carrosséis começam no mesmo alinhamento, tenham ou não navegação.
    const podeNavegar = items.length > itemsPerView;
    [prevBtn, nextBtn].forEach(btn => {
      if (!btn) return;
      btn.disabled = !podeNavegar;
      btn.style.visibility = podeNavegar ? '' : 'hidden';
      btn.setAttribute('aria-hidden', podeNavegar ? 'false' : 'true');
    });
    // Sem navegação, os pontinhos ficam invisíveis mas mantêm a altura
    if (dots) dots.style.visibility = podeNavegar ? '' : 'hidden';
  }

  function goToSlide(index) {
    if (modoGrade()) return;
    const step = getStep();
    const maxIndex = Math.max(0, items.length - itemsPerView);
    let targetCardIndex = index * step;

    if (targetCardIndex > maxIndex) {
      targetCardIndex = 0;
    } else if (targetCardIndex < 0) {
      targetCardIndex = Math.floor(maxIndex / step) * step;
    }

    currentIndex = targetCardIndex;
    updateUI();
  }

  function next() {
    if (modoGrade()) return;
    const step = getStep();
    const maxIndex = Math.max(0, items.length - itemsPerView);
    if (currentIndex + step > maxIndex) {
      currentIndex = 0;
    } else {
      currentIndex += step;
    }
    updateUI();
  }

  function prev() {
    if (modoGrade()) return;
    const step = getStep();
    const maxIndex = Math.max(0, items.length - itemsPerView);
    if (currentIndex - step < 0) {
      currentIndex = Math.floor(maxIndex / step) * step;
    } else {
      currentIndex -= step;
    }
    updateUI();
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

  function init() {
    if (!buildCards()) return;

    itemsPerView = getItemsPerView();
    const step = getStep();
    totalSlides = Math.max(1, Math.ceil((items.length - itemsPerView) / step) + 1);

    buildDots();
    setTimeout(() => updateUI(), 100);
    initTouch();

    if (prevBtn) prevBtn.addEventListener('click', prev);
    if (nextBtn) nextBtn.addEventListener('click', next);

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        itemsPerView = getItemsPerView();
        const step = getStep();
        const maxIndex = Math.max(0, items.length - itemsPerView);
        totalSlides = Math.max(1, Math.ceil((items.length - itemsPerView) / step) + 1);
        currentIndex = Math.min(currentIndex, maxIndex);
        buildDots();
        updateUI();
      }, 200);
    }, { passive: true });
  }

  return { init, next, prev };
}
