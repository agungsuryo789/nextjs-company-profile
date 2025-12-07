import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";
import { articlesServices } from "@/services/articlesServices";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

interface Params {
  slug: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const articleDat = await articlesServices.getBySlug(slug);
  const article = articleDat.article;

  if (!article) {
    return { title: "Article not found" };
  }

  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const articleDat = await articlesServices.getBySlug(slug);
  const article = articleDat.article;

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-3xl mx-auto px-6 py-20">
        <Link
          href="/#articles"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-cyan-500 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to articles
        </Link>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
            {article.title}
          </h1>

          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground border-t border-b border-border py-6">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{article.author.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{article.createdAt}</span>
            </div>
          </div>
        </header>

        <article className="prose prose-sm max-w-none">
          <div
            className="space-y-6 text-base leading-relaxed text-foreground"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>

        <div className="mt-16 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">
            Found this helpful?
          </p>
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-cyan-500 hover:text-cyan-500/80 transition-colors"
          >
            Read more articles
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
