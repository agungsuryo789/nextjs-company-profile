import { api } from "@/lib/api";

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  published: boolean;
  publishedAt: string | null;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    email: string;
    name: string;
  };
}

export const articlesServices = {
  getAll: () => api("/articles"),
  create: (data: any) =>
    api("/articles", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  getBySlug: (slug: string) => api(`/articles/${slug}`),
  update: (id: string, data: any) =>
    api(`/articles/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id: string) => api(`/articles/${id}`, { method: "DELETE" }),
};
