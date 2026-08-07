# Multi-Session

The Multi-Session plugin lets an app maintain multiple active sessions in the same browser and switch between accounts without signing out.

## Signature / Usage

### Setup (server side)

```typescript
import { betterAuth } from "better-auth"
import { multiSession } from "better-auth/plugins"

export const auth = betterAuth({
    plugins: [
        multiSession()
    ]
})
```

### Setup (client side)

```typescript
import { createAuthClient } from "better-auth/client"
import { multiSessionClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    plugins: [
        multiSessionClient()
    ]
})
```

### List device sessions

`GET /multi-session/list-device-sessions`

```typescript
// Client
const { data, error } = await authClient.multiSession.listDeviceSessions()

// Server
const data = await auth.api.listDeviceSessions({
    headers: await headers(),
})
```

Requires the session cookie.

### Set active session

`POST /multi-session/set-active`

```typescript
// Client
const { data, error } = await authClient.multiSession.setActive({
    sessionToken: "some-session-token",
})

// Server
const data = await auth.api.setActiveSession({
    body: { sessionToken: "some-session-token" },
    headers: await headers(),
})
```

### Revoke session

`POST /multi-session/revoke`

```typescript
// Client
const { data, error } = await authClient.multiSession.revoke({
    sessionToken: "some-session-token",
})

// Server
const data = await auth.api.revokeDeviceSession({
    body: { sessionToken: "some-session-token" },
    headers: await headers(),
})
```

### Sign out and revoke all sessions

```typescript
await authClient.signOut()
```

The existing `signOut` method automatically handles revoking all active sessions.

## Options / Props

| Option | Type | Default | Description |
|---|---|---|---|
| `maximumSessions` | number | 5 | Maximum concurrent sessions per device |

```typescript
multiSession({
    maximumSessions: 3
})
```

## Notes

- When a user authenticates, an additional cookie is added to the browser to track multiple sessions across different accounts
- Cookie-based tracking enables seamless account switching within the same browser
