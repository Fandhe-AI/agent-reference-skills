---
source: https://fastify.dev/docs/latest/Guides/Testing/
---

# Testing

Target: Fastify v5.12.1. Testing is compatible with most testing frameworks (examples below use Node's built-in Test Runner). Fastify ships with built-in fake HTTP injection via [`light-my-request`](https://github.com/fastify/light-my-request).

## Signature / Usage

```js
// app.js
'use strict'
const fastify = require('fastify')

function build (opts = {}) {
  const app = fastify(opts)
  app.get('/', async function (request, reply) {
    return { hello: 'world' }
  })
  return app
}

module.exports = build
```

```js
// app.test.js
const { test } = require('node:test')
const build = require('./app')

test('requests the "/" route', async t => {
  t.plan(1)
  const app = build()

  const response = await app.inject({
    method: 'GET',
    url: '/'
  })
  t.assert.strictEqual(response.statusCode, 200, 'returns a status code of 200')
})
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| method | string | HTTP method for `inject()` |
| url | string | Path to request |
| query | object | Querystring parameters |
| payload | object | Request body |
| headers | object | Request headers |
| cookies | object | Request cookies |

## Notes

- Separate application code (`app.js`, exporting a `build()` factory) from server startup code (`server.js`) to make testing easy
- `.inject()` ensures all registered plugins have booted before the fake request runs
- `.inject()` supports callback, promise, and chainable (`fastify.inject().get('/').end(cb)`) styles
- After `fastify.listen()`, the app can also be tested with real HTTP clients (`undici`, `fetch`, `supertest`) against `fastify.server.address().port`
- Always call `fastify.close()` after tests to close connections to external services
- To debug a test: isolate it with `{ only: true }`, run `node --test --test-only --inspect-brk <file>`, then attach with a `Node.js: Attach` debug configuration
- Plugins can be tested in isolation by registering them into a throwaway Fastify instance and injecting requests against routes added in the test

## Related

- [plugins.md](../plugins/plugins.md)
