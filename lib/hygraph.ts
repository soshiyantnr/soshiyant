import { request } from 'graphql-request';

const endpoint = process.env.HYGRAPH_ENDPOINT!;
const token = process.env.HYGRAPH_TOKEN!;

if (!endpoint) {
  throw new Error('HYGRAPH_ENDPOINT environment variable is not set');
}

if (!token) {
  throw new Error('HYGRAPH_TOKEN environment variable is not set');
}

export const hygraphClient = {
  async query<T>(query: string, variables?: Record<string, any>): Promise<T> {
    return request<T>({
      url: endpoint,
      document: query,
      variables,
      requestHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
