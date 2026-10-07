// components/cta-estampa/cta-estampa.js
// Seção "Provador de estampas": faixa em degradê (tinta → vinho → rosa)
// com o convite à esquerda e um mosaico de prévias reais à direita.
//
// Renderiza em qualquer elemento com [data-cta-estampa]; data-base é o
// caminho até a raiz do site ("" na Home, "../../" nas páginas internas).
// As fotos são prévias geradas pelo próprio provador
// (assets/images/provador/exemplo-*.jpg).

(function () {
  'use strict';

  var URL_PROVADOR = 'pages/provador/provador.html';

  // Ordem = posição no mosaico (1 grande + 4 menores)
  var EXEMPLOS = [
    { arquivo: 'exemplo-moletom.jpg', produto: 'moletom', nome: 'moletom' },
    { arquivo: 'exemplo-caneca.jpg', produto: 'caneca', nome: 'caneca' },
    { arquivo: 'exemplo-camiseta.jpg', produto: 'camiseta', nome: 'camiseta' },
    { arquivo: 'exemplo-chaveiro.jpg', produto: 'chaveiro', nome: 'chaveiro' },
    { arquivo: 'exemplo-relogio.jpg', produto: 'relogio', nome: 'relógio' }
  ];

  function render(root) {
    var base = root.getAttribute('data-base') || '';
    var url = base + URL_PROVADOR;

    var mosaico = EXEMPLOS.map(function (e, i) {
      return '<a class="provador-mosaico-item provador-mosaico-item--' + (i + 1) + '" href="' + url + '?produto=' + e.produto + '">' +
        '<img src="' + base + 'assets/images/provador/' + e.arquivo + '" alt="Prévia de foto estampada em ' + e.nome + '" loading="lazy" />' +
        '<span class="provador-mosaico-tag">Testar em ' + e.nome + '</span>' +
      '</a>';
    }).join('');

    root.innerHTML =
      '<div class="container provador-faixa-grid">' +
        '<div class="provador-faixa-texto reveal">' +
          '<span class="provador-faixa-eyebrow"><i class="fas fa-wand-magic-sparkles"></i> Provador de estampas</span>' +
          '<h2 id="provador-secao-titulo">Você escolhe a foto.<br />A Lunna mostra o resultado.</h2>' +
          '<p>Envie uma foto especial e veja na hora como ela fica em canecas, camisetas, moletons e outros personalizados. Ajuste do seu jeito, salve a prévia ou mande pra gente pelo WhatsApp.</p>' +
          '<ul class="provador-faixa-lista">' +
            '<li><i class="fas fa-check"></i> <span><strong>Grátis:</strong> teste quantas vezes quiser, sem compromisso.</span></li>' +
            '<li><i class="fas fa-check"></i> <span><strong>8 produtos:</strong> caneca, camiseta, moletom, chaveiro e mais.</span></li>' +
            '<li><i class="fas fa-check"></i> <span><strong>Privacidade:</strong> sua foto fica só no seu aparelho.</span></li>' +
          '</ul>' +
          '<a class="btn provador-faixa-btn" href="' + url + '"><i class="fas fa-camera"></i> Testar com minha foto</a>' +
        '</div>' +
        '<div class="provador-mosaico reveal">' + mosaico + '</div>' +
      '</div>';

    root.setAttribute('aria-labelledby', 'provador-secao-titulo');
  }

  document.querySelectorAll('[data-cta-estampa]').forEach(render);
})();
