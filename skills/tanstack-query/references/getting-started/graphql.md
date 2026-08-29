---
source: https://tanstack.com/query/latest/docs/framework/react/graphql
---

# GraphQL

Because TanStack Query is built on Promises, it works with any async data client, including GraphQL clients like `graphql-request`.

## Signature / Usage

```tsx
import request from 'graphql-request'
import { useQuery } from '@tanstack/react-query'
import { graphql } from './gql/gql'

const allFilmsWithVariablesQueryDocument = graphql(/* GraphQL */ `
  query allFilmsWithVariablesQuery($first: Int!) {
    allFilms(first: $first) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`)

function App() {
  const { data } = useQuery({
    queryKey: ['films'],
    queryFn: async () =>
      request(
        'https://swapi-graphql.netlify.app/.netlify/functions/index',
        allFilmsWithVariablesQueryDocument,
        { first: 10 },
      ),
  })
}
```

## Notes

- TanStack Query does **not** support normalized caching, unlike Apollo Client
- Combine with `graphql-request` + GraphQL Code Generator for fully-typed GraphQL operations

## Related

- [TypeScript](./typescript.md)
- [Comparison](./comparison.md)
