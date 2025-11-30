import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/lib/context/CartContext";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "E-Commerce Bénin - Vêtements et Accessoires",
  description:
    "Boutique en ligne moderne pour vêtements et accessoires au Bénin. Paiement mobile money (MTN, Moov, Celtiis).",
  keywords: [
    "e-commerce",
    "bénin",
    "vêtements",
    "accessoires",
    "mobile money",
    "MTN",
    "Moov",
    "Celtiis",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <CartProvider>
          <Header />
          {children}
          <Footer />
          <Toaster position="bottom-right" />
        </CartProvider>
      </body>
    </html>
  );
}
