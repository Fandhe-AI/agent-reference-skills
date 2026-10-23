# Fastify Integration

Integrates Better Auth with Fastify: handler mounting, CORS, and session retrieval.

## Signature / Usage

```typescript
fastify.route({
  method: ["GET", "POST"],
  url: "/api/auth/*",
  async handler(request, reply) {
    const url = new URL(request.url, `http://${request.headers.host}`);
    const req = new Request(url.toString(), {
      method: request.method,
      headers: fromNodeHeaders(request.headers),
      body: request.method !== "GET" ? JSON.stringify(request.body) : undefined,
    });
    const response = await auth.handler(req);
    reply.status(response.status);
    // Forward headers (Location, etc.); Set-Cookie must be sent as separate values
    response.headers.forEach((value, key) => {
      if (key !== "set-cookie") reply.header(key, value);
    });
    const cookies = response.headers.getSetCookie();
    if (cookies.length > 0) reply.header("set-cookie", cookies);
    return reply.send(response.body ? await response.text() : null);
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
- The handler builds a `URL` before constructing `Request` (the official sample referenced an undefined `url`), forwards response headers, and sends `Set-Cookie` as separate values via `getSetCookie()` so sessions are not lost to comma-joined cookies (Adapted from the official docs)

## Related

- [express](./express.md)
- [hono](./hono.md)
