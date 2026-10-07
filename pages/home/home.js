/* ===== CONFIGURAÇÕES DE EXIBIÇÃO ===== */
const CARROSSEL_MAX = 10; // Máx de produtos carregados por carrossel de serviço

/* ===== LINKS WHATSAPP ===== */
function initWhatsAppLinks() {
  // Aguarda a função getWhatsAppGeneral estar disponível
  if (typeof getWhatsAppGeneral !== 'function') {
    setTimeout(initWhatsAppLinks, 100);
    return;
  }
  
  const generalLink = getWhatsAppGeneral();

  const ids = ['header-whatsapp', 'hero-whatsapp', 'mobile-whatsapp', 'contato-whatsapp', 'footer-whatsapp', 'monte-whatsapp'];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.href = generalLink;
  });
}

/* ===== CARROSSÉIS DA HOME (um por serviço) ===== */
function initServiceCarousels() {
  if (typeof window.getProdutosPorServico !== 'function') {
    setTimeout(initServiceCarousels, 100);
    return;
  }

  createCarousel({
    trackId: 'carousel-track-personalizados',
    dotsId: 'carousel-dots-personalizados',
    prevId: 'carousel-prev-personalizados',
    nextId: 'carousel-next-personalizados',
    products: window.getProdutosPorServico('personalizados', CARROSSEL_MAX)
  }).init();

  createCarousel({
    trackId: 'carousel-track-roupas',
    dotsId: 'carousel-dots-roupas',
    prevId: 'carousel-prev-roupas',
    nextId: 'carousel-next-roupas',
    products: window.getProdutosPorServico('roupas', CARROSSEL_MAX)
  }).init();

  createCarousel({
    trackId: 'carousel-track-brindes',
    dotsId: 'carousel-dots-brindes',
    prevId: 'carousel-prev-brindes',
    nextId: 'carousel-next-brindes',
    products: window.getProdutosPorServico('brindes-corporativos', CARROSSEL_MAX)
  }).init();
}

/* ====== FAQ ACCORDION ====== */
const FAQ = (() => {
  const faqs = [
    {
      q: "Como funciona a personalização?",
      a: "É simples! Você nos envia pelo WhatsApp as informações que deseja (nome, foto, mensagem) e nossa equipe cria um layout personalizado. Você aprova antes de seguirmos para a produção."
    },
    {
      q: "Qual é o prazo de produção?",
      a: "A maioria dos produtos é produzida em até 3 dias úteis. Para pedidos com maior complexidade ou volume, o prazo pode variar — mas sempre informamos antes de confirmar."
    },
    {
      q: "Vocês entregam em todo o Brasil?",
      a: "Sim! Entregamos por toda a cidade de São Paulo e Região Metropolitana via motoboy. Para o restante do Brasil, despachamos pelos Correios com rastreamento."
    },
    {
      q: "Quais formas de pagamento são aceitas?",
      a: "Aceitamos PIX (com 5% de desconto), cartão de crédito em até 12x e cartão de débito. O pagamento é realizado de forma segura via link ou maquininha presencial."
    },
    {
      q: "Posso pedir uma amostra antes de confirmar o pedido?",
      a: "Para pedidos maiores (acima de 10 unidades), enviamos uma foto digital da arte para aprovação sem custo. Amostras físicas podem ser solicitadas com custo adicional."
    },
    {
      q: "E se eu não gostar do produto recebido?",
      a: "Nossa prioridade é a sua satisfação! Se houver algum defeito de produção ou divergência com o que foi aprovado, refazemos o produto sem custo adicional."
    }
  ];

  function build() {
    const list = document.getElementById('faq-list');
    if (!list) return;

    list.innerHTML = '';
    faqs.forEach((faq, i) => {
      const id = `faq-answer-${i}`;
      const item = document.createElement('div');
      item.className = 'faq-item';
      item.setAttribute('role', 'listitem');
      item.innerHTML = `
        <button class="faq-question"
                aria-expanded="false"
                aria-controls="${id}"
                id="faq-btn-${i}">
          ${faq.q}
          <span class="faq-icon" aria-hidden="true">+</span>
        </button>
        <div class="faq-answer"
             id="${id}"
             role="region"
             aria-labelledby="faq-btn-${i}">
          <p>${faq.a}</p>
        </div>
      `;

      const btn = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');

      btn.addEventListener('click', () => {
        const isOpen = btn.getAttribute('aria-expanded') === 'true';

        // Fechar todos
        document.querySelectorAll('.faq-question').forEach(b => {
          b.setAttribute('aria-expanded', 'false');
          if (b.nextElementSibling) {
            b.nextElementSibling.classList.remove('open');
          }
        });

        // Abrir o clicado (se estava fechado)
        if (!isOpen) {
          btn.setAttribute('aria-expanded', 'true');
          answer.classList.add('open');
        }
      });

      list.appendChild(item);
    });
  }

  return { init: build };
})();

/* ===== REVEAL ON SCROLL ===== */
function initRevealOnScroll() {
  const revealElements = document.querySelectorAll('.reveal');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  
  revealElements.forEach(el => observer.observe(el));
}

/* ====== MENU MOBILE E SCROLL DO HEADER ======
   Removidos daqui: já são tratados globalmente por HeaderManager
   (index.js), que registra o listener do hamburguer, do scroll do
   header e do fechamento do menu ao clicar em um link. Ter essa
   lógica duplicada aqui fazia os dois listeners de clique no mesmo
   botão se cancelarem (toggle + toggle = nenhuma mudança visível),
   quebrando o menu mobile especificamente na home. */

/* ====== INIT ====== */
document.addEventListener('DOMContentLoaded', () => {
  // Aguarda um pequeno delay para garantir que os dados foram carregados
  setTimeout(() => {
    initWhatsAppLinks();
    initServiceCarousels();
    FAQ.init();
    initRevealOnScroll();
  }, 100);
});