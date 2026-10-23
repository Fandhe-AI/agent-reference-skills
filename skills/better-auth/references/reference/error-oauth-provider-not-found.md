# oauth_provider_not_found

## Signature / Usage

```
Error code: oauth_provider_not_found
```

This error occurs when Better Auth cannot identify which OAuth provider should handle a callback request. The system expects a specific provider identifier in the callback URL path but cannot find it.

## Notes

- Causes: the callback route is missing the provider segment, or the path structure is incorrect. Typical triggers:
  - Accessing `/api/auth/callback` directly without specifying a provider (e.g., `/api/auth/callback/google`)
  - Infrastructure (proxy, CDN, or rewrite rules) strips the final path segment
  - Trailing slash inconsistencies between environments affect routing
- Correct callback route structure: ensure your application exposes routes matching the pattern `/api/auth/callback/[provider]`. When initiating OAuth flows, verify the redirect URI includes the provider identifier so callbacks arrive at `/api/auth/callback/<provider>`
- Check infrastructure configuration: review proxy and CDN settings (Vercel, Cloudflare, Nginx) to confirm they preserve the complete path, and align trailing slash behavior consistently across all environments
- Avoid direct access: don't navigate to the base callback route manually; always initiate OAuth through Better Auth APIs, which automatically generate correct provider-specific URLs
- Debug steps:
  - Log only the request path (e.g. `/api/auth/callback/<provider>`), not the full URL: the query string carries `code` and `state`
  - Verify the `<provider>` path parameter exists in your router
  - Compare route configurations across development and production environments
- Debug tip: log only the request path, not the full URL, because the query string carries `code` and `state` (Adapted from the official docs)

## Related

- [errors](./errors.md)
