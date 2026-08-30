---
source: https://tediousjs.github.io/node-mssql/#transaction
---

# Transaction

Creates a SQL Server transaction bound to a single connection acquired from the pool. Always use the `Transaction` class (rather than plain requests) to run multiple statements atomically.

## Signature / Usage

```javascript
const transaction = new sql.Transaction(/* [pool], [options] */)
```

If you omit the connection argument, the global connection is used instead. Transaction can also be created by `const transaction = pool.transaction()`. Requests can also be created by `const request = transaction.request()`.

```javascript
const transaction = new sql.Transaction(/* [pool] */)
transaction.begin(err => {
    // ... error checks

    const request = new sql.Request(transaction)
    request.query('insert into mytable (mycolumn) values (12345)', (err, result) => {
        // ... error checks

        transaction.commit(err => {
            // ... error checks

            console.log("Transaction committed.")
        })
    })
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| pool | `ConnectionPool` | Optional. Pool to acquire the exclusive connection from. Global connection used if omitted |
| options | `object` | Optional. Per-transaction configuration overrides (e.g. `{ requestTimeout: 60000 }`). Inherited by requests created from this transaction unless overridden at the request level. Applies to data requests only, not to `begin`/`commit`/`rollback` |

## Events

- **begin** - Dispatched when transaction begin.
- **commit** - Dispatched on successful commit.
- **rollback(aborted)** - Dispatched on successful rollback with an argument determining if the transaction was aborted (by user or because of an error).

## Aborted transactions

Shows how to correctly handle transaction errors when `abortTransactionOnError` (`XACT_ABORT`) is enabled. Added in 2.0.

```javascript
const transaction = new sql.Transaction(/* [pool] */)
transaction.begin(err => {
    // ... error checks

    let rolledBack = false

    transaction.on('rollback', aborted => {
        // emited with aborted === true

        rolledBack = true
    })

    new sql.Request(transaction)
    .query('insert into mytable (bitcolumn) values (2)', (err, result) => {
        // insert should fail because of invalid value

        if (err) {
            if (!rolledBack) {
                transaction.rollback(err => {
                    // ... error checks
                })
            }
        } else {
            transaction.commit(err => {
                // ... error checks
            })
        }
    })
})
```

## Notes

- Once you call `begin`, a single connection is acquired from the connection pool and all subsequent requests initialized with the `Transaction` object are executed exclusively on this connection. After `commit` or `rollback`, the connection is released back to the pool
- This is a SQL Server database transaction (TDS protocol, ACID commit/rollback over a dedicated connection) — distinct from Redis `MULTI`/`EXEC` transactions (`upstash`) and from Stripe's idempotency/ledger "transaction" concept (`stripe`)
- Migration (v5 → v6): invalid isolation levels passed to `Transaction`s now throw an error.
- Migration (v3 → v4): `Transaction` internal queues were removed; `ConnectionPool` no longer emits `connect`/`close` events.

## Related

- [begin](./begin.md)
- [commit](./commit.md)
- [rollback](./rollback.md)
- [prepared-statement](./prepared-statement.md)
- [Version Migration Changes](../migration/version-changes.md)
