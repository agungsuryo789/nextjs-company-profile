"use client"

import { useEffect, useState } from "react"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className={`fade-in-up transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6 leading-tight">
            Crafting
            <span className="block text-accent"> Digital Experiences</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-8 leading-relaxed">
            We create minimal, modern digital experiences that combine thoughtful design with elegant engineering. Every
            project is a collaboration of creativity and technical excellence.
          </p>
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
              View Our Work
            </button>
            <button className="px-6 py-3 border border-border text-foreground rounded-lg hover:bg-muted transition-colors text-sm font-medium">
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
