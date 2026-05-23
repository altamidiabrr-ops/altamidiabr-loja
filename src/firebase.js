import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBsWCUcX58d8KxGVsHc0VKBE1RMKbaX7Sg",
  authDomain: "altamidiabr-loja.firebaseapp.com",
  projectId: "altamidiabr-loja",
  storageBucket: "altamidiabr-loja.firebasestorage.app",
  messagingSenderId: "379130190193",
  appId: "1:379130190193:web:9ea49802dd1a0c3cb13ed0",
  measurementId: "G-P711VHYDRZ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const provider = new GoogleAuthProvider();