import { getPostBySlug, getRelatedPosts } from "@/lib/hygraph-api"
import { Header } from "@/components/blog/header"
import { Footer } from "@/components/blog/footer"
import { ReadingProgress } from "@/components/blog/reading-progress"
import { AuthorBio } from "@/components/blog/author-bio"
import { RelatedPosts } from "@/components/blog/related-posts"
import { PostContent } from "@/components/blog/post-content"
import { PostPageClient } from "@/components/blog/post-page-client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowRight, Calendar, Clock, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { notFound } from "next/navigation"

interface PostPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  
  const post = await getPostBySlug(slug)
  
  if (!post) {
    notFound()
  }
  
  let relatedPosts = []
  if (post.category?.id) {
    const related = await getRelatedPosts(post.category.id, post.id)
    relatedPosts = related
  }

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="min-h-screen bg-background">
      <ReadingProgress showLabel />
      <Header />

      <article>
        <header className="pt-24 sm:pt-32 pb-8 sm:pb-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 sm:mb-8"
              >
                <ArrowRight className="h-4 w-4" />
                بازگشت به مقالات
              </Link>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm mb-4 sm:mb-6">
                {post.category && (
                  <Link
                    href={`/categories/${post.category.slug}`}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium hover:bg-primary/20 transition-colors"
                  >
                    {post.category.name}
                  </Link>
                )}
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  {formattedDate}
                </span>
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  {post.readingTime ? `${post.readingTime} دقیقه` : "۵ دقیقه"}
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
                    <AvatarImage src={post.author.avatar?.url} alt={post.author.name} />
                    <AvatarFallback className="bg-secondary text-secondary-foreground">
                      {post.author.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium group-hover:text-primary transition-colors">{post.author.name}</p>
                    <p className="text-sm text-muted-foreground">{post.author.job || "نویسنده"}</p>
                  </div>
                </Link>

                <Button variant="outline" size="sm" className="gap-2 w-fit">
                  <Share2 className="h-4 w-4" />
                  اشتراک‌گذاری
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.coverImage && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-10 sm:mb-16">
            <div className="aspect-[16/9] sm:aspect-[21/9] rounded-xl sm:rounded-2xl overflow-hidden">
              <img
                src={post.coverImage.url}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <PostContent>
            {post.body?.html ? (
              <div dangerouslySetInnerHTML={{ __html: post.body.html }} />
            ) : (
              <div className="prose prose-invert max-w-none">
                <p>{post.excerpt}</p>
              </div>
            )}
          </PostContent>

          <AuthorBio 
            name={post.author.name}
            avatar={post.author.avatar?.url}
            initials={post.author.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
            slug={post.author.slug}
            bio={post.author.bio?.html}
          />

          {relatedPosts.length > 0 && (
            <RelatedPosts 
              posts={relatedPosts.map((p: any) => ({
                slug: p.slug,
                title: p.title,
                excerpt: p.excerpt,
                category: p.category?.name || "",
                readTime: p.readingTime ? `${p.readingTime} دقیقه` : "۵ دقیقه",
                imageUrl: p.coverImage?.url || "",
                author: { 
                  name: p.author.name, 
                  avatar: p.author.avatar?.url || "",
                  initials: p.author.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)
                },
              }))}
            />
          )}
        </div>
      </article>

      <Footer />
    </div>
  )
}
