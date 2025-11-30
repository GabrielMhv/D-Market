"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ShoppingBag,
  Star,
  Truck,
  ShieldCheck,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { FadeIn, SlideIn, StaggerContainer } from "@/components/ui/Motion";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop"
            alt="Hero Background"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <FadeIn>
              <span className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6">
                Nouvelle Collection 2024
              </span>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
                L'Élégance <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">
                  Redéfinie
                </span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.4}>
              <p className="text-xl text-gray-300 mb-8 max-w-xl leading-relaxed">
                Découvrez notre sélection exclusive de vêtements et accessoires
                pour un style unique qui vous ressemble.
              </p>
            </FadeIn>
            <FadeIn delay={0.6} className="flex flex-wrap gap-4">
              <Link href="/boutique">
                <Button size="lg" className="rounded-full px-8">
                  Découvrir la collection
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/a-propos">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-8 border-white text-white hover:bg-white hover:text-gray-900"
                >
                  Notre Histoire
                </Button>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeIn className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-primary-600">
                <Truck size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Livraison Rapide</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Livraison gratuite à partir de 50.000 FCFA d'achat partout au
                Bénin.
              </p>
            </FadeIn>
            <FadeIn className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-secondary-100 dark:bg-secondary-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-secondary-600">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Paiement Sécurisé</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Paiement par Mobile Money ou Carte Bancaire 100% sécurisé.
              </p>
            </FadeIn>
            <FadeIn className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                <Star size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Qualité Premium</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Des produits sélectionnés avec soin pour une qualité
                irréprochable.
              </p>
            </FadeIn>
          </StaggerContainer>
        </div>
      </section>

      {/* Featured Products Preview */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Nos Coups de Cœur
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Les articles les plus populaires du moment
              </p>
            </div>
            <Link href="/boutique" className="hidden md:block">
              <Button variant="ghost" className="group">
                Voir tout
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Placeholder for dynamic products - ideally fetched */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} hover glass className="group overflow-hidden">
                <div className="relative aspect-[3/4] mb-4 rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    Produit {i}
                  </div>
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button className="rounded-full">Voir le produit</Button>
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-1">Nom du Produit</h3>
                <p className="text-primary-600 font-bold">15.000 FCFA</p>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/boutique">
              <Button variant="outline" className="w-full">
                Voir tout les produits
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto bg-primary-600 rounded-3xl p-8 md:p-16 text-center text-white overflow-hidden relative">
            {/* Decorative circles */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary-500/20 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 relative z-10">
              Restez à l'affût
            </h2>
            <p className="text-primary-100 mb-8 max-w-xl mx-auto relative z-10">
              Inscrivez-vous à notre newsletter pour recevoir nos dernières
              offres et nouveautés en exclusivité.
            </p>
            <form className="flex flex-col md:flex-row gap-4 max-w-md mx-auto relative z-10">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-primary-200 focus:outline-none focus:bg-white/20 transition-colors"
              />
              <button className="px-8 py-3 rounded-full bg-white text-primary-600 font-bold hover:bg-gray-100 transition-colors shadow-lg">
                S'inscrire
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
