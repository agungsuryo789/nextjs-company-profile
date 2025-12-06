import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Link from "next/link"
import { articlesData } from "@/data/articles"

export default function ArticlesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">All Articles</h1>
            <p className="text-muted-foreground">All mock articles available for this demo.</p>
          </div>

          <div className="grid gap-6">
            {articlesData.map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="block p-6 border border-border rounded-lg hover:border-accent hover:bg-muted/30 transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-medium text-accent uppercase tracking-widest">{article.category}</span>
                      <span className="text-xs text-muted-foreground">{article.date}</span>
                    </div>
                    <h2 className="text-lg font-medium mb-2">{article.title}</h2>
                    <p className="text-sm text-muted-foreground">{article.excerpt}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
