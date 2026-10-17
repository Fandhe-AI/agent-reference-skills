# Custom OAuth/OIDC Providers

Add any OAuth2 or OIDC-compatible identity provider to your Supabase project.

## Signature / Usage

Custom OAuth/OIDC providers let you integrate any standards-compliant identity provider with Supabase Auth, beyond the ones Supabase supports out of the box.

Each custom provider uses a `custom:` prefix in its identifier (for example, `custom:my-idp` or `custom:github-enterprise`). This prefix distinguishes custom providers from built-in providers. Identifiers are 2-50 characters, lowercase alphanumeric with hyphens and colons allowed.

There are two provider types:

- OAuth2: for generic OAuth2 providers where you supply the authorization, token, and userinfo endpoints manually.
- OIDC: for providers that support OpenID Connect discovery. You supply only the issuer URL and endpoints are resolved automatically.

Free plan projects can add up to 3 custom providers. Pro plan and above have unlimited custom providers.

The create form displays a read-only Callback URL. Copy this URL and configure it as the redirect/callback URI in your external identity provider before completing setup.

### Creating a provider

OAuth2 provider (use when your identity provider does not support OpenID Connect discovery; you must supply the authorization, token, and userinfo endpoint URLs explicitly):

```js
const { data, error } = await supabase.auth.admin.customProviders.createProvider({
  provider_type: 'oauth2',
  identifier: 'custom:my-oauth-provider',
  name: 'My OAuth Provider',
  client_id: 'your-client-id',
  client_secret: 'your-client-secret',
  authorization_url: 'https://provider.example.com/oauth/authorize',
  token_url: 'https://provider.example.com/oauth/token',
  userinfo_url: 'https://provider.example.com/oauth/userinfo',
  scopes: ['profile', 'email'],
})
```

OIDC provider (supply the `issuer` URL and the discovery document, JWKS, and endpoints are resolved automatically):

```js
const { data, error } = await supabase.auth.admin.customProviders.createProvider({
  provider_type: 'oidc',
  identifier: 'custom:my-regional-provider',
  name: 'Regional Provider',
  client_id: 'your-client-id',
  client_secret: 'your-client-secret',
  issuer: 'https://auth.example.com',
  scopes: ['openid', 'profile', 'email'],
})
```

OIDC providers have the following automatic behavior:

- The discovery document is fetched from `{issuer}/.well-known/openid-configuration` (or from `discovery_url` if set).
- The `openid` scope is always included. It is automatically added if missing from the `scopes` array.
- ID tokens are verified against the provider's JWKS (fetched from the discovery document's `jwks_uri`).

### User sign-in

Once a custom provider is created and enabled, users sign in via the standard OAuth authorize endpoint:

```text
GET https://your-project.supabase.co/auth/v1/authorize?provider=custom:my-provider
```

Or using the Supabase client libraries:

```js
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'custom:my-provider',
})
```

### Managing providers

```js
// List all custom providers, optionally filtered by provider type
const { data, error } = await supabase.auth.admin.customProviders.listProviders({
  type: 'oidc',
})

// Update: any field except provider_type and identifier; only provided fields change
const { data, error } = await supabase.auth.admin.customProviders.updateProvider(
  'custom:my-provider',
  {
    name: 'Updated Provider Name',
    scopes: ['profile', 'email', 'groups'],
    enabled: false,
  }
)

// Delete
const { data, error } =
  await supabase.auth.admin.customProviders.deleteProvider('custom:my-provider')
```

To rotate a client secret, update only the `client_secret` field.

### Advanced configuration

- PKCE: enabled by default (`pkce_enabled: true`) for all custom providers. The auth server automatically generates a code challenge and verifier during the authorization flow; this is handled entirely server-side. To disable it for a specific provider, set `pkce_enabled: false` when creating or updating it. This is not recommended unless the identity provider does not support PKCE.
- Authorization params: extra query parameters appended to the provider's authorization URL during the OAuth flow. All values must be strings. The following reserved parameters are managed by the auth server and cannot be overridden: `client_id`, `client_secret`, `redirect_uri`, `response_type`, `state`, `code_challenge`, `code_challenge_method`, `code_verifier`, `nonce`.
- Multi-platform apps: if your app uses different client IDs for different platforms (for example, web vs mobile), use `acceptable_client_ids` to list additional client IDs that should be accepted for audience validation in OIDC ID tokens.
- Email-optional providers: by default, providers must return an email address. Set `email_optional` to `true` when creating or updating a provider to allow sign-in without an email. This applies to both OAuth2 and OIDC providers.

## Options / Props

OIDC-specific options:

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `discovery_url` | `string` | `null` | Override the discovery document URL if the provider uses a non-standard location. |
| `skip_nonce_check` | `bool` | `false` | Skip nonce validation on ID tokens. Use only for providers that do not support nonce. |

Error reference:

| Error code | HTTP status | Description |
| --- | --- | --- |
| `validation_failed` | 400 | Invalid parameters: missing required fields, bad format, reserved params, or invalid URLs. |
| `conflict` | 400 | A provider with the same identifier already exists. |
| `over_custom_provider_quota` | 400 | Maximum number of custom providers reached. |
| `custom_provider_not_found` | 404 | No provider exists with the given identifier. |

## Notes

- The official page also shows Flutter (`OAuthProvider('custom:my-provider')`), Swift (`signInWithOAuth(provider: "custom:my-provider", redirectTo: ...)`), and Kotlin (`CustomProvider("custom:my-provider")`) sign-in examples.
- Dashboard: Auth Providers > New Provider > Manual configuration (OAuth2) or Auto-discovery (OIDC). Custom providers are listed under Custom OAuth Providers.
- Source: https://supabase.com/docs/guides/auth/custom-oauth-providers (fetched 2026-10)

## Related

- [Social login](./social-login.md)
- [Third-party auth](./third-party-auth.md)
- [Redirect URLs](./redirect-urls.md)
- [Error codes](./error-codes.md)
