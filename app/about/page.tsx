import { Header } from "@/components/blog/header"
import { Footer } from "@/components/blog/footer"
import { ReadingProgress } from "@/components/blog/reading-progress"
import { AboutContent, type AboutStat, type AboutTeamMember } from "@/components/blog/about-content"
import { getAllAuthors, getPosts } from "@/lib/hygraph-api"

// اعتبارسنجی مجدد هر ۶۰ ثانیه (ISR)
export const revalidate = 60

// قالب‌بندی عدد به صورت فارسی و خلاصه (مثلاً ۵۰K+)
function formatCompact(value: number): string {
  if (value >= 1000) {
    const k = Math.round(value / 100) / 10
    return `${k.toLocaleString("fa-IR")}K+`
  }
  return `${value.toLocaleString("fa-IR")}+`
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
}

export default async function AboutPage() {
  const [authors, posts] = await Promise.all([getAllAuthors(), getPosts()])

  // مجموع خوانندگان ماهانه از روی داده‌های واقعی نویسندگان
  const totalMonthlyReaders = authors.reduce(
    (sum, author) => sum + (author.monthlyReaders || 0),
    0
  )

  const stats: AboutStat[] = [
    { icon: "BookOpen", value: `${posts.length.toLocaleString("fa-IR")}+`, label: "مقاله منتشر شده" },
    { icon: "Users", value: authors.length.toLocaleString("fa-IR"), label: "نویسنده فعال" },
    {
      icon: "Heart",
      value: totalMonthlyReaders > 0 ? formatCompact(totalMonthlyReaders) : "—",
      label: "خواننده ماهانه",
    },
  ]

  // تیم واقعی از روی نویسندگان Hygraph
  const team: AboutTeamMember[] = authors.map((author) => ({
    name: author.name,
    role: author.job || "نویسنده",
    bio: author.bio?.html ? author.bio.html.replace(/<[^>]*>/g, "").trim() : "",
    avatar: author.avatar?.url,
    initials: getInitials(author.name),
    slug: author.slug,
  }))

  return (
    <div className="min-h-screen bg-background">
      <ReadingProgress />
      <Header />
      <AboutContent stats={stats} team={team} />
      <Footer />
    </div>
  )
}
