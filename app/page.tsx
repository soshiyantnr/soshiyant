import { Header } from "@/components/blog/header"
import { HeroSection } from "@/components/blog/hero-section"
import { MasonryGrid } from "@/components/blog/masonry-grid"
import { Footer } from "@/components/blog/footer"
import { ReadingProgress } from "@/components/blog/reading-progress"
import { fetchHygraph } from "@/lib/hygraph"

async function getPosts() {
  const query = `
    query GetPosts {
      posts(orderBy: publishDate_DESC, first: 12) {
        id
        title
        slug
        excerpt
        coverImage {
          url
        }
        publishDate
        readingTime
        category
        author {
          name
          slug
          avatar {
            url
          }
        }
      }
    }
  `;

  const data = await fetchHygraph(query);
  return data.posts;
}

export default async function BlogHomepage() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-background">
      <ReadingProgress />
      <Header />
      <HeroSection />
      
      {/* MasonryGrid را با داده‌های واقعی پر می‌کنیم */}
      <MasonryGrid posts={posts} />

      <Footer />
    </main>
  )
}
