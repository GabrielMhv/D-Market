"use client";

import Link from "next/link";
import Card from "@/components/ui/Card";
import { FadeIn, StaggerContainer } from "@/components/ui/Motion";
import { RotateCcw, Package, Clock, CreditCard } from "lucide-react";

export default function PolitiqueRetourPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <FadeIn className="mb-8">
          <h1 className="text-4xl font-display font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent mb-2 flex items-center gap-3">
            <RotateCcw className="text-primary-600" size={40} />
            Politique de Retour
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Conditions de retour et de remboursement
          </p>
        </FadeIn>

        <StaggerContainer className="space-y-6">
          <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Clock className="text-primary-600" size={24} />
              Délai de rétractation
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Vous disposez d'un délai de <strong>14 jours</strong> à compter de
              la réception de votre commande pour exercer votre droit de
              rétractation sans avoir à justifier de motifs ni à payer de
              pénalités.
            </p>
            <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
              <p className="text-sm text-primary-900 dark:text-primary-100">
                <strong>Important :</strong> Les produits doivent être retournés
                dans leur état d'origine, non portés, non lavés, avec toutes les
                étiquettes.
              </p>
            </div>
          </Card>

          <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Package className="text-primary-600" size={24} />
              Conditions de retour
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <div>
                <h3 className="font-semibold mb-2">
                  ✅ Produits éligibles au retour :
                </h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Produits non portés et non lavés</li>
                  <li>Étiquettes d'origine attachées</li>
                  <li>Emballage d'origine intact</li>
                  <li>Aucun signe d'utilisation</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">
                  ❌ Produits non éligibles au retour :
                </h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    Sous-vêtements et maillots de bain (pour raisons d'hygiène)
                  </li>
                  <li>Produits personnalisés ou sur mesure</li>
                  <li>Produits soldés (sauf défaut)</li>
                  <li>Produits endommagés par le client</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Procédure de retour
            </h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Contactez-nous
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Envoyez un email à{" "}
                    <a
                      href="mailto:retours@e-shop.bj"
                      className="text-primary-600 hover:underline"
                    >
                      retours@e-shop.bj
                    </a>{" "}
                    avec votre numéro de commande.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Préparez le colis
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Emballez soigneusement les articles dans leur emballage
                    d'origine.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Expédiez le colis
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Envoyez le colis à l'adresse que nous vous communiquerons.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Recevez votre remboursement
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Sous 7 à 10 jours après réception et vérification du colis.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <CreditCard className="text-primary-600" size={24} />
              Remboursement
            </h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              <p>
                Le remboursement sera effectué dans un délai de{" "}
                <strong>7 à 10 jours ouvrés</strong> après réception et
                vérification des articles retournés.
              </p>
              <p>
                Le remboursement sera effectué par le même moyen de paiement que
                celui utilisé lors de l'achat.
              </p>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                <p className="text-sm text-orange-900 dark:text-orange-100">
                  <strong>Note :</strong> Les frais de retour sont à la charge
                  du client, sauf en cas de produit défectueux ou d'erreur de
                  notre part.
                </p>
              </div>
            </div>
          </Card>

          <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Échange
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Si vous souhaitez échanger un article (taille, couleur), veuillez
              nous contacter à{" "}
              <a
                href="mailto:contact@e-shop.bj"
                className="text-primary-600 hover:underline"
              >
                contact@e-shop.bj
              </a>
              . Nous vous guiderons dans la procédure d'échange.
            </p>
          </Card>

          <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Produits défectueux
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Si vous recevez un produit défectueux ou endommagé, veuillez nous
              contacter immédiatement avec des photos du produit.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Nous prendrons en charge les frais de retour et vous proposerons
              un remplacement ou un remboursement complet.
            </p>
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
