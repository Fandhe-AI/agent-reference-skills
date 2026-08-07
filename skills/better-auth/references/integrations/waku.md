# Waku Integration

Integrates Better Auth with Waku: an auth instance, a catch-all API route, a React client, and session caching per request.

## Signature / Usage

```typescript
// src/pages/_api/api/auth/[...route].ts
import { auth } from "../../../../auth";

export const GET = (request: Request) => auth.handler(request);
export const POST = (request: Request) => auth.handler(request);
```

```typescript
// lib/auth-client.ts
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient();
```

## Notes

- Use `auth.api.getSession()` inside React Server Components or server actions to read the authenticated user
- RSCs that run after the response has started streaming cannot set cookies — Waku uses a custom cookie-setting plugin to work around this in server actions
- Middleware-only session validation is "NOT SECURE" — use optimistic cookie checks in middleware, then re-validate per page/route
- A helper caches the session promise in Waku's per-request context data to avoid redundant fetches

## Related

- [next](./next.md)
- [tanstack](./tanstack.md)
