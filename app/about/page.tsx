"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/blog/header"
import { Footer } from "@/components/blog/footer"
import { ReadingProgress } from "@/components/blog/reading-progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Send, Users, BookOpen, Heart } from "lucide-react"

const team = [
  {
    name: "سارا احمدی",
    role: "بنیان‌گذار و مدیر محتوا",
    bio: "با بیش از ۱۰ سال تجربه در حوزه نوشتن و ویرایش، سارا نوشتار را برای ایجاد فضایی برای تبادل ایده‌ها بنیان‌گذاری کرد.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    initials: "سا",
    slug: "sara-ahmadi",
  },
  {
    name: "علی رضایی",
    role: "مدیر فنی",
    bio: "علی مسئول توسعه و نگهداری پلتفرم نوشتار است و تجربه‌ای روان برای خوانندگان و نویسندگان فراهم می‌کند.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    initials: "عر",
    slug: "ali-rezaei",
  },
  {
    name: "مریم کریمی",
    role: "سردبیر",
    bio: "مریم با دقت و حساسیت، کیفیت محتوای منتشر شده را تضمین می‌کند و با نویسندگان برای بهبود نوشته‌هایشان همکاری می‌کند.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    initials: "مک",
    slug: "maryam-karimi",
  },
  {
    name: "رضا محمدی",
    role: "مدیر جامعه",
    bio: "رضا پل ارتباطی بین نوشتار و جامعه خوانندگان است و رویدادها و تعاملات را مدیریت می‌کند.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    initials: "رم",
    slug: "reza-mohammadi",
  },
]

const stats = [
  { icon: BookOpen, value: "۱۵۰+", label: "مقاله منتشر شده" },
  { icon: Users, value: "۲۵", label: "نویسنده فعال" },
  { icon: Heart, value: "۵۰K+", label: "خواننده ماهانه" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <ReadingProgress />
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-medium text-muted-foreground tracking-wider">
              درباره ما
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mt-4 text-balance">
              داستان ما،
              <span className="block mt-2 bg-gradient-to-l from-primary to-accent bg-clip-text text-transparent">
                سفری برای الهام‌بخشی
              </span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              نوشتار خانه‌ای برای ایده‌ها، داستان‌ها و دیدگاه‌هایی است که زندگی را غنی‌تر می‌کنند.
              ما باور داریم که هر صدایی ارزش شنیده شدن دارد.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center gap-8 md:gap-16 mt-16"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12"
          >
            <div>
              <h2 className="text-2xl font-bold mb-4">ماموریت ما</h2>
              <p className="text-muted-foreground leading-relaxed">
                ما در نوشتار به دنبال ایجاد فضایی هستیم که در آن ایده‌های خلاقانه و دیدگاه‌های متنوع 
                بتوانند شکوفا شوند. هدف ما ارتقای سطح گفتگوی فرهنگی و فکری در جامعه فارسی‌زبان است.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">چشم‌انداز ما</h2>
              <p className="text-muted-foreground leading-relaxed">
                ما رویای ایجاد بزرگترین پلتفرم محتوای باکیفیت فارسی را داریم — جایی که هر کس بتواند 
                یاد بگیرد، الهام بگیرد و داستان خود را به اشتراک بگذارد.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">تیم ما</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              افرادی که با عشق و تعهد، نوشتار را به خانه‌ای برای نویسندگان و خوانندگان تبدیل کرده‌اند.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <Link href={`/authors/${member.slug}`}>
                  <Avatar className="h-24 w-24 mx-auto ring-4 ring-background shadow-lg group-hover:ring-primary transition-all duration-300">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback className="text-lg bg-secondary text-secondary-foreground">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="mt-4 font-bold text-lg group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                </Link>
                <p className="text-sm text-primary font-medium">{member.role}</p>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-card border-t border-border">
        <div className="max-w-2xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">تماس با ما</h2>
            <p className="text-muted-foreground">
              سوالی دارید یا می‌خواهید با ما همکاری کنید؟ پیام خود را ارسال کنید.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">نام</Label>
                <Input id="name" placeholder="نام شما" className="text-right" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">ایمیل</Label>
                <Input id="email" type="email" placeholder="ایمیل شما" className="text-right" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">موضوع</Label>
              <Input id="subject" placeholder="موضوع پیام" className="text-right" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">پیام</Label>
              <Textarea 
                id="message" 
                placeholder="پیام خود را بنویسید..." 
                className="min-h-[150px] text-right" 
              />
            </div>
            <Button type="submit" className="w-full gap-2">
              <Send className="h-4 w-4" />
              ارسال پیام
            </Button>
          </motion.form>
        </div>
      </section>

      <Footer />
    </div>
  )
}
