# SvelteKit Integration

Mount the handler in `hooks.server.ts` via `svelteKitHandler`, populate `event.locals`, and add `sveltekitCookies` for server actions.

```ts
// hooks.server.ts
import { auth } from "$lib/auth";
import { svelteKitHandler } from "better-auth/svelte-kit";
import { building } from "$app/environment";

export async function handle({ event, resolve }) {
  const session = await auth.api.getSession({ headers: event.request.headers });
  if (session) {
    event.locals.session = session.session;
    event.locals.user = session.user;
  }
  return svelteKitHandler({ event, resolve, auth, building });
}
```

```ts
// lib/auth.ts — required so signInEmail/signUpEmail in server actions actually set cookies
import { betterAuth } from "better-auth";
import { sveltekitCookies } from "better-auth/svelte-kit";
import { getRequestEvent } from "$app/server";

export const auth = betterAuth({
  // ...your config
  plugins: [sveltekitCookies(getRequestEvent)], // must be last in the array
});
```

```svelte
<!-- +page.svelte -->
<script lang="ts">
  import { authClient } from "$lib/client";
  const session = authClient.useSession();
</script>

{#if $session.data}
  <p>{$session.data.user.name}</p>
  <button on:click={() => authClient.signOut()}>Sign Out</button>
{:else}
  <button on:click={() => authClient.signIn.social({ provider: "github" })}>
    Continue with GitHub
  </button>
{/if}
```

## Notes

- `svelteKitHandler` alone does not populate `event.locals.user`/`session` — fetch and assign it yourself in `handle` if server code needs it
- Create the client with `createAuthClient` from `better-auth/svelte` (see `samples/client-setup.md`)
- `getRequestEvent` requires SvelteKit `2.20.0+`
- Official example: github.com/better-auth/examples/tree/main/svelte-kit-example — Email & Password, Google sign-in, Passkeys, Email Verification, Password Reset, Two Factor Authentication, Profile Update, Session Management
