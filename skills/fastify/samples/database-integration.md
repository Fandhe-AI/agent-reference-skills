---
source: https://fastify.dev/docs/latest/Guides/Database/
---

# Database Integration

Encapsulate a database client as a `fastify-plugin`, decorating the instance with the connection and closing it via the `onClose` hook.

```javascript
const fp = require('fastify-plugin')
const mysql = require('mysql2/promise')

function fastifyMysql(fastify, options, done) {
  const connection = mysql.createConnection(options)

  if (!fastify.mysql) {
    fastify.decorate('mysql', connection)
  }

  fastify.addHook('onClose', (fastify, done) => connection.end().then(done).catch(done))

  done()
}

export default fp(fastifyMysql, { name: 'fastify-mysql-example' })
```

## Notes

- Wrapping with `fastify-plugin` (`fp`) exposes `fastify.mysql` on the parent instance instead of encapsulating it inside the plugin's own context.
- The `onClose` hook ensures the connection is closed cleanly when `fastify.close()` runs, avoiding dangling connections during shutdown.
- Guarding with `if (!fastify.mysql)` prevents double-decoration if the plugin is accidentally registered twice.
