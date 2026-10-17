# Infrastructure Getting Started

Install `@better-auth/infra`, set `BETTER_AUTH_API_KEY`, and add the `dash()` / `sentinel()` server plugins and their client counterparts.

## Signature / Usage

Prerequisites: a working Better Auth installation, and an account and API key from the Better Auth Infrastructure dashboard.

```dotenv
# Required: Your Better Auth Infrastructure API key
BETTER_AUTH_API_KEY=your_api_key_here
```

Server:

```ts
import { betterAuth } from "better-auth";
import { dash } from "@better-auth/infra";

export const auth = betterAuth({
  // ... your existing Better Auth config
  plugins: [
    dash({
      apiKey: process.env.BETTER_AUTH_API_KEY,
    }),
  ],
});
```

With `sentinel()` (pro plan or above):

```ts
import { betterAuth } from "better-auth";
import { dash, sentinel } from "@better-auth/infra";

export const auth = betterAuth({
  plugins: [
    dash({
      apiKey: process.env.BETTER_AUTH_API_KEY,
    }),
    sentinel({
      apiKey: process.env.BETTER_AUTH_API_KEY,
    })
  ],
});
```

Client:

```ts
import { createAuthClient } from "better-auth/client";
import { dashClient, sentinelClient } from "@better-auth/infra/client";

export const authClient = createAuthClient({
  plugins: [
    dashClient(),
    sentinelClient({
      autoSolveChallenge: true, // Automatically solve PoW challenges
    }),
  ],
});
```

Expo / React Native (import from `@better-auth/infra/native`):

```ts
import { createAuthClient } from "better-auth/client";
import { dashClient, sentinelNativeClient } from "@better-auth/infra/native";

export const authClient = createAuthClient({
  baseURL: "https://your-api.example.com",
  plugins: [
    dashClient(),
    sentinelNativeClient({
      autoSolveChallenge: true,
    }),
  ],
});
```

## Notes

- Add `BETTER_AUTH_API_KEY` to your production environment variables. The key is obtained by signing up and creating a project in the Better Auth Infrastructure dashboard.
- `dash()` enables analytics tracking, audit logging, dashboard admin APIs, and more. `sentinel()` enables security checks and abuse protection. Either can be used independently; using both gives the full experience.
- The native entry provides `dashClient` (same audit log APIs as the web client) and `sentinelNativeClient`.
- Source: https://www.better-auth.com/docs/infrastructure/getting-started (better-auth v1.7.10 docs)

## Related

- [Introduction](./introduction.md)
- [Dashboard Plugin (dash)](./dashboard.md)
- [Audit Logs](./audit-logs.md)
- [Sentinel](./sentinel.md)
- [Email Service](./email-service.md)
- [SMS Service](./sms-service.md)
