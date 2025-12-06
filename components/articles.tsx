"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { articlesData } from "@/data/articles"

export default function Articles() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])

  useEffect(() => {
    articlesData.forEach((_, index) => {
      setTimeout(() => {
        setVisibleItems((prev) => [...prev, index])
      }, index * 100)
    })
  }, [])

  return (
    <section id="articles" className="py-20 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4">Latest Articles</h2>
          <p className="text-muted-foreground">Thoughts on design, engineering, and the web</p>
        </div>

        <div className="space-y-6">
          {articlesData.map((article, index) => (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              className={`group block p-6 border border-border rounded-lg hover:border-accent hover:bg-muted/30 transition-all duration-500 ${
                visibleItems.includes(index) ? "fade-in-up opacity-100" : "opacity-0"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-medium text-accent uppercase tracking-widest">
                      {article.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{article.date}</span>
                  </div>
                  <h3 className="text-lg font-medium mb-2 group-hover:text-accent transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{article.excerpt}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all shrink-0 mt-1" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:gap-3 transition-all"
          >
            View All Articles
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
