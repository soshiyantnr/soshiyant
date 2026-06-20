const endpoint = process.env.HYGRAPH_ENDPOINT;
const token = process.env.HYGRAPH_TOKEN;

async function gql(query, variables) {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query, variables }),
  });
  return res.json();
}

async function main() {
  // Test 1: category on Post - is it single or list?
  console.log('=== TEST: Post.category structure ===');
  const r1 = await gql(`{ posts(first: 1) { title category { ... on Category { id name slug } } } }`);
  console.log(JSON.stringify(r1, null, 2));

  // Test 2: category posts filter
  console.log('\n=== TEST: filter posts by category slug (single) ===');
  const r2 = await gql(`query($slug: String!) { posts(where: { category: { slug: $slug } }, first: 2) { title } }`, { slug: 'technology' });
  console.log(JSON.stringify(r2, null, 2));

  // Test 3: list all categories with posts count
  console.log('\n=== TEST: categories list ===');
  const r3 = await gql(`{ categories(first: 100) { id name slug description } }`);
  console.log(JSON.stringify(r3, null, 2));

  // Test 4: authors
  console.log('\n=== TEST: authors list ===');
  const r4 = await gql(`{ authors(first: 100) { id name slug job monthlyReaders socialLinks bio { html } avatar { url } } }`);
  console.log(JSON.stringify(r4, null, 2));

  // Test 5: orderBy publishDate
  console.log('\n=== TEST: orderBy publishDate_DESC ===');
  const r5 = await gql(`{ posts(first: 2, orderBy: publishDate_DESC) { title publishDate } }`);
  console.log(JSON.stringify(r5, null, 2));
}

main();
