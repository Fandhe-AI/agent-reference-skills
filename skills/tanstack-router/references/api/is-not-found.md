---
source: https://raw.githubusercontent.com/TanStack/router/main/docs/router/api/router/isNotFoundFunction.md
---

# isNotFound

Type guard checking whether a given value is a `NotFoundError` object.

## Signature / Usage

```tsx
import { isNotFound } from '@tanstack/react-router'

function somewhere(obj: unknown) {
  if (isNotFound(obj)) {
    // Handle not-found case
  }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `input` | `unknown` | The value to evaluate (required) |

## Related

- [notFound](./not-found.md)
- [isRedirect](./is-redirect.md)
