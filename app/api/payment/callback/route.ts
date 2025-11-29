import { NextRequest, NextResponse } from "next/server";
import { getTransactionStatus } from "@/lib/fedapay";
import { updateOrderStatus } from "@/lib/firebase/firestore";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const transactionId = searchParams.get("transaction_id");
    const orderId = searchParams.get("orderId");

    if (!transactionId || !orderId) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/checkout?error=missing_params`
      );
    }

    // Vérifier le statut de la transaction
    const { status } = await getTransactionStatus(transactionId);

    // Mettre à jour le statut de la commande
    if (status === "approved") {
      await updateOrderStatus(orderId, "paid");

      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/confirmation?orderId=${orderId}&status=success`
      );
    } else if (status === "declined" || status === "cancelled") {
      await updateOrderStatus(orderId, "cancelled");

      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/checkout?error=payment_failed`
      );
    } else {
      // Statut pending
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/checkout?status=pending`
      );
    }
  } catch (error: any) {
    console.error("Erreur callback paiement:", error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/checkout?error=callback_error`
    );
  }
}
