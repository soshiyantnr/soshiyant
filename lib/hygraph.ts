// lib/hygraph.ts
const HYGRAPH_URL = process.env.NEXT_PUBLIC_HYGRAPH_URL!;
const HYGRAPH_TOKEN = process.env.NEXT_PUBLIC_HYGRAPH_TOKEN!;

if (!HYGRAPH_URL || !HYGRAPH_TOKEN) {
  throw new Error("لطفاً متغیرهای NEXT_PUBLIC_HYGRAPH_URL و NEXT_PUBLIC_HYGRAPH_TOKEN را در Vercel تنظیم کنید.");
}

export async function fetchHygraph<T = any>(
  query: string,
  variables: Record<string, any> = {}
): Promise<T> {
  try {
    const response = await fetch(HYGRAPH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HYGRAPH_TOKEN}`,
      },
      body: JSON.stringify({ 
        query, 
        variables 
      }),
      next: { 
        revalidate: 60,           // هر ۶۰ ثانیه بروزرسانی شود (ISR)
        tags: ['hygraph']         // برای revalidate on demand در آینده
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();

    if (json.errors && json.errors.length > 0) {
      console.error("Hygraph GraphQL Errors:", json.errors);
      throw new Error(json.errors[0].message || "خطا در دریافت داده از Hygraph");
    }

    return json.data as T;

  } catch (error) {
    console.error("Error fetching from Hygraph:", error);
    throw error;
  }
}
