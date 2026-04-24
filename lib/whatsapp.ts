/**
 * Retrieves the Nelsolar WhatsApp number from the environment.
 * Falls back to an empty string so links degrade gracefully in dev
 * if .env.local is not yet configured.
 */
const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER ?? "";

/**
 * Encodes a plain-text message into a wa.me deep link.
 */
function buildWaLink(message: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Returns a WhatsApp order link pre-filled with the product name and price.
 *
 * @example
 * getWhatsAppLink("200W Monocrystalline Solar Panel", 85000)
 * // → "https://wa.me/2348XXXXXXXXX?text=Hi%20Nelsolar%2C..."
 */
export function getWhatsAppLink(productName: string, price: number): string {
  const formattedPrice = price.toLocaleString("en-NG");
  const message = `Hi Nelsolar, I'm interested in the ${productName} for ₦${formattedPrice}. Please help me order.`;
  return buildWaLink(message);
}

/**
 * Returns a WhatsApp consultation booking link.
 * Prompts the user to specify whether the consultation is for a home or business.
 */
export function getConsultationLink(): string {
  const message =
    "Hi Nelsolar, I'd like to book a free solar consultation for my [home/business]. Please let me know the next available time.";
  return buildWaLink(message);
}

/**
 * Returns a WhatsApp installation booking link pre-filled with the installer's name.
 *
 * @example
 * getInstallationLink("Emeka Okafor")
 * // → "https://wa.me/2348XXXXXXXXX?text=Hi%2C%20I'd%20like%20to%20book%20Emeka%20Okafor..."
 */
export function getInstallationLink(installerName: string): string {
  const message = `Hi Nelsolar, I'd like to book ${installerName} for a solar installation. My location is [please add your city/state].`;
  return buildWaLink(message);
}
