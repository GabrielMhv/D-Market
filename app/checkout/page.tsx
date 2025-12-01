"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/context/CartContext";
import { createOrder } from "@/lib/firebase/firestore";
import { getCurrentUser } from "@/lib/firebase/auth";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { FadeIn, StaggerContainer } from "@/components/ui/Motion";
import {
  ShoppingBag,
  Truck,
  CreditCard,
  Package,
  CheckCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import { DeliveryAddress } from "@/types";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, getCartTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);

  const [deliveryForm, setDeliveryForm] = useState<DeliveryAddress>({
    name: "",
    phone: "",
    address: "",
    city: "Cotonou",
    country: "Bénin",
  });

  const [formErrors, setFormErrors] = useState<Partial<DeliveryAddress>>({});

  const subtotal = getCartTotal();
  const deliveryFee = 1000;
  const total = subtotal + deliveryFee;

  const validateForm = (): boolean => {
    const errors: Partial<DeliveryAddress> = {};
    if (!deliveryForm.name.trim()) errors.name = "Le nom est requis";
    if (!deliveryForm.phone.trim()) errors.phone = "Le téléphone est requis";
    else if (!/^[0-9]{8,}$/.test(deliveryForm.phone.replace(/\s/g, ""))) {
      errors.phone = "Numéro de téléphone invalide";
    }
    if (!deliveryForm.address.trim()) errors.address = "L'adresse est requise";
    if (!deliveryForm.city.trim()) errors.city = "La ville est requise";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1 && validateForm()) setStep(2);
  };

  const handleCreateOrder = async () => {
    setIsProcessing(true);
    try {
      const user = await getCurrentUser();
      if (!user) {
        toast.error("Vous devez être connecté pour passer commande");
        router.push("/auth/login");
        return;
      }

      const orderId = await createOrder({
        user_id: user.uid,
        products: cart,
        total,
        status: "pending",
        delivery_address: deliveryForm,
        payment_method: "cash_on_delivery",
      });

      clearCart();
      toast.success("Commande créée avec succès !");
      router.push(`/confirmation?orderId=${orderId}`);
    } catch (error: any) {
      console.error("Erreur création commande:", error);
      toast.error("Erreur lors de la création de la commande");
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-12 px-4">
        <FadeIn className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <ShoppingBag size={48} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Votre panier est vide
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Ajoutez des produits pour passer commande
          </p>
          <Button onClick={() => router.push("/boutique")}>
            Découvrir la boutique
          </Button>
        </FadeIn>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <FadeIn className="mb-8">
          <h1 className="text-4xl font-display font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent mb-2">
            Finaliser la commande
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Complétez vos informations de livraison
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="mb-8">
          <div className="flex items-center justify-center gap-4">
            <div
              className={`flex items-center gap-2 ${
                step >= 1 ? "text-primary-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= 1
                    ? "bg-primary-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                {step > 1 ? <CheckCircle size={20} /> : "1"}
              </div>
              <span className="font-medium hidden sm:inline">Livraison</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-200 dark:bg-gray-700"></div>
            <div
              className={`flex items-center gap-2 ${
                step >= 2 ? "text-primary-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= 2
                    ? "bg-primary-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                2
              </div>
              <span className="font-medium hidden sm:inline">Confirmation</span>
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {step === 1 ? (
              <FadeIn delay={0.2}>
                <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <Truck className="text-primary-600" size={24} />
                    Informations de livraison
                  </h2>
                  <StaggerContainer className="space-y-4">
                    <Input
                      label="Nom complet"
                      value={deliveryForm.name}
                      onChange={(e) =>
                        setDeliveryForm({
                          ...deliveryForm,
                          name: e.target.value,
                        })
                      }
                      error={formErrors.name}
                      required
                    />
                    <Input
                      label="Téléphone"
                      type="tel"
                      value={deliveryForm.phone}
                      onChange={(e) =>
                        setDeliveryForm({
                          ...deliveryForm,
                          phone: e.target.value,
                        })
                      }
                      placeholder="+229 XX XX XX XX"
                      error={formErrors.phone}
                      required
                    />
                    <Input
                      label="Adresse complète"
                      value={deliveryForm.address}
                      onChange={(e) =>
                        setDeliveryForm({
                          ...deliveryForm,
                          address: e.target.value,
                        })
                      }
                      placeholder="Rue, quartier, repères..."
                      error={formErrors.address}
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Ville"
                        value={deliveryForm.city}
                        onChange={(e) =>
                          setDeliveryForm({
                            ...deliveryForm,
                            city: e.target.value,
                          })
                        }
                        error={formErrors.city}
                        required
                      />
                      <Input
                        label="Pays"
                        value={deliveryForm.country}
                        onChange={(e) =>
                          setDeliveryForm({
                            ...deliveryForm,
                            country: e.target.value,
                          })
                        }
                        disabled
                      />
                    </div>
                    <Button
                      onClick={handleNextStep}
                      className="w-full"
                      size="lg"
                    >
                      Continuer vers le paiement
                    </Button>
                  </StaggerContainer>
                </Card>
              </FadeIn>
            ) : (
              <FadeIn delay={0.2}>
                <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <CreditCard className="text-primary-600" size={24} />
                    Mode de paiement
                  </h2>
                  <div className="space-y-4">
                    <div className="p-4 border-2 border-primary-600 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full border-2 border-primary-600 flex items-center justify-center">
                          <div className="w-3 h-3 rounded-full bg-primary-600"></div>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            Paiement à la livraison
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Payez en espèces lors de la réception
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Button
                        variant="outline"
                        onClick={() => setStep(1)}
                        className="flex-1"
                      >
                        Retour
                      </Button>
                      <Button
                        onClick={handleCreateOrder}
                        isLoading={isProcessing}
                        className="flex-1"
                        size="lg"
                      >
                        Confirmer la commande
                      </Button>
                    </div>
                  </div>
                </Card>
              </FadeIn>
            )}
          </div>

          <div className="space-y-6">
            <FadeIn delay={0.3}>
              <Card className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Package size={20} />
                  Récapitulatif
                </h3>
                <div className="space-y-3 mb-6">
                  {cart.map((item) => (
                    <div
                      key={`${item.product_id}-${item.size}`}
                      className="flex gap-3"
                    >
                      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-gray-900 dark:text-white truncate">
                          {item.product_name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Qté: {item.quantity}{" "}
                          {item.size && `• Taille: ${item.size}`}
                        </p>
                        <p className="text-sm font-semibold text-primary-600">
                          {(item.price * item.quantity).toLocaleString("fr-FR")}{" "}
                          FCFA
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Sous-total
                    </span>
                    <span className="font-medium">
                      {subtotal.toLocaleString("fr-FR")} FCFA
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Livraison
                    </span>
                    <span className="font-medium">
                      {deliveryFee.toLocaleString("fr-FR")} FCFA
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span>Total</span>
                    <span className="text-primary-600">
                      {total.toLocaleString("fr-FR")} FCFA
                    </span>
                  </div>
                </div>
              </Card>
            </FadeIn>
          </div>
        </div>
      </div>
    </main>
  );
}
