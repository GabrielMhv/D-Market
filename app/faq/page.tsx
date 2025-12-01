"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "Quels sont les délais de livraison ?",
    answer:
      "Nous livrons généralement sous 24 à 48 heures à Cotonou et ses environs. Pour les autres villes, comptez 2 à 4 jours ouvrables.",
  },
  {
    question: "Comment puis-je payer ma commande ?",
    answer:
      "Nous acceptons les paiements par Mobile Money (MTN, Moov), par carte bancaire (Visa, Mastercard) et le paiement à la livraison pour certaines zones.",
  },
  {
    question: "Puis-je retourner un article ?",
    answer:
      "Oui, vous disposez de 7 jours après réception pour retourner un article s'il ne vous convient pas, à condition qu'il soit dans son état d'origine.",
  },
  {
    question: "Avez-vous une boutique physique ?",
    answer:
      "Oui, notre showroom est situé au 123 Rue du Commerce à Cotonou. Vous pouvez venir essayer les articles sur place.",
  },
  {
    question: "Comment suivre ma commande ?",
    answer:
      "Une fois votre commande expédiée, vous recevrez un lien de suivi par SMS et Email. Vous pouvez aussi suivre le statut dans votre espace client.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-6">
            Questions Fréquentes
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Tout ce que vous devez savoir sur nos services
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm transition-all duration-200"
            >
              <button
                className="w-full flex items-center justify-between p-6 text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-bold text-lg text-gray-900 dark:text-white">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="text-primary-600" />
                ) : (
                  <ChevronDown className="text-gray-400" />
                )}
              </button>
              <div
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "max-h-48 pb-6 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
