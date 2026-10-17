# Nitro Integration

Mount the handler on a Nitro catch-all route, configure CORS via `routeRules`, and protect routes with a guard.

```ts
// server/utils/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default betterAuth({
  database: prismaAdapter(prisma, { provider: "sqlite" }),
  emailAndPassword: { enabled: true },
});
```

```ts
// server/api/auth/[...all].ts
import auth from "~/server/utils/auth";

export default auth;
```

```ts
// nitro.config.ts
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

```ts
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

  event.context.auth = session;
});
```

```ts
// server/api/secret.get.ts
import { defineHandler } from "nitro";
import requireAuth from "~/server/utils/require-auth.ts";

export default defineHandler({
  middleware: [requireAuth],
  handler: () =>
    Response.json(
      { message: "Secret data" },
      { status: 201, statusText: "Secret data" },
    ),
});
```

## Notes

- The upstream example uses `new PrismaClient()` without a driver adapter, which matches Prisma 6 and earlier; Prisma 7 requires a driver adapter (and a generated client output path), so follow the Prisma 7 setup in `references/adapters/prisma.md`
- Regenerate the Prisma schema with `npx auth generate --config server/utils/auth.ts` after any auth config change, then `npx prisma db push`
- With cookie-based sessions, set `credentials: true` and list exact origins; a wildcard origin (`cors: true`) cannot be combined with credentials
- Bearer-token-only setups do not need `credentials`
- Reference implementation: github.com/BayBreezy/nitrojs-better-auth-prisma
