import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3zEZ8zi2KpB6NkBaoWsqOZeNNsAxkUm0",
  authDomain: "d-aglo-market.firebaseapp.com",
  projectId: "d-aglo-market",
  storageBucket: "d-aglo-market.firebasestorage.app",
  messagingSenderId: "950451804372",
  appId: "1:950451804372:web:0d32f633d54c7562c2c341",
  measurementId: "G-J0QZT22XT8",
};

// Initialize Firebase
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

if (typeof window !== "undefined") {
  // Client-side initialization
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }

  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
}

export { auth, db, storage };
