---
source: https://tanstack.com/router/latest/docs/api/router/RouteApiType
---

# RouteApi

An instance providing type-safe versions of common hooks (`useParams`, `useSearch`, `useRouteContext`, `useNavigate`, `useLoaderData`, `useLoaderDeps`) pre-bound to a specific route ID and its registered route types.

## Signature / Usage

```tsx
import { createFileRoute, getRouteApi } from '@tanstack/react-router'

const routeApi = getRouteApi('/dashboard/settings')

export const Route = createFileRoute('/dashboard/settings')({
  beforeLoad: ({ context }) => {
    if (!context.user) {
      // Type-safe redirect - 'from' is automatically '/dashboard/settings'
      throw routeApi.redirect({
        to: '../login', // Relative path to sibling route
      })
    }
  },
})
```

## Options / Props

| Method | Signature | Description |
|--------|-----------|-------------|
| `useMatch` | `useMatch<TSelected = TAllContext>(opts?: { select?: (match: TAllContext) => TSelected }): TSelected` | Pre-bound `useMatch`. `opts.select` maps the match (also used for shallow-equality re-render checks); `opts.structuralSharing?: boolean` configures structural sharing for the selected value. Without `select`, returns the `RouteMatch` (or a loosened version if `opts.strict` is `false`) |
| `useRouteContext` | `useRouteContext<TSelected = TAllContext>(opts?: { select?: (search: TAllContext) => TSelected }): TSelected` | Pre-bound `useRouteContext`. Without `select`, returns the `RouteContext` object (or a loosened version if `opts.strict` is `false`) |
| `useSearch` | `useSearch<TSelected = TFullSearchSchema>(opts?: { select?: (search: TFullSearchSchema) => TSelected }): TSelected` | Pre-bound `useSearch`. Supports `opts.structuralSharing`. Without `select`, returns the `TFullSearchSchema` object (or a loosened version if `opts.strict` is `false`) |
| `useParams` | `useParams<TSelected = TAllParams>(opts?: { select?: (params: TAllParams) => TSelected }): TSelected` | Pre-bound `useParams`. Supports `opts.structuralSharing`. Without `select`, returns the `TAllParams` object (or a loosened version if `opts.strict` is `false`) |
| `useLoaderData` | `useLoaderData<TSelected = TLoaderData>(opts?: { select?: (search: TLoaderData) => TSelected }): TSelected` | Pre-bound `useLoaderData`. Supports `opts.structuralSharing`. Without `select`, returns the `TLoaderData` object (or a loosened version if `opts.strict` is `false`) |
| `useLoaderDeps` | `useLoaderDeps<TSelected = TLoaderDeps>(opts?: { select?: (search: TLoaderDeps) => TSelected }): TSelected` | Pre-bound `useLoaderDeps`. Supports `opts.structuralSharing`. Without `select`, returns the `TLoaderDeps` object |
| `useNavigate` | `useNavigate()` | Pre-bound `useNavigate` (returns a navigate function) |
| `redirect` | `redirect(opts?: RedirectOptions): Redirect` | Pre-bound `redirect`. `from` is automatically set to the route ID, enabling type-safe relative redirects. Accepts all options from `redirect` except `from`. Returns a `Redirect` object that can be thrown from `beforeLoad` or `loader` |

## Notes

- The official example omits the `createFileRoute` import; it is added here.

## Related

- [getRouteApi](./get-route-api.md)
- [Route (type)](./route.md)
- [redirect](./redirect.md)
- [useMatch](./use-match.md)
- [useParams](./use-params.md)
- [useSearch](./use-search.md)
- [useRouteContext](./use-route-context.md)
- [useLoaderData](./use-loader-data.md)
- [useLoaderDeps](./use-loader-deps.md)
- [useNavigate](./use-navigate.md)
