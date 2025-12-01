"use client";

import { useState } from "react";
import Link from "next/link";
import { resetPassword } from "@/lib/firebase/auth";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { FadeIn } from "@/components/ui/Motion";
import { Mail, ArrowLeft, CheckCircle, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await resetPassword(email);
      setEmailSent(true);
      toast.success("Email envoyé avec succès !");
    } catch (err: any) {
      toast.error(err.message || "Erreur lors de l'envoi de l'email");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 flex items-center justify-center py-12 px-4 relative overflow-hidden">
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
          className="absolute top-1/4 -left-1/4 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
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
          className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
        />
      </div>

      <FadeIn className="w-full max-w-md relative z-10">
        {/* Logo/Title */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-4 shadow-lg"
          >
            <Sparkles className="text-white" size={32} />
          </motion.div>
          <h1 className="text-4xl font-display font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900 dark:from-white dark:via-purple-200 dark:to-pink-200 bg-clip-text text-transparent mb-2">
            Mot de passe oublié ?
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Pas de souci, nous vous envoyons un lien de réinitialisation
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!emailSent ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-white/20 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <Mail
                      className="text-purple-600 dark:text-purple-400"
                      size={24}
                    />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Réinitialisation
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <Input
                    label="Adresse email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    required
                  />

                  <Button
                    type="submit"
                    className="w-full"
                    isLoading={isLoading}
                    size="lg"
                  >
                    Envoyer le lien
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <Link
                    href="/auth/login"
                    className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    <ArrowLeft size={16} />
                    Retour à la connexion
                  </Link>
                </div>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-white/20 shadow-2xl text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center"
                >
                  <CheckCircle className="text-white" size={40} />
                </motion.div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  Email envoyé !
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Nous avons envoyé un lien de réinitialisation à{" "}
                  <span className="font-semibold text-primary-600">
                    {email}
                  </span>
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  Vérifiez votre boîte de réception et suivez les instructions
                </p>

                <Link href="/auth/login">
                  <Button className="w-full" size="lg">
                    Retour à la connexion
                  </Button>
                </Link>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

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
