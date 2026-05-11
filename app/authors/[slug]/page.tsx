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

  const categories = ["همه", ...Array.from(new Set(posts.flatMap(p => p.categories.map((c: any) => c.name))))]
  const filteredPosts = activeFilter === "همه" 
    ? posts 
    : posts.filter(p => p.categories.some((c: any) => c.name === activeFilter))

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
              <AvatarImage src={author.image?.url} alt={author.name} />
              <AvatarFallback className="text-2xl bg-secondary text-secondary-foreground">
                {author.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                {author.name}
              </h1>
              {author.bio && (
                <p className="mt-4 text-muted-foreground leading-relaxed max-w-2xl">
                  <div dangerouslySetInnerHTML={{ __html: author.bio.html }} />
                </p>
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
            className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-border"
          >
            <div>
              <p className="text-3xl font-bold">{posts.length}</p>
              <p className="text-sm text-muted-foreground mt-1">مقاله منتشر شده</p>
            </div>
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
                    {post.coverImage && (
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
                        {post.categories.length > 0 && (
                          <span className="px-2.5 py-1 bg-secondary text-secondary-foreground rounded-full font-medium">
                            {post.categories[0].name}
                          </span>
                        )}
                        <span className="text-muted-foreground">۵ دقیقه</span>
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
              <p className="text-muted-foreground">هیچ مقاله‌ای در این دسته‌بندی یافت نشد.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

const articles = [
  {
    slug: "ai-future-iranian-businesses",
    title: "هوش مصنوعی و آینده کسب‌وکارهای ایرانی",
    excerpt: "چگونه هوش مصنوعی می‌تواند صنایع مختلف ایران را متحول کند و فرصت‌های جدیدی برای کارآفرینان ایجاد نماید.",
    category: "فناوری",
    readTime: "۸ دقیقه",
    publishedAt: "۱۵ آذر ۱۴۰۴",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80",
  },
  {
    slug: "machine-learning-basics",
    title: "مبانی یادگیری ماشین برای مبتدیان",
    excerpt: "راهنمای جامع برای شروع یادگیری ماشین با مثال‌های کاربردی و عملی.",
    category: "آموزش",
    readTime: "۱۲ دقیقه",
    publishedAt: "۸ آذر ۱۴۰۴",
    imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&q=80",
  },
  {
    slug: "tech-trends-2026",
    title: "روندهای فناوری در سال ۱۴۰۵",
    excerpt: "پیش‌بینی و بررسی مهم‌ترین روندهای فناوری که سال آینده را شکل خواهند داد.",
    category: "فناوری",
    readTime: "۷ دقیقه",
    publishedAt: "۱ آذر ۱۴۰۴",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80",
  },
  {
    slug: "startup-funding-guide",
    title: "راهنمای جذب سرمایه برای استارتاپ‌ها",
    excerpt: "آنچه باید درباره مراحل مختلف جذب سرمایه و آماده‌سازی برای آن بدانید.",
    category: "کسب‌وکار",
    readTime: "۱۰ دقیقه",
    publishedAt: "۲۵ آبان ۱۴۰۴",
    imageUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&q=80",
  },
  {
    slug: "data-privacy-iran",
    title: "حریم خصوصی داده‌ها در ایران",
    excerpt: "بررسی قوانین و الزامات حفظ حریم خصوصی داده‌ها برای کسب‌وکارهای ایرانی.",
    category: "حقوقی",
    readTime: "۶ دقیقه",
    publishedAt: "۱۸ آبان ۱۴۰۴",
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80",
  },
  {
    slug: "remote-work-tech-teams",
    title: "مدیریت تیم‌های فناوری از راه دور",
    excerpt: "تجربیات و درس‌های آموخته شده از مدیریت تیم‌های توزیع‌شده در شرکت‌های فناوری.",
    category: "مدیریت",
    readTime: "۹ دقیقه",
    publishedAt: "۱۰ آبان ۱۴۰۴",
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
  },
]

const categories = ["همه", "فناوری", "آموزش", "کسب‌وکار", "حقوقی", "مدیریت"]

export default function AuthorPage() {
  const [activeFilter, setActiveFilter] = useState("همه")

  const filteredArticles = activeFilter === "همه" 
    ? articles 
    : articles.filter(a => a.category === activeFilter)

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
              <AvatarImage src={author.avatar} alt={author.name} />
              <AvatarFallback className="text-2xl bg-secondary text-secondary-foreground">
                {author.initials}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                {author.name}
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">
                {author.role} · {author.location}
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed max-w-2xl">
                {author.bio}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {author.social.twitter && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={author.social.twitter} target="_blank" rel="noopener noreferrer">
                      دنبال کنید در X
                    </a>
                  </Button>
                )}
                {author.social.linkedin && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={author.social.linkedin} target="_blank" rel="noopener noreferrer">
                      لینکدین
                    </a>
                  </Button>
                )}
                {author.social.website && (
                  <Button variant="ghost" size="sm" asChild>
                    <a href={author.social.website} target="_blank" rel="noopener noreferrer">
                      وب‌سایت
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-border"
          >
            <div>
              <p className="text-3xl font-bold">{author.stats.articles}</p>
              <p className="text-sm text-muted-foreground mt-1">مقاله منتشر شده</p>
            </div>
            <div>
              <p className="text-3xl font-bold">{author.stats.readers}</p>
              <p className="text-sm text-muted-foreground mt-1">خواننده ماهانه</p>
            </div>
            <div>
              <p className="text-3xl font-bold">{author.stats.topics}</p>
              <p className="text-sm text-muted-foreground mt-1">موضوع تخصصی</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <h2 className="text-2xl font-bold">همه مقالات</h2>
          </div>

          <FilterBar
            filters={categories}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            label="دسته‌بندی"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredArticles.map((article, index) => (
              <motion.article
                key={article.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group"
              >
                <Link href={`/posts/${article.slug}`} className="block">
                  <div className="relative overflow-hidden rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-foreground/5 transition-all duration-500">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    
                    <div className="p-5">
                      <div className="flex items-center gap-3 text-xs tracking-wide mb-3">
                        <span className="px-2.5 py-1 bg-secondary text-secondary-foreground rounded-full font-medium">
                          {article.category}
                        </span>
                        <span className="text-muted-foreground">{article.readTime}</span>
                        <span className="text-muted-foreground">{article.publishedAt}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        {article.title}
                      </h3>
                      
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">هیچ مقاله‌ای در این دسته‌بندی یافت نشد.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
