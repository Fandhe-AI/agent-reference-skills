# Security

Better Auth のセキュリティガイドライン・ベストプラクティスの包括的リファレンス。

## Core Security Features

### Password Hashing

Better Auth implements the `scrypt` algorithm by default, designed to be memory-hard and CPU-intensive, resisting brute-force attacks. Developers can customize this through the `password` configuration option with custom `hash` and `verify` functions.

### Secret Rotation

The platform supports non-destructive rotation of `BETTER_AUTH_SECRET` through versioned secrets configured via the `secrets` option or `BETTER_AUTH_SECRETS` environment variable. All encrypted data includes version identifiers, and decryption uses direct key lookup without trial attempts. Legacy data remains decryptable using the original secret as a fallback, with lazy re-encryption on subsequent writes — no migrations required.

### Session Management

**Expiration & Refresh:**
- Default session lifespan: 7 days (customizable)
- `updateAge` threshold: 1 day by default, automatically extending expiration upon use
- Sessions stored in database or secondary storage to prevent unauthorized access

**Revocation:**
Users can revoke sessions to log out from specific devices or browsers. Comprehensive session management documentation available in the platform's session management section.

## CSRF Protection

Better Auth implements five complementary safeguards:

1. **Non-Simple Requests:** Only requests with non-simple headers or `Content-Type: application/json` are accepted

2. **Origin Validation:** Request `Origin` headers verified against the application's base URL and `trustedOrigins` configuration

3. **Secure Cookie Settings:** Session cookies use `SameSite=Lax` by default, preventing cross-site cookie transmission. Override via `defaultCookieAttributes`

4. **Fetch Metadata Protection:** "First-login CSRF" protection using `Sec-Fetch-Site`, `Sec-Fetch-Mode`, and `Sec-Fetch-Dest` headers. Cross-site navigation requests without cookies are blocked. Same-origin requests validate against `trustedOrigins`. Browsers lacking Fetch Metadata headers fall back to origin validation when cookies present.

5. **GET Request Mutations:** GET requests assumed read-only; mutations like OAuth callbacks validate `nonce` and `state` parameters for authenticity

## Security Check Configuration

**`disableCSRFCheck`:** Disables all CSRF protection including origin validation and Fetch Metadata checks. Opens application to CSRF attacks.

**`disableOriginCheck`:** Disables URL validation against `trustedOrigins` for `callbackURL`, `redirectTo`, `errorCallbackURL`, and `newUserCallbackURL`. Also disables CSRF protection for backward compatibility. Opens application to open redirect vulnerabilities.

## OAuth & State Management

OAuth state and PKCE values stored in the database prevent CSRF attacks and code injection threats. Values automatically removed upon process completion.

## Cookie Security

- **Encryption:** Enabled by default for HTTPS base URLs
- **HttpOnly:** Prevents client-side JavaScript access
- **SameSite:** Set to `lax` by default
- **Cross-Subdomain:** Configurable via `crossSubDomainCookies` option
- **Customization:** Cookie names customizable to minimize fingerprinting attack risk

## Rate Limiting

Built-in rate limiting protects against brute-force attacks across all routes, with stricter limits on high-risk endpoints.

## IP Address & Proxy Headers

**IP Address Detection:**
- Default source: `X-Forwarded-For` header
- Configurable via `ipAddress.ipAddressHeaders` option
- Fallback (dev/test): 127.0.0.1
- Ensure proxies cannot be spoofed by end users

**Trusted Proxy Headers:**
When enabled, Better Auth derives base URL from `X-Forwarded-Host` and `X-Forwarded-Proto` headers, supporting multi-domain deployments:

```javascript
{
  advanced: {
    trustedProxyHeaders: true
  }
}
```

Base URL resolution priority:
1. Static `baseURL` from configuration
2. Environment variables (`BETTER_AUTH_URL`, `NEXT_PUBLIC_BETTER_AUTH_URL`)
3. Proxy headers (when enabled)
4. Request URL origin fallback

Only enable if proxy headers are trustworthy; configure reverse proxies correctly.

## Trusted Origins Configuration

Trusted origins prevent CSRF attacks and open redirects.

**Basic Usage:**
```javascript
{
  trustedOrigins: [
    "https://example.com",
    "https://app.example.com",
    "http://localhost:3000"
  ]
}
```
Remove localhost from production auth instances.

**Wildcard Patterns:**
```javascript
{
  trustedOrigins: [
    "*.example.com",              // Any protocol, all subdomains
    "https://*.example.com",     // HTTPS only
    "http://*.dev.example.com"   // HTTP only, specific subdomain pattern
  ]
}
```

**Custom Schemes (Mobile & Extensions):**
```javascript
{
  trustedOrigins: [
    "myapp://",
    "chrome-extension://YOUR_EXTENSION_ID",
    "exp://**",
    "exp://10.0.0.*:*/**"
  ]
}
```

**Dynamic Origin Lists:**
```javascript
{
  trustedOrigins: async (request) => {
    const trustedOrigins = await queryTrustedDomains();
    return trustedOrigins;
  }
}
```
Per-request invocation — performance implications for dynamic fetching.

## Email Enumeration Protection

When `requireEmailVerification` is enabled or `autoSignIn` is `false`, sign-up endpoints return identical `200` responses regardless of email registration status (OWASP best practice). Timing attacks mitigated through password hash simulation on duplicate attempts.

## Security Reporting

Discovered vulnerabilities should be reported to `security@better-auth.com` for prompt remediation with credit given for validated discoveries.

---

**Key Takeaway:** Better Auth implements defense-in-depth through multiple layers — encryption, origin validation, state management, rate limiting, and Fetch Metadata protection — requiring careful configuration of `trustedOrigins` and proxy headers for production deployments.
