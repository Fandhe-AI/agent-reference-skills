# SSO

The SSO plugin lets users sign in through OIDC or SAML 2.0 identity providers that you or your customers register at runtime. Each registered connection is one row in the `ssoProvider` table; connections can also be defined in code with `defaultSSO`. Protocol details live in the sibling pages (OIDC, SAML, SAML security, provisioning, domain verification, reference).

## Signature / Usage

### Installation

```bash
npm install @better-auth/sso
```

Server:

```typescript
import { betterAuth } from "better-auth";
import { sso } from "@better-auth/sso";

export const auth = betterAuth({
  plugins: [
    sso(),
  ],
});
```

Migrate the database (`npx auth migrate` or `npx auth generate`), then add the client plugin. `ssoClient()` takes the same `domainVerification` and `schema.ssoProvider.additionalFields` options as the server plugin, so the client types match.

```typescript
import { createAuthClient } from "better-auth/client";
import { ssoClient } from "@better-auth/sso/client";

export const authClient = createAuthClient({
  plugins: [
    ssoClient(),
  ],
});
```

### Register a provider

By default, any signed-in user can register up to 10 providers. Decide who should register providers before you deploy:

| Who registers providers | Configure |
| --- | --- |
| Only your administrators | Set `providersLimit` to a function that returns `0` for everyone else. Owners and admins of an organization can still update its linked providers, including their `domain`; block that with `guardProviderMutation`. |
| Your customers, each for their own domain | Enable domain verification. A provider then cannot sign anyone in until its domain is proven over DNS. |
| Nobody at runtime | Set `providersLimit: 0` and define the providers in `defaultSSO`. To link existing users by email, also enable domain verification. |

As a function, `providersLimit` receives the signed-in user and returns the number of providers that user can register. A limit of `0` rejects that user's registrations with 403.

```typescript
sso({
  providersLimit: async (user) => ((await isAdmin(user.id)) ? 10 : 0), // your check
})
```

`authClient.sso.register` calls `POST /sso/register` and creates a provider owned by the signed-in user. On the server, call `auth.api.registerSSOProvider` with the request's headers. Every registration needs:

- `providerId`: unique. The IDs of built-in providers, your configured social providers, `account.accountLinking.trustedProviders` entries, and `defaultSSO` entries are rejected with 422.
- `issuer`: the IdP issuer URL for OIDC, or your SP entity ID for SAML.
- `domain`: a bare email domain such as `example.com`. Separate several domains with commas.
- `oidcConfig`, `samlConfig`, or both.

To register an OIDC provider that uses discovery, first add the IdP's origin to `trustedOrigins`. Registration fetches the IdP's discovery document and fails with `discovery_untrusted_origin` when the origin is missing. `trustedOrigins` applies to the whole app, so list only IdP origins you have vetted. With `skipDiscovery: true` and every endpoint set in `oidcConfig`, registration fetches nothing. The response includes `redirectURI`, and `domainVerificationToken` when domain verification is enabled.

```typescript
import { authClient } from "@/lib/auth-client";

const { data, error } = await authClient.sso.register({
  providerId: "acme",
  issuer: "https://idp.example.com",
  domain: "example.com",
  oidcConfig: {
    clientId: "CLIENT_ID",
    clientSecret: "CLIENT_SECRET",
  },
});

if (error) {
  // Show error.message. Discovery failures set error.code, such as discovery_untrusted_origin.
} else {
  // Register data.redirectURI as the redirect URI at the IdP.
}
```

Passing `organizationId` requires organization membership (see the provisioning page).

### Configure providers in code

To keep providers in your config instead of the database, pass `defaultSSO`, an array of `{ providerId, domain, oidcConfig?, samlConfig?, privateKey? }` entries. Better Auth checks them before database providers. List only domains the IdP is authoritative for.

Whether a sign-in through these providers links to an existing user depends on domain verification:

- With `domainVerification.enabled: true`, they count as verified without a DNS check. A sign-in can link to an existing user at a listed domain when the other linking conditions hold.
- Without it, Better Auth does not link them by email. An existing user's first SSO sign-in then fails unless `resolveUser` links it.

```typescript
sso({
  defaultSSO: [
    {
      providerId: "acme-saml",
      domain: "example.com",
      samlConfig: {
        issuer: "https://app.example.com",
        entryPoint: "https://idp.example.com/sso",
        idpMetadata: {
          entityID: "https://idp.example.com",
          cert: "-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----",
        },
      },
    },
  ],
})
```

To use `private_key_jwt` without storing the key in the database, set `privateKey` (`{ privateKeyJwk?, privateKeyPem? }`) on the entry.

### Sign in

```typescript
import { authClient } from "@/lib/auth-client";

await authClient.signIn.sso({
  email: "user@example.com",
  callbackURL: "/dashboard",
});
```

In the browser, the auth client sends the user to the IdP by itself. On the server, call `auth.api.signInSSO`. It returns the IdP's `url`, and your code must send the browser there. `auth.api.signInSSO` does not check `callbackURL`, `errorCallbackURL`, or `newUserCallbackURL` against `trustedOrigins` (only requests through `auth.handler` get that check), so validate any URL taken from the request first, or the sign-in becomes an open redirect.

Pass the identifier you have: `email` or `domain`, `organizationSlug`, or `providerId`. To choose the provider, Better Auth tries these in order:

1. If you pass `providerId`, it uses the provider with that ID. No other field is used.
2. If a `defaultSSO` entry's domains include `domain`, or the domain part of `email`, it uses that entry.
3. If you pass `organizationSlug`, it uses the provider linked to that organization. This needs the organization plugin. An unknown slug continues to the next step. A known organization without a linked provider returns 404.
4. Otherwise, it uses a registered provider for that domain.

With domain verification enabled, a provider whose domain is not verified returns 401.

Other sign-in fields:

- `loginHint` is sent to OIDC providers as `login_hint`, and falls back to `email`. SAML ignores it.
- `providerType` picks the protocol when a provider has both configurations, and OIDC is the default. Requesting a protocol the provider does not have returns 400.
- `additionalParams` adds parameters to the OIDC authorization request. Reserved parameters such as `state`, `client_id`, and `redirect_uri` are rejected, and SAML providers reject it with 400.
- To create a new user even when `disableImplicitSignUp` is on, pass `requestSignUp: true`. Any caller can set it, and SAML ignores it.

`POST /sign-in/sso`:

```typescript
type signInSSO = {
    /**
     * Email address whose domain identifies the provider.
     */
    email?: string = "user@example.com"
    /**
     * Slug of the organization whose provider to use.
     */
    organizationSlug?: string = "example-org"
    /**
     * ID of the provider to use.
     */
    providerId?: string = "acme"
    /**
     * Email domain of the provider.
     */
    domain?: string = "example.com"
    /**
     * URL to redirect to after a successful sign-in.
     */
    callbackURL: string = "/dashboard"
    /**
     * URL to redirect to if sign-in fails.
     */
    errorCallbackURL?: string = "/sign-in/error"
    /**
     * URL to redirect to when the user is new.
     */
    newUserCallbackURL?: string = "/welcome"
    /**
     * OIDC scopes to request. Defaults to the provider's scopes, then `["openid", "email", "profile", "offline_access"]`.
     */
    scopes?: string[] = ["openid", "email", "profile", "offline_access"]
    /**
     * Sent to OIDC providers as `login_hint`.
     */
    loginHint?: string = "user@example.com"
    /**
     * Extra OIDC authorization request parameters. Rejected for SAML.
     */
    additionalParams?: Record<string, string>
    /**
     * Create a new user even when `disableImplicitSignUp` is on. OIDC only.
     */
    requestSignUp?: boolean = true
    /**
     * Protocol to use when the provider has both configurations. Defaults to `oidc`.
     */
    providerType?: "oidc" | "saml" = "oidc"
}
```

### Manage providers

`authClient.sso.providers()` (`GET /sso/providers`) lists the providers the signed-in user registered without an organization, plus the providers of organizations where that user is an `owner` or `admin`. `authClient.sso.getProvider({ query: { providerId } })` (`GET /sso/get-provider`) fetches one. Both return a sanitized configuration: `clientIdLastFour` instead of the client ID, no secrets, and the parsed SAML signing certificates. You need the same access to update or delete a provider.

`POST /sso/update-provider` (requires session):

```typescript
type updateSSOProvider = {
    /**
     * ID of the provider to update.
     */
    providerId: string = "acme"
    /**
     * New issuer URL.
     */
    issuer?: string = "https://idp.example.com"
    /**
     * New email domain or comma-separated domains.
     */
    domain?: string = "example.com"
    /**
     * Fields of the OIDC configuration to change.
     */
    oidcConfig?: Partial<OIDCConfig> = { clientSecret: "NEW_CLIENT_SECRET" }
    /**
     * Fields of the SAML configuration to change. Set `idpInitiatedCallbackUrl` to `null` to clear it.
     */
    samlConfig?: Partial<SAMLConfig>
}
```

- A supplied `mapping` replaces the whole previous mapping.
- Changing `domain` resets `domainVerified` to `false`.
- Changing an identity field returns 409 while accounts are linked to the provider. The identity fields are:
  - Both: `issuer`
  - OIDC: authorization, token, userinfo, JWKS, and discovery endpoints, and `clientId`
  - SAML: IdP entity ID, IdP SSO URLs, SP entity ID, NameID format, POST ACS URLs, `wantAssertionsSigned`, and `audience`

`POST /sso/delete-provider` (requires session):

```typescript
type deleteSSOProvider = {
    /**
     * ID of the provider to delete.
     */
    providerId: string = "acme"
}
```

Deleting a provider also deletes every `account` row linked to it. It does not end sessions that users started through the provider, or remove organization memberships it provisioned. If you delete a provider because its IdP was compromised, also revoke those users' sessions.

To block an update or delete of a stored provider, throw from `guardProviderMutation`. The change is rejected with 409 `SSO_PROVIDER_MUTATION_REJECTED`. The guard runs after the provider row is locked, and it needs a database adapter with native transactions and async-context support. It receives:

- `action`: `"update"` or `"delete"`.
- `provider`: the `id`, `providerId`, and `organizationId` of the stored row.
- `providerReference`: an opaque reference to that row's configuration. Never persist it.
- `isAuthenticationBoundaryChange`, on update only. It is `true` for the identity fields above and for SAML signing certificate changes. It is `false` for OIDC client secret and SAML SP private key rotation.

Read related state through the `database` in the guard's second argument, because it runs in the same transaction. For example, reject boundary changes while a directory sync is paired. To change the IdP trust configuration, unpair the directory, update the provider, and then pair it again.

## Options / Props

Options used on this page; every plugin option, provider field, endpoint, and the `ssoProvider` schema are in [sso-reference.md](./sso-reference.md).

| Option | Type | Description |
| --- | --- | --- |
| `providersLimit` | `number \| (user) => Awaitable<number>` | Maximum providers each user can register. `0` disables registration. Defaults to `10`. |
| `defaultSSO` | `array` | Providers defined in code, checked before the database. |
| `guardProviderMutation` | `(input, context) => Awaitable<void>` | Throw to reject an update or delete of a stored provider (409 `SSO_PROVIDER_MUTATION_REJECTED`). |
| `domainVerification` | `{ enabled?: boolean; tokenPrefix?: string }` | Requires DNS proof of domain ownership before a provider can sign users in. |
| `disableImplicitSignUp` | `boolean` | Stops SSO sign-in from creating new users. Defaults to `false`. |

## Notes

- Source: https://www.better-auth.com/docs/plugins/sso (better-auth v1.7.23 docs)
- Source (1.7 changes): https://www.better-auth.com/docs/guides/1-7-upgrade-guide (better-auth v1.7.23 docs)
- Docs split in 1.7.23: the former single SSO page is now index + OIDC, SAML, SAML security, users and organizations, domain verification, and reference pages.
- Self-service SSO, where customers configure their own connection through an onboarding link, is available with Better Auth Infrastructure. For a fixed set of providers configured in code, the official docs point to the Generic OAuth plugin or social providers; to let other apps sign in with yours, use the OAuth Provider plugin.
- Changed in 1.7: the account subject is protocol-defined. OIDC uses the verified `sub`; SAML uses the signed `NameID`. `oidcConfig.mapping.id` and `samlConfig.mapping.id` are removed. Remove `id` from every mapping and rewrite stored account rows from a trusted IdP-derived mapping if you used `mapping.id`.
- Changed in 1.7: `/sso/update-provider` rejects a partial OIDC or SAML mapping object; send a complete mapping (per the 1.7 upgrade guide; the SSO page adds that a supplied `mapping` replaces the whole previous mapping).
- Changed in 1.7: SAML configuration is simplified. The ACS URL is derived automatically from `baseURL` and `providerId`, the endpoint path changed from `/sso/saml2/callback/:providerId` to `/sso/saml2/sp/acs/:providerId`, and `samlConfig.callbackUrl` is the post-login destination, not an ACS URL. See the SAML page.
- Changed in 1.7: OIDC SSO with discovery works on Cloudflare Workers; a discovery or token endpoint that redirects is rejected with a configuration error (`oidc_endpoint_redirect`).
- Domain verification is required for automatic organization assignment from another sign-in method. If a provider is updated or deleted during DNS verification, the request returns `409` `SSO_PROVIDER_CHANGED`.

## Related

- [sso-oidc.md](./sso-oidc.md)
- [sso-saml.md](./sso-saml.md)
- [sso-saml-security.md](./sso-saml-security.md)
- [sso-provisioning.md](./sso-provisioning.md)
- [sso-domain-verification.md](./sso-domain-verification.md)
- [sso-reference.md](./sso-reference.md)
- [SAML SSO with Okta](../guides/saml-sso-with-okta.md)
