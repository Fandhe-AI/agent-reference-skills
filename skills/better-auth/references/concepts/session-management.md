# Session Management

Better Auth implements traditional cookie-based session management: sessions are stored in a cookie and validated on each request.

## Signature / Usage

### Session expiration

Expires after 7 days by default. When an actively used session reaches the `updateAge` threshold, its expiration is extended to the current time + `expiresIn`.

```typescript
session: {
  expiresIn: 60 * 60 * 24 * 7,  // 7 days
  updateAge: 60 * 60 * 24,       // Refresh after 1 day
}
```

Disabling refresh:

```typescript
session: {
  disableSessionRefresh: true,
}
```

Deferred refresh. When enabled, GET `/get-session` becomes read-only and returns `needsRefresh: true` if a refresh is needed. The actual refresh operation is performed via POST:

```typescript
session: {
  deferSessionRefresh: true,
}
```

### Session freshness

A session is considered "fresh" if its `createdAt` is within the `freshAge` limit. Default is 1 day (86,400 seconds). Set `freshAge: 0` to disable:

```typescript
session: {
  freshAge: 60 * 5,  // 5 minutes
}
```

### Session management functions

```typescript
// Get session
const { data: session } = await authClient.getSession();

// Use session (reactive)
const { data: session } = authClient.useSession();

// List sessions
const sessions = await authClient.listSessions();

// Revoke a session
await authClient.revokeSession({
  token: "session-token",
});

// Revoke other sessions
await authClient.revokeOtherSessions();

// Revoke all sessions
await authClient.revokeSessions();

// Update session (custom fields only. Core fields cannot be updated via this endpoint)
await authClient.updateSession({
  theme: "dark",
  language: "en",
});

// Revoke sessions on password change
await authClient.changePassword({
  newPassword: newPassword,
  currentPassword: currentPassword,
  revokeOtherSessions: true,
});
```

### Session caching

Cookie cache strategy: store session data in a signed/encrypted, short-lived cookie to reduce database queries.

```typescript
session: {
  cookieCache: {
    enabled: true,
    maxAge: 5 * 60,  // 5-minute cache
    strategy: "compact",  // or "jwt" or "jwe"
  },
}
```

Disable the cookie cache for a specific request:

```typescript
const session = await authClient.getSession({
  query: { disableCookieCache: true },
});
```

### Secondary storage sessions

When configured, sessions are stored in secondary storage (e.g. Redis) by default:

```typescript
betterAuth({
  secondaryStorage: { /* implementation */ },
});
```

Force database storage:

```typescript
session: {
  storeSessionInDatabase: true,
}
```

Preserve revoked sessions:

```typescript
session: {
  preserveSessionInDatabase: true,
}
```

### Stateless session management

No database query needed — session data is stored in a signed/encrypted cookie, with signature verification and expiration checks performed on it.

Basic setup (automatically enabled without a database):

```typescript
export const auth = betterAuth({
  // No database configuration
  socialProviders: { /* ... */ },
});
```

Manual setup:

```typescript
session: {
  cookieCache: {
    enabled: true,
    maxAge: 7 * 24 * 60 * 60,
    strategy: "jwe",
    refreshCache: true,
  },
}
```

`refreshCache` controls automatic cookie refresh before expiration (see Options / Props for details):

```typescript
session: {
  cookieCache: {
    enabled: true,
    maxAge: 300,
    refreshCache: {
      updateAge: 60,  // Refresh with 60 seconds remaining
    },
  },
}
```

Stateless session versioning. Change the version to invalidate all sessions:

```typescript
session: {
  cookieCache: {
    version: "2",
  },
}
```

Stateless + secondary storage (a combination for optimal performance: use the cookie for validation and Redis for refresh operations):

```typescript
session: {
  cookieCache: {
    maxAge: 5 * 60,
    refreshCache: false,
  },
}
```

### Customizing the session response

Server-side:

```typescript
import { customSession } from "better-auth/plugins";

plugins: [
  customSession(async ({ user, session }) => {
    const roles = findUserRoles(session.session.userId);
    return {
      roles,
      user: { ...user, newField: "value" },
      session,
    };
  }),
];
```

Client-side inference:

```typescript
import { customSessionClient } from "better-auth/client/plugins";
import type { auth } from "@/lib/auth";

const authClient = createAuthClient({
  plugins: [customSessionClient<typeof auth>()],
});
```

Modifying the List Devices endpoint:

```typescript
customSession(
  async ({ user, session }, ctx) => ({ user, session }),
  {},
  { shouldMutateListDeviceSessionsEndpoint: true }
);
```

## Options / Props

### Core session table fields

| Field | Description |
|-------|-------------|
| `id` | Unique session identifier |
| `token` | Session token (also used as the cookie value) |
| `userId` | Associated user ID |
| `expiresAt` | Expiration timestamp |
| `ipAddress` | Client IP address |
| `userAgent` | Browser/client user agent string |

### Encoding strategies

| Strategy | Size | Security | Readable | Use Case |
|----------|------|----------|----------|----------|
| **compact** | Smallest | Good (signed) | Yes | Performance-focused, internal use |
| **jwt** | Medium | Good (signed) | Yes | JWT compatibility, external systems |
| **jwe** | Largest | Highest (encrypted) | No | Maximum security, sensitive data |

### refreshCache values

| Value | Behavior |
|-------|----------|
| `false` (default) | No automatic refresh. Attempts a database fetch when expired |
| `true` | Refreshes at 80% of maxAge |
| `object` | Custom configuration via the `updateAge` property |

### Important notes (custom session)

1. Custom session callbacks do not infer fields from other plugins
2. Custom fields are not cached — the function runs on every session fetch
3. Cross-project setups may lack type inference for custom fields

## Notes

### Security

- Revoked sessions can remain active on other devices until the cookie cache expires
- For immediate revocation on critical actions, disable `cookieCache` or shorten `maxAge`
- All cookie cache strategies provide tamper protection via cryptographic signing

## Related

- [Cookies](./cookies.md)
- [Client](./client.md)
