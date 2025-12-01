"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { toast } from "react-hot-toast";

export interface Settings {
  shopName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  deliveryFee: number;
  freeDeliveryThreshold: number;
  notifications: {
    newOrders: boolean;
    lowStock: boolean;
  };
}

const defaultSettings: Settings = {
  shopName: "E-Commerce Bénin",
  contactEmail: "contact@eshop.bj",
  contactPhone: "+229 01 23 45 67",
  address: "Cotonou, Bénin",
  deliveryFee: 1000,
  freeDeliveryThreshold: 50000,
  notifications: {
    newOrders: true,
    lowStock: true,
  },
};

interface SettingsContextType {
  settings: Settings;
  loading: boolean;
  updateSettings: (newSettings: Partial<Settings>) => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "settings", "general"),
      (doc) => {
        if (doc.exists()) {
          setSettings({ ...defaultSettings, ...doc.data() } as Settings);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Erreur chargement paramètres:", error);
        // Fallback to default settings on error (e.g. permission denied)
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const updateSettings = async (newSettings: Partial<Settings>) => {
    try {
      const updatedSettings = { ...settings, ...newSettings };
      await setDoc(doc(db, "settings", "general"), updatedSettings);
      toast.success("Paramètres mis à jour");
    } catch (error) {
      console.error("Erreur lors de la mise à jour des paramètres:", error);
      toast.error("Erreur lors de la mise à jour");
      throw error;
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, loading, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
