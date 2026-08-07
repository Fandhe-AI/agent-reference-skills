# Magic Link

The Magic Link plugin implements passwordless authentication by sending users an email containing a verification link. Clicking the link automatically authenticates the user without a password.

## Signature / Usage

### Setup (server side)

```typescript
import { betterAuth } from "better-auth"
import { magicLink } from "better-auth/plugins"

export const auth = betterAuth({
    plugins: [
        magicLink({
            sendMagicLink: async ({ email, token, url, metadata }, ctx) => {
                // Implement email-sending logic
            }
        })
    ]
})
```

### Setup (client side)

```typescript
import { createAuthClient } from "better-auth/client"
import { magicLinkClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    plugins: [
        magicLinkClient()
    ]
})
```

### Sign in with Magic Link

`POST /sign-in/magic-link`

```typescript
// Client
const { data, error } = await authClient.signIn.magicLink({
    email: "user@email.com",
    name: "my-name",
    callbackURL: "/dashboard",
    newUserCallbackURL: "/welcome",
    errorCallbackURL: "/error",
    metadata: { inviteId: "123" },
})

// Server
const data = await auth.api.signInMagicLink({
    body: {
        email: "user@email.com",
        name: "my-name",
        callbackURL: "/dashboard",
        newUserCallbackURL: "/welcome",
        errorCallbackURL: "/error",
        metadata: { inviteId: "123" },
    },
    headers: await headers(),
})
```

Parameters:
- `email` (string, required): the email address that receives the magic link
- `name` (string): display name for new sign-ups
- `callbackURL` (string): redirect destination after verification
- `newUserCallbackURL` (string): redirect destination for new users
- `errorCallbackURL` (string): redirect destination on error
- `metadata` (Record<string, any>): custom data passed to the `sendMagicLink` callback

### Verify Magic Link

`GET /magic-link/verify`

```typescript
// Client
const { data, error } = await authClient.magicLink.verify({
    query: {
        token: "123456",
        callbackURL: "/dashboard",
    },
})

// Server
const data = await auth.api.magicLinkVerify({
    query: {
        token: "123456",
        callbackURL: "/dashboard",
    },
    headers: await headers(),
})
```

Unless `disableSignUp` is enabled, users without an existing account are signed up automatically.

## Options / Props

| Option | Type | Default | Description |
|---|---|---|---|
| `sendMagicLink` | function | required | Callback invoked when a magic link is requested |
| `expiresIn` | number | 300 (5 minutes) | Token expiration (seconds) |
| `allowedAttempts` | number \| Infinity | 1 | Maximum verification attempts before the token is deleted |
| `disableSignUp` | boolean | false | Prevents new user sign-up via magic link |
| `generateToken` | (email: string) => string | - | Custom token generation function |
| `storeToken` | "plain" \| "hashed" \| { type: "custom-hasher", hash: ... } | "plain" | How the token is stored |

### Custom token generation

`generateToken` must return a cryptographically secure, hard-to-guess string.

### Token storage

```typescript
// Hashed (recommended)
magicLink({ storeToken: "hashed" })

// Custom hasher
magicLink({
    storeToken: {
        type: "custom-hasher",
        hash: async (token) => myCustomHasher(token)
    }
})
```

The storage backend is determined by the global `verification` setting. Redis can be used via `secondaryStorage`.

## Notes

- The default token expiration is 5 minutes
- By default only one verification attempt is allowed (brute-force prevention)
- `storeToken: "hashed"` is recommended in production
- Unless `disableSignUp: true`, unregistered users are automatically created when requesting a magic link
- On error, the user is redirected to `errorCallbackURL` or `callbackURL` with an error query parameter
