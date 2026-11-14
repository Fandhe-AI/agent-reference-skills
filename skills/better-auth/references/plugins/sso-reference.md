# SSO reference

SSO plugin options, provider configuration (`oidcConfig`, `samlConfig`), endpoints, additional provider fields, and the `ssoProvider` database schema.

## Signature / Usage

### Endpoints

Paths are relative to your auth base path, `/api/auth` by default.

| Method | Path | Auth | Purpose |
| --- | --- | --- | --- |
| `POST` | `/sso/register` | Session | Register a provider. |
| `POST` | `/sign-in/sso` | None | Start an SSO sign-in. |
| `GET` | `/sso/callback/:providerId` | None | OIDC callback. |
| `GET` | `/sso/callback` | None | Shared OIDC callback, used with `redirectURI`. |
| `GET` `POST` | `/sso/saml2/sp/acs/:providerId` | IdP, no origin check | SAML Assertion Consumer Service. |
| `GET` | `/sso/saml2/sp/metadata?providerId=` | None | SP metadata as XML. |
| `GET` `POST` | `/sso/saml2/sp/slo/:providerId` | IdP, no origin check | SAML Single Logout, with `enableSingleLogout`. |
| `POST` | `/sso/saml2/logout/:providerId` | Session | Start SP-initiated Single Logout, with `enableSingleLogout`. |
| `GET` | `/sso/providers` | Session | List the providers you can manage. |
| `GET` | `/sso/get-provider` | Session | Get one provider by `providerId`. |
| `POST` | `/sso/update-provider` | Session | Update a provider. |
| `POST` | `/sso/delete-provider` | Session | Delete a provider and its linked accounts. |
| `POST` | `/sso/request-domain-verification` | Session | Get a DNS verification token, with domain verification. |
| `POST` | `/sso/verify-domain` | Session | Check the DNS record, with domain verification. |

For error codes, see the OIDC discovery errors and SAML security pages.

### Additional provider fields

Add columns to `ssoProvider` with `schema.ssoProvider.additionalFields`.

```typescript
sso({
  schema: {
    ssoProvider: {
      additionalFields: {
        displayName: { type: "string", required: true },
      },
    },
  },
});
```

Pass the field when you register or update a provider, for example `displayName: "Acme"`. Fields with `input: false` are rejected in requests, and fields with `returned: false` are left out of client types. Pass the same `schema` to `ssoClient()` so client types match.

Startup throws when a field uses a built-in name (`id`, `issuer`, `oidcConfig`, `samlConfig`, `userId`, `providerId`, `organizationId`, `domain`, `domainVerified`) or a response name (`type`, `spMetadataUrl`, `redirectURI`, `domainVerificationToken`), or when its `fieldName` maps to a built-in column.

### Schema

The plugin adds the `ssoProvider` table. Run `npx auth@latest generate` for the exact schema of your adapter.

| Field | Type | Description |
| --- | --- | --- |
| `id` | string | Primary key. Database ID of the provider |
| `issuer` | string | OIDC issuer or SAML SP entity ID |
| `domain` | string | Email domain, or several separated by commas |
| `oidcConfig` | string? | OIDC configuration as a JSON string, including the client secret, unencrypted |
| `samlConfig` | string? | SAML configuration as a JSON string, including private keys, unencrypted |
| `userId` | string | Foreign key to `user.id`. User who registered the provider |
| `providerId` | string | Unique. Provider ID used at sign-in and in callback URLs |
| `organizationId` | string? | Linked organization |
| `domainVerified` | boolean? | Whether the domain is verified. Added when `domainVerification.enabled` is true. |

#### Verification records

The plugin also writes short-lived records to the verification table, or to secondary storage when one is configured. `saml-used-assertion:` records always need the database. Expired rows can be deleted.

| Identifier prefix | Stores |
| --- | --- |
| `saml-authn-request:` | AuthnRequest IDs for InResponseTo validation |
| `saml-used-assertion:` | Assertion IDs already consumed, for replay protection |
| `saml-session:` | NameID and SessionIndex for Single Logout |
| `saml-session-by-id:` | Lookup from a session ID to its SAML session record |
| `saml-logout-request:` | LogoutRequest IDs for SP-initiated Single Logout |
| `_{tokenPrefix}-{providerId}` | Domain verification tokens |

## Options / Props

All plugin options are optional and are passed to `sso()`.

### Users and accounts

| Option | Type | Description |
| --- | --- | --- |
| `resolveUser` | `(input, context) => Awaitable<SSOUserResolution>` | Maps a verified provider identity to a user on every SSO sign-in. Return `continue`, `link`, or `reject`. Runs in a database transaction, so the adapter needs native transaction support. |
| `provisionUser` | `({ user, userInfo, token, provider }) => Awaitable<void>` | Runs after a new user and account are saved, before organization assignment. A thrown error fails the response, but the user stays created and the callback is not retried unless `provisionUserOnEveryLogin` is on. |
| `provisionUserOnEveryLogin` | `boolean` | Runs `provisionUser` on every SSO sign-in, not only when it creates the user. Keep the callback idempotent. Defaults to `false`. |
| `organizationProvisioning` | `object` | Adds SSO users to the organization the provider is linked to. |
| `defaultOverrideUserInfo` | `boolean` | Sets `overrideUserInfo` on OIDC providers registered while this is on, even when the body passes `false`. Existing providers keep their stored value. Defaults to `false`. |
| `disableImplicitSignUp` | `boolean` | Stops SSO sign-in from creating new users. For OIDC, any caller can pass `requestSignUp: true` at sign-in to allow it. SAML ignores `requestSignUp`. Defaults to `false`. |
| `trustEmailVerified` | `boolean` | **Deprecated.** Reads the provider's email verified flag through `mapping.emailVerified`. Otherwise every SSO user has `emailVerified: false`. Defaults to `false`. |

`trustEmailVerified` can lead to account takeover when users can register their own providers, because any provider can then assert a verified email. Use domain verification or `resolveUser` instead.

`organizationProvisioning` options:

| Option | Type | Description |
| --- | --- | --- |
| `disabled` | `boolean` | Turns off organization assignment. Defaults to `false`. |
| `defaultRole` | `"member" \| "admin"` | Role given to new members. Defaults to `"member"`. |
| `getRole` | `({ user, userInfo, token, provider }) => Promise<"member" \| "admin">` | Picks the role per user. Takes precedence over `defaultRole`. |

### Providers

| Option | Type | Description |
| --- | --- | --- |
| `defaultSSO` | `array` | Providers defined in code. They are checked before the database, by `providerId` or by email domain at sign-in. With `domainVerification.enabled`, they count as verified without a DNS check. |
| `providersLimit` | `number \| (user) => Awaitable<number>` | Maximum providers each user can register. `0` disables registration. Any signed-in user can register by default. Defaults to `10`. |
| `redirectURI` | `string` | One OIDC callback for every provider, as a path or a full URL. |
| `resolvePrivateKey` | `({ providerId, keyId, issuer }) => Promise<{ privateKeyJwk?, privateKeyPem?, kid?, algorithm? }>` | Returns the signing key for `private_key_jwt`, so keys stay out of the database. Registering a `private_key_jwt` provider fails without it. |
| `guardProviderMutation` | `(input, context) => Awaitable<void>` | Runs before a stored provider is updated or deleted. Throw to reject the change, which returns a conflict. Needs native transaction support. |
| `domainVerification` | `{ enabled?: boolean; tokenPrefix?: string }` | Requires DNS proof of domain ownership before a provider can sign users in. `tokenPrefix` defaults to `"better-auth-token"`. |

`defaultSSO` entry:

| Field | Type | Description |
| --- | --- | --- |
| `providerId` | `string` | Required. A registered provider cannot reuse this id. |
| `domain` | `string` | Required. A bare email domain such as `example.com`, or several separated by commas. |
| `oidcConfig` | `OIDCConfig` | The stored OIDC shape. `issuer`, `discoveryEndpoint`, and `pkce` are required here. Set `allowIdpInitiated` here, because the API silently drops it. |
| `samlConfig` | `SAMLConfig` | The stored SAML shape. `issuer` is required here. |
| `privateKey` | `{ privateKeyJwk?: JsonWebKey; privateKeyPem?: string }` | Signing key for `private_key_jwt`. It is never stored in the database. |

### SAML plugin options

Set these under `saml`.

| Option | Type | Description |
| --- | --- | --- |
| `enableInResponseToValidation` | `boolean` | Matches each response to a stored AuthnRequest. Turning it off accepts unsolicited responses for every provider. Defaults to `true`. |
| `allowIdpInitiated` | `boolean` | Accepts unsolicited responses. Applies only while InResponseTo validation is on. Defaults to `false`. |
| `requestTTL` | `number` | Lifetime of an AuthnRequest record, in milliseconds. Defaults to `300000`. |
| `clockSkew` | `number` | Tolerance for assertion timestamps, in milliseconds. Defaults to `300000`. |
| `requireTimestamps` | `boolean` | Rejects assertions without `NotBefore` and `NotOnOrAfter`. Defaults to `false`. |
| `algorithms` | `object` | Rules for signature and encryption algorithms. |
| `maxResponseSize` | `number` | Largest accepted SAML response, in bytes. Defaults to `262144`. |
| `maxMetadataSize` | `number` | Largest accepted IdP or SP metadata XML, in bytes. Also enforced when a provider is saved. Defaults to `102400`. |
| `idpInitiatedCallbackUrl` | `string` | Fallback redirect for IdP-initiated responses when no provider callback applies. An absolute URL or a path starting with `/`. |
| `enableSingleLogout` | `boolean` | Adds the Single Logout endpoints and advertises them in SP metadata. Defaults to `false`. |
| `logoutRequestTTL` | `number` | Lifetime of a LogoutRequest record, in milliseconds. Defaults to `300000`. |
| `wantLogoutRequestSigned` | `boolean` | Requires signed LogoutRequests from the IdP. Defaults to `false`. |
| `wantLogoutResponseSigned` | `boolean` | Requires signed LogoutResponses from the IdP. Defaults to `false`. |

`saml.algorithms` options:

| Option | Type | Description |
| --- | --- | --- |
| `onDeprecated` | `"reject" \| "warn" \| "allow"` | What to do when a response or a saved provider uses SHA-1, RSA1\_5, or 3DES. Defaults to `"warn"`. |
| `allowedSignatureAlgorithms` | `string[]` | Signature algorithm URIs to accept, including in `samlConfig.signatureAlgorithm`. When set, it replaces the deprecated check for signatures. |
| `allowedDigestAlgorithms` | `string[]` | Digest algorithm URIs to accept, including in `samlConfig.digestAlgorithm`. |
| `allowedKeyEncryptionAlgorithms` | `string[]` | Accepts only these key encryption algorithm URIs for encrypted assertions. |
| `allowedDataEncryptionAlgorithms` | `string[]` | Accepts only these data encryption algorithm URIs for encrypted assertions. |

### Schema options

| Option | Type | Description |
| --- | --- | --- |
| `schema.ssoProvider.modelName` | `string` | Table name. Defaults to `"ssoProvider"`. |
| `schema.ssoProvider.fields` | `object` | Column names for built-in fields, including `domainVerified`. |
| `schema.ssoProvider.additionalFields` | `object` | Extra columns. See Additional provider fields. |
| `modelName` | `string` | Same as `schema.ssoProvider.modelName`, and takes precedence over it. |
| `fields` | `object` | Same as `schema.ssoProvider.fields` without `domainVerified`, and takes precedence over it. |

### Registration body

The body of `POST /sso/register`. `POST /sso/update-provider` takes `providerId` plus optional `issuer`, `domain`, `oidcConfig`, `samlConfig`, and additional fields.

| Field | Type | Description |
| --- | --- | --- |
| `providerId` | `string` | Required and unique. The IDs of built-in providers, your configured social providers, `account.accountLinking.trustedProviders` entries, and `defaultSSO` entries are rejected with 422. |
| `issuer` | `string` | Required URL. The OIDC issuer, or the SAML SP entity ID. |
| `domain` | `string` | Required. A bare email domain, or several separated by commas. |
| `organizationId` | `string` | Links the provider to an organization. The caller must be a member, and an owner or admin when the organization plugin is enabled. |
| `overrideUserInfo` | `boolean` | OIDC only. On every sign-in, overwrites the user's name, email, image, and mapped additional fields with the provider's values. A changed email takes the provider's verified flag, which is `false` unless `trustEmailVerified` is on. Enable it only when the IdP controls its users' email addresses. Defaults to `defaultOverrideUserInfo`. |
| `oidcConfig` | `object` | OIDC settings. Pass this, `samlConfig`, or both. |
| `samlConfig` | `object` | SAML settings. Pass this, `oidcConfig`, or both. |
| Additional fields | — | Fields from `schema.ssoProvider.additionalFields`. |

### oidcConfig

| Field | Type | Description |
| --- | --- | --- |
| `clientId` | `string` | Required. |
| `clientSecret` | `string` | Required for `client_secret_basic` and `client_secret_post`. |
| `discoveryEndpoint` | `string` | Discovery document URL. Defaults to `{issuer}/.well-known/openid-configuration`. |
| `skipDiscovery` | `boolean` | Skips discovery at registration. Then pass `authorizationEndpoint`, `tokenEndpoint`, and `jwksEndpoint`. Defaults to `false`. |
| `authorizationEndpoint` | `string` | Authorization endpoint URL. Discovery fills it in when omitted. |
| `tokenEndpoint` | `string` | Token endpoint URL. Discovery fills it in when omitted. |
| `userInfoEndpoint` | `string` | UserInfo endpoint URL. Discovery fills it in when omitted. |
| `jwksEndpoint` | `string` | JWKS URL for ID Token verification. Discovery fills it in when omitted. |
| `tokenEndpointAuthentication` | `"client_secret_basic" \| "client_secret_post" \| "private_key_jwt"` | Client authentication at the token endpoint. When omitted, discovery picks it, falling back to `client_secret_basic`. |
| `privateKeyId` | `string` | Key id passed to `resolvePrivateKey` and sent as `kid`. |
| `privateKeyAlgorithm` | `string` | Signing algorithm for `private_key_jwt`. Defaults to `"RS256"`. |
| `scopes` | `string[]` | Scopes to request. Defaults to `["openid", "email", "profile", "offline_access"]`. |
| `pkce` | `boolean` | Sends a PKCE challenge (RFC 7636). Defaults to `true`. |
| `overrideUserInfo` | `boolean` | The stored value that sign-in reads. Registration ignores a value sent here. Instead, it stores `true` when the top-level `overrideUserInfo` or `defaultOverrideUserInfo` is `true`, and `false` otherwise. To change it later, set it here on update. |
| `mapping` | `object` | Claim names to read. |
| `allowIdpInitiated` | `boolean` | Accepts callbacks without `state`. Set it only on `defaultSSO` entries; registration and update silently drop it. Defaults to `false`. |

`oidcConfig.mapping`:

| Field | Type | Description |
| --- | --- | --- |
| `email` | `string` | Claim for the email. Defaults to `email`. |
| `emailVerified` | `string` | Claim for the verified flag. Defaults to `email_verified`. Read only when `trustEmailVerified` is `true`. |
| `name` | `string` | Claim for the name. Defaults to `name`. |
| `image` | `string` | Claim for the image. Defaults to `picture`. |
| `extraFields` | `Record<string, string>` | Maps user fields to claim names. |

### samlConfig

On `defaultSSO` entries, `samlConfig.issuer` is also required.

| Field | Type | Description |
| --- | --- | --- |
| `entryPoint` | `string` | Required URL. The IdP SSO URL. Ignored when `idpMetadata.metadata` is set. |
| `cert` | `string \| string[]` | IdP signing certificates. Pass an array to rotate. Required unless `idpMetadata.metadata` or `idpMetadata.cert` is set. `idpMetadata.cert` takes precedence. |
| `audience` | `string` | Expected assertion audience. Defaults to the SP entity ID: the one in `spMetadata.metadata`, else `spMetadata.entityID`, else `issuer`. |
| `callbackUrl` | `string` | Where users land after an IdP-initiated or fallback sign-in. Not the ACS URL. |
| `idpInitiatedCallbackUrl` | `string` | Fallback for IdP-initiated responses, as an absolute URL or a `/path`. Takes precedence over the plugin option. Pass `null` on update to clear it. |
| `idpMetadata` | `object` | Required. The IdP's metadata XML or its explicit settings. |
| `spMetadata` | `object` | Service provider settings. Generated when omitted. |
| `wantAssertionsSigned` | `boolean` | Rejects unsigned assertions and advertises `WantAssertionsSigned`. Custom SP metadata cannot weaken it. Defaults to `false`. |
| `authnRequestsSigned` | `boolean` | Signs AuthnRequests. Sign-in returns 400 without a private key. Defaults to `false`. |
| `signatureAlgorithm` | `string` | Signature algorithm URI or short form such as `rsa-sha256`. Checked against `saml.algorithms` when the provider is saved. |
| `digestAlgorithm` | `string` | Digest algorithm URI or short form such as `sha256`. Checked against `saml.algorithms` when the provider is saved. |
| `identifierFormat` | `string` | NameID format advertised in generated SP metadata. |
| `privateKey` | `string` | SP signing key, used when `spMetadata.privateKey` is not set. |
| `mapping` | `object` | Attribute names to read. |

`samlConfig.idpMetadata`:

| Field | Type | Description |
| --- | --- | --- |
| `metadata` | `string` | IdP metadata XML. Pass this or `entityID`. The XML supplies the entity ID, SSO URL, and certificates. |
| `entityID` | `string` | IdP entity ID. Required when `metadata` is not set. |
| `cert` | `string \| string[]` | IdP signing certificates, used when `metadata` is not set. Takes precedence over `samlConfig.cert`. |
| `singleSignOnService` | `{ Binding: string; Location: string }[]` | SSO endpoints. Defaults to `entryPoint` with HTTP-Redirect. |
| `singleLogoutService` | `{ Binding: string; Location: string }[]` | SLO endpoints, used with `enableSingleLogout`. |
| `isAssertionEncrypted` | `boolean` | Set to `true` when the IdP encrypts assertions. This turns on decryption, which uses the `spMetadata` keys. |
| `encPrivateKey`, `encPrivateKeyPass`, `privateKey`, `privateKeyPass` | `string` | Passed to the IdP entity. Typical setups do not need them. |

`samlConfig.spMetadata`:

| Field | Type | Description |
| --- | --- | --- |
| `metadata` | `string` | Custom SP metadata XML. When omitted, metadata is generated from `issuer`, `wantAssertionsSigned`, `authnRequestsSigned`, and `identifierFormat`. |
| `entityID` | `string` | SP entity ID. Defaults to `issuer`. |
| `binding` | `string` | Accepted for compatibility. Not used: AuthnRequests use HTTP-Redirect and responses arrive by HTTP-POST. |
| `privateKey`, `privateKeyPass` | `string` | Key and passphrase that sign AuthnRequests. |
| `encPrivateKey`, `encPrivateKeyPass` | `string` | Key and passphrase that decrypt assertions when `idpMetadata.isAssertionEncrypted` is `true`. |
| `isAssertionEncrypted` | `boolean` | Accepted, but does not turn on decryption. Set `idpMetadata.isAssertionEncrypted` instead. |

`samlConfig.mapping`:

| Field | Type | Description |
| --- | --- | --- |
| `email` | `string` | Attribute for the email. Defaults to `email`, then the NameID. |
| `name` | `string` | Attribute for the name, read only when neither the first-name nor the last-name attribute is present. Defaults to `displayName`, then the NameID. |
| `firstName` | `string` | Attribute for the first name. Defaults to `givenName`. |
| `lastName` | `string` | Attribute for the last name. Defaults to `surname`. |
| `emailVerified` | `string` | Attribute for the verified flag. No default. Read only when `trustEmailVerified` is `true`. |
| `extraFields` | `Record<string, string>` | Maps user fields to attribute names. |

## Notes

- Source: https://www.better-auth.com/docs/plugins/sso/reference (better-auth v1.7.23 docs)
- The `ssoProvider` `oidcConfig` and `samlConfig` columns store the client secret and private keys unencrypted; use `defaultSSO` / `resolvePrivateKey` to keep keys out of the database.
- Changed in 1.7: `oidcConfig.mapping.id` and `samlConfig.mapping.id` are removed (the account subject is the verified `sub` / signed `NameID`). `samlConfig.callbackUrl` is the post-login redirect, not an ACS URL.
- Changed in 1.7: IdP-initiated SAML is off by default (`saml.allowIdpInitiated`); for OIDC set `allowIdpInitiated: true` on `oidcConfig` of a `defaultSSO` entry.
- SAML endpoints: ACS `/api/auth/sso/saml2/sp/acs/{providerId}` (GET and POST; derived from `baseURL` and `providerId`); SP metadata `/api/auth/sso/saml2/sp/metadata`.

## Related

- [sso.md](./sso.md)
- [sso-oidc.md](./sso-oidc.md)
- [sso-saml.md](./sso-saml.md)
- [sso-saml-security.md](./sso-saml-security.md)
- [sso-provisioning.md](./sso-provisioning.md)
- [sso-domain-verification.md](./sso-domain-verification.md)
- [SAML SSO with Okta](../guides/saml-sso-with-okta.md)
