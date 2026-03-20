# no_code

## 説明

This error occurs during the OAuth callback when the authorization code is missing from the request. The OAuth provider should redirect back to your `/api/auth/callback` route with a `code` parameter, but it's absent.

## 原因

1. **Incorrect OAuth flow initiation** — Wrong response type or custom URL missing required parameters
2. **Provider error response** — User canceled consent, so only `error`/`error_description` are present instead of `code`
3. **Query parameter stripping** — Infrastructure (reverse proxy, CDN, framework rewrite) removed query parameters
4. **Callback URL mismatch** — Provider's configured redirect URI doesn't match your `/api/auth/callback` route exactly
5. **Mobile/WebView issues** — Deep-link handoff opened a new context that lost the query string
6. **Wrong response mode** — Handler expects query parameters but received form_post body

## 対処法

### Use Standard Authorization Code Flow

Start the OAuth flow through Better Auth to ensure the provider receives correct parameters and your app expects a `code`.

### Verify Callback URL & Parameter Delivery

- Confirm the provider's configured redirect URI matches your `/api/auth/callback` route exactly (protocol, host, path)
- Ensure infrastructure (proxies, rewrites, middleware) preserves the full query string

### Debug Locally

- Inspect the callback request in DevTools -> Network to verify whether `code` or `error` parameters are present
- Log raw query/body received by the callback handler during development
- Compare dev/staging/prod credentials and redirect URIs for consistency
