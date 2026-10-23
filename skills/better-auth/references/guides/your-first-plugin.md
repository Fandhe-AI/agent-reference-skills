# Your First Plugin

Better Auth プラグインの作成チュートリアル。「birthday plugin」を例に、ユーザーの誕生日を追跡し年齢検証を行うプラグインの開発手順を解説する。This guide walks you through building a Better Auth plugin from conception through implementation. The example creates a "birthday plugin" that will:
- Store user birth dates in the database
- Verify users are at least 5 years old during signup
- Provide frontend APIs for birthday management

## Signature / Usage

### Phase 1: Planning Your Plugin

Before coding, define your plugin's purpose. Define what data it stores, what validation it performs, and what APIs it exposes.

### Phase 2: Server Plugin Development

#### Initial Setup

Create a `birthday-plugin` folder with an `index.ts` file. Start with a basic plugin structure:

```typescript
import { createAuthClient } from "better-auth/client";
import type { BetterAuthPlugin } from "better-auth";

export const birthdayPlugin = () =>
  ({
    id: "birthdayPlugin",
  } satisfies BetterAuthPlugin);
```

This minimal implementation establishes your first plugin.

#### Schema Definition

Extend the user model by adding a birthday field. This allows Better Auth's CLI to generate necessary database migrations:

```typescript
export const birthdayPlugin = () =>
  ({
    id: "birthdayPlugin",
    schema: {
      user: {
        fields: {
          birthday: {
            type: "date",
            required: true,
            unique: false,
          },
        },
      },
    },
  } satisfies BetterAuthPlugin);
```

See `## Options / Props` for the available field options.

#### Authorization Logic

Implement hooks to intercept signup requests and validate age requirements. Use the "before" hook to run checks prior to signup completion:

```typescript
import { createAuthMiddleware, APIError } from "better-auth/api";

export const birthdayPlugin = () => ({
    id: "birthdayPlugin",
    schema: { /* ... */ },
    hooks: {
      before: [
        {
          matcher: (context) => context.path.startsWith("/sign-up/email"),
          handler: createAuthMiddleware(async (ctx) => {
            // JSON request bodies carry dates as strings (or numbers), never Date instances.
            // Restrict the type first: `new Date(false)` / `new Date([])` would otherwise coerce silently.
            const raw = ctx.body?.birthday;
            const isIsoDate = typeof raw === "string" && /^\d{4}-\d{2}-\d{2}$/.test(raw);
            const birthday = isIsoDate ? new Date(`${raw}T00:00:00Z`) : null;
            // `new Date("2020-02-30")` rolls over to March 1, so also require a round trip
            if (
              !birthday ||
              Number.isNaN(birthday.getTime()) ||
              birthday.toISOString().slice(0, 10) !== raw
            ) {
              throw new APIError("BAD_REQUEST", {
                message: "Birthday must be a valid ISO date string (YYYY-MM-DD)."
              });
            }

            const today = new Date();
            const fiveYearsAgo = new Date(
              today.setFullYear(today.getFullYear() - 5)
            );

            if (birthday >= fiveYearsAgo) {
              throw new APIError("BAD_REQUEST", {
                message: "User must be above 5 years old."
              });
            }

            return { context: ctx };
          }),
        },
      ],
    },
} satisfies BetterAuthPlugin)
```

This validates the birthday field and rejects underage signups.

### Phase 3: Client Plugin Development

Create a `client.ts` file in the same directory. The client plugin infers types from the server plugin:

```typescript
import type { BetterAuthClientPlugin } from "better-auth/client";
import type { birthdayPlugin } from "./index";

type BirthdayPlugin = typeof birthdayPlugin;

export const birthdayClientPlugin = () => {
  return {
    id: "birthdayPlugin",
    $InferServerPlugin: {} as ReturnType<BirthdayPlugin>,
  } satisfies BetterAuthClientPlugin;
};
```

This enables type-safe frontend interactions with your plugin's schema.

### Phase 4: Plugin Integration

#### Server Configuration

Add the plugin to your `auth.ts` server configuration:

```typescript
import { betterAuth } from "better-auth";
import { birthdayPlugin } from "./birthday-plugin";

export const auth = betterAuth({
    plugins: [
      birthdayPlugin(),
    ]
});
```

#### Client Configuration

Enable the plugin in your `auth-client.ts`:

```typescript
import { createAuthClient } from "better-auth/client";
import { birthdayClientPlugin } from "./birthday-plugin/client";

const authClient = createAuthClient({
    plugins: [
      birthdayClientPlugin()
    ]
});
```

#### Database Updates

Add the birthday field to your user table model, or use the CLI:

```bash
npx auth@latest generate
```

This command automatically generates database migrations for plugin schemas.

### Key Concepts

**Hooks**: Execute custom logic before or after authentication events. The "before" hook intercepts requests, while "after" hooks process completed actions.

**Schema**: Defines custom database fields. The framework uses this to generate migrations and maintain type safety.

**Matcher Functions**: Determine which endpoints trigger hook handlers using path patterns.

**APIError**: Provides standardized error responses with HTTP status codes and custom messages.

## Options / Props

**Schema field options:**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `"string"` \| `"number"` \| `"boolean"` \| `"date"` | — | Field data type |
| `required` | boolean | `false` | Mandatory on new records |
| `unique` | boolean | `false` | Enforces uniqueness |

## Notes

- Publishing a reusable plugin? Register its server type (augment `BetterAuthPluginRegistry` from `@better-auth/core`) so `getPlugin()` can infer its exact return type; see concepts/plugins.md "Register a plugin type".
- After creation, share your plugin with the community through the Better Auth Discord server or GitHub pull requests
- The framework maintains a community plugins registry for discoverable extensions
- For advanced patterns, consult the comprehensive plugins documentation covering endpoints, middleware, rate limiting, and client-side atoms
- The birthday hook validates `ctx.body.birthday` as an exact `YYYY-MM-DD` string and converts it to `Date`, rejecting other types, invalid dates, and non-existent dates such as `2020-02-30`; JSON bodies never contain `Date` instances, so the official `instanceof Date` check would reject every request (Adapted from the official docs)
