import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import AuthLayout from './layouts/AuthLayout'
import DashboardLayout from './layouts/DashboardLayout'

import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'
import Landing from './pages/Landing'

import Dashboard from './pages/Dashboard'
import UploadContract from './pages/UploadContract'
import AIAnalysis from './pages/AIAnalysis'

import RiskHeatmap from './pages/RiskHeatmap'
import Reports from './pages/Reports'
import History from './pages/History'
import Settings from './pages/Settings'

import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          
          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>

          {/* Protected Dashboard Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="upload" element={<UploadContract />} />
              <Route path="contracts" element={<AIAnalysis />} />
              <Route path="heatmap" element={<RiskHeatmap />} />
              <Route path="reports" element={<Reports />} />
              <Route path="history" element={<History />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
