export const WHATSAPP_NUMBER = "542235913719";
export const WHATSAPP_DISPLAY = "2235913719";
export const INSTAGRAM_HANDLE = "bcamilion";
export const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`;

/** Builds a wa.me link to Bautista, optionally with a prefilled message. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  const text = message?.trim();
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export interface ContactFormData {
  name: string;
  phone: string;
  message: string;
}

/** Turns the footer form into the WhatsApp message Bautista receives. */
export function contactFormMessage({ name, phone, message }: ContactFormData): string {
  const lines = [`Hola Bautista, soy ${name.trim()}.`];
  if (message.trim()) lines.push(message.trim());
  if (phone.trim()) lines.push(`Mi WhatsApp: ${phone.trim()}`);
  return lines.join("\n");
}

export const WA_MESSAGES = {
  general: "Hola Bautista, quiero hacerte una consulta.",
  call: "Hola Bautista, quiero agendar una llamada gratis para hablar de mi propiedad.",
  buy: "Hola Bautista, quiero comprar una propiedad en Mar del Plata.",
  sell: "Hola Bautista, quiero vender mi propiedad.",
  final: "Hola Bautista, quiero hablar con vos sobre una propiedad.",
} as const;
