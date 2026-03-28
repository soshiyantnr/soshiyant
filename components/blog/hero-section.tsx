"use client"

import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"

export function HeroSection() {
  const scrollToContent = () => {
    const content = document.getElementById("latest-posts")
    content?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 py-20 sm:py-24 overflow-hidden">
      {/* Persian pattern overlay */}
      <div className="absolute inset-0 persian-pattern pointer-events-none" />
      
      {/* Subtle animated background gradient */}
      <motion.div 
        className="absolute inset-0 opacity-30 dark:opacity-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-accent/15 via-transparent to-transparent" />
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/30 blur-3xl pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 2, delay: 0.7 }}
        className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent/20 blur-3xl pointer-events-none"
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xs sm:text-sm tracking-[0.2em] text-muted-foreground mb-6 sm:mb-8"
        >
          به دنیای نوشتار خوش آمدید
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] tracking-tight text-balance"
        >
          <span className="block relative">
            <span className="bg-gradient-to-l from-primary via-primary/80 to-accent bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient_8s_linear_infinite]">
              مقالات عمیق،
            </span>
            {/* Calligraphy-style underline */}
            <motion.svg
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 1 }}
              className="absolute -bottom-1 sm:-bottom-2 right-0 w-full h-3 sm:h-4"
              viewBox="0 0 300 20"
              fill="none"
            >
              <motion.path
                d="M295 12 Q220 5 150 15 T5 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="text-accent"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 1 }}
              />
            </motion.svg>
          </span>
          <span className="block mt-3 sm:mt-4 bg-gradient-to-l from-accent via-accent/80 to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient_8s_linear_infinite]" style={{ animationDelay: "0.5s" }}>
            ایده‌های نوآورانه
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty px-4"
        >
          داستان‌ها و دیدگاه‌هایی که الهام‌بخش ذهن و روح شما هستند.
          در سفری از دانش و خلاقیت همراه ما باشید.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 sm:mt-12 flex items-center justify-center gap-3 sm:gap-4 flex-wrap"
        >
          <button className="group relative px-6 sm:px-8 py-3 sm:py-3.5 bg-primary text-primary-foreground rounded-full font-medium text-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
            <span className="relative z-10">شروع مطالعه</span>
            <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
          <button className="group px-6 sm:px-8 py-3 sm:py-3.5 border border-border rounded-full font-medium text-sm transition-all duration-300 hover:bg-secondary hover:border-secondary">
            عضویت در خبرنامه
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-border/50 flex items-center justify-center gap-6 sm:gap-8 md:gap-12"
        >
          {[
            { value: "۱۵۰+", label: "مقاله منتشر شده" },
            { value: "۲۵", label: "نویسنده فعال" },
            { value: "۵۰K+", label: "خواننده ماهانه" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        onClick={scrollToContent}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        aria-label="رفتن به محتوا"
      >
        <span className="text-xs tracking-[0.15em]">کاوش کنید</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.button>
    </section>
  )
}
