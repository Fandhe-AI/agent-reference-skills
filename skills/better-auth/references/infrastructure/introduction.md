# Better Auth Infrastructure

Better Auth Infrastructure is a paid service that extends your authentication system with a management dashboard, abuse protection, transactional messaging, and enterprise features, without managing additional infrastructure.

## Signature / Usage

```ts
import { betterAuth } from "better-auth";
import { dash, sentinel } from "@better-auth/infra";

export const auth = betterAuth({
  plugins: [dash(), sentinel()],
});
```

## Notes

- Key features: Dashboard (manage users, organizations, sessions, view analytics), Security (credential stuffing, bots, disposable emails, impossible travel), Email & SMS (verification emails, password resets, OTP codes with pre-built templates), Enterprise (SSO/SAML, directory sync (SCIM), log drains, role-based dashboard access).
- Paid service; packages are published as `@better-auth/infra`.
- Source: https://www.better-auth.com/docs/infrastructure/introduction (better-auth v1.7.10 docs)

## Related

- [Getting Started](./getting-started.md)
- [Dashboard Plugin (dash)](./dashboard.md)
- [Audit Logs](./audit-logs.md)
- [Sentinel](./sentinel.md)
