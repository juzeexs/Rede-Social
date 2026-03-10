import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCOIpKLA-Z4-qnLuIF-Gob8HbZSONnsdQk",
  authDomain: "rede-social-4ddaf.firebaseapp.com",
  databaseURL: "https://rede-social-4ddaf-default-rtdb.firebaseio.com",
  projectId: "rede-social-4ddaf",
  storageBucket: "rede-social-4ddaf.firebasestorage.app",
  messagingSenderId: "27453953884",
  appId: "1:27453953884:web:a43023bfff8af24748d399",
  measurementId: "G-WPRQEJMYX2"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
