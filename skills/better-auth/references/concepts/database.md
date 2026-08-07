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
| `accountId` | string | Account ID within the provider |
| `providerId` | string | Auth provider ID |
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
- **Experimental joins**: Execute multiple queries in a single request as a performance optimization (supported on 50+ endpoints)

### Other notes

- Programmatic migrations are supported only by the Kysely adapter (not Prisma/Drizzle)
- PostgreSQL automatically detects the schema path
- Throwing `APIError` in a database hook can abort the operation
- Additional configuration is required for client-side type inference of custom fields

## Related

- [CLI](./cli.md)
- [TypeScript](./typescript.md)
