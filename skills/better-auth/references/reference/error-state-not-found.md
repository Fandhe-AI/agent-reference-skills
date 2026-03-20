# state_not_found

## 説明

This error occurs when Better Auth cannot find the `state` parameter in an OAuth callback request. The `state` value is a security token generated at the start of an OAuth flow and must be present when the provider redirects back to your application.

## 原因

- Navigating directly to `/api/auth/callback` without initiating an OAuth flow
- Reverse proxies, CDNs, or rewrites stripping query/body parameters
- OAuth provider not configured with the correct `state` value
- Callback URL mismatch between provider configuration and actual implementation
- Routing issues causing the request to reach an unexpected handler
- Mobile/WebView context loss of query parameters during handoff

## 対処法

**1. Always use Better Auth APIs to start OAuth flows**
Avoid manually constructing authorize URLs or directly accessing callback endpoints. Let Better Auth generate and manage the `state` parameter.

**2. Verify callback URL configuration**
Ensure the provider's configured callback URL exactly matches your `/api/auth/callback` route, including protocol and domain.

**3. Check infrastructure configurations**
Confirm that proxies, CDN rewrites, and middleware preserve the full query string and body parameters.

**4. Debug locally**
Use browser DevTools -> Network tab to:
- Confirm the callback includes `?state=...` in the URL
- Verify a `state` cookie exists before the redirect
- Log request query/body in your callback handler to confirm what's received
