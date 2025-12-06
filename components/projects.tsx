"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  year: string
  image: string
  slug: string
}

const projectsData: Project[] = [
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

export default function Projects() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])

  useEffect(() => {
    projectsData.forEach((_, index) => {
      setTimeout(() => {
        setVisibleItems((prev) => [...prev, index])
      }, index * 150)
    })
  }, [])

  return (
    <section id="projects" className="py-20 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4">Featured Projects</h2>
          <p className="text-muted-foreground">Selected work showcasing our expertise and creativity</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className={`group transition-all duration-500 ${
                visibleItems.includes(index) ? "fade-in-up opacity-100" : "opacity-0"
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
                  <h3 className="text-lg font-medium group-hover:text-accent transition-colors flex-1">
                    {project.title}
                  </h3>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-accent shrink-0 transition-colors" />
                </div>
                <p className="text-sm text-muted-foreground">{project.description}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded transition-colors group-hover:bg-accent/10 group-hover:text-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground pt-2">{project.year}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:gap-3 transition-all"
          >
            View All Projects
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
