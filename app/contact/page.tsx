"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulate sending
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSending(false);
    alert("Message envoyé !");
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-6">
            Contactez-nous
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Une question ? Une suggestion ? N'hésitez pas à nous écrire.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold mb-6">Nos Coordonnées</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center text-primary-600 shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Adresse</p>
                    <p className="text-gray-600 dark:text-gray-400">
                      123 Rue du Commerce
                      <br />
                      Cotonou, Bénin
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center text-primary-600 shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Téléphone</p>
                    <p className="text-gray-600 dark:text-gray-400">
                      +229 01 23 45 67
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center text-primary-600 shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Email</p>
                    <p className="text-gray-600 dark:text-gray-400">
                      contact@eshop.bj
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold mb-4">Horaires</h3>
              <div className="space-y-2 text-gray-600 dark:text-gray-400">
                <div className="flex justify-between">
                  <span>Lundi - Vendredi</span>
                  <span>09:00 - 19:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Samedi</span>
                  <span>10:00 - 18:00</span>
                </div>
                <div className="flex justify-between text-red-500">
                  <span>Dimanche</span>
                  <span>Fermé</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm">
              <h2 className="text-2xl font-bold mb-6">
                Envoyez-nous un message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input label="Nom" placeholder="Votre nom" required />
                  <Input
                    label="Email"
                    type="email"
                    placeholder="votre@email.com"
                    required
                  />
                </div>
                <Input
                  label="Sujet"
                  placeholder="Sujet de votre message"
                  required
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    rows={6}
                    placeholder="Comment pouvons-nous vous aider ?"
                    required
                  ></textarea>
                </div>
                <Button
                  type="submit"
                  className="w-full md:w-auto gap-2"
                  isLoading={sending}
                >
                  <Send size={20} />
                  Envoyer le message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
