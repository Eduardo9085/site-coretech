// firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { 
    getFirestore 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBLOV3RVWyHyNYNiwDHOu4-kKrZDenv07M",
  authDomain: "coretech-ea396.firebaseapp.com",
  projectId: "coretech-ea396",
  storageBucket: "coretech-ea396.firebasestorage.app",
  messagingSenderId: "578780025473",
  appId: "1:578780025473:web:6e7c440e3b1252b0b83380",
  measurementId: "G-4PHBXG3WVG"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);