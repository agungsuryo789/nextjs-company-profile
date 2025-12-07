"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { projectsData, type Project } from "@/data/projects";
import { useQuery } from "@tanstack/react-query";
import { projectsServices } from "@/services/projectsServices";
export default function Projects() {
  const {
    data: allProjects,
    error: errorAllProjects,
    isLoading,
  } = useQuery<{
    success: boolean;
    project: any[];
  }>({
    queryKey: ["projects"],
    queryFn: async () => {
      return await projectsServices.getAll();
    },
  });

  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const api = allProjects?.project;
    const items = api
      ? api.map((a) => ({
          id: a.id,
          title: a.title,
          description: a.description,
          tags: a.tags ?? [],
          year: a.createdAt
            ? new Date(a.createdAt).getFullYear().toString()
            : "",
          image: a.imageUrl ?? "",
          slug: a.slug,
        }))
      : [];

    setProjects(items);
    items.forEach((_, index) => {
      setTimeout(() => {
        setVisibleItems((prev) => [...prev, index]);
      }, index * 150);
    });
  }, [allProjects]);

  if (isLoading) return <div>Loading...</div>;
  if (errorAllProjects) return <div>Error loading projects.</div>;

  return (
    <section id="projects" className="py-20 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
            Featured Projects
          </h2>
          <p className="text-muted-foreground">
            Selected work showcasing our expertise and creativity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className={`group transition-all duration-500 ${
                visibleItems.includes(index)
                  ? "fade-in-up opacity-100"
                  : "opacity-0"
              }`}
            >
              <div className="relative overflow-hidden rounded-lg mb-4 bg-muted aspect-video">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-medium group-hover:text-cyan-500 transition-colors flex-1">
                    {project.title}
                  </h3>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-cyan-500 shrink-0 transition-colors" />
                </div>
                <p className="text-sm text-muted-foreground">
                  {project.description}
                </p>
                <p className="text-xs text-muted-foreground pt-2">
                  {project.year}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-cyan-500 hover:gap-3 transition-all"
          >
            View All Projects
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
