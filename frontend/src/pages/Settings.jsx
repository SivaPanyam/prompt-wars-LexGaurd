import React, { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "../components/ui/Card"
import { Button } from "../components/ui/Button"
import { Badge } from "../components/ui/Badge"
import { User, Bell, Shield, Key, CreditCard, Building2, HelpCircle } from "lucide-react"
import { useAuth } from "../hooks/useAuth"
import { motion } from "framer-motion"

export default function Settings() {
  const { currentUser: user } = useAuth()
  const [activeTab, setActiveTab] = useState("profile")

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "team", label: "Team & Workspace", icon: Building2 },
    { id: "billing", label: "Billing & Plans", icon: CreditCard },
    { id: "security", label: "Security & API", icon: Key },
    { id: "notifications", label: "Notifications", icon: Bell },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-on-surface">Settings</h2>
        <p className="text-sm text-on-surface-variant mt-1">Manage your account, team workspace, and billing preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 pt-4">
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 shrink-0 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? "bg-primary text-on-primary shadow-sm" 
                    : "text-on-surface hover:bg-surface-container-low"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-on-primary' : 'text-on-surface-variant'}`} />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Content Area */}
        <motion.div 
          className="flex-1"
          key={activeTab}
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {activeTab === "profile" && (
            <motion.div variants={itemVariants} className="space-y-6">
              <Card className="shadow-sm border-outline-variant/50">
                <CardHeader className="border-b border-outline-variant/30 pb-4">
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details and public profile.</CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-surface-container-highest border border-outline-variant flex items-center justify-center overflow-hidden">
                      {user?.photoURL ? (
                        <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-8 h-8 text-on-surface-variant" />
                      )}
                    </div>
                    <div>
                      <Button variant="outline" size="sm">Change Avatar</Button>
                    </div>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-on-surface">Full Name</label>
                      <input 
                        type="text" 
                        defaultValue={user?.displayName || ""} 
                        className="w-full p-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-on-surface">Email Address</label>
                      <input 
                        type="email" 
                        defaultValue={user?.email || ""} 
                        disabled
                        className="w-full p-2.5 bg-surface-container border border-outline-variant rounded-lg text-sm text-on-surface-variant opacity-70 cursor-not-allowed"
                      />
                    </div>
                  </div>
                  <div className="pt-4 border-t border-outline-variant/30 flex justify-end">
                    <Button>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === "team" && (
            <motion.div variants={itemVariants} className="space-y-6">
              <Card className="shadow-sm border-outline-variant/50">
                <CardHeader className="border-b border-outline-variant/30 pb-4">
                  <CardTitle>Workspace Settings</CardTitle>
                  <CardDescription>Manage your team's access and roles.</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between p-4 border border-outline-variant rounded-lg bg-surface-container-lowest">
                    <div>
                      <p className="font-semibold text-on-surface">LexGuard Enterprise Workspace</p>
                      <p className="text-sm text-on-surface-variant">3 members · Pro Plan</p>
                    </div>
                    <Button variant="outline" size="sm">Manage Team</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === "billing" && (
            <motion.div variants={itemVariants} className="space-y-6">
              <Card className="shadow-sm border-outline-variant/50">
                <CardHeader className="border-b border-outline-variant/30 pb-4">
                  <CardTitle>Current Plan</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <Badge variant="default" className="mb-2 uppercase tracking-wider text-[10px]">Enterprise Pro</Badge>
                        <h3 className="text-2xl font-bold text-on-surface">$499<span className="text-sm text-on-surface-variant font-normal">/month</span></h3>
                      </div>
                      <Button>Upgrade Plan</Button>
                    </div>
                    <p className="text-sm text-on-surface-variant">Your plan renews on June 1, 2026. You have used 145 of your 500 included contract analyses.</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === "security" && (
            <motion.div variants={itemVariants} className="space-y-6">
              <Card className="shadow-sm border-outline-variant/50">
                <CardHeader className="border-b border-outline-variant/30 pb-4">
                  <CardTitle>API Keys</CardTitle>
                  <CardDescription>Manage programmatic access to LexGuard's analysis engine.</CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="p-4 bg-surface-container-low rounded-lg border border-outline-variant flex justify-between items-center">
                    <div>
                      <p className="font-medium text-sm text-on-surface">Production API Key</p>
                      <p className="text-xs text-on-surface-variant font-mono mt-1">lx_prod_*********************8x2</p>
                    </div>
                    <Button variant="outline" size="sm">Revoke</Button>
                  </div>
                  <Button variant="outline" className="w-full border-dashed">Generate New Key</Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
          
        </motion.div>
      </div>
    </div>
  )
}
