---
source: https://tanstack.com/router/latest/docs/api/router/redirectFunction
---

# redirect

Returns a new `Redirect` object that can be returned or thrown from a route's `beforeLoad` or `loader` to trigger a redirect to a new location.

## Signature / Usage

```tsx
import { redirect } from '@tanstack/react-router'

const route = createRoute({
  loader: () => {
    if (!user) {
      throw redirect({
        to: '/login',
      })
    }
  },
})
```

```ts
redirect(options: Redirect): Redirect
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `to` | `string` | Internal route to redirect to |
| `href` | `string` | External URL to redirect to |
| `throw` | `boolean` | When `true`, the `Redirect` is thrown automatically instead of returned |
| `from` | `string` | Origin route for a route-bound relative redirect |

## Notes

- Route-bound helpers (`Route.redirect` / `getRouteApi().redirect`) auto-set the origin, enabling type-safe relative paths without specifying `from` manually.

## Related

- [notFound](./not-found.md)
