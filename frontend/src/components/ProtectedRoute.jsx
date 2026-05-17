import React from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { Spinner } from "./ui/Spinner"

export default function ProtectedRoute() {
  const { currentUser } = useAuth()

  // If currentUser is undefined, we might still be loading depending on how we handle it,
  // but since we don't render children in AuthProvider until loading is false, 
  // currentUser is definitely null if unauthenticated.
  
  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
