# Astro Example

Official worked example integrating Better Auth with Astro (using Solid for components). Demonstrates email/password auth, Google social sign-in, passkeys, email verification, password reset, two-factor auth, profile update, and session management.

## Signature / Usage

```bash
# clone from CodeSandbox or GitHub, then:
pnpm install
pnpm run dev
# open http://localhost:3000
```

Required `.env` variables:

```bash
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
BETTER_AUTH_SECRET=
```

## Notes

- Google credentials are obtained from the Google Developer Console; Google sign-in is optional
- Live demo: https://codesandbox.io/p/github/better-auth/examples/tree/main/astro-example
- Source: https://github.com/better-auth/examples/tree/main/astro-example

## Related

- [svelte-kit](./svelte-kit.md)
- [next-js](./next-js.md)
