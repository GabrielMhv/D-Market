import axios from "axios";
import { FedaPayTransaction, PaymentProvider } from "@/types";

const FEDAPAY_BASE_URL = "https://api.fedapay.com/v1";
const FEDAPAY_SANDBOX_URL = "https://sandbox-api.fedapay.com/v1";

// Utiliser sandbox en développement
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? FEDAPAY_BASE_URL
    : FEDAPAY_SANDBOX_URL;

/**
 * Créer une transaction FedaPay
 */
export async function createFedaPayTransaction(
  amount: number,
  description: string,
  customerEmail: string,
  customerPhone: string,
  customerName: string,
  callbackUrl: string
): Promise<{ transactionId: string; checkoutUrl: string }> {
  try {
    const response = await axios.post(
      `${BASE_URL}/transactions`,
      {
        description,
        amount,
        currency: {
          iso: "XOF", // Franc CFA
        },
        callback_url: callbackUrl,
        customer: {
          firstname: customerName.split(" ")[0],
          lastname: customerName.split(" ").slice(1).join(" ") || customerName,
          email: customerEmail,
          phone_number: {
            number: customerPhone,
            country: "bj", // Bénin
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.FEDAPAY_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const transaction = response.data.v1.transaction;

    return {
      transactionId: transaction.id.toString(),
      checkoutUrl: transaction.url,
    };
  } catch (error: any) {
    console.error(
      "Erreur création transaction FedaPay:",
      error.response?.data || error.message
    );
    throw new Error("Impossible de créer la transaction de paiement");
  }
}

/**
 * Vérifier le statut d'une transaction
 */
export async function getTransactionStatus(transactionId: string): Promise<{
  status: "pending" | "approved" | "declined" | "cancelled";
  amount: number;
}> {
  try {
    const response = await axios.get(
      `${BASE_URL}/transactions/${transactionId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.FEDAPAY_SECRET_KEY}`,
        },
      }
    );

    const transaction = response.data.v1.transaction;

    return {
      status: transaction.status,
      amount: transaction.amount,
    };
  } catch (error: any) {
    console.error(
      "Erreur vérification transaction:",
      error.response?.data || error.message
    );
    throw new Error("Impossible de vérifier le statut de la transaction");
  }
}

/**
 * Créer un paiement (pour paiement direct sans redirection)
 */
export async function createDirectPayment(
  transactionId: string,
  provider: PaymentProvider,
  phoneNumber: string
): Promise<{ paymentId: string; status: string }> {
  try {
    // Mapper les providers vers les codes FedaPay
    const providerMap: Record<PaymentProvider, string> = {
      mtn: "mtn_benin",
      moov: "moov_benin",
      celtiis: "celtiis_benin",
    };

    const response = await axios.post(
      `${BASE_URL}/payments`,
      {
        transaction_id: transactionId,
        customer: {
          phone_number: {
            number: phoneNumber,
            country: "bj",
          },
        },
        mode: providerMap[provider],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.FEDAPAY_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const payment = response.data.v1.payment;

    return {
      paymentId: payment.id.toString(),
      status: payment.status,
    };
  } catch (error: any) {
    console.error(
      "Erreur création paiement:",
      error.response?.data || error.message
    );
    throw new Error("Impossible de créer le paiement");
  }
}

/**
 * Vérifier la signature du webhook FedaPay
 */
export function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const crypto = require("crypto");
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(payload);
  const computedSignature = hmac.digest("hex");

  return computedSignature === signature;
}
