"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArticleCard } from "@/components/blog/article-card"
interface Author {
  name: string
  slug: string
  avatar?: {
    url: string
  }
}

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  coverImage?: {
    url: string
  }
  category: string
  categorySlug?: string
  readTime: string
  author: Author
  featured?: boolean
}

interface MasonryGridProps {
  posts: Post[]
}

const categories = [
  { id: "all", label: "همه" },
  { id: "technology", label: "فناوری" },
  { id: "design", label: "طراحی" },
  { id: "education", label: "آموزش" },
  { id: "travel", label: "سفر" },
  { id: "art", label: "هنر" },
  { id: "business", label: "کسب‌وکار" },
]

export function MasonryGrid({ posts }: MasonryGridProps) {
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredPosts = activeCategory === "all" 
    ? posts 
    : posts.filter(post => 
        post.categorySlug === activeCategory || 
        post.category.toLowerCase() === activeCategory
      )

  return (
    <section id="latest-posts" className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-10 sm:mb-16"
        >
          <span className="text-sm tracking-[0.15em] text-muted-foreground">
            آخرین نوشته‌ها
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 tracking-tight">
            دیدگاه‌های تازه
          </h2>
        </motion.div>

        {/* Category Filter - دقیقاً همان ظاهر قبلی */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-10 sm:mb-12 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          <div className="flex gap-2 sm:gap-3 min-w-max sm:flex-wrap">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-secondary text-secondary-foreground hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Articles Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 auto-rows-auto"
          >
            {filteredPosts.map((article, index) => (
              <ArticleCard
                key={article.slug}
                {...article}
                index={index}
                readTime={article.readTime}   // اگر در Hygraph readingTime داری
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-muted-foreground">مقاله‌ای در این دسته‌بندی یافت نشد.</p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 text-center"
        >
          <Link href="/posts">
            <button className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 border border-border rounded-full font-medium text-sm transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:border-primary">
              مشاهده همه مقالات
              <svg 
                className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1 rotate-180" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
