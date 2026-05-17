import React, { createContext, useState, useEffect } from "react"
import { auth, googleProvider, db } from "../services/firebase"
import { signInWithPopup, signOut, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Handle Google Login
  async function loginWithGoogle() {
    try {
      console.log("Starting Google Login with Popup...")
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user
      console.log("Google Auth SUCCESS! User UID:", user.uid)

      // Try-catch for Firestore to prevent Auth being blocked by Firestore connectivity
      try {
        console.log("Attempting Firestore user check...")
        const userRef = doc(db, "users", user.uid)
        
        // Use a timeout or catch the 'offline' error specifically
        const userSnap = await getDoc(userRef)

        if (!userSnap.exists()) {
          console.log("Creating new user document in Firestore...")
          await setDoc(userRef, {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            createdAt: serverTimestamp(),
            analysisCount: 0,
            subscriptionPlan: 'free'
          })
          console.log("User document created successfully.")
        } else {
          console.log("User document already exists.")
        }
      } catch (firestoreError) {
        console.error("Firestore Error (Auth still succeeded):", firestoreError)
        // If it's just a connectivity issue to Firestore, we still have the Auth result
        // We can proceed and let the app handle the "partially offline" state
      }
      
      return result
    } catch (error) {
      console.error("Critical Google Auth Error:", error)
      throw error
    }
  }

  // Handle Test Account Login (Bypass Google)
  async function loginWithTestAccount() {
    const testEmail = "test@lexguard.com"
    const testPass = "lexguard123!"
    
    try {
      // Try to sign in first
      const result = await signInWithEmailAndPassword(auth, testEmail, testPass)
      return result
    } catch (error) {
      // If it fails (user doesn't exist), create the account
      console.log("Creating test account because it didn't exist...")
      const result = await createUserWithEmailAndPassword(auth, testEmail, testPass)
      const user = result.user
      
      const userRef = doc(db, "users", user.uid)
      await setDoc(userRef, {
        uid: user.uid,
        name: "Test Engineer",
        email: user.email,
        createdAt: serverTimestamp(),
        analysisCount: 0,
        subscriptionPlan: 'enterprise'
      })
      return result
    }
  }

  // Handle Logout
  function logout() {
    return signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Optionally fetch extra details from Firestore here if needed immediately in context
        setCurrentUser(user)
      } else {
        setCurrentUser(null)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    loginWithGoogle,
    loginWithTestAccount,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
