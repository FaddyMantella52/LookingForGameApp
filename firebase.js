// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getStorage } from "firebase/storage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVq3b6uWx63NwMFqru-6yu2CHvZv3vLpk",
  authDomain: "teamfinderapp-c3952.firebaseapp.com",
  projectId: "teamfinderapp-c3952",
  storageBucket: "teamfinderapp-c3952.firebasestorage.app",
  messagingSenderId: "366153511697",
  appId: "1:366153511697:web:91a51092fd7d134335d2b0",
  measurementId: "G-5D2SQHM7YN" 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage for persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore Database

const db = getFirestore(app);

const storage = getStorage(app);

export { auth, storage, db };
