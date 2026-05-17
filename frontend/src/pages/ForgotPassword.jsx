import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/Card"
import { Input } from "../components/ui/Input"
import { Button } from "../components/ui/Button"
import { Shield, ArrowLeft, CheckCircle2 } from "lucide-react"

export default function ForgotPassword() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1 text-center">
        <div className="flex justify-center mb-2">
          <div className="w-12 h-12 bg-surface-container-low rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl">Reset password</CardTitle>
        <CardDescription>
          Enter your email address and we will send you a password reset link
        </CardDescription>
      </CardHeader>
      
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none" htmlFor="email">Email</label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full" type="submit">Send reset link</Button>
            <div className="text-sm text-center text-on-surface-variant">
              <Link to="/login" className="flex items-center justify-center text-primary hover:underline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to log in
              </Link>
            </div>
          </CardFooter>
        </form>
      ) : (
        <CardContent className="space-y-4 pt-4">
          <div className="rounded-md bg-green-50 dark:bg-green-500/10 p-4 border border-green-200 dark:border-green-500/20">
            <div className="flex">
              <div className="flex-shrink-0">
                <CheckCircle2 className="h-5 w-5 text-green-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800 dark:text-green-300">Check your email</h3>
                <div className="mt-2 text-sm text-green-700 dark:text-green-400">
                  <p>We have sent a password reset link to your email address.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <Link to="/login">
              <Button variant="outline" className="w-full">Return to log in</Button>
            </Link>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
