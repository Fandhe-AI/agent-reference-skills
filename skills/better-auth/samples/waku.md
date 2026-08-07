# Waku Integration

Mount the handler on a Waku catch-all API route and read sessions via `waku/server` request headers in RSCs and server actions.

```ts
// src/auth.ts
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  database: { provider: "postgres", url: process.env.DATABASE_URL },
});
```

```ts
// src/pages/_api/api/auth/[...route].ts
import { auth } from "../../../../auth";

export const GET = (request: Request) => auth.handler(request);
export const POST = (request: Request) => auth.handler(request);
```

```tsx
// src/pages/dashboard.tsx
import { auth } from "../auth";
import { unstable_getHeaders as getHeaders } from "waku/server";
import { unstable_redirect as redirect } from "waku/router/server";

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: getHeaders() });
  if (!session) redirect("/sign-in");
  return <h1>Welcome {session.user.name}</h1>;
}
```

## Notes

- Waku currently only supports file-level `"use server"`, so server actions live in dedicated `server.ts` files
- Cookie-setting endpoints (`signInEmail`, etc.) need a custom `wakuCookies()` plugin paired with middleware that reads `contextData.betterAuthSetCookie` — Waku has no built-in cookie plugin like Next.js's `nextCookies`
- Middleware should only check `getSessionCookie`/`getCookieCache` existence for optimistic redirects, not full validation
- Client setup uses `createAuthClient` from `better-auth/react` (see `samples/client-setup.md`)
