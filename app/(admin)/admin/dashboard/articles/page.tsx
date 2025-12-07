"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Plus, Edit2, Trash2, X } from "lucide-react"

interface Article {
  id: number
  title: string
  excerpt: string
  date: string
  category: string
  slug: string
}

const initialArticles: Article[] = [
  {
    id: 1,
    title: "The Art of Minimalist Web Design",
    excerpt: "Exploring how simplicity and constraint breed innovation in modern web design.",
    date: "Dec 4, 2024",
    category: "Design",
    slug: "minimalist-web-design",
  },
  {
    id: 2,
    title: "Building Performant React Applications",
    excerpt: "Deep dive into optimization techniques for building lightning-fast React apps.",
    date: "Nov 28, 2024",
    category: "Engineering",
    slug: "react-performance",
  },
  {
    id: 3,
    title: "The Future of Web Standards",
    excerpt: "What's coming next in web technologies and how to prepare your projects.",
    date: "Nov 20, 2024",
    category: "Technology",
    slug: "web-standards-future",
  },
]

export default function ArticlesManagement() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [articles, setArticles] = useState<Article[]>(initialArticles)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    date: "",
    category: "",
    slug: "",
  })
  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth")
    if (!auth) {
      router.push("/admin")
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  const handleOpenModal = (article?: Article) => {
    if (article) {
      setEditingId(article.id)
      setFormData(article)
    } else {
      setEditingId(null)
      setFormData({ title: "", excerpt: "", date: "", category: "", slug: "" })
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingId(null)
    setFormData({ title: "", excerpt: "", date: "", category: "", slug: "" })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      setArticles(articles.map((a) => (a.id === editingId ? { ...formData, id: editingId } : a)))
    } else {
      setArticles([...articles, { ...formData, id: Date.now() }])
    }
    handleCloseModal()
  }

  const handleDelete = (id: number) => {
    setArticles(articles.filter((a) => a.id !== id))
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <main className="flex-1 ml-0 lg:ml-64 bg-background overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-semibold mb-2">Articles Management</h1>
              <p className="text-muted-foreground">Manage all articles for your company profile</p>
            </div>
            <Button onClick={() => handleOpenModal()} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Article
            </Button>
          </div>

          {/* Articles Table */}
          <div className="border border-border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium">Title</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Category</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Date</th>
                  <th className="px-6 py-3 text-right text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr key={article.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 text-sm">{article.title}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-3 py-1 bg-accent/10 text-accent rounded text-xs font-medium">
                        {article.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{article.date}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenModal(article)}
                        className="inline-flex items-center gap-2 px-3 py-1 text-sm bg-accent/10 text-accent hover:bg-accent/20 rounded transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="inline-flex items-center gap-2 px-3 py-1 text-sm bg-red-500/10 text-red-600 hover:bg-red-500/20 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-background border border-border rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">{editingId ? "Edit Article" : "Add New Article"}</h2>
                  <button onClick={handleCloseModal} className="p-1 hover:bg-muted rounded transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="Article title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Excerpt</label>
                    <textarea
                      required
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="Article excerpt"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Category</label>
                      <input
                        type="text"
                        required
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="e.g., Design"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Date</label>
                      <input
                        type="text"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="e.g., Dec 4, 2024"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Slug</label>
                    <input
                      type="text"
                      required
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="e.g., minimalist-web-design"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button onClick={handleCloseModal} variant="outline" className="flex-1 bg-transparent">
                      Cancel
                    </Button>
                    <Button type="submit" className="flex-1">
                      {editingId ? "Update Article" : "Add Article"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
