---
source: https://tanstack.com/router/latest/docs/installation/manual
---

# RouterProvider

The root component that mounts a `Router` instance created with `createRouter` and makes routing available throughout the application tree.

## Signature / Usage

```tsx
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

const router = createRouter({ routeTree })

function App() {
  return <RouterProvider router={router} />
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `router` | `Router` | The router instance created via `createRouter` (required) |

## Notes

- There is no dedicated API reference page for `RouterProvider`; its usage is documented inline in the installation / quick-start guides.
- Rendered at the root of the app (e.g. inside `ReactDOM.createRoot(...).render(...)`).

## Related

- [createRouter](./create-router.md)
- [Router](./router.md)
