---
source: https://fastify.dev/docs/latest/Reference/TypeScript/
---

# TypeScript Getting Started

Bootstrapping a Fastify project in TypeScript: project setup, `tsconfig.json`, and a minimal typed server.

## Signature / Usage

```bash
npm init -y
npm i fastify
npm i -D typescript @types/node
```

```json
{
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "start": "node index.js"
  }
}
```

```bash
npx tsc --init
```

```typescript
import fastify from 'fastify'

const server = fastify()

server.get('/ping', async (request, reply) => {
  return 'pong\n'
})

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
```

```bash
npm run build
npm run start
curl localhost:8080/ping
```

## Notes

- Set the `target` property in `tsconfig.json` to `es2017` or higher to avoid deprecation warnings.
- Fastify assumes plain HTTP by default; no extra configuration is needed to start building.

## Related

- [Using Generics for Route Types](./route-generics.md)
- [Creating a TypeScript Fastify Plugin](./plugin-typing.md)
