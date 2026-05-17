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
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user

      // Check if user exists in Firestore
      const userRef = doc(db, "users", user.uid)
      const userSnap = await getDoc(userRef)

      if (!userSnap.exists()) {
        // Create new user document
        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          createdAt: serverTimestamp(),
          analysisCount: 0,
          subscriptionPlan: 'free'
        })
      }
      
      return result
    } catch (error) {
      console.error("Google Login Error:", error)
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
