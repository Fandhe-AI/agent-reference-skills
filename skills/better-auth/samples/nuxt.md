# Nuxt Integration

Mount the handler on a Nitro catch-all route, use `authClient.useSession(useFetch)` for SSR-hydrated session state, and gate pages with route middleware.

```ts
// server/api/auth/[...all].ts
import { auth } from "~~/lib/auth";

export default defineEventHandler((event) => {
  return auth.handler(toWebRequest(event));
});
```

```vue
<!-- app/pages/index.vue -->
<script setup lang="ts">
import { authClient } from "~~/lib/auth-client";
const { data: session } = await authClient.useSession(useFetch);
</script>

<template>
  <div v-if="session">
    <p>Welcome, {{ session.user.name }}</p>
    <button @click="authClient.signOut()">Sign out</button>
  </div>
  <button v-else @click="authClient.signIn.social({ provider: 'github' })">
    Continue with GitHub
  </button>
</template>
```

```ts
// app/middleware/auth.ts
import { authClient } from "~~/lib/auth-client";

export default defineNuxtRouteMiddleware(async (to) => {
  const { data: session } = await authClient.useSession(useFetch);
  if (!session.value) {
    return navigateTo({ path: "/login", query: { redirect: to.fullPath } });
  }
});
```

## Notes

- Create the client with `createAuthClient` from `better-auth/vue` (see also `samples/client-setup.md`) so `useSession` returns Vue refs
- `authClient` actions other than `useSession(useFetch)` don't forward cookies during SSR by default; wrap SSR-only consumers in `<ClientOnly>` or build a request-scoped client with `useRequestHeaders(["cookie"])`
- Protect server routes separately with `auth.api.getSession({ headers: event.headers })` and `createError({ statusCode: 401 })`
- Always `return navigateTo(...)` in middleware — calling it without `return` is a no-op
- Community modules: `nuxt-modules/better-auth`, `atinux/nuxthub-better-auth`
