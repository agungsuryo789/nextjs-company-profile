"use client"

import type React from "react"

import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { authServices } from "@/services/authServices"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const mutation = useMutation<any, Error, { email: string; password: string }>(
    {
      mutationFn: (data: { email: string; password: string }) => authServices.login(data),
      onSuccess(data: any, variables: { email: string; password: string }) {
        try {
          localStorage.setItem(
            "adminAuth",
            JSON.stringify({ email: variables.email, authenticated: true, data })
          )
        } catch (e) {
          console.error("Failed to save auth data to localStorage:", e)
        }
        router.push("/admin/dashboard")
      },
      onError(err: Error | any) {
        setError((err && (err.message || String(err))) ?? "Login failed")
      },
    }
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    mutation.mutate({ email, password })
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md fade-in">
        <CardHeader className="space-y-2">
          <CardTitle className="flex flex-col gap-6 text-2xl">
            <Link href="/" className="text-sm">{"<- Back to Homepage"}</Link>
            <h3>Admin Login</h3>
          </CardTitle>
          <CardDescription>Enter your credentials to access the dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={mutation.status === "pending"}>
              {mutation.status === "pending" ? "Signing in..." : "Sign in"}
            </Button>
            {error && <div className="text-sm text-destructive mt-2">{error}</div>}
          </form>
          <div className="flex flex-row my-4">
            <Link href={"/reset-password"} className="hover:underline">Reset Password</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
