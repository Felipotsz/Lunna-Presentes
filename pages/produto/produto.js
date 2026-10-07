/* ===== PÁGINA DE PRODUTO INDIVIDUAL ===== */
(function () {
  'use strict';

  var WHATSAPP = '5511999999999';
  var produtoAtual = null;
  var imagemAtual = 0;

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

  function slugServico(cat) {
    var mapa = {
      canecas: { slug: 'personalizados', nome: 'Personalizados' },
      personalizados: { slug: 'personalizados', nome: 'Personalizados' },
      agendas: { slug: 'personalizados', nome: 'Personalizados' },
      bodys: { slug: 'personalizados', nome: 'Personalizados' },
      bolsas: { slug: 'personalizados', nome: 'Personalizados' },
      chaveiros: { slug: 'personalizados', nome: 'Personalizados' },
      imas: { slug: 'personalizados', nome: 'Personalizados' },
      mousepads: { slug: 'personalizados', nome: 'Personalizados' },
      relogios: { slug: 'personalizados', nome: 'Personalizados' },
      tapetes: { slug: 'personalizados', nome: 'Personalizados' },
      trofeus: { slug: 'personalizados', nome: 'Personalizados' },
      camisas: { slug: 'roupas', nome: 'Lunna Mood' },
      moletons: { slug: 'roupas', nome: 'Lunna Mood' },
      cestas: { slug: 'brindes-corporativos', nome: 'Brindes Corporativos' },
      'corp-bolsas': { slug: 'brindes-corporativos', nome: 'Brindes Corporativos' },
      'corp-cadernos': { slug: 'brindes-corporativos', nome: 'Brindes Corporativos' },
      'corp-copos': { slug: 'brindes-corporativos', nome: 'Brindes Corporativos' },
      'corp-vestuario': { slug: 'brindes-corporativos', nome: 'Brindes Corporativos' },
      'corp-escritorio': { slug: 'brindes-corporativos', nome: 'Brindes Corporativos' }
    };
    return mapa[cat] || { slug: 'personalizados', nome: 'Personalizados' };
  }

  function linkWA(produto) {
    var tel = produto.whatsappNumber || WHATSAPP;
    // "cestas" (brindes corporativos) não tem preço fixo — mensagem sem valor.
    var msg = ehBrinde(produto)
      ? encodeURIComponent('Olá! Vi o produto *' + produto.name + '* e gostaria de consultar valores para um pedido corporativo.')
      : encodeURIComponent('Olá! Tenho interesse no produto: *' + produto.name + '*' + (temPreco(produto) && !/^R\$\s*0+,0+$/.test(produto.price) ? ' (' + produto.price + ').' : '. Poderia me passar o valor?'));
    return 'https://wa.me/' + tel + '?text=' + msg;
  }

  function ehBrinde(p) {
    return typeof window.ehBrindeCorporativo === 'function'
      ? window.ehBrindeCorporativo(p) : p.category === 'cestas';
  }

  function temPreco(p) { return !!(p.price && String(p.price).trim()); }

  function lerIdDaURL() {
    var params = new URLSearchParams(window.location.search);
    var id = params.get('id');
    return id ? parseInt(id, 10) : null;
  }

  function renderGaleria(produto) {
    var mainImg = document.getElementById('produto-main-image');
    var mainWrapper = mainImg.parentElement;
    var thumbsEl = document.getElementById('produto-thumbs');
    var temImagens = produto.images && produto.images.length > 0;
    var imagens = temImagens ? produto.images : [];

    var placeholderAnterior = mainWrapper.querySelector('.produto-main-placeholder');
    if (placeholderAnterior) placeholderAnterior.remove();

    if (temImagens) {
      mainImg.src = imagens[imagemAtual] || imagens[0];
      mainImg.alt = produto.name;
      mainImg.hidden = false;
    } else {
      mainImg.hidden = true;
      mainImg.removeAttribute('src');
      var placeholder = document.createElement('div');
      placeholder.className = 'produto-main-placeholder';
      placeholder.setAttribute('aria-hidden', 'true');
      placeholder.innerHTML = '<i class="fas fa-image"></i>';
      mainWrapper.appendChild(placeholder);
    }

    thumbsEl.innerHTML = '';
    if (imagens.length <= 1) return;

    imagens.forEach(function (img, i) {
      var btn = document.createElement('button');
      btn.className = 'produto-thumb' + (i === imagemAtual ? ' active' : '');
      btn.setAttribute('aria-label', 'Ver imagem ' + (i + 1));
      btn.innerHTML = '<img src="' + seguro(img) + '" alt="">';
      btn.addEventListener('click', function () {
        imagemAtual = i;
        renderGaleria(produto);
      });
      thumbsEl.appendChild(btn);
    });
  }

  function renderProduto(produto) {
    produtoAtual = produto;
    imagemAtual = 0;

    document.title = produto.name + ' | Lunna Presentes';

    var servico = slugServico(produto.category);

    document.getElementById('breadcrumb-servico').textContent = servico.nome;
    document.getElementById('breadcrumb-servico').href = '../' + servico.slug + '/' + servico.slug + '.html';
    document.getElementById('breadcrumb-produto').textContent = produto.name;

    document.getElementById('produto-nome').textContent = produto.name;

    // "cestas" (brindes corporativos): sem preço fixo, oculta o preço
    // e troca o botão para "Consultar" (ver linkWA).
    var precoEl = document.getElementById('produto-preco');
    var ehBrindeCorporativo = ehBrinde(produto);
    if (ehBrindeCorporativo) {
      // Brinde corporativo: sempre sob consulta (cores, quantidade etc.)
      precoEl.hidden = false;
      precoEl.classList.add('produto-preco--consulta');
      precoEl.innerHTML = '<i class="fas fa-comments"></i> Valor sob consulta';
    } else {
      precoEl.hidden = false;
      precoEl.textContent = temPreco(produto) ? produto.price : 'Valor sob consulta';
      precoEl.classList.toggle('produto-preco--consulta', !temPreco(produto));
    }

    document.getElementById('produto-descricao').textContent = produto.description;

    var tagsEl = document.getElementById('produto-tags');
    var tagsHtml = '';
    if (produto.isNew) {
      tagsHtml += '<span class="produto-tag"><i class="fas fa-star"></i> Novidade</span>';
    }
    if (produto.customizable) {
      tagsHtml += '<span class="produto-tag"><i class="fas fa-palette"></i> Personalizável</span>';
    }
    tagsHtml += '<span class="produto-tag"><i class="fas fa-tag"></i> ' + seguro(nomeCategoria(produto.category)) + '</span>';
    tagsEl.innerHTML = tagsHtml;

    document.getElementById('produto-whatsapp').href = linkWA(produto);
    var whatsappBtnEl = document.getElementById('produto-whatsapp');
    whatsappBtnEl.innerHTML = ehBrindeCorporativo
      ? '<i class="fab fa-whatsapp"></i> Consultar'
      : '<i class="fab fa-whatsapp"></i> Pedir pelo WhatsApp';

    renderGaleria(produto);

    document.getElementById('produto-loading').setAttribute('hidden', '');
    document.getElementById('produto-conteudo').removeAttribute('hidden');

    renderRelacionados(produto);
  }

  function renderNaoEncontrado() {
    document.getElementById('produto-loading').setAttribute('hidden', '');
    document.getElementById('produto-nao-encontrado').removeAttribute('hidden');
  }

  function renderRelacionados(produto) {
    var wrapper = document.getElementById('relacionados-grid');
    var section = document.getElementById('section-relacionados');
    if (!wrapper || !window.todosProdutos) return;

    var relacionados = window.todosProdutos
      .filter(function (p) { return p.category === produto.category && p.id !== produto.id; })
      .slice(0, 4);

    if (!relacionados.length) {
      section.setAttribute('hidden', '');
      return;
    }

    wrapper.innerHTML = '';
    relacionados.forEach(function (p) {
      var temImagem = p.images && p.images[0];
      var imagemHtml = temImagem
        ? '<img src="' + seguro(p.images[0]) + '" alt="' + seguro(p.name) + '" loading="lazy">'
        : '<div class="product-card-placeholder" aria-hidden="true"><i class="fas fa-image"></i></div>';
      var art = document.createElement('article');
      art.className = 'product-card';
      var pBrinde = ehBrinde(p);
      var precoHtml = pBrinde ? '<div class="product-card-price product-card-price--consulta"><i class="fas fa-comments"></i> Valor sob consulta</div>' : (temPreco(p)
        ? '<div class="product-card-price">' + seguro(p.price) + '</div>'
        : '<div class="product-card-price product-card-price--consulta">Valor sob consulta</div>');
      var actionsHtml = pBrinde
        ? '<div class="product-card-actions product-card-actions--consultar">' +
            '<a class="btn btn-whatsapp btn-sm" href="' + linkWA(p) + '" target="_blank" rel="noopener"><i class="fab fa-whatsapp"></i> Consultar</a>' +
          '</div>'
        : '<div class="product-card-actions">' +
            '<a class="btn btn-outline btn-sm" href="produto.html?id=' + p.id + '">Ver produto</a>' +
            '<a class="btn btn-whatsapp btn-sm" href="' + linkWA(p) + '" target="_blank" rel="noopener"><i class="fab fa-whatsapp"></i> WhatsApp</a>' +
          '</div>';
      art.innerHTML =
        '<div class="product-card-image">' +
          (p.isNew ? '<span class="badge-new">Novidade</span>' : '') +
          (p.customizable ? '<span class="badge-custom"><i class="fas fa-palette"></i> Personalizável</span>' : '') +
          imagemHtml +
        '</div>' +
        '<div class="product-card-body">' +
          '<h3 class="product-card-name"><a class="product-card-link" href="produto.html?id=' + p.id + '">' + seguro(p.name) + '</a></h3>' +
          '<p class="product-card-desc">' + seguro(p.shortDescription) + '</p>' +
          precoHtml +
          actionsHtml +
        '</div>';
      wrapper.appendChild(art);
    });
  }

  function initWhatsApp() {
    var link;
    if (typeof window.getWhatsAppGeneral === 'function') {
      link = window.getWhatsAppGeneral();
    } else {
      link = 'https://wa.me/' + WHATSAPP;
    }
    ['header-whatsapp', 'mobile-whatsapp', 'footer-whatsapp'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.href = link;
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initWhatsApp();

    var tentativas = 0;
    function tentarCarregar() {
      if (window.todosProdutos && window.todosProdutos.length) {
        var id = lerIdDaURL();
        var produto = id != null ? window.todosProdutos.find(function (p) { return p.id === id; }) : null;

        if (produto) {
          renderProduto(produto);
        } else {
          renderNaoEncontrado();
        }
        return;
      }

      tentativas++;
      if (tentativas < 30) {
        setTimeout(tentarCarregar, 100);
      } else {
        renderNaoEncontrado();
      }
    }

    tentarCarregar();
  });
})();
