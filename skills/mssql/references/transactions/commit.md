---
source: https://tediousjs.github.io/node-mssql/#commit-callback
---

# commit ([callback])

Commit a transaction.

## Signature / Usage

```javascript
const transaction = new sql.Transaction()
transaction.begin(err => {
    // ... error checks

    transaction.commit(err => {
        // ... error checks
    })
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| callback(err) | `function` | A callback which is called after transaction has committed, or an error has occurred. Optional. If omitted, returns Promise |

## Notes

- Errors: `ENOTBEGUN` (`TransactionError`) - Transaction has not begun. `EREQINPROG` (`TransactionError`) - Can't commit transaction, a request is in progress
- This is a SQL Server transaction commit, unrelated to Redis (`upstash`) or Stripe transactions (`stripe`)

## Related

- [transaction](./transaction.md)
- [begin](./begin.md)
- [rollback](./rollback.md)
