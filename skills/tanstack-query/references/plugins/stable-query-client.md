---
source: https://tanstack.com/query/latest/docs/eslint/stable-query-client
---

# @tanstack/query/stable-query-client

Enforces creating a single `QueryClient` instance for the application's lifecycle instead of instantiating a new one on every render.

## Signature / Usage

```tsx
// ❌ incorrect — new QueryClient on every render
function App() {
  const queryClient = new QueryClient()
  return <QueryClientProvider client={queryClient}>...</QueryClientProvider>
}

// ✅ correct — created once
function App() {
  const [queryClient] = useState(() => new QueryClient())
  return <QueryClientProvider client={queryClient}>...</QueryClientProvider>
}
```

## Notes

- The `QueryClient` contains the `QueryCache`, so only one instance should exist for the lifecycle of the application
- Module-level declaration (outside the component) is also acceptable
- Creating a new instance inside an async Server Component is permitted since the function executes only once on the server
- Recommended and automatically fixable
- Checks function declarations, function expressions, and arrow functions used as React components or custom hooks, and also reports clients created directly in JSX; automatic fixes are available when the client is assigned to a variable
- Source: https://raw.githubusercontent.com/TanStack/query/release-2026-11-06-2304/docs/eslint/stable-query-client.md (tag `release-2026-11-06-2304`, fetched 2026-11-14)

## Related

- [eslint-plugin-query](./eslint-plugin-query.md)
