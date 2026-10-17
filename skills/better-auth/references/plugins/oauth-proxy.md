# OAuth Proxy

OAuth sign-in for development and preview deployments. OAuth Proxy is intended for local development and trusted preview deployments whose callback URLs change. It lets these deployments use an OAuth client with a fixed callback URL registered on your production server.

Your production server handles the provider callback, exchanges the authorization code, and returns encrypted profile data to the development or preview deployment, which creates the user and session in its own database. Install the plugin on both the production callback server and each trusted development or preview deployment that participates in the flow. For ordinary production sign-ins use the normal OAuth provider flow; when the current origin matches `productionURL`, the plugin skips proxying the sign-in request (production still handles proxy callbacks for participating deployments).

## Signature / Usage

### Setup (server side)

Add this configuration to the production callback server and each trusted development or preview deployment, using the same `productionURL` and proxy `secret`.

```typescript
import { betterAuth } from "better-auth"
import { oAuthProxy } from "better-auth/plugins"

export const auth = betterAuth({
    plugins: [
        oAuthProxy({
            productionURL: "https://my-production-app.com",
            secret: process.env.OAUTH_PROXY_SECRET,
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

Set `OAUTH_PROXY_SECRET` to the same value on all trusted participating environments (production, preview, localhost). The plugin derives separate encryption keys for OAuth state transport, proxy packages, and provider profiles from this value. Share the proxy secret only with environments and code you trust to authenticate users in every participating deployment, including production: anyone holding it can assert provider identities through the proxy. Keep it out of preview deployments that run untrusted contributor code.

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

### Client side

```typescript
await authClient.signIn.social({
    provider: "github",
    callbackURL: "/dashboard"
})
```

### How it works

1. The preview server initiates OAuth, redirecting to the provider with production's redirect URI
2. The OAuth provider calls back to the production server
3. Production exchanges the code for tokens and fetches user info
4. Production encrypts the profile data and redirects to the preview server (no database write on production)
5. The preview server decrypts the profile, creates the user/session in its own database, and sets the session cookie

The encrypted profile data is passed via URL query parameters and can only be decrypted by servers sharing the same secret, so preview deployments can use separate databases.

## Options / Props

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `productionURL` | string | `BETTER_AUTH_URL` env var, then auth `baseURL` | The production server that handles provider callbacks. Sign-in requests are not proxied when the current origin matches this URL's origin |
| `currentURL` | string | auto-detected (request URL, then hosting-provider env vars, then `baseURL`) | The current application URL. Set only if the URL is not inferred correctly |
| `maxAge` | number (seconds) | `60` | Maximum age of encrypted profile payloads; older payloads are rejected. Keep short (30-60s) to limit replay |
| `secret` | string | falls back to `BETTER_AUTH_SECRET` | Dedicated secret used to derive keys for the proxy flow, used instead of the global secret. All participating environments must share the same value |

## Notes

- Intended for development and trusted preview deployments only.
- If no shared `secret` is configured the plugin falls back to `BETTER_AUTH_SECRET`; since production and preview typically have different main secrets, the flow fails with `state_mismatch` ("State not persisted correctly"). Configure the same `secret` on all environments. A dedicated proxy secret keeps data protected only by the main secret separate, but a holder can still assert provider identities; treat it as an authentication credential for every participating deployment.
- Upgrading existing deployments: the `oAuthProxy` configuration does not change (keep `productionURL` and the shared `secret`; no rotation required). Upgrade production and every participating preview / development deployment to the same Better Auth version in one coordinated cutover. Mixed versions cannot exchange proxy state packages or provider profiles. Restart sign-in and account-linking flows started before the cutover (database-backed or cookie-backed OAuth state). With cookie-backed state, upgrade every node serving the same auth base together because the state cookie encryption key also changes; the plugin does not fall back to the previous key.
- Troubleshooting OAuth that works on production but fails on preview/localhost: shared secret configured, trusted origins include preview/localhost URLs, and the production callback URL is registered with the provider.
