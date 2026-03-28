"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock } from "lucide-react"
import Link from "next/link"

interface ArticleCardProps {
  title: string
  excerpt: string
  category: string
  categorySlug: string
  readTime: string
  author: {
    name: string
    avatar: string
    initials: string
    slug: string
  }
  imageUrl?: string
  featured?: boolean
  index: number
  slug: string
}

export function ArticleCard({
  title,
  excerpt,
  category,
  categorySlug,
  readTime,
  author,
  imageUrl,
  featured = false,
  index,
  slug,
}: ArticleCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      viewport={{ once: true, margin: "-50px" }}
      className={`group cursor-pointer ${featured ? "sm:col-span-2 sm:row-span-2" : ""}`}
    >
      <Link href={`/posts/${slug}`}>
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-card border border-border/50 h-full flex flex-col transition-all duration-500 hover:border-primary/30 hover:shadow-lg hover:shadow-foreground/5">
          {imageUrl && (
            <div className={`relative overflow-hidden ${featured ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
              <motion.img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Category pill */}
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                <Link 
                  href={`/categories/${categorySlug}`}
                  onClick={(e) => e.stopPropagation()}
                  className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-background/90 backdrop-blur-sm text-foreground rounded-full text-xs font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {category}
                </Link>
              </div>

              {/* Reading time */}
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-background/90 backdrop-blur-sm text-foreground rounded-full text-xs font-medium flex items-center gap-1.5">
                  <Clock className="h-3 w-3" />
                  {readTime}
                </span>
              </div>
            </div>
          )}
          
          <div className="flex flex-col flex-1 p-4 sm:p-5 gap-3 sm:gap-4">
            <div className="flex-1">
              <h3 className={`font-bold leading-tight text-balance group-hover:text-primary transition-colors duration-300 ${
                featured ? "text-xl sm:text-2xl md:text-3xl" : "text-base sm:text-lg md:text-xl"
              }`}>
                {title}
              </h3>
              <p className={`mt-2 sm:mt-3 text-muted-foreground leading-relaxed line-clamp-2 sm:line-clamp-3 ${
                featured ? "text-sm sm:text-base" : "text-xs sm:text-sm"
              }`}>
                {excerpt}
              </p>
            </div>
            
            <div className="flex items-center gap-3 pt-3 border-t border-border/50">
              <Link 
                href={`/authors/${author.slug}`}
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 sm:gap-3 group/author"
              >
                <Avatar className="h-8 w-8 sm:h-9 sm:w-9 ring-2 ring-background group-hover/author:ring-primary transition-colors">
                  <AvatarImage src={author.avatar} alt={author.name} />
                  <AvatarFallback className="text-xs bg-secondary text-secondary-foreground">
                    {author.initials}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs sm:text-sm font-medium group-hover/author:text-primary transition-colors">{author.name}</span>
              </Link>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
