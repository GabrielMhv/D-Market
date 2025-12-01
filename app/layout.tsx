import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/lib/context/CartContext";
import { ThemeProvider } from "@/lib/context/ThemeContext";
import { SettingsProvider } from "@/lib/context/SettingsContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Shop - Boutique en ligne",
  description: "Votre boutique de vêtements et accessoires au Bénin",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <SettingsProvider>
          <ThemeProvider>
            <CartProvider>
              <Header />
              {children}
              <Footer />
              <Toaster position="top-right" />
            </CartProvider>
          </ThemeProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
