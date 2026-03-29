import { Header } from "@/components/blog/header"
import { HeroSection } from "@/components/blog/hero-section"
import { MasonryGrid } from "@/components/blog/masonry-grid"
import { Footer } from "@/components/blog/footer"
import { ReadingProgress } from "@/components/blog/reading-progress"

export default function BlogHomepage() {
  return (
    <main className="min-h-screen bg-background">
      <ReadingProgress />
      <Header />
      <HeroSection />
      <MasonryGrid />
      <Footer />
    </main>
  )
}
