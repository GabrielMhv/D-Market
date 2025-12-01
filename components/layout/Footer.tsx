"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { useSettings } from "@/lib/context/SettingsContext";

export default function Footer() {
  const { settings } = useSettings();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* À propos */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">
              {settings.shopName}
            </h3>
            <p className="text-sm mb-4">
              Votre boutique en ligne de vêtements et accessoires de qualité au
              Bénin.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Liens rapides</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/boutique"
                  className="hover:text-primary-400 transition-colors"
                >
                  Boutique
                </Link>
              </li>
              <li>
                <Link
                  href="/a-propos"
                  className="hover:text-primary-400 transition-colors"
                >
                  À propos
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-primary-400 transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Informations */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Informations</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/livraison"
                  className="hover:text-primary-400 transition-colors"
                >
                  Livraison & Retours
                </Link>
              </li>
              <li>
                <Link
                  href="/guide-tailles"
                  className="hover:text-primary-400 transition-colors"
                >
                  Guide des tailles
                </Link>
              </li>
              <li>
                <Link
                  href="/paiement-securise"
                  className="hover:text-primary-400 transition-colors"
                >
                  Paiement sécurisé
                </Link>
              </li>
              <li>
                <Link
                  href="/politique-retour"
                  className="hover:text-primary-400 transition-colors"
                >
                  Politique de retour
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin
                  size={18}
                  className="flex-shrink-0 mt-0.5 text-primary-400"
                />
                <span>{settings.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} className="text-primary-400" />
                <a
                  href={`tel:${settings.contactPhone}`}
                  className="hover:text-primary-400 transition-colors"
                >
                  {settings.contactPhone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="text-primary-400" />
                <a
                  href={`mailto:${settings.contactEmail}`}
                  className="hover:text-primary-400 transition-colors"
                >
                  {settings.contactEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Liens légaux */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>
              &copy; {new Date().getFullYear()} {settings.shopName}. Tous droits
              réservés.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/mentions-legales"
                className="hover:text-primary-400 transition-colors"
              >
                Mentions légales
              </Link>
              <Link
                href="/politique-confidentialite"
                className="hover:text-primary-400 transition-colors"
              >
                Politique de confidentialité
              </Link>
              <Link
                href="/cgv"
                className="hover:text-primary-400 transition-colors"
              >
                CGV
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
