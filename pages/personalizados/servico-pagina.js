/* ===== SCRIPT GENÉRICO DAS PÁGINAS DE SERVIÇO =====
   Reutilizado em Personalizados, Lunna Mood e Brindes Corporativos.
   O serviço ativo é lido de <body data-servico="..."> e resolvido
   contra window.SERVICOS_LUNNA (data/servicos.data.js). */

(function () {
  'use strict';

  var WHATSAPP = '5511999999999';

  /* ===== ESTADO ===== */
  var estadoCategoria = 'all';
  var estadoBusca = '';
  var listaProdutos = [];
  var servicoAtual = null;

  /* ===== HELPERS ===== */
  function seguro(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function nomeCategoria(cat) {
    var nomes = {
      canecas: 'Canecas',
      camisas: 'Camisas',
      moletons: 'Moletons',
      cestas: 'Cestas',
      personalizados: 'Personalizados',
      agendas: 'Agendas e Cadernos',
      bodys: 'Bodys',
      bolsas: 'Bolsas e Necessáires',
      chaveiros: 'Chaveiros',
      imas: 'Imãs e Plaquinhas',
      mousepads: 'MousePad',
      relogios: 'Relógios',
      tapetes: 'Tapetes',
      trofeus: 'Troféus',
      'corp-bolsas': 'Bolsas, Mochilas e Necessáires',
      'corp-cadernos': 'Cadernos',
      'corp-copos': 'Copos e Garrafas Térmicas',
      'corp-vestuario': 'Bonés, Chinelos e Toalhas',
      'corp-escritorio': 'Escritório e Decoração'
    };
    return nomes[cat] || cat;
  }

  function linkWA(produto) {
    var tel = produto.whatsappNumber || WHATSAPP;
    var msg = encodeURIComponent(
      precoNaMensagem(produto)
        ? 'Olá! Vi o produto *' + produto.name + '* (' + produto.price + ') e gostaria de mais informações.'
        : 'Olá! Vi o produto *' + produto.name + '* e gostaria de saber o valor.'
    );
    return 'https://wa.me/' + tel + '?text=' + msg;
  }

  function temPreco(p) { return !!(p.price && String(p.price).trim()); }
  // "R$ 00,00" é provisório: não entra no texto da mensagem do WhatsApp
  function precoNaMensagem(p) { return temPreco(p) && !/^R\$\s*0+,0+$/.test(String(p.price).trim()); }

  function debounce(fn, ms) {
    var t;
    return function () {
      clearTimeout(t);
      t = setTimeout(fn, ms);
    };
  }

  /* ===== CRIAR CARD (grid de destaque) ===== */
  function criarCard(produto) {
    var temImagem = produto.images && produto.images[0];

    var art = document.createElement('article');
    art.className = 'product-card';

    var badgeNov = produto.isNew ? '<span class="badge-new">Novidade</span>' : '';
    var badgeCus = produto.customizable ? '<span class="badge-custom"><i class="fas fa-palette"></i> Personalizável</span>' : '';
    var imagemHtml = temImagem
      ? '<img src="' + seguro(produto.images[0]) + '" alt="' + seguro(produto.name) + '" loading="lazy">'
      : '<div class="product-card-placeholder" aria-hidden="true"><i class="fas fa-image"></i></div>';

    art.innerHTML =
      '<div class="product-card-image">' +
        badgeNov + badgeCus +
        imagemHtml +
      '</div>' +
      '<div class="product-card-body">' +
        '<h3 class="product-card-name"><a class="product-card-link" href="../produto/produto.html?id=' + produto.id + '">' + seguro(produto.name) + '</a></h3>' +
        '<p class="product-card-desc">' + seguro(produto.shortDescription) + '</p>' +
        (temPreco(produto)
          ? '<div class="product-card-price">' + seguro(produto.price) + '</div>'
          : '<div class="product-card-price product-card-price--consulta">Valor sob consulta</div>') +
        '<div class="product-card-actions">' +
          '<a class="btn btn-outline btn-sm" href="../produto/produto.html?id=' + produto.id + '">Ver produto</a>' +
          '<a class="btn btn-whatsapp btn-sm" href="' + linkWA(produto) + '" target="_blank" rel="noopener"><i class="fab fa-whatsapp"></i> WhatsApp</a>' +
        '</div>' +
      '</div>';

    return art;
  }

  /* ===== FILTRAR (restrito às categorias do serviço) ===== */
  function filtrar() {
    var lista = listaProdutos.slice();

    if (estadoCategoria !== 'all') {
      lista = lista.filter(function (p) { return p.category === estadoCategoria; });
    }

    if (estadoBusca.trim()) {
      var q = estadoBusca.trim().toLowerCase();
      lista = lista.filter(function (p) {
        return (p.name || '').toLowerCase().indexOf(q) >= 0 ||
               (p.shortDescription || '').toLowerCase().indexOf(q) >= 0 ||
               (p.description || '').toLowerCase().indexOf(q) >= 0;
      });
    }

    lista.sort(function (a, b) { return b.id - a.id; });
    return lista;
  }

  /* ===== CONTADORES ===== */
  function atualizarContadores() {
    var cats = ['all'].concat(servicoAtual.categorias);
    cats.forEach(function (cat) {
      var el = document.getElementById('count-' + cat);
      if (!el) return;

      var n;
      if (cat === 'all') {
        n = listaProdutos.length;
      } else {
        n = listaProdutos.filter(function (p) { return p.category === cat; }).length;
      }
      el.textContent = n;
    });
  }

  /* ===== RENDERIZAR GRID DE DESTAQUE ===== */
  function renderizar() {
    var grid = document.getElementById('products-grid');
    var loading = document.getElementById('products-loading');
    var empty = document.getElementById('products-empty');
    var countEl = document.getElementById('results-count');
    var clearBtn = document.getElementById('clear-filters');

    if (!grid) return;

    if (!listaProdutos.length) {
      if (loading) { loading.removeAttribute('hidden'); loading.style.display = ''; }
      grid.setAttribute('hidden', ''); grid.style.display = 'none';
      if (empty) { empty.setAttribute('hidden', ''); empty.style.display = 'none'; }
      if (countEl) countEl.textContent = 'Carregando produtos...';
      return;
    }

    var filtrados = filtrar();

    if (loading) { loading.setAttribute('hidden', ''); loading.style.display = 'none'; }

    var temFiltro = estadoCategoria !== 'all' || estadoBusca.trim() !== '';
    if (clearBtn) clearBtn.hidden = !temFiltro;

    if (countEl) {
      if (!filtrados.length) {
        countEl.textContent = 'Nenhum produto encontrado';
      } else {
        var sufCat = estadoCategoria !== 'all' ? ' em "' + nomeCategoria(estadoCategoria) + '"' : '';
        var sufBusc = estadoBusca.trim() ? ' para "' + estadoBusca.trim() + '"' : '';
        countEl.textContent = filtrados.length + ' produto' + (filtrados.length !== 1 ? 's' : '') + sufCat + sufBusc;
      }
    }

    if (!filtrados.length) {
      grid.setAttribute('hidden', ''); grid.style.display = 'none';
      if (empty) { empty.removeAttribute('hidden'); empty.style.display = ''; }
      return;
    }

    if (empty) { empty.setAttribute('hidden', ''); empty.style.display = 'none'; }

    grid.innerHTML = '';
    grid.removeAttribute('hidden');
    grid.style.display = 'grid';

    filtrados.forEach(function (produto) {
      grid.appendChild(criarCard(produto));
    });
  }

  /* ===== FILTROS (pills) ===== */
  function initFiltros() {
    document.querySelectorAll('.filter-pill').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.filter-pill').forEach(function (b) {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        estadoCategoria = btn.dataset.category || 'all';
        renderizar();
      });
    });
  }

  /* ===== BUSCA ===== */
  function initBusca() {
    var input = document.getElementById('product-search');
    var clearBtn = document.getElementById('search-clear');
    if (!input) return;

    var onInput = debounce(function () {
      estadoBusca = input.value;
      if (clearBtn) clearBtn.hidden = !input.value;
      renderizar();
    }, 250);

    input.addEventListener('input', onInput);

    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        input.value = '';
        estadoBusca = '';
        clearBtn.hidden = true;
        input.focus();
        renderizar();
      });
    }
  }

  /* ===== LIMPAR FILTROS ===== */
  function initLimpar() {
    function resetar() {
      estadoCategoria = 'all';
      estadoBusca = '';

      var inp = document.getElementById('product-search');
      if (inp) inp.value = '';
      var sc = document.getElementById('search-clear');
      if (sc) sc.hidden = true;

      document.querySelectorAll('.filter-pill').forEach(function (b) {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      var all = document.querySelector('.filter-pill[data-category="all"]');
      if (all) { all.classList.add('active'); all.setAttribute('aria-pressed', 'true'); }

      renderizar();
    }

    var cb = document.getElementById('clear-filters');
    var er = document.getElementById('empty-reset');
    if (cb) cb.addEventListener('click', resetar);
    if (er) er.addEventListener('click', resetar);
  }

  /* ===== URL PARAMS ===== */
  function lerURL() {
    try {
      var cat = new URLSearchParams(window.location.search).get('cat');
      if (cat && servicoAtual.categorias.indexOf(cat) !== -1) {
        estadoCategoria = cat;
        var pill = document.querySelector('.filter-pill[data-category="' + cat + '"]');
        if (pill) {
          document.querySelectorAll('.filter-pill').forEach(function (b) {
            b.classList.remove('active');
            b.setAttribute('aria-pressed', 'false');
          });
          pill.classList.add('active');
          pill.setAttribute('aria-pressed', 'true');
        }
      }
    } catch (e) {}
  }

  /* ===== WHATSAPP LINKS GERAIS ===== */
  function initWhatsApp() {
    var link;
    if (typeof window.getWhatsAppGeneral === 'function') {
      link = window.getWhatsAppGeneral();
    } else {
      link = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent('Olá! Gostaria de mais informações sobre os produtos da Lunna Presentes.');
    }
    ['header-whatsapp', 'mobile-whatsapp', 'footer-whatsapp', 'contato-whatsapp', 'monte-whatsapp'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.href = link;
    });
  }

  /* ===== CARROSSEL DE NOVIDADES DO SERVIÇO ===== */
  function initCarrosselNovidades() {
    if (typeof window.getProdutosPorServico !== 'function') return;

    var produtosServico = window.getProdutosPorServico(servicoAtual.slug, 10);
    var novidades = produtosServico.filter(function (p) { return p.isNew; });
    if (!novidades.length) novidades = produtosServico.slice(0, 8);

    if (typeof createCarousel !== 'function') return;

    var carrossel = createCarousel({
      trackId: 'servico-novidades-track',
      dotsId: 'servico-novidades-dots',
      prevId: 'servico-novidades-prev',
      nextId: 'servico-novidades-next',
      products: novidades
    });
    carrossel.init();
  }

  /* ===== FAQ ESPECÍFICO DO SERVIÇO ===== */
  function initFAQ() {
    var list = document.getElementById('faq-list');
    if (!list || !servicoAtual.faq) return;

    list.innerHTML = '';
    servicoAtual.faq.forEach(function (faq, i) {
      var id = 'faq-answer-' + i;
      var item = document.createElement('div');
      item.className = 'faq-item';
      item.setAttribute('role', 'listitem');
      item.innerHTML =
        '<button class="faq-question" aria-expanded="false" aria-controls="' + id + '" id="faq-btn-' + i + '">' +
          seguro(faq.q) +
          '<span class="faq-icon" aria-hidden="true">+</span>' +
        '</button>' +
        '<div class="faq-answer" id="' + id + '" role="region" aria-labelledby="faq-btn-' + i + '">' +
          '<p>' + seguro(faq.a) + '</p>' +
        '</div>';

      var btn = item.querySelector('.faq-question');
      var answer = item.querySelector('.faq-answer');

      btn.addEventListener('click', function () {
        var isOpen = btn.getAttribute('aria-expanded') === 'true';

        document.querySelectorAll('.faq-question').forEach(function (b) {
          b.setAttribute('aria-expanded', 'false');
          if (b.nextElementSibling) b.nextElementSibling.classList.remove('open');
        });

        if (!isOpen) {
          btn.setAttribute('aria-expanded', 'true');
          answer.classList.add('open');
        }
      });

      list.appendChild(item);
    });
  }

  /* ===== REVEAL ON SCROLL ===== */
  function initRevealOnScroll() {
    var revealElements = document.querySelectorAll('.reveal');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(function (el) { observer.observe(el); });
  }

  /* ===== INIT ===== */
  document.addEventListener('DOMContentLoaded', function () {
    var slug = document.body.getAttribute('data-servico');
    servicoAtual = (window.SERVICOS_LUNNA || {})[slug];

    if (!servicoAtual) {
      console.warn('Serviço não encontrado em SERVICOS_LUNNA:', slug);
      return;
    }

    setTimeout(function () {
      if (window.todosProdutos && window.todosProdutos.length) {
        listaProdutos = window.todosProdutos.filter(function (p) {
          return servicoAtual.categorias.indexOf(p.category) !== -1;
        });
      }

      initWhatsApp();
      lerURL();
      initFiltros();
      initBusca();
      initLimpar();
      atualizarContadores();
      renderizar();
      initCarrosselNovidades();
      initFAQ();
      initRevealOnScroll();
    }, 100);
  });
})();
