import React from "react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/Button"
import { Shield, ArrowRight, FileText, CheckCircle2, ChevronRight, Activity } from "lucide-react"

export default function Landing() {
  return (
    <div className="min-h-screen bg-surface-lowest text-on-surface selection:bg-primary/20 font-sans">
      {/* Navigation */}
      <nav className="border-b border-outline-variant/20 sticky top-0 bg-surface-lowest/80 backdrop-blur-md z-50 transition-all">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 p-1.5 rounded-lg border border-primary/20">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <span className="font-bold text-lg tracking-tight">LEXGUARD</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#product" className="text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors">Product</a>
              <a href="#security" className="text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors">Security</a>
              <a href="#pricing" className="text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors">Pricing</a>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors hidden sm:block">
                Log in
              </Link>
              <Link to="/signup">
                <Button className="shadow-sm">Start for free</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main>
        <div className="relative pt-32 pb-40 overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
          
          <div className="max-w-5xl mx-auto px-6 text-center">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-primary bg-primary/10 mb-8 border border-primary/20 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
              <span className="flex h-1.5 w-1.5 rounded-full bg-primary mr-2 animate-pulse"></span>
              LexGuard Enterprise 2.0 is live
              <ChevronRight className="w-3 h-3 ml-1" />
            </div>
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-8 leading-[1.05] animate-in fade-in slide-in-from-bottom-8 duration-700">
              Contract review, <br/><span className="text-primary/90">engineered.</span>
            </h1>
            <p className="text-xl text-on-surface-variant max-w-2xl mx-auto mb-10 leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-10 duration-1000">
              Protect your enterprise with a multi-agent AI architecture that parses, classifies, and redlines complex legal documents in milliseconds.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-12 duration-1000">
              <Link to="/signup">
                <Button size="lg" className="w-full sm:w-auto text-base group px-8 shadow-md">
                  Start Analyzing
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-base px-8 bg-surface-lowest">
                  View Documentation
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Product UI Preview / Grid */}
        <div className="pb-32 bg-surface-lowest" id="product">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-6">
              
              <div className="p-8 bg-surface-container-lowest rounded-2xl border border-outline-variant/50 shadow-sm hover:border-outline-variant transition-colors group">
                <div className="w-10 h-10 bg-primary/10 rounded-lg border border-primary/20 flex items-center justify-center mb-12 group-hover:scale-110 transition-transform">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2 tracking-tight text-on-surface">Structured Extraction</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">Documents are sliced into discrete clauses and parsed into strict Pydantic schemas, eliminating hallucination risks.</p>
              </div>

              <div className="p-8 bg-surface-container-lowest rounded-2xl border border-outline-variant/50 shadow-sm hover:border-outline-variant transition-colors group">
                <div className="w-10 h-10 bg-error/10 rounded-lg border border-error/20 flex items-center justify-center mb-12 group-hover:scale-110 transition-transform">
                  <Activity className="w-5 h-5 text-error" />
                </div>
                <h3 className="text-xl font-bold mb-2 tracking-tight text-on-surface">Risk Heatmapping</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">Clauses are graded across a strict vulnerability matrix. View your portfolio's exposure via real-time radar charts.</p>
              </div>

              <div className="p-8 bg-surface-container-lowest rounded-2xl border border-outline-variant/50 shadow-sm hover:border-outline-variant transition-colors group">
                <div className="w-10 h-10 bg-green-500/10 rounded-lg border border-green-500/20 flex items-center justify-center mb-12 group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-2 tracking-tight text-on-surface">Actionable Redlines</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">Don't just detect risk; mitigate it. LexGuard generates precise, copy-paste ready counter-party redlines.</p>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-outline-variant/30 py-12 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-outline" />
            <span className="font-semibold text-sm text-outline tracking-tight">LEXGUARD INC.</span>
          </div>
          <div className="flex gap-6 text-sm text-outline">
            <a href="#" className="hover:text-on-surface transition-colors">Privacy</a>
            <a href="#" className="hover:text-on-surface transition-colors">Terms</a>
            <a href="#" className="hover:text-on-surface transition-colors">System Status</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
