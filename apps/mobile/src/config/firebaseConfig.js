// Configuration Firebase pour WeatherApp
// Package Android : com.aymen.weatherapp

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// ✅ Configuration réelle fournie par Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDIz5ohVDKDfUpmCGKxQvAjNjD6r6MPOac",
  authDomain: "asma-2dc0d.firebaseapp.com",
  projectId: "asma-2dc0d",
  storageBucket: "asma-2dc0d.firebasestorage.app",
  messagingSenderId: "86119086479",
  appId: "1:86119086479:web:aedf27476ccaf61a75f3fa",
  measurementId: "G-J2REJEHZJ6",

  // Facultatif (pour Google Sign-In)
  androidClientId:
    "123456789012-abc123def456ghi789jkl012mno345pqr.apps.googleusercontent.com",
  webClientId:
    "123456789012-xyz789abc012def345ghi678jkl901mno.apps.googleusercontent.com",

  // Nom du package Android
  androidPackageName: "com.aymen.weatherapp",
};

// ✅ Initialisation réelle de Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

console.log(
  "✅ Firebase configuré avec succès pour :",
  firebaseConfig.androidPackageName
);

export default firebaseConfig;
