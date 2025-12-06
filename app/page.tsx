import Navigation from "@/components/navigation";
import Hero from "@/components/hero";
import Articles from "@/components/articles";
import Projects from "@/components/projects";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Articles />
      <Projects />
      <Footer />
    </main>
  );
}
