# Nitro Integration

Mount the handler on a Nitro catch-all event handler and protect routes with an `onRequest` guard.

```ts
// server/utils/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "sqlite" }),
  emailAndPassword: { enabled: true },
});
```

```ts
// server/routes/api/auth/[...all].ts
export default defineEventHandler((event) => {
  return auth.handler(toWebRequest(event));
});
```

```ts
// server/utils/require-auth.ts — guard for protected routes
import { EventHandler, H3Event } from "h3";

export const requireAuth: EventHandler = async (event: H3Event) => {
  const session = await auth.api.getSession({ headers: event.headers });
  if (!session) throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  event.context.auth = session;
};
```

## Notes

- Regenerate the Prisma schema with `npx auth generate --config server/utils/auth.ts` after any auth config change, then `npx prisma db push`
- Enable CORS via a Nitro plugin (`server/plugins/cors.ts`) using `fromNodeMiddleware(cors({ origin: "..." }))`
- Attach `requireAuth` via `onRequest: [requireAuth]` in `defineEventHandler({ onRequest, handler })`
- Reference implementation: github.com/BayBreezy/nitrojs-better-auth-prisma
