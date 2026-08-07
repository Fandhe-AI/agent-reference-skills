# Elysia Integration

Integrates Better Auth with Elysia, a web framework running on Bun.

## Signature / Usage

```typescript
import { Elysia } from "elysia";
import { auth } from "./auth";

const app = new Elysia().mount(auth.handler).listen(3000);
```

```typescript
// CORS via @elysiajs/cors
.use(cors({
  origin: "http://localhost:3001",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
}))
```

```typescript
// macro pattern for session/user in routes
.macro({
  auth: {
    async resolve({ status, request: { headers } }) {
      const session = await auth.api.getSession({ headers });
      if (!session) return status(401);
      return { user: session.user, session: session.session };
    },
  },
})
```

## Notes

- Requires Bun as the server runtime
- CORS `credentials` must be enabled for authentication cookies
- Unauthenticated requests return 401 via the macro

## Related

- [hono](./hono.md)
- [fastify](./fastify.md)
