import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function About() {
  const values = [
    { title: "Innovation", description: "We embrace new ideas and technologies to push creative boundaries." },
    { title: "Quality", description: "Excellence in every detail, from concept to execution." },
    {
      title: "Collaboration",
      description: "We believe the best work comes from diverse perspectives working together.",
    },
    { title: "Transparency", description: "Open communication and honesty with our clients and team." },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-semibold text-foreground mb-6 fade-in-up">About Studio</h1>
          <p className="text-lg text-muted-foreground leading-relaxed fade-in-up">
            We're a creative studio dedicated to crafting digital experiences that inspire, engage, and drive results.
            Founded in 2020, we've worked with brands across industries to bring their visions to life through
            thoughtful design and robust technology.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 bg-secondary/20">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="fade-in-up">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To empower businesses with innovative digital solutions that combine beautiful design with cutting-edge
                technology. We're committed to delivering work that not only meets expectations but exceeds them.
              </p>
            </div>
            <div className="fade-in-up">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                To become a trusted partner for brands seeking transformative digital experiences. We envision a future
                where technology and creativity seamlessly blend to create meaningful connections between businesses and
                their audiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold text-foreground mb-12 fade-in-up">Our Core Values</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="p-6 border border-border rounded-lg hover:bg-secondary/50 transition-colors fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
