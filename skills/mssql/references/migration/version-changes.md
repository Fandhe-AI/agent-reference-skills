---
source: https://tediousjs.github.io/node-mssql/#11x-to-12x-changes
---

# Version Migration Changes

Breaking and notable changes between consecutive major versions of `mssql` (node-mssql), from 3.x through 12.x, as documented in the official README.

## Overview

| From → To | Breaking changes (summary) | Affected API |
|---|---|---|
| 11.x → 12.x | Config objects no longer cloned by the library; `rfdc` dependency removed; upgraded to `tedious` v19; upgraded `@tediousjs/connection-string` to 0.6.x | `ConnectionPool` config |
| 10.x → 11.x | Upgraded to `tedious` v18; dropped support for Node <= 16 | driver, Node runtime |
| 9.x → 10.x | Upgraded to `tedious` v16; dropped support for Node <= 14 | driver, Node runtime |
| 8.x → 9.x | Upgraded to `tedious` v15; dropped support for Node <= 12 | driver, Node runtime |
| 7.x → 8.x | Upgraded to `tedious` v14; removed internal connection-string parsing library, replaced by static `ConnectionPool.parseConnectionString` | `ConnectionPool.parseConnectionString` |
| 6.x → 7.x | Upgraded `tedious` to v11, `msnodesqlv8` to v2, `tarn.js` to v3; stream-mode requests piping into other streams no longer pass errors up the chain; `Request.pipe` now pipes a true Node stream; tedious `trustServerCertificate` defaults to `false`; dropped support for Node < 10 | `Request#pipe`, tedious config |
| 5.x → 6.x | `tarn.js` upgrade enables promise-based `_poolDestroy`; `ConnectionPool.close()` now returns a promise/callback on full pool close; config objects now cloned (safe to reuse read-only); `options.encrypt` defaults to `true`; `TYPES.Null` removed; upgraded `tedious` to v6, `msnodesqlv8` support upgraded; closing global connection by reference now cleans up the global connection; repeat `sql.connect()` calls return the existing global connection instead of throwing; adding a parameter to queries/procedures now throws (use `replaceInput`/`replaceOutput`); invalid isolation levels passed to `Transaction` now throw; `ConnectionPool.healthy` added; pause/resume support added for streamed results on `msnodesqlv8` | `ConnectionPool.close`, `TYPES.Null`, `sql.connect`, `replaceInput`/`replaceOutput`, `Transaction`, `ConnectionPool.healthy` |
| 4.x → 5.x | Pool library moved from `node-pool` to `tarn.js`; `ConnectionPool.pool.size`/`available`/`pending`/`borrowed` deprecated in favor of `ConnectionPool.size`/`available`/`pending`/`borrowed` | `ConnectionPool.pool.*` |
| 3.x → 4.x | Library & tests rewritten to ES6; `Connection` renamed to `ConnectionPool`; drivers no longer loaded dynamically (Webpack-compatible) — `msnodesqlv8` driver now requires `require('mssql/msnodesqlv8')`; every callback/resolve now returns a single `result` object (`recordsets`, `recordset`, `rowsAffected`, `output`); affected rows now returned as an array (one number per SQL statement); `multiple: true` directive removed; `Transaction` and `PreparedStatement` internal queues removed; `ConnectionPool` no longer emits `connect`/`close` events; verbose and debug mode removed; support for `tds` and `msnodesql` drivers removed; dropped support for Node < 4 | `ConnectionPool` (renamed from `Connection`), driver require path, result object shape, `Transaction`, `PreparedStatement` |

## 11.x to 12.x changes

- Config objects are no longer cloned by the library. Mutating a config object after passing it to a `ConnectionPool` results in undefined behaviour.
- Removed `rfdc` dependency
- Upgraded to tedious version 19
- Upgraded `@tediousjs/connection-string` to 0.6.x

## 10.x to 11.x changes

- Upgraded to tedious version 18
- Dropped support for Node version <=16

## 9.x to 10.x changes

- Upgraded to tedious version 16
- Dropped support for Node version <= 14

## 8.x to 9.x changes

- Upgraded to tedious version 15
- Dropped support for Node version <= 12

## 7.x to 8.x changes

- Upgraded to tedious version 14
- Removed internal library for connection string parsing. Connection strings can be resolved using the static method `parseConnectionString` on ConnectionPool

```javascript
const config = sql.ConnectionPool.parseConnectionString('Server=localhost,1433;Database=mydb;User Id=sa;Password=pwd')
```

## 6.x to 7.x changes

- Upgraded tedious version to v11
- Upgraded msnodesqlv8 version support to v2
- Upgraded tarn.js version to v3
- Requests in stream mode that pipe into other streams no longer pass errors up the stream chain
- Request.pipe now pipes a true node stream for better support of backpressure
- tedious config option `trustServerCertificate` defaults to `false` if not supplied
- Dropped support for Node < 10

## 5.x to 6.x changes

- Upgraded `tarn.js` so `_poolDestroy` can take advantage of being a promise
- `ConnectionPool.close()` now returns a promise / callbacks will be executed once closing of the pool is complete; you must make sure that connections are properly released back to the pool otherwise the pool may fail to close.
- It is safe to pass read-only config objects to the library; config objects are now cloned
- `options.encrypt` is now `true` by default
- `TYPES.Null` has now been removed
- Upgraded tedious driver to v6 and upgraded support for msnodesqlv8]
- You can now close the global connection by reference and this will clean up the global connection, eg: `const conn = sql.connect(); conn.close()` will be the same as `sql.close()`
- Bulk table inserts will attempt to coerce dates from non-Date objects if the column type is expecting a date
- Repeat calls to the global connect function (`sql.connect()`) will return the current global connection if it exists (rather than throwing an error)
- Attempting to add a parameter to queries / stored procedures will now throw an error; use `replaceInput` and `replaceOutput` instead
- Invalid isolation levels passed to `Transaction`s will now throw an error
- `ConnectionPool` now reports if it is healthy or not (`ConnectionPool.healthy`) which can be used to determine if the pool is able to create new connections or not
- Pause/Resume support for streamed results has been added to the msnodesqlv8 driver

## 4.x to 5.x changes

- Moved pool library from `node-pool` to `tarn.js`
- `ConnectionPool.pool.size` deprecated, use `ConnectionPool.size` instead
- `ConnectionPool.pool.available` deprecated, use `ConnectionPool.available` instead
- `ConnectionPool.pool.pending` deprecated, use `ConnectionPool.pending` instead
- `ConnectionPool.pool.borrowed` deprecated, use `ConnectionPool.borrowed` instead

## 3.x to 4.x changes

- Library & tests are rewritten to ES6.
- `Connection` was renamed to `ConnectionPool`.
- Drivers are no longer loaded dynamically so the library is now compatible with Webpack. To use `msnodesqlv8` driver, use `const sql = require('mssql/msnodesqlv8')` syntax.

```javascript
// 3.x to 4.x driver require change
const sql = require('mssql/msnodesqlv8')
```

- Every callback/resolve now returns `result` object only. This object contains `recordsets` (array of recordsets), `recordset` (first recordset from array of recordsets), `rowsAffected` (array of numbers representig number of affected rows by each insert/update/delete statement) and `output` (key/value collection of output parameters' values).
- Affected rows are now returned as an array. A separate number for each SQL statement.
- Directive `multiple: true` was removed.
- `Transaction` and `PreparedStatement` internal queues was removed.
- ConnectionPool no longer emits `connect` and `close` events.
- Removed verbose and debug mode.
- Removed support for `tds` and `msnodesql` drivers.
- Removed support for Node versions lower than 4.

## Notes

- This page consolidates all 9 version-migration sections from the official README verbatim; individual API pages carry per-page `## Notes` entries for changes that affect them directly.

## Related

- getting-started/installation
- drivers/tedious
- drivers/msnodesqlv8
- connections/connection-pools
- transactions/transaction
