"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CartItem, PaymentProvider, DeliveryAddress } from "@/types";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import MobileMoneySelector from "@/components/payment/MobileMoneySelector";
import { ShoppingBag, Truck, CreditCard, CheckCircle } from "lucide-react";
import axios from "axios";

// Données de démo pour le panier
const demoCartItems: CartItem[] = [
  {
    product_id: "1",
    product_name: "T-Shirt Premium Coton",
    product_image: "",
    quantity: 2,
    size: "M",
    color: "#000000",
    price: 8500,
  },
  {
    product_id: "2",
    product_name: "Robe Élégante",
    product_image: "",
    quantity: 1,
    price: 25000,
  },
];

export default function CheckoutPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Formulaire de livraison
  const [deliveryForm, setDeliveryForm] = useState<DeliveryAddress>({
    name: "",
    phone: "",
    address: "",
    city: "Cotonou",
    country: "Bénin",
  });

  const [formErrors, setFormErrors] = useState<Partial<DeliveryAddress>>({});
  const [selectedProvider, setSelectedProvider] = useState<PaymentProvider>();

  // Calculs
  const subtotal = demoCartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = 1000;
  const total = subtotal + deliveryFee;

  // Validation du formulaire
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

  // Passer à l'étape suivante
  const handleNextStep = () => {
    if (step === 1 && validateForm()) {
      setStep(2);
    } else if (step === 2 && selectedProvider) {
      setStep(3);
    }
  };

  // Traiter le paiement
  const handlePayment = async () => {
    if (!selectedProvider) return;

    setIsProcessing(true);

    try {
      // Créer la commande dans Firestore (à implémenter)
      const orderId = `ORDER-${Date.now()}`;

      // Créer la transaction FedaPay
      const response = await axios.post("/api/payment/create-transaction", {
        amount: total,
        description: `Commande ${orderId}`,
        customerEmail: "client@example.com", // À récupérer de l'auth
        customerPhone: deliveryForm.phone,
        customerName: deliveryForm.name,
        orderId,
      });

      if (response.data.success) {
        // Rediriger vers la page de paiement FedaPay
        window.location.href = response.data.checkoutUrl;
      }
    } catch (error: any) {
      console.error("Erreur paiement:", error);
      alert("Erreur lors du traitement du paiement. Veuillez réessayer.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-2">
            Finaliser la commande
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Complétez vos informations pour passer votre commande
          </p>
        </div>

        {/* Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            {[
              { num: 1, label: "Livraison", icon: Truck },
              { num: 2, label: "Paiement", icon: CreditCard },
              { num: 3, label: "Confirmation", icon: CheckCircle },
            ].map((s, index) => (
              <div key={s.num} className="flex items-center">
                <div
                  className={`
                    flex items-center gap-3 px-4 py-2 rounded-lg transition-all
                    ${
                      step >= s.num
                        ? "bg-primary-600 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                    }
                  `}
                >
                  <s.icon size={20} />
                  <span className="font-semibold hidden sm:inline">
                    {s.label}
                  </span>
                </div>
                {index < 2 && (
                  <div
                    className={`w-12 h-1 mx-2 ${
                      step > s.num
                        ? "bg-primary-600"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulaire */}
          <div className="lg:col-span-2">
            {/* Étape 1 : Livraison */}
            {step === 1 && (
              <Card>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <Truck size={24} />
                  Informations de livraison
                </h2>

                <div className="space-y-4">
                  <Input
                    label="Nom complet"
                    value={deliveryForm.name}
                    onChange={(e) =>
                      setDeliveryForm({ ...deliveryForm, name: e.target.value })
                    }
                    error={formErrors.name}
                    required
                  />

                  <Input
                    label="Numéro de téléphone"
                    type="tel"
                    value={deliveryForm.phone}
                    onChange={(e) =>
                      setDeliveryForm({
                        ...deliveryForm,
                        phone: e.target.value,
                      })
                    }
                    error={formErrors.phone}
                    helperText="Format: 01234567 ou 97123456"
                    required
                  />

                  <Input
                    label="Adresse de livraison"
                    value={deliveryForm.address}
                    onChange={(e) =>
                      setDeliveryForm({
                        ...deliveryForm,
                        address: e.target.value,
                      })
                    }
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

                    <Input label="Pays" value={deliveryForm.country} disabled />
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full mt-6"
                    onClick={handleNextStep}
                  >
                    Continuer vers le paiement
                  </Button>
                </div>
              </Card>
            )}

            {/* Étape 2 : Paiement */}
            {step === 2 && (
              <Card>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <CreditCard size={24} />
                  Mode de paiement
                </h2>

                <MobileMoneySelector
                  onSelect={setSelectedProvider}
                  selectedProvider={selectedProvider}
                />

                <div className="flex gap-4 mt-6">
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1"
                    onClick={() => setStep(1)}
                  >
                    Retour
                  </Button>
                  <Button
                    variant="primary"
                    size="lg"
                    className="flex-1"
                    onClick={handleNextStep}
                    disabled={!selectedProvider}
                  >
                    Continuer
                  </Button>
                </div>
              </Card>
            )}

            {/* Étape 3 : Confirmation */}
            {step === 3 && (
              <Card>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <CheckCircle size={24} />
                  Vérification et paiement
                </h2>

                <div className="space-y-6">
                  {/* Résumé livraison */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Adresse de livraison
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {deliveryForm.name}
                      <br />
                      {deliveryForm.phone}
                      <br />
                      {deliveryForm.address}
                      <br />
                      {deliveryForm.city}, {deliveryForm.country}
                    </p>
                  </div>

                  {/* Résumé paiement */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Mode de paiement
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedProvider === "mtn" && "MTN Mobile Money"}
                      {selectedProvider === "moov" && "Moov Money"}
                      {selectedProvider === "celtiis" && "Celtiis Cash"}
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      size="lg"
                      className="flex-1"
                      onClick={() => setStep(2)}
                      disabled={isProcessing}
                    >
                      Retour
                    </Button>
                    <Button
                      variant="primary"
                      size="lg"
                      className="flex-1"
                      onClick={handlePayment}
                      isLoading={isProcessing}
                    >
                      Payer {total.toLocaleString("fr-FR")} FCFA
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Résumé de commande */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <ShoppingBag size={20} />
                Résumé de la commande
              </h2>

              {/* Articles */}
              <div className="space-y-3 mb-4">
                {demoCartItems.map((item) => (
                  <div
                    key={item.product_id}
                    className="flex justify-between text-sm"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {item.product_name}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400">
                        Qté: {item.quantity}
                        {item.size && ` • Taille: ${item.size}`}
                      </p>
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {(item.price * item.quantity).toLocaleString("fr-FR")}{" "}
                      FCFA
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Sous-total</span>
                  <span>{subtotal.toLocaleString("fr-FR")} FCFA</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Livraison</span>
                  <span>{deliveryFee.toLocaleString("fr-FR")} FCFA</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-gray-700">
                  <span>Total</span>
                  <span>{total.toLocaleString("fr-FR")} FCFA</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
