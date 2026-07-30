import { getAllCategories } from "@/lib/hygraph-api"
import { FooterClient } from "@/components/blog/footer-client"

export async function Footer() {
  const categories = await getAllCategories()

  return (
    <FooterClient
      categories={categories.map((c) => ({ name: c.name, slug: c.slug }))}
    />
  )
}
