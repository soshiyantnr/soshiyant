import { hygraphClient } from './hygraph';
import {
  POSTS_QUERY,
  POST_BY_SLUG_QUERY,
  AUTHOR_BY_SLUG_QUERY,
  AUTHOR_POSTS_QUERY,
  CATEGORY_BY_SLUG_QUERY,
  CATEGORY_POSTS_QUERY,
  RELATED_POSTS_QUERY,
  ALL_AUTHORS_QUERY,
  ALL_CATEGORIES_QUERY,
  POST_SLUGS_QUERY,
  AUTHOR_SLUGS_QUERY,
  CATEGORY_SLUGS_QUERY,
} from './hygraph-queries';

export interface Author {
  id: string;
  name: string;
  slug: string;
  bio?: {
    html: string;
  };
  avatar?: {
    url: string;
  };
  email?: string;
  socialLinks?: Record<string, string>;
  monthlyReaders?: number;
  job?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface CoverImage {
  id?: string;
  url: string;
}

export interface Post {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  excerpt: string;
  body?: {
    html: string;
    raw?: any;
  };
  publishDate?: string;
  readingTime?: number;
  seoTitle?: string;
  seoDescription?: string;
  tags?: string[];
  coverImage: CoverImage;
  author: Author;
  // فیلد category در Hygraph یک رابطهٔ چندتایی (لیست) است
  category?: Category[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// شمارش پست‌ها و نویسندگان برتر هر دسته‌بندی (برای صفحهٔ دسته‌بندی‌ها)
export interface CategoryWithStats extends Category {
  postCount: number;
  topAuthors: Author[];
}

export async function getPosts(): Promise<Post[]> {
  const data = await hygraphClient.query<{ posts: Post[] }>(POSTS_QUERY);
  return data.posts || [];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const data = await hygraphClient.query<{ posts: Post[] }>(POST_BY_SLUG_QUERY, {
    slug,
  });
  return data.posts[0] || null;
}

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  const data = await hygraphClient.query<{ authors: Author[] }>(
    AUTHOR_BY_SLUG_QUERY,
    { slug }
  );
  return data.authors[0] || null;
}

export async function getAuthorPosts(slug: string): Promise<Post[]> {
  const data = await hygraphClient.query<{ posts: Post[] }>(AUTHOR_POSTS_QUERY, { slug });
  return data.posts || [];
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const data = await hygraphClient.query<{ categories: Category[] }>(
    CATEGORY_BY_SLUG_QUERY,
    { slug }
  );
  return data.categories[0] || null;
}

export async function getCategoryPosts(slug: string): Promise<Post[]> {
  const data = await hygraphClient.query<{ posts: Post[] }>(CATEGORY_POSTS_QUERY, { slug });
  return data.posts || [];
}

export async function getRelatedPosts(
  categoryId: string,
  excludePostId: string
): Promise<Post[]> {
  const data = await hygraphClient.query<{ posts: Post[] }>(
    RELATED_POSTS_QUERY,
    {
      categoryId,
      excludePostId,
      first: 3,
    }
  );
  return data.posts || [];
}

export async function getAllAuthors(): Promise<Author[]> {
  const data = await hygraphClient.query<{ authors: Author[] }>(
    ALL_AUTHORS_QUERY
  );
  return data.authors || [];
}

export async function getAllCategories(): Promise<Category[]> {
  const data = await hygraphClient.query<{ categories: Category[] }>(
    ALL_CATEGORIES_QUERY
  );
  return data.categories || [];
}

// دریافت همهٔ دسته‌بندی‌ها به همراه تعداد پست و نویسندگان برتر هر دسته
// از آن‌جا که رابطهٔ معکوس Category.posts خالی برمی‌گردد، شمارش را از روی
// تمام پست‌ها (که آرایهٔ category دارند) محاسبه می‌کنیم.
export async function getCategoriesWithStats(): Promise<CategoryWithStats[]> {
  const [categories, posts] = await Promise.all([getAllCategories(), getPosts()]);

  return categories.map((category) => {
    const categoryPosts = posts.filter((post) =>
      post.category?.some((c) => c.slug === category.slug)
    );

    // نویسندگان یکتا در این دسته (حداکثر ۳ نفر برتر بر اساس تعداد مقاله)
    const authorCount = new Map<string, { author: Author; count: number }>();
    for (const post of categoryPosts) {
      if (!post.author) continue;
      const existing = authorCount.get(post.author.slug);
      if (existing) {
        existing.count += 1;
      } else {
        authorCount.set(post.author.slug, { author: post.author, count: 1 });
      }
    }

    const topAuthors = Array.from(authorCount.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 3)
      .map((entry) => entry.author);

    return {
      ...category,
      postCount: categoryPosts.length,
      topAuthors,
    };
  });
}

// دریافت نویسندگان برتر یک دسته‌بندی خاص (برای صفحهٔ جزئیات دسته)
export async function getCategoryTopAuthors(slug: string): Promise<Author[]> {
  const posts = await getCategoryPosts(slug);
  const authorCount = new Map<string, { author: Author; count: number }>();
  for (const post of posts) {
    if (!post.author) continue;
    const existing = authorCount.get(post.author.slug);
    if (existing) {
      existing.count += 1;
    } else {
      authorCount.set(post.author.slug, { author: post.author, count: 1 });
    }
  }
  return Array.from(authorCount.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
    .map((entry) => entry.author);
}

// شمارش تعداد مقالات هر نویسنده (برای صفحهٔ نویسندگان)
export async function getAuthorPostCounts(): Promise<Record<string, number>> {
  const posts = await getPosts();
  const counts: Record<string, number> = {};
  for (const post of posts) {
    if (!post.author) continue;
    counts[post.author.slug] = (counts[post.author.slug] || 0) + 1;
  }
  return counts;
}

export async function getPostSlugs(): Promise<string[]> {
  const data = await hygraphClient.query<{ posts: { slug: string }[] }>(
    POST_SLUGS_QUERY
  );
  return data.posts.map((post) => post.slug);
}

export async function getAuthorSlugs(): Promise<string[]> {
  const data = await hygraphClient.query<{ authors: { slug: string }[] }>(
    AUTHOR_SLUGS_QUERY
  );
  return data.authors.map((author) => author.slug);
}

export async function getCategorySlugs(): Promise<string[]> {
  const data = await hygraphClient.query<{ categories: { slug: string }[] }>(
    CATEGORY_SLUGS_QUERY
  );
  return data.categories.map((category) => category.slug);
}
