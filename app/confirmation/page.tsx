"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { CheckCircle, Package, Home } from "lucide-react";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  if (!orderId) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Aucune commande trouvée
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="text-center">
          {/* Succès */}
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle
                size={48}
                className="text-green-600 dark:text-green-400"
              />
            </div>
            <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">
              Commande créée !
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Votre commande a été enregistrée avec succès
            </p>
          </div>

          {/* Numéro de commande */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Numéro de commande
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {orderId}
            </p>
          </div>

          {/* Informations */}
          <div className="text-left space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <Package
                className="text-primary-600 dark:text-primary-400 mt-1"
                size={20}
              />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Que se passe-t-il ensuite ?
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Vous recevrez un email de confirmation avec les détails de
                  votre commande. Nous vous contacterons pour finaliser le
                  paiement et la livraison.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle
                className="text-primary-600 dark:text-primary-400 mt-1"
                size={20}
              />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Suivi de commande
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Vous pouvez suivre l'état de votre commande depuis votre
                  espace client.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/compte/commandes" className="flex-1">
              <Button variant="primary" size="lg" className="w-full">
                Voir ma commande
              </Button>
            </Link>
            <Link href="/" className="flex-1">
              <Button variant="outline" size="lg" className="w-full gap-2">
                <Home size={20} />
                Retour à l'accueil
              </Button>
            </Link>
          </div>
        </Card>

        {/* Support */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Besoin d'aide ?{" "}
            <Link
              href="/contact"
              className="text-primary-600 dark:text-primary-400 hover:underline"
            >
              Contactez notre support
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
        </main>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
