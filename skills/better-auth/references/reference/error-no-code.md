# no_code

## Signature / Usage

```
Error code: no_code
```

This error occurs during the OAuth callback when the authorization code is missing from the request. The OAuth provider should redirect back to your `/api/auth/callback` route with a `code` parameter, but it's absent.

## Notes

- Causes:
  1. Incorrect OAuth flow initiation — wrong response type or custom URL missing required parameters
  2. Provider error response — user canceled consent, so only `error`/`error_description` are present instead of `code`
  3. Query parameter stripping — infrastructure (reverse proxy, CDN, framework rewrite) removed query parameters
  4. Callback URL mismatch — provider's configured redirect URI doesn't match your `/api/auth/callback` route exactly
  5. Mobile/WebView issues — deep-link handoff opened a new context that lost the query string
  6. Wrong response mode — handler expects query parameters but received form_post body
- Use standard authorization code flow: start the OAuth flow through Better Auth to ensure the provider receives correct parameters and your app expects a `code`
- Verify callback URL and parameter delivery: confirm the provider's configured redirect URI matches your `/api/auth/callback` route exactly (protocol, host, path), and ensure infrastructure (proxies, rewrites, middleware) preserves the full query string
- Debug locally:
  - Inspect the callback request in DevTools -> Network to verify whether `code` or `error` parameters are present
  - Log raw query/body received by the callback handler during development
  - Compare dev/staging/prod credentials and redirect URIs for consistency

## Related

- [invalid_code](./error-invalid-code.md)
- [errors](./errors.md)
