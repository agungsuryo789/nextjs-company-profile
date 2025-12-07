"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useMutation } from "@tanstack/react-query"
import { authServices } from "@/services/authServices"
import { useRouter } from "next/navigation"

export default function ResetPassword() {
  const [password, setPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()

  const mutation = useMutation({
    mutationFn: (data: { currentPassword: string; newPassword: string }) => authServices.reset(data),
    onSuccess: () => {
      router.push("/admin/dashboard")
    },
    onError: (err: any) => {
      setError(err?.message || "Reset password failed")
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    mutation.mutate({
      currentPassword: password,
      newPassword,
    })
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md fade-in">
        <CardHeader className="space-y-2">
          <CardTitle className="flex flex-col gap-6 text-2xl">
            <Link href="/admin/dashboard" className="text-sm">{"<- Back to Dashboard"}</Link>
            <h3>Reset Password</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">Current Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">New Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full bg-cyan-500" disabled={mutation.isPending}>
              {mutation.isPending ? "..." : "Reset Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
