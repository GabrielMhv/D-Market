"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUp } from "@/lib/firebase/auth";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { UserPlus, Mail, Lock, User, Phone } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Le nom est requis";
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email invalide";
    }

    if (
      formData.phone &&
      !/^[0-9]{8,}$/.test(formData.phone.replace(/\s/g, ""))
    ) {
      newErrors.phone = "Numéro de téléphone invalide";
    }

    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 6 caractères";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await signUp(
        formData.email,
        formData.password,
        formData.name,
        formData.phone
      );
      router.push("/compte");
    } catch (err: any) {
      setErrors({ general: err.message || "Erreur lors de l'inscription" });
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
            Créez votre compte gratuitement
          </p>
        </div>

        {/* Register Card */}
        <Card className="glass">
          <div className="flex items-center gap-2 mb-6">
            <UserPlus
              className="text-primary-600 dark:text-primary-400"
              size={24}
            />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Inscription
            </h2>
          </div>

          {/* Error Message */}
          {errors.general && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">
                {errors.general}
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Nom complet"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              error={errors.name}
              placeholder="Jean Dupont"
              required
            />

            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              error={errors.email}
              placeholder="votre@email.com"
              required
            />

            <Input
              label="Téléphone (optionnel)"
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              error={errors.phone}
              placeholder="97123456"
              helperText="Utile pour les notifications de commande"
            />

            <Input
              label="Mot de passe"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              error={errors.password}
              placeholder="••••••••"
              helperText="Minimum 6 caractères"
              required
            />

            <Input
              label="Confirmer le mot de passe"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              error={errors.confirmPassword}
              placeholder="••••••••"
              required
            />

            {/* Terms */}
            <div className="text-xs text-gray-600 dark:text-gray-400">
              En créant un compte, vous acceptez nos{" "}
              <Link
                href="/cgv"
                className="text-primary-600 dark:text-primary-400 hover:underline"
              >
                Conditions Générales de Vente
              </Link>{" "}
              et notre{" "}
              <Link
                href="/politique-confidentialite"
                className="text-primary-600 dark:text-primary-400 hover:underline"
              >
                Politique de Confidentialité
              </Link>
              .
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full gap-2"
              isLoading={isLoading}
            >
              <UserPlus size={20} />
              Créer mon compte
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                Déjà un compte ?
              </span>
            </div>
          </div>

          {/* Login Link */}
          <Link href="/auth/login">
            <Button variant="outline" size="lg" className="w-full">
              Se connecter
            </Button>
          </Link>
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
