import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/Card"
import { Button } from "../components/ui/Button"
import { Shield } from "lucide-react"
import { useAuth } from "../hooks/useAuth"

export default function Login() {
  const navigate = useNavigate()
  const { loginWithGoogle, loginWithTestAccount } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleGoogleLogin = async () => {
    try {
      setError("")
      setLoading(true)
      await loginWithGoogle()
      navigate("/dashboard")
    } catch (err) {
      setError("Failed to sign in with Google.")
    } finally {
      setLoading(false)
    }
  }

  const handleTestLogin = async () => {
    try {
      setError("")
      setLoading(true)
      await loginWithTestAccount()
      navigate("/dashboard")
    } catch (err) {
      setError("Failed to sign in with Test Account.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1 text-center">
        <div className="flex justify-center mb-2">
          <div className="w-12 h-12 bg-surface-container-low rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl">Welcome to LexGuard</CardTitle>
        <CardDescription>
          Sign in to access your contract intelligence dashboard
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        {error && <div className="p-3 text-sm text-error bg-error/10 border border-error/20 rounded-md">{error}</div>}
        
        <Button 
          className="w-full" 
          onClick={handleTestLogin}
          disabled={loading}
        >
          {loading ? "Signing in..." : "Login with Test Account"}
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-outline-variant" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-surface px-2 text-on-surface-variant">
              Or continue with
            </span>
          </div>
        </div>

        <Button 
          className="w-full" 
          variant="outline" 
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          {loading ? "Signing in..." : "Continue with Google"}
        </Button>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-sm text-center text-on-surface-variant">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
