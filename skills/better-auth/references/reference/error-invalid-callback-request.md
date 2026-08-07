# invalid_callback_request

## Signature / Usage

```
Error code: invalid_callback_request
```

This error occurs during OAuth callback processing when the incoming request cannot be properly parsed or is missing required fields needed to complete the authentication flow.

## Notes

- Causes:
  - Infrastructure issues: reverse proxies (Vercel, Cloudflare, Nginx) or CDNs may strip query or body parameters
  - Encoding problems: double-encoding or improper URL encoding causes parsing failures
  - URL mismatch: callback URL mismatches at the provider trigger intermediate redirects that drop parameters
  - Routing problems: middleware or route grouping sends requests to incorrect handlers
  - Parameter loss: very long URLs get truncated by intermediaries, or fragments are used instead of query/body
- Verify callback configuration: ensure your provider sends requests using the correct HTTP method (typically GET with query parameters for Authorization Code flow), and that required OAuth parameters like `code` and `state` are included
- Preserve parameters through infrastructure: check that proxies and app rewrites forward the complete query string and request body unchanged; if middleware intercepts callbacks, verify it forwards all parameters without modification
- Debug the request: use browser DevTools -> Network tab to inspect the actual callback request, verify parameters are present and properly formatted, and compare environment-specific credentials across dev/staging/prod
- Edge cases:
  - Mobile/WebView deep-links can drop query parameters during handoff
  - Some providers return parameters in URL fragments; servers won't receive these — ensure the provider uses query/body
  - HTTP -> HTTPS redirects can lose parameters if misconfigured
- Callback parameters are normally handled automatically by Better Auth. If this error appears, it often indicates manual access to the `/api/auth/callback` route, a proxy/redirect that stripped parameters, or an integration mismatch

## Related

- [errors](./errors.md)
- [no_code](./error-no-code.md)
