---
source: https://fastify.dev/docs/latest/Reference/TypeScript/
---

# TypeScript Server

Create a Fastify server in TypeScript with a route typed via the generic `RouteGenericInterface` shape (`Body`, `Reply`), combined with a JSON Schema for runtime validation.

```typescript
import fastify from 'fastify'

const server = fastify()

interface IBody {
  username: string;
  password: string;
}

interface IReply {
  200: { success: boolean };
  401: { error: string };
}

const bodyJsonSchema = {
  type: 'object',
  required: ['username', 'password'],
  properties: {
    username: { type: 'string', minLength: 1, maxLength: 64 },
    password: { type: 'string', minLength: 8, maxLength: 128 }
  }
}

// replace with your real credential check (e.g. a DB lookup + password hash compare)
async function verifyCredentials (username: string, password: string): Promise<boolean> {
  return username === 'demo' && password === 'demo-password'
}

server.post<{
  Body: IBody,
  Reply: IReply
}>('/auth', { schema: { body: bodyJsonSchema } }, async (request, reply) => {
  const { username, password } = request.body
  const ok = await verifyCredentials(username, password)
  if (!ok) {
    return reply.code(401).send({ error: 'Unauthorized' })
  }
  reply.code(200).send({ success: true })
})

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
```

## Notes

- Generic parameters (`Querystring`, `Body`, `Params`, `Reply`, `Headers`) give `request`/`reply` typed access, but only the `schema` option performs runtime validation (see `validation-json-schema.md`).
- Credentials must never be carried in `Querystring`/`Params` (they end up in URLs, access logs, and browser history) — this sample adapts the upstream `TypeScript.md` `Querystring` example into a `POST` + `Body` + JSON Schema form for that reason.
- `verifyCredentials` is a stub for demonstrating the generic types; replace it with a real check (hashed password comparison, DB/session lookup) — never compare plaintext passwords like this in production.
- For schema-driven type inference (validation + types from one source), prefer a type provider — see `type-provider-typebox.md`.
- `IReply` declares every status code the handler actually sends (`200` and `401`), matching the upstream `Reply: { 200: {...}; 302: {...}; '4xx': {...} }` per-status-code pattern — both `reply.code(200).send(...)` and `reply.code(401).send(...)` payload shapes are type-checked against it.
