# Database

Better Auth connects to a database to store users, sessions, accounts, and verification records. It supports multiple database adapters and can operate without a database using stateless session management.

## Signature / Usage

### Custom fields

```typescript
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  database: db,
  user: {
    additionalFields: {
      role: {
        type: ["user", "admin"],
        required: false,
        defaultValue: "user",
        input: false, // prevent users from setting their own role at sign-up
      },
    },
  },
});
```

### CLI tools

```bash
npx auth@latest migrate    # Apply migrations
npx auth@latest generate   # Generate schema
```

### Schema Validation

During initialization Better Auth compares the schema with the tables it writes and reports missing tables, missing columns, and required columns it never fills, with fixes. Errors appear through your configured logger without waiting for a request; requests await the same check and fail if the schema does not match (validation does not stop your server or build). Run `npx auth@latest check schema` to check explicitly. Validation is on by default, including production, and caches a clean result or mismatch per adapter instance; programmatic migrations invalidate cached checks. Kysely reads live database metadata; Drizzle checks the configured schema object and Prisma the generated client's data model without querying the database (they cannot detect unapplied migrations). Custom adapters without a registered check are not validated.

```typescript
export const auth = betterAuth({
  advanced: {
    database: {
      validateSchema: false, // disable runtime validation
    },
  },
});
```

`auth migrate` and `auth generate` keep their own schema diagnostics.

### Secondary storage

```typescript
interface SecondaryStorage {
  get: (key: string) => Promise<unknown>;
  getAndDelete: (key: string) => Promise<unknown>;
  increment: (key: string, ttl: number) => Promise<number>;
  set: (key: string, value: string, ttl?: number) => Promise<void>;
  delete: (key: string) => Promise<void>;
}
```

`increment(key, ttl)` bumps a counter by one and sets the expiry only when the key is first created; `getAndDelete(key)` reads and removes a key in one step. Both are required (changed in 1.7).

Official Redis storage (uses ioredis):

```bash
npm install @better-auth/redis-storage ioredis
```

```typescript
import { betterAuth } from "better-auth";
import { Redis } from "ioredis";
import { redisStorage } from "@better-auth/redis-storage";

const redis = new Redis(process.env.REDIS_URL!);
```

Custom implementation with node-redis (Redis 7+):

```typescript
import { betterAuth, type SecondaryStorage } from "better-auth";
import { createClient } from "redis";

const redis = createClient();
await redis.connect();

const redisSecondaryStorage: SecondaryStorage = {
  get(key) { return redis.get(key); },
  getAndDelete(key) { return redis.getDel(key); },
  async increment(key, ttl) {
    if (!Number.isInteger(ttl) || ttl <= 0) {
      throw new TypeError("Redis increment TTL must be a positive integer");
    }
    const [value] = await redis.multi().incr(key).expire(key, ttl, "NX").execTyped();
    return value;
  },
  async set(key, value, ttl) {
    if (ttl) await redis.set(key, value, { EX: ttl });
    else await redis.set(key, value);
  },
  async delete(key) { await redis.del(key); },
};
```

An Upstash Redis implementation follows the same shape (`Redis.fromEnv()`, `redis.getdel(key)`, and `redis.multi().incr(key).expire(key, ttl, "NX").exec()`). When implementing secondary storage directly, prefix its keys to avoid collisions with other applications sharing the same Redis database.

### Joins

```typescript
export const auth = betterAuth({
  advanced: {
    database: {
      joins: true,
    },
  },
});
```

Joins perform multiple queries in a single request (50+ endpoints). When disabled (the default), Better Auth falls back to multiple queries combined in code. Make sure your Drizzle or Prisma schema includes the necessary relationships (run `migrate` / `generate`), and read the Joins section of each adapter page.

## Options / Props

### Core schema tables

#### User table

| Field | Type | Description |
|-------|------|-------------|
| `id` | string (pk) | Unique identifier |
| `name` | string | User's name |
| `email` | string | Email address |
| `emailVerified` | boolean | Email verification status |
| `image` | string (optional) | Profile image URL |
| `createdAt` | timestamp | Creation timestamp |
| `updatedAt` | timestamp | Last update timestamp |

#### Session table

| Field | Type | Description |
|-------|------|-------------|
| `id` | string (pk) | Unique identifier |
| `userId` | string (fk) | Associated user ID |
| `token` | string | Session token |
| `expiresAt` | timestamp | Expiration time |
| `ipAddress` | string (optional) | Client IP address |
| `userAgent` | string (optional) | Browser/client info |
| `createdAt` | timestamp | Creation timestamp |
| `updatedAt` | timestamp | Last update timestamp |

#### Account table

| Field | Type | Description |
|-------|------|-------------|
| `id` | string (pk) | Unique identifier |
| `userId` | string (fk) | Associated user ID |
| `accountId` | string | The stable account identifier assigned by the provider (credential accounts use the `credential` provider ID and the linked user's `id`) |
| `providerId` | string | The provider configuration used to authenticate the account |
| `accessToken` | string (optional) | Access token |
| `refreshToken` | string (optional) | Refresh token |
| `scope` | string | Token scope |
| `idToken` | string (optional) | ID token |
| `password` | string (optional) | Hashed password |
| `createdAt` | timestamp | Creation timestamp |
| `updatedAt` | timestamp | Last update timestamp |

#### Verification table

| Field | Type | Description |
|-------|------|-------------|
| `id` | string (pk) | Unique identifier |
| `identifier` | string | Verification identifier |
| `value` | string | Verification value |
| `expiresAt` | timestamp | Expiration time |
| `createdAt` | timestamp | Creation timestamp |
| `updatedAt` | timestamp | Last update timestamp |

## Notes

### Supported databases/adapters

- SQLite / D1
- PostgreSQL
- MySQL
- MSSQL
- MongoDB
- Prisma ORM
- Drizzle ORM
- Kysely (built-in)

### Key features

- **Secondary storage**: Implement a key-value store like Redis for session data or short-lived records to reduce load on the primary database
- **Custom schema**: Customize table names, column names, and extend the user/session schema via `additionalFields`
- **ID generation options**: Three approaches — database-managed, custom function, or consistent generator (UUID or numeric serial)
- **Database hooks**: Implement validation or custom logic with before/after lifecycle hooks on user, session, and account operations
- **Joins**: Execute multiple queries in a single request as a performance optimization (supported on 50+ endpoints). Renamed in 1.7: "Experimental Joins" is now "Joins" and the option moved from `experimental: { joins: true }` to `advanced: { database: { joins: true } }`

### Other notes

- Programmatic migrations are supported only by the Kysely adapter (not Prisma/Drizzle)
- PostgreSQL automatically detects the schema path
- Throwing `APIError` in a database hook can abort the operation
- An account is one authentication method linked to a user: the provider-side identity is the pair `providerId` + `accountId`, while `id` identifies the local account row (use `id` when an account API asks for an `accountId`). Indexes on `session.userId`, `account.userId`, and `verification.identifier` were added to the docs schema.
- Before hooks can run more than once on MongoDB with transactions (the adapter retries when MongoDB aborts for a concurrent write); send emails and call other services from an after hook. After hooks in a transaction run after commit and are skipped on rollback; without adapter transactions they also run when a later step of the same request fails.
- Additional configuration is required for client-side type inference of custom fields
- The additional-field `role` example sets `input: false` so users cannot set their own role at sign-up (security) (Adapted from the official docs)

## Related

- [CLI](./cli.md)
- [TypeScript](./typescript.md)
