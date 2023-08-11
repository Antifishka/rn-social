import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA2MG7LnOTT2nfMMyJAe6jnydtRo9NykTQ",
  authDomain: "rn-social-78eb0.firebaseapp.com",
  projectId: "rn-social-78eb0",
  storageBucket: "rn-social-78eb0.appspot.com",
  messagingSenderId: "199506496304",
  appId: "1:199506496304:web:a3aa8a9929d6e49a0f56f5",
  measurementId: "G-D1W9BCC23Q"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Cloud Firestore
export const db = getFirestore(app);

// Initialize Cloud Storage
export const storage = getStorage(app);;