# Server Setup

Create and configure the auth instance with a database and mount the API handler.

```typescript
// lib/auth.ts
import { betterAuth } from "better-auth";
import Database from "better-sqlite3";

export const auth = betterAuth({
  database: new Database("./sqlite.db"),
  emailAndPassword: {
    enabled: true,
  },
});
```

```typescript
// app/api/auth/[...all]/route.ts  (Next.js App Router)
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { POST, GET } = toNextJsHandler(auth);
```

Run the CLI to generate and apply the database schema:

```bash
npx auth@latest generate
npx auth@latest migrate
```

## Notes

- `BETTER_AUTH_SECRET` (min 32 chars) and `BETTER_AUTH_URL` must be set in `.env`
- Database adapters for Prisma, Drizzle, MongoDB, PostgreSQL, MySQL are also supported
- The catch-all route `[...all]` is required; better-auth handles routing internally
- For other frameworks (Hono, Express, Astro, SvelteKit), use the corresponding handler adapter
