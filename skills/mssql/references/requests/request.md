---
source: https://tediousjs.github.io/node-mssql/#request
---

# Request

A `Request` executes SQL commands (queries, batches, stored procedures, bulk inserts) against a `ConnectionPool` or `Transaction`.

## Signature / Usage

```javascript
const request = new sql.Request(/* [pool or transaction], [options] */)
```

If you omit pool/transaction argument, global pool is used instead.

The optional `options` argument allows per-request configuration overrides:

```javascript
// Request with a 60-second timeout instead of the pool default
const request = new sql.Request(pool, { requestTimeout: 60000 })
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| requestTimeout | number | Override the pool's default request timeout (in ms) for this request only. Applies to queries and stored procedure executions; does not apply to bulk data transfers (`request.bulk()`), which stream to completion as long as the connection is healthy. If you need to bound a bulk transfer, wrap the call with your own timer and call `request.cancel()`. |

## Events

| Event | Description |
|-------|-------------|
| `recordset(columns)` | Dispatched when metadata for new recordset are parsed. |
| `row(row)` | Dispatched when new row is parsed. |
| `done(returnValue)` | Dispatched when request is complete. |
| `error(err)` | Dispatched on error. |
| `info(message)` | Dispatched on informational message. |

## Notes

- When using the global pool, you must still pass `undefined` as the first argument to use options: `new sql.Request(undefined, { requestTimeout: 60000 })`.

## Related

- [execute](./execute.md)
- [query](./query.md)
- [batch](./batch.md)
- [bulk](./bulk.md)
- [cancel](./cancel.md)
