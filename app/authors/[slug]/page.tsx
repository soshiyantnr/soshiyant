"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/blog/header"
import { Footer } from "@/components/blog/footer"
import { ReadingProgress } from "@/components/blog/reading-progress"
import { FilterBar } from "@/components/blog/filter-bar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getAuthorBySlug, getAuthorPosts } from "@/lib/hygraph-api"

interface AuthorPageProps {
  params: {
    slug: string
  }
}

export default function AuthorPage({ params }: AuthorPageProps) {
  const [author, setAuthor] = useState<any>(null)
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState("همه")

  useEffect(() => {
    const loadAuthor = async () => {
      try {
        const [authorData, postsData] = await Promise.all([
          getAuthorBySlug(params.slug),
          getAuthorPosts(params.slug),
        ])
        setAuthor(authorData)
        setPosts(postsData)
      } catch (error) {
        console.error("Error loading author:", error)
      } finally {
        setLoading(false)
      }
    }

    loadAuthor()
  }, [params.slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">درحال بارگزاری...</p>
      </div>
    )
  }

  if (!author) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">نویسنده‌ای یافت نشد.</p>
      </div>
    )
  }

  // Get unique categories from posts
  const categoryNames = posts
    .map(p => p.category?.name)
    .filter((name): name is string => !!name)
  const categories = ["همه", ...Array.from(new Set(categoryNames))]
  
  const filteredPosts = activeFilter === "همه" 
    ? posts 
    : posts.filter(p => p.category?.name === activeFilter)

  return (
    <div className="min-h-screen bg-background">
      <ReadingProgress />
      <Header />

      {/* Author Hero */}
      <section className="pt-32 pb-16 border-b border-border">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row gap-8 items-start"
          >
            <Avatar className="h-32 w-32 ring-4 ring-background shadow-xl">
              <AvatarImage src={author.avatar?.url} alt={author.name} />
              <AvatarFallback className="text-2xl bg-secondary text-secondary-foreground">
                {author.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                {author.name}
              </h1>
              {author.job && (
                <p className="mt-2 text-lg text-muted-foreground">
                  {author.job}
                </p>
              )}
              {author.bio?.html && (
                <div className="mt-4 text-muted-foreground leading-relaxed max-w-2xl prose prose-invert">
                  <div dangerouslySetInnerHTML={{ __html: author.bio.html }} />
                </div>
              )}

              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/">بازگشت به وبلاگ</Link>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-12 pt-8 border-t border-border"
          >
            <div>
              <p className="text-3xl font-bold">{posts.length}</p>
              <p className="text-sm text-muted-foreground mt-1">مقاله منتشر شده</p>
            </div>
            {author.monthlyReaders && (
              <div>
                <p className="text-3xl font-bold">{author.monthlyReaders.toLocaleString("fa-IR")}</p>
                <p className="text-sm text-muted-foreground mt-1">خواننده ماهانه</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <h2 className="text-2xl font-bold">همه مقالات</h2>
          </div>

          {categories.length > 1 && (
            <FilterBar
              filters={categories}
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              label="دسته‌بندی"
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group"
              >
                <Link href={`/posts/${post.slug}`} className="block">
                  <div className="relative overflow-hidden rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-foreground/5 transition-all duration-500">
                    {post.coverImage?.url && (
                      <div className="aspect-[16/10] overflow-hidden">
                        <img
                          src={post.coverImage.url}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    )}
                    
                    <div className="p-5">
                      <div className="flex items-center gap-3 text-xs tracking-wide mb-3">
                        {post.category?.name && (
                          <span className="px-2.5 py-1 bg-secondary text-secondary-foreground rounded-full font-medium">
                            {post.category.name}
                          </span>
                        )}
                        <span className="text-muted-foreground">
                          {post.readingTime ? `${post.readingTime} دقیقه` : "۵ دقیقه"}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">هیچ مقاله‌ای یافت نشد.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
