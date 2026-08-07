# Encore Integration

Integrates Better Auth with Encore, a TypeScript framework with automated infrastructure and observability.

## Signature / Usage

```bash
brew install encoredev/tap/encore
encore app create my-app --example=ts/hello-world
cd my-app
npm install better-auth
```

Mount Better Auth on a catch-all endpoint using Encore's `api.raw()` in `auth/handler.ts`, bridging Node.js request/response with `toNodeHandler` to Better Auth's Web API handler.

## Notes

- Configure `encore.app`'s `allow_origins_with_credentials` with your frontend domain to permit cookies cross-origin
- Add approved origins to Better Auth's `trustedOrigins` to avoid blocked cross-origin requests
- Protected endpoints are marked `auth: true`; an auth gateway validates Better Auth sessions from extracted headers
- Run with `encore run` (requires Docker); local dashboard at `localhost:9400` for request traces and session debugging

## Related

- [express](./express.md)
- [fastify](./fastify.md)
