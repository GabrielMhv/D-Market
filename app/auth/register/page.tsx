"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUp } from "@/lib/firebase/auth";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { FadeIn } from "@/components/ui/Motion";
import {
  UserPlus,
  Mail,
  Lock,
  User,
  Phone,
  ArrowRight,
  Sparkles,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
      router.push("/");
    } catch (err: any) {
      setErrors({ general: err.message || "Erreur lors de l'inscription" });
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength =
    formData.password.length >= 8
      ? "Fort"
      : formData.password.length >= 6
      ? "Moyen"
      : "Faible";
  const passwordColor =
    formData.password.length >= 8
      ? "text-green-600"
      : formData.password.length >= 6
      ? "text-yellow-600"
      : "text-red-600";

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 -left-1/4 w-96 h-96 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-3xl"
        />
      </div>

      <FadeIn className="w-full max-w-md relative z-10">
        {/* Logo/Title */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl mb-4 shadow-lg"
          >
            <Sparkles className="text-white" size={32} />
          </motion.div>
          <h1 className="text-4xl font-display font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent mb-2">
            Créer un compte
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Rejoignez-nous en quelques secondes
          </p>
        </div>

        {/* Register Card */}
        <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-white/20 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <UserPlus
                className="text-green-600 dark:text-green-400"
                size={24}
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Inscription
            </h2>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {errors.general && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl"
              >
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errors.general}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Nom complet"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Jean Dupont"
              error={errors.name}
              required
            />

            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="jean@exemple.com"
              error={errors.email}
              required
            />

            <Input
              label="Téléphone (optionnel)"
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="+229 XX XX XX XX"
              error={errors.phone}
            />

            <div>
              <Input
                label="Mot de passe"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="••••••••"
                error={errors.password}
                required
              />
              {formData.password && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`text-xs mt-1 ${passwordColor}`}
                >
                  Force : {passwordStrength}
                </motion.p>
              )}
            </div>

            <Input
              label="Confirmer le mot de passe"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              placeholder="••••••••"
              error={errors.confirmPassword}
              required
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full gap-2 group"
              isLoading={isLoading}
              size="lg"
            >
              <span>Créer mon compte</span>
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                Déjà inscrit ?
              </span>
            </div>
          </div>

          {/* Login Link */}
          <Link href="/auth/login">
            <Button variant="outline" className="w-full" size="lg">
              Se connecter
            </Button>
          </Link>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            ← Retour à l'accueil
          </Link>
        </div>
      </FadeIn>
    </main>
  );
}
