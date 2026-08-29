---
source: https://fastify.dev/docs/latest/Reference/Type-Providers/, https://raw.githubusercontent.com/fastify/fastify-type-provider-zod/v1.0.0/README.md
---

# Type Providers

Type Providers are a TypeScript feature that lets Fastify infer type information directly from an inline JSON Schema (or TypeBox/Zod schema), as an alternative to specifying generic arguments on routes. Official packages follow the `@fastify/type-provider-{provider-name}` naming convention.

## Signature / Usage

```typescript
import Fastify from 'fastify'
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts'

const server = Fastify().withTypeProvider<JsonSchemaToTsProvider>()

server.get('/route', {
  schema: {
    querystring: {
      type: 'object',
      properties: {
        foo: { type: 'number' },
        bar: { type: 'string' }
      },
      required: ['foo', 'bar']
    }
  }
}, (request, reply) => {
  // type Query = { foo: number, bar: string }
  const { foo, bar } = request.query // type safe!
})
```

## Options / Props

| Provider | Package | Wrapper |
| --- | --- | --- |
| json-schema-to-ts | `json-schema-to-ts` | `@fastify/type-provider-json-schema-to-ts` |
| TypeBox | `typebox` | `@fastify/type-provider-typebox` |
| Zod | `zod` | `@fastify/type-provider-zod` |

## TypeBox

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
  const { foo, bar } = request.query // type safe!
})
```

## Zod

```typescript
import fastify from 'fastify'
import { ZodTypeProvider, serializerCompiler, validatorCompiler } from '@fastify/type-provider-zod'
import { z } from 'zod/v4'

const server = fastify()
server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.withTypeProvider<ZodTypeProvider>().get('/route', {
  schema: {
    querystring: z.object({
      foo: z.number(),
      bar: z.string()
    })
  }
}, (request, reply) => {
  const { foo, bar } = request.query // type safe!
})
```

## Notes

- Provider types don't propagate globally. In encapsulated contexts, `withTypeProvider<...>()` must be called again in each scope/plugin to keep type safety when registering routes.
- When using `JsonSchemaToTsProvider` with a schema pulled into a separate variable, add `as const` to it — otherwise TypeScript widens literal fields like `type: 'object'` to `type: string`, breaking inference (this has no effect on the runtime schema).
- **v4 → v5**: Type Providers now differentiate validator and serializer schema types instead of a single `output` type — the generic interface changed from `output: this['input'] extends JSONSchema ? FromSchema<this['input'], Options> : unknown` to separate `validator` and `serializer` properties (each `this['schema'] extends JSONSchema ? FromSchema<this['schema'], Options> : unknown`). Type Provider packages such as `@fastify/type-provider-json-schema-to-ts` and `@fastify/type-provider-typebox` needed updates for this (per `Guides/Migration-Guide-V5.md`).
- `zod` here is only a schema source plugged in via `@fastify/type-provider-zod`; the `zod` skill covers the zod API itself.
- Fastify v5.12.1's own docs are inconsistent here: `Reference/Type-Providers.md` (this page's source) uses the fastify-org package `@fastify/type-provider-zod`, while `Reference/TypeScript.md` at the same tag links the third-party wrapper [`fastify-type-provider-zod`](https://github.com/turkerdev/fastify-type-provider-zod). This page follows `Reference/Type-Providers.md`.
- `@fastify/type-provider-zod` is a real, published package (v1.0.0, released 2026-04) with its official repository at [fastify/fastify-type-provider-zod](https://github.com/fastify/fastify-type-provider-zod) — verified via the `v1.0.0` tag's README, whose own import example (`import type { ZodTypeProvider } from '@fastify/type-provider-zod'`) matches the import shown above. It is not a typo or a fabricated package name.

## Related

- [Write a Type Provider](./write-type-provider.md)
- [Schema Basics](./schema-basics.md)
