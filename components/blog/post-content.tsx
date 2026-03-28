"use client"

import { motion } from "framer-motion"

interface PostContentProps {
  children: React.ReactNode
}

export function PostContent({ children }: PostContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="prose prose-lg max-w-none
        prose-headings:font-bold prose-headings:tracking-tight
        prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
        prose-p:text-muted-foreground prose-p:leading-loose prose-p:mb-6
        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
        prose-strong:text-foreground prose-strong:font-bold
        prose-blockquote:border-r-primary prose-blockquote:border-r-2 prose-blockquote:border-l-0 prose-blockquote:pr-6 prose-blockquote:pl-0 prose-blockquote:italic prose-blockquote:text-muted-foreground
        prose-code:bg-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono
        prose-pre:bg-secondary prose-pre:border prose-pre:border-border
        prose-img:rounded-xl prose-img:shadow-md
        prose-ul:text-muted-foreground prose-ol:text-muted-foreground
        prose-li:marker:text-primary
      "
    >
      {children}
    </motion.div>
  )
}
