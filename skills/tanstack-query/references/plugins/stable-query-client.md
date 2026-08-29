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

## Related

- [eslint-plugin-query](./eslint-plugin-query.md)
