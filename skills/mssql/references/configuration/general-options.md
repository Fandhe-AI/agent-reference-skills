---
source: https://tediousjs.github.io/node-mssql/#general-same-for-all-drivers
---

# General (same for all drivers)

Configuration options accepted by the `config` object that are shared across all drivers (`tedious` and `msnodesqlv8`).

## Signature / Usage

```javascript
const config = {
    user: '...',
    password: '...',
    server: 'localhost',
    database: '...',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `user` | string | User name to use for authentication. |
| `password` | string | Password to use for authentication. |
| `server` | string | Server to connect to. You can use `'localhost\\instance'` to connect to named instance. |
| `port` | number | Port to connect to (default: `1433`). Don't set when connecting to named instance. |
| `domain` | string | Once you set domain, driver will connect to SQL Server using domain login. |
| `database` | string | Database to connect to (default: dependent on server configuration). |
| `connectionTimeout` | number | Connection timeout in ms (default: `15000`). |
| `requestTimeout` | number | Request timeout in ms (default: `15000`). NOTE: msnodesqlv8 driver doesn't support timeouts < 1 second. When passed via connection string, the key must be `request timeout` |
| `stream` | boolean | Stream recordsets/rows instead of returning them all at once as an argument of callback (default: `false`). You can also enable streaming for each request independently (`request.stream = true`). Always set to `true` if you plan to work with large amount of rows. |
| `parseJSON` | boolean | Parse JSON recordsets to JS objects (default: `false`). For more information please see section JSON support. |
| `pool.max` | number | The maximum number of connections there can be in the pool (default: `10`). |
| `pool.min` | number | The minimum of connections there can be in the pool (default: `0`). |
| `pool.idleTimeoutMillis` | number | The Number of milliseconds before closing an unused connection (default: `30000`). |
| `arrayRowMode` | boolean | Return row results as an array instead of a keyed object. Also adds `columns` array. (default: `false`) See Handling Duplicate Column Names |
| `validateConnection` | boolean | Controls how connections are validated when acquired from the pool. See Connection Validation for details. (default: `true`) |

## Notes

- Complete list of pool options can be found at https://github.com/vincit/tarn.js/#usage.

## Related

- [connection-string-formats](./connection-string-formats.md)
- [azure-ad-connection-string](./azure-ad-connection-string.md)
