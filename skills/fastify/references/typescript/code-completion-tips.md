---
source: https://fastify.dev/docs/latest/Reference/TypeScript/
---

# Code Completion Tips

Options for getting typed request/response schemas from JSON Schema (Type Providers, TypeBox, `json-schema-to-typescript`, `json-schema-to-ts`), plus code completion in vanilla JavaScript via JSDoc.

## Signature / Usage

```typescript
// TypeBox: define schema and type together
import { Static, Type } from 'typebox'

export const User = Type.Object({
  name: Type.String(),
  mail: Type.Optional(Type.String({ format: 'email' })),
})

export type UserType = Static<typeof User>

fastify.post<{ Body: UserType, Reply: UserType }>(
  '/',
  { schema: { body: User, response: { 200: User } } },
  (request, reply) => {
    const { name, mail } = request.body
    reply.status(200).send({ name, mail })
  }
)
```

```js
// Vanilla JavaScript code completion via JSDoc
/**  @type {import('fastify').FastifyPluginAsync<{ optionA: boolean, optionB: string }>} */
module.exports = async function (fastify, { optionA, optionB }) {
  fastify.get('/look', () => 'at me');
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `@fastify/type-provider-json-schema-to-ts` | Type Provider package | Wraps `json-schema-to-ts`; see the Type Providers reference |
| `@fastify/type-provider-typebox` | Type Provider package | Wraps `typebox`; see the Type Providers reference |
| `fastify-type-provider-zod` (third-party) | Type Provider package | Wraps `zod` |
| `typebox` | library | Defines schema and static type together (`Type.Object`, `Static<typeof Schema>`) |
| `json-schema-to-typescript` (`json2ts` CLI) | codegen | Generates `.d.ts` interfaces from `.json` schema files |
| `json-schema-to-ts` (`FromSchema<typeof schema>`) | type helper | Derives a TypeScript type directly from an `as const` schema object, no codegen step |

## Notes

- Fastify's own Type Provider packages are documented in full on the Type Providers reference page (see validation-serialization scope) — this page only covers how they surface in code completion.
- When using `json-schema-to-ts`, the schema object must be declared `as const` or the type inference does not narrow correctly.
- `json-schema-to-typescript` requires a build step (`json2ts -i schemas -o types`) and importing both the raw `.json` schema and the generated interface.

## Related

- [Using Generics for Route Types](./route-generics.md)
- [API Type System Documentation](./api-type-system.md)
