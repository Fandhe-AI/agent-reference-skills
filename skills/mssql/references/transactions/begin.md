---
source: https://tediousjs.github.io/node-mssql/#begin-isolationlevel-callback
---

# begin ([isolationLevel], [callback])

Begin a transaction.

## Signature / Usage

```javascript
const transaction = new sql.Transaction()
transaction.begin(err => {
    // ... error checks
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| isolationLevel | `sql.ISOLATION_LEVEL.*` | Controls the locking and row versioning behavior of TSQL statements issued by a connection. Optional. `READ_COMMITTED` by default |
| callback(err) | `function` | A callback which is called after transaction has began, or an error has occurred. Optional. If omitted, returns Promise |

`sql.ISOLATION_LEVEL` values (from `lib/isolationlevel.js`):

| Name | Value |
|------|-------|
| READ_UNCOMMITTED | `0x01` |
| READ_COMMITTED | `0x02` |
| REPEATABLE_READ | `0x03` |
| SERIALIZABLE | `0x04` |
| SNAPSHOT | `0x05` |

## Notes

- Errors: `ENOTOPEN` (`ConnectionError`) - Connection not yet open. `EALREADYBEGUN` (`TransactionError`) - Transaction has already begun
- This is a SQL Server transaction isolation level, unrelated to Redis (`upstash`) or Stripe transactions (`stripe`)

## Related

- [transaction](./transaction.md)
- [commit](./commit.md)
- [rollback](./rollback.md)
