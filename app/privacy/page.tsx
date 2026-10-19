import { Header } from "@/components/blog/header"
import { Footer } from "@/components/blog/footer"

export const metadata = {
  title: "حریم خصوصی | نوشتار",
  description: "سیاست حریم خصوصی پلتفرم نوشتار و نحوه جمع‌آوری و استفاده از اطلاعات کاربران.",
}

const sections = [
  {
    title: "جمع‌آوری اطلاعات",
    body: "ما تنها اطلاعاتی را جمع‌آوری می‌کنیم که برای ارائه خدمات ضروری است؛ از جمله نشانی ایمیلی که هنگام عضویت در خبرنامه وارد می‌کنید. هیچ اطلاعات حساسی بدون رضایت شما ذخیره نمی‌شود.",
  },
  {
    title: "استفاده از اطلاعات",
    body: "از اطلاعات شما تنها برای ارسال خبرنامه، بهبود تجربه کاربری و اطلاع‌رسانی درباره مقالات جدید استفاده می‌کنیم. اطلاعات شما هرگز به اشخاص ثالث فروخته نمی‌شود.",
  },
  {
    title: "کوکی‌ها",
    body: "این وب‌سایت از کوکی‌ها برای ذخیره ترجیحات شما و تحلیل ترافیک استفاده می‌کند. می‌توانید در تنظیمات مرورگر خود کوکی‌ها را غیرفعال کنید، هرچند ممکن است برخی امکانات به‌درستی کار نکنند.",
  },
  {
    title: "امنیت اطلاعات",
    body: "ما از روش‌های استاندارد صنعتی برای محافظت از اطلاعات شما استفاده می‌کنیم. با این حال هیچ روش انتقال اطلاعات در اینترنت کاملاً امن نیست و نمی‌توانیم امنیت مطلق را تضمین کنیم.",
  },
  {
    title: "حقوق شما",
    body: "شما در هر زمان می‌توانید درخواست دسترسی، اصلاح یا حذف اطلاعات شخصی خود را داشته باشید. برای این کار کافی است از طریق راه‌های ارتباطی با ما در تماس باشید.",
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-28 sm:pt-36 pb-16 sm:pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <span className="text-xs sm:text-sm font-medium text-muted-foreground tracking-wider">
            سیاست‌ها
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-2 text-balance">
            حریم خصوصی
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            حریم خصوصی شما برای ما اهمیت دارد. این صفحه توضیح می‌دهد که چه اطلاعاتی را
            جمع‌آوری می‌کنیم و چگونه از آن‌ها محافظت می‌کنیم.
          </p>

          <div className="mt-10 sm:mt-12 flex flex-col gap-8 sm:gap-10">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-lg sm:text-xl font-bold mb-3">{section.title}</h2>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {section.body}
                </p>
              </section>
            ))}
          </div>

          <p className="mt-12 pt-6 border-t border-border text-sm text-muted-foreground">
            آخرین به‌روزرسانی: فروردین ۱۴۰۵
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
