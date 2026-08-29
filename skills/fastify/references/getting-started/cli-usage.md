---
source: https://fastify.dev/docs/latest/Guides/Getting-Started/
---

# Run Your Server from CLI

`fastify-cli` is a separate tool for scaffolding and managing Fastify projects, and running a server from the command line.

## Signature / Usage

```sh
npm i fastify-cli
```

```json
{
  "scripts": {
    "start": "fastify start server.js"
  }
}
```

```js
// server.js
'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
  })
}
```

```bash
npm start
```

## Notes

- `fastify-cli` can also be installed globally with `-g`.
- The server file must export an async plugin function (not a `Fastify()` instance) for `fastify-cli` to load it.

## Related

- [installation.md](./installation.md)
- [first-plugin.md](./first-plugin.md)
