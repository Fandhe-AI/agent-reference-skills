---
source: https://tanstack.com/router/latest/docs/api/router/RedirectType
---

# Redirect (type)

Represents a redirect action in TanStack Router. Extends `NavigateOptions`.

## Signature / Usage

```tsx
export type Redirect = {
  statusCode?: number
  throw?: any
  headers?: HeadersInit
} & NavigateOptions
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `statusCode` | `number` | Optional. HTTP status code to use when redirecting |
| `throw` | `any` | Optional. If provided, throws the redirect object instead of returning it. Useful where throwing would give a function a return type of `never`: use `redirect({ throw: true })` |
| `headers` | `HeadersInit` | Optional. HTTP headers to use when redirecting |
| `to` | (from `NavigateOptions`) | Use for internal application routes (e.g. `/dashboard`, `../profile`) |
| `href` | (from `NavigateOptions`) | Use for external URLs (e.g. `https://example.com`, `https://authprovider.com`) |

## Notes

- For external URLs, always use the `href` property instead of `to`. The `to` property is designed for internal navigation within your application.

## Related

- [redirect](./redirect.md)
- [NavigateOptions](./navigate-options.md)
- [isRedirect](./is-redirect.md)
