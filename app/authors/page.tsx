import { getAllAuthors, getAuthorPostCounts } from "@/lib/hygraph-api"
import { Header } from "@/components/blog/header"
import { Footer } from "@/components/blog/footer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, Users, TrendingUp, UserPlus } from "lucide-react"
import Link from "next/link"

// اعتبارسنجی مجدد هر ۶۰ ثانیه (ISR)
export const revalidate = 60

export const metadata = {
  title: "نویسندگان | نوشتار",
  description: "با تیم نویسندگان نوشتار آشنا شوید.",
}

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2)
}

// متن کوتاه از بیوگرافی HTML
function stripHtml(html?: string) {
  if (!html) return ""
  return html.replace(/<[^>]*>/g, "").trim()
}

export default async function AuthorsPage() {
  const [authors, postCounts] = await Promise.all([
    getAllAuthors(),
    getAuthorPostCounts(),
  ])

  const totalArticles = Object.values(postCounts).reduce((sum, n) => sum + n, 0)
  const totalReaders = authors.reduce((sum, a) => sum + (a.monthlyReaders || 0), 0)

  // تعداد کارت‌های placeholder تا گرید کامل به‌نظر برسد (مضربی از ۴)
  const minSlots = 4
  const placeholderCount =
    authors.length < minSlots
      ? minSlots - authors.length
      : (4 - (authors.length % 4)) % 4

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 persian-pattern pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center">
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
          </div>

          {/* Stats */}
          <div className="mt-12 flex items-center justify-center gap-8 sm:gap-16">
            {[
              { icon: Users, value: authors.length.toLocaleString("fa-IR"), label: "نویسنده فعال" },
              { icon: BookOpen, value: totalArticles.toLocaleString("fa-IR"), label: "مقاله منتشر شده" },
              {
                icon: TrendingUp,
                value: totalReaders > 0 ? totalReaders.toLocaleString("fa-IR") : "—",
                label: "خواننده ماهانه",
              },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center gap-2 text-primary mb-1">
                  <stat.icon className="h-5 w-5" />
                  <span className="text-2xl sm:text-3xl font-bold">{stat.value}</span>
                </div>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Authors Grid */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {authors.map((author) => {
              const articleCount = postCounts[author.slug] || 0
              const bio = stripHtml(author.bio?.html)
              return (
                <Link key={author.id} href={`/authors/${author.slug}`}>
                  <article className="group relative bg-card border border-border/50 rounded-2xl p-6 h-full transition-all duration-500 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
                    <div className="flex flex-col items-center text-center h-full">
                      <div className="relative mb-4">
                        <Avatar className="h-24 w-24 ring-4 ring-background group-hover:ring-primary/20 transition-all duration-300">
                          <AvatarImage src={author.avatar?.url} alt={author.name} className="object-cover" />
                          <AvatarFallback className="text-xl bg-secondary text-secondary-foreground">
                            {getInitials(author.name)}
                          </AvatarFallback>
                        </Avatar>
                        {author.job && (
                          <span className="absolute -bottom-1 -left-1 px-2.5 py-0.5 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                            {author.job}
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                        {author.name}
                      </h3>

                      {bio && (
                        <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                          {bio}
                        </p>
                      )}

                      {/* Stats */}
                      <div className="mt-auto pt-5 w-full">
                        <div className="border-t border-border/50 pt-4 flex items-center justify-center gap-6">
                          <div className="text-center">
                            <div className="text-lg font-bold text-foreground">
                              {articleCount.toLocaleString("fa-IR")}
                            </div>
                            <div className="text-xs text-muted-foreground">مقاله</div>
                          </div>
                          <div className="w-px h-8 bg-border" />
                          <div className="text-center">
                            <div className="text-lg font-bold text-foreground">
                              {author.monthlyReaders
                                ? author.monthlyReaders.toLocaleString("fa-IR")
                                : "—"}
                            </div>
                            <div className="text-xs text-muted-foreground">خواننده</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              )
            })}

            {/* کارت‌های placeholder برای نویسندگان آینده — ساختار بصری مشابه کارت‌های واقعی */}
            {Array.from({ length: placeholderCount }).map((_, index) => (
              <div
                key={`placeholder-${index}`}
                className="relative bg-card/50 border border-dashed border-border/60 rounded-2xl p-6 h-full"
                aria-hidden="true"
              >
                <div className="flex flex-col items-center text-center h-full">
                  <div className="relative mb-4">
                    <div className="h-24 w-24 rounded-full bg-secondary/40 ring-4 ring-background flex items-center justify-center text-muted-foreground/50">
                      <UserPlus className="h-8 w-8" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-muted-foreground/70">نویسندهٔ آینده</h3>

                  <p className="mt-3 text-sm text-muted-foreground/60 leading-relaxed">
                    این جایگاه برای نویسندگان جدیدی است که به‌زودی به تیم نوشتار می‌پیوندند.
                  </p>

                  <div className="mt-auto pt-5 w-full">
                    <div className="border-t border-border/50 pt-4 flex items-center justify-center gap-6">
                      <div className="text-center">
                        <div className="text-lg font-bold text-muted-foreground/40">—</div>
                        <div className="text-xs text-muted-foreground/60">مقاله</div>
                      </div>
                      <div className="w-px h-8 bg-border" />
                      <div className="text-center">
                        <div className="text-lg font-bold text-muted-foreground/40">—</div>
                        <div className="text-xs text-muted-foreground/60">خواننده</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
