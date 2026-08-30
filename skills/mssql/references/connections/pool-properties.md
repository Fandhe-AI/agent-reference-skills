---
source: https://tediousjs.github.io/node-mssql/#pool-properties
---

# Pool properties

These properties are available on a connected `ConnectionPool` instance (after `connect()` has resolved).

## Signature / Usage

```javascript
const pool = new sql.ConnectionPool({ /* config */ })
await pool.connect()
console.log(pool.healthy, pool.size, pool.available)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `pool.healthy` | `Boolean` | Whether the pool is able to create new connections. |
| `pool.size` | `Number` | Total number of connections in the pool (free + used + pending creation). |
| `pool.available` | `Number` | Number of free connections in the pool. |
| `pool.pending` | `Number` | Number of pending connection acquisition requests. |
| `pool.borrowed` | `Number` | Number of connections currently in use. |
| `pool.connected` | `Boolean` | Whether the pool is connected. |
| `pool.connecting` | `Boolean` | Whether the pool is currently connecting. |

## Notes

- Migration (v4 → v5): `pool.size`/`pool.available`/`pool.pending`/`pool.borrowed` (nested under `pool.pool`) were deprecated in favor of the top-level `ConnectionPool.size`/`available`/`pending`/`borrowed` properties shown above.
- Migration (v5 → v6): `ConnectionPool.healthy` was added to report whether the pool is able to create new connections.

## Related

- [connect](./connect.md)
- [close](./close.md)
- [Version Migration Changes](../migration/version-changes.md)
