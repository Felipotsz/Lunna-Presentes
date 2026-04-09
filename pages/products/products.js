/* ===== CONFIGURAÇÃO ===== */
var WHATSAPP = '5511999999999';

var CATEGORIAS = {
  canecas:       'Canecas',
  camisas:       'Camisas',
  cestas:        'Cestas',
  personalizados:'Personalizados'
};

/* ===== ESTADO ===== */
var estadoCategoria = 'all';
var estadoBusca     = '';
var listaProdutos   = [];

/* ===== HELPERS ===== */
function seguro(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;');
}

function linkWA(produto) {
  var tel = produto.whatsappNumber || WHATSAPP;
  var msg = encodeURIComponent(
    'Olá! Vi o produto *' + produto.name + '* (' + produto.price + ') e gostaria de mais informações.'
  );
  return 'https://wa.me/' + tel + '?text=' + msg;
}

function debounce(fn, ms) {
  var t;
  return function() {
    clearTimeout(t);
    t = setTimeout(fn, ms);
  };
}

/* ===== MODAL ===== */
function abrirModal(produto) {
  fecharModal();

  var tags = '';
  if (produto.isNew)        tags += '<span class="modal-tag">🆕 Novidade</span> ';
  if (produto.customizable) tags += '<span class="modal-tag">✏️ Personalizável</span> ';
  tags += '<span class="modal-tag">📦 ' + (CATEGORIAS[produto.category] || produto.category) + '</span>';

  var img = produto.images && produto.images[0] ? produto.images[0] : '';

  var div = document.createElement('div');
  div.id        = 'modal-lunna';
  div.className = 'modal-overlay open';

  div.innerHTML =
    '<div class="modal">' +
      '<button class="modal-close" id="modal-lunna-fechar" aria-label="Fechar">✕</button>' +
      '<div class="modal-body">' +
        '<div class="modal-gallery">' +
          '<div class="modal-main-img">' +
            '<img src="' + seguro(img) + '" alt="' + seguro(produto.name) + '">' +
          '</div>' +
        '</div>' +
        '<div class="modal-info">' +
          '<h2 id="modal-product-title">' + seguro(produto.name) + '</h2>' +
          '<div class="modal-price">' + seguro(produto.price) + '</div>' +
          '<div class="modal-tags">' + tags + '</div>' +
          '<p class="modal-desc">' + seguro(produto.description) + '</p>' +
          '<div class="modal-actions">' +
            '<a href="' + linkWA(produto) + '" class="btn btn-whatsapp" target="_blank" rel="noopener">' +
              '💬 Pedir pelo WhatsApp' +
            '</a>' +
            '<button class="btn btn-outline" id="modal-lunna-fechar2">Fechar</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';

  document.body.appendChild(div);
  document.body.style.overflow = 'hidden';

  div.querySelector('#modal-lunna-fechar').addEventListener('click', fecharModal);
  div.querySelector('#modal-lunna-fechar2').addEventListener('click', fecharModal);
  div.addEventListener('click', function(e) { if (e.target === div) fecharModal(); });
}

function fecharModal() {
  var el = document.getElementById('modal-lunna');
  if (el) {
    el.parentNode.removeChild(el);
    document.body.style.overflow = '';
  }
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') fecharModal();
});

/* ===== CRIAR CARD ===== */
function criarCard(produto) {
  var img = produto.images && produto.images[0]
    ? produto.images[0]
    : 'https://placehold.co/400x300/f8d7da/c8a97e?text=Produto';

  var art = document.createElement('article');
  art.className = 'product-card';

  var badgeNov = produto.isNew
    ? '<span class="badge-new">Novidade</span>'
    : '';
  var badgeCus = produto.customizable
    ? '<span class="badge-custom">✏️ Personalizável</span>'
    : '';

  art.innerHTML =
    '<div class="product-card-image">' +
      badgeNov + badgeCus +
      '<img src="' + seguro(img) + '" alt="' + seguro(produto.name) + '" loading="lazy">' +
    '</div>' +
    '<div class="product-card-body">' +
      '<h3 class="product-card-name">' + seguro(produto.name) + '</h3>' +
      '<p class="product-card-desc">' + seguro(produto.shortDescription) + '</p>' +
      '<div class="product-card-price">' + seguro(produto.price) + '</div>' +
      '<div class="product-card-actions">' +
        '<button class="btn btn-outline btn-sm btn-saibamais">Saiba mais</button>' +
        '<a class="btn btn-whatsapp btn-sm" href="' + linkWA(produto) + '" target="_blank" rel="noopener">💬 WhatsApp</a>' +
      '</div>' +
    '</div>';

  art.querySelector('.btn-saibamais').addEventListener('click', function() {
    abrirModal(produto);
  });

  return art;
}

/* ===== FILTRAR ===== */
function filtrar() {
  var lista = listaProdutos.slice();

  if (estadoCategoria !== 'all') {
    lista = lista.filter(function(p) {
      return p.category === estadoCategoria;
    });
  }

  if (estadoBusca.trim()) {
    var q = estadoBusca.trim().toLowerCase();
    lista = lista.filter(function(p) {
      return (p.name        || '').toLowerCase().indexOf(q) >= 0 ||
             (p.shortDescription || '').toLowerCase().indexOf(q) >= 0 ||
             (p.description || '').toLowerCase().indexOf(q) >= 0;
    });
  }

  lista.sort(function(a, b) { return b.id - a.id; });
  return lista;
}

/* ===== CONTADORES ===== */
function atualizarContadores() {
  var cats = ['all', 'canecas', 'camisas', 'cestas', 'personalizados'];
  cats.forEach(function(cat) {
    var el = document.getElementById('count-' + cat);
    if (!el) return;

    var n;
    if (cat === 'all') {
      n = listaProdutos.length;
    } else {
      n = listaProdutos.filter(function(p) { return p.category === cat; }).length;
    }
    el.textContent = n;
  });
}

/* ===== RENDERIZAR GRID ===== */
function renderizar() {
  var grid    = document.getElementById('products-grid');
  var loading = document.getElementById('products-loading');
  var empty   = document.getElementById('products-empty');
  var countEl = document.getElementById('results-count');
  var clearBtn = document.getElementById('clear-filters');

  if (!grid) return;

  /* sem dados ainda */
  if (!listaProdutos.length) {
    if (loading) { loading.removeAttribute('hidden'); loading.style.display = ''; }
    grid.setAttribute('hidden', ''); grid.style.display = 'none';
    if (empty)   { empty.setAttribute('hidden', '');   empty.style.display = 'none'; }
    if (countEl) countEl.textContent = 'Carregando produtos...';
    return;
  }

  var filtrados = filtrar();

  /* esconde loading */
  if (loading) { loading.setAttribute('hidden', ''); loading.style.display = 'none'; }

  /* botão limpar */
  var temFiltro = estadoCategoria !== 'all' || estadoBusca.trim() !== '';
  if (clearBtn) clearBtn.hidden = !temFiltro;

  /* contador */
  if (countEl) {
    if (!filtrados.length) {
      countEl.textContent = 'Nenhum produto encontrado';
    } else {
      var sufCat  = estadoCategoria !== 'all' ? ' em "' + (CATEGORIAS[estadoCategoria] || estadoCategoria) + '"' : '';
      var sufBusc = estadoBusca.trim() ? ' para "' + estadoBusca.trim() + '"' : '';
      countEl.textContent = filtrados.length + ' produto' + (filtrados.length !== 1 ? 's' : '') + sufCat + sufBusc;
    }
  }

  /* empty state */
  if (!filtrados.length) {
    grid.setAttribute('hidden', ''); grid.style.display = 'none';
    if (empty) { empty.removeAttribute('hidden'); empty.style.display = ''; }
    return;
  }

  /* renderiza cards */
  if (empty) { empty.setAttribute('hidden', ''); empty.style.display = 'none'; }

  grid.innerHTML = '';
  grid.removeAttribute('hidden');
  grid.style.display = 'grid';

  filtrados.forEach(function(produto) {
    grid.appendChild(criarCard(produto));
  });
}

/* ===== FILTROS (pills) ===== */
function initFiltros() {
  document.querySelectorAll('.filter-pill').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.filter-pill').forEach(function(b) {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      estadoCategoria = btn.dataset.category || 'all';
      renderizar();
    });
  });

  /* clicks nos cards de categoria na seção abaixo */
  document.querySelectorAll('.categoria-card').forEach(function(card) {
    var btn = card.querySelector('.btn');
    if (!btn) return;
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      var cat  = card.dataset.category;
      var pill = cat ? document.querySelector('.filter-pill[data-category="' + cat + '"]') : null;
      if (pill) {
        pill.click();
        var controls = document.querySelector('.products-controls');
        if (controls) controls.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ===== BUSCA ===== */
function initBusca() {
  var input    = document.getElementById('product-search');
  var clearBtn = document.getElementById('search-clear');
  if (!input) return;

  var onInput = debounce(function() {
    estadoBusca = input.value;
    if (clearBtn) clearBtn.hidden = !input.value;
    renderizar();
  }, 250);

  input.addEventListener('input', onInput);

  if (clearBtn) {
    clearBtn.addEventListener('click', function() {
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
    estadoBusca     = '';

    var inp = document.getElementById('product-search');
    if (inp) inp.value = '';
    var sc = document.getElementById('search-clear');
    if (sc) sc.hidden = true;

    document.querySelectorAll('.filter-pill').forEach(function(b) {
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
    if (cat && CATEGORIAS[cat]) {
      estadoCategoria = cat;
      var pill = document.querySelector('.filter-pill[data-category="' + cat + '"]');
      if (pill) {
        document.querySelectorAll('.filter-pill').forEach(function(b) {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        pill.classList.add('active');
        pill.setAttribute('aria-pressed', 'true');
      }
    }
  } catch(e) {}
}

/* ===== WHATSAPP LINKS GERAIS ===== */
function initWhatsApp() {
  var link;
  if (typeof window.getWhatsAppGeneral === 'function') {
    link = window.getWhatsAppGeneral();
  } else {
    link = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent('Olá! Gostaria de mais informações sobre os produtos da Lunna Presentes.');
  }
  ['header-whatsapp','mobile-whatsapp','footer-whatsapp','contato-whatsapp','monte-whatsapp'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.href = link;
  });
}

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', function() {

  /* carrega dados do window.todosProdutos (definido por produtos.data.js) */
  if (window.todosProdutos && window.todosProdutos.length) {
    listaProdutos = window.todosProdutos.slice();
  }

  initWhatsApp();
  lerURL();
  initFiltros();
  initBusca();
  initLimpar();
  atualizarContadores();
  renderizar();

});
