export const POSTS_QUERY = `
  query GetPosts($first: Int = 100, $orderBy: PostOrderByInput = createdAt_DESC) {
    posts(first: $first, orderBy: $orderBy) {
      id
      title
      slug
      excerpt
      coverImage {
        id
        url
        alt
      }
      author {
        id
        name
        slug
        image {
          url
        }
      }
      categories {
        id
        name
        slug
      }
      createdAt
      updatedAt
      publishedAt
    }
  }
`;

export const POST_BY_SLUG_QUERY = `
  query GetPostBySlug($slug: String!) {
    posts(where: { slug: $slug }, first: 1) {
      id
      title
      slug
      excerpt
      coverImage {
        id
        url
        alt
      }
      author {
        id
        name
        slug
        image {
          url
        }
      }
      categories {
        id
        name
        slug
      }
      createdAt
      updatedAt
      publishedAt
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
      image {
        id
        url
      }
    }
  }
`;

export const AUTHOR_POSTS_QUERY = `
  query GetAuthorPosts($slug: String!, $first: Int = 100) {
    authors(where: { slug: $slug }, first: 1) {
      id
      name
      slug
      posts(first: $first, orderBy: createdAt_DESC) {
        id
        title
        slug
        excerpt
        coverImage {
          url
          alt
        }
        createdAt
      }
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

export const CATEGORY_POSTS_QUERY = `
  query GetCategoryPosts($slug: String!, $first: Int = 100) {
    categories(where: { slug: $slug }, first: 1) {
      id
      name
      slug
      posts(first: $first, orderBy: createdAt_DESC) {
        id
        title
        slug
        excerpt
        coverImage {
          url
          alt
        }
        author {
          id
          name
          slug
        }
        createdAt
      }
    }
  }
`;

export const RELATED_POSTS_QUERY = `
  query GetRelatedPosts($categoryIds: [String!]!, $excludePostId: String!, $first: Int = 3) {
    posts(
      where: { categories_some: { id_in: $categoryIds }, id_not: $excludePostId }
      first: $first
      orderBy: createdAt_DESC
    ) {
      id
      title
      slug
      excerpt
      coverImage {
        url
        alt
      }
      author {
        name
        slug
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
      image {
        url
      }
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
