# Hono Integration

Mount the handler on a Hono catch-all route and stash `user`/`session` in context via middleware.

```ts
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { auth } from "./auth";

const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>();

app.use("*", async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  c.set("user", session?.user ?? null);
  c.set("session", session?.session ?? null);
  await next();
});

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

serve(app);
```

## Notes

- Register the `hono/cors` middleware before the auth route, with `credentials: true`, when the frontend is on a different origin
- Cookies default to `SameSite=Lax`; for cross-domain use `advanced.crossSubDomainCookies` (preferred) or `advanced.defaultCookieAttributes: { sameSite: "none", secure: true }`
- When calling from a `hono/client` typed client, pass `init: { credentials: "include" }` so cookies are sent cross-origin
