// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Firebase Auth service
import { getFirestore } from "firebase/firestore"; // Firebase Firestore service

// Your Firebase config (replace with your own Firebase project details)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication and Firestore services
const auth = getAuth(app);  // Firebase Authentication
const db = getFirestore(app);  // Firebase Firestore

// Export both services with clear names to avoid conflict
export { auth, db };
