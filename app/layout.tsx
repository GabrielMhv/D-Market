import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

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
    <html lang="fr">
      <body className="antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
