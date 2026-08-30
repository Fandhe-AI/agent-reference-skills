---
source: https://tediousjs.github.io/node-mssql/#tedious
---

# Tedious Driver

Default driver, actively maintained and production ready. Platform independent, runs everywhere Node.js runs. Officially supported by Microsoft.

## Signature / Usage

```js
require('mssql').connect({...config, beforeConnect: conn => {
  conn.once('connect', err => { err ? console.error(err) : console.log('mssql connected')})
  conn.once('end', err => { err ? console.error(err) : console.log('mssql disconnected')})
}})
```

## Options / Props

**Extra options:**

| Name | Type | Description |
|------|------|-------------|
| `beforeConnect(conn)` | Function | Invoked before opening the connection. The parameter `conn` is the configured tedious `Connection`. Can be used for attaching event handlers. |
| `options.instanceName` | string | The instance name to connect to. The SQL Server Browser service must be running on the database server, and UDP port 1434 on the database server must be reachable. |
| `options.useUTC` | boolean | Whether or not use UTC time for values without time zone offset (default: `true`). |
| `options.encrypt` | boolean | Whether or not the connection will be encrypted (default: `true`). |
| `options.tdsVersion` | string | The version of TDS to use (default: `7_4`, available: `7_1`, `7_2`, `7_3_A`, `7_3_B`, `7_4`). |
| `options.appName` | string | Application name used for SQL server logging. |
| `options.abortTransactionOnError` | boolean | Whether to rollback a transaction automatically if any error is encountered during the given transaction's execution. This sets the value for `XACT_ABORT` during the initial SQL phase of a connection. |

**Authentication:**

On top of the extra options, an `authentication` property can be added to the pool config option.

| Name | Type | Description |
|------|------|-------------|
| `authentication` | object | Authentication settings, according to the [Tedious Documentation](https://tediousjs.github.io/tedious/api-connection.html). Passing this object will override `user`, `password`, `domain` settings. |
| `authentication.type` | string | Type of the authentication method, valid types are `default`, `ntlm`, `azure-active-directory-password`, `azure-active-directory-access-token`, `azure-active-directory-msi-vm`, or `azure-active-directory-msi-app-service`. |
| `authentication.options` | object | Options of the authentication required by the `tedious` driver, depends on `authentication.type`. For more details, check [Tedious Authentication Interfaces](https://github.com/tediousjs/tedious/blob/v11.1.1/src/connection.ts#L200-L318). |

## Notes

- `tedious` does not support Windows Authentication/Trusted Connection, however the `msnodesqlv8` driver does.
- More information about Tedious specific options: http://tediousjs.github.io/tedious/api-connection.html
- Migration (v11 → v12): upgraded bundled `tedious` to version 19. (v10 → v11: version 18; v9 → v10: version 16; v8 → v9: version 15; v7 → v8: version 14; v6 → v7: version 11; v5 → v6: version 6.)
- Migration (v6 → v7): tedious config option `trustServerCertificate` now defaults to `false` if not supplied.
- Migration (v5 → v6): `options.encrypt` now defaults to `true`.

## Related

- [MSNodeSQLv8](./msnodesqlv8.md)
- [Version Migration Changes](../migration/version-changes.md)
