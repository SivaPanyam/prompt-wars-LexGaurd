import React from "react"
import { Outlet, Link } from "react-router-dom"
import { Shield } from "lucide-react"

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-surface-container-lowest">
      <header className="px-6 py-4 flex items-center justify-between border-b border-outline-variant/30">
        <Link to="/" className="flex items-center gap-2 text-primary font-bold tracking-tight">
          <Shield className="w-6 h-6" />
          <span>LEXGUARD</span>
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
