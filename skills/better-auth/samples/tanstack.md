# TanStack Start Integration

Mount the handler on a TanStack server route and guard routes with `beforeLoad` + a server function.

```ts
// src/routes/api/auth/$.ts
import { auth } from "@/lib/auth";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      GET: ({ request }) => auth.handler(request),
      POST: ({ request }) => auth.handler(request),
    },
  },
});
```

```ts
// src/lib/auth.functions.ts
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { auth } from "@/lib/auth";

export const getSession = createServerFn({ method: "GET" }).handler(async () => {
  return auth.api.getSession({ headers: getRequestHeaders() });
});
```

```tsx
// src/routes/dashboard.tsx
import { createFileRoute, redirect } from "@tanstack/react-router";
import { getSession } from "@/lib/auth.functions";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: async () => {
    const session = await getSession();
    if (!session) throw redirect({ to: "/login" });
    return { user: session.user };
  },
});
```

## Notes

- `npm create @tanstack/start` scaffolds a project with Better Auth already wired in via its add-on prompt
- Add `tanstackStartCookies()` (React) or `tanstackStartCookies` from `better-auth/tanstack-start/solid` (Solid) as the last plugin so `auth.api.signInEmail`/`signUpEmail` set cookies correctly
- `beforeLoad` re-runs on every navigation including client-side `<Link>`, unlike a one-time server check
- Prefer the `authClient` SDK for sign-in/sign-up flows; use `auth.api` mainly inside server functions
