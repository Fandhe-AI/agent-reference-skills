# React Router Integration

Integrates Better Auth with React Router v7 (the successor to Remix v2 — only the imports change, from `@remix-run/*` to `react-router`).

## Signature / Usage

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

```typescript
// app/lib/auth-client.ts
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient();
```

## Notes

- Create the Better Auth instance in `auth.server.ts` at the project root or under `lib/` / `utils/` / nested `app/` folders
- Mount the handler as a resource route named `api.auth.$.ts` under `app/routes/`, exporting both `loader` and `action`
- Sign up / sign in examples use React Router's `Form` component with `authClient.signUp.email()` / `authClient.signIn.email()` and loading/success/error callbacks

## Related

- [tanstack](./tanstack.md)
- [next](./next.md)
