import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration using Vite environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

console.log("Firebase Config Detected:", {
  ...firebaseConfig,
  apiKey: firebaseConfig.apiKey ? "PRESENT" : "MISSING"
})

let app;
try {
  if (!firebaseConfig.apiKey) {
    throw new Error("VITE_FIREBASE_API_KEY is missing. Check your build environment variables.")
  }
  app = initializeApp(firebaseConfig)
  console.log("Firebase initialized successfully")
} catch (error) {
  console.error("Firebase Initialization Error:", error)
}

// Initialize Auth
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

// Initialize Firestore
export const db = getFirestore(app)
export default app
