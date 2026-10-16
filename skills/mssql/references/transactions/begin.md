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

- Errors: `ENOCONN` (`TransactionError`) - No connection is specified for that transaction. `ENOTOPEN` (`ConnectionError`) - Connection not yet open. `ECONNCLOSED` (`ConnectionError`) - Connection is closed. `EALREADYBEGUN` (`TransactionError`) - Transaction has already begun
- If the transaction fails to begin once it has a connection, the error is a `TransactionError`, with the error it comes from as its `originalError`. The connection goes back to the pool, and the transaction can be begun again. A connection that may have sent the request to begin the transaction is closed rather than lent out again, as the server may have begun the transaction even though the request failed (for example, when it timed out).
- Release notes: v12.7.7 gives the connection back when a transaction fails to begin; v12.7.9 rejects `begin()` with `ENOCONN` when there is no pool and with `ECONNCLOSED` when the pool is not connected.
- This is a SQL Server transaction isolation level, unrelated to Redis (`upstash`) or Stripe transactions (`stripe`)

## Related

- [transaction](./transaction.md)
- [commit](./commit.md)
- [rollback](./rollback.md)
