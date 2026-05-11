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
  image?: {
    id: string;
    url: string;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface CoverImage {
  id: string;
  url: string;
  alt?: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: CoverImage;
  author: Author;
  categories: Category[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export async function getPosts(): Promise<Post[]> {
  const data = await hygraphClient.query<{ posts: Post[] }>(POSTS_QUERY);
  return data.posts;
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
  const data = await hygraphClient.query<{
    authors: (Author & { posts: Post[] })[];
  }>(AUTHOR_POSTS_QUERY, { slug });
  return data.authors[0]?.posts || [];
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const data = await hygraphClient.query<{ categories: Category[] }>(
    CATEGORY_BY_SLUG_QUERY,
    { slug }
  );
  return data.categories[0] || null;
}

export async function getCategoryPosts(slug: string): Promise<Post[]> {
  const data = await hygraphClient.query<{
    categories: (Category & { posts: Post[] })[];
  }>(CATEGORY_POSTS_QUERY, { slug });
  return data.categories[0]?.posts || [];
}

export async function getRelatedPosts(
  categoryIds: string[],
  excludePostId: string
): Promise<Post[]> {
  const data = await hygraphClient.query<{ posts: Post[] }>(
    RELATED_POSTS_QUERY,
    {
      categoryIds,
      excludePostId,
      first: 3,
    }
  );
  return data.posts;
}

export async function getAllAuthors(): Promise<Author[]> {
  const data = await hygraphClient.query<{ authors: Author[] }>(
    ALL_AUTHORS_QUERY
  );
  return data.authors;
}

export async function getAllCategories(): Promise<Category[]> {
  const data = await hygraphClient.query<{ categories: Category[] }>(
    ALL_CATEGORIES_QUERY
  );
  return data.categories;
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
