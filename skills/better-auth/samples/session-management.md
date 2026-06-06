# Session Management

Read, cache, and revoke user sessions on both client and server.

```typescript
// Client: reactive session (React hook)
const { data: session, isPending } = authClient.useSession();
// session.user.id, session.user.email, session.user.name, ...

// Client: one-time fetch
const { data: session, error } = await authClient.getSession();
```

```typescript
// Server-side session retrieval (Next.js)
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const session = await auth.api.getSession({
  headers: await headers(),
});
```

```typescript
// Server: reduce DB queries with cookie caching
export const auth = betterAuth({
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,       // seconds; cache is refreshed after expiry
      strategy: "compact",  // "compact" | "jwt" | "jwe"
    },
  },
});
```

```typescript
// List and revoke sessions
const sessions = await authClient.listSessions();

await authClient.revokeSession({ token: "session-token" });
await authClient.revokeOtherSessions(); // revoke all except current
await authClient.revokeSessions();      // revoke all
```

## Notes

- `useSession()` is framework-specific; available for React, Vue, Svelte, and Solid
- `strategy: "compact"` is the fastest option; `"jwe"` encrypts cookie payload
- Server-side `getSession` validates the session against the database on every call unless cookie caching is enabled
- `listSessions` returns all active sessions for the current user across devices
