import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
} from "firebase/firestore";
import { db } from "./config";
import { Product, Order, Cart, Coupon, User } from "@/types";

// ========== UTILISATEURS ==========

/**
 * Récupérer tous les utilisateurs (Admin)
 */
export async function getAllUsers(): Promise<User[]> {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, orderBy("created_at", "desc"));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      created_at: doc.data().created_at?.toDate(),
    })) as User[];
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    return [];
  }
}

// ========== PRODUITS ==========

/**
 * Récupérer tous les produits
 */
export async function getProducts(): Promise<Product[]> {
  try {
    const productsRef = collection(db, "products");
    const snapshot = await getDocs(productsRef);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      created_at: doc.data().created_at?.toDate(),
      updated_at: doc.data().updated_at?.toDate(),
    })) as Product[];
  } catch (error) {
    console.error("Erreur lors de la récupération des produits:", error);
    return [];
  }
}

/**
 * Récupérer un produit par ID
 */
export async function getProductById(id: string): Promise<Product | null> {
  try {
    const productDoc = await getDoc(doc(db, "products", id));

    if (!productDoc.exists()) {
      return null;
    }

    return {
      id: productDoc.id,
      ...productDoc.data(),
      created_at: productDoc.data().created_at?.toDate(),
      updated_at: productDoc.data().updated_at?.toDate(),
    } as Product;
  } catch (error) {
    console.error("Erreur lors de la récupération du produit:", error);
    return null;
  }
}

/**
 * Récupérer les produits par catégorie
 */
export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  try {
    const productsRef = collection(db, "products");
    const q = query(productsRef, where("category", "==", category));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      created_at: doc.data().created_at?.toDate(),
      updated_at: doc.data().updated_at?.toDate(),
    })) as Product[];
  } catch (error) {
    console.error("Erreur lors de la récupération des produits:", error);
    return [];
  }
}

/**
 * Récupérer les nouveaux produits
 */
export async function getNewProducts(
  limitCount: number = 8
): Promise<Product[]> {
  try {
    const productsRef = collection(db, "products");
    const q = query(
      productsRef,
      where("isNew", "==", true),
      orderBy("created_at", "desc"),
      limit(limitCount)
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      created_at: doc.data().created_at?.toDate(),
      updated_at: doc.data().updated_at?.toDate(),
    })) as Product[];
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des nouveaux produits:",
      error
    );
    return [];
  }
}

/**
 * Ajouter un produit (Admin)
 */
export async function addProduct(
  product: Omit<Product, "id">
): Promise<string> {
  try {
    const productData = {
      ...product,
      created_at: Timestamp.now(),
      updated_at: Timestamp.now(),
    };

    const docRef = await addDoc(collection(db, "products"), productData);
    return docRef.id;
  } catch (error) {
    console.error("Erreur lors de l'ajout du produit:", error);
    throw error;
  }
}

/**
 * Mettre à jour un produit (Admin)
 */
export async function updateProduct(
  id: string,
  updates: Partial<Product>
): Promise<void> {
  try {
    const productRef = doc(db, "products", id);
    await updateDoc(productRef, {
      ...updates,
      updated_at: Timestamp.now(),
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du produit:", error);
    throw error;
  }
}

/**
 * Supprimer un produit (Admin)
 */
export async function deleteProduct(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, "products", id));
  } catch (error) {
    console.error("Erreur lors de la suppression du produit:", error);
    throw error;
  }
}

// ========== COMMANDES ==========

/**
 * Créer une nouvelle commande et décrémenter le stock
 */
export async function createOrder(
  orderData: Omit<Order, "id">
): Promise<string> {
  try {
    console.log("Creating order for user:", orderData.user_id);
    // Décrementer le stock pour chaque produit
    for (const item of orderData.products) {
      const productRef = doc(db, "products", item.product_id);
      const productDoc = await getDoc(productRef);

      if (productDoc.exists()) {
        const currentStock = productDoc.data().stock || 0;
        const newStock = Math.max(0, currentStock - item.quantity);

        await updateDoc(productRef, {
          stock: newStock,
          updated_at: Timestamp.now(),
        });
      }
    }

    // Créer la commande
    const order = {
      ...orderData,
      created_at: Timestamp.now(),
      updated_at: Timestamp.now(),
    };

    const docRef = await addDoc(collection(db, "orders"), order);
    return docRef.id;
  } catch (error) {
    console.error("Erreur lors de la création de la commande:", error);
    throw error;
  }
}

/**
 * Récupérer toutes les commandes (Admin)
 */
export async function getAllOrders(): Promise<Order[]> {
  try {
    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, orderBy("created_at", "desc"));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      created_at: doc.data().created_at?.toDate(),
      updated_at: doc.data().updated_at?.toDate(),
    })) as Order[];
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes:", error);
    return [];
  }
}

/**
 * Récupérer une commande par ID
 */
export async function getOrderById(id: string): Promise<Order | null> {
  try {
    const orderDoc = await getDoc(doc(db, "orders", id));

    if (!orderDoc.exists()) {
      return null;
    }

    return {
      id: orderDoc.id,
      ...orderDoc.data(),
      created_at: orderDoc.data().created_at?.toDate(),
      updated_at: orderDoc.data().updated_at?.toDate(),
    } as Order;
  } catch (error) {
    console.error("Erreur lors de la récupération de la commande:", error);
    return null;
  }
}

/**
 * Récupérer les commandes d'un utilisateur
 */
export async function getUserOrders(userId: string): Promise<Order[]> {
  try {
    const ordersRef = collection(db, "orders");
    const q = query(
      ordersRef,
      where("user_id", "==", userId),
      orderBy("created_at", "desc")
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      created_at: doc.data().created_at?.toDate(),
      updated_at: doc.data().updated_at?.toDate(),
    })) as Order[];
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes:", error);
    return [];
  }
}

/**
 * Récupérer les commandes d'un utilisateur
 */
export async function getOrdersByUser(userId: string): Promise<Order[]> {
  try {
    const ordersRef = collection(db, "orders");
    const q = query(
      ordersRef,
      where("user_id", "==", userId),
      orderBy("created_at", "desc")
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      created_at: doc.data().created_at?.toDate(),
      updated_at: doc.data().updated_at?.toDate(),
    })) as Order[];
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des commandes utilisateur:",
      error
    );
    return [];
  }
}

/**
 * Mettre à jour le statut d'une commande (Admin)
 */
export async function updateOrderStatus(
  orderId: string,
  status: Order["status"]
): Promise<void> {
  try {
    const orderRef = doc(db, "orders", orderId);
    await updateDoc(orderRef, {
      status,
      updated_at: Timestamp.now(),
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut:", error);
    throw error;
  }
}

// ========== PANIER ==========

/**
 * Récupérer le panier d'un utilisateur
 */
export async function getCart(userId: string): Promise<Cart | null> {
  try {
    const cartDoc = await getDoc(doc(db, "carts", userId));

    if (!cartDoc.exists()) {
      return null;
    }

    return {
      ...cartDoc.data(),
      updated_at: cartDoc.data().updated_at?.toDate(),
    } as Cart;
  } catch (error) {
    console.error("Erreur lors de la récupération du panier:", error);
    return null;
  }
}

/**
 * Mettre à jour le panier
 */
export async function updateCart(
  userId: string,
  cart: Omit<Cart, "user_id">
): Promise<void> {
  try {
    const cartRef = doc(db, "carts", userId);
    await updateDoc(cartRef, {
      ...cart,
      updated_at: Timestamp.now(),
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du panier:", error);
    throw error;
  }
}

// ========== COUPONS ==========

/**
 * Vérifier un coupon
 */
export async function verifyCoupon(code: string): Promise<Coupon | null> {
  try {
    const couponsRef = collection(db, "coupons");
    const q = query(couponsRef, where("code", "==", code.toUpperCase()));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return null;
    }

    const couponData = snapshot.docs[0].data() as Coupon;

    // Vérifier si le coupon est actif et non expiré
    if (!couponData.active || new Date(couponData.expiration) < new Date()) {
      return null;
    }

    return couponData;
  } catch (error) {
    console.error("Erreur lors de la vérification du coupon:", error);
    return null;
  }
}

// ========== ADRESSES ==========

/**
 * Récupérer les adresses d'un utilisateur
 */
export async function getUserAddresses(userId: string): Promise<any[]> {
  try {
    const addressesRef = collection(db, "users", userId, "addresses");
    const snapshot = await getDocs(addressesRef);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Erreur lors de la récupération des adresses:", error);
    return [];
  }
}

/**
 * Ajouter une adresse
 */
export async function addUserAddress(
  userId: string,
  address: any
): Promise<string> {
  try {
    const addressesRef = collection(db, "users", userId, "addresses");

    // Si c'est la première adresse, elle devient par défaut
    const snapshot = await getDocs(addressesRef);
    if (snapshot.empty) {
      address.isDefault = true;
    }

    const docRef = await addDoc(addressesRef, address);
    return docRef.id;
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'adresse:", error);
    throw error;
  }
}

/**
 * Supprimer une adresse
 */
export async function deleteUserAddress(
  userId: string,
  addressId: string
): Promise<void> {
  try {
    await deleteDoc(doc(db, "users", userId, "addresses", addressId));
  } catch (error) {
    console.error("Erreur lors de la suppression de l'adresse:", error);
    throw error;
  }
}

/**
 * Définir une adresse par défaut
 */
export async function setDefaultAddress(
  userId: string,
  addressId: string
): Promise<void> {
  try {
    const addressesRef = collection(db, "users", userId, "addresses");
    const snapshot = await getDocs(addressesRef);

    const batch = (await import("firebase/firestore")).writeBatch(db);

    snapshot.docs.forEach((doc) => {
      batch.update(doc.ref, { isDefault: doc.id === addressId });
    });

    await batch.commit();
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour de l'adresse par défaut:",
      error
    );
    throw error;
  }
}
