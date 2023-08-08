import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB9cTm1E6xaxuw1kyJ4o4koGcd32MdmMcc",
  authDomain: "rn-social-5e825.firebaseapp.com",
  projectId: "rn-social-5e825",
  storageBucket: "rn-social-5e825.appspot.com",
  messagingSenderId: "775165926587",
  appId: "1:775165926587:web:6d4d8c77e5d7dc818e1d9e",
  measurementId: "G-86J1Q21Y59"
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