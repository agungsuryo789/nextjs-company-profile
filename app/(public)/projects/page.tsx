import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Link from "next/link";
import { projectsServices, type Project } from "@/services/projectsServices";

export default async function ProjectsPage() {
  const projectsDat = await projectsServices.getAll();
  const projects = projectsDat.project;

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
              All Projects
            </h1>
            <p className="text-muted-foreground">
              A curated list of projects (mock data).
            </p>
          </div>

          <div className="grid gap-6">
            {projects.map((project: Project) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="block p-6 border border-border rounded-lg hover:border-cyan-500 hover:bg-muted/30 transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-medium text-cyan-500 uppercase tracking-widest">
                        {project.updatedAt}
                      </span>
                    </div>
                    <h2 className="text-lg font-medium mb-2">
                      {project.title}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {project.description}
                    </p>
                  </div>
                  <ExternalLinkIcon />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      className="w-5 h-5 text-muted-foreground"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 3h7v7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 14L21 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 21H3V3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
