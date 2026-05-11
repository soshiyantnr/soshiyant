import { getPosts, getAllCategories } from "@/lib/hygraph-api"
import { Header } from "@/components/blog/header"
import { HeroSection } from "@/components/blog/hero-section"
import { MasonryGrid } from "@/components/blog/masonry-grid"
import { Footer } from "@/components/blog/footer"
import { ReadingProgress } from "@/components/blog/reading-progress"

export default async function BlogHomepage() {
  const [posts, categories] = await Promise.all([
    getPosts(),
    getAllCategories(),
  ])

  return (
    <main className="min-h-screen bg-background">
      <ReadingProgress />
      <Header />
      <HeroSection />
      <MasonryGrid posts={posts} categories={categories} />
      <Footer />
    </main>
  )
}
