---
source: https://fastify.dev/docs/latest/Reference/Type-Providers/
---

# Type Provider TypeBox

Derive TypeScript types for route querystring/body/reply directly from a JSON Schema definition using `@fastify/type-provider-typebox`.

```typescript
import Fastify from 'fastify'
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import { Type } from 'typebox'

const server = Fastify().withTypeProvider<TypeBoxTypeProvider>()

server.get('/route', {
  schema: {
    querystring: Type.Object({
      foo: Type.Number(),
      bar: Type.String()
    })
  }
}, (request, reply) => {
  const { foo, bar } = request.query
})
```

## Notes

- `withTypeProvider<TypeBoxTypeProvider>()` must be called on the Fastify instance before registering typed routes.
- The same `Type.Object(...)` schema is used both for runtime Ajv validation and compile-time TypeScript inference.
- In v5, validator and serializer schema types are separated internally; see `references/validation-serialization/type-providers.md` for the full compiler API.
