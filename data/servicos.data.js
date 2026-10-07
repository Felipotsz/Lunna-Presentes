// data/servicos.data.js — Configuração dos 3 serviços (Personalizados,
// Lunna Mood, Brindes Corporativos): categorias, hero e FAQ de cada um.
// Usado pela Home e pelas páginas de serviço.

(function () {
  'use strict';

  const SERVICOS = {
    personalizados: {
      slug: 'personalizados',
      nome: 'Personalizados',
      categorias: ['personalizados', 'canecas', 'agendas', 'bodys', 'bolsas', 'chaveiros', 'imas', 'mousepads', 'relogios', 'tapetes', 'trofeus'],
      icon: 'fa-palette',
      badge: 'Feito para você',
      heroTitle: 'Personalizados com todo carinho',
      heroSub: 'Canecas, quadros e lembranças únicas, criadas especialmente para contar a sua história.',
      heroImage: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=1400&q=80',
      faq: [
        {
          q: 'Como funciona a personalização dos produtos?',
          a: 'Você nos envia pelo WhatsApp as informações que deseja (nome, foto, mensagem) e nossa equipe cria um layout exclusivo. Você aprova antes de seguirmos para a produção.'
        },
        {
          q: 'Posso enviar minha própria arte ou foto?',
          a: 'Sim! Você pode enviar fotos, frases ou uma arte pronta. Nossa equipe adapta o material para garantir a melhor qualidade de impressão.'
        },
        {
          q: 'Qual é o prazo de produção dos personalizados?',
          a: 'A maioria dos itens personalizados fica pronta em até 3 dias úteis após a aprovação da arte.'
        },
        {
          q: 'Existe pedido mínimo para canecas e quadros?',
          a: 'Não há pedido mínimo — você pode comprar uma unidade ou fechar um kit maior para presentear várias pessoas.'
        },
        {
          q: 'Posso pedir uma prévia da arte antes da produção?',
          a: 'Sim, sempre enviamos uma prévia digital para sua aprovação antes de qualquer item entrar em produção.'
        }
      ]
    },
    roupas: {
      slug: 'roupas',
      nome: 'Lunna Mood',
      categorias: ['moletons'],
      icon: 'fa-shirt',
      badge: 'Vista sua história',
      heroTitle: 'Lunna Mood: roupas personalizadas para toda ocasião',
      heroSub: 'Moletons com estampas que traduzem fases, emoções e pequenos momentos.',
      heroImage: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1400&q=80',
      faq: [
        {
          q: 'Quais tamanhos de moletom estão disponíveis?',
          a: 'Trabalhamos com tamanhos do P ao GG. Para tamanhos especiais, é só combinar com a gente pelo WhatsApp.'
        },
        {
          q: 'A estampa do moletom dura bem na lavagem?',
          a: 'Sim! Usamos técnicas de impressão de alta durabilidade, feitas para resistir a diversas lavagens sem desbotar.'
        },
        {
          q: 'Consigo fazer moletons iguais para um grupo ou evento?',
          a: 'Com certeza. Fazemos pedidos em lote para equipes, formaturas, casais e eventos, com preços especiais para quantidade.'
        },
        {
          q: 'Posso escolher a cor do tecido?',
          a: 'Sim, oferecemos diversas opções de cor. Basta informar sua preferência ao fazer o pedido pelo WhatsApp.'
        },
        {
          q: 'Qual o prazo de entrega das roupas personalizadas?',
          a: 'Peças unitárias ficam prontas em até 3 dias úteis. Pedidos em maior quantidade têm prazo combinado conforme a demanda.'
        }
      ]
    },
    'brindes-corporativos': {
      slug: 'brindes-corporativos',
      nome: 'Brindes Corporativos',
      categorias: ['corp-bolsas', 'corp-cadernos', 'corp-copos', 'corp-vestuario', 'corp-escritorio', 'cestas'],
      icon: 'fa-briefcase',
      badge: 'Fortaleça sua marca',
      heroTitle: 'Brindes corporativos que encantam',
      heroSub: 'Presentes e cestas pensados para valorizar clientes, parceiros e equipes.',
      heroImage: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=1400&q=80',
      faq: [
        {
          q: 'Vocês atendem pedidos corporativos em grande quantidade?',
          a: 'Sim, somos especializados em pedidos corporativos de todos os tamanhos, com condições especiais para volume.'
        },
        {
          q: 'É possível incluir a logo da empresa nos brindes?',
          a: 'Sim! Personalizamos os brindes com a identidade visual da sua empresa, incluindo logo e cores da marca.'
        },
        {
          q: 'Vocês emitem nota fiscal para empresas?',
          a: 'Sim, emitimos nota fiscal para todos os pedidos corporativos.'
        },
        {
          q: 'Qual o prazo para pedidos corporativos maiores?',
          a: 'O prazo varia conforme a quantidade e a complexidade da personalização — sempre alinhamos um cronograma antes de confirmar o pedido.'
        },
        {
          q: 'Conseguem entregar diretamente no endereço da empresa?',
          a: 'Sim, fazemos entrega direta no endereço combinado, incluindo escritórios e eventos corporativos.'
        }
      ]
    }
  };

  // Retorna os produtos de um serviço (a partir de window.todosProdutos)
  window.getProdutosPorServico = function (servicoSlug, limite) {
    const servico = SERVICOS[servicoSlug];
    if (!servico || !window.todosProdutos) return [];

    const produtos = window.todosProdutos.filter(function (p) {
      return servico.categorias.indexOf(p.category) !== -1;
    });

    return typeof limite === 'number' ? produtos.slice(0, limite) : produtos;
  };

  window.SERVICOS_LUNNA = SERVICOS;

  // Produto da linha de Brindes Corporativos? (sem preço fixo: card só
  // com "Consultar" e mensagem de WhatsApp sem valor)
  window.ehBrindeCorporativo = function (p) {
    return !!p && SERVICOS['brindes-corporativos'].categorias.indexOf(p.category) !== -1;
  };
})();
