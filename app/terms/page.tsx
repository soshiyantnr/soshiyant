import { Header } from "@/components/blog/header"
import { Footer } from "@/components/blog/footer"

export const metadata = {
  title: "قوانین استفاده | نوشتار",
  description: "قوانین و شرایط استفاده از پلتفرم نوشتار.",
}

const sections = [
  {
    title: "پذیرش شرایط",
    body: "با استفاده از پلتفرم نوشتار، شما این قوانین را می‌پذیرید. در صورت عدم موافقت با هر بخش از این شرایط، لطفاً از خدمات ما استفاده نکنید.",
  },
  {
    title: "استفاده مجاز",
    body: "شما می‌توانید از محتوای این وب‌سایت برای مطالعه شخصی و غیرتجاری استفاده کنید. بازنشر محتوا بدون ذکر منبع و اجازه کتبی مجاز نیست.",
  },
  {
    title: "مالکیت معنوی",
    body: "تمامی مقالات، تصاویر و محتوای منتشرشده در نوشتار متعلق به نویسندگان و پلتفرم است و تحت قوانین مالکیت معنوی محافظت می‌شود.",
  },
  {
    title: "محتوای کاربران",
    body: "در صورتی که امکان ارسال دیدگاه یا محتوا فراهم باشد، شما مسئول محتوای ارسالی خود هستید و متعهد می‌شوید محتوای غیرقانونی، توهین‌آمیز یا نقض‌کننده حقوق دیگران منتشر نکنید.",
  },
  {
    title: "مسئولیت‌ها",
    body: "محتوای این وب‌سایت با هدف اطلاع‌رسانی ارائه می‌شود. ما تلاش می‌کنیم اطلاعات دقیق باشند اما مسئولیتی در قبال تصمیم‌هایی که بر اساس این محتوا گرفته می‌شود نداریم.",
  },
  {
    title: "تغییرات در قوانین",
    body: "ما ممکن است این قوانین را در هر زمان به‌روزرسانی کنیم. تغییرات پس از انتشار در همین صفحه اعمال خواهند شد و ادامه استفاده شما به معنای پذیرش نسخه جدید است.",
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-28 sm:pt-36 pb-16 sm:pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <span className="text-xs sm:text-sm font-medium text-muted-foreground tracking-wider">
            سیاست‌ها
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-2 text-balance">
            قوانین استفاده
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            لطفاً پیش از استفاده از پلتفرم نوشتار، این قوانین و شرایط را با دقت مطالعه کنید.
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
