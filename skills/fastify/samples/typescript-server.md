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
}

const bodyJsonSchema = {
  type: 'object',
  required: ['username', 'password'],
  properties: {
    username: { type: 'string', minLength: 1, maxLength: 64 },
    password: { type: 'string', minLength: 8, maxLength: 128 }
  }
}

server.post<{
  Body: IBody,
  Reply: IReply
}>('/auth', { schema: { body: bodyJsonSchema } }, async (request, reply) => {
  const { username, password } = request.body
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
- For schema-driven type inference (validation + types from one source), prefer a type provider — see `type-provider-typebox.md`.
- `reply.code(200).send(...)` payload shape is checked against the declared `Reply` interface.
