import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  User as FirebaseUser,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./config";
import { User, UserRole } from "@/types";

/**
 * Inscription d'un nouvel utilisateur
 */
export async function signUp(
  email: string,
  password: string,
  name: string,
  phone?: string
): Promise<User> {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const firebaseUser = userCredential.user;

    // Mettre à jour le profil
    await updateProfile(firebaseUser, { displayName: name });

    // Créer le document utilisateur dans Firestore
    const user: User = {
      id: firebaseUser.uid,
      name,
      email,
      phone,
      role: "customer",
      created_at: new Date(),
    };

    await setDoc(doc(db, "users", firebaseUser.uid), user);

    return user;
  } catch (error: any) {
    throw new Error(error.message || "Erreur lors de l'inscription");
  }
}

/**
 * Connexion d'un utilisateur
 */
export async function signIn(email: string, password: string): Promise<User> {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const firebaseUser = userCredential.user;

    // Récupérer les données utilisateur depuis Firestore
    const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));

    if (!userDoc.exists()) {
      throw new Error("Utilisateur non trouvé");
    }

    return userDoc.data() as User;
  } catch (error: any) {
    throw new Error(error.message || "Erreur lors de la connexion");
  }
}

/**
 * Déconnexion
 */
export async function logout(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error(error.message || "Erreur lors de la déconnexion");
  }
}

/**
 * Réinitialisation du mot de passe
 */
export async function resetPassword(email: string): Promise<void> {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    throw new Error(error.message || "Erreur lors de la réinitialisation");
  }
}

/**
 * Récupérer les données utilisateur
 */
export async function getUserData(uid: string): Promise<User | null> {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));

    if (!userDoc.exists()) {
      return null;
    }

    return userDoc.data() as User;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données utilisateur:",
      error
    );
    return null;
  }
}

/**
 * Vérifier si l'utilisateur est admin
 */
export async function isAdmin(uid?: string): Promise<boolean> {
  let targetUid = uid;

  if (!targetUid) {
    const currentUser = auth.currentUser;
    if (!currentUser) return false;
    targetUid = currentUser.uid;
  }

  const user = await getUserData(targetUid);
  return user?.role === "admin";
}
