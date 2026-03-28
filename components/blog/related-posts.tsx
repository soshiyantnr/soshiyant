"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

interface RelatedPost {
  slug: string
  title: string
  excerpt: string
  category: string
  readTime: string
  imageUrl: string
  author: {
    name: string
    avatar: string
    initials: string
  }
}

interface RelatedPostsProps {
  posts: RelatedPost[]
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  return (
    <section className="mt-16 pt-12 border-t border-border">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-bold mb-8">مقالات مرتبط</h3>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <motion.article
            key={post.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
            className="group"
          >
            <Link href={`/posts/${post.slug}`} className="block">
              <div className="relative overflow-hidden rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-foreground/5 transition-all duration-500">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                
                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs tracking-wide mb-3">
                    <span className="px-2.5 py-1 bg-secondary text-secondary-foreground rounded-full font-medium">
                      {post.category}
                    </span>
                    <span className="text-muted-foreground">{post.readTime}</span>
                  </div>
                  
                  <h4 className="text-lg font-bold leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h4>
                  
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/50">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={post.author.avatar} alt={post.author.name} />
                      <AvatarFallback className="text-xs bg-secondary text-secondary-foreground">
                        {post.author.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">{post.author.name}</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
