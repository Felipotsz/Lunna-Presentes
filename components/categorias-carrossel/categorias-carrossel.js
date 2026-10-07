// components/categorias-carrossel/categorias-carrossel.js
// Carrossel circular de tipos de produto (inspirado no "Livros de fã
// para fã" da DarkSide). Renderiza em qualquer elemento com o atributo
// [data-categorias-carrossel]. O atributo data-base define o caminho até
// a raiz do site ("" na Home, "../../" nas páginas de serviço).
//
// Ao clicar num círculo:
//  - se a categoria pertence à página atual, filtra o catálogo no lugar
//    (aciona o filtro existente) e rola até os produtos;
//  - caso contrário, abre a página de serviço já filtrada (?cat=...).
//
// Cada círculo mostra a foto assets/images/categorias/<slug>.jpg; para
// trocar, basta substituir o arquivo (quadrado, ~280x280).

(function () {
  'use strict';

  var PAGINAS = {
    personalizados: 'pages/personalizados/personalizados.html',
    roupas: 'pages/roupas/roupas.html',
    brindes: 'pages/brindes-corporativos/brindes-corporativos.html'
  };

  var CATEGORIAS = [
    { slug: 'personalizados', nome: 'Personalizados', icon: 'fa-pen-fancy',       servico: 'personalizados' },
    { slug: 'canecas',        nome: 'Canecas',        icon: 'fa-mug-hot',         servico: 'personalizados' },
    { slug: 'moletons',       nome: 'Moletons',       icon: 'fa-shirt',           servico: 'roupas' },
    { slug: 'all',            nome: 'Brindes',        icon: 'fa-briefcase',       servico: 'brindes', imagem: 'brindes' },
    { slug: 'agendas',        nome: 'Agendas',        icon: 'fa-book',            servico: 'personalizados' },
    { slug: 'bodys',          nome: 'Bodys',          icon: 'fa-baby',            servico: 'personalizados' },
    { slug: 'bolsas',         nome: 'Bolsas',         icon: 'fa-bag-shopping',    servico: 'personalizados' },
    { slug: 'chaveiros',      nome: 'Chaveiros',      icon: 'fa-key',             servico: 'personalizados' },
    { slug: 'imas',           nome: 'Ímãs',           icon: 'fa-magnet',          servico: 'personalizados' },
    { slug: 'mousepads',      nome: 'MousePad',       icon: 'fa-computer-mouse',  servico: 'personalizados' },
    { slug: 'relogios',       nome: 'Relógios',       icon: 'fa-clock',           servico: 'personalizados' },
    { slug: 'tapetes',        nome: 'Tapetes',        icon: 'fa-rug',             servico: 'personalizados' },
    { slug: 'trofeus',        nome: 'Troféus',        icon: 'fa-trophy',          servico: 'personalizados' }
  ];

  // Foto de cada círculo: assets/images/categorias/<imagem ou slug>.jpg
  // (miniaturas quadradas geradas a partir das fotos dos produtos).
  function caminhoImagem(c) {
    return 'assets/images/categorias/' + (c.imagem || c.slug) + '.jpg';
  }

  // body[data-servico] usa "brindes-corporativos"; normaliza para a chave curta
  function servicoDaPagina() {
    var s = document.body.getAttribute('data-servico') || '';
    if (s.indexOf('brindes') === 0) return 'brindes';
    return s;
  }

  function catAtualDaURL() {
    try { return new URLSearchParams(window.location.search).get('cat') || ''; }
    catch (e) { return ''; }
  }

  function render(root) {
    var base = root.getAttribute('data-base') || '';
    var titulo = root.getAttribute('data-titulo') || 'Encontre por tipo de produto';
    var servicoAtual = servicoDaPagina();
    var catAtual = catAtualDaURL();

    var itens = CATEGORIAS.map(function (c, i) {
      var href = base + PAGINAS[c.servico] + (c.slug === 'all' ? '' : '?cat=' + c.slug);
      var ativo = servicoAtual === c.servico && catAtual === c.slug;
      // Ícone fica por baixo como reserva, caso a foto não carregue
      var visual = '<i class="fas ' + c.icon + '" aria-hidden="true"></i>' +
        '<img src="' + base + caminhoImagem(c) + '" alt="" loading="lazy" onerror="this.remove()" />';
      return (
        '<li class="cat-circ-item">' +
          '<a class="cat-circ-link' + (ativo ? ' is-active' : '') + '" href="' + href + '"' +
            ' data-cat="' + c.slug + '" data-servico="' + c.servico + '"' +
            (ativo ? ' aria-current="true"' : '') + '>' +
            '<span class="cat-circ-bubble cat-circ-tone-' + (i % 4) + '">' + visual + '</span>' +
            '<span class="cat-circ-label">' + c.nome + '</span>' +
          '</a>' +
        '</li>'
      );
    }).join('');

    root.innerHTML =
      '<div class="container">' +
        '<h2 class="cat-circ-title">' + titulo + '</h2>' +
        '<div class="cat-circ-wrapper">' +
          '<button type="button" class="cat-circ-arrow cat-circ-prev" aria-label="Categorias anteriores"><i class="fas fa-chevron-left"></i></button>' +
          '<ul class="cat-circ-track" aria-label="Tipos de produto">' + itens + '</ul>' +
          '<button type="button" class="cat-circ-arrow cat-circ-next" aria-label="Próximas categorias"><i class="fas fa-chevron-right"></i></button>' +
        '</div>' +
      '</div>';

    var track = root.querySelector('.cat-circ-track');
    var prev = root.querySelector('.cat-circ-prev');
    var next = root.querySelector('.cat-circ-next');

    function atualizarSetas() {
      var max = track.scrollWidth - track.clientWidth - 2;
      prev.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft >= max;
      root.classList.toggle('cat-circ--sem-rolagem', max <= 0);
    }

    function rolar(dir) {
      track.scrollBy({ left: dir * track.clientWidth * 0.8, behavior: 'smooth' });
    }

    prev.addEventListener('click', function () { rolar(-1); });
    next.addEventListener('click', function () { rolar(1); });
    track.addEventListener('scroll', atualizarSetas, { passive: true });
    window.addEventListener('resize', atualizarSetas);
    atualizarSetas();

    // Centraliza a categoria ativa (vinda do ?cat=) dentro do carrossel
    var ativo = track.querySelector('.is-active');
    if (ativo) {
      track.scrollLeft = ativo.parentNode.offsetLeft - (track.clientWidth - ativo.parentNode.offsetWidth) / 2;
      atualizarSetas();
    }

    // Clique numa categoria da própria página: filtra sem recarregar
    track.addEventListener('click', function (e) {
      var link = e.target.closest('.cat-circ-link');
      if (!link || link.getAttribute('data-servico') !== servicoAtual) return;
      var pill = document.querySelector('.filter-pill[data-category="' + link.getAttribute('data-cat') + '"]');
      if (!pill) return;
      e.preventDefault();
      pill.click();
      marcarAtivo(link.getAttribute('data-cat'));
      try { history.replaceState(null, '', '?cat=' + link.getAttribute('data-cat')); } catch (err) {}
      rolarParaCatalogo();
    });

    function marcarAtivo(slug) {
      root.querySelectorAll('.cat-circ-link').forEach(function (a) {
        var on = a.getAttribute('data-cat') === slug && a.getAttribute('data-servico') === servicoAtual;
        a.classList.toggle('is-active', on);
        if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
      });
    }

    // Mantém o destaque sincronizado quando o usuário usa os filtros da página
    document.querySelectorAll('.filter-pill').forEach(function (pill) {
      pill.addEventListener('click', function () {
        marcarAtivo(pill.getAttribute('data-category'));
      });
    });
  }

  function rolarParaCatalogo() {
    var alvo = document.querySelector('.products-controls');
    if (!alvo) return;
    var header = document.querySelector('.site-header');
    var offset = header ? header.offsetHeight + 8 : 0;
    var y = alvo.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  document.querySelectorAll('[data-categorias-carrossel]').forEach(render);

  // Chegou numa página de serviço vindo de um círculo (?cat=...): leva
  // o usuário direto ao catálogo filtrado, depois que tudo renderizou.
  if (catAtualDaURL() && document.querySelector('.products-controls')) {
    window.addEventListener('load', function () { setTimeout(rolarParaCatalogo, 150); });
  }
})();
