"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin-sidebar";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  articlesServices,
  type Article as ApiArticle,
} from "@/services/articlesServices";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  published: boolean;
  content: string;
  slug: string;
}

const initialArticles: Article[] = [];

export default function ArticlesManagement() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  type FormState = {
    title: string;
    excerpt: string;
    date: string;
    category: string;
    slug: string;
    content: string;
    published: boolean;
  };

  const [formData, setFormData] = useState<FormState>({
    title: "",
    excerpt: "",
    date: "",
    category: "",
    slug: "",
    content: "",
    published: false,
  });

  const router = useRouter();
  const queryClient = useQueryClient();

  const { data } = useQuery<
    { success: boolean; articles: ApiArticle[] },
    Error
  >({
    queryKey: ["admin-articles"],
    queryFn: () => articlesServices.getAll(),
  });

  const createMutation = useMutation({
    mutationFn: (payload: any) => articlesServices.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-articles"] });
      handleCloseModal();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      articlesServices.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-articles"] });
      handleCloseModal();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => articlesServices.delete(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["admin-articles"] }),
  });

  useEffect(() => {
    if (data?.articles) {
      const mapped = data.articles.map((a: ApiArticle) => ({
        id: a.id,
        title: a.title,
        excerpt: a.excerpt,
        content: a.content ?? "",
        date: new Date(a.publishedAt ?? a.createdAt).toLocaleDateString(),
        category: a.author?.name ?? "",
        published:
          typeof a.published === "boolean" ? a.published : !!a.publishedAt,
        slug: a.slug,
      }));
      setArticles(mapped);
    }
  }, [data]);

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (!auth) {
      router.push("/admin");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleOpenModal = (article?: Article) => {
    if (article) {
      console.log("Editing article:", article.id);
      setEditingId(article.id);
      setFormData({
        title: article.title,
        excerpt: article.excerpt,
        date: article.date,
        category: article.category,
        slug: article.slug,
        content: article.content ?? "",
        published: article.published ?? false,
      });
    } else {
      setEditingId(null);
      setFormData({
        title: "",
        excerpt: "",
        date: "",
        category: "",
        slug: "",
        content: "",
        published: false,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({
      title: "",
      excerpt: "",
      date: "",
      category: "",
      slug: "",
      content: "",
      published: false,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      title: formData.title,
      excerpt: formData.excerpt,
      slug: formData.slug,
      content: formData.content,
      published: formData.published,
    };

    if (editingId) {
      updateMutation.mutate({ id: editingId, payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
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
                Articles Management
              </h1>
              <p className="text-muted-foreground">
                Manage all articles for your company profile
              </p>
            </div>
            <Button
              onClick={() => handleOpenModal()}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Article
            </Button>
          </div>

          {/* Table */}
          <div className="border border-border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium">
                    Published
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr
                    key={article.id}
                    className="border-t border-border hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm">{article.title}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {article.date}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={
                          "inline-block px-2 py-0.5 text-xs rounded font-medium " +
                          (article.published
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700")
                        }
                      >
                        {article.published ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenModal(article)}
                        className="inline-flex items-center gap-2 px-3 py-1 text-sm bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/20 rounded transition-colors"
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
                  <h2 className="text-2xl font-semibold">
                    {editingId ? "Edit Article" : "Add New Article"}
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
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      placeholder="Article title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Excerpt
                    </label>
                    <textarea
                      required
                      value={formData.excerpt}
                      onChange={(e) =>
                        setFormData({ ...formData, excerpt: e.target.value })
                      }
                      rows={3}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      placeholder="Short intro"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Content
                    </label>
                    <textarea
                      required
                      value={formData.content}
                      onChange={(e) =>
                        setFormData({ ...formData, content: e.target.value })
                      }
                      rows={8}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      placeholder="Full article content goes here."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 items-center">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Slug
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.slug}
                        onChange={(e) =>
                          setFormData({ ...formData, slug: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        placeholder="e.g., new-article-cli221sss2s12"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        id="published"
                        type="checkbox"
                        checked={formData.published}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            published: e.target.checked,
                          })
                        }
                        className="w-4 h-4"
                      />
                      <label
                        htmlFor="published"
                        className="text-sm font-medium"
                      >
                        Published
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={handleCloseModal}
                      variant="outline"
                      className="flex-1 bg-transparent"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1"
                      disabled={
                        createMutation.isPending || updateMutation.isPending
                      }
                    >
                      {editingId
                        ? updateMutation.isPending
                          ? "Updating..."
                          : "Update Article"
                        : createMutation.isPending
                        ? "Saving..."
                        : "Add Article"}
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
