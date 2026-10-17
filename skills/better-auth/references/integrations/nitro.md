# Nitro Integration

Integrates Better Auth with a Nitro application (the open-source framework for building web servers) via a catch-all route.

## Signature / Usage

Scaffold a Nitro app if starting fresh:

```bash
npx create-nitro-app
```

Create the Better Auth instance in `server/utils/auth.ts` (follow steps 1 and 2 of the installation guide first; the example uses the Prisma adapter with SQLite for development only, which will not work in production, so use a production-ready database such as PostgreSQL):

```typescript
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default betterAuth({
  database: prismaAdapter(prisma, { provider: "sqlite" }),
  emailAndPassword: { enabled: true },
});
```

Update the Prisma schema with the CLI (`--config` points at the file containing your Better Auth instance), then `npx prisma db push`:

```bash
npx auth generate --config server/utils/auth.ts
```

### Mount the handler

`server/api/auth/[...all].ts` is a catch-all route handling all requests to `/api/auth/*`:

```typescript
import auth from "~/server/utils/auth";

export default auth;
```

### CORS

Configure CORS through a Nitro route rule in `nitro.config.ts`:

```typescript
import { defineConfig } from "nitro";

export default defineConfig({
  routeRules: {
    "/api/auth/**": {
      cors: {
        origin: ["http://localhost:3000"],
        credentials: true,
      },
    },
  },
});
```

With cookie-based sessions, set `credentials: true` and list your frontend's exact origin(s); a wildcard origin (`cors: true`) cannot be combined with credentials. With only bearer tokens, `credentials` is not required. Keep the config in sync with your frontend.

### Auth guard / middleware

```typescript
// server/utils/require-auth.ts
import { defineHandler, HTTPError } from "nitro";
import auth from "~/server/utils/auth.ts";

export default defineHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.req.headers,
  });

  if (!session) {
    throw HTTPError.status(401, "Unauthorized");
  }

  // You can save the session to the event context for later use
  event.context.auth = session;
});
```

Apply it to specific routes with the object syntax event handler:

```typescript
// server/api/secret.get.ts
import { defineHandler } from "nitro";
import requireAuth from "~/server/utils/require-auth.ts";

export default defineHandler({
  middleware: [requireAuth],
  handler: () => Response.json({ message: "Secret data" }, { status: 201, statusText: "Secret data" }),
});
```

## Notes

- Changed in the 1.7 docs: the handler is `server/api/auth/[...all].ts` with `export default auth` (the 1.6 page used `defineEventHandler` with `toWebRequest(event)` in `server/routes/api/auth/[...all].ts`); CORS is configured in `nitro.config.ts` `routeRules` (import `defineConfig` from `"nitro"`) instead of a dedicated Nitro plugin; scaffolding uses `npx create-nitro-app`.
- The upstream example uses `new PrismaClient()` without a driver adapter, which matches Prisma 6 and earlier; Prisma 7 requires a driver adapter (and a generated client output path), so follow the Prisma 7 setup in adapters/prisma.md.
- Example project: BayBreezy/nitrojs-better-auth-prisma.

## Related

- [hono](./hono.md)
- [encore](./encore.md)
