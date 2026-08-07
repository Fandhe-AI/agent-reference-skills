# Fastify Integration

Bridge Fastify's request/reply to the Fetch API `Request`/`Response` that `auth.handler` expects.

```ts
// server.ts
import Fastify from "fastify";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "./auth";

const fastify = Fastify({ logger: true });

fastify.route({
  method: ["GET", "POST"],
  url: "/api/auth/*",
  async handler(request, reply) {
    const url = new URL(request.url, `http://${request.headers.host}`);
    const req = new Request(url.toString(), {
      method: request.method,
      headers: fromNodeHeaders(request.headers),
      ...(request.body ? { body: JSON.stringify(request.body) } : {}),
    });

    const response = await auth.handler(req);
    reply.status(response.status);
    response.headers.forEach((value, key) => reply.header(key, value));
    return reply.send(response.body ? await response.text() : null);
  },
});

fastify.listen({ port: 4000 });
```

## Notes

- Requires ES modules (`"type": "module"` in `package.json` or `"module": "ESNext"` in `tsconfig.json`)
- Register `@fastify/cors` before the auth route, with `credentials: true` for cross-origin cookie support
- Read sessions in other routes with `auth.api.getSession({ headers: fromNodeHeaders(request.headers) })`
- Add cross-origin frontends to `trustedOrigins` in the Better Auth config
