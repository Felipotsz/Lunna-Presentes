// components/catalogo/catalogo.js
// Botão "Filtros" ao lado da busca, nas páginas de produtos.
// Os botões de categoria (.filter-pill) continuam os mesmos e a lógica de
// filtragem segue em servico-pagina.js; aqui eles só são movidos para
// dentro de um menu que abre ao clicar em "Filtros".
// - Computador: menu suspenso logo abaixo do botão.
// - Celular: painel que sobe da parte de baixo da tela.

(function () {
  'use strict';

  var controles = document.querySelector('.products-controls .controls-inner');
  var busca = controles && controles.querySelector('.search-wrapper');
  var linha = controles && controles.querySelector('.filters-row');
  if (!controles || !busca || !linha) return;

  var pills = Array.prototype.slice.call(linha.querySelectorAll('.filter-pill'));
  if (pills.length < 2) return;

  // Barra: busca + botão Filtros
  var barra = document.createElement('div');
  barra.className = 'busca-filtros';
  busca.parentNode.insertBefore(barra, busca);
  barra.appendChild(busca);

  var wrap = document.createElement('div');
  wrap.className = 'filtros-wrap';
  wrap.innerHTML =
    '<button type="button" class="filtros-btn" aria-haspopup="true" aria-expanded="false" aria-controls="filtros-painel">' +
      '<i class="fas fa-sliders" aria-hidden="true"></i>' +
      '<span class="filtros-btn-texto">Filtros</span>' +
      '<span class="filtros-btn-ativo" hidden></span>' +
    '</button>' +
    '<div class="filtros-fundo" hidden></div>' +
    '<div class="filtros-painel" id="filtros-painel" role="dialog" aria-label="Filtrar por categoria" hidden>' +
      '<div class="filtros-painel-topo">' +
        '<strong>Filtrar por categoria</strong>' +
        '<button type="button" class="filtros-fechar" aria-label="Fechar filtros"><i class="fas fa-times"></i></button>' +
      '</div>' +
      '<div class="filtros-painel-lista"></div>' +
    '</div>';
  barra.appendChild(wrap);

  var btn = wrap.querySelector('.filtros-btn');
  var painel = wrap.querySelector('.filtros-painel');
  var fundo = wrap.querySelector('.filtros-fundo');
  var ativoEl = wrap.querySelector('.filtros-btn-ativo');
  wrap.querySelector('.filtros-painel-lista').appendChild(linha);

  function abrir() {
    painel.hidden = false; fundo.hidden = false;
    btn.setAttribute('aria-expanded', 'true');
    wrap.classList.add('aberto');
    document.body.classList.add('filtros-abertos');
    var ativo = linha.querySelector('.filter-pill.active') || pills[0];
    ativo.focus({ preventScroll: true });
  }

  function fechar(devolverFoco) {
    if (painel.hidden) return;
    painel.hidden = true; fundo.hidden = true;
    btn.setAttribute('aria-expanded', 'false');
    wrap.classList.remove('aberto');
    document.body.classList.remove('filtros-abertos');
    if (devolverFoco) btn.focus({ preventScroll: true });
  }

  btn.addEventListener('click', function () { painel.hidden ? abrir() : fechar(); });
  wrap.querySelector('.filtros-fechar').addEventListener('click', function () { fechar(true); });
  fundo.addEventListener('click', function () { fechar(); });
  document.addEventListener('click', function (e) { if (!wrap.contains(e.target)) fechar(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') fechar(true); });

  // Escolher uma categoria fecha o menu (o filtro em si é aplicado por servico-pagina.js)
  pills.forEach(function (p) {
    p.addEventListener('click', function () { setTimeout(function () { fechar(true); }, 120); });
  });

  // Mostra no botão a categoria escolhida (também quando ela vem da URL
  // ?cat=... ou do carrossel de tipos de produto)
  function atualizarBotao() {
    var ativo = linha.querySelector('.filter-pill.active');
    var cat = ativo ? ativo.getAttribute('data-category') : 'all';
    if (!ativo || cat === 'all') {
      ativoEl.hidden = true;
      btn.classList.remove('filtrando');
      return;
    }
    var nome = '';
    ativo.childNodes.forEach(function (n) { if (n.nodeType === 3) nome += n.textContent; });
    ativoEl.textContent = nome.trim();
    ativoEl.hidden = false;
    btn.classList.add('filtrando');
  }
  new MutationObserver(atualizarBotao).observe(linha, { subtree: true, attributes: true, attributeFilter: ['class'] });
  atualizarBotao();
})();
