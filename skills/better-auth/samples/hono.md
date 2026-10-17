# Hono Integration

Mount the handler on a Hono catch-all route, add CORS, and expose the session through middleware.

```ts
// src/index.ts
import { Hono } from "hono";
import { cors } from "hono/cors";
import { auth } from "./auth";

const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>();

app.use(
  "/api/auth/*",
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  }),
);

app.use("*", async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  c.set("user", session?.user ?? null);
  c.set("session", session?.session ?? null);
  await next();
});

app.all("/api/auth/*", (c) => auth.handler(c.req.raw));

export default app;
```

```ts
// auth.ts — add the same origin to trustedOrigins
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  trustedOrigins: ["http://localhost:3001"],
});
```

```ts
// Hono RPC client calling authenticated routes from another origin
import { hc } from "hono/client";
import type { AppType } from "./server";

const client = hc<AppType>("http://localhost:8787", {
  init: {
    credentials: "include",
  },
});
```

```jsonc
// wrangler.jsonc — Cloudflare Workers only
{
  // Use "nodejs_als" instead if you only need AsyncLocalStorage.
  "compatibility_flags": ["nodejs_compat"],
}
```

## Notes

- The Hono route must match Better Auth's `basePath` (default `/api/auth`); with `new Hono().basePath("/api")` mount at `/auth/*`
- Register the auth route before any catch-all route; with `credentials: true`, use an explicit CORS origin (not `*`) and add it to `trustedOrigins`
- The `app.use("*", ...)` middleware sets `user` and `session` so every route can read them with `c.get("user")` / `c.get("session")`
- Cloudflare Workers: Better Auth uses `AsyncLocalStorage`, so enable the `nodejs_compat` (or `nodejs_als`) compatibility flag
- The Better Auth client uses `credentials: "include"` by default; Hono RPC clients need `init: { credentials: "include" }` only for cross-origin requests
