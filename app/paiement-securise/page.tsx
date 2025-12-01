"use client";

import Link from "next/link";
import Card from "@/components/ui/Card";
import { FadeIn, StaggerContainer } from "@/components/ui/Motion";
import { Shield, Lock, CreditCard, CheckCircle } from "lucide-react";

export default function PaiementSecurisePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <FadeIn className="mb-8">
          <h1 className="text-4xl font-display font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent mb-2 flex items-center gap-3">
            <Shield className="text-primary-600" size={40} />
            Paiement Sécurisé
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Vos transactions sont 100% sécurisées
          </p>
        </FadeIn>

        <StaggerContainer className="space-y-6">
          <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                <Lock className="text-green-600" size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Sécurité garantie
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Toutes vos données sont protégées
                </p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Nous utilisons les dernières technologies de cryptage SSL pour
              protéger vos informations personnelles et bancaires. Vos données
              sont transmises de manière sécurisée et ne sont jamais stockées
              sur nos serveurs.
            </p>
          </Card>

          <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <CreditCard className="text-primary-600" size={24} />
              Modes de paiement acceptés
            </h2>
            <div className="space-y-4">
              <div className="p-4 border-2 border-primary-200 dark:border-primary-800 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle className="text-green-600" size={24} />
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Paiement à la livraison
                  </h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Payez en espèces lors de la réception de votre commande.
                  Simple, rapide et sécurisé.
                </p>
              </div>

              <div className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl opacity-60">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-6 h-6 border-2 border-gray-400 rounded-full"></div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Mobile Money
                  </h3>
                  <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-2 py-1 rounded-full">
                    Bientôt disponible
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  MTN Mobile Money, Moov Money - Paiement mobile sécurisé
                  (prochainement)
                </p>
              </div>

              <div className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl opacity-60">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-6 h-6 border-2 border-gray-400 rounded-full"></div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Cartes bancaires
                  </h3>
                  <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-2 py-1 rounded-full">
                    Bientôt disponible
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Visa, Mastercard - Paiement par carte bancaire (prochainement)
                </p>
              </div>
            </div>
          </Card>

          <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Processus de paiement
            </h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Ajoutez vos articles au panier
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Sélectionnez vos produits préférés et ajoutez-les à votre
                    panier
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Renseignez vos informations
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Complétez vos informations de livraison de manière sécurisée
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Choisissez votre mode de paiement
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Sélectionnez le mode de paiement qui vous convient
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Confirmez votre commande
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Validez votre commande et recevez une confirmation par email
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Protection des données
            </h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              <p className="flex items-start gap-2">
                <CheckCircle
                  className="text-green-600 flex-shrink-0 mt-1"
                  size={20}
                />
                <span>Cryptage SSL 256 bits pour toutes les transactions</span>
              </p>
              <p className="flex items-start gap-2">
                <CheckCircle
                  className="text-green-600 flex-shrink-0 mt-1"
                  size={20}
                />
                <span>Aucune donnée bancaire stockée sur nos serveurs</span>
              </p>
              <p className="flex items-start gap-2">
                <CheckCircle
                  className="text-green-600 flex-shrink-0 mt-1"
                  size={20}
                />
                <span>
                  Conformité avec les normes de sécurité internationales
                </span>
              </p>
              <p className="flex items-start gap-2">
                <CheckCircle
                  className="text-green-600 flex-shrink-0 mt-1"
                  size={20}
                />
                <span>
                  Protection contre la fraude et les transactions non autorisées
                </span>
              </p>
            </div>
          </Card>

          <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Questions fréquentes
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Mes informations sont-elles en sécurité ?
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Oui, absolument. Nous utilisons le cryptage SSL pour protéger
                  toutes vos données personnelles et bancaires.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Puis-je annuler ma commande ?
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Oui, vous pouvez annuler votre commande tant qu'elle n'a pas
                  été expédiée. Contactez-nous rapidement.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Que faire en cas de problème de paiement ?
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Contactez notre service client à{" "}
                  <a
                    href="mailto:support@e-shop.bj"
                    className="text-primary-600 hover:underline"
                  >
                    support@e-shop.bj
                  </a>{" "}
                  pour une assistance immédiate.
                </p>
              </div>
            </div>
          </Card>
        </StaggerContainer>

        <div className="mt-8 text-center space-x-4">
          <Link
            href="/contact"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Nous contacter →
          </Link>
          <span className="text-gray-400">|</span>
          <Link
            href="/politique-confidentialite"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Politique de confidentialité →
          </Link>
        </div>
      </div>
    </main>
  );
}
