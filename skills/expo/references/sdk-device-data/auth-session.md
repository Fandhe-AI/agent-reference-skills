---
source: https://docs.expo.dev/versions/v58.0.0/sdk/auth-session/
---

# AuthSession

`expo-auth-session` enables web browser-based authentication (for example, browser-based OAuth flows) by using WebBrowser and Crypto. It supports general-purpose OAuth and OpenID Connect workflows.

## Signature / Usage

`expo-crypto` is a peer dependency and must be installed alongside `expo-auth-session`.

```sh
npx expo install expo-auth-session expo-crypto
```

```js
import * as AuthSession from 'expo-auth-session';
```

```ts
// Hook-based flow: returns a loaded request, a response, and a prompt method
const [request, response, promptAsync] = useAuthRequest({ ... }, { ... });

// OpenID Connect issuer auto discovery
const discovery = useAutoDiscovery('https://example.com/auth');
```

Build a redirect URI:

```ts
const redirectUri = makeRedirectUri({
  scheme: 'my-scheme',
  path: 'redirect'
});
// Development Build: my-scheme://redirect
// Expo Go: exp://127.0.0.1:8081/--/redirect
// Web dev: https://localhost:19006/redirect
// Web prod: https://yourwebsite.com/redirect

const redirectUri2 = makeRedirectUri({
  scheme: 'scheme2',
  preferLocalhost: true,
  isTripleSlashed: true,
});
// Development Build: scheme2:///
// Expo Go: exp://localhost:8081
// Web dev: https://localhost:19006
// Web prod: https://yourwebsite.com
```

Using `AuthRequest` directly:

```ts
// Create a request.
const request = new AuthRequest({ ... });

// Prompt for an auth code
const result = await request.promptAsync(discovery);

// Get the URL to invoke
const url = await request.makeAuthUrlAsync(discovery);

// Parse the URL returned from the server
const parsed = request.parseReturnUrl("<URL From Server>");
```

Deep-link scheme in app config (required to deep link back into the app; build a new standalone app after adding it):

```json
{
  "expo": {
    "scheme": "mycoolredirect"
  }
}
```

For existing React Native apps, add and verify a scheme with the `uri-scheme` CLI:

```sh
npx uri-scheme add mycoolredirect
npx uri-scheme list
npx uri-scheme open mycoolredirect://some/redirect
```

## Options / Props

All entries are supported on Android, iOS and Web.

Hooks:

| Name | Returns | Description |
| --- | --- | --- |
| `useAuthRequest(config: AuthRequestConfig, discovery: DiscoveryDocument \| null)` | `[AuthRequest \| null, AuthSessionResult \| null, (options: AuthRequestPromptOptions) => Promise<AuthSessionResult>]` | Loads an authorization request for a code. `request` is `null` until loaded; `response` is `null` until `promptAsync` is invoked. Only `authorizationEndpoint` is required in `discovery` for an authorization code. If an Implicit grant was used, pass `response.params` to `TokenResponse.fromQueryParams()` to get a refreshable `TokenResponse`. |
| `useAuthRequestResult(request: AuthRequest \| null, discovery: DiscoveryDocument \| null, customOptions?: AuthRequestPromptOptions)` | `[AuthSessionResult \| null, PromptMethod]` | Result hook for an existing request. |
| `useAutoDiscovery(issuerOrDiscovery: IssuerOrDiscovery)` | `DiscoveryDocument \| null` | Fetches the `DiscoveryDocument` from an OpenID Connect issuer URL; `null` until fetched. |
| `useLoadedAuthRequest(config, discovery, AuthRequestInstance)` | `AuthRequest \| null` | Loads the given `AuthRequest` instance. |

Methods (`AuthSession.*`):

| Name | Returns | Description |
| --- | --- | --- |
| `dismiss()` | `void` | Cancels an active `AuthSession`. |
| `exchangeCodeAsync(config: AccessTokenRequestConfig, discovery: Pick<DiscoveryDocument, 'tokenEndpoint'>)` | `Promise<TokenResponse>` | Exchanges an authorization code for an access token. |
| `fetchDiscoveryAsync(issuer: string)` | `Promise<DiscoveryDocument>` | Fetches a `DiscoveryDocument` from a well-known provider that supports auto discovery. |
| `fetchUserInfoAsync(config: Pick<TokenResponse, 'accessToken'>, discovery: Pick<DiscoveryDocument, 'userInfoEndpoint'>)` | `Promise<Record<string, any>>` | Fetches user info from the OpenID Connect `userInfoEndpoint` (if supported). |
| `getCurrentTimeInSeconds()` | `number` | Current time in seconds. |
| `getDefaultReturnUrl(urlPath?, options?)` | `string` | Deprecated: use `makeRedirectUri()` instead. |
| `getRedirectUrl(path?: string)` | `string` | Redirect URL such as `https://auth.expo.io/@your-username/your-app-slug`; throws in an existing React Native project on native. |
| `issuerWithWellKnownUrl(issuer: string)` | `string` | Appends the well-known path and OpenID Connect discovery document path to a URL. |
| `loadAsync(config: AuthRequestConfig, issuerOrDiscovery: IssuerOrDiscovery)` | `Promise<AuthRequest>` | Builds and loads an `AuthRequest`. |
| `makeRedirectUri(options?: AuthSessionRedirectUriOptions)` | `string` | Redirect URL for the current platform and environment. `options` default `{}`. Web: derived from `window.location` (hard code for production web). CNG projects: uses the `scheme` of the app config. Existing React Native apps: falls back to the `native` option. |
| `refreshAsync(config: RefreshTokenRequestConfig, discovery: Pick<DiscoveryDocument, 'tokenEndpoint'>)` | `Promise<TokenResponse>` | Refreshes an access token. No `refresh_token` from the provider: may not be refreshable. No `expires_in`: assumed not to expire. Use `TokenResponse.isTokenFresh()` or `shouldRefresh()` to decide. |
| `requestAsync(requestUrl: string, fetchRequest: FetchRequest)` | `Promise<T>` | Generic request helper. |
| `resolveDiscoveryAsync(issuerOrDiscovery: IssuerOrDiscovery)` | `Promise<DiscoveryDocument>` | Resolves the discovery document from an issuer or object. |
| `revokeAsync(config: RevokeTokenRequestConfig, discovery: Pick<DiscoveryDocument, 'revocationEndpoint'>)` | `Promise<boolean>` | Revokes a token with the provider. Rejects if the provider has no `revocationEndpoint` or the request fails; many providers do not support it. |

Classes:

| Class | Description |
| --- | --- |
| `AuthRequest` | Manages an authorization request (RFC 6749 section 4.1.1); implements `Omit<AuthRequestConfig, 'state'>`. Properties: `codeVerifier?: string`, `state: string` (CSRF protection), `url: string \| null` (default `null`). Methods: `getAuthRequestConfigAsync(): Promise<AuthRequestConfig>`, `makeAuthUrlAsync(discovery: AuthDiscoveryDocument): Promise<string>`, `parseReturnUrl(url: string): AuthSessionResult`, `promptAsync(discovery: AuthDiscoveryDocument, promptOptions?: AuthRequestPromptOptions): Promise<AuthSessionResult>`. |
| `Request<T, B>` | Base request: `getQueryBody(): Record<string, string>`, `getRequestConfig(): T`, `performAsync(discovery: DiscoveryDocument): Promise<B>`. |
| `TokenRequest<T>` | Generic token request (extends `Request<T, TokenResponse>`); `grantType: GrantType`, `getHeaders()`, `getQueryBody()`, `getRequestConfig()`, `performAsync(discovery: Pick<DiscoveryDocument, 'tokenEndpoint'>): Promise<TokenResponse>`. |
| `AccessTokenRequest` | Exchanges an authorization code for an access token (RFC 6749 section 4.1.3); extends `TokenRequest<AccessTokenRequestConfig>`. |
| `RefreshTokenRequest` | Refresh request (RFC 6749 section 6); extends `TokenRequest<RefreshTokenRequestConfig>`. |
| `RevokeTokenRequest` | Revocation request for a token (RFC 7009 section 2.1); extends `Request<RevokeTokenRequestConfig, boolean>`; `performAsync(discovery: Pick<DiscoveryDocument, 'revocationEndpoint'>): Promise<boolean>`. |
| `TokenResponse` | Token response (RFC 6749 section 5.1); implements `TokenResponseConfig`. `rawResponse?: unknown` holds the unprocessed response. Static `fromQueryParams(params: Record<string, any>)`, `isTokenFresh(token: Pick<TokenResponse, 'expiresIn' \| 'issuedAt'>, secondsMargin?: number)`, `refreshAsync(config, discovery)`; instance `getRequestConfig()`, `shouldRefresh()`. |
| `ResponseError` | Extends `CodedError` (RFC 6749 section 4.1.2.1); properties `code: string`, `description?: string`, `info?: any`, `params: Record<string, string>`, `uri?: string`. |
| `AuthError` | Extends `ResponseError` (RFC 6749 section 5.2); adds `state?: string`; fills in missing descriptions for provider error codes. |
| `TokenError` | Extends `ResponseError` (RFC 6749 section 4.1.2.1). |

`AuthRequestConfig`:

| Property | Type | Description |
| --- | --- | --- |
| clientId | `string` | Client identifier; not a secret. |
| clientSecret (optional) | `string` | Provider client secret. There is no secure way to store this on the client. |
| codeChallenge (optional) | `string` | Derived from the code verifier by `CodeChallengeMethod`. |
| codeChallengeMethod (optional) | `CodeChallengeMethod` | Default: `CodeChallengeMethod.S256`. Never use `Plain`. |
| extraParams (optional) | `Record<string, string>` | Extra query params. |
| prompt (optional) | `Prompt \| Prompt[]` | Whether to prompt the user to login or consent again. |
| redirectUri | `string` | Where the server redirects after the interaction. |
| responseType (optional) | `ResponseType \| string` | Default: `ResponseType.Code` |
| scopes (optional) | `string[]` | Scopes to request. |
| state (optional) | `string` | CSRF protection. |
| usePKCE (optional) | `boolean` | Use Proof Key for Code Exchange. Default: `true` |

`AuthSessionRedirectUriOptions` (all optional): `isTripleSlashed: boolean` (`scheme:///path` vs `scheme://path`, default `false`), `native: string` (manual scheme for existing React Native projects and production builds; takes precedence over all other properties), `path: string` (not appended to `native`), `preferLocalhost: boolean` (convert the Expo server IP to localhost; iOS simulator only; default `false`), `queryParams: Record<string, string \| undefined>`, `scheme: string`.

`AuthRequestPromptOptions`: `Omit<AuthSessionOpenOptions, 'windowFeatures'>` (from WebBrowser) plus `url?: string` (usually left undefined) and `windowFeatures?: WebBrowserWindowFeatures` (Web).

`AuthSessionResult`:

| Result | Shape |
| --- | --- |
| Cancel / dismiss / opened / locked | `{ type: 'cancel' \| 'dismiss' \| 'opened' \| 'locked' }` — `cancel` when the user closes the browser; `dismiss` when `AuthSession.dismiss()` is used. |
| Success / error | `{ type: 'success' \| 'error', authentication: TokenResponse \| null, error?: AuthError \| null, errorCode: string \| null (deprecated: use error), params: Record<string, string>, url: string }` |

Other types:

| Type | Definition |
| --- | --- |
| `DiscoveryDocument` | Optional `authorizationEndpoint`, `discoveryDocument` (`ProviderMetadata`), `endSessionEndpoint`, `registrationEndpoint`, `revocationEndpoint`, `tokenEndpoint`, `userInfoEndpoint` (all `string` except `discoveryDocument`). Some providers (such as Spotify) have no revocation endpoint. |
| `AuthDiscoveryDocument` | `Pick<DiscoveryDocument, 'authorizationEndpoint'>` |
| `Issuer` / `IssuerOrDiscovery` | `string` (https URL with no query or fragment) / `Issuer \| DiscoveryDocument` |
| `AccessTokenRequestConfig` | `TokenRequestConfig` plus `code: string`, `redirectUri: string` |
| `RefreshTokenRequestConfig` | `TokenRequestConfig` plus `refreshToken?: string` |
| `RevokeTokenRequestConfig` | `Partial<TokenRequestConfig>` plus `token: string`, `tokenTypeHint?: TokenTypeHint` |
| `TokenRequestConfig` | `clientId: string`, `clientSecret?`, `extraHeaders?: Record<string, string>`, `extraParams?: Record<string, string>`, `scopes?: string[]` |
| `TokenResponseConfig` | `accessToken: string`, `expiresIn?: number`, `idToken?`, `issuedAt?: number`, `refreshToken?`, `scope?`, `state?`, `tokenType?: TokenType` |
| `ServerTokenResponseConfig` | `access_token`, `expires_in?`, `id_token?`, `issued_at?`, `refresh_token?`, `scope?`, `token_type?` |
| `TokenType` | `'bearer' \| 'mac'` |
| `ResponseErrorConfig` / `AuthErrorConfig` | `{ error: string, error_description?: string, error_uri?: string }` / plus `state?: string` |
| `ProviderAuthRequestConfig` | `AuthRequestConfig` plus `language?: string` |
| `GoogleAuthRequestConfig` | `ProviderAuthRequestConfig` plus `androidClientId?`, `iosClientId?`, `webClientId?`, `language?`, `loginHint?`, `selectAccount?: boolean` (default `false`), `shouldAutoExchangeCode?: boolean` (default `true` on installed apps when `ResponseType.Code`). Marked deprecated in the source: see Google authentication guide. |
| `FacebookAuthRequestConfig` | `ProviderAuthRequestConfig` plus `androidClientId?`, `iosClientId?`, `webClientId?`. Marked deprecated in the source: see Facebook authentication guide. |
| `FetchRequest` | `body?: Record<string, string>`, `dataType?: string`, `headers?: Headers`, `method?: string` |
| `Headers` | `Record<string, string>` plus `Accept?`, `Authorization?`, `Content-Type` |
| `PromptMethod(options?)` | `Promise<AuthSessionResult>` |
| `ProviderMetadata` / `ProviderMetadataEndpoints` | OpenID Connect provider metadata (`authorization_endpoint`, `token_endpoint`, `jwks_uri`, `scopes_supported`, `code_challenge_methods_supported`, `token_endpoint_auth_methods_supported`, etc.). |

Enums:

| Enum | Values |
| --- | --- |
| `CodeChallengeMethod` | `Plain = "plain"` (should not be used), `S256 = "S256"` (default; SHA256 digest of the ASCII code verifier, Base64 URL-encoded) |
| `GrantType` | `AuthorizationCode = "authorization_code"`, `ClientCredentials = "client_credentials"`, `Implicit = "implicit"`, `RefreshToken = "refresh_token"` |
| `Prompt` | `Consent = "consent"`, `Login = "login"`, `None = "none"`, `SelectAccount = "select_account"` |
| `ResponseType` | `Code = "code"`, `IdToken = "id_token"` (custom type for an `id_token` from Google OAuth), `Token = "token"` (implicit grant) |
| `TokenTypeHint` | `AccessToken = "access_token"`, `RefreshToken = "refresh_token"` |

## Notes

- Platforms (frontmatter `platforms`): Android, iOS, Web, Included in Expo Go.
- Where available, use a library supplied by the identity provider (the source recommends `@react-native-google-signin/google-signin` for Google and `react-native-fbsdk-next` for Facebook). The usage guides moved to the Authentication guide (https://docs.expo.dev/guides/authentication/).
- To close the popup window on web, invoke `WebBrowser.maybeCompleteAuthSession()`.
- Without a `scheme`, the flow completes but cannot pass information back to the app, and the user must manually exit the authentication modal (a canceled event).
- Allowlist redirect URLs at the provider to prevent malicious actors from pretending to be your application. Never put secret keys inside application code: store them on a server and expose an endpoint that calls the provider API for your client.
- Linking handlers: `AuthSession` adds `+expo-auth-session` to the default `returnUrl`; in your own `Linking.addEventListener` handlers ignore URLs containing it (add a similar identifier if you provide your own `returnUrl`). With React Navigation, add a custom `getStateFromPath` function to the linking configuration and filter by URL in the same way.
- Distinct from authentication backends: this page is the client-side OAuth / OpenID Connect API of Expo. Server-side auth platforms and their Expo integrations are covered by the better-auth and supabase skills.
- The source usage example calls parseReturnUrlAsync, but the API section defines only the synchronous parseReturnUrl(url); the example uses the latter.
- Source code: https://github.com/expo/expo/tree/sdk-58/packages/expo-auth-session

## Related

- [WebBrowser](./web-browser.md)
- [Crypto](./crypto.md)
- [AppleAuthentication](./apple-authentication.md)
