# Installation

Step-by-step guide to install and configure Better Auth from package installation through client initialization.

## Signature / Usage

### 1. Install the package

```bash
npm install better-auth
```

### 2. Set environment variables

Create a `.env` file:

```env
BETTER_AUTH_SECRET=your-32-char-secret-here
BETTER_AUTH_URL=http://localhost:3000
```

Generate a secret: `openssl rand -base64 32`

### 3. Create the auth instance (server)

Create `auth.ts` at the project root, in `lib/`, or in `utils/`:

```typescript
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  database: db, // see database options below
  emailAndPassword: { enabled: true },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
});
```

### 4. Configure the database

```typescript
// SQLite
import Database from "better-sqlite3";
database: new Database("./sqlite.db")

// PostgreSQL
import { Pool } from "pg";
database: new Pool({ /* connection options */ })

// MySQL
import { createPool } from "mysql2/promise";
database: createPool({ /* connection options */ })

// Drizzle / Prisma adapters are also available
```

### 5. Run database migrations

```bash
npx auth@latest generate    # generate schema/migration files
npx auth@latest migrate     # apply migrations (Kysely only)
```

### 6. Mount the route handler

```typescript
// Next.js App Router
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
export const { GET, POST } = toNextJsHandler(auth);

// Express
app.all("/api/auth/*", toNodeHandler(auth));
app.use(express.json()); // mount after the auth handler
```

### 7. Create the client instance

```typescript
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
});
```

### Server-side (Node/Express)

```typescript
app.all("/api/auth/*", toNodeHandler(auth));
app.use(express.json());
```

### Client-side (React)

```typescript
const { signIn, signUp, useSession } = createAuthClient();
const { data: session } = useSession();
```

### TanStack Start

```typescript
import { tanstackStartCookies } from "better-auth/tanstack-start";
export const auth = betterAuth({
  plugins: [tanstackStartCookies()],
});
```

## Options / Props

`betterAuth()` configuration options:

| Name | Type | Description |
| --- | --- | --- |
| `database` | `Connection \| Adapter` | Database connection or ORM adapter |
| `emailAndPassword` | `{ enabled: boolean }` | Enables email/password authentication |
| `socialProviders` | `Object` | OAuth provider credentials, keyed by provider name |
| `baseURL` | `string` | Application URL used for auth callbacks |
| `secret` | `string` | Encryption key (overrides the environment variable) |
| `plugins` | `Plugin[]` | Array of auth plugins |

Types:

```typescript
type BetterAuthOptions = {
  database: DatabaseAdapter | Connection;
  emailAndPassword?: { enabled: boolean };
  socialProviders?: Record<string, { clientId: string; clientSecret: string }>;
  baseURL?: string;
  secret?: string;
  plugins?: Plugin[];
};

type Session = { user: User; session: SessionData };
type User = { id: string; name: string; email: string; image?: string };
```

## Notes

- On Express, mount the auth handler **before** `app.use(express.json())`
- Express v5+ uses the `/{*any}` route syntax instead of `*`
- Cloudflare Workers require the `nodejs_compat` flag (for `AsyncLocalStorage` support)
- A database is optional for stateless session management but required by most plugins
- Use `BETTER_AUTH_SECRETS` (plural, array) for key rotation without invalidating existing sessions
- The secret key should be "generated with high entropy" and at least 32 characters long
- Setting up client and server separately requires separate package installs

## Related

- [Basic Usage](./basic-usage.md)
