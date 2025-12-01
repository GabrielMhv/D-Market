import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as nodemailer from "nodemailer";

// Initialiser Firebase Admin
admin.initializeApp();

// Configuration Nodemailer (Gmail)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: functions.config().email?.user || process.env.EMAIL_USER,
    pass: functions.config().email?.password || process.env.EMAIL_PASSWORD,
  },
});

/**
 * Envoyer un email de confirmation de commande
 */
export const sendOrderConfirmationEmail = functions.firestore
  .document("orders/{orderId}")
  .onCreate(async (snap, context) => {
    const order = snap.data();
    const orderId = context.params.orderId;

    const mailOptions = {
      from: `"E-Shop Bénin" <${functions.config().email?.user}>`,
      to: order.user_email,
      subject: `Confirmation de commande #${orderId}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; }
            .order-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .product-item { border-bottom: 1px solid #eee; padding: 15px 0; }
            .total { font-size: 24px; font-weight: bold; color: #667eea; text-align: right; margin-top: 20px; }
            .footer { background: #333; color: white; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Commande confirmée !</h1>
              <p>Merci pour votre achat</p>
            </div>
            
            <div class="content">
              <p>Bonjour <strong>${order.delivery_address.name}</strong>,</p>
              
              <p>Nous avons bien reçu votre commande <strong>#${orderId}</strong>.</p>
              
              <div class="order-details">
                <h2>Détails de la commande</h2>
                ${order.products
                  .map(
                    (item: any) => `
                  <div class="product-item">
                    <strong>${item.product_name}</strong><br>
                    Quantité: ${item.quantity} × ${item.price.toLocaleString(
                      "fr-FR"
                    )} FCFA
                    ${item.size ? `<br>Taille: ${item.size}` : ""}
                  </div>
                `
                  )
                  .join("")}
                
                <div class="total">
                  Total: ${order.total.toLocaleString("fr-FR")} FCFA
                </div>
              </div>
              
              <h3>Adresse de livraison</h3>
              <p>
                ${order.delivery_address.name}<br>
                ${order.delivery_address.phone}<br>
                ${order.delivery_address.address}<br>
                ${order.delivery_address.city}, ${
        order.delivery_address.country
      }
              </p>
              
              <p>Votre commande sera traitée dans les plus brefs délais.</p>
              
              <center>
                <a href="${
                  process.env.NEXT_PUBLIC_APP_URL
                }/compte/commandes" class="button">
                  Suivre ma commande
                </a>
              </center>
            </div>
            
            <div class="footer">
              <p>E-Shop Bénin - Vêtements et Accessoires</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`Email de confirmation envoyé pour la commande ${orderId}`);
    } catch (error) {
      console.error("Erreur envoi email:", error);
    }
  });

/**
 * Envoyer un email lors du changement de statut de commande
 */
export const sendOrderStatusEmail = functions.firestore
  .document("orders/{orderId}")
  .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();
    const orderId = context.params.orderId;

    // Vérifier si le statut a changé
    if (before.status === after.status) {
      return null;
    }

    const statusMessages: Record<
      string,
      { subject: string; message: string; emoji: string }
    > = {
      paid: {
        subject: "Paiement confirmé",
        message:
          "Votre paiement a été confirmé avec succès. Nous préparons votre commande.",
        emoji: "✅",
      },
      processing: {
        subject: "Commande en préparation",
        message: "Votre commande est en cours de préparation.",
        emoji: "📦",
      },
      shipped: {
        subject: "Commande expédiée",
        message: "Votre commande a été expédiée et est en route vers vous.",
        emoji: "🚚",
      },
      delivered: {
        subject: "Commande livrée",
        message: "Votre commande a été livrée. Merci pour votre confiance !",
        emoji: "🎉",
      },
      cancelled: {
        subject: "Commande annulée",
        message: "Votre commande a été annulée.",
        emoji: "❌",
      },
    };

    const statusInfo = statusMessages[after.status];
    if (!statusInfo) return null;

    const mailOptions = {
      from: `"E-Shop Bénin" <${functions.config().email?.user}>`,
      to: after.user_email,
      subject: `${statusInfo.emoji} ${statusInfo.subject} - Commande #${orderId}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; }
            .status-box { background: white; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; }
            .footer { background: #333; color: white; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>${statusInfo.emoji} ${statusInfo.subject}</h1>
            </div>
            
            <div class="content">
              <p>Bonjour <strong>${after.delivery_address.name}</strong>,</p>
              
              <div class="status-box">
                <h2>Commande #${orderId}</h2>
                <p style="font-size: 18px;">${statusInfo.message}</p>
              </div>
              
              <center>
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/compte/commandes" class="button">
                  Voir ma commande
                </a>
              </center>
            </div>
            
            <div class="footer">
              <p>E-Shop Bénin - Vêtements et Accessoires</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`Email de statut envoyé pour la commande ${orderId}`);
    } catch (error) {
      console.error("Erreur envoi email:", error);
    }

    return null;
  });

/**
 * Nettoyer les paniers abandonnés (> 30 jours)
 */
export const cleanupAbandonedCarts = functions.pubsub
  .schedule("every 24 hours")
  .onRun(async (context) => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const snapshot = await admin
      .firestore()
      .collection("carts")
      .where("updated_at", "<", thirtyDaysAgo)
      .get();

    const batch = admin.firestore().batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    console.log(`${snapshot.size} paniers abandonnés supprimés`);

    return null;
  });
