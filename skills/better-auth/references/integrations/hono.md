# Hono Integration

Integrates Better Auth with Hono: handler mounting, CORS, session middleware, and Hono RPC. Both Hono and Better Auth use the Web Standard `Request` and `Response` APIs, so Better Auth mounts directly in a Hono application without an adapter.

## Signature / Usage

### Setup

Create a Hono app if starting fresh (`npx create-hono@latest`, pick the template for your runtime). Mount the auth handler:

```typescript
import { Hono } from "hono";
import { auth } from "./auth";

const app = new Hono();

app.all("/api/auth/*", (c) => auth.handler(c.req.raw));

export default app;
```

`app.all()` forwards every HTTP method to Better Auth using the raw Web Standard `Request` from `c.req.raw`; Better Auth validates the method and returns a `Response` that Hono sends directly. Register the auth route before any catch-all route that could handle the request first. The Hono route must match your Better Auth `basePath` (default `/api/auth`). With `new Hono().basePath("/api")`, mount at `/auth/*`:

```typescript
const app = new Hono().basePath("/api");

app.all("/auth/*", (c) => auth.handler(c.req.raw));
```

#### Cloudflare Workers

Better Auth uses `AsyncLocalStorage`. Add the `nodejs_compat` compatibility flag to your Wrangler configuration (use `nodejs_als` if you only need AsyncLocalStorage):

```jsonc
{
  "compatibility_flags": ["nodejs_compat"],
}
```

### CORS

Register Hono's CORS middleware before the Better Auth route:

```typescript
import { cors } from "hono/cors";

app.use(
  "/api/auth/*",
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  }),
);

app.all("/api/auth/*", (c) => auth.handler(c.req.raw));
```

Add the same origin to Better Auth's `trustedOrigins`:

```typescript
export const auth = betterAuth({
  trustedOrigins: ["http://localhost:3001"],
});
```

When `credentials` is enabled, configure an explicit CORS origin instead of `*` and add the same origin to `trustedOrigins`. See cookies.md for cross-domain and cross-subdomain cookie behavior.

### Middleware

Make the current session available through Hono's context:

```typescript
import { createMiddleware } from "hono/factory";
import { auth } from "./auth";

type Env = {
  Variables: {
    session: typeof auth.$Infer.Session | null;
  };
};

export const sessionMiddleware = createMiddleware<Env>(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  c.set("session", session);
  await next();
});
```

Add it to any route that needs the session:

```typescript
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { sessionMiddleware } from "./session-middleware";

const app = new Hono();

app.get("/hello", sessionMiddleware, (c) => {
  const session = c.get("session");
  if (!session) {
    throw new HTTPException(401);
  }
  return c.json({ message: `Hello, ${session.user.name}.` });
});

export default app;
```

### Hono RPC

The Better Auth client uses `credentials: "include"` by default. For Hono RPC calls to authenticated routes from another origin, configure the RPC client to include credentials as well (only required for cross-origin requests):

```typescript
import { hc } from "hono/client";
import type { AppType } from "./server";

const client = hc<AppType>("http://localhost:8787", {
  init: {
    credentials: "include",
  },
});

const response = await client.hello.$get();
```

Server (`src/server.ts`) — chain the route so its type can be exported:

```typescript
import { Hono } from "hono";

// Assume this route requires an authenticated session.
const app = new Hono().get("/hello", (c) => {
  return c.json({ message: "Hello!" });
});

export type AppType = typeof app;
export default app;
```

This configuration is only required for cross-origin requests. For more information, see Hono's [RPC cookies guide](https://hono.dev/docs/guides/rpc#cookies).

## Notes

- Changed in the 1.7 docs: the page was restructured (Setup / CORS / Middleware / Hono RPC). The 1.6 "Cross-Domain Cookies" and "Client-Side Configuration" sections no longer appear; see cookies.md for cross-subdomain and cross-origin cookie settings (`crossSubDomainCookies`, `SameSite=None` + `Secure`).
- CORS middleware must be registered before the auth route.
- The CORS example above only covers `/api/auth/*`. For cross-origin Hono RPC calls with `credentials: "include"`, the RPC target routes (e.g. `/hello`) also need the `cors()` middleware with the same explicit `origin` and `credentials: true` (for example by registering it on a broader path such as `"*"`); otherwise the browser cannot read the response. This is not stated in the upstream page.

## Related

- [elysia](./elysia.md)
- [fastify](./fastify.md)
