---
source: https://tediousjs.github.io/node-mssql/#connectionpoolparseconnectionstring-connectionstring
---

# ConnectionPool.parseConnectionString(connectionString)

Parses a connection string into a configuration object. This is a static method.

## Signature / Usage

```javascript
const config = sql.ConnectionPool.parseConnectionString('Server=localhost,1433;Database=mydb;User Id=sa;Password=pwd')
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `connectionString` | string | Classic or Azure AD connection string. |

## Notes

- Migration (v7 → v8): the internal connection-string parsing library was removed; connection strings are now resolved via this static `ConnectionPool.parseConnectionString` method instead.

## Related

- [Connection String Formats](../configuration/connection-string-formats.md)
- [connect](./connect.md)
- [Version Migration Changes](../migration/version-changes.md)
