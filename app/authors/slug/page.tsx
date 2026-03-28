"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/blog/header"
import { Footer } from "@/components/blog/footer"
import { ReadingProgress } from "@/components/blog/reading-progress"
import { FilterBar } from "@/components/blog/filter-bar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const author = {
  name: "سارا احمدی",
  role: "مدیر فناوری",
  bio: "مدیر فناوری با بیش از ۱۰ سال تجربه در حوزه هوش مصنوعی و یادگیری ماشین. علاقه‌مند به کاربردهای نوآورانه فناوری در کسب‌وکارهای ایرانی. سابقه همکاری با شرکت‌های بزرگ فناوری در ایران.",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
  initials: "سا",
  location: "تهران، ایران",
  social: {
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    website: "https://example.com",
  },
  stats: {
    articles: "۲۴",
    readers: "۴۵K",
    topics: "۵",
  },
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
