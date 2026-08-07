# Elysia Integration

Mount the Better Auth handler on Elysia (Bun server) and expose `user`/`session` via `macro` + `resolve`.

```ts
import { Elysia } from "elysia";
import { auth } from "./auth";

const betterAuth = new Elysia({ name: "better-auth" })
  .mount(auth.handler)
  .macro({
    auth: {
      async resolve({ status, request: { headers } }) {
        const session = await auth.api.getSession({ headers });
        if (!session) return status(401);
        return { user: session.user, session: session.session };
      },
    },
  });

const app = new Elysia()
  .use(betterAuth)
  .get("/user", ({ user }) => user, { auth: true })
  .listen(3000);
```

## Notes

- Configure CORS with `@elysiajs/cors` before `.mount(auth.handler)`; set `credentials: true` to allow cookies
- The `auth: true` macro guard rejects unauthenticated requests with 401 before the handler body runs
- This guide assumes Elysia running on the Bun server
