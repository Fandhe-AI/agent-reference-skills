# Hono Integration

Mount the handler on a Hono catch-all route, add CORS, and expose the session through middleware.

```ts
// src/session-middleware.ts
import { createMiddleware } from "hono/factory";
import { auth } from "./auth";

export type Env = {
  Variables: {
    session: typeof auth.$Infer.Session | null;
  };
};

export const sessionMiddleware = createMiddleware<Env>(async (c, next) => {
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  c.set("session", session);

  await next();
});
```

```ts
// src/index.ts
import { Hono } from "hono";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";
import { auth } from "./auth";
import { sessionMiddleware, type Env } from "./session-middleware";

const app = new Hono<Env>();

// Covers both the auth routes and the RPC-target routes (e.g. /hello)
app.use(
  "*",
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  }),
);

app.all("/api/auth/*", (c) => auth.handler(c.req.raw));

app.get("/hello", sessionMiddleware, (c) => {
  const session = c.get("session");

  if (!session) {
    throw new HTTPException(401);
  }

  return c.json({ message: `Hello, ${session.user.name}.` });
});

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
- Register CORS before the auth route; with `credentials: true`, use an explicit CORS origin (not `*`) and add it to `trustedOrigins`
- RPC-target routes (e.g. `/hello`) also need the same explicit origin and `credentials: true` CORS; the official page does not state this (Adapted: `cors()` registered on `"*"` instead of `"/api/auth/*"`)
- `sessionMiddleware` sets `session` to `{ user, session }` or `null`; read it with `c.get("session")` and access `session.user` (Adapted: official middleware and route examples combined into one app)
- Cloudflare Workers: Better Auth uses `AsyncLocalStorage`, so enable the `nodejs_compat` (or `nodejs_als`) compatibility flag
- The Better Auth client uses `credentials: "include"` by default; Hono RPC clients need `init: { credentials: "include" }` only for cross-origin requests
