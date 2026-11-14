# Vercel

## Signature / Usage

```typescript
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    socialProviders: {
        vercel: {
            clientId: process.env.VERCEL_CLIENT_ID as string,
            clientSecret: process.env.VERCEL_CLIENT_SECRET as string,
        },
    },
})
```

```typescript
import { createAuthClient } from "better-auth/client"
const authClient = createAuthClient()

const signIn = async () => {
    const data = await authClient.signIn.social({
        provider: "vercel"
    })
}
```

Request a subset of scopes:

```typescript
vercel: {
    clientId: process.env.VERCEL_CLIENT_ID as string,
    clientSecret: process.env.VERCEL_CLIENT_SECRET as string,
    scope: ["openid", "email", "profile"],
}
```

OIDC client authentication (application deployed on Vercel, no client secret):

```ts
import { getVercelOidcToken } from "@vercel/oidc"
import { betterAuth } from "better-auth"

const clientId = process.env.VERCEL_CLIENT_ID as string

export const auth = betterAuth({
    socialProviders: {
        vercel: {
            clientId,
            tokenEndpointAuth: {
                method: "custom",
                async customizeRequest({ body }) {
                    const token = await getVercelOidcToken()
                    body.set("client_id", clientId)
                    body.set("client_assertion", token)
                    body.set(
                        "client_assertion_type",
                        "urn:vercel:params:oauth:client-assertion-type:oidc-bearer",
                    )
                },
            },
        },
    },
})
```

Private key JWT with Vercel KMS (`@vercel/kms`):

```ts
import { signJWT } from "@vercel/kms"
import { betterAuth } from "better-auth"

export const auth = betterAuth({
    socialProviders: {
        vercel: {
            clientId: process.env.VERCEL_CLIENT_ID as string,
            tokenEndpointAuth: {
                method: "private_key_jwt",
                async getClientAssertion({ clientId, tokenEndpoint }) {
                    const { token } = await signJWT({
                        issuerId: process.env.VERCEL_KMS_ISSUER_ID as string,
                        claims: {
                            iss: clientId,
                            sub: clientId,
                            aud: tokenEndpoint,
                            jti: crypto.randomUUID(),
                        },
                        ttl: 60,
                    })
                    return token
                },
            },
        },
    },
})
```

Private key JWT with a self-managed signing key:

```ts
import { betterAuth } from "better-auth"
import { createPrivateKeyJwtClientAssertionGetter } from "better-auth/oauth2"

const getClientAssertion = createPrivateKeyJwtClientAssertionGetter({
    privateKeyPem: process.env.VERCEL_APP_PRIVATE_KEY as string,
    algorithm: "RS256",
    kid: process.env.VERCEL_APP_KEY_ID as string,
    expiresIn: 60,
})

export const auth = betterAuth({
    socialProviders: {
        vercel: {
            clientId: process.env.VERCEL_CLIENT_ID as string,
            tokenEndpointAuth: {
                method: "private_key_jwt",
                getClientAssertion,
            },
        },
    },
})
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `clientId` | string | — | `VERCEL_CLIENT_ID`, obtained by creating a Vercel App in the [Vercel Dashboard](https://vercel.com/dashboard) |
| `clientSecret` | string | — | `VERCEL_CLIENT_SECRET`, obtained by creating a Vercel App in the [Vercel Dashboard](https://vercel.com/dashboard). Required by the default configuration; omit with `private_key_jwt` or OIDC client authentication |
| `tokenEndpointAuth` | object | `clientSecret` sent in the request body when configured | Authentication when exchanging the authorization code: `client_secret_basic`, `client_secret_post`, `none`, `private_key_jwt` (`getClientAssertion`), or `custom` (`customizeRequest({ body })`). Enable the matching method on the Vercel App |
| `scope` | string[] | Vercel App-configured | Supported values: `openid` (default), `email`, `profile`, `offline_access` |

## Notes

- Redirect URL — local development: `http://localhost:3000/api/auth/callback/vercel`; production: set to your application's URL. Adjust the redirect path if you've customized your auth route base path
- Scopes are configured at the Vercel App level
- Vercel requires PKCE (Proof Key for Code Exchange) for enhanced security; this is automatically handled by Better Auth
- The `custom` strategy owns client authentication: it must set `client_id` and the required credential parameters or headers. Better Auth still handles the authorization code, redirect URI, PKCE, token response, and user profile. The hook runs on the server for each exchange and does not change the browser callback URL
- OIDC client authentication: in the Vercel App's Authentication settings enable **OpenID Connect (`oidc_token`)**, configure the trusted issuer and claims (match the deployment token's issuer and audience; restrict to the intended team, project, and environments), and install `@vercel/oidc`. Retrieve the token inside the hook so each exchange uses the current token; do not store it at module initialization or pass it as `clientSecret`. If the hook throws, Better Auth stops the exchange. Local development also needs a valid workload token and matching trust configuration
- With OAuth Proxy and `productionURL`, preview sign-ins exchange their authorization code on the production deployment, so the OIDC token identifies that production deployment. Configure trust for its team, project, and `production` environment; trusting only `preview` rejects these exchanges
- OIDC client authentication authenticates the application's workload; the person signing in still uses the normal Sign in with Vercel flow, and Better Auth still needs its session secret
- Private key JWT: enable `private_key_jwt` on the Vercel App and configure its **JWKS URL**. `getClientAssertion` is called for each token exchange with the client ID, token endpoint, and grant type. Omit `clientSecret`
- Vercel KMS signing: create a KMS issuer in the team's **Key Management** settings, add a project grant for the intended project and environments, set the JWKS URL to `https://kms.vercel.com/<issuerId>/jwks.json`, install `@vercel/kms`, and sign a fresh assertion inside `getClientAssertion` (a request context is required). KMS sets `kid`, `iat`, `nbf`, and `exp`; `iss` and `sub` must be the OAuth client ID rather than the KMS issuer URL; use a lifetime of at most 60 seconds
- `createPrivateKeyJwtClientAssertionGetter` (`better-auth/oauth2`) accepts local key material and does not call KMS. `expiresIn` defaults to 120 seconds (set `60` to override); set `kid` to the matching public key's ID in your JWKS (Vercel requires it when the JWKS has more than one key). Keep private keys on the server and publish only public keys
- Source: https://www.better-auth.com/docs/authentication/vercel (better-auth v1.7.23 docs)

## Related

- [Social Providers Common](./social-providers-common.md)
