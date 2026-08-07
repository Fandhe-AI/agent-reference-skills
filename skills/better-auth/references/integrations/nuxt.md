# Nuxt Integration

Integrates Better Auth with Nuxt: catch-all Nitro handler, Vue client, SSR session hydration, and route/server middleware.

## Signature / Usage

```typescript
// server/api/auth/[...all].ts
import { auth } from "~~/lib/auth";

export default defineEventHandler((event) => {
	return auth.handler(toWebRequest(event));
});
```

```typescript
import { createAuthClient } from "better-auth/vue";

export const authClient = createAuthClient();
export const { signIn, signUp, signOut, useSession } = authClient;
```

```vue
<script setup lang="ts">
import { authClient } from "~~/lib/auth-client";

const { data: session } = await authClient.useSession(useFetch);
</script>
```

## Notes

- Use `better-auth/vue` (not `better-auth/react`) so `useSession` returns Vue refs
- Pass Nuxt's `useFetch` to `authClient.useSession(useFetch)` inside a page `setup()` so the request forwards cookies during SSR and hydrates on the client; call `useSession()` with no argument for client-only widgets
- Route middleware: create a named route middleware, opt in with `definePageMeta({ middleware: "auth" })`, and always `return navigateTo(...)` (calling it without `return` is a no-op). Rename to `app/middleware/auth.global.ts` to run on every route
- Server routes: guard with `auth.api.getSession({ headers: event.headers })` and `createError({ statusCode: 401, ... })`
- `authClient` actions other than `useSession(useFetch)` don't forward cookies during SSR by default — either restrict them to the client (`<ClientOnly>` / `import.meta.client`) or build a request-scoped client with `useRequestHeaders(["cookie"])`
- Recommended mount path stays `/api/auth/[...all]`

## Related

- [next](./next.md)
- [svelte-kit](./svelte-kit.md)
