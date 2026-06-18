// firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBLOV3RVWyHyNYNiwDHOu4-kKrZDenv07M",
  authDomain: "coretech-ea396.firebaseapp.com",
  projectId: "coretech-ea396",
  storageBucket: "coretech-ea396.firebasestorage.app",
  messagingSenderId: "578780025473",
  appId: "1:578780025473:web:6e7c440e3b1252b0b83380",
  measurementId: "G-4PHBXG3WVG"
};

// Inicializa o Firebase e os serviços apenas uma vez
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Exporta os dois organizadamente para o app.js utilizar
export { db, auth };