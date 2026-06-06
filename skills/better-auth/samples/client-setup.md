# Client Setup

Create the auth client instance for use in browser/framework code.

```typescript
// lib/auth-client.ts
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000", // omit in production if same origin
});
```

Export individual methods for convenience:

```typescript
export const { signIn, signUp, signOut, useSession, getSession } = authClient;
```

For Vue, Svelte, or vanilla JS, change the import path:

```typescript
// Vue
import { createAuthClient } from "better-auth/vue";

// Svelte
import { createAuthClient } from "better-auth/svelte";

// Vanilla
import { createAuthClient } from "better-auth/client";
```

## Notes

- Keep client and server auth instances in separate files; never import server-side `auth` in client code
- `baseURL` can be omitted when the client and server share the same origin
- The client automatically handles cookies and CSRF tokens
- Plugins must be registered on both client and server independently
