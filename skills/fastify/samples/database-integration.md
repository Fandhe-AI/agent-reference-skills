---
source: https://fastify.dev/docs/latest/Guides/Database/
---

# Database Integration

Encapsulate a database client as a `fastify-plugin`, decorating the instance with the connection and closing it via the `onClose` hook.

```javascript
const fp = require('fastify-plugin')
const mysql = require('mysql2/promise')

async function fastifyMysql (fastify, options) {
  const connection = await mysql.createConnection(options)

  if (!fastify.mysql) {
    fastify.decorate('mysql', connection)
  }

  fastify.addHook('onClose', async (instance) => {
    await instance.mysql.end()
  })
}

module.exports = fp(fastifyMysql, { name: 'fastify-mysql-example' })
```

## Notes

- Wrapping with `fastify-plugin` (`fp`) exposes `fastify.mysql` on the parent instance instead of encapsulating it inside the plugin's own context.
- Fastify plugins may be `async function (fastify, options)`; no `done` callback is needed and the returned promise is awaited before the next plugin registers.
- `mysql2/promise`'s `createConnection()` returns a promise, so it must be `await`-ed before decorating; the `onClose` hook likewise `await`s `instance.mysql.end()` (a promise-based connection has no synchronous `.end()`), ensuring the connection closes cleanly when `fastify.close()` runs.
- Guarding with `if (!fastify.mysql)` prevents double-decoration if the plugin is accidentally registered twice.
