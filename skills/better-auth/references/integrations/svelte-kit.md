# SvelteKit Integration

Integrates Better Auth with SvelteKit via a server hooks handler, a Svelte client, and a cookie plugin for form actions.

## Signature / Usage

```typescript
// hooks.server.ts
import { auth } from "$lib/auth";
import { svelteKitHandler } from "better-auth/svelte-kit";
import { building } from "$app/environment";

export async function handle({ event, resolve }) {
	return svelteKitHandler({ event, resolve, auth, building });
}
```

```typescript
import { createAuthClient } from "better-auth/svelte";

export const authClient = createAuthClient();
```

## Notes

- The handler does not automatically populate `event.locals.user` / `event.locals.session`; fetch the session yourself with `auth.api.getSession()` and assign it to `event.locals` if needed server-side
- For form/server actions that sign users in or up, add the `sveltekitCookies` plugin so `Set-Cookie` headers are applied automatically (requires SvelteKit >= 2.20.0)
- The client is built on nano-store; `useSession()` is reactive and updates the UI on sign-in/sign-out without manual refetching

## Related

- [nuxt](./nuxt.md)
- [solid-start](./solid-start.md)
