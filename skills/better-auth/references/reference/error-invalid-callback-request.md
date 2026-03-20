# invalid_callback_request

## 説明

This error occurs during OAuth callback processing when the incoming request cannot be properly parsed or is missing required fields needed to complete the authentication flow.

## 原因

- **Infrastructure issues**: Reverse proxies (Vercel, Cloudflare, Nginx) or CDNs may strip query or body parameters
- **Encoding problems**: Double-encoding or improper URL encoding causes parsing failures
- **URL mismatch**: Callback URL mismatches at the provider trigger intermediate redirects that drop parameters
- **Routing problems**: Middleware or route grouping sends requests to incorrect handlers
- **Parameter loss**: Very long URLs get truncated by intermediaries, or fragments are used instead of query/body

## 対処法

### Verify Callback Configuration

Ensure your provider sends requests using the correct HTTP method (typically GET with query parameters for Authorization Code flow). Confirm required OAuth parameters like `code` and `state` are included.

### Preserve Parameters Through Infrastructure

Check that proxies and app rewrites forward the complete query string and request body unchanged. If middleware intercepts callbacks, verify it forwards all parameters without modification.

### Debug the Request

Use browser DevTools -> Network tab to inspect the actual callback request. Verify parameters are present and properly formatted. Compare environment-specific credentials across dev/staging/prod.

### Handle Edge Cases

- Mobile/WebView deep-links can drop query parameters during handoff
- Some providers return parameters in URL fragments; servers won't receive these — ensure the provider uses query/body
- HTTP -> HTTPS redirects can lose parameters if misconfigured

**Key Point**: "Callback parameters are normally handled automatically by Better Auth. If this error appears, it often indicates manual access to the `/api/auth/callback` route, a proxy/redirect that stripped parameters, or an integration mismatch."
