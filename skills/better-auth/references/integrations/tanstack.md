# TanStack Start Integration

Integrates Better Auth with TanStack Start: API route handler, a cookie plugin, and three resource-protection strategies.

## Signature / Usage

```typescript
// src/routes/api/auth/$.ts
import { auth } from "~/lib/auth";
import { createAPIFileRoute } from "@tanstack/start/api";

export const Route = createAPIFileRoute("/api/auth/$")({
    GET: ({ request }) => auth.handler(request),
    POST: ({ request }) => auth.handler(request),
});
```

```typescript
import { betterAuth } from "better-auth";
import { tanstackStartCookies } from "better-auth/tanstack-start";

export const auth = betterAuth({
    // ...your config
    plugins: [tanstackStartCookies()] // must be the last plugin in the array
});
```

## Notes

- Three protection strategies: `beforeLoad` with a server function to verify sessions before rendering a route; a pathless `_protected` layout route to protect multiple child routes at once; or calling `ensureSession()` inside a server function before sensitive operations
- Quick start: `npm create @tanstack/start` and select the Better Auth add-on to scaffold a pre-configured project

## Related

- [react-router](./react-router.md)
- [next](./next.md)
