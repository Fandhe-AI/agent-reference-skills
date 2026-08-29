---
source: https://tanstack.com/router/latest/docs/api/router/createRootRouteWithContextFunction
---

# createRootRouteWithContext

A helper function that creates a root route instance requiring a context type to be fulfilled when the router is created.

## Signature / Usage

```tsx
interface MyRouterContext {
  queryClient: QueryClient
}

const rootRoute = createRootRouteWithContext<MyRouterContext>()({
  component: () => <Outlet />,
})

const router = createRouter({
  routeTree: rootRoute.addChildren([]),
  context: { queryClient: new QueryClient() },
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `TRouterContext` | generic type parameter | Context type required at router creation (optional but recommended for type safety) |

## Notes

- Returns a factory function with the same argument signature as `createRootRoute`.

## Related

- [createRootRoute](./create-root-route.md)
- [useRouteContext](./use-route-context.md)
