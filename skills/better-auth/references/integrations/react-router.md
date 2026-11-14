# React Router Integration

Integrates Better Auth with React Router v7 (the successor to Remix v2 — only the imports change, from `@remix-run/*` to `react-router`).

## Signature / Usage

```typescript
// app/lib/auth.server.ts
import { betterAuth } from "better-auth"
import { Pool } from "pg"

export const auth = betterAuth({
    database: new Pool({
        connectionString: process.env.DATABASE_URL,
    }),
})
```

```typescript
// app/routes/api.auth.$.ts
import { auth } from "~/lib/auth.server";
import type { Route } from "./+types/api.auth.$";

export async function loader({ request }: Route.LoaderArgs) {
    return auth.handler(request);
}

export async function action({ request }: Route.ActionArgs) {
    return auth.handler(request);
}
```

Register the resource route when `app/routes.ts` does not use `flatRoutes()`:

```typescript
// app/routes.ts
import { type RouteConfig, index, route } from "@react-router/dev/routes"

export default [
    index("routes/home.tsx"),
    route("api/auth/*", "routes/api.auth.$.ts"),
] satisfies RouteConfig
```

```typescript
// app/lib/auth-client.ts
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient();
```

## Notes

- Create the Better Auth instance in `auth.server.ts` at the project root or under `lib/` / `utils/` / nested `app/` folders
- Mount the handler as a resource route named `api.auth.$.ts` under `app/routes/`, exporting both `loader` and `action`
- Files in `app/routes/` only become routes when `app/routes.ts` uses `flatRoutes()`; otherwise register the resource route in `app/routes.ts` with `route("api/auth/*", "routes/api.auth.$.ts")`
- Remix v2 (legacy): import the argument types (`LoaderFunctionArgs` / `ActionFunctionArgs`) from `@remix-run/node` instead
- Source: https://www.better-auth.com/docs/integrations/react-router (better-auth v1.7.23 docs)
- Sign up / sign in examples use React Router's `Form` component with `authClient.signUp.email()` / `authClient.signIn.email()` and loading/success/error callbacks

## Related

- [tanstack](./tanstack.md)
- [next](./next.md)
