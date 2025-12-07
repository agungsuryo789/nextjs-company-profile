import { api } from "@/lib/api";

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  liveUrl: string | null;
  repoUrl: string | null;
  featured: boolean;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    email: string;
    name: string;
  };
}

export const projectsServices = {
  getAll: () => api("/projects"),
  create: (data: any) =>
    api("/projects", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  getBySlug: (slug: string) => api(`/projects/${slug}`),
  update: (id: string, data: any) =>
    api(`/projects/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id: string) => api(`/projects/${id}`, { method: "DELETE" }),
};
