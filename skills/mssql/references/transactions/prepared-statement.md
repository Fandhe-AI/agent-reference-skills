---
source: https://tediousjs.github.io/node-mssql/#prepared-statement
---

# PreparedStatement

Creates a TDS prepared statement bound to a single connection. Always use the `PreparedStatement` class to create prepared statements — it ensures all executions run on one connection.

## Signature / Usage

```javascript
const ps = new sql.PreparedStatement(/* [pool], [options] */)
```

If you omit the connection argument, the global connection is used instead.

```javascript
const ps = new sql.PreparedStatement(/* [pool] */)
ps.input('param', sql.Int)
ps.prepare('select @param as value', err => {
    // ... error checks

    ps.execute({param: 12345}, (err, result) => {
        // ... error checks

        // release the connection after queries are executed
        ps.unprepare(err => {
            // ... error checks

        })
    })
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| pool | `ConnectionPool` | Optional. Pool to acquire the exclusive connection from. Global connection used if omitted |
| options | `object` | Optional. Per-statement configuration overrides (e.g. `{ requestTimeout: 60000 }`). Applied to the `prepare`, `execute`, and `unprepare` operations |

## Notes

- Once you call `prepare`, a single connection is acquired from the connection pool and all subsequent executions run exclusively on this connection. After you call `unprepare`, the connection is released back to the pool
- Each prepared statement means one reserved connection from the pool. Always `unprepare` when finished, or you will exhaust the connection pool. You can execute multiple queries against the same prepared statement, but you *must* unprepare it when done
- Prepared statements can also be created in transactions (`new sql.PreparedStatement(transaction)`), but no other requests can run in the transaction until `unprepare` is called
- This is a SQL Server / TDS prepared statement, unrelated to Redis (`upstash`) or Stripe (`stripe`) transaction concepts
- Migration (v3 → v4): `PreparedStatement` internal queues were removed.

## Related

- [prepared-statement-input](./prepared-statement-input.md)
- [prepared-statement-output](./prepared-statement-output.md)
- [prepare](./prepare.md)
- [prepared-statement-execute](./prepared-statement-execute.md)
- [unprepare](./unprepare.md)
- [Version Migration Changes](../migration/version-changes.md)
