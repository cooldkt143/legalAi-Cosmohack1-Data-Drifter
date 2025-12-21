// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBcMQzoTNUrpeCtef829C4VVdf_0faBBw0",
  authDomain: "legailai-2.firebaseapp.com",
  projectId: "legailai-2",
  storageBucket: "legailai-2.firebasestorage.app",
  messagingSenderId: "296742156924",
  appId: "1:296742156924:web:49e56c86a9d4d1504ba7f9",
  measurementId: "G-VPE8L9T0RC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
