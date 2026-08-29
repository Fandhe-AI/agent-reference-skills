---
source: https://tanstack.com/router/latest/docs/api/router/notFoundFunction
---

# notFound

Returns a new `NotFoundError` object that can be returned or thrown from a route's `beforeLoad` or `loader` to trigger the `notFoundComponent`.

## Signature / Usage

```tsx
import { notFound, createFileRoute } from '@tanstack/react-router'

const Route = createFileRoute('/posts/$postId')({
  loader: ({ context: { post } }) => {
    if (!post) {
      throw notFound()
    }
  },
})
```

```ts
notFound(options?: Partial<NotFoundError>): NotFoundError
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `options` | `Partial<NotFoundError>` | Optional configuration, including `throw` and `routeId` |

## Notes

- If `throw: true`, the error is thrown immediately; otherwise it is returned.
- Passing `routeId` targets the not-found state at a specific level of the route hierarchy.

## Related

- [redirect](./redirect.md)
