# SolidStart Integration

Mount the handler with the dedicated SolidStart adapter.

```ts
// routes/api/auth/[...auth].ts
import { auth } from "~/lib/auth";
import { toSolidStartHandler } from "better-auth/solid-start";

export const { GET, POST } = toSolidStartHandler(auth);
```

## Notes

- Create the client with `createAuthClient` from `better-auth/solid` (see `samples/client-setup.md`)
- Keep the route file inside `/routes/api/auth` so requests to `/api/auth/*` reach the handler
