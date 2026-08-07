# Encore Integration

Mount Better Auth on an Encore.ts raw endpoint and validate sessions inside an Encore auth handler/gateway.

```ts
// auth/handler.ts — catch-all raw endpoint
import { api } from "encore.dev/api";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth";

export const authHandler = api.raw(
  { expose: true, path: "/api/auth/*path", method: "*" },
  toNodeHandler(auth),
);
```

```ts
// auth/gateway.ts — validate sessions for Encore's built-in auth handler pattern
import { APIError, Gateway, Header } from "encore.dev/api";
import { authHandler } from "encore.dev/auth";
import { auth } from "./auth";

interface AuthParams {
  authorization: Header<"Authorization">;
  cookie: Header<"Cookie">;
}

const handler = authHandler(async (params: AuthParams) => {
  const headers = new Headers();
  if (params.authorization) headers.set("Authorization", params.authorization);
  if (params.cookie) headers.set("Cookie", params.cookie);

  const session = await auth.api.getSession({ headers });
  if (!session?.user) throw APIError.unauthenticated("invalid session");

  return { userID: session.user.id, email: session.user.email, name: session.user.name };
});

export const gateway = new Gateway({ authHandler: handler });
```

## Notes

- `api.raw()` gives Node.js request/response types; `toNodeHandler` from `better-auth/node` bridges them to Better Auth's Web API handler
- Configure `global_cors.allow_origins_with_credentials` in `encore.app` so cross-origin cookies are accepted
- Add cross-origin frontends to `trustedOrigins` in the Better Auth config
- Protect any endpoint by adding `auth: true` and reading `getAuthData()` from `~encore/auth`
