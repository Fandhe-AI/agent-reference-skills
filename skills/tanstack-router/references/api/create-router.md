---
source: https://tanstack.com/router/latest/docs/api/router/createRouterFunction
---

# createRouter

Accepts a `RouterOptions` object and creates a new `Router` instance. Used together with `RouterProvider` to mount the router in a React app.

## Signature / Usage

```tsx
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
})

export default function App() {
  return <RouterProvider router={router} />
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `options` | `RouterOptions` | Configuration settings for the router instance (required) |

## Related

- [RouterOptions](./router-options.md)
- [Router](./router.md)
- [RouterProvider](./router-provider.md)
