---
source: https://opencode.ai/docs/console/providers/
---

# Verify the x-opencode-actor Token

Verify the signed `x-opencode-actor` JWT on a gateway you run, with the `jose` library.

```text
x-opencode-actor: eyJhbGciOiJFUzI1NiIsInR5cCI6Im9wZW5jb2RlLWFjdG9yK2p3dCIsImtpZCI6Ii4uLiJ9...
```

```ts
import { createRemoteJWKSet, jwtVerify } from "jose"

const keys = createRemoteJWKSet(new URL("https://opencode.ai/inference/.well-known/jwks.json"))

export async function sender(request: Request) {
  const token = request.headers.get("x-opencode-actor")
  if (!token) throw new Error("Missing x-opencode-actor")
  const { payload } = await jwtVerify(token, keys, {
    issuer: "https://opencode.ai/inference",
    audience: "https://llm.example.com/v1",
    algorithms: ["ES256"],
    typ: "opencode-actor+jwt",
    maxTokenAge: "120s",
    clockTolerance: "5s",
  })
  if (payload.workspace_id !== "org_...") throw new Error("Another workspace")
  return payload
}
```

## Notes

- Turn on **Send identity** on the provider's page first; it is off by default and changing the base URL turns it off.
- Set `audience` to the provider's base URL as saved in Console, without trailing slashes, and replace `org_...` with the workspace ID from your Console URL.
- Look keys up by `kid` (as `createRemoteJWKSet` does) so rotations keep working; JWKS is served with `Cache-Control: public, max-age=300`.
- Console strips any client-sent `x-opencode-*` header. `Test connection` and model listing call `GET <base URL>/models` without the header, so do not require it on that route.
