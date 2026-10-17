# Effect Integration

Integrates Better Auth with an Effect HTTP server. Better Auth uses Web Standard `Request` / `Response`, so Effect 4 can mount `auth.handler` with `HttpEffect.fromWebHandler`.

## Signature / Usage

```bash
# install Effect (and the Node.js platform package for the example below)
npm install effect @effect/platform-node
```

```ts
// src/index.ts
import { createServer } from "node:http";
import { NodeHttpServer, NodeRuntime } from "@effect/platform-node";
import { Layer } from "effect";
import { HttpEffect, HttpRouter, HttpServerResponse } from "effect/http";
import { auth } from "./auth.ts";

const homeRoute = HttpRouter.add(
  "GET",
  "/",
  HttpServerResponse.text("Hello Better Auth"),
);

const authRoutes = HttpRouter.add(
  "*",
  "/api/auth/*", // Match your Better Auth basePath.
  HttpEffect.fromWebHandler(auth.handler),
);

const routes = Layer.mergeAll(homeRoute, authRoutes);

const server = HttpRouter.serve(routes).pipe(
  Layer.provide(NodeHttpServer.layer(createServer, { port: 3000 })),
);

Layer.launch(server).pipe(NodeRuntime.runMain);
```

Cross-origin requests: allow the frontend origin in both Better Auth `trustedOrigins` and the Effect CORS middleware.

```ts
// src/auth.ts
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  trustedOrigins: ["http://localhost:5173"],
});
```

```ts
// src/index.ts
import { HttpMiddleware } from "effect/http";

const server = HttpRouter.serve(routes, {
  middleware: HttpMiddleware.cors({
    allowedOrigins: ["http://localhost:5173"],
    credentials: true,
  }),
}).pipe(
  Layer.provide(NodeHttpServer.layer(createServer, { port: 3000 })),
);
```

Protect application routes by checking the session:

```ts
// src/index.ts
import { Effect } from "effect";
import { HttpServerRequest, HttpServerResponse } from "effect/http";

const profileRoute = HttpRouter.add(
  "GET",
  "/profile",
  Effect.gen(function* () {
    const request = yield* HttpServerRequest.HttpServerRequest;
    const session = yield* Effect.tryPromise(() =>
      auth.api.getSession({ headers: request.headers }),
    );

    if (!session) {
      return HttpServerResponse.empty({ status: 401 });
    }

    return yield* HttpServerResponse.json(session.user);
  }),
);

const routes = Layer.mergeAll(homeRoute, authRoutes, profileRoute);
```

## Notes

- Requires Effect 4; configure a Better Auth instance first (see the installation page).
- The example runs on Node.js (`@effect/platform-node`); use the Effect Platform guide for other runtimes.
- The route path (`/api/auth/*`) must match your Better Auth `basePath`.
- The CORS middleware applies to every route, so list only the origins that need cookie access.
- For cross-site cookies, see the Cookies concept page.
- Source: https://www.better-auth.com/docs/integrations/effect (better-auth v1.7.10 docs)

## Related

- [hono](./hono.md)
- [fastify](./fastify.md)
- [express](./express.md)
