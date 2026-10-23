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
    // Keep the original body encoding: Content-Type is forwarded as-is, so a form body
    // must stay URL-encoded (needs @fastify/formbody to be parsed) rather than JSON
    const contentType = String(request.headers["content-type"] ?? "");
    const body =
      request.body == null
        ? undefined
        : typeof request.body === "string"
          ? request.body
          : contentType.includes("application/x-www-form-urlencoded")
            ? new URLSearchParams(request.body as Record<string, string>).toString()
            : JSON.stringify(request.body);
    const req = new Request(url.toString(), {
      method: request.method,
      headers: fromNodeHeaders(request.headers),
      ...(body !== undefined ? { body } : {}),
    });

    const response = await auth.handler(req);
    reply.status(response.status);
    // Set-Cookie must be forwarded as separate values, not comma-joined
    response.headers.forEach((value, key) => {
      if (key !== "set-cookie") reply.header(key, value);
    });
    const cookies = response.headers.getSetCookie();
    if (cookies.length > 0) reply.header("set-cookie", cookies);
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
- `Set-Cookie` is forwarded via `getSetCookie()` as separate values instead of the generic header copy, which comma-joins cookies (Adapted from the official docs)
- The bridge keeps the original body encoding (URL-encoded form bodies are not converted to JSON, since `Content-Type` is forwarded unchanged); register `@fastify/formbody` to accept form POSTs such as OAuth Provider logout (Adapted from the official docs)
