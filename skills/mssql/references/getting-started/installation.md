---
source: https://tediousjs.github.io/node-mssql/#installation
---

# Installation

Supported TDS drivers: Tedious (pure JavaScript - Windows/macOS/Linux, default) and MSNodeSQLv8 (Microsoft / Contributors Node V8 Driver for Node.js for SQL Server, v2-v6 native - Windows or Linux/macOS 64 bits only).

## Signature / Usage

### Tedious driver (default)

```
npm install mssql
```

### MSNodeSQLv8 driver (optional)

```
npm install mssql msnodesqlv8
```

## Notes

- msnodesqlv8 6 needs Node.js 22 or later. On an older Node.js, install msnodesqlv8 5 (`npm install mssql msnodesqlv8@5`).
- Source: https://raw.githubusercontent.com/tediousjs/node-mssql/v12.7.14/README.md (tag v12.7.14, fetched 2026-11-14)

## Related

- [SQL Server prerequisites](./sql-server-prerequisites.md)
- [Short Example: Use Connect String](./connect-string-example.md)
