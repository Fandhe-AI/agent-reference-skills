# OAuth Proxy

The OAuth Proxy plugin lets OAuth requests be proxied through a production server. It's useful for development environments and preview deployments where the redirect URL can't be determined in advance, letting multiple environments share a single OAuth client registration.

## Signature / Usage

### Setup (server side)

```typescript
import { betterAuth } from "better-auth"
import { oAuthProxy } from "better-auth/plugins"

export const auth = betterAuth({
    plugins: [
        oAuthProxy({
            productionURL: "https://my-production-app.com",
        }),
    ],
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID || "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
        },
    },
})
```

### OAuth provider configuration

Register the callback URL only for the production domain:

```
https://my-production-app.com/api/auth/callback/github
```

### Trusted origins

```typescript
export const auth = betterAuth({
    trustedOrigins: [
        "http://localhost:3000",
        "https://my-app-*-preview.example.com",
    ],
})
```

All environments must share the same `BETTER_AUTH_SECRET` for encrypting/decrypting data.

### Client side

```typescript
await authClient.signIn.social({
    provider: "github",
    callbackURL: "/dashboard"
})
```

### How it works

1. The preview server starts the OAuth flow and redirects to the provider using the production redirect URI
2. The OAuth provider calls back to the production server
3. Production exchanges the code for a token and fetches the user info
4. Production encrypts the profile data and redirects to the preview server (production's DB is not written to)
5. The preview server decrypts the profile and creates the user/session in its own DB

The encrypted profile data is passed via a URL query parameter and can only be decrypted by servers sharing the same secret.

## Options / Props

| Option | Type | Default | Description |
|---|---|---|---|
| `productionURL` | string | `BETTER_AUTH_URL` env var | The production server URL. No proxying occurs if it matches `baseURL` |
| `currentURL` | string | auto-detected | The current application URL. Set only if auto-detection fails |
| `maxAge` | number (seconds) | `60` | Maximum lifetime of the encrypted profile payload. Keep short (30-60s) to prevent replay attacks |

## Notes

- Intended for development/preview environments only
- No proxying occurs when `baseURL` matches `productionURL`
- Preview deployments can use a database separate from production
- All environments must share the same `BETTER_AUTH_SECRET`
