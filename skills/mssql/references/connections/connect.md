---
source: https://tediousjs.github.io/node-mssql/#connect-callback
---

# connect([callback])

Create a new connection pool. The initial probe connection is created to find out whether the configuration is valid.

## Signature / Usage

```javascript
const pool = new sql.ConnectionPool({
    user: '...',
    password: '...',
    server: 'localhost',
    database: '...'
})

pool.connect(err => {
    // ...
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `callback(err)` | function | A callback which is called after the initial probe connection has established, or an error has occurred. Optional. If omitted, returns a Promise. |

## Notes

- Errors: `ELOGIN` (`ConnectionError`) — Login failed.
- Errors: `ETIMEOUT` (`ConnectionError`) — Connection timeout.
- Errors: `EALREADYCONNECTED` (`ConnectionError`) — Database is already connected!
- Errors: `EALREADYCONNECTING` (`ConnectionError`) — Already connecting to database!
- Errors: `EINSTLOOKUP` (`ConnectionError`) — Instance lookup failed.
- Errors: `ESOCKET` (`ConnectionError`) — Socket error.
- Migration (v5 → v6): repeat calls to the global connect function (`sql.connect()`) now return the current global connection if it exists, instead of throwing an error. Closing the global connection by reference (e.g. `const conn = sql.connect(); conn.close()`) is now equivalent to `sql.close()`.
- `ConnectionPool` / `Pool` / `Connection` here are TDS connection pools to SQL Server — unrelated to the HTTP servers in the `fastify` / `hono` skills or the Redis connections in `upstash` / `bullmq`.

## Related

- [close](./close.md)
- [Events](./events.md)
- [Version Migration Changes](../migration/version-changes.md)
