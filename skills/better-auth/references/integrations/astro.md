# Astro Integration

Better Auth first-class support for Astro, integrable with any frontend framework Astro supports (React, Vue, Svelte, Solid, vanilla).

## Signature / Usage

```typescript
// pages/api/auth/[...all].ts
import { auth } from "~/auth";
import type { APIRoute } from "astro";

export const ALL: APIRoute = async (ctx) => {
    return auth.handler(ctx.request);
};
```

```typescript
// middleware.ts
import { auth } from "@/auth";
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
    const isAuthed = await auth.api.getSession({
        headers: context.request.headers,
    });

    context.locals.user = isAuthed?.user || null;
    context.locals.session = isAuthed?.session || null;

    return next();
});
```

```typescript
// env.d.ts
declare namespace App {
    interface Locals {
        user: import("better-auth").User | null;
        session: import("better-auth").Session | null;
    }
}
```

## Notes

- Recommended API path is `/api/auth/[...all]` (customizable)
- Access session data server-side via `Astro.locals`; implement redirect logic for protected routes within `.astro` files
- Middleware runs on all requests, centralizing authentication logic
- Optional rate limiting via `x-forwarded-for` header

## Related

- [svelte-kit](./svelte-kit.md)
- [solid-start](./solid-start.md)
