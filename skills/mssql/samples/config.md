---
source: https://tediousjs.github.io/node-mssql/#config
---

# Config

Minimal connection config object used by `sql.connect()` and `ConnectionPool`.

```javascript
const config = {
    user: '...',
    password: '...',
    server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
    database: '...',
}
```

## Notes

- `server` accepts `host\instance` syntax to target a named SQL Server instance
- This bare object is the shared `config` referenced by the Async/Await, Promises, tagged template, callback, and streaming examples
- A `pool` sub-object (`max` / `min` / `idleTimeoutMillis`) can be added for pool tuning
