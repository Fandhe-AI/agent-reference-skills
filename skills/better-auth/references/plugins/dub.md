# Dub

Plugin integrating Dub's link management platform with Better Auth. Supports lead tracking for sign-ups originating from Dub links and OAuth links.

## Signature / Usage

### Installation

```bash
npm install @dub/better-auth dub
```

### Setup (server side)

```typescript
import { betterAuth } from "better-auth"
import { dubAnalytics } from "@dub/better-auth"
import { Dub } from "dub"

const dubClient = new Dub({ token: process.env.DUB_API_KEY })

export const auth = betterAuth({
    plugins: [
        dubAnalytics({
            dubClient,
            leadEventName: "signup"
        })
    ]
})
```

### Setup (client side)

```typescript
import { createAuthClient } from "better-auth/client"
import { dubAnalyticsClient } from "@dub/better-auth/client"

export const authClient = createAuthClient({
    plugins: [dubAnalyticsClient()]
})
```

### Lead tracking

Automatically tracks sign-up events as Dub leads. Disable with `disableLeadTracking: true`.

### OAuth links

```typescript
// OAuth integration with Dub
await authClient.dub.link({ callbackURL: "/dashboard" })

// Server side
const result = await auth.api.dubLink({ headers: req.headers })
```

## Options / Props

| Property | Type | Description |
|---|---|---|
| `dubClient` | Dub | Dub client instance |
| `disableLeadTracking?` | boolean | Disable lead tracking |
| `leadEventName?` | string | Custom event name for sign-up leads |
| `customLeadTrack?` | function | Custom lead tracking function |
| `oauth.clientId?` | string | OAuth client identifier |
| `oauth.clientSecret?` | string | OAuth client secret |
| `oauth.pkce?` | boolean | Enable the PKCE security flow |

## Related

- [generic-oauth.md](./generic-oauth.md)
