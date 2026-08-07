# Astro Integration

Mount the Better Auth handler on an Astro catch-all API route and pick the matching frontend client.

```ts
// pages/api/auth/[...all].ts
import { auth } from "~/auth";
import type { APIRoute } from "astro";

export const ALL: APIRoute = async (ctx) => {
  return auth.handler(ctx.request);
};
```

```ts
// lib/auth-client.ts (React example; swap "/react" for "/vue", "/svelte", "/solid", or "/client")
import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient();
```

```ts
// middleware.ts — populate Astro locals with the current session
import { auth } from "@/auth";
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const isAuthed = await auth.api.getSession({ headers: context.request.headers });
  context.locals.user = isAuthed?.user ?? null;
  context.locals.session = isAuthed?.session ?? null;
  return next();
});
```

## Notes

- Astro supports multiple frontend frameworks; import `createAuthClient` from the matching subpath (`better-auth/react`, `/vue`, `/svelte`, `/solid`, or `/client` for vanilla)
- Declare `Locals.user` / `Locals.session` types in `env.d.ts` so `Astro.locals` is typed
- Official example (React replaced with Solid): github.com/better-auth/examples/tree/main/astro-example — Email & Password, Google sign-in, Passkeys, Email Verification, Password Reset, Two Factor Authentication, Profile Update, Session Management
- Keep the mount path as `/api/auth/[...all]` unless you also change it in the Better Auth config
