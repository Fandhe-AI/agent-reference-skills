# TypeScript

Better Auth is designed as a type-safe auth library, with both the client and server built in TypeScript. Enabling strict mode and using the `$Infer` property for type inference is recommended.

## Signature / Usage

### Strict mode (recommended)

Enable TypeScript's strict mode in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

If strict mode cannot be enabled, set at minimum:

```json
{
  "compilerOptions": {
    "strictNullChecks": true
  }
}
```

**Important:** when `strict` is `true`, `strictNullChecks` is automatically enabled. Explicitly setting `strictNullChecks` to `false` can cause type inference issues.

### Type inference with `$Infer`

Both the client and server implementations expose a `$Infer` property for extracting types from the auth config.

Server-side type inference:

```typescript
import { betterAuth } from "better-auth";
import Database from "better-sqlite3";

export const auth = betterAuth({
  database: new Database("database.db"),
});

type Session = typeof auth.$Infer.Session;
```

The `Session` type includes both `session` and `user` properties, where `user` represents the user object type.

Client-side type inference:

```typescript
import { createAuthClient } from "better-auth/client";

const authClient = createAuthClient();

export type Session = typeof authClient.$Infer.Session;
```

### Defining additional fields

```typescript
export const auth = betterAuth({
  database: new Database("database.db"),
  user: {
    additionalFields: {
      role: {
        type: "string",
        input: false,
      },
    },
  },
});
```

Additional fields automatically appear in the inferred `Session` type.

### Client-side additional field inference

In monorepo/single-project setups, use the `inferAdditionalFields` plugin along with the type import:

```typescript
import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/client";
import type { auth } from "@/lib/auth";

export const authClient = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>()],
});
```

In client-server-separated projects, specify additional fields manually:

```typescript
import { createAuthClient } from "better-auth/client";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [
    inferAdditionalFields({
      user: {
        role: {
          type: "string",
        },
      },
    }),
  ],
});
```

## Options / Props

### `input` property

The `input` property controls whether a field can be set during user actions such as registration.

| Value | Description |
|-------|-------------|
| `input: true` (default) | Field is included in user input for the action |
| `input: false` | Field is excluded from user input |

## Notes

- Strict mode prevents type inference issues and is essential for Better Auth development
- The `$Infer` property provides type-safe access to session and user types
- Security-critical additional field properties require explicitly setting `input: false`
- Client-side field inference depends on project architecture (monorepo vs separated projects)
- If TypeScript inference hits the maximum serialization length, make sure `declaration` and `composite` options are **not both** enabled

### Security

- **Security note:** it's important to set `input: false` for fields users shouldn't be able to set, such as `role`, to prevent security vulnerabilities

## Related

- [Database](./database.md)
