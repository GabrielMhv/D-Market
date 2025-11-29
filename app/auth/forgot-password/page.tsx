"use client";

import { useState } from "react";
import Link from "next/link";
import { resetPassword } from "@/lib/firebase/auth";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Mail, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await resetPassword(email);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Erreur lors de l'envoi de l'email");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo/Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-display font-bold gradient-text mb-2">
            E-Shop
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Réinitialisez votre mot de passe
          </p>
        </div>

        {/* Card */}
        <Card className="glass">
          {!success ? (
            <>
              <div className="flex items-center gap-2 mb-6">
                <Mail
                  className="text-primary-600 dark:text-primary-400"
                  size={24}
                />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Mot de passe oublié
                </h2>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Entrez votre adresse email et nous vous enverrons un lien pour
                réinitialiser votre mot de passe.
              </p>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {error}
                  </p>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  required
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full gap-2"
                  isLoading={isLoading}
                >
                  <Mail size={20} />
                  Envoyer le lien
                </Button>
              </form>
            </>
          ) : (
            <>
              {/* Success State */}
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle
                    size={32}
                    className="text-green-600 dark:text-green-400"
                  />
                </div>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Email envoyé !
                </h2>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  Nous avons envoyé un lien de réinitialisation à{" "}
                  <strong>{email}</strong>. Vérifiez votre boîte de réception.
                </p>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-6">
                  <p className="text-xs text-blue-800 dark:text-blue-300">
                    💡 <strong>Astuce :</strong> Si vous ne voyez pas l'email,
                    vérifiez votre dossier spam.
                  </p>
                </div>
              </div>
            </>
          )}

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <Link
              href="/auth/login"
              className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
            >
              ← Retour à la connexion
            </Link>
          </div>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
          >
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </main>
  );
}
