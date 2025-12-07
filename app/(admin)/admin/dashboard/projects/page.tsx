"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminSidebar } from "@/components/admin-sidebar";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import { projectsServices } from "@/services/projectsServices";

interface Project {
  id: string;
  title: string;
  description: string;
  year?: string;
  imageUrl?: string;
  slug: string;
  content?: string;
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
}

export default function ProjectsManagement() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    year: "",
    image: "",
    slug: "",
  });

  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (!auth) router.push("/admin");
    else setIsAuthenticated(true);
  }, [router]);

  const { data } = useQuery({
    queryKey: ["projects"],
    queryFn: () => projectsServices.getAll(),
  });

  const projects: Project[] = (data && (data.project ?? data)) || [];

  const createMutation = useMutation({
    mutationFn: (payload: any) => projectsServices.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      handleCloseModal();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      projectsServices.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      handleCloseModal();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => projectsServices.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  const handleOpenModal = (project?: Project) => {
    if (project) {
      setEditingId(project.id);
      setFormData({
        title: project.title ?? "",
        description: project.description ?? "",
        year: project.year ?? "",
        image: project.imageUrl ?? "",
        slug: project.slug ?? "",
      });
    } else {
      setEditingId(null);
      setFormData({
        title: "",
        description: "",
        year: "",
        image: "",
        slug: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({
      title: "",
      description: "",
      year: "",
      image: "",
      slug: "",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      title: formData.title,
      slug: formData.slug,
      description: formData.description,
      content: formData.description,
      liveUrl: "",
      repoUrl: "",
      featured: false,
      year: formData.year,
    };

    if (editingId) updateMutation.mutate({ id: editingId, payload });
    else createMutation.mutate(payload);
  };

  if (!isAuthenticated) return null;

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <main className="flex-1 ml-0 lg:ml-64 bg-background overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-semibold mb-2">
                Projects Management
              </h1>
              <p className="text-muted-foreground">
                Manage all projects for your portfolio
              </p>
            </div>
            <Button
              onClick={() => handleOpenModal()}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Project
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.length > 0 &&
              projects.map((project: Project) => (
                <div
                  key={project.id}
                  className="border border-border rounded-lg overflow-hidden bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="aspect-video bg-muted overflow-hidden">
                    <img
                      src={project.imageUrl || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-semibold text-sm mb-1">
                        {project.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {project.year}
                    </p>
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => handleOpenModal(project)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-1.5 text-xs bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/20 rounded transition-colors"
                      >
                        <Edit2 className="w-3 h-3" />
                        Edit
                      </button>
                      <button
                        onClick={() => deleteMutation.mutate(project.id)}
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

          {isModalOpen && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-background border border-border rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">
                    {editingId ? "Edit Project" : "Add New Project"}
                  </h2>
                  <button
                    onClick={handleCloseModal}
                    className="p-1 hover:bg-muted rounded transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full px-4 py-2 border rounded"
                      placeholder="Project title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Description
                    </label>
                    <textarea
                      required
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      rows={3}
                      className="w-full px-4 py-2 border rounded"
                      placeholder="Project description"
                    />
                  </div>

                  <input
                    required
                    placeholder="Slug"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    className="px-4 py-2 border rounded block w-full"
                  />

                  <input
                    placeholder="Image URL"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded"
                  />

                  <div className="flex gap-3 pt-4">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={handleCloseModal}
                      type="button"
                    >
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
  );
}
