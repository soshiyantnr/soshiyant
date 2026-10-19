const HYGRAPH_ENDPOINT = process.env.HYGRAPH_ENDPOINT;
const HYGRAPH_TOKEN = process.env.HYGRAPH_TOKEN;

async function introspect() {
  const query = `
    query IntrospectionQuery {
      __schema {
        types {
          name
          kind
          fields {
            name
            type {
              name
              kind
              ofType {
                name
                kind
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(HYGRAPH_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${HYGRAPH_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    
    // Filter to get only relevant types (not internal GraphQL types)
    const relevantTypes = data.data.__schema.types.filter(type => 
      !type.name.startsWith('__') && 
      !type.name.startsWith('_') &&
      type.kind === 'OBJECT' &&
      !['Query', 'Mutation', 'Subscription', 'PageInfo', 'Aggregate'].includes(type.name)
    );

    console.log('=== HYGRAPH SCHEMA ===\n');
    
    for (const type of relevantTypes) {
      if (type.fields && type.fields.length > 0) {
        console.log(`\n📦 ${type.name}:`);
        for (const field of type.fields) {
          const typeName = field.type.name || field.type.ofType?.name || 'Unknown';
          console.log(`  - ${field.name}: ${typeName}`);
        }
      }
    }

  } catch (error) {
    console.error('Error:', error);
  }
}

introspect();
