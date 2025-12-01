"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getCurrentUser,
  updateUserProfile,
  updateUserPassword,
  getUserData,
} from "@/lib/firebase/auth";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { FadeIn, StaggerContainer } from "@/components/ui/Motion";
import { Settings, User, Mail, Phone, Lock, Save } from "lucide-react";
import toast from "react-hot-toast";

export default function ParametresPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const loadUserData = async () => {
      const user = await getCurrentUser();
      if (user) {
        const userData = await getUserData(user.uid);
        if (userData) {
          setFormData((prev) => ({
            ...prev,
            name: userData.name || user.displayName || "",
            email: userData.email || user.email || "",
            phone: userData.phone || "",
          }));
        }
      }
    };
    loadUserData();
  }, []);

  const handleSaveProfile = async () => {
    setIsLoading(true);
    try {
      const user = await getCurrentUser();
      if (!user) {
        toast.error("Vous devez être connecté");
        return;
      }

      await updateUserProfile(user.uid, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      });

      toast.success("Profil mis à jour avec succès !");
    } catch (error: any) {
      toast.error(error.message || "Erreur lors de la mise à jour");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }
    if (formData.newPassword.length < 6) {
      toast.error("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    setIsLoading(true);
    try {
      await updateUserPassword(formData.newPassword);
      toast.success("Mot de passe modifié avec succès !");
      setFormData({
        ...formData,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      if (error.message.includes("requires-recent-login")) {
        toast.error(
          "Par sécurité, veuillez vous reconnecter avant de changer votre mot de passe"
        );
      } else {
        toast.error("Erreur lors du changement de mot de passe");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <FadeIn className="mb-8">
          <h1 className="text-4xl font-display font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent mb-2 flex items-center gap-3">
            <Settings className="text-primary-600" size={40} />
            Paramètres du compte
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gérez vos informations personnelles
          </p>
        </FadeIn>

        <StaggerContainer className="space-y-6">
          <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <User className="text-primary-600" size={24} />
              Informations personnelles
            </h2>
            <div className="space-y-4">
              <Input
                label="Nom complet"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Votre nom"
              />
              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="votre@email.com"
              />
              <Input
                label="Téléphone"
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="+229 XX XX XX XX"
              />
              <Button
                onClick={handleSaveProfile}
                isLoading={isLoading}
                className="w-full sm:w-auto"
              >
                <Save size={18} className="mr-2" />
                Enregistrer les modifications
              </Button>
            </div>
          </Card>

          <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Lock className="text-primary-600" size={24} />
              Changer le mot de passe
            </h2>
            <div className="space-y-4">
              <Input
                label="Mot de passe actuel"
                type="password"
                value={formData.currentPassword}
                onChange={(e) =>
                  setFormData({ ...formData, currentPassword: e.target.value })
                }
                placeholder="••••••••"
              />
              <Input
                label="Nouveau mot de passe"
                type="password"
                value={formData.newPassword}
                onChange={(e) =>
                  setFormData({ ...formData, newPassword: e.target.value })
                }
                placeholder="••••••••"
              />
              <Input
                label="Confirmer le nouveau mot de passe"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                placeholder="••••••••"
              />
              <Button
                onClick={handleChangePassword}
                isLoading={isLoading}
                variant="outline"
                className="w-full sm:w-auto"
              >
                Changer le mot de passe
              </Button>
            </div>
          </Card>

          <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-red-200 dark:border-red-800">
            <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
              Zone de danger
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              La suppression de votre compte est irréversible. Toutes vos
              données seront définitivement supprimées.
            </p>
            <Button
              variant="outline"
              className="border-red-500 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              Supprimer mon compte
            </Button>
          </Card>
        </StaggerContainer>
      </div>
    </main>
  );
}
