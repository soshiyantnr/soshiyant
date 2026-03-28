"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/blog/header"
import { Footer } from "@/components/blog/footer"
import { ReadingProgress } from "@/components/blog/reading-progress"
import { SortBar } from "@/components/blog/filter-bar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

const category = {
  name: "فناوری",
  slug: "technology",
  description: "کاوش در دنیای فناوری — از هوش مصنوعی و یادگیری ماشین گرفته تا استارتاپ‌ها و نوآوری‌های دیجیتال که آینده را شکل می‌دهند.",
  articleCount: "۴۲",
  featuredAuthors: [
    { name: "سارا احمدی", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80", initials: "سا", slug: "sara-ahmadi" },
    { name: "علی رضایی", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80", initials: "عر", slug: "ali-rezaei" },
    { name: "مریم کریمی", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80", initials: "مک", slug: "maryam-karimi" },
  ],
}

const articles = [
  {
    slug: "ai-future-iranian-businesses",
    title: "هوش مصنوعی و آینده کسب‌وکارهای ایرانی",
    excerpt: "چگونه هوش مصنوعی می‌تواند صنایع مختلف ایران را متحول کند و فرصت‌های جدیدی برای کارآفرینان ایجاد نماید.",
    readTime: "۸ دقیقه",
    publishedAt: "۱۵ آذر ۱۴۰۵",
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80",
    author: { name: "سارا احمدی", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80", initials: "سا", slug: "sara-ahmadi" },
    featured: true,
  },
  {
    slug: "machine-learning-basics",
    title: "مبانی یادگیری ماشین برای مبتدیان",
    excerpt: "راهنمای جامع برای شروع یادگیری ماشین با مثال‌های کاربردی.",
    readTime: "۱۲ دقیقه",
    publishedAt: "۱۲ آذر ۱۴۰۵",
    imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&q=80",
    author: { name: "علی رضایی", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80", initials: "عر", slug: "ali-rezaei" },
  },
  {
    slug: "modern-programming-learning",
    title: "روش‌های نوین یادگیری زبان برنامه‌نویسی",
    excerpt: "بهترین استراتژی‌ها برای یادگیری سریع و موثر زبان‌های برنامه‌نویسی.",
    readTime: "۱۰ دقیقه",
    publishedAt: "۱۰ آذر ۱۴۰۵",
    imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&q=80",
    author: { name: "مریم کریمی", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80", initials: "مک", slug: "maryam-karimi" },
  },
  {
    slug: "tech-trends-2026",
    title: "روندهای فناوری در سال ۱۴۰۵",
    excerpt: "پیش‌بینی و بررسی مهم‌ترین روندهای فناوری که سال آینده را شکل خواهند داد.",
    readTime: "۷ دقیقه",
    publishedAt: "۸ آذر ۱۴۰۵",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80",
    author: { name: "سارا احمدی", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80", initials: "سا", slug: "sara-ahmadi" },
  },
  {
    slug: "blockchain-iran",
    title: "بلاکچین و کاربردهای آن در ایران",
    excerpt: "بررسی فرصت‌ها و چالش‌های استفاده از فناوری بلاکچین در کسب‌وکارهای ایرانی.",
    readTime: "۹ دقیقه",
    publishedAt: "۵ آذر ۱۴۰۵",
    imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&q=80",
    author: { name: "علی رضایی", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80", initials: "عر", slug: "ali-rezaei" },
  },
  {
    slug: "cloud-computing-guide",
    title: "راهنمای رایانش ابری برای کسب‌وکارها",
    excerpt: "همه چیز درباره انتقال زیرساخت‌ها به ابر و مزایای آن.",
    readTime: "۱۱ دقیقه",
    publishedAt: "۲ آذر ۱۴۰۵",
    imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80",
    author: { name: "مریم کریمی", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80", initials: "مک", slug: "maryam-karimi" },
  },
]

const sortOptions = [
  { value: "latest", label: "جدیدترین" },
  { value: "popular", label: "محبوب‌ترین" },
  { value: "oldest", label: "قدیمی‌ترین" },
]

const relatedCategories = [
  { name: "آموزش", slug: "education", count: "۱۸" },
  { name: "کسب‌وکار", slug: "business", count: "۳۱" },
  { name: "طراحی", slug: "design", count: "۱۵" },
  { name: "هنر", slug: "art", count: "۲۲" },
]

export default function CategoryPage() {
  const [activeSort, setActiveSort] = useState("latest")

  const featuredArticle = articles.find(a => a.featured)
  const otherArticles = articles.filter(a => !a.featured)

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
            <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              {category.description}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-border">
              <div>
                <p className="text-xl sm:text-2xl font-bold">{category.articleCount}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">مقاله</p>
              </div>
              <div className="hidden sm:block h-8 w-px bg-border" />
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm text-muted-foreground ml-2">نویسندگان برتر:</span>
                <div className="flex -space-x-2 -space-x-reverse">
                  {category.featuredAuthors.map((author) => (
                    <Link key={author.slug} href={`/authors/${author.slug}`}>
                      <Avatar className="h-7 w-7 sm:h-8 sm:w-8 ring-2 ring-background hover:ring-primary transition-colors">
                        <AvatarImage src={author.avatar} alt={author.name} />
                        <AvatarFallback className="text-xs bg-secondary text-secondary-foreground">
                          {author.initials}
                        </AvatarFallback>
                      </Avatar>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured + Grid */}
      <section className="py-10 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Featured Article */}
          {featuredArticle && (
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="group mb-10 sm:mb-12"
            >
              <Link href={`/posts/${featuredArticle.slug}`} className="block">
                <div className="grid md:grid-cols-2 gap-4 sm:gap-6 bg-card border border-border/50 rounded-xl sm:rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-xl hover:shadow-foreground/5 transition-all duration-500">
                  <div className="aspect-[16/10] md:aspect-auto overflow-hidden">
                    <img
                      src={featuredArticle.imageUrl}
                      alt={featuredArticle.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5 sm:p-6 md:p-8 flex flex-col justify-center">
                    <span className="text-xs font-medium text-primary tracking-wider mb-2 sm:mb-3">
                      مقاله ویژه
                    </span>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight group-hover:text-primary transition-colors duration-300">
                      {featuredArticle.title}
                    </h2>
                    <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-2 sm:line-clamp-none">
                      {featuredArticle.excerpt}
                    </p>
                    <div className="flex items-center gap-3 mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-border/50">
                      <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
                        <AvatarImage src={featuredArticle.author.avatar} alt={featuredArticle.author.name} />
                        <AvatarFallback className="text-xs bg-secondary text-secondary-foreground">
                          {featuredArticle.author.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs sm:text-sm font-medium">{featuredArticle.author.name}</span>
                      <span className="text-xs sm:text-sm text-muted-foreground">·</span>
                      <span className="text-xs sm:text-sm text-muted-foreground">{featuredArticle.readTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          )}

          {/* Sort + Grid */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl font-bold">همه مقالات</h3>
            <SortBar
              options={sortOptions}
              activeSort={activeSort}
              onSortChange={setActiveSort}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {otherArticles.map((article, index) => (
              <motion.article
                key={article.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group"
              >
                <Link href={`/posts/${article.slug}`} className="block">
                  <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-foreground/5 transition-all duration-500">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    
                    <div className="p-4 sm:p-5">
                      <div className="flex items-center gap-2 sm:gap-3 text-xs tracking-wide mb-2 sm:mb-3">
                        <span className="text-muted-foreground">{article.readTime}</span>
                        <span className="text-muted-foreground">·</span>
                        <span className="text-muted-foreground">{article.publishedAt}</span>
                      </div>
                      
                      <h4 className="text-base sm:text-lg font-bold leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        {article.title}
                      </h4>
                      
                      <div className="flex items-center gap-2 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border/50">
                        <Avatar className="h-5 w-5 sm:h-6 sm:w-6">
                          <AvatarImage src={article.author.avatar} alt={article.author.name} />
                          <AvatarFallback className="text-xs bg-secondary text-secondary-foreground">
                            {article.author.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs sm:text-sm text-muted-foreground">{article.author.name}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Related Categories */}
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
              {relatedCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/categories/${cat.slug}`}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-secondary text-secondary-foreground rounded-full text-xs sm:text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                >
                  {cat.name}
                  <span className="mr-1.5 sm:mr-2 text-muted-foreground">({cat.count})</span>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
