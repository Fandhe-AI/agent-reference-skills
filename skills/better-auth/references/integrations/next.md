# Next.js Integration

Integrates Better Auth with Next.js: App Router / Pages Router handlers, server actions, RSC session access, and route protection.

## Signature / Usage

```typescript
// app/api/auth/[...all]/route.ts (App Router)
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);
```

```typescript
// pages/api/auth/[...all].ts (Pages Router)
import { toNodeHandler } from "better-auth/node"
import { auth } from "@/lib/auth"

export const config = { api: { bodyParser: false } }

export default toNodeHandler(auth.handler)
```

```typescript
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

const session = await auth.api.getSession({
    headers: await headers()
});
```

Server action using `nextCookies()`:

```typescript
"use server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth"

export const signOut = async () => {
    await auth.api.signOut({
        headers: await headers()
    })
}
```

## Notes

- Client is created with `createAuthClient` from `better-auth/react`
- RSCs cannot set cookies, so the cookie cache is not refreshed until the client interacts via Server Actions or Route Handlers. Use the `nextCookies()` plugin (must be last in the `plugins` array) to auto-manage `Set-Cookie` in server actions
- Server actions need Next.js's `cookies` helper to set cookies, so a function that sets cookies, like `signOut`, will not set them unless `nextCookies()` is installed
- Source: https://www.better-auth.com/docs/integrations/next (better-auth v1.7.23 docs)
- Route protection differs by version: Next.js 16+ uses the "proxy" system for full DB-backed session validation; Next.js 15.2.0+ can enable Node.js runtime in middleware for the same; Next.js 13-15.1.x should rely on `getSessionCookie` for optimistic cookie-only checks
- Cookie-only validation "is not secure" — always re-validate sessions at the individual page/route level, not solely in middleware

## Related

- [nuxt](./nuxt.md)
- [tanstack](./tanstack.md)
