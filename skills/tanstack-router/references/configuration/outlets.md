---
source: https://tanstack.com/router/latest/docs/framework/react/guide/outlets
---

# Outlets

The `Outlet` component is a placeholder that renders the next potentially matching child route within a parent route's component tree.

## Signature / Usage

```tsx
import { Outlet } from '@tanstack/react-router'

function ParentLayout() {
  return (
    <div>
      <nav>{/* ... */}</nav>
      <Outlet />
    </div>
  )
}
```

## Notes

- Accepts no props.
- Can be placed anywhere in a route's component structure.
- Renders nothing when no matching child route exists.
- If a route's `component` is left undefined, an `<Outlet />` is rendered automatically.
- Behaves identically across the React and Solid framework packages.

## Related

- [Creating a Router](./creating-a-router.md)
- [Not Found Errors](./not-found-errors.md)
