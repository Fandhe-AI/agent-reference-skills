# Security

Comprehensive reference for Better Auth's security guidelines and best practices.

## Signature / Usage

```typescript
betterAuth({
  trustedOrigins: [
    "https://example.com",
    "https://*.example.com",       // HTTPS only, all subdomains
    "exp://192.168.*.*:*/**",      // custom scheme with path
  ],
  advanced: {
    trustedProxyHeaders: true,     // derive base URL from proxy headers
  },
})
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `trustedOrigins` | `string[] \| async function` | — | Origins allowed to prevent CSRF and open redirects; supports wildcard patterns and custom schemes |
| `advanced.disableCSRFCheck` | `boolean` | `false` | Disable all CSRF protection, including origin validation and Fetch Metadata checks |
| `advanced.disableOriginCheck` | `boolean` | `false` | Disable `trustedOrigins` validation for `callbackURL`, `redirectTo`, `errorCallbackURL`, `newUserCallbackURL`; also disables CSRF protection for backward compatibility |
| `advanced.ipAddress.ipAddressHeaders` | `string[]` | `X-Forwarded-For` | Custom headers used for IP address detection |
| `advanced.trustedProxyHeaders` | `boolean` | — | Derive base URL from `X-Forwarded-Host` / `X-Forwarded-Proto` headers, supporting multi-domain deployments |
| `advanced.crossSubDomainCookies` | `object` | — | Configure cookie sharing across subdomains |
| `password` | `object` | `scrypt` | Custom `hash`/`verify` functions for password hashing |
| `secrets` | `Array<{ version: number; value: string }>` | — | Versioned secrets for non-destructive `BETTER_AUTH_SECRET` rotation |

## Notes

- **Password hashing**: `scrypt` by default, memory-hard and CPU-intensive to resist brute-force attacks. Customizable via the `password` option's `hash`/`verify` functions.
- **Secret rotation**: non-destructive rotation of `BETTER_AUTH_SECRET` via versioned `secrets` or the `BETTER_AUTH_SECRETS` env var. Encrypted data carries version identifiers; decryption uses direct key lookup without trial attempts. Legacy data stays decryptable via the original secret as a fallback, with lazy re-encryption on subsequent writes — no migrations required.
- **Session management**: default lifespan 7 days (customizable); `updateAge` threshold 1 day by default, automatically extending expiration on use; sessions stored in database or secondary storage. Users can revoke sessions to log out from specific devices/browsers.
- **CSRF protection** combines five safeguards: only requests with non-simple headers or `Content-Type: application/json` are accepted; the `Origin` header is validated against the base URL and `trustedOrigins`; session cookies default to `SameSite=Lax` (override via `defaultCookieAttributes`); "first-login CSRF" protection via `Sec-Fetch-Site`/`Sec-Fetch-Mode`/`Sec-Fetch-Dest` headers blocks cross-site navigation requests without cookies, falling back to origin validation when Fetch Metadata headers are absent; GET requests are assumed read-only, and mutations like OAuth callbacks validate `nonce`/`state` parameters.
- **OAuth & state management**: OAuth state and PKCE values are stored in the database to prevent CSRF attacks and code injection; values are automatically removed once the flow completes.
- **Cookie security**: encryption enabled by default for HTTPS base URLs; `HttpOnly` prevents client-side JS access; `SameSite=lax` by default; cross-subdomain sharing configurable via `crossSubDomainCookies`; cookie names are customizable to minimize fingerprinting risk.
- **Rate limiting**: built-in protection against brute-force attacks across all routes, with stricter limits on high-risk endpoints.
- **IP address & proxy headers**: IP detection defaults to `X-Forwarded-For`, configurable via `ipAddress.ipAddressHeaders`, with a `127.0.0.1` fallback in dev/test — ensure proxies can't be spoofed by end users. When `trustedProxyHeaders` is enabled, the base URL is derived from `X-Forwarded-Host`/`X-Forwarded-Proto`; resolution priority is static `baseURL` > env vars (`BETTER_AUTH_URL`, `NEXT_PUBLIC_BETTER_AUTH_URL`) > proxy headers (when enabled) > request URL origin fallback. Only enable when proxy headers are trustworthy and reverse proxies are configured correctly.
- **Trusted origins**: prevent CSRF attacks and open redirects. Remove `localhost` from production instances. Supports wildcard patterns (`*.example.com`, `https://*.example.com`, `http://*.dev.example.com`) and custom schemes for mobile/extensions (`myapp://`, `chrome-extension://EXTENSION_ID`, `exp://**`, `exp://10.0.0.*:*/**`). Can also be an async function evaluated per request — this has performance implications for dynamic fetching.
- **Email enumeration protection**: when `requireEmailVerification` is enabled or `autoSignIn` is `false`, sign-up endpoints return identical `200` responses regardless of email registration status (OWASP best practice); timing attacks are mitigated through password hash simulation on duplicate attempts.
- **Security reporting**: discovered vulnerabilities should be reported to `security@better-auth.com` for prompt remediation, with credit given for validated discoveries.
- Better Auth implements defense-in-depth through multiple layers — encryption, origin validation, state management, rate limiting, and Fetch Metadata protection — requiring careful configuration of `trustedOrigins` and proxy headers for production deployments.

## Related

- [options](./options.md)
