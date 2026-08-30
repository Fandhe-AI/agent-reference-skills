---
source: https://tediousjs.github.io/node-mssql/#result-value-manipulation
---

# Result value manipulation

In some instances it is desirable to manipulate the record data as it is returned from the database, this may be to cast it as a particular object (eg: `moment` object instead of `Date`) or similar.

In v8.0.0+ it is possible to register per-datatype handlers.

## Signature / Usage

```js
const sql = require('mssql')

// in this example all integer values will return 1 more than their actual value in the database
sql.valueHandler.set(sql.TYPES.Int, (value) => value + 1)

sql.query('SELECT * FROM [example]').then((result) => {
  // all `int` columns will return a manipulated value as per the callback above
})
```

## Notes

- `sql.valueHandler.set(type, handler)` registers a per-datatype handler; requires v8.0.0+.
- `ConnectionPool` / `Pool` / `Connection` here are TDS connection pools to SQL Server — unrelated to the HTTP servers in the `fastify` / `hono` skills or the Redis connections in `upstash` / `bullmq`.

## Related

- [Connection Pools](./connection-pools.md)
- [Data Types](../data-types-results/data-types.md)
