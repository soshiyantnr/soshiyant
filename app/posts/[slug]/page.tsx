"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/blog/header"
import { Footer } from "@/components/blog/footer"
import { ReadingProgress } from "@/components/blog/reading-progress"
import { TableOfContents } from "@/components/blog/table-of-contents"
import { AuthorBio } from "@/components/blog/author-bio"
import { RelatedPosts } from "@/components/blog/related-posts"
import { PostContent } from "@/components/blog/post-content"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowRight, Calendar, Clock, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const post = {
  title: "هوش مصنوعی و آینده کسب‌وکارهای ایرانی",
  excerpt: "چگونه هوش مصنوعی می‌تواند صنایع مختلف ایران را متحول کند و فرصت‌های جدیدی برای کارآفرینان ایجاد نماید.",
  category: "فناوری",
  categorySlug: "technology",
  publishedAt: "۱۵ آذر ۱۴۰۵",
  readTime: "۸ دقیقه",
  imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=80",
  author: {
    name: "سارا احمدی",
    bio: "مدیر فناوری با بیش از ۱۰ سال تجربه در حوزه هوش مصنوعی و یادگیری ماشین. علاقه‌مند به کاربردهای نوآورانه فناوری در کسب‌وکارهای ایرانی.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    initials: "سا",
    slug: "sara-ahmadi",
    social: {
      twitter: "https://twitter.com",
    },
  },
}

const headings = [
  { id: "introduction", text: "مقدمه", level: 2 },
  { id: "current-state", text: "وضعیت فعلی", level: 2 },
  { id: "opportunities", text: "فرصت‌ها", level: 3 },
  { id: "challenges", text: "چالش‌ها", level: 3 },
  { id: "implementation", text: "پیاده‌سازی", level: 2 },
  { id: "conclusion", text: "نتیجه‌گیری", level: 2 },
]

const relatedPosts = [
  {
    slug: "minimal-design-iranian-architecture",
    title: "طراحی مینیمال در معماری ایرانی مدرن",
    excerpt: "نگاهی به ترکیب زیبایی‌شناسی سنتی ایران با اصول طراحی مدرن.",
    category: "طراحی",
    readTime: "۶ دقیقه",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    author: { name: "علی رضایی", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80", initials: "عر" },
  },
  {
    slug: "modern-programming-learning",
    title: "روش‌های نوین یادگیری زبان برنامه‌نویسی",
    excerpt: "بهترین استراتژی‌ها برای یادگیری سریع و موثر زبان‌های برنامه‌نویسی.",
    category: "آموزش",
    readTime: "۱۰ دقیقه",
    imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&q=80",
    author: { name: "مریم کریمی", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80", initials: "مک" },
  },
  {
    slug: "successful-iranian-startups",
    title: "استارتاپ‌های موفق ایرانی در سال ۱۴۰۵",
    excerpt: "معرفی و بررسی استارتاپ‌هایی که موفق به جذب سرمایه شده‌اند.",
    category: "کسب‌وکار",
    readTime: "۹ دقیقه",
    imageUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&q=80",
    author: { name: "امیر نوری", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80", initials: "ان" },
  },
]

export default function PostPage() {
  return (
    <div className="min-h-screen bg-background">
      <ReadingProgress showLabel />
      <Header />

      <article>
        <header className="pt-24 sm:pt-32 pb-8 sm:pb-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 sm:mb-8"
              >
                <ArrowRight className="h-4 w-4" />
                بازگشت به مقالات
              </Link>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm mb-4 sm:mb-6">
                <Link
                  href={`/categories/${post.categorySlug}`}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium hover:bg-primary/20 transition-colors"
                >
                  {post.category}
                </Link>
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  {post.publishedAt}
                </span>
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  {post.readTime}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-balance">
                {post.title}
              </h1>

              <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                {post.excerpt}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-8 sm:mt-10 pt-4 sm:pt-6 border-t border-border gap-4">
                <Link href={`/authors/${post.author.slug}`} className="flex items-center gap-3 group">
                  <Avatar className="h-10 w-10 sm:h-12 sm:w-12 ring-2 ring-background">
                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                    <AvatarFallback className="bg-secondary text-secondary-foreground">
                      {post.author.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium group-hover:text-primary transition-colors">{post.author.name}</p>
                    <p className="text-sm text-muted-foreground">مدیر فناوری</p>
                  </div>
                </Link>

                <Button variant="outline" size="sm" className="gap-2 w-fit">
                  <Share2 className="h-4 w-4" />
                  اشتراک‌گذاری
                </Button>
              </div>
            </motion.div>
          </div>
        </header>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-6xl mx-auto px-4 sm:px-6 mb-10 sm:mb-16"
        >
          <div className="aspect-[16/9] sm:aspect-[21/9] rounded-xl sm:rounded-2xl overflow-hidden">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Content with TOC */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8 lg:gap-12">
            {/* Sidebar TOC */}
            <aside className="hidden lg:block">
              <TableOfContents headings={headings} />
            </aside>

            <main>
              <PostContent>
                <h2 id="introduction">مقدمه</h2>
                <p>
                  در دنیای امروز، هوش مصنوعی به عنوان یکی از تحول‌آفرین‌ترین فناوری‌های قرن شناخته می‌شود. 
                  این فناوری توانایی تغییر بنیادین در نحوه انجام کارها را دارد و می‌تواند صنایع مختلف را 
                  از ریشه متحول سازد.
                </p>
                <p>
                  در ایران، با وجود چالش‌های متعدد، فرصت‌های بی‌نظیری برای کارآفرینان و کسب‌وکارها وجود دارد 
                  تا با بهره‌گیری از هوش مصنوعی، مسیر موفقیت خود را هموار سازند.
                </p>

                <h2 id="current-state">وضعیت فعلی</h2>
                <p>
                  در حال حاضر، بسیاری از شرکت‌های ایرانی در مراحل اولیه استفاده از هوش مصنوعی قرار دارند. 
                  برخی از استارتاپ‌های نوآور اما توانسته‌اند پیشرفت‌های قابل توجهی داشته باشند.
                </p>

                <h3 id="opportunities">فرصت‌ها</h3>
                <p>
                  فرصت‌های متعددی در حوزه‌های مختلف از جمله بهداشت و درمان، آموزش، کشاورزی و تجارت الکترونیک 
                  برای استفاده از هوش مصنوعی در ایران وجود دارد:
                </p>
                <ul>
                  <li>بهبود تشخیص بیماری‌ها با استفاده از تصویربرداری پزشکی</li>
                  <li>شخصی‌سازی آموزش برای هر دانش‌آموز</li>
                  <li>بهینه‌سازی مصرف آب و کود در کشاورزی</li>
                  <li>پیش‌بینی تقاضا و مدیریت موجودی در فروشگاه‌ها</li>
                </ul>

                <h3 id="challenges">چالش‌ها</h3>
                <p>
                  در کنار فرصت‌ها، چالش‌هایی نیز وجود دارد که باید مورد توجه قرار گیرند:
                </p>
                <blockquote>
                  «بزرگترین چالش ما دسترسی به داده‌های باکیفیت و زیرساخت‌های محاسباتی قوی است.»
                  — یک کارآفرین حوزه فناوری
                </blockquote>

                <h2 id="implementation">پیاده‌سازی</h2>
                <p>
                  برای پیاده‌سازی موفق هوش مصنوعی در کسب‌وکارها، نیاز به برنامه‌ریزی دقیق و مرحله‌ای است. 
                  شروع با پروژه‌های کوچک و مقیاس‌پذیر، یادگیری از تجربیات و بهبود مستمر از کلیدهای موفقیت هستند.
                </p>
                <p>
                  همچنین، سرمایه‌گذاری در آموزش نیروی انسانی و ایجاد فرهنگ نوآوری در سازمان از اهمیت ویژه‌ای برخوردار است.
                </p>

                <h2 id="conclusion">نتیجه‌گیری</h2>
                <p>
                  هوش مصنوعی فرصتی بی‌نظیر برای کسب‌وکارهای ایرانی فراهم کرده است. با برنامه‌ریزی صحیح، 
                  سرمایه‌گذاری در نیروی انسانی و استفاده هوشمندانه از منابع موجود، می‌توان از این موج تحول 
                  فناوری بهره‌مند شد.
                </p>
                <p>
                  آینده متعلق به کسانی است که امروز برای آن آماده می‌شوند. حال زمان اقدام است.
                </p>
              </PostContent>

              <AuthorBio {...post.author} />
              <RelatedPosts posts={relatedPosts} />
            </main>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  )
}
