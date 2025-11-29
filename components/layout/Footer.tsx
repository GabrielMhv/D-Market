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

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* À propos */}
          <div>
            <h3 className="text-2xl font-display font-bold gradient-text mb-4">
              E-Shop
            </h3>
            <p className="text-sm mb-4">
              Votre boutique en ligne pour vêtements et accessoires de qualité
              au Bénin.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h4 className="font-semibold text-white mb-4">Liens Rapides</h4>
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

          {/* Informations légales */}
          <div>
            <h4 className="font-semibold text-white mb-4">Informations</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/cgv"
                  className="hover:text-primary-400 transition-colors"
                >
                  CGV
                </Link>
              </li>
              <li>
                <Link
                  href="/politique-confidentialite"
                  className="hover:text-primary-400 transition-colors"
                >
                  Politique de confidentialité
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
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Cotonou, Bénin</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <span>+229 XX XX XX XX</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <span>contact@eshop.bj</span>
              </li>
            </ul>
            <div className="mt-4">
              <p className="text-xs font-semibold mb-2">
                Paiement Mobile Money
              </p>
              <div className="flex gap-2">
                <span className="text-xs bg-yellow-600 px-2 py-1 rounded">
                  MTN
                </span>
                <span className="text-xs bg-blue-600 px-2 py-1 rounded">
                  Moov
                </span>
                <span className="text-xs bg-green-600 px-2 py-1 rounded">
                  Celtiis
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} E-Shop Bénin. Tous droits
            réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
