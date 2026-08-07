# state_not_found

## Notes

- Occurs when Better Auth cannot find the `state` parameter in an OAuth callback request. The `state` value is a security token generated at the start of an OAuth flow and must be present when the provider redirects back.
- Common causes: navigating directly to `/api/auth/callback` without initiating an OAuth flow; reverse proxies, CDNs, or rewrites stripping query/body parameters; the OAuth provider not configured with the correct `state` value; a callback URL mismatch between provider configuration and implementation; routing issues sending the request to an unexpected handler; mobile/WebView context loss of query parameters during handoff.
- Fix: always use Better Auth APIs to start OAuth flows — avoid manually constructing authorize URLs or directly accessing callback endpoints, and let Better Auth generate and manage the `state` parameter.
- Verify that the provider's configured callback URL exactly matches the `/api/auth/callback` route, including protocol and domain.
- Confirm that proxies, CDN rewrites, and middleware preserve the full query string and body parameters.
- Debug locally via DevTools -> Network: confirm the callback includes `?state=...`, verify a `state` cookie exists before the redirect, and log request query/body in the callback handler.

## Related

- [state_mismatch](./error-state-mismatch.md)
