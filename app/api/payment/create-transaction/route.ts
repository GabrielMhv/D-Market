import { NextRequest, NextResponse } from "next/server";
import { createFedaPayTransaction } from "@/lib/fedapay";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      amount,
      description,
      customerEmail,
      customerPhone,
      customerName,
      orderId,
    } = body;

    // Validation
    if (!amount || !customerEmail || !customerPhone || !customerName) {
      return NextResponse.json(
        { error: "Données manquantes" },
        { status: 400 }
      );
    }

    // URL de callback
    const callbackUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/callback?orderId=${orderId}`;

    // Créer la transaction FedaPay
    const { transactionId, checkoutUrl } = await createFedaPayTransaction(
      amount,
      description || `Commande #${orderId}`,
      customerEmail,
      customerPhone,
      customerName,
      callbackUrl
    );

    return NextResponse.json({
      success: true,
      transactionId,
      checkoutUrl,
    });
  } catch (error: any) {
    console.error("Erreur API create-transaction:", error);
    return NextResponse.json(
      {
        error: error.message || "Erreur lors de la création de la transaction",
      },
      { status: 500 }
    );
  }
}
