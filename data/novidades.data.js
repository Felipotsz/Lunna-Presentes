// data/novidades.data.js
// ARRAY ESPECÍFICO PARA PRODUTOS EM DESTAQUE (CARROSSEL)
//
// Observação: window.novidadesProdutos definido aqui é sobrescrito
// pelo array equivalente em data/produtos.data.js (carregado depois).
// Mantido como "produtos exemplo" genéricos por consistência, caso a
// ordem de carregamento dos scripts mude no futuro.

(function() {
  'use strict';

  const novidadesProdutos = [
    {
      id: 1,
      name: "Produto Exemplo",
      shortDescription: "Descrição breve do produto exemplo",
      description: "Descrição completa do produto exemplo. Substitua por informações reais do item ao cadastrar seus produtos.",
      price: "R$ 39,90",
      category: "canecas",
      images: [],
      customizable: true,
      featured: true,
      whatsappNumber: "5511999999999"
    },
    {
      id: 2,
      name: "Produto Exemplo",
      shortDescription: "Descrição breve do produto exemplo",
      description: "Descrição completa do produto exemplo. Substitua por informações reais do item ao cadastrar seus produtos.",
      price: "R$ 69,90",
      category: "camisas",
      images: [],
      customizable: true,
      featured: true,
      whatsappNumber: "5511999999999"
    },
    {
      id: 3,
      name: "Produto Exemplo",
      shortDescription: "Descrição breve do produto exemplo",
      description: "Descrição completa do produto exemplo. Substitua por informações reais do item ao cadastrar seus produtos.",
      price: "R$ 159,90",
      category: "cestas",
      images: [],
      customizable: true,
      featured: true,
      whatsappNumber: "5511999999999"
    },
    {
      id: 4,
      name: "Produto Exemplo",
      shortDescription: "Descrição breve do produto exemplo",
      description: "Descrição completa do produto exemplo. Substitua por informações reais do item ao cadastrar seus produtos.",
      price: "R$ 89,90",
      category: "personalizados",
      images: [],
      customizable: true,
      featured: true,
      whatsappNumber: "5511999999999"
    },
    {
      id: 5,
      name: "Produto Exemplo",
      shortDescription: "Descrição breve do produto exemplo",
      description: "Descrição completa do produto exemplo. Substitua por informações reais do item ao cadastrar seus produtos.",
      price: "R$ 79,90",
      category: "personalizados",
      images: [],
      customizable: true,
      featured: true,
      whatsappNumber: "5511999999999"
    },
    {
      id: 6,
      name: "Produto Exemplo",
      shortDescription: "Descrição breve do produto exemplo",
      description: "Descrição completa do produto exemplo. Substitua por informações reais do item ao cadastrar seus produtos.",
      price: "R$ 34,90",
      category: "canecas",
      images: [],
      customizable: true,
      featured: true,
      whatsappNumber: "5511999999999"
    },
    {
      id: 7,
      name: "Produto Exemplo",
      shortDescription: "Descrição breve do produto exemplo",
      description: "Descrição completa do produto exemplo. Substitua por informações reais do item ao cadastrar seus produtos.",
      price: "R$ 59,90",
      category: "personalizados",
      images: [],
      customizable: true,
      featured: true,
      whatsappNumber: "5511999999999"
    },
    {
      id: 8,
      name: "Produto Exemplo",
      shortDescription: "Descrição breve do produto exemplo",
      description: "Descrição completa do produto exemplo. Substitua por informações reais do item ao cadastrar seus produtos.",
      price: "R$ 79,90",
      category: "cestas",
      images: [],
      customizable: true,
      featured: true,
      whatsappNumber: "5511999999999"
    }
  ];

  // Exportar para uso global
  window.novidadesProdutos = novidadesProdutos;
  
})();
