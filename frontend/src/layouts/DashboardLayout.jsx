import React from "react"
import { Outlet, Link, useLocation } from "react-router-dom"
import { Shield, Home, UploadCloud, FileText, Settings, BarChart2, LogOut } from "lucide-react"
import { useAuth } from "../hooks/useAuth"
import { motion, AnimatePresence } from "framer-motion"

export default function DashboardLayout() {
  const { currentUser: user, logout } = useAuth()
  const location = useLocation()

  const navItems = [
    { name: 'Overview', path: '/dashboard', icon: Home },
    { name: 'Analyze Contract', path: '/dashboard/upload', icon: UploadCloud },
    { name: 'History', path: '/dashboard/history', icon: FileText },
    { name: 'Analytics', path: '/dashboard/heatmap', icon: BarChart2 },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings },
  ]

  return (
    <div className="flex h-screen bg-surface-lowest text-on-surface font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-surface-container-lowest border-r border-outline-variant/30 flex flex-col hidden md:flex shrink-0" aria-label="Sidebar Navigation">
        <div className="h-16 flex items-center px-6 border-b border-outline-variant/30">
          <Link to="/" className="flex items-center gap-2" aria-label="Go to Homepage">
            <div className="bg-primary/10 p-1 rounded border border-primary/20">
              <Shield className="w-5 h-5 text-primary" aria-hidden="true" />
            </div>
            <span className="font-bold tracking-tight">LEXGUARD</span>
          </Link>
        </div>
        
        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto" aria-label="Main Navigation">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link 
                key={item.path}
                to={item.path} 
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-surface-container-low text-on-surface shadow-sm border border-outline-variant/50' 
                    : 'text-on-surface-variant hover:bg-surface-container-lowest hover:text-on-surface border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-on-surface-variant'}`} aria-hidden="true" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* User Profile Area */}
        <div className="p-4 border-t border-outline-variant/30 bg-surface-container-lowest">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 overflow-hidden shrink-0" aria-hidden="true">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="User avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-primary font-bold text-xs">
                  {user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                </span>
              )}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold truncate text-on-surface">{user?.displayName || 'User'}</p>
              <p className="text-xs text-on-surface-variant truncate">{user?.email}</p>
            </div>
          </div>
          <button 
            onClick={logout}
            aria-label="Sign Out"
            className="flex items-center justify-center gap-2 w-full px-3 py-2 text-sm font-medium text-error hover:bg-error/10 rounded-lg transition-colors border border-transparent hover:border-error/20"
          >
            <LogOut className="w-4 h-4" aria-hidden="true" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden bg-surface-lowest">
        <header className="h-16 flex items-center px-8 border-b border-outline-variant/30 bg-surface-lowest/80 backdrop-blur-md z-10 shrink-0 md:hidden">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <span className="font-bold tracking-tight">LEXGUARD</span>
          </Link>
        </header>

        <div className="flex-1 overflow-auto p-4 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}
