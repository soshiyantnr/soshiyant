// کوئری‌ها بر اساس اسکیمای واقعی Hygraph
// نکته مهم: فیلد category روی Post یک رابطهٔ «چندتایی» (لیست) است،
// بنابراین برای فیلتر کردن باید از category_some استفاده کنیم و
// خروجی category همیشه یک آرایه است.

export const POSTS_QUERY = `
  query GetPosts($first: Int = 100, $orderBy: PostOrderByInput = publishDate_DESC) {
    posts(first: $first, orderBy: $orderBy) {
      id
      title
      subtitle
      slug
      excerpt
      publishDate
      readingTime
      tags
      publishedAt
      updatedAt
      createdAt
      coverImage {
        id
        url
      }
      author {
        id
        name
        slug
        avatar {
          url
        }
      }
      category {
        id
        name
        slug
      }
    }
  }
`;

export const POST_BY_SLUG_QUERY = `
  query GetPostBySlug($slug: String!) {
    posts(where: { slug: $slug }, first: 1) {
      id
      title
      subtitle
      slug
      excerpt
      body {
        html
        raw
      }
      publishDate
      readingTime
      seoTitle
      seoDescription
      tags
      publishedAt
      updatedAt
      createdAt
      coverImage {
        id
        url
      }
      author {
        id
        name
        slug
        bio {
          html
        }
        avatar {
          url
        }
        job
      }
      category {
        id
        name
        slug
      }
    }
  }
`;

export const AUTHOR_BY_SLUG_QUERY = `
  query GetAuthorBySlug($slug: String!) {
    authors(where: { slug: $slug }, first: 1) {
      id
      name
      slug
      bio {
        html
      }
      avatar {
        url
      }
      email
      socialLinks
      monthlyReaders
      job
    }
  }
`;

export const AUTHOR_POSTS_QUERY = `
  query GetAuthorPosts($slug: String!, $first: Int = 100) {
    posts(where: { author: { slug: $slug } }, first: $first, orderBy: publishDate_DESC) {
      id
      title
      slug
      excerpt
      readingTime
      publishDate
      coverImage {
        url
      }
      category {
        id
        name
        slug
      }
      createdAt
    }
  }
`;

export const CATEGORY_BY_SLUG_QUERY = `
  query GetCategoryBySlug($slug: String!) {
    categories(where: { slug: $slug }, first: 1) {
      id
      name
      slug
      description
    }
  }
`;

// فیلتر پست‌ها بر اساس دسته‌بندی: چون category لیست است از category_some استفاده می‌کنیم
export const CATEGORY_POSTS_QUERY = `
  query GetCategoryPosts($slug: String!, $first: Int = 100) {
    posts(where: { category_some: { slug: $slug } }, first: $first, orderBy: publishDate_DESC) {
      id
      title
      slug
      excerpt
      readingTime
      publishDate
      coverImage {
        url
      }
      author {
        id
        name
        slug
        avatar {
          url
        }
      }
      category {
        id
        name
        slug
      }
      createdAt
    }
  }
`;

export const RELATED_POSTS_QUERY = `
  query GetRelatedPosts($categoryId: ID!, $excludePostId: ID!, $first: Int = 3) {
    posts(
      where: { category_some: { id: $categoryId }, id_not: $excludePostId }
      first: $first
      orderBy: publishDate_DESC
    ) {
      id
      title
      slug
      excerpt
      readingTime
      publishDate
      coverImage {
        url
      }
      author {
        name
        slug
        avatar {
          url
        }
      }
      createdAt
    }
  }
`;

export const ALL_AUTHORS_QUERY = `
  query GetAllAuthors {
    authors(first: 100) {
      id
      name
      slug
      bio {
        html
      }
      avatar {
        url
      }
      email
      socialLinks
      monthlyReaders
      job
    }
  }
`;

export const ALL_CATEGORIES_QUERY = `
  query GetAllCategories {
    categories(first: 100) {
      id
      name
      slug
      description
    }
  }
`;

export const POST_SLUGS_QUERY = `
  query GetPostSlugs {
    posts(first: 100) {
      slug
    }
  }
`;

export const AUTHOR_SLUGS_QUERY = `
  query GetAuthorSlugs {
    authors(first: 100) {
      slug
    }
  }
`;

export const CATEGORY_SLUGS_QUERY = `
  query GetCategorySlugs {
    categories(first: 100) {
      slug
    }
  }
`;
