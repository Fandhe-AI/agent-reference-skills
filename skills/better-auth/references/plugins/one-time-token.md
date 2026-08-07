# One-Time Token

The One-Time Token (OTT) plugin provides generation and verification of secure, single-use session tokens. It's primarily used for cross-domain authentication.

## Signature / Usage

### Setup (server side)

```typescript
import { betterAuth } from "better-auth"
import { oneTimeToken } from "better-auth/plugins/one-time-token"

export const auth = betterAuth({
    plugins: [
        oneTimeToken()
    ]
})
```

### Setup (client side)

```typescript
import { createAuthClient } from "better-auth/client"
import { oneTimeTokenClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    plugins: [
        oneTimeTokenClient()
    ]
})
```

### Generate token

`GET /one-time-token/generate`

```typescript
// Client
const { data, error } = await authClient.oneTimeToken.generate()

// Server
const data = await auth.api.generateOneTimeToken({
    headers: await headers(),  // requires the session cookie
})
```

Returns a `token` tied to the current session. Valid for 3 minutes by default.

### Verify token

`POST /one-time-token/verify`

```typescript
// Client
const { data, error } = await authClient.oneTimeToken.verify({
    token: "some-token",
})

// Server
const data = await auth.api.verifyOneTimeToken({
    body: { token: "some-token" },
})
```

Returns the session tied to the token.

## Options / Props

| Option | Type | Default | Description |
|---|---|---|---|
| `disableClientRequest` | boolean | false | When true, tokens can only be generated server-side |
| `expiresIn` | number | 3 | Token validity period (minutes) |
| `generateToken` | function | - | Custom token generation logic. Receives `session` and `ctx` |
| `storeToken` | "plain" \| "hashed" \| custom | "plain" | How the token is stored in the DB |

### Token storage configuration

```typescript
// Plain text (default)
oneTimeToken({ storeToken: "plain" })

// Built-in hasher
oneTimeToken({ storeToken: "hashed" })

// Custom hasher
oneTimeToken({
    storeToken: {
        type: "custom-hasher",
        hash: async (token) => myCustomHasher(token)
    }
})
```

## Notes

- The generate endpoint requires the session cookie
- Tokens can be used for verification only once
- The default expiration is 3 minutes
- Designed for cross-domain authentication scenarios
- `disableClientRequest` can restrict token generation to server-side only
