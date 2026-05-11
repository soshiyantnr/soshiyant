import { getCategoryBySlug, getCategoryPosts, getAllCategories } from "@/lib/hygraph-api"
import { Header } from "@/components/blog/header"
import { Footer } from "@/components/blog/footer"
import { ReadingProgress } from "@/components/blog/reading-progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { notFound } from "next/navigation"
import { motion } from "framer-motion"

interface CategoryPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  
  const [categoryData, postsData, allCatsData] = await Promise.all([
    getCategoryBySlug(slug),
    getCategoryPosts(slug),
    getAllCategories(),
  ])
  
  if (!categoryData) {
    notFound()
  }
  
  const category = categoryData
  const posts = postsData || []
  const allCategories = (allCatsData || []).filter(c => c.slug !== slug)

  const featuredPost = posts[0]
  const otherPosts = posts.slice(1)

  return (
    <div className="min-h-screen bg-background">
      <ReadingProgress />
      <Header />

      {/* Category Hero */}
      <section className="pt-24 sm:pt-32 pb-10 sm:pb-16 border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 persian-pattern pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs sm:text-sm font-medium text-muted-foreground tracking-wider">
              دسته‌بندی
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mt-2">
              {category.name}
            </h1>
            {category.description && (
              <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                {category.description}
              </p>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-border">
              <div>
                <p className="text-xl sm:text-2xl font-bold">{posts.length}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">مقاله</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured + Grid */}
      <section className="py-10 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Featured Article */}
          {featuredPost && (
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="group mb-10 sm:mb-12"
            >
              <Link href={`/posts/${featuredPost.slug}`} className="block">
                <div className="grid md:grid-cols-2 gap-4 sm:gap-6 bg-card border border-border/50 rounded-xl sm:rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-xl hover:shadow-foreground/5 transition-all duration-500">
                  {featuredPost.coverImage && (
                    <div className="aspect-[16/10] md:aspect-auto overflow-hidden">
                      <img
                        src={featuredPost.coverImage.url}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-5 sm:p-6 md:p-8 flex flex-col justify-center">
                    <span className="text-xs font-medium text-primary tracking-wider mb-2 sm:mb-3">
                      مقاله ویژه
                    </span>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight group-hover:text-primary transition-colors duration-300">
                      {featuredPost.title}
                    </h2>
                    <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-2 sm:line-clamp-none">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-3 mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-border/50">
                      <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
                        <AvatarImage src={featuredPost.author.avatar?.url} alt={featuredPost.author.name} />
                        <AvatarFallback className="text-xs bg-secondary text-secondary-foreground">
                          {featuredPost.author.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs sm:text-sm font-medium">{featuredPost.author.name}</span>
                      <span className="text-xs sm:text-sm text-muted-foreground">·</span>
                      <span className="text-xs sm:text-sm text-muted-foreground">{featuredPost.readingTime ? `${featuredPost.readingTime} دقیقه` : "۵ دقیقه"}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          )}

          {/* Grid */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl font-bold">همه مقالات</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {otherPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group"
              >
                <Link href={`/posts/${post.slug}`} className="block">
                  <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-foreground/5 transition-all duration-500">
                    {post.coverImage && (
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={post.coverImage.url}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    )}
                    
                    <div className="p-4 sm:p-5">
                      <div className="flex items-center gap-2 sm:gap-3 text-xs tracking-wide mb-2 sm:mb-3">
                        <span className="text-muted-foreground">{post.readingTime ? `${post.readingTime} دقیقه` : "۵ دقیقه"}</span>
                      </div>
                      
                      <h4 className="text-base sm:text-lg font-bold leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        {post.title}
                      </h4>
                      
                      <div className="flex items-center gap-2 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border/50">
                        <Avatar className="h-5 w-5 sm:h-6 sm:w-6">
                          <AvatarImage src={post.author.avatar?.url} alt={post.author.name} />
                          <AvatarFallback className="text-xs bg-secondary text-secondary-foreground">
                            {post.author.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs sm:text-sm text-muted-foreground">{post.author.name}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">هیچ مقاله‌ای در این دسته‌بندی یافت نشد.</p>
            </div>
          )}
        </div>
      </section>

      {/* Related Categories */}
      {allCategories.length > 0 && (
        <section className="py-10 sm:py-16 border-t border-border bg-card">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">دسته‌بندی‌های مرتبط</h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {allCategories.slice(0, 4).map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/categories/${cat.slug}`}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 bg-secondary text-secondary-foreground rounded-full text-xs sm:text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}
