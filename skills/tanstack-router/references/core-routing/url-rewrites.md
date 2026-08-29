---
source: https://tanstack.com/router/latest/docs/framework/react/guide/url-rewrites
---

# URL Rewrites

Bidirectional transformation between the URL the browser displays and the URL the router interprets internally, without duplicating routes.

## Signature / Usage

```tsx
const router = createRouter({
  routeTree,
  rewrite: {
    input: ({ url }) => {
      // Transform browser URL -> internal URL
      return url
    },
    output: ({ url }) => {
      // Transform internal URL -> browser URL
      return url
    },
  },
})
```

```tsx
import { composeRewrites } from '@tanstack/react-router'

const router = createRouter({
  routeTree,
  rewrite: composeRewrites([localeRewrite, legacyRewrite]),
})
```

## Options / Props

| Field | Type | Description |
|-------|------|--------------|
| `rewrite.input` | `({ url }) => URL \| string \| void` | Runs before router processing; transforms the browser URL into the internal URL. May mutate the URL, return a new URL/href string, or return `undefined` to skip |
| `rewrite.output` | `({ url }) => URL \| string \| void` | Runs before display; transforms the internal URL into the URL shown in the browser |
| `location.href` | — | The internal URL, after input rewrite |
| `location.publicHref` | — | The external/browser URL, after output rewrite |

## Notes

- Use cases: locale prefixes (`/en/about` → `/about` internally, restored on output), subdomain routing (`admin.example.com/users` → `/admin/users`), legacy URL migration, multi-tenant path injection, custom URL schemes.
- `composeRewrites` runs input rewrites in order and output rewrites in reverse order, ensuring proper unwrapping.
- `basepath` acts as an automatic rewrite composed with any custom rewrite: it strips first on input (before your rewrite runs), and is added last on output (after your rewrite runs).
- `Link` automatically applies output rewrites to generated `href` attributes.
- If an output rewrite changes the hostname, links render as plain anchor tags and trigger a full page load instead of client-side navigation.
- On server environments (e.g. TanStack Start), the same rewrite configuration applies during request parsing and response generation, keeping server/client URLs consistent.

## Related

- [Routing Concepts](./routing-concepts.md)
