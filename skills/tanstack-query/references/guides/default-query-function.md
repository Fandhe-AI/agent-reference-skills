---
source: https://tanstack.com/query/latest/docs/framework/react/guides/default-query-function
---

# Default Query Fn

Configure a single default `queryFn` on the `QueryClient` so individual `useQuery` calls only need to specify a `queryKey`.

## Signature / Usage

```tsx
// Define a default query function that will receive the query key
const defaultQueryFn = async ({ queryKey }) => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com${queryKey[0]}`,
  )
  return data
}

// provide the default query function to your app with defaultOptions
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
})

// All you have to do now is pass a key!
function Posts() {
  const { status, data, error, isFetching } = useQuery({ queryKey: ['/posts'] })
}

// You can even leave out the queryFn and just go straight into options
function Post({ postId }) {
  const { status, data, error, isFetching } = useQuery({
    queryKey: [`/posts/${postId}`],
    enabled: !!postId,
  })
}
```

## Notes

- Individual queries can still override the default by passing their own `queryFn`.
- Convenient when most queries share the same fetch shape (e.g. REST endpoints keyed by path).

## Related

- [query-functions.md](./query-functions.md)
- [query-keys.md](./query-keys.md)
