import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { ShoppingBag, Truck, Shield, CreditCard } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <Badge variant="info" className="mb-6">
              🎉 Nouveau site e-commerce
            </Badge>

            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 gradient-text">
              Mode & Style au Bénin
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8">
              Découvrez notre collection de vêtements et accessoires de qualité
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Link href="/boutique">
                <Button size="lg" className="gap-2">
                  <ShoppingBag size={20} />
                  Découvrir la boutique
                </Button>
              </Link>
              <Link href="/boutique/nouveautes">
                <Button variant="outline" size="lg">
                  Voir les nouveautés
                </Button>
              </Link>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="glass px-4 py-3 rounded-xl">
                <Truck className="mx-auto mb-2 text-primary-600" size={24} />
                <p className="text-sm font-semibold">Livraison rapide</p>
              </div>
              <div className="glass px-4 py-3 rounded-xl">
                <Shield className="mx-auto mb-2 text-primary-600" size={24} />
                <p className="text-sm font-semibold">Paiement sécurisé</p>
              </div>
              <div className="glass px-4 py-3 rounded-xl">
                <CreditCard
                  className="mx-auto mb-2 text-primary-600"
                  size={24}
                />
                <p className="text-sm font-semibold">Mobile Money</p>
              </div>
              <div className="glass px-4 py-3 rounded-xl">
                <ShoppingBag
                  className="mx-auto mb-2 text-primary-600"
                  size={24}
                />
                <p className="text-sm font-semibold">Qualité garantie</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-display font-bold text-center mb-12">
            Nos Catégories
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/boutique/hommes">
              <Card hover className="text-center">
                <div className="text-6xl mb-4">👔</div>
                <h3 className="text-2xl font-bold mb-2">Hommes</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Vêtements et accessoires pour hommes
                </p>
              </Card>
            </Link>

            <Link href="/boutique/femmes">
              <Card hover className="text-center">
                <div className="text-6xl mb-4">👗</div>
                <h3 className="text-2xl font-bold mb-2">Femmes</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Vêtements et accessoires pour femmes
                </p>
              </Card>
            </Link>

            <Link href="/boutique/accessoires">
              <Card hover className="text-center">
                <div className="text-6xl mb-4">👜</div>
                <h3 className="text-2xl font-bold mb-2">Accessoires</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Sacs, chaussures, bijoux et plus
                </p>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Mobile Money Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-display font-bold mb-6">
              Paiement Mobile Money
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-12">
              Payez facilement avec votre opérateur mobile préféré
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card glass className="text-center">
                <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">M</span>
                </div>
                <h3 className="text-xl font-bold mb-2">MTN Mobile Money</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Paiement rapide et sécurisé
                </p>
              </Card>

              <Card glass className="text-center">
                <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">M</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Moov Money</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Simple et efficace
                </p>
              </Card>

              <Card glass className="text-center">
                <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">C</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Celtiis Cash</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Transactions instantanées
                </p>
              </Card>
            </div>

            <div className="mt-12">
              <Badge variant="success" size="lg">
                Propulsé par FedaPay
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-display font-bold mb-6">
            Prêt à faire vos achats ?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers de clients satisfaits et découvrez notre
            collection exclusive
          </p>
          <Link href="/boutique">
            <Button size="lg" className="gap-2">
              <ShoppingBag size={20} />
              Commencer mes achats
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
