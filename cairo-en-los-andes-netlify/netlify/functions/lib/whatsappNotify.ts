/**
 * WhatsApp notification helper using CallMeBot API.
 * Sends automatic notifications to the organizer when new inscriptions
 * or direct purchases are received.
 */

const CALLMEBOT_PHONE = "5493873267777";
const CALLMEBOT_APIKEY = "2791012";
const CALLMEBOT_URL = "https://api.callmebot.com/whatsapp.php";

/**
 * Send a WhatsApp message to the organizer via CallMeBot.
 * Non-blocking: errors are logged but don't break the main flow.
 */
export async function notifyOrganizer(message: string): Promise<boolean> {
  try {
    const encodedText = encodeURIComponent(message);
    const url = `${CALLMEBOT_URL}?phone=${CALLMEBOT_PHONE}&text=${encodedText}&apikey=${CALLMEBOT_APIKEY}`;

    const res = await fetch(url, {
      method: "GET",
      signal: AbortSignal.timeout(10000), // 10s timeout
    });

    if (res.ok) {
      console.log("[WhatsApp] Notification sent successfully");
      return true;
    } else {
      const errText = await res.text();
      console.error("[WhatsApp] Notification failed:", res.status, errText);
      return false;
    }
  } catch (err) {
    console.error("[WhatsApp] Notification error:", err);
    return false;
  }
}

/**
 * Notify organizer about a new inscription.
 */
export async function notifyNewInscription(data: {
  nombre: string;
  apellido: string;
  email: string;
  paquete: string;
  telefono?: string;
}): Promise<void> {
  const paqueteLabels: Record<string, string> = {
    paquete1: "Paquete 1 – Sin hotel ($179)",
    paquete2: "Paquete 2 – Hotel Boutique ($240)",
    paquete3: "Paquete 3 – Sheraton ($680)",
  };

  const paqueteLabel = paqueteLabels[data.paquete] || data.paquete;

  const message = `🎉 *NUEVA INSCRIPCIÓN*

👤 *${data.nombre} ${data.apellido}*
📧 ${data.email}
📱 ${data.telefono || "No proporcionado"}
📦 ${paqueteLabel}

🔗 Ver en Google Sheets`;

  await notifyOrganizer(message);
}

/**
 * Notify organizer about a new direct purchase (galas/sponsors).
 */
export async function notifyNewDirectPurchase(data: {
  nombre: string;
  email: string;
  telefono: string;
  productoLabel: string;
  montoUSD: number;
  paymentProvider: string;
}): Promise<void> {
  const providerLabels: Record<string, string> = {
    paypal: "PayPal",
    mercadopago: "MercadoPago",
    whatsapp: "WhatsApp",
  };

  const provider = providerLabels[data.paymentProvider] || data.paymentProvider;

  const message = `🛒 *NUEVA COMPRA DIRECTA*

👤 *${data.nombre}*
📧 ${data.email}
📱 ${data.telefono}
🎫 ${data.productoLabel}
💰 USD $${data.montoUSD}
💳 ${provider}

🔗 Ver en Google Sheets`;

  await notifyOrganizer(message);
}
