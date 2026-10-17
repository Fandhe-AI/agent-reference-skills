---
source: https://tanstack.com/router/latest/docs/api/router/RouteOptionsType
---

# RouteOptions

The type describing options accepted when creating a route (via `createRoute` / `createFileRoute`).

## Signature / Usage

```tsx
const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/posts/$postId',
  loader: ({ params }) => fetchPost(params.postId),
  component: PostComponent,
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `getParentRoute` | `() => TParentRoute` | Returns the parent route; required for type safety and tree construction |
| `path` | `string` | Path segment used for route matching (required unless `id` is provided) |
| `component` | `RouteComponent \| LazyRouteComponent` | Content rendered when the route matches; defaults to `<Outlet />` |
| `loader` | `loaderFn \| { handler, staleReloadMode? }` | Async function called when the route matches; data accessible via `useLoaderData` |
| `beforeLoad` | `(opts) => Promise<TRouteContext> \| TRouteContext \| void` | Called before the route loads; commonly used for auth checks and redirects |
| `validateSearch` | `(rawSearchParams: unknown) => TSearchSchema` | Validates and parses search params |
| `errorComponent` | `RouteComponent \| LazyRouteComponent` | Rendered when the route errors |
| `pendingComponent` | `RouteComponent \| LazyRouteComponent` | Shown when pending past the `pendingMs` threshold |
| `params.parse` | `(rawParams: Record<string, string>) => TParams \| false` | Parses raw route params; returning `false` skips matching |
| `onError` | `(error: any) => void` | Called on navigation/preload errors |
| `onEnter` | `(match: RouteMatch) => void` | Called when a route is matched and loaded after not being matched in the previous location |
| `onStay` | `(match: RouteMatch) => void` | Called when a route is matched and loaded after being matched in the previous location |
| `onLeave` | `(match: RouteMatch) => void` | Called when a route is no longer matched after being matched in the previous location |
| `onCatch` | `(error: unknown) => void` (React / Vue); `(error: Error) => void` (Solid) | Called when the route catches an error; defaults to `routerOptions.defaultOnCatch` |

## Notes

- Routes below an error or not-found boundary do not enter the active route lifecycle; the boundary itself remains active.
- `onEnter` also fires when a previously hidden route becomes active again after a navigation.
- `onStay` requires both navigations to include the route in the active branch, through the first error or not-found boundary.
- `onLeave` also runs when a navigation hides a previously active route below an error or not-found boundary, even if the route remains structurally matched.
- Background reloads update route data without dispatching `onEnter` / `onStay` / `onLeave`.

## Related

- [createRoute](./create-route.md)
- [createFileRoute](./create-file-route.md)
