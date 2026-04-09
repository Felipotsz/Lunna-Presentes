// data/comentarios.data.js
// DEPOIMENTOS DE CLIENTES (ARRAY COM AVALIAÇÕES REAIS)
// ORDEM DECRESCENTE: do mais recente para o mais antigo

(function() {
  'use strict';

  const depoimentos = [
    {
      id: 11,
      nome: "Isabela Castro",
      foto: null,
      cidade: "São Paulo - SP",
      data: "2024-02-18",
      rating: 5,
      titulo: "Fidelizada!",
      comentario: "Já perdi as contas de quantos presentes já comprei aqui. Sempre entrego no prazo e com qualidade. É minha loja favorita para presentes personalizados!",
      produtoComprado: "Caneca Personalizada Casal",
      dataCompra: "2024-02-14",
      verificado: true,
      destaque: true
    },
    {
      id: 1,
      nome: "Mariana Silva",
      foto: null,
      cidade: "São Paulo - SP",
      data: "2024-02-15",
      rating: 5,
      titulo: "Presente perfeito!",
      comentario: "Comprei uma caneca personalizada para minha mãe e ela amou! O acabamento é impecável e a entrega foi super rápida. Recomendo demais!",
      produtoComprado: "Caneca Personalizada Casal",
      dataCompra: "2024-02-10",
      verificado: true,
      destaque: true
    },
    {
      id: 12,
      nome: "Luciana Pereira",
      foto: null,
      cidade: "Campinas - SP",
      data: "2024-02-12",
      rating: 5,
      titulo: "Surpresa incrível",
      comentario: "Encomendei a cesta de café da manhã para minha irmã que mora em outra cidade. Ela recebeu e me ligou chorando de emoção. Obrigada por fazer parte desse momento!",
      produtoComprado: "Cesta Café da Manhã",
      dataCompra: "2024-02-08",
      verificado: true,
      destaque: false
    },
    {
      id: 2,
      nome: "Fernanda Costa",
      foto: null,
      cidade: "Rio de Janeiro - RJ",
      data: "2024-02-10",
      rating: 5,
      titulo: "Atendimento maravilhoso!",
      comentario: "Encomendei uma cesta de café da manhã para o dia dos namorados. Além de linda, veio com um cartão personalizado. Meu namorado adorou!",
      produtoComprado: "Cesta Romântica Deluxe",
      dataCompra: "2024-02-05",
      verificado: true,
      destaque: true
    },
    {
      id: 3,
      nome: "Rafael Oliveira",
      foto: null,
      cidade: "Belo Horizonte - MG",
      data: "2024-02-05",
      rating: 5,
      titulo: "Qualidade excepcional",
      comentario: "Atendimento maravilhoso! Tirei todas as minhas dúvidas pelo WhatsApp e o produto chegou antes do prazo. Já virei cliente fiel.",
      produtoComprado: "Camisa Estampa Exclusiva",
      dataCompra: "2024-01-28",
      verificado: true,
      destaque: true
    },
    {
      id: 4,
      nome: "Patrícia Santos",
      foto: null,
      cidade: "Curitiba - PR",
      data: "2024-01-28",
      rating: 5,
      titulo: "Encantada com o produto",
      comentario: "Comprei a mochila infantil de unicórnio para minha sobrinha e ela ficou apaixonada! A qualidade é excelente e a personalização ficou linda.",
      produtoComprado: "Mochila Infantil Unicórnio",
      dataCompra: "2024-01-20",
      verificado: true,
      destaque: false
    },
    {
      id: 5,
      nome: "Carlos Mendes",
      foto: null,
      cidade: "Porto Alegre - RS",
      data: "2024-01-20",
      rating: 4,
      titulo: "Ótimo custo-benefício",
      comentario: "Produto de qualidade, entrega rápida. Só não dei 5 estrelas porque o prazo de produção poderia ser um pouco menor, mas no geral foi excelente!",
      produtoComprado: "Kit Caneca + Café Especial",
      dataCompra: "2024-01-15",
      verificado: true,
      destaque: false
    },
    {
      id: 6,
      nome: "Amanda Lima",
      foto: null,
      cidade: "Brasília - DF",
      data: "2024-01-15",
      rating: 5,
      titulo: "Super recomendo!",
      comentario: "Já é a terceira vez que compro com a Lunna Presentes. Sempre recebo elogios de quem presenteio. Capricho nos detalhes é impressionante!",
      produtoComprado: "Almofada Personalizada",
      dataCompra: "2024-01-10",
      verificado: true,
      destaque: false
    },
    {
      id: 7,
      nome: "Juliana Ferreira",
      foto: null,
      cidade: "Salvador - BA",
      data: "2024-01-10",
      rating: 5,
      titulo: "Presente único!",
      comentario: "A camisa personalizada que encomendei para meu pai ficou perfeita! Ele usou no aniversário e todo mundo elogiou. Muito obrigada!",
      produtoComprado: "Camisa Básica Personalizada",
      dataCompra: "2024-01-05",
      verificado: true,
      destaque: false
    },
    {
      id: 8,
      nome: "Thiago Rodrigues",
      foto: null,
      cidade: "Recife - PE",
      data: "2024-01-05",
      rating: 5,
      titulo: "Atendimento nota 10",
      comentario: "Precisei de um presente corporativo com urgência e a equipe me atendeu super bem. Fizeram tudo dentro do prazo e com qualidade. Parabéns!",
      produtoComprado: "Kit Personalizado Corporativo",
      dataCompra: "2024-01-02",
      verificado: true,
      destaque: false
    },
    {
      id: 9,
      nome: "Letícia Gomes",
      foto: null,
      cidade: "Fortaleza - CE",
      data: "2023-12-28",
      rating: 5,
      titulo: "Embalagem linda!",
      comentario: "Além do produto ser maravilhoso, a embalagem para presente é um capricho à parte. A pessoa que recebeu ficou emocionada!",
      produtoComprado: "Caneca Melhor Amiga",
      dataCompra: "2023-12-20",
      verificado: true,
      destaque: false
    },
    {
      id: 10,
      nome: "Ricardo Alves",
      foto: null,
      cidade: "Manaus - AM",
      data: "2023-12-20",
      rating: 4,
      titulo: "Bom produto",
      comentario: "A caneca é bonita e a estampa é de qualidade. Só demorou um pouco mais do que o esperado, mas valeu a pena.",
      produtoComprado: "Caneca Casal Corações",
      dataCompra: "2023-12-10",
      verificado: true,
      destaque: false
    }
  ];

  /**
   * Ordena os depoimentos por data (decrescente - do mais recente para o mais antigo)
   * @param {Array} array - Array de depoimentos
   * @returns {Array} Array ordenado
   */
  function ordenarPorDataDecrescente(array) {
    return [...array].sort((a, b) => new Date(b.data) - new Date(a.data));
  }

  /**
   * Ordena os depoimentos por data (crescente - do mais antigo para o mais recente)
   * @param {Array} array - Array de depoimentos
   * @returns {Array} Array ordenado
   */
  function ordenarPorDataCrescente(array) {
    return [...array].sort((a, b) => new Date(a.data) - new Date(b.data));
  }

  // Função para pegar depoimentos em destaque (para usar na página Sobre)
  window.getDepoimentosDestaque = function(limit = 3) {
    const destaques = depoimentos.filter(d => d.destaque === true);
    // Retorna em ordem decrescente (mais recentes primeiro)
    return ordenarPorDataDecrescente(destaques).slice(0, limit);
  };

  // Função para pegar todos os depoimentos (ordenados do mais recente para o mais antigo)
  window.getTodosDepoimentos = function(ordenar = 'desc') {
    if (ordenar === 'asc') {
      return ordenarPorDataCrescente(depoimentos);
    }
    return ordenarPorDataDecrescente(depoimentos);
  };

  // Função para pegar depoimentos recentes (últimos 6 meses)
  window.getDepoimentosRecentes = function(limit = 6) {
    const seisMesesAtras = new Date();
    seisMesesAtras.setMonth(seisMesesAtras.getMonth() - 6);
    
    const recentes = depoimentos.filter(d => new Date(d.data) > seisMesesAtras);
    // Retorna em ordem decrescente (mais recentes primeiro)
    return ordenarPorDataDecrescente(recentes).slice(0, limit);
  };

  // Função para pegar depoimentos por produto
  window.getDepoimentosPorProduto = function(nomeProduto, ordenar = 'desc') {
    const filtrados = depoimentos.filter(d => d.produtoComprado === nomeProduto);
    if (ordenar === 'asc') {
      return ordenarPorDataCrescente(filtrados);
    }
    return ordenarPorDataDecrescente(filtrados);
  };

  // Função para calcular média geral de avaliações
  window.getMediaAvaliacoes = function() {
    const total = depoimentos.reduce((sum, d) => sum + d.rating, 0);
    return (total / depoimentos.length).toFixed(1);
  };

  // Função para contar total de avaliações
  window.getTotalAvaliacoes = function() {
    return depoimentos.length;
  };

  // Função para pegar depoimentos com alta avaliação (4+ estrelas)
  window.getDepoimentosAltos = function(limit = 10, ordenar = 'desc') {
    const altos = depoimentos.filter(d => d.rating >= 4);
    const ordenados = ordenar === 'asc' ? ordenarPorDataCrescente(altos) : ordenarPorDataDecrescente(altos);
    return ordenados.slice(0, limit);
  };

  // Função para pegar os últimos N depoimentos (mais recentes)
  window.getUltimosDepoimentos = function(limit = 3) {
    return ordenarPorDataDecrescente(depoimentos).slice(0, limit);
  };

  // Função para pegar depoimentos por período
  window.getDepoimentosPorPeriodo = function(dataInicio, dataFim, ordenar = 'desc') {
    const inicio = new Date(dataInicio);
    const fim = new Date(dataFim);
    
    const filtrados = depoimentos.filter(d => {
      const dataDepoimento = new Date(d.data);
      return dataDepoimento >= inicio && dataDepoimento <= fim;
    });
    
    return ordenar === 'asc' ? ordenarPorDataCrescente(filtrados) : ordenarPorDataDecrescente(filtrados);
  };

  // Exportar array global para acesso direto (já ordenado do mais recente para o mais antigo)
  window.depoimentos = ordenarPorDataDecrescente(depoimentos);

  // Exibir informações no console
  console.log(`💬 Depoimentos carregados: ${depoimentos.length} avaliações`);
  console.log(`   - Média: ${window.getMediaAvaliacoes()} ⭐`);
  console.log(`   - Destaques: ${depoimentos.filter(d => d.destaque).length}`);
  console.log(`   - Mais recente: ${window.depoimentos[0]?.nome} (${window.depoimentos[0]?.data})`);
  console.log(`   - Mais antigo: ${window.depoimentos[window.depoimentos.length - 1]?.nome} (${window.depoimentos[window.depoimentos.length - 1]?.data})`);
})();