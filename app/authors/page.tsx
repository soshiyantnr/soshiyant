"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/blog/header"
import { Footer } from "@/components/blog/footer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, Users, TrendingUp } from "lucide-react"
import Link from "next/link"

const authors = [
  {
    name: "سارا احمدی",
    slug: "sara-ahmadi",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    initials: "سا",
    bio: "نویسنده و پژوهشگر حوزه فناوری و نوآوری. علاقه‌مند به بررسی تاثیر هوش مصنوعی بر زندگی روزمره.",
    specialty: "فناوری",
    articlesCount: 24,
    readersCount: "۱۲K",
  },
  {
    name: "علی رضایی",
    slug: "ali-rezaei",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    initials: "عر",
    bio: "معمار و طراح داخلی با تمرکز بر معماری پایدار و طراحی مینیمال ایرانی-مدرن.",
    specialty: "طراحی",
    articlesCount: 18,
    readersCount: "۸K",
  },
  {
    name: "مریم کریمی",
    slug: "maryam-karimi",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    initials: "مک",
    bio: "مدرس و توسعه‌دهنده نرم‌افزار. متخصص در آموزش برنامه‌نویسی به زبان ساده.",
    specialty: "آموزش",
    articlesCount: 31,
    readersCount: "۱۵K",
  },
  {
    name: "رضا محمدی",
    slug: "reza-mohammadi",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    initials: "رم",
    bio: "عکاس و نویسنده سفر. عاشق کشف مناطق ناشناخته ایران و ثبت داستان‌های محلی.",
    specialty: "سفر",
    articlesCount: 22,
    readersCount: "۱۰K",
  },
  {
    name: "نازنین حسینی",
    slug: "nazanin-hosseini",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
    initials: "نح",
    bio: "هنرمند خوشنویس و گرافیست دیجیتال. ترکیب هنر سنتی ایران با تکنولوژی مدرن.",
    specialty: "هنر",
    articlesCount: 16,
    readersCount: "۷K",
  },
  {
    name: "امیر نوری",
    slug: "amir-noori",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    initials: "ان",
    bio: "کارآفرین و مشاور استارتاپ. تجربه ۱۰ ساله در اکوسیستم استارتاپی ایران.",
    specialty: "کسب‌وکار",
    articlesCount: 27,
    readersCount: "۱۴K",
  },
  {
    name: "فاطمه زارعی",
    slug: "fatemeh-zarei",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
    initials: "فز",
    bio: "روانشناس و نویسنده حوزه سلامت روان. متخصص در مدیریت استرس و بهبود کیفیت زندگی.",
    specialty: "سلامت",
    articlesCount: 19,
    readersCount: "۹K",
  },
  {
    name: "محمد حسینی",
    slug: "mohammad-hosseini",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
    initials: "مح",
    bio: "منتقد ادبی و شاعر. پژوهشگر ادبیات کلاسیک فارسی و شعر معاصر ایران.",
    specialty: "ادبیات",
    articlesCount: 35,
    readersCount: "۱۸K",
  },
]

export default function AuthorsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 persian-pattern pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              تیم نویسندگان
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-balance">
              <span className="bg-gradient-to-l from-primary via-primary/80 to-accent bg-clip-text text-transparent">
                قلم‌های خلاق
              </span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              با نویسندگان متخصص ما آشنا شوید که هر کدام در حوزه خود داستان‌های الهام‌بخش می‌نویسند
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 flex items-center justify-center gap-8 sm:gap-16"
          >
            {[
              { icon: Users, value: "۸", label: "نویسنده فعال" },
              { icon: BookOpen, value: "۱۹۲", label: "مقاله منتشر شده" },
              { icon: TrendingUp, value: "۹۳K", label: "خواننده" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center gap-2 text-primary mb-1">
                  <stat.icon className="h-5 w-5" />
                  <span className="text-2xl sm:text-3xl font-bold">{stat.value}</span>
                </div>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Authors Grid */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {authors.map((author, index) => (
              <motion.article
                key={author.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <Link href={`/authors/${author.slug}`}>
                  <div className="group relative bg-card border border-border/50 rounded-2xl p-6 h-full transition-all duration-500 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
                    {/* Avatar */}
                    <div className="flex flex-col items-center text-center">
                      <div className="relative mb-4">
                        <Avatar className="h-24 w-24 ring-4 ring-background group-hover:ring-primary/20 transition-all duration-300">
                          <AvatarImage src={author.avatar} alt={author.name} className="object-cover" />
                          <AvatarFallback className="text-xl bg-secondary text-secondary-foreground">
                            {author.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="absolute -bottom-1 -left-1 px-2.5 py-0.5 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                          {author.specialty}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                        {author.name}
                      </h3>
                      
                      <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {author.bio}
                      </p>
                      
                      {/* Stats */}
                      <div className="mt-5 pt-4 border-t border-border/50 w-full flex items-center justify-center gap-6">
                        <div className="text-center">
                          <div className="text-lg font-bold text-foreground">{author.articlesCount}</div>
                          <div className="text-xs text-muted-foreground">مقاله</div>
                        </div>
                        <div className="w-px h-8 bg-border" />
                        <div className="text-center">
                          <div className="text-lg font-bold text-foreground">{author.readersCount}</div>
                          <div className="text-xs text-muted-foreground">خواننده</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
