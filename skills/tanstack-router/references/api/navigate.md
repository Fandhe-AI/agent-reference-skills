---
source: https://tanstack.com/router/latest/docs/api/router/navigateComponent
---

# Navigate

Navigates to a new location when rendered. Handles changes to pathname, search params, hash, and location state.

## Signature / Usage

```tsx
import { Navigate } from '@tanstack/react-router'

function RedirectComponent() {
  return <Navigate to="/login" />
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `...options` | `NavigateOptions` | Navigation target and options |

## Notes

- Renders `null`.
- Navigation is performed inside a `useEffect` after render, not synchronously.

## Related

- [NavigateOptions](./navigate-options.md)
- [useNavigate](./use-navigate.md)
