// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCWWdaiGpFMxOvlyA6su-yWCICqMuxKX5I",
  authDomain: "legal-ai-8d7a8.firebaseapp.com",
  projectId: "legal-ai-8d7a8",
  storageBucket: "legal-ai-8d7a8.firebasestorage.app",
  messagingSenderId: "234232236127",
  appId: "1:234232236127:web:2acfeb1bc6b56a92e0f3ea",
  measurementId: "G-8S2GSW7WQ3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
