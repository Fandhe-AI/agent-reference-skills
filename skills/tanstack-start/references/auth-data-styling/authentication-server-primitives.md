---
source: https://tanstack.com/start/latest/docs/framework/react/guide/authentication-server-primitives
---

# Authentication Server Primitives

Server-side primitives for DIY authentication: session cookies, session lookup middleware, OAuth `state`/PKCE, password-reset hardening, CSRF, and rate limiting. The data/API boundary (server function, server route) is the security boundary; `beforeLoad` is UX only.

## Signature / Usage

```ts
// src/server/session.ts
import { getRequestHeader, setResponseHeader } from '@tanstack/react-start/server'

const SESSION_COOKIE = '__Host-session'
const ONE_DAY = 60 * 60 * 24

export function setSessionCookie(token: string) {
  setResponseHeader(
    'Set-Cookie',
    [`${SESSION_COOKIE}=${token}`, `HttpOnly`, `Secure`, `SameSite=Lax`, `Path=/`, `Max-Age=${ONE_DAY}`].join('; '),
  )
}
```

## Session Cookie Flags

| Flag | Why |
|------|-----|
| `HttpOnly` | JavaScript can't read the cookie; XSS can't exfiltrate the session |
| `Secure` | HTTPS only; required with `__Host-` prefix |
| `SameSite=Lax` | Sent on top-level navigations; blocks most cross-site CSRF on POST |
| `__Host-` prefix | Binds cookie to exact origin, no `Domain`, `Path=/`, `Secure` required |
| `Path=/` | Required by `__Host-` |
| `Max-Age` | Bounded lifetime; pair with server-side rotation |

## Session Lookup as Middleware

```ts
// src/server/auth-middleware.ts
import { createMiddleware } from '@tanstack/react-start'
import { readSessionToken } from './session'

export const authMiddleware = createMiddleware({ type: 'function' }).server(
  async ({ next }) => {
    const token = readSessionToken()
    const session = token ? await db.sessions.findValid(token) : null
    if (!session) throw new Error('Unauthorized')
    return next({ context: { session } })
  },
)
```

## OAuth: state + PKCE

Generate a one-time random `state` and a PKCE `code_verifier`/`code_challenge` pair, store both in a short-lived signed cookie keyed to the attempt, and verify `state` on callback before exchanging the authorization code.

## Password Reset: Defeat User Enumeration

The reset endpoint must not reveal whether an email is registered — same response body, same status code, same timing (still perform the token-issue work path even for unknown emails) regardless of existence.

## CSRF for Non-GET RPCs

`SameSite=Lax` blocks most cross-site CSRF for POST/PUT/DELETE. Two cases still need explicit defense: never use GET for mutations, and verify the `Origin` header (full origin: scheme + host + port) for POST from a sibling subdomain.

## Rate Limiting

Limit login/registration/password-reset endpoints per IP (and per-account when identifiable) with a sliding window or token bucket; reject with an error when the limit is exceeded.

## Session Rotation

Destroy the old session and issue a new one whenever privileges change (login, logout, password change, role grant) — neutralizes session-fixation attacks.

## Notes

- Read cookies and env per request (inside handlers), not at module scope — module-scope reads can be inlined into the client bundle and evaluate to `undefined` on edge runtimes that inject env at request time.
- If a managed solution such as Clerk or WorkOS is viable, prefer it — it handles most of what this guide describes.

## Related

- [Authentication Overview](./authentication-overview.md)
- [Authentication](./authentication.md)
