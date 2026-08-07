# Nitro Integration

Integrates Better Auth with Nitro, the open-source framework for building web servers, via a catch-all route handler.

## Signature / Usage

```typescript
// server/routes/api/auth/[...all].ts
export default defineEventHandler((event) => {
    return auth.handler(toWebRequest(event));
});
```

```bash
npx giget@latest nitro nitro-app --install
```

## Notes

- Follow the standard installation steps (install Better Auth, set environment variables) before mounting the handler
- Create the Better Auth instance in `server/utils/auth.ts`; the example uses the Prisma adapter with SQLite for development only — SQLite is explicitly not recommended for production, use PostgreSQL or similar
- Add CORS configuration via a dedicated Nitro plugin, and an authentication middleware (e.g. `requireAuth`) to restrict routes to logged-in users

## Related

- [hono](./hono.md)
- [encore](./encore.md)
