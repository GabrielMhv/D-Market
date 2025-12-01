"use client";

import Link from "next/link";
import Card from "@/components/ui/Card";
import { FadeIn, StaggerContainer } from "@/components/ui/Motion";
import { Scale, Building, Mail, Phone, MapPin } from "lucide-react";

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <FadeIn className="mb-8">
          <h1 className="text-4xl font-display font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent mb-2 flex items-center gap-3">
            <Scale className="text-primary-600" size={40} />
            Mentions Légales
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Informations légales et réglementaires
          </p>
        </FadeIn>

        <StaggerContainer className="space-y-6">
          <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Building className="text-primary-600" size={24} />
              Éditeur du site
            </h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              <p>
                <strong>Raison sociale :</strong> E-Shop SARL
              </p>
              <p>
                <strong>Forme juridique :</strong> Société à Responsabilité
                Limitée
              </p>
              <p>
                <strong>Capital social :</strong> 1 000 000 FCFA
              </p>
              <p>
                <strong>Siège social :</strong> Cotonou, Bénin
              </p>
              <p>
                <strong>RCCM :</strong> BJ-COT-01-2024-A12-00000
              </p>
              <p>
                <strong>IFU :</strong> 0000000000000
              </p>
            </div>
          </Card>

          <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Mail className="text-primary-600" size={24} />
              Contact
            </h2>
            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              <p className="flex items-center gap-2">
                <Mail size={18} className="text-primary-600" />
                <strong>Email :</strong> contact@e-shop.bj
              </p>
              <p className="flex items-center gap-2">
                <Phone size={18} className="text-primary-600" />
                <strong>Téléphone :</strong> +229 XX XX XX XX
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={18} className="text-primary-600" />
                <strong>Adresse :</strong> Cotonou, Bénin
              </p>
            </div>
          </Card>

          <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Directeur de la publication
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Nom :</strong> [Nom du directeur]
            </p>
          </Card>

          <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Hébergement
            </h2>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p>
                <strong>Hébergeur :</strong> Vercel Inc.
              </p>
              <p>
                <strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA
                91789, USA
              </p>
            </div>
          </Card>

          <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Propriété intellectuelle
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              L'ensemble de ce site relève de la législation béninoise et
              internationale sur le droit d'auteur et la propriété
              intellectuelle. Tous les droits de reproduction sont réservés, y
              compris pour les documents téléchargeables et les représentations
              iconographiques et photographiques.
            </p>
          </Card>

          <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Protection des données personnelles
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Conformément à la loi béninoise sur la protection des données
              personnelles, vous disposez d'un droit d'accès, de modification,
              de rectification et de suppression des données vous concernant.
            </p>
            <Link
              href="/politique-confidentialite"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Voir notre politique de confidentialité →
            </Link>
          </Card>

          <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Cookies
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Ce site utilise des cookies pour améliorer l'expérience
              utilisateur et analyser le trafic. En continuant à naviguer sur ce
              site, vous acceptez l'utilisation de cookies.
            </p>
          </Card>
        </StaggerContainer>

        <div className="mt-8 text-center">
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
