"use client";

import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { FadeIn, StaggerContainer } from "@/components/ui/Motion";
import { MapPin, Plus, Edit, Trash2, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import { DeliveryAddress, UserAddress } from "@/types";
import { getCurrentUser } from "@/lib/firebase/auth";
import {
  getUserAddresses,
  addUserAddress,
  deleteUserAddress,
  setDefaultAddress,
} from "@/lib/firebase/firestore";

export default function AdressesPage() {
  const [addresses, setAddresses] = useState<UserAddress[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  const [isAdding, setIsAdding] = useState(false);
  const [newAddress, setNewAddress] = useState<DeliveryAddress>({
    name: "",
    phone: "",
    address: "",
    city: "",
    country: "Bénin",
  });

  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    const user = await getCurrentUser();
    if (user) {
      setUserId(user.uid);
      const data = await getUserAddresses(user.uid);
      setAddresses(data as UserAddress[]);
    }
    setLoading(false);
  };

  const handleAddAddress = async () => {
    if (
      !newAddress.name ||
      !newAddress.phone ||
      !newAddress.address ||
      !newAddress.city
    ) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    if (!userId) {
      toast.error("Vous devez être connecté");
      return;
    }

    try {
      await addUserAddress(userId, { ...newAddress, isDefault: false });
      toast.success("Adresse ajoutée avec succès !");
      setNewAddress({
        name: "",
        phone: "",
        address: "",
        city: "",
        country: "Bénin",
      });
      setIsAdding(false);
      loadAddresses();
    } catch (error) {
      toast.error("Erreur lors de l'ajout de l'adresse");
    }
  };

  const handleSetDefault = async (id: string) => {
    if (!userId) return;
    try {
      await setDefaultAddress(userId, id);
      toast.success("Adresse par défaut mise à jour");
      loadAddresses();
    } catch (error) {
      toast.error("Erreur lors de la mise à jour");
    }
  };

  const handleDelete = async (id: string) => {
    if (!userId) return;
    const addressToDelete = addresses.find((a) => a.id === id);
    if (addressToDelete?.isDefault && addresses.length > 1) {
      toast.error("Vous ne pouvez pas supprimer l'adresse par défaut");
      return;
    }

    if (confirm("Êtes-vous sûr de vouloir supprimer cette adresse ?")) {
      try {
        await deleteUserAddress(userId, id);
        toast.success("Adresse supprimée");
        loadAddresses();
      } catch (error) {
        toast.error("Erreur lors de la suppression");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <FadeIn className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-display font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent mb-2 flex items-center gap-3">
                <MapPin className="text-primary-600" size={40} />
                Mes adresses
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Gérez vos adresses de livraison
              </p>
            </div>
            <Button
              onClick={() => setIsAdding(true)}
              className="hidden sm:flex"
            >
              <Plus size={18} className="mr-2" />
              Ajouter une adresse
            </Button>
          </div>
        </FadeIn>

        <StaggerContainer className="space-y-6">
          {isAdding && (
            <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-2 border-primary-200 dark:border-primary-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Nouvelle adresse
              </h2>
              <div className="space-y-4">
                <Input
                  label="Nom de l'adresse"
                  value={newAddress.name}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, name: e.target.value })
                  }
                  placeholder="Ex: Domicile, Bureau..."
                />
                <Input
                  label="Téléphone"
                  type="tel"
                  value={newAddress.phone}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, phone: e.target.value })
                  }
                  placeholder="+229 XX XX XX XX"
                />
                <Input
                  label="Adresse complète"
                  value={newAddress.address}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, address: e.target.value })
                  }
                  placeholder="Rue, quartier, repères..."
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Ville"
                    value={newAddress.city}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, city: e.target.value })
                    }
                    placeholder="Cotonou"
                  />
                  <Input
                    label="Pays"
                    value={newAddress.country}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, country: e.target.value })
                    }
                    disabled
                  />
                </div>
                <div className="flex gap-3">
                  <Button onClick={handleAddAddress} className="flex-1">
                    Enregistrer
                  </Button>
                  <Button
                    onClick={() => setIsAdding(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    Annuler
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {addresses.map((address) => (
            <Card
              key={address.id}
              className={`backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 ${
                address.isDefault ? "border-2 border-primary-600" : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {address.name}
                    </h3>
                    {address.isDefault && (
                      <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-medium rounded-full flex items-center gap-1">
                        <CheckCircle size={14} />
                        Par défaut
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-1">
                    {address.address}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {address.city}, {address.country}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {address.phone}
                  </p>
                </div>
                <div className="flex gap-2">
                  {!address.isDefault && (
                    <Button
                      onClick={() => handleSetDefault(address.id)}
                      variant="outline"
                      size="sm"
                    >
                      Définir par défaut
                    </Button>
                  )}
                  <Button
                    onClick={() => handleDelete(address.id)}
                    variant="outline"
                    size="sm"
                    className="text-red-600 border-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </Card>
          ))}

          {addresses.length === 0 && !isAdding && (
            <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 text-center py-12">
              <MapPin className="mx-auto mb-4 text-gray-400" size={48} />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Aucune adresse enregistrée
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Ajoutez une adresse de livraison pour faciliter vos commandes
              </p>
              <Button onClick={() => setIsAdding(true)}>
                <Plus size={18} className="mr-2" />
                Ajouter une adresse
              </Button>
            </Card>
          )}
        </StaggerContainer>

        <Button
          onClick={() => setIsAdding(true)}
          className="w-full mt-6 sm:hidden"
        >
          <Plus size={18} className="mr-2" />
          Ajouter une adresse
        </Button>
      </div>
    </main>
  );
}
