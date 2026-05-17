import React, { createContext, useState, useEffect } from "react"
import { auth, googleProvider, db } from "../services/firebase"
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth"
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Handle Google Login
  async function loginWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      
      // We are skipping the Firestore database creation step here
      // so you don't need a database to log in and use the app.
      
      return result
    } catch (error) {
      console.error("Google Login Error:", error)
      throw error
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
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
