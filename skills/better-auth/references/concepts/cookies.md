# Cookies

Better Auth uses cookies to store session tokens, session data, OAuth state, and other authentication-related information. All cookies are cryptographically signed using the `secret` key in the auth options or the `BETTER_AUTH_SECRET` environment variable. During rotation with versioned secrets, encrypted cookie data automatically uses the current key while still being decryptable with previous keys.

## Signature / Usage

### Setting a custom cookie prefix

```typescript
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  advanced: {
    cookiePrefix: "my-app",
  },
});
```

### Custom cookie names and attributes

```typescript
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  advanced: {
    cookies: {
      session_token: {
        name: "custom_session_token",
        attributes: {
          // Set custom cookie attributes
        },
      },
    },
  },
});
```

### Cross-subdomain configuration

```typescript
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  advanced: {
    crossSubDomainCookies: {
      enabled: true,
      domain: "app.example.com",
    },
  },
  trustedOrigins: [
    "https://example.com",
    "https://app1.example.com",
    "https://app2.example.com",
  ],
});
```

### Forcing secure cookies

```typescript
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  advanced: {
    useSecureCookies: true,
  },
});
```

### Safari ITP and cross-domain solutions

Safari's Intelligent Tracking Prevention (ITP) blocks third-party cookies. If the frontend and API are on different domains, authentication can fail in Safari.

Problem scenario:

```
Frontend: https://app.domainB.com
API:      https://domainA.com
```

With a request using `credentials: "include"`, Safari treats `domainA.com` as third-party, the `Set-Cookie` header is ignored, and the session fails.

**Solution 1: Reverse proxy** — route API calls through the frontend's domain.

Netlify configuration:

```toml
[[redirects]]
  from = "/api/*"
  to = "https://domainA.com/api/:splat"
  status = 200
  force = true
```

Vercel configuration:

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://domainA.com/api/:path*"
    }
  ]
}
```

**Solution 2: Shared parent domain** — use a common parent domain structure:

```
https://app.example.com
https://api.example.com
```

Enable cross-subdomain cookies:

```typescript
export const auth = betterAuth({
  advanced: {
    crossSubDomainCookies: {
      enabled: true,
      domain: "example.com",
    },
  },
});
```

## Options / Props

| Option | Purpose | Default | Type |
|--------|---------|---------|------|
| `cookiePrefix` | Prefix applied to all cookie names | `"better-auth"` | string |
| `cookies` | Custom cookie names and attributes | see defaults below | object |
| `crossSubDomainCookies.enabled` | Enable sharing across subdomains | `false` | boolean |
| `crossSubDomainCookies.domain` | Root domain for cookie sharing | — | string |
| `useSecureCookies` | Force the Secure flag even in non-production environments | `false` | boolean |

### Default cookies

| Cookie | Description |
|--------|-------------|
| `session_token` | Stores the session token |
| `session_data` | Stores session data when cookie caching is enabled |
| `dont_remember` | Stores a flag when `rememberMe` is disabled |
| `two_factor` | Used when the two-factor auth plugin is enabled (plugin-dependent) |

## Notes

- Cookie naming pattern: `${prefix}.${cookie_name}` (e.g. `better-auth.session_token`)
- Plugins may introduce additional cookies (see plugin documentation)
- Session data caching via cookies requires explicit opt-in
- Versioned secrets automatically manage cookie decryption during key rotation

### Security

- **HTTP-Only**: In production, all cookies default to `httpOnly` (preventing JavaScript access)
- **Secure flag**: In production, cookies automatically use the Secure flag
- **Domain restriction**: Enable cross-subdomain cookies only when needed, and scope the domain as narrowly as possible
- **Untrusted subdomains**: Be cautious of subdomains that could be compromised; consider a separate domain for untrusted services
- **Signing**: Cookies are cryptographically signed to prevent tampering
- **Production mode**: Non-production environments require explicitly setting `useSecureCookies: true` to enforce security

## Related

- [Session Management](./session-management.md)
- [Dynamic Base URL](./dynamic-base-url.md)
