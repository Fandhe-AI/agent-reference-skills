# SSO

The SSO plugin supports OIDC, OAuth2, and SAML 2.0, allowing authentication to multiple applications with a single set of credentials.

## Signature / Usage

### Installation

```bash
npm install @better-auth/sso
```

### Setup (server side)

```typescript
import { betterAuth } from "better-auth"
import { sso } from "@better-auth/sso"

const auth = betterAuth({
    plugins: [
        sso({
            provisionUser: async ({ user, userInfo, token, provider }) => { },
            organizationProvisioning: {
                disabled: false,
                defaultRole: "member",
                getRole: async ({ user, userInfo, provider }) => "member"
            },
            domainVerification: { enabled: true },
        })
    ]
})
```

### Setup (client side)

```typescript
import { createAuthClient } from "better-auth/client"
import { ssoClient } from "@better-auth/sso/client"

const authClient = createAuthClient({
    plugins: [
        ssoClient({ domainVerification: { enabled: true } })
    ]
})
```

### Register an OIDC provider

```typescript
const { data, error } = await authClient.sso.register({
    providerId: "okta",
    issuer: "https://your-org.okta.com",
    domain: "yourcompany.com",
    oidcConfig: {
        clientId: "your-client-id",
        clientSecret: "your-client-secret",
        discoveryEndpoint: "https://idp.example.com/.well-known/openid-configuration",
        scopes: ["openid", "email", "profile"],
        pkce: true,
        mapping: {
            id: "sub",
            email: "email",
            emailVerified: "email_verified",
            name: "name",
            image: "picture",
            extraFields: { department: "department" }
        }
    }
})
```

### Register a SAML provider

```typescript
await authClient.sso.register({
    providerId: "saml-provider",
    issuer: "https://idp.example.com",
    domain: "example.com",
    samlConfig: {
        entryPoint: "https://idp.example.com/sso",
        cert: "-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----",
        callbackUrl: "https://yourapp.com/api/auth/sso/saml2/callback/saml-provider",
        audience: "https://yourapp.com",
        wantAssertionsSigned: true,
        signatureAlgorithm: "sha256",
        digestAlgorithm: "sha256",
        mapping: {
            id: "nameID",
            email: "email",
            name: "displayName",
        }
    }
})
```

### SSO sign-in

```typescript
// By email
await authClient.signIn.sso({ email: "user@example.com", callbackURL: "/dashboard" })

// By domain
await authClient.signIn.sso({ domain: "example.com", callbackURL: "/dashboard" })

// By organization slug
await authClient.signIn.sso({ organizationSlug: "example-org", callbackURL: "/dashboard" })

// By provider ID
await authClient.signIn.sso({ providerId: "example-provider-id", callbackURL: "/dashboard", loginHint: "user@example.com" })
```

### Domain verification

```typescript
// Request a verification token
const { data, error } = await authClient.sso.requestDomainVerification({
    providerId: "acme-corp"
})

// Verify domain
const { data, error } = await authClient.sso.verifyDomain({
    providerId: "acme-corp"
})
```

DNS record format:
- Host: `_better-auth-token-{providerId}`
- Value: the verification token
- TTL: 1 week

### Retrieving SP metadata

```typescript
const response = await auth.api.spMetadata({
    query: { providerId: "saml-provider", format: "xml" }
})
```

## Options / Props

| Option | Type | Description |
|---|---|---|
| `provisionUser` | function | Custom user provisioning logic |
| `organizationProvisioning.disabled` | boolean | Disables organization provisioning |
| `organizationProvisioning.defaultRole` | string | Default role |
| `organizationProvisioning.getRole` | function | Role assignment logic |
| `defaultOverrideUserInfo` | boolean | Overrides user info |
| `disableImplicitSignUp` | boolean | Disables implicit sign-up |
| `providersLimit` | number \| function | Limits the number of providers |
| `redirectURI` | string | Redirect URI |
| `domainVerification.enabled` | boolean | Enables domain verification |
| `defaultSSO` | array | Default SSO configuration |

### SAML security configuration

```typescript
saml: {
    enableInResponseToValidation: true,
    allowIdpInitiated: true,
    requestTTL: 300000,
    clockSkew: 300000,
    requireTimestamps: false,
    algorithms: { onDeprecated: "warn" },
    maxResponseSize: 262144,
    maxMetadataSize: 102400
}
```

### DB schema (ssoProvider table)

| Field | Type | Description |
|---|---|---|
| id | string | PK |
| issuer | string | OIDC issuer URL |
| domain | string | Email domain |
| oidcConfig | string? | OIDC configuration (JSON) |
| samlConfig | string? | SAML configuration (JSON) |
| userId | string | FK to user |
| providerId | string | Unique provider identifier |
| organizationId | string? | Organization linkage |
| domainVerified | boolean? | Domain verification state |

## Notes

- OIDC discovery error codes: `issuer_mismatch` (the discovery document reports a different issuer), `discovery_incomplete` (required fields missing), `discovery_not_found` (404 at the discovery endpoint), `discovery_timeout` (10-second timeout exceeded), `discovery_untrusted_origin` (origin not in trustedOrigins)
- SAML assertion replay protection is always enabled
- The discovery domain must be configured in trusted origins
- Supported algorithms: RSA-SHA256/384/512, ECDSA-SHA256/384/512
- Use of deprecated algorithms (SHA-1, RSA 1.5, 3DES) is controlled via `algorithms.onDeprecated`
- SAML endpoints: `/api/auth/sso/saml2/sp/metadata`, `/api/auth/sso/saml2/callback/{providerId}`
