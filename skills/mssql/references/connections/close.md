---
source: https://tediousjs.github.io/node-mssql/#close
---

# close()

Close all active connections in the pool.

## Signature / Usage

```javascript
pool.close()
```

## Notes

- Migration (v5 → v6): `ConnectionPool.close()` now returns a Promise; callbacks are executed once closing of the pool completes. Ensure connections are properly released back to the pool, otherwise the pool may fail to close.

## Related

- [connect](./connect.md)
- [Pool properties](./pool-properties.md)
- [Version Migration Changes](../migration/version-changes.md)
