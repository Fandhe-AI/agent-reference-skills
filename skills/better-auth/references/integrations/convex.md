# Convex Integration

Integrates Better Auth with Convex (backend-as-a-service) via the officially Convex-maintained `@convex-dev/better-auth` package, supporting email/password and social login.

## Signature / Usage

```bash
npm create convex@latest
npx convex dev
npm install better-auth @convex-dev/better-auth
```

## Options / Props

| Step | Description |
| --- | --- |
| Component registration | Register Better Auth as a local Convex component in `convex/betterAuth/`, registered in `convex/convex.config.ts` |
| HTTP routes | Registered through `convex/http.ts` |
| Client | Auth client initialized with the Convex plugin; Next.js server helpers configured for SSR; app wrapped with `ConvexClientProvider` |

## Notes

- Requires `BETTER_AUTH_SECRET` and `SITE_URL` environment configuration, plus Convex deployment details in `.env.local`
- Usage patterns: direct `authClient` calls for sign-in/sign-up, Convex React `useQuery` hooks for authenticated data access, server-side helpers for protected routes and SSR preloading

## Related

- [next](./next.md)
