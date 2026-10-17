# Cloudflare

## Signature / Usage

```ts
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    socialProviders: {
        cloudflare: {
            clientId: process.env.CLOUDFLARE_CLIENT_ID as string,
            clientSecret: process.env.CLOUDFLARE_CLIENT_SECRET as string,
        },
    },
})
```

```ts
import { authClient } from "@/lib/auth-client"

const { data, error } = await authClient.signIn.social({
    provider: "cloudflare"
})
```

Request additional Cloudflare API scopes:

```ts
cloudflare: {
    clientId: process.env.CLOUDFLARE_CLIENT_ID as string,
    clientSecret: process.env.CLOUDFLARE_CLIENT_SECRET as string,
    scope: [
        "workers-platform.read",
    ],
},
```

Client without a secret (browser, mobile, desktop, CLI):

```ts
cloudflare: {
    clientId: process.env.CLOUDFLARE_CLIENT_ID as string,
    tokenEndpointAuthMethod: "none",
},
```

Long-lived API access (refresh tokens):

```ts
cloudflare: {
    clientId: process.env.CLOUDFLARE_CLIENT_ID as string,
    clientSecret: process.env.CLOUDFLARE_CLIENT_SECRET as string,
    scope: ["offline_access"],
},
```

Mark the email as verified through a trusted mechanism:

```ts
cloudflare: {
    clientId: process.env.CLOUDFLARE_CLIENT_ID as string,
    clientSecret: process.env.CLOUDFLARE_CLIENT_SECRET as string,
    mapProfileToUser: async (profile) => {
        // Verify the user's email through a trusted mechanism.
        const emailVerified = await verifyEmailOwnership(profile.email)
        return { emailVerified }
    },
},
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `clientId` | string | — | `CLOUDFLARE_CLIENT_ID`, from an OAuth client created in the Cloudflare dashboard (Manage Account > OAuth clients) |
| `clientSecret` | string | — | `CLOUDFLARE_CLIENT_SECRET`. Omit for clients that cannot store a secret |
| `scope` | string[] | `user-details.read` | Exact Cloudflare scope IDs configured on the OAuth client. Better Auth does not limit which scopes you can request |
| `tokenEndpointAuthMethod` | `"client_secret_basic"` \| `"client_secret_post"` \| `"none"` | `client_secret_basic` (when `clientSecret` is configured) | Must match the Token Authentication Method of the Cloudflare OAuth client |
| `mapProfileToUser` | (profile) => object | — | Map the Cloudflare profile to user fields, e.g. set `emailVerified` |

## Notes

- Setup in the Cloudflare dashboard: select account, **Manage Account** > **OAuth clients** > **Create client**; use the Authorization Code flow with `code` as the response type; set **Token Authentication Method** to `client_secret_basic`; select **User Details Read** as a required scope
- Redirect URL: `http://localhost:3000/api/auth/callback/cloudflare` for local development; for production use your application URL, e.g. `https://example.com/api/auth/callback/cloudflare`. Update it if you change the base path of the auth routes
- Cloudflare's OIDC `userinfo` endpoint only returns the `sub` claim, so the provider reads email and name from the Cloudflare API `/user` endpoint (`https://api.cloudflare.com/client/v4/user`). This requires `user-details.read` to be granted; otherwise the `/user` request fails and sign-in cannot complete. If it is optional on the client, a user can decline it
- Cloudflare OAuth scope names correspond to Cloudflare API token permission names. The authorization request must not include scopes missing from the Cloudflare OAuth client configuration. Exact scope IDs are available from `GET https://api.cloudflare.com/client/v4/oauth/scopes`
- Clients that cannot securely store a secret must use the Authorization Code flow with PKCE (`S256`) and `token_endpoint_auth_method` set to `none`; Better Auth supplies the PKCE challenge and verifier
- Client visibility (private vs public) is separate from token endpoint authentication. New clients are private (only members of the parent Cloudflare account can authorize). Promoting to public requires a client name, logo, client URL, scopes, and DNS TXT verification, and is permanent
- Refresh tokens: configure the OAuth client with both `authorization_code` and `refresh_token` grant types, then request `offline_access` explicitly. Keep it opt-in when Cloudflare access is only needed during sign-in
- Profile: `/user` returns `id` and `email`, with optional `first_name` and `last_name`. The name is composed from the available name fields and falls back to the email. No profile picture is provided, so `image` is empty
- `/user` does not expose an email-verification status, so `emailVerified` is `false` by default
- Source: https://www.better-auth.com/docs/authentication/cloudflare (better-auth v1.7.10 docs)

## Related

- [Social Providers Common](./social-providers-common.md)
