// data/produtos.data.js — Produtos da loja (novidades + demais).
// Produtos "Produto Exemplo" são placeholders sem imagem real; demais
// campos (categoria, preço) são funcionais para filtros e carrosséis.

(function() {
  'use strict';

  // PRODUTOS EM DESTAQUE (Novidades)
  const novidadesProdutos = [
    {
      id: 6,
      name: "Produto Exemplo",
      shortDescription: "Descrição breve do produto exemplo",
      description: "Descrição completa do produto exemplo. Substitua por informações reais do item ao cadastrar seus produtos.",
      price: "R$ 00,00",
      category: "personalizados",
      images: [],
      customizable: true,
      featured: false,
      isNew: true,
      whatsappNumber: "5511999999999",
      createdAt: "2024-11-25T10:00:00Z"
    },
    {
      id: 5,
      name: "Produto Exemplo",
      shortDescription: "Descrição breve do produto exemplo",
      description: "Descrição completa do produto exemplo. Substitua por informações reais do item ao cadastrar seus produtos.",
      price: "R$ 00,00",
      category: "personalizados",
      images: [],
      customizable: true,
      featured: false,
      isNew: true,
      whatsappNumber: "5511999999999",
      createdAt: "2024-11-20T10:00:00Z"
    },
    {
      id: 4,
      name: "Produto Exemplo",
      shortDescription: "Descrição breve do produto exemplo",
      description: "Descrição completa do produto exemplo. Substitua por informações reais do item ao cadastrar seus produtos.",
      price: "R$ 00,00",
      category: "personalizados",
      images: [],
      customizable: true,
      featured: true,
      isNew: true,
      whatsappNumber: "5511999999999",
      createdAt: "2024-11-15T10:00:00Z"
    },
    {
      id: 3,
      name: "Produto Exemplo",
      shortDescription: "Descrição breve do produto exemplo",
      description: "Descrição completa do produto exemplo. Substitua por informações reais do item ao cadastrar seus produtos.",
      price: "",
      category: "cestas",
      images: [],
      customizable: true,
      featured: true,
      isNew: true,
      whatsappNumber: "5511999999999",
      createdAt: "2024-11-10T10:00:00Z"
    }
  ];

  // Produtos adicionais que NÃO são novidades
  const outrosProdutos = [
    {
      id: 11,
      name: "Produto Exemplo",
      shortDescription: "Descrição breve do produto exemplo",
      description: "Descrição completa do produto exemplo. Substitua por informações reais do item ao cadastrar seus produtos.",
      price: "",
      category: "cestas",
      images: [],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5511999999999",
      createdAt: "2024-11-30T10:00:00Z"
    }
  ];
  

  // ===== CATÁLOGO REAL (Linktree da Lunna Presentes) =====
  // Produtos transcritos dos catálogos do Linktree (linktr.ee/LunnaPresentes),
  // com as fotos de cada catálogo em assets/images/produtos/.
  // - price: "R$ 00,00" é provisório — troque pelo valor real de cada item.
  //   Brindes Corporativos (categorias "corp-*" e "cestas") ficam com "" e o
  //   site mostra sempre "Sob consulta" (depende de cores, quantidade etc.).
  // - Categoria "moletons" (Lunna Mood): fotos do Instagram @mood.lunna.
  // - Categorias "corp-*" pertencem a Brindes Corporativos (Linha
  //   Corporativa / GP Planeta); as demais, a Personalizados.
  // - "images" usa caminhos a partir da raiz do site; o ajuste para as
  //   páginas internas é feito automaticamente logo abaixo.
  const catalogoLinktree = [
    {
      id: 300,
      name: "Xícara com Pires em Porcelana 200ml",
      shortDescription: "Caneca personalizada com foto, frase ou a logo da sua marca.",
      description: "Xícara com Pires em Porcelana 200ml. Personalizamos com a foto, o nome, a frase ou a logo que você quiser. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "R$ 00,00",
      category: "canecas",
      images: [
        "assets/images/produtos/xicara-com-pires-em-porcelana-200ml.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "Canecas (Empresas)",
      createdAt: "2026-10-06T12:00:00Z"
    },
    {
      id: 299,
      name: "Caneca de Vidro Jateado - 300ml",
      shortDescription: "Caneca personalizada com foto, frase ou a logo da sua marca.",
      description: "Caneca de Vidro Jateado - 300ml. Personalizamos com a foto, o nome, a frase ou a logo que você quiser. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "R$ 00,00",
      category: "canecas",
      images: [
        "assets/images/produtos/caneca-de-vidro-jateado-300ml.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "Canecas (Empresas)",
      createdAt: "2026-10-06T10:20:00Z"
    },
    {
      id: 298,
      name: "Caneca de 300ml Preta",
      shortDescription: "Caneca personalizada com foto, frase ou a logo da sua marca.",
      description: "Caneca de 300ml Preta. Personalizamos com a foto, o nome, a frase ou a logo que você quiser. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "R$ 00,00",
      category: "canecas",
      images: [
        "assets/images/produtos/caneca-de-300ml-preta.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "Canecas (Empresas)",
      createdAt: "2026-10-06T08:40:00Z"
    },
    {
      id: 297,
      name: "Agenda Diária Permanente com Capa PET - 14,5 x 20cm",
      shortDescription: "Capa personalizada com nome, foto ou arte exclusiva.",
      description: "Agenda Diária Permanente com Capa PET - 14,5 x 20cm. Personalizamos com a foto, o nome, a frase ou a logo que você quiser. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "R$ 00,00",
      category: "agendas",
      images: [
        "assets/images/produtos/agenda-diaria-permanente-com-capa-pet-14-5-x-20cm.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "Agendas e Cadernos",
      createdAt: "2026-10-06T11:59:00Z"
    },
    {
      id: 296,
      name: "Agenda Diária Ano 2026 com Capa de MDF Brilho (15x20cm)",
      shortDescription: "Capa personalizada com nome, foto ou arte exclusiva.",
      description: "Agenda Diária Ano 2026 com Capa de MDF Brilho (15x20cm). Personalizamos com a foto, o nome, a frase ou a logo que você quiser. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "R$ 00,00",
      category: "agendas",
      images: [
        "assets/images/produtos/agenda-diaria-ano-2026-com-capa-de-mdf-brilho-15x20cm.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "Agendas e Cadernos",
      createdAt: "2026-10-06T10:19:00Z"
    },
    {
      id: 295,
      name: "Caderno Grande Permanente 100 Folhas com Capa PET - 20,4 x 27,6cm",
      shortDescription: "Capa personalizada com nome, foto ou arte exclusiva.",
      description: "Caderno Grande Permanente 100 Folhas com Capa PET - 20,4 x 27,6cm. Personalizamos com a foto, o nome, a frase ou a logo que você quiser. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "R$ 00,00",
      category: "agendas",
      images: [
        "assets/images/produtos/caderno-grande-permanente-100-folhas-com-capa-pet-20-4-x-27-6cm.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "Agendas e Cadernos",
      createdAt: "2026-10-06T08:39:00Z"
    },
    {
      id: 294,
      name: "Body Branco para Sublimação Manga Curta (100% Poliéster)",
      shortDescription: "Body de bebê personalizado com nome, frase ou arte.",
      description: "Body Branco para Sublimação Manga Curta (100% Poliéster). Personalizamos com a foto, o nome, a frase ou a logo que você quiser. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "R$ 00,00",
      category: "bodys",
      images: [
        "assets/images/produtos/body-branco-para-sublimacao-manga-curta-100-poliester.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "Bodys",
      createdAt: "2026-10-06T11:58:00Z"
    },
    {
      id: 293,
      name: "Body Branco para Sublimação Manga Longa (100% Poliéster)",
      shortDescription: "Body de bebê personalizado com nome, frase ou arte.",
      description: "Body Branco para Sublimação Manga Longa (100% Poliéster). Personalizamos com a foto, o nome, a frase ou a logo que você quiser. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "R$ 00,00",
      category: "bodys",
      images: [
        "assets/images/produtos/body-branco-para-sublimacao-manga-longa-100-poliester.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "Bodys",
      createdAt: "2026-10-06T10:18:00Z"
    },
    {
      id: 292,
      name: "Necessaire de Algodão (280 g/m²) com Detalhe no fundo e puxador em cortiça - 22x13x08cm",
      shortDescription: "Personalizada com a estampa, nome ou logo que você quiser.",
      description: "Necessaire de Algodão (280 g/m²) com Detalhe no fundo e puxador em cortiça - 22x13x08cm. Personalizamos com a foto, o nome, a frase ou a logo que você quiser. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "R$ 00,00",
      category: "bolsas",
      images: [
        "assets/images/produtos/necessaire-de-algodao-280-g-m2-com-detalhe-no-fundo-e-puxador-em-corti.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "Bolsas e Necessáires",
      createdAt: "2026-10-06T11:57:00Z"
    },
    {
      id: 291,
      name: "Mochila de Poliéster com Bolso Frontal na Cor Preta - 24x40x115cm",
      shortDescription: "Personalizada com a estampa, nome ou logo que você quiser.",
      description: "Mochila de Poliéster com Bolso Frontal na Cor Preta - 24x40x115cm. Personalizamos com a foto, o nome, a frase ou a logo que você quiser. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "R$ 00,00",
      category: "bolsas",
      images: [
        "assets/images/produtos/mochila-de-poliester-com-bolso-frontal-na-cor-preta-24x40x115cm.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "Bolsas e Necessáires",
      createdAt: "2026-10-06T10:17:00Z"
    },
    {
      id: 290,
      name: "Necessaire de Poliéster com Abertura de Zíper na Cor Turquesa - 20x14x11cm",
      shortDescription: "Personalizada com a estampa, nome ou logo que você quiser.",
      description: "Necessaire de Poliéster com Abertura de Zíper na Cor Turquesa - 20x14x11cm. Personalizamos com a foto, o nome, a frase ou a logo que você quiser. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "R$ 00,00",
      category: "bolsas",
      images: [
        "assets/images/produtos/necessaire-de-poliester-com-abertura-de-ziper-na-cor-turquesa-20x14x11.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "Bolsas e Necessáires",
      createdAt: "2026-10-06T08:37:00Z"
    },
    {
      id: 289,
      name: "Necessaire em Poliéster Resinado Brilho Vertical - 16x19cm",
      shortDescription: "Personalizada com a estampa, nome ou logo que você quiser.",
      description: "Necessaire em Poliéster Resinado Brilho Vertical - 16x19cm. Personalizamos com a foto, o nome, a frase ou a logo que você quiser. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "R$ 00,00",
      category: "bolsas",
      images: [
        "assets/images/produtos/necessaire-em-poliester-resinado-brilho-vertical-16x19cm.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "Bolsas e Necessáires",
      createdAt: "2026-10-06T06:57:00Z"
    },
    {
      id: 288,
      name: "Chaveiro de Madeira Retangular 3 x 5cm",
      shortDescription: "Chaveiro personalizado com foto, nome ou logo.",
      description: "Chaveiro de Madeira Retangular 3 x 5cm. Personalizamos com a foto, o nome, a frase ou a logo que você quiser. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "R$ 00,00",
      category: "chaveiros",
      images: [
        "assets/images/produtos/chaveiro-de-madeira-retangular-3-x-5cm.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "Chaveiros",
      createdAt: "2026-10-06T11:56:00Z"
    },
    {
      id: 287,
      name: "Chaveiro de MDF Premium Brilho Importado - Redondo 3,5cm",
      shortDescription: "Chaveiro personalizado com foto, nome ou logo.",
      description: "Chaveiro de MDF Premium Brilho Importado - Redondo 3,5cm. Personalizamos com a foto, o nome, a frase ou a logo que você quiser. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "R$ 00,00",
      category: "chaveiros",
      images: [
        "assets/images/produtos/chaveiro-de-mdf-premium-brilho-importado-redondo-3-5cm.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "Chaveiros",
      createdAt: "2026-10-06T10:16:00Z"
    },
    {
      id: 286,
      name: "Chaveiro Acrílico Cristal 5mm - Bola 5x5cm",
      shortDescription: "Chaveiro personalizado com foto, nome ou logo.",
      description: "Chaveiro Acrílico Cristal 5mm - Bola 5x5cm. Personalizamos com a foto, o nome, a frase ou a logo que você quiser. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "R$ 00,00",
      category: "chaveiros",
      images: [
        "assets/images/produtos/chaveiro-acrilico-cristal-5mm-bola-5x5cm.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "Chaveiros",
      createdAt: "2026-10-06T08:36:00Z"
    },
    {
      id: 285,
      name: "Chaveiro Lixa em MDF 3mm Resinado",
      shortDescription: "Chaveiro personalizado com foto, nome ou logo.",
      description: "Chaveiro Lixa em MDF 3mm Resinado. Personalizamos com a foto, o nome, a frase ou a logo que você quiser. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "R$ 00,00",
      category: "chaveiros",
      images: [
        "assets/images/produtos/chaveiro-lixa-em-mdf-3mm-resinado.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "Chaveiros",
      createdAt: "2026-10-06T06:56:00Z"
    },
    {
      id: 284,
      name: "Chaveiro de Acrílico Branco Família - 5x5cm",
      shortDescription: "Chaveiro personalizado com foto, nome ou logo.",
      description: "Chaveiro de Acrílico Branco Família - 5x5cm. Personalizamos com a foto, o nome, a frase ou a logo que você quiser. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "R$ 00,00",
      category: "chaveiros",
      images: [
        "assets/images/produtos/chaveiro-de-acrilico-branco-familia-5x5cm.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "Chaveiros",
      createdAt: "2026-10-06T05:16:00Z"
    },
    {
      id: 283,
      name: "Almochaveiro - Leão",
      shortDescription: "Chaveiro personalizado com foto, nome ou logo.",
      description: "Almochaveiro - Leão. Personalizamos com a foto, o nome, a frase ou a logo que você quiser. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "R$ 00,00",
      category: "chaveiros",
      images: [
        "assets/images/produtos/almochaveiro-leao.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "Chaveiros",
      createdAt: "2026-10-06T03:36:00Z"
    },
    {
      id: 282,
      name: "Chaveiro em Courino Coração com Glitter",
      shortDescription: "Chaveiro personalizado com foto, nome ou logo.",
      description: "Chaveiro em Courino Coração com Glitter. Personalizamos com a foto, o nome, a frase ou a logo que você quiser. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "R$ 00,00",
      category: "chaveiros",
      images: [
        "assets/images/produtos/chaveiro-em-courino-coracao-com-glitter.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "Chaveiros",
      createdAt: "2026-10-06T01:56:00Z"
    },
    {
      id: 281,
      name: "Kit p/ Botton I-Mark - Magnético - 5,5cm (100 Und)",
      shortDescription: "Personalize com foto, logo ou mensagem especial.",
      description: "Kit p/ Botton I-Mark - Magnético - 5,5cm (100 Und). Personalizamos com a foto, o nome, a frase ou a logo que você quiser. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "R$ 00,00",
      category: "imas",
      images: [
        "assets/images/produtos/kit-p-botton-i-mark-magnetico-5-5cm-100-und.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "Imãs e Plaquinhas",
      createdAt: "2026-10-06T11:55:00Z"
    },
    {
      id: 280,
      name: "Azulejo de Cerâmica Branco com Imã para Sublimação 4,5 x 4,5 cm",
      shortDescription: "Personalize com foto, logo ou mensagem especial.",
      description: "Azulejo de Cerâmica Branco com Imã para Sublimação 4,5 x 4,5 cm. Personalizamos com a foto, o nome, a frase ou a logo que você quiser. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "R$ 00,00",
      category: "imas",
      images: [
        "assets/images/produtos/azulejo-de-ceramica-branco-com-ima-para-sublimacao-4-5-x-4-5-cm.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "Imãs e Plaquinhas",
      createdAt: "2026-10-06T10:15:00Z"
    },
    {
      id: 279,
      name: "Abridor de Garrafa de Inox com Imã 8,7 cm",
      shortDescription: "Personalize com foto, logo ou mensagem especial.",
      description: "Abridor de Garrafa de Inox com Imã 8,7 cm. Personalizamos com a foto, o nome, a frase ou a logo que você quiser. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "R$ 00,00",
      category: "imas",
      images: [
        "assets/images/produtos/abridor-de-garrafa-de-inox-com-ima-8-7-cm.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "Imãs e Plaquinhas",
      createdAt: "2026-10-06T08:35:00Z"
    },
    {
      id: 278,
      name: "Plaquinha de Imã para Sublimação Hexagonal 9 x 9cm",
      shortDescription: "Personalize com foto, logo ou mensagem especial.",
      description: "Plaquinha de Imã para Sublimação Hexagonal 9 x 9cm. Personalizamos com a foto, o nome, a frase ou a logo que você quiser. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "R$ 00,00",
      category: "imas",
      images: [
        "assets/images/produtos/plaquinha-de-ima-para-sublimacao-hexagonal-9-x-9cm.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "Imãs e Plaquinhas",
      createdAt: "2026-10-06T06:55:00Z"
    },
    {
      id: 277,
      name: "Plaquinha de Imã para Sublimação Coração 9 x 9cm",
      shortDescription: "Personalize com foto, logo ou mensagem especial.",
      description: "Plaquinha de Imã para Sublimação Coração 9 x 9cm. Personalizamos com a foto, o nome, a frase ou a logo que você quiser. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "R$ 00,00",
      category: "imas",
      images: [
        "assets/images/produtos/plaquinha-de-ima-para-sublimacao-coracao-9-x-9cm.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "Imãs e Plaquinhas",
      createdAt: "2026-10-06T05:15:00Z"
    },
    {
      id: 276,
      name: "Mouse Pad Gamer Monster de Borracha 40 x 89cm",
      shortDescription: "Mouse pad com estampa personalizada em alta definição.",
      description: "Mouse Pad Gamer Monster de Borracha 40 x 89cm. Personalizamos com a foto, o nome, a frase ou a logo que você quiser. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "R$ 00,00",
      category: "mousepads",
      images: [
        "assets/images/produtos/mouse-pad-gamer-monster-de-borracha-40-x-89cm.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "MousePad",
      createdAt: "2026-10-06T11:54:00Z"
    },
    {
      id: 275,
      name: "Mouse Pad de Látex Retangular 19x23cm",
      shortDescription: "Mouse pad com estampa personalizada em alta definição.",
      description: "Mouse Pad de Látex Retangular 19x23cm. Personalizamos com a foto, o nome, a frase ou a logo que você quiser. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "R$ 00,00",
      category: "mousepads",
      images: [
        "assets/images/produtos/mouse-pad-de-latex-retangular-19x23cm.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "MousePad",
      createdAt: "2026-10-06T10:14:00Z"
    },
    {
      id: 274,
      name: "Mouse Pad de Neoprene Redondo 20cm de Diâmetro",
      shortDescription: "Mouse pad com estampa personalizada em alta definição.",
      description: "Mouse Pad de Neoprene Redondo 20cm de Diâmetro. Personalizamos com a foto, o nome, a frase ou a logo que você quiser. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "R$ 00,00",
      category: "mousepads",
      images: [
        "assets/images/produtos/mouse-pad-de-neoprene-redondo-20cm-de-diametro.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "MousePad",
      createdAt: "2026-10-06T08:34:00Z"
    },
    {
      id: 273,
      name: "Relógio de MDF Texturizado Brilho de 3mm - Redondo 20cm",
      shortDescription: "Relógio personalizado com foto, arte ou a logo da sua empresa.",
      description: "Relógio de MDF Texturizado Brilho de 3mm - Redondo 20cm. Personalizamos com a foto, o nome, a frase ou a logo que você quiser. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "R$ 00,00",
      category: "relogios",
      images: [
        "assets/images/produtos/relogio-de-mdf-texturizado-brilho-de-3mm-redondo-20cm.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "Relógios",
      createdAt: "2026-10-06T11:53:00Z"
    },
    {
      id: 272,
      name: "Relógio de Vidro para Sublimação 20x20",
      shortDescription: "Relógio personalizado com foto, arte ou a logo da sua empresa.",
      description: "Relógio de Vidro para Sublimação 20x20. Personalizamos com a foto, o nome, a frase ou a logo que você quiser. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "R$ 00,00",
      category: "relogios",
      images: [
        "assets/images/produtos/relogio-de-vidro-para-sublimacao-20x20.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "Relógios",
      createdAt: "2026-10-06T10:13:00Z"
    },
    {
      id: 271,
      name: "Relógio de Metal Branco 20x20cm",
      shortDescription: "Relógio personalizado com foto, arte ou a logo da sua empresa.",
      description: "Relógio de Metal Branco 20x20cm. Personalizamos com a foto, o nome, a frase ou a logo que você quiser. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "R$ 00,00",
      category: "relogios",
      images: [
        "assets/images/produtos/relogio-de-metal-branco-20x20cm.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "Relógios",
      createdAt: "2026-10-06T08:33:00Z"
    },
    {
      id: 270,
      name: "Tapete de Porta para Sublimação Retangular 50x70cm",
      shortDescription: "Tapete personalizado com a estampa que você escolher.",
      description: "Tapete de Porta para Sublimação Retangular 50x70cm. Personalizamos com a foto, o nome, a frase ou a logo que você quiser. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "R$ 00,00",
      category: "tapetes",
      images: [
        "assets/images/produtos/tapete-de-porta-para-sublimacao-retangular-50x70cm.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "Tapetes",
      createdAt: "2026-10-06T11:52:00Z"
    },
    {
      id: 269,
      name: "Tapete de Porta Sublimado com Feltro 40 x 60 cm",
      shortDescription: "Tapete personalizado com a estampa que você escolher.",
      description: "Tapete de Porta Sublimado com Feltro 40 x 60 cm. Personalizamos com a foto, o nome, a frase ou a logo que você quiser. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "R$ 00,00",
      category: "tapetes",
      images: [
        "assets/images/produtos/tapete-de-porta-sublimado-com-feltro-40-x-60-cm.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "Tapetes",
      createdAt: "2026-10-06T10:12:00Z"
    },
    {
      id: 268,
      name: "Capacho de Borracha com Inlay para Sublimação",
      shortDescription: "Tapete personalizado com a estampa que você escolher.",
      description: "Capacho de Borracha com Inlay para Sublimação. Personalizamos com a foto, o nome, a frase ou a logo que você quiser. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "R$ 00,00",
      category: "tapetes",
      images: [
        "assets/images/produtos/capacho-de-borracha-com-inlay-para-sublimacao.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "Tapetes",
      createdAt: "2026-10-06T08:32:00Z"
    },
    {
      id: 267,
      name: "Troféu Acrílico Cristal 5mm - Torre 10x16,5cm",
      shortDescription: "Troféu personalizado para premiações, eventos e homenagens.",
      description: "Troféu Acrílico Cristal 5mm - Torre 10x16,5cm. Personalizamos com a foto, o nome, a frase ou a logo que você quiser. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "R$ 00,00",
      category: "trofeus",
      images: [
        "assets/images/produtos/trofeu-acrilico-cristal-5mm-torre-10x16-5cm.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "Troféus",
      createdAt: "2026-10-06T11:51:00Z"
    },
    {
      id: 266,
      name: "Troféu Acrílico Cristal 5mm - Brasão Arredondado 10x11cm",
      shortDescription: "Troféu personalizado para premiações, eventos e homenagens.",
      description: "Troféu Acrílico Cristal 5mm - Brasão Arredondado 10x11cm. Personalizamos com a foto, o nome, a frase ou a logo que você quiser. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "R$ 00,00",
      category: "trofeus",
      images: [
        "assets/images/produtos/trofeu-acrilico-cristal-5mm-brasao-arredondado-10x11cm.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "Troféus",
      createdAt: "2026-10-06T10:11:00Z"
    },
    {
      id: 265,
      name: "Troféu Acrílico Cristal 5mm - Brasão Redondo 13x12,5cm",
      shortDescription: "Troféu personalizado para premiações, eventos e homenagens.",
      description: "Troféu Acrílico Cristal 5mm - Brasão Redondo 13x12,5cm. Personalizamos com a foto, o nome, a frase ou a logo que você quiser. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "R$ 00,00",
      category: "trofeus",
      images: [
        "assets/images/produtos/trofeu-acrilico-cristal-5mm-brasao-redondo-13x12-5cm.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "Troféus",
      createdAt: "2026-10-06T08:31:00Z"
    },
    {
      id: 264,
      name: "Troféu Acrílico Cristal 5mm - Pentagonal 10x15cm",
      shortDescription: "Troféu personalizado para premiações, eventos e homenagens.",
      description: "Troféu Acrílico Cristal 5mm - Pentagonal 10x15cm. Personalizamos com a foto, o nome, a frase ou a logo que você quiser. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "R$ 00,00",
      category: "trofeus",
      images: [
        "assets/images/produtos/trofeu-acrilico-cristal-5mm-pentagonal-10x15cm.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "Troféus",
      createdAt: "2026-10-06T06:51:00Z"
    },
    {
      id: 263,
      name: "Troféu Acrílico Cristal 5mm - Brasão Reto 10x11cm",
      shortDescription: "Troféu personalizado para premiações, eventos e homenagens.",
      description: "Troféu Acrílico Cristal 5mm - Brasão Reto 10x11cm. Personalizamos com a foto, o nome, a frase ou a logo que você quiser. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "R$ 00,00",
      category: "trofeus",
      images: [
        "assets/images/produtos/trofeu-acrilico-cristal-5mm-brasao-reto-10x11cm.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "Troféus",
      createdAt: "2026-10-06T05:11:00Z"
    },
    {
      id: 262,
      name: "Bolsa Térmica de 5L para Sublimação na Cor Branca/ Azul - Tamanho 20 x 20 x 11cm",
      shortDescription: "Brinde corporativo personalizado com a logo da sua empresa.",
      description: "Bolsa Térmica de 5L para Sublimação na Cor Branca/ Azul - Tamanho 20 x 20 x 11cm. Brinde da nossa linha corporativa, personalizado com a identidade visual da sua empresa. A foto mostra um projeto real feito para o Grupo Planeta. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "",
      category: "corp-bolsas",
      images: [
        "assets/images/produtos/bolsa-termica-de-5l-para-sublimacao-na-cor-branca-azul-tamanho-20-x-20.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "Linha Corporativa (GP Planeta)",
      createdAt: "2026-10-06T11:50:00Z"
    },
    {
      id: 261,
      name: "Mochila de Poliéster com Bolso Frontal na Cor Branca - 24x40x15cm",
      shortDescription: "Brinde corporativo personalizado com a logo da sua empresa.",
      description: "Mochila de Poliéster com Bolso Frontal na Cor Branca - 24x40x15cm. Brinde da nossa linha corporativa, personalizado com a identidade visual da sua empresa. A foto mostra um projeto real feito para o Grupo Planeta. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "",
      category: "corp-bolsas",
      images: [
        "assets/images/produtos/mochila-de-poliester-com-bolso-frontal-na-cor-branca-24x40x15cm.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "Linha Corporativa (GP Planeta)",
      createdAt: "2026-10-06T10:10:00Z"
    },
    {
      id: 260,
      name: "Bolsa Térmica de 4L para Sublimação na Cor Branca - Tamanho 15 x 19 x 15cm",
      shortDescription: "Brinde corporativo personalizado com a logo da sua empresa.",
      description: "Bolsa Térmica de 4L para Sublimação na Cor Branca - Tamanho 15 x 19 x 15cm. Brinde da nossa linha corporativa, personalizado com a identidade visual da sua empresa. A foto mostra um projeto real feito para o Grupo Planeta. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "",
      category: "corp-bolsas",
      images: [
        "assets/images/produtos/bolsa-termica-de-4l-para-sublimacao-na-cor-branca-tamanho-15-x-19-x-15.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "Linha Corporativa (GP Planeta)",
      createdAt: "2026-10-06T08:30:00Z"
    },
    {
      id: 259,
      name: "Bolsa Térmica com Bolso Frontal de 8L para Sublimação na Cor Branca/ Preta - Tamanho 21 x 28 x 14,5cm",
      shortDescription: "Brinde corporativo personalizado com a logo da sua empresa.",
      description: "Bolsa Térmica com Bolso Frontal de 8L para Sublimação na Cor Branca/ Preta - Tamanho 21 x 28 x 14,5cm. Brinde da nossa linha corporativa, personalizado com a identidade visual da sua empresa. A foto mostra um projeto real feito para o Grupo Planeta. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "",
      category: "corp-bolsas",
      images: [
        "assets/images/produtos/bolsa-termica-com-bolso-frontal-de-8l-para-sublimacao-na-cor-branca-pr.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "Linha Corporativa (GP Planeta)",
      createdAt: "2026-10-06T06:50:00Z"
    },
    {
      id: 258,
      name: "Necessaire para Sublimação em Poliéster Resinado Brilho - 13x5x20cm",
      shortDescription: "Brinde corporativo personalizado com a logo da sua empresa.",
      description: "Necessaire para Sublimação em Poliéster Resinado Brilho - 13x5x20cm. Brinde da nossa linha corporativa, personalizado com a identidade visual da sua empresa. A foto mostra um projeto real feito para o Grupo Planeta. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "",
      category: "corp-bolsas",
      images: [
        "assets/images/produtos/necessaire-para-sublimacao-em-poliester-resinado-brilho-13x5x20cm.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "Linha Corporativa (GP Planeta)",
      createdAt: "2026-10-06T05:10:00Z"
    },
    {
      id: 257,
      name: "Necessaire para Sublimação em Poliéster Resinado Brilho Vertical - 16x19cm",
      shortDescription: "Brinde corporativo personalizado com a logo da sua empresa.",
      description: "Necessaire para Sublimação em Poliéster Resinado Brilho Vertical - 16x19cm. Brinde da nossa linha corporativa, personalizado com a identidade visual da sua empresa. A foto mostra um projeto real feito para o Grupo Planeta. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "",
      category: "corp-bolsas",
      images: [
        "assets/images/produtos/necessaire-para-sublimacao-em-poliester-resinado-brilho-vertical-16x19.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "Linha Corporativa (GP Planeta)",
      createdAt: "2026-10-06T03:30:00Z"
    },
    {
      id: 256,
      name: "Mini Caderno em Papel Cartão Craft para Sublimação com Folhas Adesivas Coloridas (7,5x7cm)",
      shortDescription: "Brinde corporativo personalizado com a logo da sua empresa.",
      description: "Mini Caderno em Papel Cartão Craft para Sublimação com Folhas Adesivas Coloridas (7,5x7cm). Brinde da nossa linha corporativa, personalizado com a identidade visual da sua empresa. A foto mostra um projeto real feito para o Grupo Planeta. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "",
      category: "corp-cadernos",
      images: [
        "assets/images/produtos/mini-caderno-em-papel-cartao-craft-para-sublimacao-com-folhas-adesivas.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "Linha Corporativa (GP Planeta)",
      createdAt: "2026-10-06T11:49:00Z"
    },
    {
      id: 255,
      name: "Caderno para A6 80 folhas lisas Capa dura Azul Escuro - 12x17cm (DTF-UV)",
      shortDescription: "Brinde corporativo personalizado com a logo da sua empresa.",
      description: "Caderno para A6 80 folhas lisas Capa dura Azul Escuro - 12x17cm (DTF-UV). Brinde da nossa linha corporativa, personalizado com a identidade visual da sua empresa. A foto mostra um projeto real feito para o Grupo Planeta. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "",
      category: "corp-cadernos",
      images: [
        "assets/images/produtos/caderno-para-a6-80-folhas-lisas-capa-dura-azul-escuro-12x17cm-dtf-uv.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "Linha Corporativa (GP Planeta)",
      createdAt: "2026-10-06T10:09:00Z"
    },
    {
      id: 254,
      name: "Caderno Capa Dura de Tecido na cor Azul Mescla com 192 Páginas Pautadas - 14x21cm",
      shortDescription: "Brinde corporativo personalizado com a logo da sua empresa.",
      description: "Caderno Capa Dura de Tecido na cor Azul Mescla com 192 Páginas Pautadas - 14x21cm. Brinde da nossa linha corporativa, personalizado com a identidade visual da sua empresa. A foto mostra um projeto real feito para o Grupo Planeta. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "",
      category: "corp-cadernos",
      images: [
        "assets/images/produtos/caderno-capa-dura-de-tecido-na-cor-azul-mescla-com-192-paginas-pautada.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "Linha Corporativa (GP Planeta)",
      createdAt: "2026-10-06T08:29:00Z"
    },
    {
      id: 253,
      name: "Copo Térmico para Sublimação Aço Inox Fosco com Canudo na Cor Rosa - 1,5 Lts",
      shortDescription: "Brinde corporativo personalizado com a logo da sua empresa.",
      description: "Copo Térmico para Sublimação Aço Inox Fosco com Canudo na Cor Rosa - 1,5 Lts. Brinde da nossa linha corporativa, personalizado com a identidade visual da sua empresa. A foto mostra um projeto real feito para o Grupo Planeta. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "",
      category: "corp-copos",
      images: [
        "assets/images/produtos/copo-termico-para-sublimacao-aco-inox-fosco-com-canudo-na-cor-rosa-1-5.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "Linha Corporativa (GP Planeta)",
      createdAt: "2026-10-06T11:48:00Z"
    },
    {
      id: 252,
      name: "Copo de Vidro Jateado para Sublimação com Tampa de Acrílico e Canudo de Vidro - 400ml",
      shortDescription: "Brinde corporativo personalizado com a logo da sua empresa.",
      description: "Copo de Vidro Jateado para Sublimação com Tampa de Acrílico e Canudo de Vidro - 400ml. Brinde da nossa linha corporativa, personalizado com a identidade visual da sua empresa. A foto mostra um projeto real feito para o Grupo Planeta. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "",
      category: "corp-copos",
      images: [
        "assets/images/produtos/copo-de-vidro-jateado-para-sublimacao-com-tampa-de-acrilico-e-canudo-d.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "Linha Corporativa (GP Planeta)",
      createdAt: "2026-10-06T10:08:00Z"
    },
    {
      id: 251,
      name: "Copo Térmico para DTF-UV Aço Inox Preto Fosco com Tampa em Acrílico e Canudo - 600ml",
      shortDescription: "Brinde corporativo personalizado com a logo da sua empresa.",
      description: "Copo Térmico para DTF-UV Aço Inox Preto Fosco com Tampa em Acrílico e Canudo - 600ml. Brinde da nossa linha corporativa, personalizado com a identidade visual da sua empresa. A foto mostra um projeto real feito para o Grupo Planeta. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "",
      category: "corp-copos",
      images: [
        "assets/images/produtos/copo-termico-para-dtf-uv-aco-inox-preto-fosco-com-tampa-em-acrilico-e-.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "Linha Corporativa (GP Planeta)",
      createdAt: "2026-10-06T08:28:00Z"
    },
    {
      id: 250,
      name: "Saquinho de Chinelo Adulto para Sublimação em Tecido Poliéster",
      shortDescription: "Brinde corporativo personalizado com a logo da sua empresa.",
      description: "Saquinho de Chinelo Adulto para Sublimação em Tecido Poliéster. Brinde da nossa linha corporativa, personalizado com a identidade visual da sua empresa. A foto mostra um projeto real feito para o Grupo Planeta. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "",
      category: "corp-vestuario",
      images: [
        "assets/images/produtos/saquinho-de-chinelo-adulto-para-sublimacao-em-tecido-poliester.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "Linha Corporativa (GP Planeta)",
      createdAt: "2026-10-06T11:47:00Z"
    },
    {
      id: 249,
      name: "Boné de Tela com a Frente Branca para Sublimação - Cinza",
      shortDescription: "Brinde corporativo personalizado com a logo da sua empresa.",
      description: "Boné de Tela com a Frente Branca para Sublimação - Cinza. Brinde da nossa linha corporativa, personalizado com a identidade visual da sua empresa. A foto mostra um projeto real feito para o Grupo Planeta. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "",
      category: "corp-vestuario",
      images: [
        "assets/images/produtos/bone-de-tela-com-a-frente-branca-para-sublimacao-cinza.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "Linha Corporativa (GP Planeta)",
      createdAt: "2026-10-06T10:07:00Z"
    },
    {
      id: 248,
      name: "Chinelo Slide para Sublimação Preto",
      shortDescription: "Brinde corporativo personalizado com a logo da sua empresa.",
      description: "Chinelo Slide para Sublimação Preto. Brinde da nossa linha corporativa, personalizado com a identidade visual da sua empresa. A foto mostra um projeto real feito para o Grupo Planeta. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "",
      category: "corp-vestuario",
      images: [
        "assets/images/produtos/chinelo-slide-para-sublimacao-preto.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "Linha Corporativa (GP Planeta)",
      createdAt: "2026-10-06T08:27:00Z"
    },
    {
      id: 247,
      name: "Toalha Fitness na Garrafa com Mosquetão nas Medidas 30 x 80 cm - Cores",
      shortDescription: "Brinde corporativo personalizado com a logo da sua empresa.",
      description: "Toalha Fitness na Garrafa com Mosquetão nas Medidas 30 x 80 cm - Cores. Brinde da nossa linha corporativa, personalizado com a identidade visual da sua empresa. A foto mostra um projeto real feito para o Grupo Planeta. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "",
      category: "corp-vestuario",
      images: [
        "assets/images/produtos/toalha-fitness-na-garrafa-com-mosquetao-nas-medidas-30-x-80-cm-cores.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "Linha Corporativa (GP Planeta)",
      createdAt: "2026-10-06T06:47:00Z"
    },
    {
      id: 246,
      name: "Mouse Pad de Borracha Retangular 20x24cm",
      shortDescription: "Brinde corporativo personalizado com a logo da sua empresa.",
      description: "Mouse Pad de Borracha Retangular 20x24cm. Brinde da nossa linha corporativa, personalizado com a identidade visual da sua empresa. A foto mostra um projeto real feito para o Grupo Planeta. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "",
      category: "corp-escritorio",
      images: [
        "assets/images/produtos/mouse-pad-de-borracha-retangular-20x24cm.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "Linha Corporativa (GP Planeta)",
      createdAt: "2026-10-06T11:46:00Z"
    },
    {
      id: 245,
      name: "Porta chaves de MDF com Tecido Brilho de 6mm - 14x19cm",
      shortDescription: "Brinde corporativo personalizado com a logo da sua empresa.",
      description: "Porta chaves de MDF com Tecido Brilho de 6mm - 14x19cm. Brinde da nossa linha corporativa, personalizado com a identidade visual da sua empresa. A foto mostra um projeto real feito para o Grupo Planeta. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "",
      category: "corp-escritorio",
      images: [
        "assets/images/produtos/porta-chaves-de-mdf-com-tecido-brilho-de-6mm-14x19cm.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "Linha Corporativa (GP Planeta)",
      createdAt: "2026-10-06T10:06:00Z"
    },
    {
      id: 244,
      name: "Relógio de Azulejo em Cerâmica Branca para Sublimação 15x15cm",
      shortDescription: "Brinde corporativo personalizado com a logo da sua empresa.",
      description: "Relógio de Azulejo em Cerâmica Branca para Sublimação 15x15cm. Brinde da nossa linha corporativa, personalizado com a identidade visual da sua empresa. A foto mostra um projeto real feito para o Grupo Planeta. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "",
      category: "corp-escritorio",
      images: [
        "assets/images/produtos/relogio-de-azulejo-em-ceramica-branca-para-sublimacao-15x15cm.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "Linha Corporativa (GP Planeta)",
      createdAt: "2026-10-06T08:26:00Z"
    },
    {
      id: 243,
      name: "Relógio de MDF Texturizado Brilho de 3mm - Redondo 20cm",
      shortDescription: "Brinde corporativo personalizado com a logo da sua empresa.",
      description: "Relógio de MDF Texturizado Brilho de 3mm - Redondo 20cm. Brinde da nossa linha corporativa, personalizado com a identidade visual da sua empresa. A foto mostra um projeto real feito para o Grupo Planeta. Nossa equipe cria o layout e envia uma prévia para sua aprovação antes da produção.",
      price: "",
      category: "corp-escritorio",
      images: [
        "assets/images/produtos/relogio-de-mdf-texturizado-brilho-de-3mm-redondo-20cm-2.jpg"
      ],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5515991594021",
      catalogo: "Linha Corporativa (GP Planeta)",
      createdAt: "2026-10-06T06:46:00Z"
    },
    {
      id: 400,
      name: "Moletom Romantize Your Life",
      shortDescription: "Moletom rosa com a arte \"Romantize your life\" nas costas.",
      description: "Moletom rosa com estampa nas costas: uma janela com duas xícaras de café e a frase \"a vida fica mais bonita quando você descobre\". Para quem gosta de transformar os pequenos momentos em lembranças. Tamanhos e cores disponíveis sob consulta.",
      price: "R$ 00,00",
      category: "moletons",
      images: [
        "assets/images/produtos/lunna-mood/moletom-romantize-your-life.jpg",
        "assets/images/produtos/lunna-mood/moletons-romantize-e-offline-casal.jpg"
      ],
      customizable: false,
      featured: false,
      isNew: true,
      whatsappNumber: "5515991594021",
      catalogo: "Instagram @mood.lunna",
      createdAt: "2026-10-06T13:10:00Z"
    },
    {
      id: 399,
      name: "Moletom Offline",
      shortDescription: "Moletom preto com a arte \"offline — desconectar também é autocuidado\".",
      description: "Moletom preto com estampa de fone de ouvido e a frase \"desconectar também é autocuidado\". Um lembrete para desacelerar e aproveitar as pausas. Tamanhos e cores disponíveis sob consulta.",
      price: "R$ 00,00",
      category: "moletons",
      images: [
        "assets/images/produtos/lunna-mood/moletom-offline.jpg",
        "assets/images/produtos/lunna-mood/moletons-romantize-e-offline-casal.jpg"
      ],
      customizable: false,
      featured: false,
      isNew: true,
      whatsappNumber: "5515991594021",
      catalogo: "Instagram @mood.lunna",
      createdAt: "2026-10-06T13:09:00Z"
    },
    {
      id: 398,
      name: "Moletom Coisas Extraordinárias",
      shortDescription: "Moletom bege com a frase \"Coisas extraordinárias também acontecem em dias comuns\".",
      description: "Moletom bege com ilustração de montanhas e a frase \"Coisas extraordinárias também acontecem em dias comuns\" nas costas. Tamanhos e cores disponíveis sob consulta.",
      price: "R$ 00,00",
      category: "moletons",
      images: [
        "assets/images/produtos/lunna-mood/moletom-coisas-extraordinarias.jpg"
      ],
      customizable: false,
      featured: false,
      isNew: true,
      whatsappNumber: "5515991594021",
      catalogo: "Instagram @mood.lunna",
      createdAt: "2026-10-06T13:08:00Z"
    },
    {
      id: 397,
      name: "Moletom Follow Your Dreams",
      shortDescription: "Moletom amarelo \"follow your dreams\" com a arte \"dream. plan. do. repeat\".",
      description: "Moletom amarelo com a frase \"follow your dreams\" na frente e, nas costas, a ilustração de uma garota olhando a lua com a frase \"dream. plan. do. repeat\". Tamanhos e cores disponíveis sob consulta.",
      price: "R$ 00,00",
      category: "moletons",
      images: [
        "assets/images/produtos/lunna-mood/moletom-follow-your-dreams.jpg"
      ],
      customizable: false,
      featured: false,
      isNew: true,
      whatsappNumber: "5515991594021",
      catalogo: "Instagram @mood.lunna",
      createdAt: "2026-10-06T13:07:00Z"
    },
    {
      id: 396,
      name: "Moletom Kids Os Sonhos Também Usam Chuteiras",
      shortDescription: "Moletom infantil preto da linha Lunna Mood Kids.",
      description: "Moletom infantil preto da linha Lunna Mood Kids, com chuteiras desenhadas e a frase \"Os sonhos também usam chuteiras.\" Para vestir quem joga com o coração. Tamanhos e cores disponíveis sob consulta.",
      price: "R$ 00,00",
      category: "moletons",
      images: [
        "assets/images/produtos/lunna-mood/moletom-os-sonhos-tambem-usam-chuteiras.jpg"
      ],
      customizable: false,
      featured: false,
      isNew: true,
      whatsappNumber: "5515991594021",
      catalogo: "Instagram @mood.lunna",
      createdAt: "2026-10-06T13:06:00Z"
    }
  ];

  // Imagens locais são cadastradas a partir da raiz do site; nas páginas
  // dentro de /pages/ o caminho precisa subir dois níveis.
  const BASE_IMAGENS = window.location.pathname.indexOf('/pages/') !== -1 ? '../../' : '';
  function resolverImagens(lista) {
    lista.forEach(function (p) {
      p.images = (p.images || []).map(function (src) {
        return /^(https?:|data:|\/|\.\.\/)/.test(src) ? src : BASE_IMAGENS + src;
      });
    });
  }

  // Função para ordenar produtos em ordem decrescente (mais novos primeiro)
  function sortProductsDescending(products) {
    return [...products].sort((a, b) => {
      // Mais recentes primeiro; sem createdAt, usa ID maior como critério
      if (a.createdAt && b.createdAt) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return b.id - a.id;
    });
  }

  const todosProdutosCombinados = [...catalogoLinktree, ...novidadesProdutos, ...outrosProdutos];
  resolverImagens(todosProdutosCombinados);
  const todosProdutos = sortProductsDescending(todosProdutosCombinados);

  window.novidadesProdutos = sortProductsDescending(novidadesProdutos);
  window.todosProdutos = todosProdutos;

  window.filterProducts = function(category, searchTerm = '') {
    let filtered = [...(window.todosProdutos || [])];
    
    if (category && category !== 'all') {
      filtered = filtered.filter(p => p.category === category);
    }
    
    if (searchTerm && searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(term) || 
        p.shortDescription.toLowerCase().includes(term)
      );
    }
    
    return sortProductsDescending(filtered);
  };

  // Preço exibido: produtos sem valor cadastrado mostram "Sob consulta"
  window.temPreco = function(p) { return !!(p && p.price && String(p.price).trim()); };
  window.textoPreco = function(p) { return window.temPreco(p) ? p.price : 'Sob consulta'; };

  window.getProductsSorted = function() {
    return sortProductsDescending(window.todosProdutos || []);
  };

  window.getNewProducts = function() {
    return sortProductsDescending(window.novidadesProdutos || []);
  };
})();
