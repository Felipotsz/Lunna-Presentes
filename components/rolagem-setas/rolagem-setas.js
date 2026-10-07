// components/rolagem-setas/rolagem-setas.js
// Setas de navegação para listas que rolam na horizontal (arrastar com
// o dedo). Uso: <div data-rolagem-setas> ... </div>
// - As setas ficam sobre as bordas da lista e só aparecem quando ainda
//   há conteúdo para aquele lado.
// - Se a lista não rola (ex.: o mosaico das vitrines no computador), as
//   setas ficam escondidas.

(function () {
  'use strict';

  function iniciar(lista) {
    if (lista.dataset.rolagemPronta) return;
    lista.dataset.rolagemPronta = '1';

    var moldura = document.createElement('div');
    moldura.className = 'rolagem-moldura';
    lista.parentNode.insertBefore(moldura, lista);
    moldura.appendChild(lista);

    var rotulo = lista.getAttribute('data-rolagem-setas') || 'itens';
    function botao(dir) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'rolagem-seta rolagem-seta--' + dir;
      b.setAttribute('aria-label', (dir === 'ant' ? 'Ver ' + rotulo + ' anteriores' : 'Ver mais ' + rotulo));
      b.innerHTML = '<i class="fas fa-chevron-' + (dir === 'ant' ? 'left' : 'right') + '" aria-hidden="true"></i>';
      b.addEventListener('click', function () {
        var primeiro = lista.firstElementChild;
        var passo = primeiro ? primeiro.getBoundingClientRect().width + 12 : lista.clientWidth * 0.8;
        lista.scrollBy({ left: dir === 'ant' ? -passo : passo, behavior: 'smooth' });
      });
      moldura.appendChild(b);
      return b;
    }
    var ant = botao('ant');
    var prox = botao('prox');

    function atualizar() {
      var max = lista.scrollWidth - lista.clientWidth;
      var rola = max > 4;
      moldura.classList.toggle('rolagem-ativa', rola);
      ant.hidden = !rola || lista.scrollLeft <= 4;
      prox.hidden = !rola || lista.scrollLeft >= max - 4;
    }

    lista.addEventListener('scroll', atualizar, { passive: true });
    window.addEventListener('resize', atualizar);
    window.addEventListener('load', atualizar);
    atualizar();
  }

  document.querySelectorAll('[data-rolagem-setas]').forEach(iniciar);
})();
