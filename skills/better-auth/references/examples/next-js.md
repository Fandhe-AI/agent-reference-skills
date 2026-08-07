# Next.js Example

Official worked example integrating Better Auth with Next.js. Demonstrates email/password auth, social sign-in, passkeys, email verification, password reset, two-factor auth, profile management, session handling, and organization/team features with member roles (including SSO via a "DummyIDP" test provider and SCIM user sync).

## Signature / Usage

```bash
# clone from Codesandbox or GitHub, then:
# rename .env.example to .env and configure variables
pnpm install
pnpm dev
# open http://localhost:3000
```

## Notes

- SSO testing uses a bundled "DummyIDP" demo login interface
- SCIM example demonstrates add/update/remove user sync from an identity provider, reflected in the database in real time
- Live demo: https://demo.better-auth.com
- Stackblitz: https://codesandbox.io/p/github/better-auth/better-auth/tree/main/demo/nextjs
- Source: https://github.com/better-auth/better-auth/tree/main/demo/nextjs

## Related

- [astro](./astro.md)
- [react-router](./react-router.md)
