---
source: https://fastify.dev/docs/latest/Reference/TypeScript/
---

# TypeScript Server

Create a Fastify server in TypeScript with a route typed via the generic `RouteGenericInterface` shape (`Querystring`, `Reply`).

```typescript
import fastify from 'fastify'

const server = fastify()

interface IQuerystring {
  username: string;
  password: string;
}

interface IReply {
  200: { success: boolean };
}

server.get<{
  Querystring: IQuerystring,
  Reply: IReply
}>('/auth', async (request, reply) => {
  const { username, password } = request.query
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

- Generic parameters (`Querystring`, `Body`, `Params`, `Reply`, `Headers`) give `request`/`reply` typed access without runtime validation.
- For schema-driven type inference (validation + types from one source), prefer a type provider — see `type-provider-typebox.md`.
- `reply.code(200).send(...)` payload shape is checked against the declared `Reply` interface.
