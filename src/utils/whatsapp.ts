import { Product, CartItem } from '../types';

export const WHATSAPP_PHONE_NUMBER = '918695767656';
export const WHATSAPP_DISPLAY_NUMBER = '+91 8695767656';

/**
 * Generates WhatsApp redirect URL for a single product order
 */
export function getProductWhatsAppUrl(product: Product, finish?: string): string {
  const finishText = finish ? ` (Finish: ${finish})` : '';
  const formattedPrice = product.price.toLocaleString('en-IN');
  
  const message = `Hello MelodyCraft Instruments! I would like to order:

Product: ${product.name}${finishText}
Price: ₹${formattedPrice}

Please provide me with the order and delivery details.`;

  return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Generates WhatsApp redirect URL for entire cart checkout
 */
export function getCartWhatsAppUrl(items: CartItem[], totalAmount: number): string {
  const formattedTotal = totalAmount.toLocaleString('en-IN');
  
  let itemsList = items
    .map(
      (item, idx) =>
        `${idx + 1}. ${item.product.name}${item.selectedFinish ? ` [${item.selectedFinish}]` : ''} x${item.quantity} — ₹${(item.product.price * item.quantity).toLocaleString('en-IN')}`
    )
    .join('\n');

  const message = `Hello MelodyCraft Instruments! I would like to order the following items from my cart:

${itemsList}

Total Order Amount: ₹${formattedTotal}

Please provide me with payment methods, order confirmation, and delivery timeline.`;

  return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Generates WhatsApp redirect URL for general store inquiries
 */
export function getGeneralInquiryWhatsAppUrl(topic?: string): string {
  const message = topic
    ? `Hello MelodyCraft Instruments! I have a question regarding: ${topic}. Please assist me.`
    : `Hello MelodyCraft Instruments! I am visiting your store and would like some guidance on choosing the right musical instrument.`;

  return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Generates WhatsApp redirect URL for special offer claim
 */
export function getOfferWhatsAppUrl(offerTitle: string, code: string): string {
  const message = `Hello MelodyCraft Instruments! I would like to claim the special offer: "${offerTitle}" with code [${code}]. Please provide me with details on how to apply this discount.`;

  return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
}
