"use client";

import { useState } from "react";
import { PaymentProvider } from "@/types";
import { Check } from "lucide-react";

interface MobileMoneySelectProps {
  onSelect: (provider: PaymentProvider) => void;
  selectedProvider?: PaymentProvider;
}

export default function MobileMoneySelector({
  onSelect,
  selectedProvider,
}: MobileMoneySelectProps) {
  const providers = [
    {
      id: "mtn" as PaymentProvider,
      name: "MTN Mobile Money",
      color: "bg-yellow-500",
      icon: "M",
      description: "Paiement via MTN Mobile Money",
    },
    {
      id: "moov" as PaymentProvider,
      name: "Moov Money",
      color: "bg-blue-600",
      icon: "M",
      description: "Paiement via Moov Money",
    },
    {
      id: "celtiis" as PaymentProvider,
      name: "Celtiis Cash",
      color: "bg-green-600",
      icon: "C",
      description: "Paiement via Celtiis Cash",
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Choisissez votre mode de paiement
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {providers.map((provider) => (
          <button
            key={provider.id}
            onClick={() => onSelect(provider.id)}
            className={`
              relative p-6 rounded-2xl border-2 transition-all duration-300
              ${
                selectedProvider === provider.id
                  ? "border-primary-600 bg-primary-50 dark:bg-primary-900/20 shadow-lg scale-105"
                  : "border-gray-300 dark:border-gray-600 hover:border-primary-400 hover:shadow-md"
              }
            `}
          >
            {/* Check Icon */}
            {selectedProvider === provider.id && (
              <div className="absolute top-3 right-3 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                <Check size={16} className="text-white" />
              </div>
            )}

            {/* Provider Icon */}
            <div
              className={`${provider.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}
            >
              <span className="text-3xl font-bold text-white">
                {provider.icon}
              </span>
            </div>

            {/* Provider Name */}
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 text-center">
              {provider.name}
            </h4>

            {/* Description */}
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              {provider.description}
            </p>
          </button>
        ))}
      </div>

      {/* Info */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-sm text-blue-800 dark:text-blue-300">
          💡 <strong>Astuce :</strong> Assurez-vous que votre compte mobile
          money dispose de fonds suffisants avant de procéder au paiement.
        </p>
      </div>

      {/* FedaPay Badge */}
      <div className="text-center pt-4">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Paiement sécurisé par{" "}
          <span className="font-semibold text-primary-600 dark:text-primary-400">
            FedaPay
          </span>
        </p>
      </div>
    </div>
  );
}
