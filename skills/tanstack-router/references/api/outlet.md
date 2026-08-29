---
source: https://tanstack.com/router/latest/docs/api/router/outletComponent
---

# Outlet

Renders the next matched child route of a parent route.

## Signature / Usage

```tsx
import { Outlet } from '@tanstack/react-router'

function ParentRouteComponent() {
  return (
    <div>
      <Outlet />
    </div>
  )
}
```

## Notes

- Accepts no props.
- If a child route is matched, renders that match's `component` / `errorComponent` / `pendingComponent` / `notFoundComponent`; otherwise renders `null`.

## Related

- [Link](./link.md)
- [createRootRoute](./create-root-route.md)
