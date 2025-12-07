"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminSidebar } from "@/components/admin-sidebar"

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth")
    if (!auth) {
      router.push("/admin")
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <main className="flex-1 ml-0 lg:ml-64 bg-background">
        <div className="p-8">
          <div className="fade-in">
            <h1 className="text-3xl font-semibold mb-2">Welcome to Dashboard</h1>
            <p className="text-muted-foreground">Select an item from the sidebar to get started.</p>
          </div>
        </div>
      </main>
    </div>
  )
}
