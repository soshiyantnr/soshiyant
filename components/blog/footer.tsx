"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Instagram, Send } from "lucide-react"

export function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="border-t border-border bg-card relative"
    >
      <div className="absolute inset-0 persian-pattern pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12">
          <div className="sm:col-span-2">
            <Link href="/" className="inline-flex items-center gap-1">
              <span className="text-xl sm:text-2xl font-bold text-primary">
                نوشتار
              </span>
              <span className="text-accent text-xl sm:text-2xl">.</span>
            </Link>
            <p className="mt-4 text-muted-foreground max-w-sm leading-relaxed text-sm sm:text-base">
              پلتفرمی برای به اشتراک گذاشتن ایده‌ها، داستان‌ها و دانش با جامعه فارسی‌زبان.
              برای دریافت بهترین مقالات در خبرنامه ما عضو شوید.
            </p>
            
            {/* Newsletter */}
            <form className="mt-6 flex gap-2 max-w-sm">
              <Input
                type="email"
                placeholder="ایمیل شما"
                className="flex-1 text-right text-sm h-11"
              />
              <Button type="submit" className="h-11 px-5">عضویت</Button>
            </form>

            <div className="mt-6 flex gap-3">
              {[
                { label: "اینستاگرام", icon: Instagram },
                { label: "توییتر", icon: () => <span className="text-sm font-bold">X</span> },
                { label: "تلگرام", icon: Send },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  className="h-11 w-11 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-primary hover:bg-primary/5 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-foreground">صفحات</h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: "خانه", href: "/" },
                { label: "دسته‌بندی‌ها", href: "/categories/technology" },
                { label: "نویسندگان", href: "/authors" },
                { label: "درباره ما", href: "/about" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm sm:text-base"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-foreground">دسته‌بندی‌ها</h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: "فناوری", href: "/categories/technology" },
                { label: "طراحی", href: "/categories/design" },
                { label: "کسب‌وکار", href: "/categories/business" },
                { label: "سفر", href: "/categories/travel" },
                { label: "هنر", href: "/categories/art" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm sm:text-base"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © ۱۴۰۵ نوشتار. تمامی حقوق محفوظ است.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              حریم خصوصی
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              قوانین استفاده
            </Link>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
