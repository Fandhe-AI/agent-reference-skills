---
source: https://tediousjs.github.io/node-mssql/#rollback-callback
---

# rollback ([callback])

Rollback a transaction. If the queue isn't empty, all queued requests will be cancelled and the transaction will be marked as aborted.

## Signature / Usage

```javascript
const transaction = new sql.Transaction()
transaction.begin(err => {
    // ... error checks

    transaction.rollback(err => {
        // ... error checks
    })
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| callback(err) | `function` | A callback which is called after transaction has rolled back, or an error has occurred. Optional. If omitted, returns Promise |

## Notes

- Errors: `ENOTBEGUN` (`TransactionError`) - Transaction has not begun. `EREQINPROG` (`TransactionError`) - Can't rollback transaction, a request is in progress
- This is a SQL Server transaction rollback, unrelated to Redis (`upstash`) or Stripe transactions (`stripe`)

## Related

- [transaction](./transaction.md)
- [begin](./begin.md)
- [commit](./commit.md)
