# Convex Integration

Run Better Auth as a Convex component so `auth.api` executes inside Convex functions instead of a Node server.

```ts
// convex/betterAuth/convex.config.ts
import { defineComponent } from "convex/server";
const component = defineComponent("betterAuth");
export default component;
```

```ts
// convex/betterAuth/auth.ts
import { createClient } from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import { betterAuth } from "better-auth";
import { components } from "../_generated/api";
import authConfig from "../auth.config";
import schema from "./schema";

export const authComponent = createClient(components.betterAuth, { local: { schema } });

export const createAuth = (ctx) =>
  betterAuth({
    baseURL: process.env.SITE_URL,
    secret: process.env.BETTER_AUTH_SECRET,
    database: authComponent.adapter(ctx),
    emailAndPassword: { enabled: true },
    plugins: [convex({ authConfig })],
  });
```

```ts
// convex/http.ts — register the auth routes on the Convex deployment
import { httpRouter } from "convex/server";
import { authComponent, createAuth } from "./betterAuth/auth";

const http = httpRouter();
authComponent.registerRoutes(http, createAuth);
export default http;
```

```ts
// lib/auth-client.ts
import { convexClient } from "@convex-dev/better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({ plugins: [convexClient()] });
```

## Notes

- `@convex-dev/better-auth` is maintained by Convex, not the Better Auth core team
- Auth-instance secrets (`BETTER_AUTH_SECRET`, OAuth client IDs/secrets) must be set through `npx convex env set`, not `.env.local` — the Better Auth instance runs on Convex, not the framework server
- Generate `convex/betterAuth/schema.ts` with `npx auth generate --config ./convex/betterAuth/auth.ts --output ./convex/betterAuth/schema.ts` and rerun after changing the auth config
- `auth.api` calls must happen inside Convex functions (`convex/*.ts`); call them from the client via `useQuery`/`useMutation` or from Next.js server code via the `@convex-dev/better-auth/nextjs` helpers (`fetchAuthQuery`, `isAuthenticated`, `getToken`)
