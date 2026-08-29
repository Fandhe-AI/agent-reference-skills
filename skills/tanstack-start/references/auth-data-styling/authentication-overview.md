---
source: https://tanstack.com/start/latest/docs/framework/react/guide/authentication-overview
---

# Authentication Overview

Architecture and decision guide for authentication in TanStack Start: authentication vs authorization, session management patterns, route protection architecture, and a comparison of partner solutions, OSS libraries, and DIY implementation.

## Signature / Usage

```tsx
// routes/_authed.tsx
import { createFileRoute, redirect } from '@tanstack/react-router'
import { getCurrentUserFn } from '../server/auth'

export const Route = createFileRoute('/_authed')({
  beforeLoad: async ({ location }) => {
    const user = await getCurrentUserFn()
    if (!user) {
      throw redirect({ to: '/login', search: { redirect: location.href } })
    }
    return { user }
  },
})
```

## Architecture Overview

- **Server-Side (Secure)**: session storage/validation, credential verification, database operations, token generation, protected API endpoints.
- **Client-Side (Public)**: auth state management, route protection logic, login/logout UI, redirect handling.
- **Isomorphic (Both)**: route loaders checking auth state, shared validation logic, profile data access.

### Session Management Patterns

- **HTTP-Only Cookies (Recommended)** — not accessible via JavaScript, automatic browser handling, built-in CSRF protection with `sameSite`.
- **JWT Tokens** — stateless, good for API-first apps, requires care to avoid XSS, consider refresh-token rotation.
- **Server-Side Sessions** — centralized control, easy to revoke, requires session storage (database/Redis).

### Route Protection Architecture

- **Layout Route Pattern (Recommended)** — protect entire route subtrees with parent layout routes.
- **Component-Level Protection** — conditional rendering for mixed public/private content on the same route.
- **Data/API Protection (Security Boundary)** — authorize every server function, server route, or API endpoint that reads/writes private data; route guards are UX/navigation control, not the data boundary.

## Authentication Options

### Partner Solutions

- [WorkOS](https://workos.com) — SSO (SAML/OIDC/OAuth), Directory Sync (SCIM), MFA, SOC 2/GDPR/CCPA compliance.
- [Clerk](https://clerk.dev) — ready-to-use UI components, social logins, MFA, organizations/teams.

### DIY Authentication

Build your own using TanStack Start's server functions and session management. Start with the Authentication Server Primitives guide, which covers session cookies (`HttpOnly`/`Secure`/`SameSite`/`__Host-`), session lookup as middleware, OAuth `state` + PKCE, password-reset enumeration defense, CSRF, rate limiting, and session rotation.

### Other Options

- **Open Source & Community**: Better Auth (modern, TypeScript-first), Auth.js (formerly NextAuth.js).
- **Hosted Services**: Supabase Auth, Auth0, Firebase Auth.

## Production Auth Checklist

- Use HTTPS in production and a strong session secret.
- Store sessions in `HttpOnly`, `Secure`, `SameSite` cookies; never `localStorage`/`sessionStorage`.
- Enforce auth in every server function/server route/API endpoint that touches private data; use `beforeLoad` for page UX only.
- Use `.validator()` on every server function accepting input.
- Hash passwords with bcrypt/scrypt/Argon2; verify against a dummy hash for missing users and return the same message.
- Rate limit login, registration, and password-reset endpoints.
- Use CSRF or same-origin protections for non-GET server functions and server routes.
- Log authentication events and monitor failures.
- Test unauthenticated calls to protected server functions directly; they must reject before returning data.

## Notes

- Better Auth is listed here as an OSS option; for Better Auth's own API (plugins, adapters, hooks), refer to the `better-auth` skill.
- Route guards (`beforeLoad`) are UX/navigation control only — the data/API boundary (server function, server route) is the actual security boundary.
- The official Authentication Overview guide (`https://tanstack.com/start/latest/docs/framework/react/guide/authentication-overview`) contains no code examples; the snippet above is transcribed verbatim from the Route Protection section of [Authentication](./authentication.md), which is the same source's Layout Route Pattern illustrated in code.

## Related

- [Authentication Server Primitives](./authentication-server-primitives.md)
- [Authentication](./authentication.md)
