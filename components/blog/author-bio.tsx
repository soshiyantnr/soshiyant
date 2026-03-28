"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface AuthorBioProps {
  name: string
  bio: string
  avatar: string
  initials: string
  slug: string
  social?: {
    twitter?: string
    linkedin?: string
    website?: string
  }
}

export function AuthorBio({ name, bio, avatar, initials, slug, social }: AuthorBioProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="border-t border-b border-border py-10 my-12"
    >
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        <Link href={`/authors/${slug}`}>
          <Avatar className="h-20 w-20 ring-4 ring-background shadow-lg transition-transform hover:scale-105">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback className="text-lg bg-secondary text-secondary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Link>
        
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-medium text-muted-foreground tracking-wider">
              نوشته شده توسط
            </span>
          </div>
          <Link href={`/authors/${slug}`}>
            <h4 className="text-xl font-bold hover:text-primary transition-colors duration-300">
              {name}
            </h4>
          </Link>
          <p className="mt-2 text-muted-foreground leading-relaxed">{bio}</p>
          
          <div className="mt-4 flex items-center gap-3">
            {social?.twitter && (
              <Button variant="outline" size="sm" asChild>
                <a href={social.twitter} target="_blank" rel="noopener noreferrer">
                  دنبال کنید در X
                </a>
              </Button>
            )}
            <Link href={`/authors/${slug}`}>
              <Button variant="ghost" size="sm">
                مشاهده همه مقالات
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
