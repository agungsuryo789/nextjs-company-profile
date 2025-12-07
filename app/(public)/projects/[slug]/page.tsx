import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Calendar } from "lucide-react"
import { projectsServices } from "@/services/projectsServices"

interface Params {
  slug: string
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  try {
    const resp = await projectsServices.getBySlug(slug)
    const project = resp?.project
    if (project) {
      return { title: project.title, description: project.description }
    }
  } catch (err) {
    console.error("Error fetching project for metadata:", err)
  }

  return { title: "Project not found" }
}

export default async function ProjectDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  let apiProject: any = null
  try {
    const resp = await projectsServices.getBySlug(slug)
    apiProject = resp?.project ?? null
  } catch (err) {
    apiProject = null
  }

  if (!apiProject) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to projects
        </Link>

        <header className="mb-12">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-light tracking-tight">{apiProject.title}</h1>
              <p className="text-muted-foreground mt-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {apiProject.createdAt ? new Date(apiProject.createdAt).toLocaleDateString() : ""}
              </p>
            </div>
            {(apiProject.liveUrl || apiProject.repoUrl) && (
              <Link
                href={apiProject.liveUrl ?? apiProject.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 border border-accent text-accent rounded-lg hover:bg-accent/10 transition-colors"
              >
                <span className="text-sm font-medium">Visit</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
            )}
          </div>
        </header>

        {apiProject.image && (
          <div className="relative overflow-hidden rounded-lg mb-12 bg-muted aspect-video">
            <img src={apiProject.image} alt={apiProject.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="space-y-6 mb-12">
              <p className="text-lg text-muted-foreground">{apiProject.description}</p>
              <div className="space-y-4 text-base leading-relaxed">
                {(apiProject.content ?? "").split("\n\n").map((section: string, index: number) => {
                  if (section.startsWith("**") && section.endsWith(":**")) {
                    return (
                      <h2 key={index} className="text-2xl font-semibold mt-8 mb-4">
                        {section.replace(/\*\*/g, "")}
                      </h2>
                    )
                  }
                  if (section.match(/^-\s/)) {
                    return (
                      <ul key={index} className="space-y-2 list-disc list-inside">
                        {section.split("\n").map((item: string, i: number) => (
                          <li key={i}>{item.replace(/^-|\s*/, "")}</li>
                        ))}
                      </ul>
                    )
                  }
                  return (
                    <p key={index} className="text-foreground">
                      {section}
                    </p>
                  )
                })}
              </div>
            </div>
          </div>

          <aside className="space-y-8">
            <div>
              <h3 className="text-sm font-medium uppercase tracking-widest mb-4 text-muted-foreground">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {(apiProject.tags ?? []).map((tag: string) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 bg-muted text-muted-foreground rounded hover:bg-accent/10 hover:text-accent transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {(apiProject.liveUrl || apiProject.repoUrl) && (
              <div className="pt-8 border-t border-border">
                <Link
                  href={apiProject.liveUrl ?? apiProject.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 border border-accent text-accent rounded-lg hover:bg-accent/10 transition-colors"
                >
                  <span className="font-medium">Explore Project</span>
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            )}
          </aside>
        </div>

        <div className="mt-16 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">Want to see more?</p>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
          >
            View all projects
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </div>
    </main>
  )
}
