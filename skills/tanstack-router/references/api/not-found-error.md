---
source: https://tanstack.com/router/latest/docs/api/router/NotFoundErrorType
---

# NotFoundError

Represents a not-found error in TanStack Router.

## Signature / Usage

```tsx
export type NotFoundError = {
  global?: boolean
  data?: any
  throw?: boolean
  routeId?: string
  headers?: HeadersInit
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `global` | `boolean` | Optional, default `false`. Deprecated, use `routeId: rootRouteId` instead. If true, the error is handled by the root route's `notFoundComponent` instead of bubbling up from the route that threw it. Same behavior as calling `RootRoute.notFound()` |
| `data` | `any` | Optional. Custom data passed into `notFoundComponent` when the error is handled |
| `throw` | `boolean` | Optional, default `false`. If provided, throws the not-found object instead of returning it. Useful where throwing would give a function a return type of `never`: use `notFound({ throw: true })` |
| `routeId` | `string` | Optional. ID of the route that will attempt to handle the error. If that route has no `notFoundComponent`, the error bubbles up to the parent route (and is handled by the root route if necessary). By default the route that threw it handles it |
| `headers` | `HeadersInit` | Optional. HTTP headers included when the error is handled on the server side |

## Related

- [notFound](./not-found.md)
- [NotFoundComponent](./not-found-component.md)
- [isNotFound](./is-not-found.md)
