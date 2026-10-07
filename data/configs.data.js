// data/configs.data.js — WhatsApp (links usados pelo site inteiro)

(function() {
  'use strict';

  window.getWhatsAppGeneral = function() {
    const phoneNumber = "5511999999999";
    const defaultMessage = encodeURIComponent("Olá! Gostaria de saber mais sobre os produtos personalizados da Lunna Presentes.");
    return `https://wa.me/${phoneNumber}?text=${defaultMessage}`;
  };

  window.getWhatsAppLink = function(product) {
    const phoneNumber = product.whatsappNumber || "5511999999999";
    // Brindes corporativos (categoria "cestas") não têm preço fixo —
    // depende de quantidade e personalização do pedido — então a
    // mensagem não cita valor, diferente dos demais produtos.
    const ehBrinde = typeof window.ehBrindeCorporativo === 'function'
      ? window.ehBrindeCorporativo(product) : product.category === 'cestas';
    const temPreco = product.price && String(product.price).trim() && !/^R\$\s*0+,0+$/.test(String(product.price).trim());
    const message = ehBrinde
      ? encodeURIComponent(`Olá! Vi o produto *${product.name}* e gostaria de consultar valores para um pedido corporativo.`)
      : encodeURIComponent(`Olá! Tenho interesse no produto: *${product.name}*` + (temPreco ? ` (${product.price}).` : '. Poderia me passar o valor?'));
    return `https://wa.me/${phoneNumber}?text=${message}`;
  };
})();