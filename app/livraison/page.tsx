"use client";

import Link from "next/link";
import Card from "@/components/ui/Card";
import { FadeIn, StaggerContainer } from "@/components/ui/Motion";
import { Truck, Clock, MapPin, Package, CheckCircle } from "lucide-react";

export default function LivraisonPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <FadeIn className="mb-8">
          <h1 className="text-4xl font-display font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent mb-2 flex items-center gap-3">
            <Truck className="text-primary-600" size={40} />
            Livraison & Retours
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Toutes les informations sur nos modes de livraison
          </p>
        </FadeIn>

        <StaggerContainer className="space-y-6">
          <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <MapPin className="text-primary-600" size={24} />
              Zones de livraison
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <div>
                <h3 className="font-semibold mb-2">🇧🇯 Livraison au Bénin</h3>
                <p>Nous livrons dans toutes les villes du Bénin :</p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>Cotonou et environs</li>
                  <li>Porto-Novo</li>
                  <li>Parakou</li>
                  <li>Abomey-Calavi</li>
                  <li>Et toutes les autres villes</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Clock className="text-primary-600" size={24} />
              Délais de livraison
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle className="text-green-600" size={24} />
                  <h3 className="font-semibold text-green-900 dark:text-green-100">
                    Cotonou et environs
                  </h3>
                </div>
                <p className="text-green-800 dark:text-green-200">
                  Livraison en <strong>24 à 48 heures</strong>
                </p>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Package className="text-blue-600" size={24} />
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                    Autres villes du Bénin
                  </h3>
                </div>
                <p className="text-blue-800 dark:text-blue-200">
                  Livraison en <strong>3 à 5 jours ouvrés</strong>
                </p>
              </div>
            </div>
          </Card>

          <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Frais de livraison
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      Zone
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      Tarif
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 dark:text-gray-300">
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 px-4">Cotonou</td>
                    <td className="py-3 px-4 font-medium">1 000 FCFA</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 px-4">Porto-Novo, Abomey-Calavi</td>
                    <td className="py-3 px-4 font-medium">1 500 FCFA</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 px-4">Autres villes</td>
                    <td className="py-3 px-4 font-medium">2 500 FCFA</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
              <p className="text-sm text-primary-900 dark:text-primary-100">
                <strong>🎁 Livraison gratuite</strong> pour toute commande
                supérieure à 50 000 FCFA
              </p>
            </div>
          </Card>

          <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Suivi de commande
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Une fois votre commande expédiée, vous recevrez un email de
              confirmation avec un numéro de suivi.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Vous pouvez suivre votre commande en temps réel depuis votre{" "}
              <Link
                href="/compte"
                className="text-primary-600 hover:underline font-medium"
              >
                espace client
              </Link>
              .
            </p>
          </Card>

          <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Mode de paiement
            </h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              <div className="flex items-start gap-3">
                <CheckCircle
                  className="text-green-600 flex-shrink-0 mt-1"
                  size={20}
                />
                <div>
                  <h3 className="font-semibold">Paiement à la livraison</h3>
                  <p className="text-sm">
                    Payez en espèces lors de la réception de votre commande
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle
                  className="text-green-600 flex-shrink-0 mt-1"
                  size={20}
                />
                <div>
                  <h3 className="font-semibold">Paiement mobile</h3>
                  <p className="text-sm">
                    MTN Mobile Money, Moov Money (bientôt disponible)
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Retours
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Vous disposez de 14 jours pour retourner un article qui ne vous
              convient pas.
            </p>
            <Link
              href="/politique-retour"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Voir notre politique de retour complète →
            </Link>
          </Card>
        </StaggerContainer>

        <div className="mt-8 text-center space-x-4">
          <Link
            href="/contact"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Une question ? Contactez-nous →
          </Link>
          <span className="text-gray-400">|</span>
          <Link
            href="/"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </main>
  );
}
