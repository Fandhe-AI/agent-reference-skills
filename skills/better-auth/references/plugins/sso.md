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
    issuer: "https://yourapp.com/saml", // identifies your service provider, not the IdP
    domain: "example.com",
    samlConfig: {
        entryPoint: "https://idp.example.com/sso",
        idpMetadata: { entityID: "https://idp.example.com", cert: "-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----" },
        audience: "https://yourapp.com",
        wantAssertionsSigned: true,
        signatureAlgorithm: "sha256",
        digestAlgorithm: "sha256",
        mapping: {
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

### Resolve SSO Users

Use `resolveUser` when an OIDC or SAML identity must be mapped to an existing Better Auth user instead of relying on email matching. It runs on every SSO sign-in after the protocol identity has been verified.

```typescript
sso({
    resolveUser: async (input, context) => {
        if (input.providerId !== "workforce") return { action: "continue" };
        const provisionedUser = await findProvisionedUserByAccountKey({
            providerId: input.providerId,
            issuer: input.accountKey.issuer,
            subject: input.accountKey.accountId,
            database: context.database,
        });
        if (!provisionedUser) return { action: "reject", code: "PROVISIONED_USER_NOT_FOUND" };
        return { action: "link", userId: provisionedUser.userId, profile: "preserve" };
    },
})
```

For OIDC, `accountKey.issuer` / `accountKey.accountId` are the validated ID Token's exact `iss` and `sub`; `verifiedIdTokenClaims` is the full verified payload and `providerClaims` the accepted raw claims. For SAML the account key is the verified IdP entity ID and signed `NameID`; `providerAttributes` are the verified assertion attributes. `providerUser` holds normalized profile fields. Subject and `NameID` matching is case-sensitive. Decisions: `{ action: "continue" }`, `{ action: "link", userId, profile: "preserve" | "update" }`, `{ action: "reject", code, message? }`. The callback receives the active transaction adapter as `context.database`; native database transactions and transaction async-context support are required. With secondary storage, set `session.storeSessionInDatabase: true` and leave `session.preserveSessionInDatabase` unset or `false`. Do not fall back to email matching when the exact subject is absent.

### Redirecting OIDC endpoints

Better Auth does not follow redirects for server-side OIDC requests. Configure the final canonical URL for the discovery, token, userinfo, and JWKS endpoints. A `3xx` response fails registration or sign-in with `oidc_endpoint_redirect`.

### Signing Certificates and Rotation

When your IdP rotates its signing certificate, list both the old and the new PEM under `idpMetadata.cert` as an array; responses signed by either are accepted.

```typescript
samlConfig: {
    entryPoint: "https://idp.example.com/sso",
    idpMetadata: {
        entityID: "https://idp.example.com",
        cert: [
            "-----BEGIN CERTIFICATE-----\n<current>\n-----END CERTIFICATE-----",
            "-----BEGIN CERTIFICATE-----\n<next>\n-----END CERTIFICATE-----",
        ],
    },
}
```

Both `samlConfig.cert` and `samlConfig.idpMetadata.cert` accept a single PEM string or an array; when both are set, `idpMetadata.cert` wins. If the IdP publishes a metadata XML document, pass it as `idpMetadata.metadata` and leave `cert` unset. A config with neither `cert` nor `idpMetadata.metadata` fails registration with `CERT_SOURCE_MISSING`. `guardProviderMutation` can reject authentication-boundary changes (IdP entity IDs, endpoints, signing certificates, SP entity IDs, NameID formats, POST ACS URLs, assertion-signing policy).

`deriveSAMLIdentityProviderEntityID(samlConfig)` from `@better-auth/sso` derives the IdP entity ID with the same metadata parser used for authentication.

### Additional Provider Fields

Add custom columns to the `ssoProvider` table with `schema.ssoProvider.additionalFields`, then include the field when registering or updating a provider.

```typescript
sso({
    schema: {
        ssoProvider: {
            additionalFields: {
                displayName: { type: "string", required: true },
            },
        },
    },
})
```

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
- SAML endpoints: `/api/auth/sso/saml2/sp/metadata`, `/api/auth/sso/saml2/sp/acs/{providerId}` (ACS; GET and POST; the ACS URL is derived from `baseURL` and `providerId`). `samlConfig.callbackUrl` is now optional and is the post-login redirect for IdP-initiated logins, not an ACS URL.
- OIDC discovery error codes also include `discovery_invalid_json` (empty or invalid JSON) and `oidc_endpoint_redirect` (an endpoint returned a redirect).
- Changed in 1.7: the account subject is protocol-defined. OIDC uses the verified `sub`; SAML uses the signed `NameID`. `oidcConfig.mapping.id` and `samlConfig.mapping.id` are removed (mapping still selects email, name, image, and additional fields). Manual SAML configs without `idpMetadata.metadata` must set `idpMetadata.entityID`; `samlConfig.issuer` identifies the service provider and is no longer an IdP fallback. Remove `id` from every mapping and rewrite stored account rows from a trusted IdP-derived mapping if you used `mapping.id`.
- Changed in 1.7: IdP-initiated SAML is off by default; set `saml.allowIdpInitiated: true` to restore it. Responses are validated for `InResponseTo` and Single Logout requests are matched by `SessionIndex`. For OIDC providers set `allowIdpInitiated: true` on `oidcConfig` (requires the global `baseURL`, else `CALLBACK_URL_REQUIRED`).
- Changed in 1.7: SAML signing certificates accept a single value or a list; management endpoints return the certificate as a list or omit it when certificates live in `idpMetadata`. Every SAML config must supply a signing-cert source.
- Changed in 1.7: SAML configuration is simplified. The callback URL is derived automatically, SP metadata is generated, several fields are removed (drop empty `spMetadata` and the removed fields), one endpoint path changes (`/sso/saml2/callback/:providerId` to `/sso/saml2/sp/acs/:providerId`), and redirect error codes use the full lowercased internal code (for example `saml_multiple_assertions`). Set the post-login redirect for SP-initiated logins with `callbackURL` in `signIn.sso()`.
- Changed in 1.7: SAML signature enforcement verifies the assertion element itself, so an IdP that signs only the response message fails when `wantAssertionsSigned` is required; set `wantAssertionsSigned: false` deliberately for such an IdP. RelayState is validated unconditionally; provider registration rejects SP metadata that weakens a signed-assertion policy, exceeds the metadata size limit, or declares an ACS location with a URL fragment.
- Changed in 1.7: `/sso/update-provider` rejects a partial OIDC or SAML mapping object; send a complete mapping.
- Changed in 1.7: OIDC SSO with discovery works on Cloudflare Workers; a discovery or token endpoint that redirects is rejected with a configuration error.
- Domain verification is required for automatic organization assignment from another sign-in method (verified stored user email, exactly one matching organization). Providers explicitly linked to an organization still provision normally. If a provider is updated or deleted during DNS verification, the request returns `409` `SSO_PROVIDER_CHANGED`.
- Azure AD B2C: set `mapping: { email: "emails" }`; B2C does not send `email_verified`, so users are created with an unverified email. When the mapped email claim is a list, the first address is used.
