---
source: https://fastify.dev/docs/latest/Guides/Testing/
---

# Testing Inject

Test a Fastify route without binding to a real port using `fastify.inject()` together with Node's built-in test runner.

```js
'use strict'

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

## Notes

- `inject()` simulates an HTTP request in-process (no real socket), which keeps tests fast and avoids port conflicts.
- Structuring the app as a `build()` factory exported from `app.js` allows each test to create an isolated instance.
- `t.plan(1)` guards against a test silently passing without the assertion running.
