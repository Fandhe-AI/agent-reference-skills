---
source: https://react.dev/reference/rsc/directives
---

# Directives

Directives provide instructions to bundlers compatible with React Server Components.

## Signature / Usage

```js
'use client';   // marks code that runs on the client
```

```js
async function addToCart(data) {
  'use server'; // marks a server-side function callable from client code
  // ...
}
```

- `'use client'` lets you mark what code runs on the client.
- `'use server'` marks server-side functions that can be called from client-side code.

## Notes

- Directives are for use in React Server Components.
- There is no directive for Server Components themselves; `'use server'` is for Server Functions.
- Scope: React's own directives. Next.js-specific directives such as `use cache` belong to nextjs-app; see also tanstack-start and react-router for framework integration.

## Related

- [use client](./use-client.md)
- [use server](./use-server.md)
- [Server Components](./server-components.md)
