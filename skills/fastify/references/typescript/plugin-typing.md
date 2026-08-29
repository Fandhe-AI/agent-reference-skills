---
source: https://fastify.dev/docs/latest/Reference/TypeScript/
---

# Creating a TypeScript Fastify Plugin

Typing a Fastify plugin with `FastifyPluginCallback` / `FastifyPluginAsync`, extending Fastify's interfaces via declaration merging, and consuming decorators with `getDecorator` / `setDecorator`.

## Signature / Usage

```typescript
import { FastifyPluginCallback, FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'

declare module 'fastify' {
  interface FastifyRequest {
    myPluginProp: string
  }
  interface FastifyReply {
    myPluginProp: number
  }
}

export interface MyPluginOptions {
  myPluginOption: string
}

const myPluginCallback: FastifyPluginCallback<MyPluginOptions> = (fastify, options, done) => {
  fastify.decorateRequest('myPluginProp', 'super_secret_value')
  fastify.decorateReply('myPluginProp', options.myPluginOption)
  done()
}

const myPluginAsync: FastifyPluginAsync<MyPluginOptions> = async (fastify, options) => {
  fastify.decorateRequest('myPluginProp', 'super_secret_value')
  fastify.decorateReply('myPluginProp', options.myPluginOption)
}

export default fp(myPluginCallback)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `FastifyPluginCallback<Options>` | interface | Callback-style plugin signature `(fastify, options, done) => void` |
| `FastifyPluginAsync<Options>` | interface | Async/promise-style plugin signature `(fastify, options) => Promise<void>` |
| `declare module 'fastify'` | declaration merging | Extends `FastifyRequest` / `FastifyReply` / `FastifyInstance` with custom decorator properties |
| `getDecorator<T>()` | method (on instance/request/reply) | Retrieves a decorator value with type safety, without global module augmentation |
| `setDecorator<T>()` | method (on request/reply) | Sets a decorator value with type safety |

## Notes

- `fastify-plugin` v2.3.0+ automatically adds a `.default` property and a named export to the exported plugin.
- For JavaScript plugins that need TypeScript support, ship a matching `index.d.ts` alongside `index.js` and reference it via `"types"` in `package.json`.
- Import plugins with ES module `import` syntax (or `"types"` in `tsconfig.json`) so type resolution works; `require()` alone does not load type definitions.
- `getDecorator<T>` / `setDecorator<T>` avoid global module augmentation, which is useful for multi-server setups where the same property name has different types per instance:

```typescript
serverOne.register(async function (fastify) {
  const usersRepository = fastify.getDecorator<PostgreUsersRepository>(
    'usersRepository'
  )
  fastify.decorateRequest('session', null)
  fastify.addHook('onRequest', async (req, reply) => {
    req.setDecorator('session', { user: 'Jean' })
  })
  fastify.get('/me', (request, reply) => {
    const session = request.getDecorator<ISession>('session')
    reply.send(session)
  })
})
```
- For bound handler functions, use `OmitThisParameter` to strip the `this` type before passing to `decorateReply`.

## Related

- [API Type System Documentation](./api-type-system.md)
- [Using Generics for Route Types](./route-generics.md)
