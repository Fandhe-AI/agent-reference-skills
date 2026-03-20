# Your First Plugin

Better Auth プラグインの作成チュートリアル。「birthday plugin」を例に、ユーザーの誕生日を追跡し年齢検証を行うプラグインの開発手順を解説します。

## 概要

This guide walks you through building a Better Auth plugin from conception through implementation. The example creates a "birthday plugin" that will:
- Store user birth dates in the database
- Verify users are at least 5 years old during signup
- Provide frontend APIs for birthday management

## 手順

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

Field options include:
- **type**: "string", "number", "boolean", or "date"
- **required**: Mandatory on new records (default: false)
- **unique**: Enforces uniqueness (default: false)

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
            const { birthday } = ctx.body;
            if (!(birthday instanceof Date)) {
              throw new APIError("BAD_REQUEST", {
                message: "Birthday must be of type Date."
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

## Key Concepts

**Hooks**: Execute custom logic before or after authentication events. The "before" hook intercepts requests, while "after" hooks process completed actions.

**Schema**: Defines custom database fields. The framework uses this to generate migrations and maintain type safety.

**Matcher Functions**: Determine which endpoints trigger hook handlers using path patterns.

**APIError**: Provides standardized error responses with HTTP status codes and custom messages.

## 注意点

- After creation, share your plugin with the community through the Better Auth Discord server or GitHub pull requests
- The framework maintains a community plugins registry for discoverable extensions
- For advanced patterns, consult the comprehensive plugins documentation covering endpoints, middleware, rate limiting, and client-side atoms
