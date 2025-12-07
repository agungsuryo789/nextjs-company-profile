import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function About() {
  const team = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Founder & Creative Director",
      bio: "With 10+ years of experience in digital design, Sarah leads our vision for innovative creative solutions.",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Lead Developer",
      bio: "Full-stack developer passionate about building scalable web applications and mentoring junior developers.",
    },
    {
      id: 3,
      name: "Emma Williams",
      role: "Content Strategist",
      bio: "Expert in crafting compelling narratives that resonate with audiences across all digital platforms.",
    },
    {
      id: 4,
      name: "David Martinez",
      role: "Design Lead",
      bio: "UI/UX specialist focused on creating beautiful and intuitive user experiences.",
    },
  ]

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

      {/* Hero Section */}
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

      {/* Mission Section */}
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

      {/* Values Section */}
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

      {/* Team Section */}
      <section className="py-16 px-6 bg-secondary/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-foreground mb-12 fade-in-up">Meet the Team</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {team.map((member, index) => (
              <div
                key={member.id}
                className="p-6 border border-border rounded-lg bg-card hover:shadow-lg transition-shadow fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-accent/20 rounded-full mb-4 flex items-center justify-center">
                  <span className="text-2xl font-semibold text-accent">{member.name.charAt(0)}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">{member.name}</h3>
                <p className="text-sm text-accent mb-3 font-medium">{member.role}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
