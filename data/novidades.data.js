// data/novidades.data.js
// ARRAY ESPECÍFICO PARA PRODUTOS EM DESTAQUE (CARROSSEL)

(function() {
  'use strict';

  const novidadesProdutos = [
    {
      id: 1,
      name: "Caneca Personalizada Casal",
      shortDescription: "Caneca térmica com frase personalizada para casais",
      description: "Caneca térmica de porcelana com impressão de alta qualidade. Ideal para presentear em datas especiais como aniversário de namoro, casamento ou Dia dos Namorados.",
      price: "R$ 39,90",
      category: "canecas",
      images: ["https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&q=80"],
      customizable: true,
      featured: true,
      whatsappNumber: "5511999999999"
    },
    {
      id: 2,
      name: "Camisa Estampa Exclusiva",
      shortDescription: "Camisa 100% algodão com estampa personalizada",
      description: "Camisa confeccionada em algodão premium, com estampa exclusiva de alta durabilidade e resistência à lavagem.",
      price: "R$ 69,90",
      category: "camisas",
      images: ["https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&q=80"],
      customizable: true,
      featured: true,
      whatsappNumber: "5511999999999"
    },
    {
      id: 3,
      name: "Cesta Romântica Deluxe",
      shortDescription: "Cesta completa para momentos especiais",
      description: "Cesta luxuosa com vinho importado, chocolates belgas, flores frescas e cartão personalizado com mensagem.",
      price: "R$ 159,90",
      category: "cestas",
      images: ["https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&q=80"],
      customizable: true,
      featured: true,
      whatsappNumber: "5511999999999"
    },
    {
      id: 4,
      name: "Kit Personalizado Corporativo",
      shortDescription: "Kit completo para brindes empresariais",
      description: "Kit com caneca térmica, caderno e caneta personalizados com sua logo. Perfeito para eventos e clientes especiais.",
      price: "R$ 89,90",
      category: "personalizados",
      images: ["https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=400&q=80"],
      customizable: true,
      featured: true,
      whatsappNumber: "5511999999999"
    },
    {
      id: 5,
      name: "Mochila Infantil Unicórnio",
      shortDescription: "Mochila personalizada com nome e unicórnio",
      description: "Mochila infantil super fofa com estampa de unicórnio e nome da criança. Perfeita para escola e passeios.",
      price: "R$ 79,90",
      category: "personalizados",
      images: ["https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=400&q=80"],
      customizable: true,
      featured: true,
      whatsappNumber: "5511999999999"
    },
    {
      id: 6,
      name: "Caneca Melhor Amiga",
      shortDescription: "Caneca exclusiva para amizades verdadeiras",
      description: "Caneca com frase 'Melhor Amiga' e detalhes em glitter. Ideal para presentear quem está sempre ao seu lado.",
      price: "R$ 34,90",
      category: "canecas",
      images: ["https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&q=80"],
      customizable: true,
      featured: true,
      whatsappNumber: "5511999999999"
    },
    {
      id: 7,
      name: "Almofada Personalizada",
      shortDescription: "Almofada com foto e frase romântica",
      description: "Almofada macia 40x40cm com estampa personalizada. Escolha a foto e frase que mais combinam com o presente.",
      price: "R$ 59,90",
      category: "personalizados",
      images: ["https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400&q=80"],
      customizable: true,
      featured: true,
      whatsappNumber: "5511999999999"
    },
    {
      id: 8,
      name: "Kit Caneca + Café Especial",
      shortDescription: "Kit completo para amantes de café",
      description: "Caneca personalizada + café especial gourmet + biscoitos artesanais. O presente perfeito para quem ama café.",
      price: "R$ 79,90",
      category: "cestas",
      images: ["https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&q=80"],
      customizable: true,
      featured: true,
      whatsappNumber: "5511999999999"
    }
  ];

  // Exportar para uso global
  window.novidadesProdutos = novidadesProdutos;
  
  console.log(`✨ Novidades carregadas: ${novidadesProdutos.length} produtos`);
})();