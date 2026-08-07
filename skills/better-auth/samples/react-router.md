# React Router v7 Integration

Mount the handler on a resource route and call it from both `loader` and `action`.

```ts
// app/lib/auth.server.ts
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  database: { provider: "postgres", url: process.env.DATABASE_URL },
});
```

```ts
// app/routes/api.auth.$.ts
import { auth } from "~/lib/auth.server";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "react-router";

export async function loader({ request }: LoaderFunctionArgs) {
  return auth.handler(request);
}

export async function action({ request }: ActionFunctionArgs) {
  return auth.handler(request);
}
```

```ts
// app/lib/auth-client.ts
import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient();
```

## Notes

- Remix v2 works identically; only the import changes from `react-router` to `@remix-run/node` / `@remix-run/react`
- The auth instance file must export `auth` as a named or default export, and is conventionally placed at `app/lib/auth.server.ts` (or project root / `utils/`)
- Recommended mount path is `app/routes/api.auth.$.ts` (resolves to `/api/auth/*`)
- Official example: github.com/better-auth/examples/tree/main/react-router-example — Email & Password, Google sign-in, Passkeys, Email Verification, Password Reset, Two Factor Authentication, Profile Update, Session Management
