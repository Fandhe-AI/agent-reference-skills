---
source: https://tediousjs.github.io/node-mssql/#msnodesqlv8
---

# MSNodeSQLv8 Driver

Alternative driver for Windows (32 or 64-bit) or Linux/macOS (64-bit only). It's not part of the default package so it must be installed in addition. Supports Windows/Trusted Connection authentication.

## Signature / Usage

To use this driver you must use this `require` statement:

```javascript
const sql = require('mssql/msnodesqlv8')
```

Note: If you use import into your lib to prepare your request (`const { VarChar } = require('mssql')`) you also need to upgrade all your types import into your code (`const { VarChar } = require('mssql/msnodesqlv8')`) or a `connection.on is not a function` error will be thrown.

## Options / Props

**Extra options:**

| Name | Type | Description |
|------|------|-------------|
| `beforeConnect(conn)` | Function | Invoked before opening the connection. The parameter `conn` is the connection configuration, that can be modified to pass extra parameters to the driver's `open()` method. |
| `connectionString` | string | Connection string (default: see Notes). |
| `options.instanceName` | string | The instance name to connect to. The SQL Server Browser service must be running on the database server, and UDP port 1444 on the database server must be reachable. |
| `options.trustedConnection` | boolean | Use Windows Authentication (default: `false`). |
| `options.useUTC` | boolean | Whether or not to use UTC time for values without time zone offset (default: `true`). |

Default connection string when connecting to port:

```
Driver={SQL Server Native Client 11.0};Server={#{server},#{port}};Database={#{database}};Uid={#{user}};Pwd={#{password}};Trusted_Connection={#{trusted}};
```

Default connection string when connecting to named instance:

```
Driver={SQL Server Native Client 11.0};Server={#{server}\\#{instance}};Database={#{database}};Uid={#{user}};Pwd={#{password}};Trusted_Connection={#{trusted}};
```

## Notes

- Please note that the connection string with this driver is not the same than tedious and use yes/no instead of true/false. You can see more on the [ODBC](https://docs.microsoft.com/fr-fr/dotnet/api/system.data.odbc.odbcconnection.connectionstring?view=dotnet-plat-ext-5.0) documentation.
- Migration (v6 → v7): upgraded supported `msnodesqlv8` version to v2.
- Migration (v3 → v4): drivers are no longer loaded dynamically (Webpack-compatible) — this driver now requires the explicit `require('mssql/msnodesqlv8')` statement shown above.

## Related

- [Tedious](./tedious.md)
- [Version Migration Changes](../migration/version-changes.md)
