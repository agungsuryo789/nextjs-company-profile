export interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  year: string
  image: string
  slug: string
}

export const projectsData: Project[] = [
  {
    id: 1,
    title: "Minimal Design System",
    description:
      "A comprehensive design system built for modern web applications with accessibility at its core.",
    tags: ["Design", "React", "Tailwind"],
    year: "2024",
    image: "/minimal-design-system.jpg",
    slug: "design-system",
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    description:
      "High-performance e-commerce platform with real-time inventory and seamless checkout experience.",
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
    year: "2024",
    image: "/ecommerce-platform-interface.png",
    slug: "ecommerce-platform",
  },
  {
    id: 3,
    title: "Analytics Dashboard",
    description:
      "Real-time analytics dashboard providing insights with beautiful data visualizations.",
    tags: ["React", "Chart.js", "WebSockets"],
    year: "2023",
    image: "/analytics-dashboard.png",
    slug: "analytics-dashboard",
  },
]
