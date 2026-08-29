---
source: https://fastify.dev/docs/latest/Guides/Database/
---

# Database

Target: Fastify v5.12.1. Fastify is database agnostic; the ecosystem provides official plugins for popular engines, and a database library or engine can be wrapped in a custom plugin using decorators.

## Signature / Usage

```js
// Postgres via @fastify/postgres
const fastify = require('fastify')()

fastify.register(require('@fastify/postgres'), {
  connectionString: 'postgres://postgres@localhost/postgres'
})

fastify.get('/user/:id', function (req, reply) {
  fastify.pg.query(
    'SELECT id, username FROM users WHERE id=$1', [req.params.id],
    function onResult (err, result) {
      if (err) {
        req.log.error(err)
        return reply.code(500).send({ error: 'Internal Server Error' })
      }
      reply.send(result.rows)
    }
  )
})
```

```js
// Writing a custom database plugin (e.g. Knex)
const fp = require('fastify-plugin')

function knexPlugin(fastify, options, done) {
  if (!fastify.knex) {
    const knex = require('knex')(options)
    fastify.decorate('knex', knex)
    fastify.addHook('onClose', (fastify, done) => {
      if (fastify.knex === knex) fastify.knex.destroy(done)
    })
  }
  done()
}

module.exports = fp(knexPlugin, { name: 'fastify-knex-example' })
```

## Notes

- The upstream guide's Postgres example selects `hash, salt` and sends `err || result` directly to the client; this page adapts it to select only non-sensitive columns and to return a generic 500 on error instead of leaking password hashes/salts or internal error details
- Official plugins exist for MySQL (`@fastify/mysql`), Postgres (`@fastify/postgres`), Redis (`@fastify/redis`), and MongoDB (`@fastify/mongodb`)
- `@fastify/redis` does not close the client connection on server shutdown by default; pass `closeClient: true` to opt in
- Custom database plugins should be wrapped with `fastify-plugin` and register an `onClose` hook to release the connection
- Schema migrations are engine-agnostic; the guide uses [Postgrator](https://www.npmjs.com/package/postgrator) (Postgres/MySQL/SQL Server/SQLite) as an example, and [migrate-mongo](https://www.npmjs.com/package/migrate-mongo) for MongoDB

## Related

- [../plugins/plugins.md](../plugins/plugins.md)
- [../plugins/decorators.md](../plugins/decorators.md)
