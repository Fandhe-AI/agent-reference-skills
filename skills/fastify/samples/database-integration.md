---
source: https://fastify.dev/docs/latest/Guides/Database/
---

# Database Integration

Encapsulate a database client as a `fastify-plugin`, decorating the instance with the connection and closing it via the `onClose` hook.

```javascript
const fp = require('fastify-plugin')
const mysql = require('mysql2/promise')

async function fastifyMysql (fastify, options) {
  if (fastify.hasDecorator('mysql')) {
    return
  }

  const connection = await mysql.createConnection(options)
  fastify.decorate('mysql', connection)

  fastify.addHook('onClose', async () => {
    await connection.end()
  })
}

module.exports = fp(fastifyMysql, { name: 'fastify-mysql-example' })
```

## Notes

- Wrapping with `fastify-plugin` (`fp`) exposes `fastify.mysql` on the parent instance instead of encapsulating it inside the plugin's own context.
- Fastify plugins may be `async function (fastify, options)`; no `done` callback is needed and the returned promise is awaited before the next plugin registers.
- The `hasDecorator('mysql')` guard runs *before* `createConnection()`, so registering the plugin twice skips creating (and leaking) a second connection entirely, instead of creating one and discarding it.
- The `onClose` hook closes the `connection` local variable captured by this registration, not `instance.mysql` — this way each registration's hook only ever closes the connection it created, so a second (skipped) registration cannot double-close the first one's connection.
- `mysql2/promise`'s `createConnection()` returns a promise, so it must be `await`-ed before decorating; the hook likewise `await`s `connection.end()` (a promise-based connection has no synchronous `.end()`), ensuring the connection closes cleanly when `fastify.close()` runs.
