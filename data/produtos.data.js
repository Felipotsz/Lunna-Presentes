// data/produtos.data.js
// TODOS OS PRODUTOS DA LOJA (inclui novidades + outros)

(function() {
  'use strict';

  // PRODUTOS EM DESTAQUE (Novidades)
  const novidadesProdutos = [
    {
      id: 8,
      name: "Camisa Matching Couple",
      shortDescription: "Camisa combinando para casal",
      description: "Par de camisas com estampas combinando. Uma para cada um do casal.",
      price: "R$ 129,90",
      category: "camisas",
      images: ["https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&q=80"],
      customizable: true,
      featured: false,
      isNew: true,
      whatsappNumber: "5511999999999",
      createdAt: "2024-12-01T10:00:00Z"
    },
    {
      id: 7,
      name: "Caneca Melhor Amiga",
      shortDescription: "Caneca para amiga especial",
      description: "Caneca personalizada com frase para melhor amiga. Presente ideal para datas especiais.",
      price: "R$ 39,90",
      category: "canecas",
      images: ["https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&q=80"],
      customizable: true,
      featured: false,
      isNew: true,
      whatsappNumber: "5511999999999",
      createdAt: "2024-11-28T10:00:00Z"
    },
    {
      id: 6,
      name: "Quadro Decorativo Casal",
      shortDescription: "Quadro com moldura e foto",
      description: "Quadro decorativo tamanho A4 com moldura e foto do casal. Personalização completa.",
      price: "R$ 79,90",
      category: "personalizados",
      images: ["https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&q=80"],
      customizable: true,
      featured: false,
      isNew: true,
      whatsappNumber: "5511999999999",
      createdAt: "2024-11-25T10:00:00Z"
    },
    {
      id: 5,
      name: "Almofada Personalizada",
      shortDescription: "Almofada com foto e frase",
      description: "Almofada 40x40cm com estampa personalizada. Ideal para decoração ou presente.",
      price: "R$ 59,90",
      category: "personalizados",
      images: ["https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400&q=80"],
      customizable: true,
      featured: false,
      isNew: true,
      whatsappNumber: "5511999999999",
      createdAt: "2024-11-20T10:00:00Z"
    },
    {
      id: 4,
      name: "Kit Personalizado Aniversário",
      shortDescription: "Kit completo com balões e faixa",
      description: "Kit de aniversário personalizado com faixa, balões e topper para bolo. Tema livre.",
      price: "R$ 89,90",
      category: "personalizados",
      images: ["https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&q=80"],
      customizable: true,
      featured: true,
      isNew: true,
      whatsappNumber: "5511999999999",
      createdAt: "2024-11-15T10:00:00Z"
    },
    {
      id: 3,
      name: "Cesta Romântica Premium",
      shortDescription: "Cesta completa para casal",
      description: "Cesta romântica com vinhos, chocolates, flores e cartão personalizado. Embalagem luxo.",
      price: "R$ 199,90",
      category: "cestas",
      images: ["https://images.unsplash.com/photo-1536590158209-e9d615d525e4?w=400&q=80"],
      customizable: true,
      featured: true,
      isNew: true,
      whatsappNumber: "5511999999999",
      createdAt: "2024-11-10T10:00:00Z"
    },
    {
      id: 2,
      name: "Camisa Personalizada Família",
      shortDescription: "Camisa unissex com estampa personalizada",
      description: "Camisa 100% algodão com estampa personalizada. Perfeita para reuniões familiares, viagens ou presentear quem você ama.",
      price: "R$ 69,90",
      category: "camisas",
      images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80"],
      customizable: true,
      featured: true,
      isNew: true,
      whatsappNumber: "5511999999999",
      createdAt: "2024-11-05T10:00:00Z"
    },
    {
      id: 1,
      name: "Caneca Personalizada Casal",
      shortDescription: "Caneca térmica com foto e nome",
      description: "Caneca térmica personalizada com foto do casal e nome. Ideal para presentear em datas especiais como aniversário de namoro, casamento ou dia dos namorados.",
      price: "R$ 49,90",
      category: "canecas",
      images: ["https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=400&q=80"],
      customizable: true,
      featured: true,
      isNew: true,
      whatsappNumber: "5511999999999",
      createdAt: "2024-11-01T10:00:00Z"
    }
  ];

  // Produtos adicionais que NÃO são novidades
  const outrosProdutos = [
    {
      id: 13,
      name: "Caneca Papai Noel",
      shortDescription: "Caneca temática de Natal",
      description: "Caneca especial de Natal com design exclusivo. Ótima para lembrancinhas de fim de ano.",
      price: "R$ 44,90",
      category: "canecas",
      images: ["https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&q=80"],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5511999999999",
      createdAt: "2024-12-05T10:00:00Z"
    },
    {
      id: 12,
      name: "Camisa Time do Coração",
      shortDescription: "Camisa personalizada com nome e número",
      description: "Camisa oficial réplica com personalização de nome e número. Perfeita para torcedores.",
      price: "R$ 89,90",
      category: "camisas",
      images: ["https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&q=80"],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5511999999999",
      createdAt: "2024-12-03T10:00:00Z"
    },
    {
      id: 11,
      name: "Cesta Café da Manhã",
      shortDescription: "Cesta completa para começar o dia bem",
      description: "Cesta com pães artesanais, geleias, sucos, frutas e cartão personalizado.",
      price: "R$ 129,90",
      category: "cestas",
      images: ["https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&q=80"],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5511999999999",
      createdAt: "2024-11-30T10:00:00Z"
    },
    {
      id: 10,
      name: "Caneca Casal Corações",
      shortDescription: "Par de canecas com corações combinando",
      description: "Par de canecas com design combinando. Uma para cada um do casal. Inclui caixa presente.",
      price: "R$ 69,90",
      category: "canecas",
      images: ["https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&q=80"],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5511999999999",
      createdAt: "2024-11-27T10:00:00Z"
    },
    {
      id: 9,
      name: "Camisa Básica Personalizada",
      shortDescription: "Camisa simples com seu design exclusivo",
      description: "Camisa básica de alta qualidade pronta para receber sua arte personalizada. Ideal para equipes, eventos ou uso diário.",
      price: "R$ 59,90",
      category: "camisas",
      images: ["https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&q=80"],
      customizable: true,
      featured: false,
      isNew: false,
      whatsappNumber: "5511999999999",
      createdAt: "2024-11-22T10:00:00Z"
    }
  ];
  
  // Função para ordenar produtos em ordem decrescente (mais novos primeiro)
  function sortProductsDescending(products) {
    return [...products].sort((a, b) => {
      // Primeiro tenta ordenar por createdAt (data mais recente primeiro)
      if (a.createdAt && b.createdAt) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      // Se não tiver createdAt, ordena por ID (maior ID primeiro = mais novo)
      return b.id - a.id;
    });
  }
  
  // Combinar todos os produtos
  const todosProdutosCombinados = [
    ...novidadesProdutos,
    ...outrosProdutos
  ];
  
  // Ordenar em ordem decrescente
  const todosProdutos = sortProductsDescending(todosProdutosCombinados);

  // Exportar para uso global
  window.novidadesProdutos = sortProductsDescending(novidadesProdutos);
  window.todosProdutos = todosProdutos;
  
  // Função auxiliar para filtrar produtos (mantém a ordenação)
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
    
    // Mantém a ordenação decrescente mesmo após filtrar
    return sortProductsDescending(filtered);
  };
  
  // Função para pegar produtos ordenados
  window.getProductsSorted = function() {
    return sortProductsDescending(window.todosProdutos || []);
  };
  
  // Função para pegar novidades (já ordenadas)
  window.getNewProducts = function() {
    return sortProductsDescending(window.novidadesProdutos || []);
  };
  
  console.log(`📦 Total de produtos carregados: ${todosProdutos.length}`);
  console.log(`   - Novidades: ${novidadesProdutos.length}`);
  console.log(`   - Outros: ${outrosProdutos.length}`);
  console.log(`📊 Produtos ordenados em ordem decrescente (mais novos primeiro)`);
})();