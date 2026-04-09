/* ===== LINKS WHATSAPP ===== */
function initWhatsAppLinks() {
  if (typeof getWhatsAppGeneral !== 'function') {
    setTimeout(initWhatsAppLinks, 100);
    return;
  }

  const link = getWhatsAppGeneral();
  
  ['header-whatsapp', 'mobile-whatsapp', 'card-whatsapp', 'banner-whatsapp', 'footer-whatsapp'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.href = link;
  });
}

/* ===== FORMULÁRIO DE CONTATO ===== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Limpar mensagens de erro anteriores
    clearErrors();
    
    // Validar campos
    if (!validateForm()) return;
    
    // Mostrar loading no botão
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;
    
    // Simular envio (aqui você pode integrar com uma API real)
    await simulateSubmit(form);
    
    // Restaurar botão
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  });
}

function clearErrors() {
  document.querySelectorAll('.error-message').forEach(el => {
    el.classList.remove('show');
    el.textContent = '';
  });
}

function showError(fieldId, message) {
  const errorEl = document.getElementById(`${fieldId}-error`);
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.add('show');
  }
}

function validateForm() {
  let isValid = true;
  
  // Nome
  const name = document.getElementById('name');
  if (!name.value.trim()) {
    showError('name', 'Nome é obrigatório');
    isValid = false;
  } else if (name.value.trim().length < 3) {
    showError('name', 'Nome deve ter pelo menos 3 caracteres');
    isValid = false;
  }
  
  // Email
  const email = document.getElementById('email');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value.trim()) {
    showError('email', 'E-mail é obrigatório');
    isValid = false;
  } else if (!emailRegex.test(email.value.trim())) {
    showError('email', 'E-mail inválido');
    isValid = false;
  }
  
  // Assunto
  const subject = document.getElementById('subject');
  if (!subject.value) {
    showError('subject', 'Selecione um assunto');
    isValid = false;
  }
  
  // Mensagem
  const message = document.getElementById('message');
  if (!message.value.trim()) {
    showError('message', 'Mensagem é obrigatória');
    isValid = false;
  } else if (message.value.trim().length < 10) {
    showError('message', 'Mensagem deve ter pelo menos 10 caracteres');
    isValid = false;
  }
  
  // Privacidade
  const privacy = document.getElementById('privacy');
  if (!privacy.checked) {
    showError('privacy', 'Você precisa aceitar a Política de Privacidade');
    isValid = false;
  }
  
  return isValid;
}

async function simulateSubmit(form) {
  const statusDiv = document.getElementById('form-status');
  statusDiv.style.display = 'block';
  
  // Coletar dados do formulário
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    subject: document.getElementById('subject').value,
    message: document.getElementById('message').value,
    date: new Date().toLocaleString('pt-BR')
  };
  
  console.log('📝 Formulário enviado:', formData);
  
  // Simular delay de rede
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Exibir mensagem de sucesso
  statusDiv.className = 'form-status success';
  statusDiv.innerHTML = `
    <i class="fas fa-check-circle"></i> 
    Mensagem enviada com sucesso! Entraremos em contato em breve.
  `;
  
  // Limpar formulário
  form.reset();
  
  // Esconder mensagem após 5 segundos
  setTimeout(() => {
    statusDiv.style.display = 'none';
    statusDiv.className = 'form-status';
  }, 5000);
}

/* ===== FAQ ACCORDION ===== */
function initContactFAQ() {
  const faqList = document.getElementById('contact-faq-list');
  if (!faqList) return;
  
  const faqs = [
    {
      q: "Como faço para solicitar um orçamento?",
      a: "Você pode solicitar um orçamento de duas formas: pelo WhatsApp (resposta mais rápida) ou preenchendo o formulário acima. Envie a descrição do produto desejado, quantidades e informações para personalização."
    },
    {
      q: "Qual o prazo de resposta do formulário?",
      a: "Nosso time responde todos os formulários em até 24 horas úteis. Para respostas mais rápidas, recomendamos o contato via WhatsApp."
    },
    {
      q: "Vocês entregam para todo o Brasil?",
      a: "Sim! Entregamos para todo o Brasil via Correios (com rastreamento). Para São Paulo e Grande SP, oferecemos também entrega por motoboy."
    },
    {
      q: "Como funciona a personalização?",
      a: "Após seu contato, nossa equipe cria uma arte personalizada com base nas suas informações. Você aprova a arte antes de iniciarmos a produção. É rápido e sem custo adicional!"
    },
    {
      q: "Quais formas de pagamento aceitam?",
      a: "Aceitamos PIX (com 5% de desconto), cartão de crédito em até 12x, cartão de débito e boleto bancário. O pagamento é seguro via link ou presencial."
    },
    {
      q: "Posso retirar o pedido pessoalmente?",
      a: "Sim! Oferecemos retirada gratuita em nosso endereço na Vila Olímpia, São Paulo. Basta combinar o horário pelo WhatsApp."
    }
  ];
  
  faqList.innerHTML = '';
  
  faqs.forEach((faq, i) => {
    const id = `faq-answer-${i}`;
    const item = document.createElement('div');
    item.className = 'faq-item';
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
    
    faqList.appendChild(item);
  });
}

/* ===== MASK PARA TELEFONE ===== */
function initPhoneMask() {
  const phoneInput = document.getElementById('phone');
  if (!phoneInput) return;
  
  phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
    if (value.length <= 2) {
      e.target.value = value;
    } else if (value.length <= 6) {
      e.target.value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length <= 10) {
      e.target.value = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
    } else {
      e.target.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
    }
  });
}

/* ===== REVEAL ON SCROLL ===== */
function initRevealOnScroll() {
  const revealElements = document.querySelectorAll('.reveal');
  
  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('visible'));
    return;
  }
  
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

/* ====== POLÍTICA DE PRIVACIDADE (modal simples) ====== */
function initPrivacyModal() {
  const privacyLink = document.getElementById('privacy-link');
  if (!privacyLink) return;
  
  privacyLink.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Criar modal simples
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal" style="max-width: 500px;">
        <button class="modal-close" aria-label="Fechar">✕</button>
        <div class="modal-body" style="grid-template-columns: 1fr;">
          <div class="modal-info">
            <h2>Política de Privacidade</h2>
            <p>Seus dados são utilizados exclusivamente para atendimento e envio de orçamentos. Não compartilhamos suas informações com terceiros.</p>
            <p>Para mais informações, entre em contato conosco.</p>
            <div class="modal-actions">
              <button class="btn btn-primary" id="close-privacy-modal">Entendi</button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => modal.classList.add('open'), 10);
    
    const closeModal = () => {
      modal.classList.remove('open');
      setTimeout(() => {
        modal.remove();
        document.body.style.overflow = '';
      }, 300);
    };
    
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('#close-privacy-modal').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  });
}

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    initWhatsAppLinks();
    initContactForm();
    initContactFAQ();
    initPhoneMask();
    initRevealOnScroll();
    initPrivacyModal();
  }, 100);
});