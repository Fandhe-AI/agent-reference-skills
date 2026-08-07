# Fastify Integration

Integrates Better Auth with Fastify: handler mounting, CORS, and session retrieval.

## Signature / Usage

```typescript
fastify.route({
  method: ["GET", "POST"],
  url: "/api/auth/*",
  async handler(request, reply) {
    const req = new Request(url, {
      method: request.method,
      headers: fromNodeHeaders(request.headers),
      body: request.method !== "GET" ? JSON.stringify(request.body) : undefined,
    });
    const response = await auth.handler(req);
    reply.status(response.status);
    return response.body;
  },
});
```

```typescript
const session = await auth.api.getSession({
  headers: fromNodeHeaders(request.headers),
});
```

## Options / Props

| Requirement | Description |
| --- | --- |
| Node.js | v16 or later |
| Module system | ESM required (`"type": "module"` or `tsconfig.json`) |
| Dependencies | `fastify`, `@fastify/cors` |
| TypeScript | `esModuleInterop: true` recommended |

## Notes

- Register `@fastify/cors` before mounting the auth handler; enable `credentials: true` and set `Cache-Control` max-age (e.g. 86400s)
- Restrict CORS origins via environment variables in production
- Requests without a valid session return 401 from protected routes

## Related

- [express](./express.md)
- [hono](./hono.md)
