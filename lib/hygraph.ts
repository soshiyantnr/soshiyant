// کلاینت Hygraph با استفاده از fetch بومی Next.js
// تا قابلیت ISR (revalidate) به‌درستی کار کند.

export const hygraphClient = {
  async query<T>(query: string, variables?: Record<string, any>): Promise<T> {
    const endpoint = process.env.HYGRAPH_ENDPOINT;
    const token = process.env.HYGRAPH_TOKEN;

    if (!endpoint || !token) {
      throw new Error(
        'Hygraph is not configured. Set HYGRAPH_ENDPOINT and HYGRAPH_TOKEN in the deployment environment.'
      );
    }

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query, variables }),
      // اعتبارسنجی مجدد هر ۶۰ ثانیه (ISR) — تغییرات Hygraph به‌مرور اعمال می‌شوند
      next: { revalidate: 60, tags: ['hygraph'] },
    });

    if (!res.ok) {
      throw new Error(`Hygraph request failed: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();

    if (json.errors) {
      throw new Error(
        `Hygraph GraphQL error: ${json.errors.map((e: any) => e.message).join(', ')}`
      );
    }

    return json.data as T;
  },
};
