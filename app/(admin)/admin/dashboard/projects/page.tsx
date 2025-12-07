"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Plus, Edit2, Trash2, X } from "lucide-react"

interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  year: string
  image: string
  slug: string
}

const initialProjects: Project[] = [
  {
    id: 1,
    title: "Minimal Design System",
    description: "A comprehensive design system built for modern web applications with accessibility at its core.",
    tags: ["Design", "React", "Tailwind"],
    year: "2024",
    image: "/minimal-design-system.jpg",
    slug: "design-system",
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    description: "High-performance e-commerce platform with real-time inventory and seamless checkout experience.",
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
    year: "2024",
    image: "/ecommerce-platform-interface.png",
    slug: "ecommerce-platform",
  },
  {
    id: 3,
    title: "Analytics Dashboard",
    description: "Real-time analytics dashboard providing insights with beautiful data visualizations.",
    tags: ["React", "Chart.js", "WebSockets"],
    year: "2023",
    image: "/analytics-dashboard.png",
    slug: "analytics-dashboard",
  },
]

export default function ProjectsManagement() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: [] as string[],
    year: "",
    image: "",
    slug: "",
  })
  const [tagInput, setTagInput] = useState("")
  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth")
    if (!auth) {
      router.push("/admin")
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  const handleOpenModal = (project?: Project) => {
    if (project) {
      setEditingId(project.id)
      setFormData(project)
    } else {
      setEditingId(null)
      setFormData({ title: "", description: "", tags: [], year: "", image: "", slug: "" })
    }
    setIsModalOpen(true)
    setTagInput("")
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingId(null)
    setFormData({ title: "", description: "", tags: [], year: "", image: "", slug: "" })
    setTagInput("")
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] })
      setTagInput("")
    }
  }

  const handleRemoveTag = (index: number) => {
    setFormData({ ...formData, tags: formData.tags.filter((_, i) => i !== index) })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingId) {
      setProjects(projects.map((p) => (p.id === editingId ? { ...formData, id: editingId } : p)))
    } else {
      setProjects([...projects, { ...formData, id: Date.now() }])
    }
    handleCloseModal()
  }

  const handleDelete = (id: number) => {
    setProjects(projects.filter((p) => p.id !== id))
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
              <h1 className="text-3xl font-semibold mb-2">Projects Management</h1>
              <p className="text-muted-foreground">Manage all projects for your portfolio</p>
            </div>
            <Button onClick={() => handleOpenModal()} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Project
            </Button>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="border border-border rounded-lg overflow-hidden bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="aspect-video bg-muted overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-semibold text-sm mb-1">{project.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{project.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 bg-accent/10 text-accent rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">{project.year}</p>
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => handleOpenModal(project)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-1.5 text-xs bg-accent/10 text-accent hover:bg-accent/20 rounded transition-colors"
                    >
                      <Edit2 className="w-3 h-3" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-1.5 text-xs bg-red-500/10 text-red-600 hover:bg-red-500/20 rounded transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-background border border-border rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">{editingId ? "Edit Project" : "Add New Project"}</h2>
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
                      placeholder="Project title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="Project description"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Year</label>
                      <input
                        type="text"
                        required
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="e.g., 2024"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Slug</label>
                      <input
                        type="text"
                        required
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="e.g., design-system"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Image URL</label>
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="/image-name.jpg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Tags</label>
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
                        className="flex-1 px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="Add tag and press Enter"
                      />
                      <Button type="button" onClick={handleAddTag} variant="outline">
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-accent/10 text-accent rounded text-sm flex items-center gap-2"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(index)}
                            className="hover:text-accent/70 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button onClick={handleCloseModal} variant="outline" className="flex-1 bg-transparent">
                      Cancel
                    </Button>
                    <Button type="submit" className="flex-1">
                      {editingId ? "Update Project" : "Add Project"}
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
