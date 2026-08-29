---
source: https://raw.githubusercontent.com/TanStack/router/main/docs/router/api/router/isRedirectFunction.md
---

# isRedirect

Checks whether a given value is a redirect object.

## Signature / Usage

```tsx
import { isRedirect } from '@tanstack/react-router'

function somewhere(obj: unknown) {
  if (isRedirect(obj)) {
    // Handle redirect case
  }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `input` | `unknown` | The value to evaluate (required) |

## Related

- [redirect](./redirect.md)
- [isNotFound](./is-not-found.md)
