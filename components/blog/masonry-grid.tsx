"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArticleCard } from "./article-card"

const categories = [
  { id: "all", label: "همه" },
  { id: "technology", label: "فناوری" },
  { id: "design", label: "طراحی" },
  { id: "education", label: "آموزش" },
  { id: "travel", label: "سفر" },
  { id: "art", label: "هنر" },
  { id: "business", label: "کسب‌وکار" },
]

const articles = [
  {
    title: "هوش مصنوعی و آینده کسب‌وکارهای ایرانی",
    excerpt: "چگونه هوش مصنوعی می‌تواند صنایع مختلف ایران را متحول کند و فرصت‌های جدیدی برای کارآفرینان ایجاد نماید. در این مقاله به بررسی عمیق تاثیرات هوش مصنوعی می‌پردازیم.",
    category: "فناوری",
    categorySlug: "technology",
    readTime: "۸ دقیقه",
    author: { name: "سارا احمدی", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80", initials: "سا", slug: "sara-ahmadi" },
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
    featured: true,
    slug: "ai-future-iranian-businesses",
  },
  {
    title: "طراحی مینیمال در معماری ایرانی مدرن",
    excerpt: "نگاهی به ترکیب زیبایی‌شناسی سنتی ایران با اصول طراحی مدرن و مینیمال.",
    category: "طراحی",
    categorySlug: "design",
    readTime: "۶ دقیقه",
    author: { name: "علی رضایی", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80", initials: "عر", slug: "ali-rezaei" },
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    slug: "minimal-design-iranian-architecture",
  },
  {
    title: "روش‌های نوین یادگیری زبان برنامه‌نویسی",
    excerpt: "بهترین استراتژی‌ها برای یادگیری سریع و موثر زبان‌های برنامه‌نویسی در سال ۱۴۰۵.",
    category: "آموزش",
    categorySlug: "education",
    readTime: "۱۰ دقیقه",
    author: { name: "مریم کریمی", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80", initials: "مک", slug: "maryam-karimi" },
    imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80",
    slug: "modern-programming-learning",
  },
  {
    title: "سفر به دل کویر لوت",
    excerpt: "روایتی از سفر به یکی از شگفت‌انگیزترین مناظر طبیعی ایران و تجربه‌های فراموش‌نشدنی.",
    category: "سفر",
    categorySlug: "travel",
    readTime: "۷ دقیقه",
    author: { name: "رضا محمدی", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80", initials: "رم", slug: "reza-mohammadi" },
    imageUrl: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80",
    slug: "journey-to-lut-desert",
  },
  {
    title: "هنر خوشنویسی در عصر دیجیتال",
    excerpt: "چگونه هنرمندان ایرانی خوشنویسی سنتی را با ابزارهای دیجیتال ترکیب می‌کنند.",
    category: "هنر",
    categorySlug: "art",
    readTime: "۵ دقیقه",
    author: { name: "نازنین حسینی", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80", initials: "نح", slug: "nazanin-hosseini" },
    imageUrl: "https://images.unsplash.com/photo-1585159812596-fac104f2f069?w=800&q=80",
    slug: "calligraphy-digital-age",
  },
  {
    title: "استارتاپ‌های موفق ایرانی در سال ۱۴۰۵",
    excerpt: "معرفی و بررسی استارتاپ‌هایی که در سال جاری موفق به جذب سرمایه شده‌اند.",
    category: "کسب‌وکار",
    categorySlug: "business",
    readTime: "۹ دقیقه",
    author: { name: "امیر نوری", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80", initials: "ان", slug: "amir-noori" },
    imageUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80",
    slug: "successful-iranian-startups",
  },
]

export function MasonryGrid() {
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredArticles = activeCategory === "all" 
    ? articles 
    : articles.filter(article => article.categorySlug === activeCategory)

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

        {/* Category Filter */}
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
            {filteredArticles.map((article, index) => (
              <ArticleCard
                key={article.slug}
                {...article}
                index={index}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredArticles.length === 0 && (
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
        </motion.div>
      </div>
    </section>
  )
}
