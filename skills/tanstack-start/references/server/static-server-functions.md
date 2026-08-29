---
source: https://tanstack.com/start/latest/docs/framework/react/guide/static-server-functions
---

# Static Server Functions

Static server functions run once at build time and are served as a static asset instead of being invoked on every request, by adding `staticFunctionMiddleware` from `@tanstack/start-static-server-functions`.

## Signature / Usage

```tsx
import { createServerFn } from '@tanstack/react-start'
import { staticFunctionMiddleware } from '@tanstack/start-static-server-functions'

const myServerFn = createServerFn({ method: 'GET' })
  .middleware([staticFunctionMiddleware])
  .handler(async () => {
    return 'Hello, world!'
  })
```

## Notes

- Applied via `.middleware([staticFunctionMiddleware])`, the same composition mechanism as any other middleware (see `middleware.md`).
- Intended for data that is safe to compute once at build time rather than per-request.

## Related

- [Server Functions](./server-functions.md)
- [Middleware](./middleware.md)
