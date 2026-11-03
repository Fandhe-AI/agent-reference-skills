---
source: https://developers.cloudflare.com/d1/worker-api/return-object/
---

# Return objects

`D1Result` (returned by `D1PreparedStatement::run`; `D1Database::batch` returns an array of `D1Result`) and `D1ExecResult` (returned by `D1Database::exec`).

## Signature / Usage

```js
{
  success: boolean, // true if the operation was successful, false otherwise
  meta: {
    served_by: string // the version of Cloudflare's backend Worker that returned the result
    served_by_region: string // the region of the database instance that executed the query
    served_by_primary: boolean // true if (and only if) the database instance that executed the query was the primary
    timings: {
      sql_duration_ms: number // the duration of the SQL query execution by the database instance (not including any network time)
    }
    duration: number, // the duration of the SQL query execution only, in milliseconds
		changes: number, // the number of changes made to the database
		last_row_id: number, // the last inserted row ID, only applies when the table is defined without the `WITHOUT ROWID` option
		changed_db: boolean, // true if something on the database was changed
    size_after: number, // the size of the database after the query is successfully applied
    rows_read: number, // the number of rows read (scanned) by this query
    rows_written: number // the number of rows written by this query
    total_attempts: number //the number of total attempts to successfully execute the query, including retries
  }
  results: array | null, // [] if empty, or null if it does not apply
}
```

`D1ExecResult`:

```js
{
	"count": number, // the number of executed queries
	"duration": number // the duration of the operation, in milliseconds
}
```

## Options / Props

| D1 Worker Binding API | Return object |
| --- | --- |
| `D1PreparedStatement::run` | `D1Result` |
| `D1Database::batch` | `D1Result[]` (array of `D1Result`, one per statement) |
| `D1Database::exec` | `D1ExecResult` |

## Notes

- Corrected from the official docs: the official table lists `D1Database::batch` as returning a single `D1Result`; the D1Database page documents that `batch()` returns an array of `D1Result` objects, each at the position of its originating statement.
- Any numeric value in a column is affected by JavaScript's 52-bit precision for numbers. If you store a very large number (`int64`) and retrieve it, the returned value may be less precise than the original.

## Related

- [Prepared statement methods](./prepared-statements.md)
- [D1Database](./d1-database.md)
