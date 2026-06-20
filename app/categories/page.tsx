import { getCategoriesWithStats } from "@/lib/hygraph-api"
import { Header } from "@/components/blog/header"
import { Footer } from "@/components/blog/footer"
import { ReadingProgress } from "@/components/blog/reading-progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FolderOpen, FileText, ArrowLeft } from "lucide-react"
import Link from "next/link"

// اعتبارسنجی مجدد هر ۶۰ ثانیه (ISR)
export const revalidate = 60

export const metadata = {
  title: "دسته‌بندی‌ها | نوشتار",
  description: "همهٔ دسته‌بندی‌های مقالات نوشتار را کاوش کنید.",
}

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2)
}

export default async function CategoriesPage() {
  const categories = await getCategoriesWithStats()
  const totalPosts = categories.reduce((sum, c) => sum + c.postCount, 0)

  return (
    <main className="min-h-screen bg-background">
      <ReadingProgress />
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 persian-pattern pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

        <div className="max-w-7xl mx-auto relative text-center">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            موضوعات
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-balance">
            <span className="bg-gradient-to-l from-primary via-primary/80 to-accent bg-clip-text text-transparent">
              دسته‌بندی‌ها
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            موضوع مورد علاقهٔ خود را انتخاب کنید و در میان مقالات متنوع نوشتار کاوش کنید
          </p>

          <div className="mt-12 flex items-center justify-center gap-8 sm:gap-16">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-primary mb-1">
                <FolderOpen className="h-5 w-5" />
                <span className="text-2xl sm:text-3xl font-bold">
                  {categories.length.toLocaleString("fa-IR")}
                </span>
              </div>
              <span className="text-sm text-muted-foreground">دسته‌بندی</span>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-primary mb-1">
                <FileText className="h-5 w-5" />
                <span className="text-2xl sm:text-3xl font-bold">
                  {totalPosts.toLocaleString("fa-IR")}
                </span>
              </div>
              <span className="text-sm text-muted-foreground">مقاله</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link key={category.id} href={`/categories/${category.slug}`}>
                <article className="group relative bg-card border border-border/50 rounded-2xl p-6 h-full flex flex-col transition-all duration-500 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      <FolderOpen className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">
                      {category.postCount.toLocaleString("fa-IR")} مقاله
                    </span>
                  </div>

                  <h2 className="text-xl font-bold group-hover:text-primary transition-colors">
                    {category.name}
                  </h2>

                  {category.description && (
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                      {category.description}
                    </p>
                  )}

                  {/* Top authors */}
                  <div className="mt-5 pt-4 border-t border-border/50 flex items-center justify-between">
                    {category.topAuthors.length > 0 ? (
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2 space-x-reverse">
                          {category.topAuthors.map((author) => (
                            <Avatar
                              key={author.id}
                              className="h-7 w-7 ring-2 ring-card"
                            >
                              <AvatarImage src={author.avatar?.url} alt={author.name} />
                              <AvatarFallback className="text-[10px] bg-secondary text-secondary-foreground">
                                {getInitials(author.name)}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {category.topAuthors.length.toLocaleString("fa-IR")} نویسنده
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">به‌زودی</span>
                    )}

                    <ArrowLeft className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:-translate-x-1 transition-all duration-300" />
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
