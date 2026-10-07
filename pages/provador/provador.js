/* ===== PROVADOR DE ESTAMPAS =====
   O cliente envia uma foto e vê como ela fica estampada nos produtos.
   Tudo acontece no navegador: a foto não é enviada para nenhum
   servidor. A prévia é um SVG (600x600) desenhado aqui mesmo; para
   baixar, o SVG é convertido em PNG via <canvas>.

   Para incluir um produto novo, acrescente um item em PRODUTOS com:
   - id, nome, icon (Font Awesome), cores [{nome, hex}]
   - area: região da estampa {x, y, w, h, forma: 'rect'|'circulo', r}
   - desenharFundo(cor) / desenharFrente(cor): SVG do produto por baixo
     e por cima da foto (sombras, costuras, brilho)
   - link: página/categoria do produto no site */

(function () {
  'use strict';

  var WHATSAPP = '5515991594021';
  var MAX_LADO = 1600;              // foto é reduzida para no máx. 1600px
  var MAX_BYTES = 20 * 1024 * 1024; // 20 MB

  /* ===== HELPERS DE COR ===== */
  function escurecer(hex, f) {
    var n = parseInt(hex.slice(1), 16);
    var r = Math.round(((n >> 16) & 255) * f), g = Math.round(((n >> 8) & 255) * f), b = Math.round((n & 255) * f);
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
  function ehEscura(hex) {
    var n = parseInt(hex.slice(1), 16);
    var l = 0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255);
    return l < 110;
  }
  function linha(cor) { return ehEscura(cor) ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.14)'; }

  var CORES_ROUPA = [
    { nome: 'Branca', hex: '#f7f7f5' }, { nome: 'Preta', hex: '#232326' },
    { nome: 'Rosa', hex: '#f6c6d3' }, { nome: 'Cinza', hex: '#b9bcc2' },
    { nome: 'Bege', hex: '#e3d3bb' }, { nome: 'Azul', hex: '#2f4a7a' }
  ];

  /* ===== PRODUTOS (desenhos em viewBox 600x600) ===== */
  var PRODUTOS = [
    {
      id: 'camiseta', nome: 'Camiseta', icon: 'fa-shirt',
      cores: CORES_ROUPA,
      area: { x: 212, y: 165, w: 176, h: 220, forma: 'rect' },
      link: '../roupas/roupas.html',
      desenharFundo: function (c) {
        return '<path d="M170 92 L238 66 Q300 112 362 66 L430 92 L545 172 L494 258 L442 226 L442 532 Q300 548 158 532 L158 226 L106 258 L55 172 Z" fill="' + c + '" stroke="' + escurecer(c, 0.82) + '" stroke-width="3" stroke-linejoin="round"/>';
      },
      desenharFrente: function (c) {
        var l = linha(c);
        return '<path d="M238 66 Q300 112 362 66" fill="none" stroke="' + escurecer(c, 0.75) + '" stroke-width="10" stroke-linecap="round"/>' +
          '<path d="M158 226 L170 96 M442 226 L430 96" stroke="' + l + '" stroke-width="2" fill="none"/>' +
          '<path d="M106 258 L130 214 M494 258 L470 214" stroke="' + l + '" stroke-width="2" fill="none"/>' +
          '<path d="M170 92 L238 66 Q300 112 362 66 L430 92 L545 172 L494 258 L442 226 L442 532 Q300 548 158 532 L158 226 L106 258 L55 172 Z" fill="url(#pv-dobra)" opacity="0.45"/>';
      }
    },
    {
      id: 'moletom', nome: 'Moletom', icon: 'fa-shirt',
      cores: CORES_ROUPA,
      area: { x: 222, y: 200, w: 156, h: 150, forma: 'rect' },
      link: '../roupas/roupas.html?cat=moletons',
      desenharFundo: function (c) {
        var e = escurecer(c, 0.84);
        return '<path d="M233 102 Q300 18 367 102 Q340 150 300 152 Q260 150 233 102 Z" fill="' + e + '"/>' +
          '<path d="M176 118 L240 96 Q300 140 360 96 L424 118 L520 232 L548 470 L496 482 L470 296 L446 262 L446 506 L154 506 L154 262 L130 296 L104 482 L52 470 L80 232 Z" fill="' + c + '" stroke="' + escurecer(c, 0.8) + '" stroke-width="3" stroke-linejoin="round"/>' +
          '<rect x="154" y="500" width="292" height="34" rx="6" fill="' + escurecer(c, 0.9) + '"/>' +
          '<rect x="50" y="466" width="54" height="30" rx="6" fill="' + escurecer(c, 0.9) + '" transform="rotate(4 77 481)"/>' +
          '<rect x="496" y="466" width="54" height="30" rx="6" fill="' + escurecer(c, 0.9) + '" transform="rotate(-4 523 481)"/>';
      },
      desenharFrente: function (c) {
        var l = linha(c), e = escurecer(c, 0.7);
        return '<path d="M240 100 Q300 150 360 100 Q330 128 300 130 Q270 128 240 100 Z" fill="' + e + '" opacity="0.6"/>' +
          '<path d="M278 130 L272 196 M322 130 L328 196" stroke="' + escurecer(c, 0.6) + '" stroke-width="4" stroke-linecap="round"/>' +
          '<path d="M214 392 L386 392 L414 486 L186 486 Z" fill="none" stroke="' + l + '" stroke-width="3" stroke-linejoin="round"/>' +
          '<path d="M154 262 L176 120 M446 262 L424 120" stroke="' + l + '" stroke-width="2"/>' +
          '<path d="M176 118 L240 96 Q300 140 360 96 L424 118 L520 232 L548 470 L496 482 L470 296 L446 262 L446 506 L154 506 L154 262 L130 296 L104 482 L52 470 L80 232 Z" fill="url(#pv-dobra)" opacity="0.4"/>';
      }
    },
    {
      id: 'caneca', nome: 'Caneca', icon: 'fa-mug-hot',
      cores: [{ nome: 'Branca', hex: '#ffffff' }, { nome: 'Alça rosa', hex: '#ff8fab' }, { nome: 'Alça preta', hex: '#2a2a2e' }, { nome: 'Alça azul', hex: '#5aa9e6' }],
      area: { x: 158, y: 186, w: 244, h: 250, forma: 'rect' },
      link: '../personalizados/personalizados.html?cat=canecas',
      desenharFundo: function (c) {
        return '<ellipse cx="290" cy="476" rx="170" ry="22" fill="rgba(0,0,0,0.12)"/>' +
          '<path d="M408 210 C512 206 516 410 408 404" fill="none" stroke="' + (c === '#ffffff' ? '#f1f1f1' : c) + '" stroke-width="34" stroke-linecap="round"/>' +
          '<path d="M408 210 C512 206 516 410 408 404" fill="none" stroke="rgba(0,0,0,0.08)" stroke-width="2"/>' +
          '<path d="M140 160 L420 160 L420 444 Q420 470 394 470 L166 470 Q140 470 140 444 Z" fill="#ffffff" stroke="#d9d9d9" stroke-width="2"/>';
      },
      desenharFrente: function (c) {
        return '<path d="M140 160 L420 160 L420 444 Q420 470 394 470 L166 470 Q140 470 140 444 Z" fill="url(#pv-cilindro)"/>' +
          '<ellipse cx="280" cy="160" rx="140" ry="20" fill="' + (c === '#ffffff' ? '#f4f4f4' : c) + '" stroke="#d0d0d0" stroke-width="2"/>' +
          '<ellipse cx="280" cy="162" rx="126" ry="13" fill="' + escurecer(c === '#ffffff' ? '#e6e6e6' : c, 0.8) + '"/>';
      }
    },
    {
      id: 'body', nome: 'Body de bebê', icon: 'fa-baby',
      cores: [{ nome: 'Branco', hex: '#f7f7f5' }, { nome: 'Rosa', hex: '#f6c6d3' }, { nome: 'Azul', hex: '#bcd9f2' }, { nome: 'Amarelo', hex: '#f8e6a8' }],
      area: { x: 226, y: 196, w: 148, h: 168, forma: 'rect' },
      link: '../personalizados/personalizados.html?cat=bodys',
      desenharFundo: function (c) {
        return '<path d="M214 106 Q300 152 386 106 L452 138 L504 210 L458 244 L432 222 L432 396 Q432 466 360 498 L344 546 L256 546 L240 498 Q168 466 168 396 L168 222 L142 244 L96 210 L148 138 Z" fill="' + c + '" stroke="' + escurecer(c, 0.82) + '" stroke-width="3" stroke-linejoin="round"/>';
      },
      desenharFrente: function (c) {
        var l = linha(c);
        return '<path d="M214 106 Q300 152 386 106" fill="none" stroke="' + escurecer(c, 0.75) + '" stroke-width="9" stroke-linecap="round"/>' +
          '<path d="M256 538 L344 538" stroke="' + l + '" stroke-width="3"/>' +
          '<circle cx="276" cy="528" r="5" fill="#d8d8d8"/><circle cx="300" cy="528" r="5" fill="#d8d8d8"/><circle cx="324" cy="528" r="5" fill="#d8d8d8"/>' +
          '<path d="M168 222 L150 140 M432 222 L450 140" stroke="' + l + '" stroke-width="2"/>';
      }
    },
    {
      id: 'mousepad', nome: 'Mouse pad', icon: 'fa-computer-mouse',
      cores: [{ nome: 'Borda preta', hex: '#1f1f22' }, { nome: 'Borda branca', hex: '#f2f2f2' }],
      area: { x: 82, y: 152, w: 436, h: 316, forma: 'rect', r: 22 },
      link: '../personalizados/personalizados.html?cat=mousepads',
      desenharFundo: function (c) {
        return '<rect x="78" y="160" width="452" height="324" rx="28" fill="rgba(0,0,0,0.18)"/>' +
          '<rect x="70" y="140" width="460" height="340" rx="28" fill="' + c + '"/>';
      },
      desenharFrente: function (c) {
        return '<rect x="76" y="146" width="448" height="328" rx="24" fill="none" stroke="' + (ehEscura(c) ? '#444' : '#d5d5d5') + '" stroke-width="5" stroke-dasharray="2 5"/>' +
          '<rect x="82" y="152" width="436" height="316" rx="22" fill="url(#pv-brilho)"/>';
      }
    },
    {
      id: 'chaveiro', nome: 'Chaveiro', icon: 'fa-key',
      cores: [{ nome: 'Argola prata', hex: '#c7cbd1' }, { nome: 'Argola dourada', hex: '#d8b45a' }],
      area: { x: 140, y: 190, w: 320, h: 320, forma: 'circulo' },
      link: '../personalizados/personalizados.html?cat=chaveiros',
      desenharFundo: function (c) {
        return '<circle cx="300" cy="104" r="46" fill="none" stroke="' + c + '" stroke-width="9"/>' +
          '<rect x="291" y="146" width="18" height="34" rx="6" fill="' + escurecer(c, 0.85) + '"/>' +
          '<circle cx="306" cy="356" r="172" fill="rgba(0,0,0,0.15)"/>' +
          '<circle cx="300" cy="350" r="172" fill="#ffffff" stroke="#dadada" stroke-width="3"/>' +
          '<circle cx="300" cy="190" r="8" fill="#f2f2f2" stroke="#cfcfcf" stroke-width="2"/>';
      },
      desenharFrente: function () {
        return '<circle cx="300" cy="350" r="166" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="6"/>' +
          '<ellipse cx="236" cy="262" rx="70" ry="34" transform="rotate(-35 236 262)" fill="rgba(255,255,255,0.28)"/>' +
          '<circle cx="300" cy="196" r="9" fill="#f6f6f6" stroke="#bdbdbd" stroke-width="2"/>';
      }
    },
    {
      id: 'azulejo', nome: 'Azulejo / plaquinha', icon: 'fa-image',
      cores: [{ nome: 'Branco', hex: '#ffffff' }],
      area: { x: 136, y: 136, w: 328, h: 328, forma: 'rect' },
      link: '../personalizados/personalizados.html?cat=imas',
      desenharFundo: function () {
        return '<rect x="128" y="132" width="352" height="352" rx="10" fill="rgba(0,0,0,0.16)"/>' +
          '<rect x="120" y="120" width="360" height="360" rx="10" fill="#ffffff" stroke="#dcdcdc" stroke-width="2"/>';
      },
      desenharFrente: function () {
        return '<rect x="136" y="136" width="328" height="328" fill="url(#pv-brilho)"/>';
      }
    },
    {
      id: 'relogio', nome: 'Relógio', icon: 'fa-clock',
      cores: [{ nome: 'Ponteiro preto', hex: '#1d1d1f' }, { nome: 'Ponteiro rosa', hex: '#ff6f91' }, { nome: 'Ponteiro dourado', hex: '#c9a24c' }],
      area: { x: 92, y: 92, w: 416, h: 416, forma: 'circulo' },
      link: '../personalizados/personalizados.html?cat=relogios',
      desenharFundo: function () {
        return '<circle cx="306" cy="308" r="230" fill="rgba(0,0,0,0.16)"/>' +
          '<circle cx="300" cy="300" r="230" fill="#ffffff" stroke="#d6d6d6" stroke-width="3"/>';
      },
      desenharFrente: function (c) {
        var marcas = '';
        for (var i = 0; i < 12; i++) {
          var a = i * Math.PI / 6, r1 = i % 3 === 0 ? 172 : 184, r2 = 198;
          marcas += '<line x1="' + (300 + r1 * Math.sin(a)).toFixed(1) + '" y1="' + (300 - r1 * Math.cos(a)).toFixed(1) +
            '" x2="' + (300 + r2 * Math.sin(a)).toFixed(1) + '" y2="' + (300 - r2 * Math.cos(a)).toFixed(1) +
            '" stroke="#fff" stroke-width="' + (i % 3 === 0 ? 9 : 5) + '" stroke-linecap="round" opacity="0.95"/>';
        }
        return marcas +
          '<line x1="300" y1="300" x2="300" y2="168" stroke="' + c + '" stroke-width="12" stroke-linecap="round" transform="rotate(-60 300 300)"/>' +
          '<line x1="300" y1="300" x2="300" y2="124" stroke="' + c + '" stroke-width="8" stroke-linecap="round" transform="rotate(58 300 300)"/>' +
          '<circle cx="300" cy="300" r="14" fill="' + c + '"/>' +
          '<circle cx="300" cy="300" r="208" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="4"/>' +
          '<ellipse cx="220" cy="190" rx="110" ry="50" transform="rotate(-35 220 190)" fill="rgba(255,255,255,0.14)"/>';
      }
    }
  ];

  var FILTROS = {
    nenhum: '',
    pb: '<filter id="pv-f"><feColorMatrix type="saturate" values="0"/></filter>',
    sepia: '<filter id="pv-f"><feColorMatrix type="matrix" values="0.393 0.769 0.189 0 0 0.349 0.686 0.168 0 0 0.272 0.534 0.131 0 0 0 0 0 1 0"/></filter>',
    vivo: '<filter id="pv-f"><feColorMatrix type="saturate" values="1.45"/><feComponentTransfer><feFuncR type="linear" slope="1.06"/><feFuncG type="linear" slope="1.06"/><feFuncB type="linear" slope="1.06"/></feComponentTransfer></filter>'
  };

  /* ===== ESTADO ===== */
  var estado = {
    produto: PRODUTOS[0], cor: PRODUTOS[0].cores[0],
    foto: null,           // { src (dataURL), w, h }
    zoom: 1, rot: 0, dx: 0, dy: 0,
    filtro: 'nenhum',
    texto: '', textoCor: '#ffffff', textoPos: 'baixo'
  };

  var $ = function (id) { return document.getElementById(id); };
  var svg;

  /* ===== RENDERIZAÇÃO ===== */
  function esc(t) {
    return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function formaArea(a) {
    if (a.forma === 'circulo') return '<circle cx="' + (a.x + a.w / 2) + '" cy="' + (a.y + a.h / 2) + '" r="' + (a.w / 2) + '"/>';
    return '<rect x="' + a.x + '" y="' + a.y + '" width="' + a.w + '" height="' + a.h + '" rx="' + (a.r || 4) + '"/>';
  }

  function geometriaFoto() {
    var a = estado.produto.area, f = estado.foto;
    var base = Math.max(a.w / f.w, a.h / f.h);     // "preencher" a área
    var w = f.w * base * estado.zoom, h = f.h * base * estado.zoom;
    var cx = a.x + a.w / 2 + estado.dx, cy = a.y + a.h / 2 + estado.dy;
    return { x: cx - w / 2, y: cy - h / 2, w: w, h: h, cx: cx, cy: cy };
  }

  // Monta o SVG completo (usado na tela e na exportação)
  function montarSVG(paraExportar) {
    var p = estado.produto, c = estado.cor.hex, a = p.area;
    var defs =
      '<defs>' +
        '<clipPath id="pv-clip">' + formaArea(a) + '</clipPath>' +
        '<linearGradient id="pv-cilindro" x1="0" x2="1" y1="0" y2="0">' +
          '<stop offset="0" stop-color="#000" stop-opacity="0.22"/><stop offset="0.18" stop-color="#fff" stop-opacity="0.25"/>' +
          '<stop offset="0.32" stop-color="#fff" stop-opacity="0"/><stop offset="0.8" stop-color="#000" stop-opacity="0.05"/>' +
          '<stop offset="1" stop-color="#000" stop-opacity="0.28"/></linearGradient>' +
        '<linearGradient id="pv-dobra" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity="0.12"/>' +
          '<stop offset="0.25" stop-color="#000" stop-opacity="0"/><stop offset="0.75" stop-color="#000" stop-opacity="0"/>' +
          '<stop offset="1" stop-color="#000" stop-opacity="0.12"/></linearGradient>' +
        '<linearGradient id="pv-brilho" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0.32"/>' +
          '<stop offset="0.35" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>' +
        (FILTROS[estado.filtro] || '') +
      '</defs>';

    var miolo;
    if (estado.foto) {
      var g = geometriaFoto();
      miolo = '<g clip-path="url(#pv-clip)">' +
        '<image href="' + estado.foto.src + '" x="' + g.x.toFixed(2) + '" y="' + g.y.toFixed(2) + '" width="' + g.w.toFixed(2) + '" height="' + g.h.toFixed(2) +
        '" preserveAspectRatio="none" transform="rotate(' + estado.rot + ' ' + g.cx.toFixed(2) + ' ' + g.cy.toFixed(2) + ')"' +
        (estado.filtro !== 'nenhum' ? ' filter="url(#pv-f)"' : '') + '/></g>';
    } else {
      // Área da estampa marcada enquanto não há foto
      miolo = '<g clip-path="url(#pv-clip)"><rect x="' + a.x + '" y="' + a.y + '" width="' + a.w + '" height="' + a.h + '" fill="rgba(255,111,145,0.10)"/></g>' +
        '<g fill="none" stroke="#d91483" stroke-width="3" stroke-dasharray="10 8">' + formaArea(a) + '</g>';
    }

    var texto = '';
    if (estado.texto.trim()) {
      var tam = Math.max(16, Math.min(34, a.w / Math.max(8, estado.texto.length * 0.62)));
      var ty = estado.textoPos === 'cima' ? a.y + tam + 10 : a.y + a.h - 14;
      if (a.forma === 'circulo') ty = estado.textoPos === 'cima' ? a.y + a.h * 0.22 : a.y + a.h * 0.86;
      var sombra = estado.textoCor === '#222222' ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.45)';
      texto = '<g clip-path="url(#pv-clip)"><text x="' + (a.x + a.w / 2) + '" y="' + ty.toFixed(1) + '" text-anchor="middle" font-family="Poppins, Arial, sans-serif" font-weight="700" font-size="' + tam.toFixed(1) +
        '" fill="' + estado.textoCor + '" stroke="' + sombra + '" stroke-width="3" paint-order="stroke">' + esc(estado.texto) + '</text></g>';
    }

    var fundoExport = paraExportar
      ? '<rect width="600" height="600" fill="#fff5f7"/>' +
        '<text x="300" y="584" text-anchor="middle" font-family="Poppins, Arial, sans-serif" font-size="15" fill="#b5838d">Prévia · Lunna Presentes</text>'
      : '';

    return defs + fundoExport + p.desenharFundo(c) + miolo + p.desenharFrente(c) + texto;
  }

  function render() {
    svg.innerHTML = '<title id="pv-svg-title">Prévia: ' + esc(estado.produto.nome) + (estado.foto ? ' com a sua foto' : '') + '</title>' + montarSVG(false);
    var temFoto = !!estado.foto;
    $('pv-vazio').hidden = temFoto;
    $('pv-dica').hidden = !temFoto;
    $('pv-baixar').disabled = !temFoto;
    $('pv-pedir').disabled = !temFoto;
    document.querySelectorAll('.provador-toolbar button').forEach(function (b) { b.disabled = !temFoto; });
    $('pv-zoom').disabled = !temFoto; $('pv-rot').disabled = !temFoto;
    $('pv-zoom').value = Math.round(estado.zoom * 100); $('pv-zoom-val').textContent = Math.round(estado.zoom * 100) + '%';
    $('pv-rot').value = estado.rot; $('pv-rot-val').textContent = estado.rot + '°';
  }

  /* ===== PRODUTOS E CORES (UI) ===== */
  function montarProdutos() {
    var box = $('pv-produtos');
    box.innerHTML = PRODUTOS.map(function (p, i) {
      return '<button type="button" role="radio" data-id="' + p.id + '" aria-checked="' + (i === 0) + '"' + (i === 0 ? ' class="ativo"' : '') + '>' +
        '<i class="fas ' + p.icon + '" aria-hidden="true"></i><span>' + p.nome + '</span></button>';
    }).join('');
    box.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      escolherProduto(b.getAttribute('data-id'));
    });
  }

  function escolherProduto(id) {
    var p = PRODUTOS.filter(function (x) { return x.id === id; })[0] || PRODUTOS[0];
    estado.produto = p; estado.cor = p.cores[0];
    estado.zoom = 1; estado.dx = 0; estado.dy = 0;
    marcar('pv-produtos', function (b) { return b.getAttribute('data-id') === p.id; });
    $('pv-produto-nome').textContent = p.nome;
    $('pv-ver-produtos').href = p.link;
    montarCores();
    render();
  }

  function montarCores() {
    var p = estado.produto, box = $('pv-cores');
    box.innerHTML = p.cores.map(function (c, i) {
      return '<button type="button" role="radio" title="' + c.nome + '" aria-label="' + c.nome + '" aria-checked="' + (i === 0) + '"' +
        (i === 0 ? ' class="ativo"' : '') + ' data-i="' + i + '" style="--cor:' + c.hex + '"></button>';
    }).join('');
    $('pv-cor-nome').textContent = p.cores[0].nome;
    box.parentNode.hidden = p.cores.length < 2;
  }

  function marcar(grupoId, teste) {
    document.querySelectorAll('#' + grupoId + ' button').forEach(function (b) {
      var on = teste(b);
      b.classList.toggle('ativo', on);
      b.setAttribute('aria-checked', on ? 'true' : 'false');
    });
  }

  /* ===== FOTO: UPLOAD, REDUÇÃO E VALIDAÇÃO ===== */
  function erro(msg) {
    var el = $('pv-erro');
    el.textContent = msg || '';
    el.hidden = !msg;
  }

  function carregarArquivo(arquivo) {
    erro('');
    if (!arquivo) return;
    if (!/^image\//.test(arquivo.type)) { erro('Esse arquivo não é uma imagem. Envie uma foto em JPG, PNG ou WEBP.'); return; }
    if (arquivo.size > MAX_BYTES) { erro('A foto passa de 20 MB. Escolha uma imagem menor.'); return; }
    var url = URL.createObjectURL(arquivo);
    carregarURL(url, arquivo.name, function () { URL.revokeObjectURL(url); });
  }

  function carregarURL(url, nome, depois) {
    var img = new Image();
    img.onload = function () {
      // Reduz e converte para dataURL (necessário para exportar o PNG)
      var esc = Math.min(1, MAX_LADO / Math.max(img.naturalWidth, img.naturalHeight));
      var w = Math.round(img.naturalWidth * esc), h = Math.round(img.naturalHeight * esc);
      var cv = document.createElement('canvas'); cv.width = w; cv.height = h;
      var ctx = cv.getContext('2d');
      ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);
      estado.foto = { src: cv.toDataURL('image/jpeg', 0.9), w: w, h: h };
      estado.zoom = 1; estado.rot = 0; estado.dx = 0; estado.dy = 0;
      $('pv-upload-texto').textContent = nome ? 'Trocar foto' : 'Escolher foto';
      render();
      if (depois) depois();
      if (window.innerWidth < 1024) $('pv-stage').scrollIntoView({ behavior: 'smooth', block: 'center' });
    };
    img.onerror = function () {
      erro('Não conseguimos abrir essa imagem (fotos HEIC do iPhone podem não abrir em alguns navegadores). Tente salvar como JPG ou PNG.');
      if (depois) depois();
    };
    img.src = url;
  }

  function initUpload() {
    var input = $('pv-file');
    input.addEventListener('change', function () { carregarArquivo(input.files && input.files[0]); input.value = ''; });

    // Arrastar e soltar na área de upload e na prévia
    [$('pv-drop'), $('pv-stage')].forEach(function (zona) {
      ['dragenter', 'dragover'].forEach(function (ev) {
        zona.addEventListener(ev, function (e) { e.preventDefault(); zona.classList.add('arrastando'); });
      });
      ['dragleave', 'drop'].forEach(function (ev) {
        zona.addEventListener(ev, function (e) { e.preventDefault(); zona.classList.remove('arrastando'); });
      });
      zona.addEventListener('drop', function (e) {
        var f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        carregarArquivo(f);
      });
    });

    // Colar imagem (Ctrl+V)
    document.addEventListener('paste', function (e) {
      var itens = (e.clipboardData && e.clipboardData.items) || [];
      for (var i = 0; i < itens.length; i++) {
        if (itens[i].type.indexOf('image/') === 0) { carregarArquivo(itens[i].getAsFile()); break; }
      }
    });

    $('pv-exemplo').addEventListener('click', function () {
      erro('');
      carregarURL('../../assets/images/logo_lunna_presentes.jpeg', 'exemplo');
    });
  }

  /* ===== ARRASTAR / PINÇA / RODA DO MOUSE ===== */
  function paraViewBox(dxTela, dyTela) {
    var r = svg.getBoundingClientRect();
    var f = 600 / r.width;
    return { x: dxTela * f, y: dyTela * f };
  }

  function limitar() {
    estado.zoom = Math.max(0.4, Math.min(3, estado.zoom));
    var lim = 400;
    estado.dx = Math.max(-lim, Math.min(lim, estado.dx));
    estado.dy = Math.max(-lim, Math.min(lim, estado.dy));
  }

  function initGestos() {
    var ponteiros = {}, ultimo = null, distInicial = 0, zoomInicial = 1;

    svg.addEventListener('pointerdown', function (e) {
      if (!estado.foto) return;
      svg.setPointerCapture(e.pointerId);
      ponteiros[e.pointerId] = { x: e.clientX, y: e.clientY };
      var ids = Object.keys(ponteiros);
      if (ids.length === 2) {
        var a = ponteiros[ids[0]], b = ponteiros[ids[1]];
        distInicial = Math.hypot(a.x - b.x, a.y - b.y); zoomInicial = estado.zoom;
      }
      ultimo = { x: e.clientX, y: e.clientY };
      svg.classList.add('arrastando');
    });

    svg.addEventListener('pointermove', function (e) {
      if (!ponteiros[e.pointerId]) return;
      ponteiros[e.pointerId] = { x: e.clientX, y: e.clientY };
      var ids = Object.keys(ponteiros);
      if (ids.length >= 2) {
        var a = ponteiros[ids[0]], b = ponteiros[ids[1]];
        var d = Math.hypot(a.x - b.x, a.y - b.y);
        if (distInicial > 0) estado.zoom = zoomInicial * d / distInicial;
      } else if (ultimo) {
        var v = paraViewBox(e.clientX - ultimo.x, e.clientY - ultimo.y);
        estado.dx += v.x; estado.dy += v.y;
        ultimo = { x: e.clientX, y: e.clientY };
      }
      limitar(); agendarRender();
    });

    function soltar(e) {
      delete ponteiros[e.pointerId];
      var ids = Object.keys(ponteiros);
      ultimo = ids.length ? ponteiros[ids[0]] : null;
      if (!ids.length) svg.classList.remove('arrastando');
    }
    svg.addEventListener('pointerup', soltar);
    svg.addEventListener('pointercancel', soltar);

    svg.addEventListener('wheel', function (e) {
      if (!estado.foto) return;
      e.preventDefault();
      estado.zoom *= e.deltaY < 0 ? 1.06 : 1 / 1.06;
      limitar(); agendarRender();
    }, { passive: false });

    // Teclado: setas movem, +/- mudam o tamanho
    svg.addEventListener('keydown', function (e) {
      if (!estado.foto) return;
      var passo = e.shiftKey ? 20 : 6, tratou = true;
      if (e.key === 'ArrowLeft') estado.dx -= passo;
      else if (e.key === 'ArrowRight') estado.dx += passo;
      else if (e.key === 'ArrowUp') estado.dy -= passo;
      else if (e.key === 'ArrowDown') estado.dy += passo;
      else if (e.key === '+' || e.key === '=') estado.zoom *= 1.08;
      else if (e.key === '-') estado.zoom /= 1.08;
      else tratou = false;
      if (tratou) { e.preventDefault(); limitar(); render(); }
    });
  }

  var rafPendente = false;
  function agendarRender() {
    if (rafPendente) return;
    rafPendente = true;
    requestAnimationFrame(function () { rafPendente = false; render(); });
  }

  /* ===== CONTROLES ===== */
  function initControles() {
    $('pv-cores').addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      estado.cor = estado.produto.cores[+b.getAttribute('data-i')];
      $('pv-cor-nome').textContent = estado.cor.nome;
      marcar('pv-cores', function (x) { return x === b; });
      render();
    });

    $('pv-zoom').addEventListener('input', function () { estado.zoom = this.value / 100; render(); });
    $('pv-rot').addEventListener('input', function () { estado.rot = +this.value; render(); });

    document.querySelector('.provador-toolbar').addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b || !estado.foto) return;
      var acao = b.getAttribute('data-acao');
      if (acao === 'mais') estado.zoom *= 1.12;
      if (acao === 'menos') estado.zoom /= 1.12;
      if (acao === 'girar') { estado.rot = ((estado.rot + 90 + 180) % 360) - 180; }
      if (acao === 'centralizar') { estado.dx = 0; estado.dy = 0; }
      if (acao === 'reset') { estado.zoom = 1; estado.rot = 0; estado.dx = 0; estado.dy = 0; }
      limitar(); render();
    });

    $('pv-filtros').addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      estado.filtro = b.getAttribute('data-filtro');
      marcar('pv-filtros', function (x) { return x === b; });
      render();
    });

    $('pv-texto').addEventListener('input', function () { estado.texto = this.value; render(); });
    $('pv-texto-cor').addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      estado.textoCor = b.getAttribute('data-cor');
      marcar('pv-texto-cor', function (x) { return x === b; }); render();
    });
    $('pv-texto-pos').addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      estado.textoPos = b.getAttribute('data-pos');
      marcar('pv-texto-pos', function (x) { return x === b; }); render();
    });

    $('pv-baixar').addEventListener('click', function () { gerarPNG(function (blob) { baixar(blob); }); });
    $('pv-pedir').addEventListener('click', pedir);
  }

  /* ===== EXPORTAR PNG / PEDIR ===== */
  function gerarPNG(cb) {
    var lado = 1200;
    var xml = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="' + lado + '" height="' + lado + '" viewBox="0 0 600 600">' + montarSVG(true) + '</svg>';
    var img = new Image();
    img.onload = function () {
      var cv = document.createElement('canvas'); cv.width = lado; cv.height = lado;
      var ctx = cv.getContext('2d'); ctx.drawImage(img, 0, 0, lado, lado);
      cv.toBlob(function (blob) {
        if (blob) cb(blob); else erro('Não foi possível gerar a imagem neste navegador.');
      }, 'image/png');
    };
    img.onerror = function () { erro('Não foi possível gerar a imagem neste navegador.'); };
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(xml);
  }

  function nomeArquivo() {
    return 'previa-lunna-' + estado.produto.id + '.png';
  }

  function baixar(blob) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = nomeArquivo();
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
  }

  function mensagem() {
    return 'Olá! Fiz uma prévia no provador do site e quero encomendar: *' + estado.produto.nome +
      '*' + (estado.produto.cores.length > 1 ? ' (' + estado.cor.nome.toLowerCase() + ')' : '') +
      (estado.texto.trim() ? ', com a frase "' + estado.texto.trim() + '"' : '') + '. Vou enviar a imagem da prévia aqui.';
  }

  // No celular, compartilha a imagem direto (ex.: para o WhatsApp).
  // No computador, baixa a prévia e abre o WhatsApp com a mensagem.
  function pedir() {
    gerarPNG(function (blob) {
      var arquivo = null;
      try { arquivo = new File([blob], nomeArquivo(), { type: 'image/png' }); } catch (e) {}
      if (arquivo && navigator.canShare && navigator.canShare({ files: [arquivo] })) {
        navigator.share({ files: [arquivo], text: mensagem() }).catch(function () {});
        return;
      }
      baixar(blob);
      window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(mensagem() + ' (a imagem foi salva no seu computador, é só anexar)'), '_blank', 'noopener');
    });
  }

  /* ===== WHATSAPP DO CABEÇALHO/RODAPÉ ===== */
  function initWhatsAppLinks() {
    var link = typeof window.getWhatsAppGeneral === 'function' ? window.getWhatsAppGeneral() : 'https://wa.me/' + WHATSAPP;
    ['header-whatsapp', 'mobile-whatsapp', 'footer-whatsapp'].forEach(function (id) {
      var el = $(id); if (el) el.href = link;
    });
  }

  /* ===== INIT ===== */
  document.addEventListener('DOMContentLoaded', function () {
    svg = $('pv-svg');
    if (!svg) return;
    montarProdutos();
    montarCores();
    initUpload();
    initGestos();
    initControles();
    initWhatsAppLinks();

    // Abrir já com um produto: provador.html?produto=caneca
    try {
      var q = new URLSearchParams(location.search).get('produto');
      if (q) escolherProduto(q); else render();
    } catch (e) { render(); }
  });
})();
