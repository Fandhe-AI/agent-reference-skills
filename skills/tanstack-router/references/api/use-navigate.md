---
source: https://tanstack.com/router/latest/docs/api/router/useNavigateHook
---

# useNavigate

Returns a `navigate` function that can be used to navigate to a new location.

## Signature / Usage

```tsx
import { useNavigate } from '@tanstack/react-router'

function Component() {
  const navigate = useNavigate()
  return (
    <button onClick={() => navigate({ to: '/posts', search: { page: 2 } })}>
      Posts (Page 2)
    </button>
  )
}
```

```ts
const navigate = useNavigate(options?: { from?: string })
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `from` | `string` | Location to navigate from instead of the current location (optional) |

## Notes

- The returned `navigate` function accepts `NavigateOptions` and returns a `Promise` that resolves when navigation completes.
- Supports changes to pathname, search params, hash, and location state.

## Related

- [NavigateOptions](./navigate-options.md)
- [Navigate](./navigate.md)
- [Link](./link.md)
