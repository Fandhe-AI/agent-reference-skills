---
source: https://tediousjs.github.io/node-mssql/#transaction
---

# Transaction

Run a request inside a `Transaction` so all statements execute on a single reserved connection, then commit.

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

Correctly handle an aborted transaction when `abortTransactionOnError` (`XACT_ABORT`) is enabled:

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

- Always create requests via `new sql.Request(transaction)` (or `transaction.request()`) — this ensures every statement runs on the same connection reserved by `begin()`
- After `commit()` or `rollback()`, the connection is released back to the pool
- `transaction` here is `sql.Transaction`, unrelated to `upstash` / `stripe` transaction concepts
