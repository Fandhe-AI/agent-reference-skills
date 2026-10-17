---
source: https://v2.tauri.app/reference/javascript/sql/
---

# @tauri-apps/plugin-sql

Interface with SQL databases through sqlx. Which database engines can be used depends on the drivers enabled on the Rust side of the plugin: SQLite, MySQL and PostgreSQL.

## Signature / Usage

```ts
import Database from '@tauri-apps/plugin-sql'
const db = await Database.load('sqlite:test.db')

// for sqlite & postgres
const result = await db.execute(
   "INSERT into todos (id, title, status) VALUES ($1, $2, $3)",
   [ todos.id, todos.title, todos.status ]
);
const rows = await db.select("SELECT * from todos WHERE id = $1", [ id ]);

// for mysql, use `?` placeholders instead of $1, $2, ...
```

```ts
export default class Database {
  path: string
  constructor(path: string)
  static load(path: string, options?: LoadOptions): Promise<Database>
  static get(path: string): Database
  execute(query: string, bindValues?: unknown[]): Promise<QueryResult>
  select<T>(query: string, bindValues?: unknown[]): Promise<T>
  close(db?: string): Promise<boolean>
}

interface QueryResult {
  rowsAffected: number
  lastInsertId?: number
}
interface LoadOptions {   // @since 2.6.0
  autoCreate?: boolean
}
```

`Database` is `@since 2.0.0`.

## Options / Props

`Database` members

| Name | Type | Description |
| --- | --- | --- |
| path | `string` | Connection string identifying the database on the Rust side, e.g. `sqlite:test.db`, `mysql://user:pass@host/database` or `postgres://user:pass@host/database`. |
| new Database(path) | `string` | Creates an instance without opening a connection. Use `Database.load` to connect, or `Database.get` for a database that is already loaded. |
| Database.load(path, options) | `string`, `LoadOptions` | Connects to the underlying database and returns a `Database` once connected. The database is created if it does not exist yet (unless `options.autoCreate` is `false`), and any migration registered for it on the Rust side is run. |
| Database.get(path) | `string` | Synchronously returns an instance while deferring the actual connection until the first invocation or selection. |
| execute(query, bindValues) | `string`, `unknown[]` | Runs a SQL statement; placeholders are `$1`, `$2`, ... on SQLite and PostgreSQL and `?` on MySQL. Resolves to `QueryResult`. |
| select(query, bindValues) | `string`, `unknown[]` | Runs a SELECT query; resolves to the selected rows, each row an object keyed by column name. |
| close(db) | `string` (optional) | Closes the connection pool. Optionally state the name of a database if you manage more than one; otherwise all database pools are in scope. |

`QueryResult`

| Name | Type | Description |
| --- | --- | --- |
| rowsAffected | `number` | The number of rows affected by the query. |
| lastInsertId | `number` | The last inserted `id`. Not set for Postgres databases; on Postgres use `select` with a `RETURNING` clause (`INSERT INTO todos (title) VALUES ($1) RETURNING id`). |

`LoadOptions` (since 2.6.0)

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| autoCreate | `boolean` | `true` | Whether to automatically create the database if it does not exist yet. |

## Notes

- SQLite: the path is relative to `tauri::path::BaseDirectory::AppConfig` (the app config directory) and must start with `sqlite:`.
- The guest-js JSDoc says `BaseDirectory::App` (a Tauri v1 name); the plugin guide and README state `AppConfig`, which is the existing v2 variant.
- Tauri plugin wrapping sqlx for SQLite / MySQL / PostgreSQL; not a database client library (see the drizzle / mssql skills for those).
- Tauri plugin guest-js binding (Rust core + system WebView). Not Electron's API; see the electron skill for Electron.
- Source: `plugins-workspace@sql-v2.6.0` `plugins/sql/guest-js/index.ts`

## Related

- SQL plugin
