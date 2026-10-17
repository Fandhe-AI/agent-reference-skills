---
source: https://v2.tauri.app/plugin/sql/
---

# SQL

Plugin providing an interface for the frontend to communicate with SQL databases through sqlx. Supports the SQLite, MySQL and PostgreSQL drivers, enabled by a Cargo feature.

## Signature / Usage

### Supported Platforms

Windows, Linux, macOS, Android, iOS: full support (`sql-v2.6.0`).

### Setup

```sh
npm run tauri add sql
# or: cargo tauri add sql
```

Manual. From `src-tauri`:

```sh
cargo add tauri-plugin-sql
```

From the project root, install the JavaScript guest bindings:

```sh
npm install @tauri-apps/plugin-sql
```

```rust
// src-tauri/src/lib.rs
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_sql::Builder::default().build())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

After installing, run one of the following in `src-tauri` to enable your preferred engine:

```sh
# SQLite
cargo add tauri-plugin-sql --features sqlite
# MySQL
cargo add tauri-plugin-sql --features mysql
# PostgreSQL
cargo add tauri-plugin-sql --features postgres
```

### Usage

All APIs are available through the JavaScript guest bindings. The SQLite path is relative to `BaseDirectory::AppConfig`.

```javascript
import Database from '@tauri-apps/plugin-sql';
// when using `"withGlobalTauri": true`, you may use
// const Database = window.__TAURI__.sql;

const db = await Database.load('sqlite:test.db');
await db.execute('INSERT INTO ...');
```

Connection strings for other engines:

```javascript
const mysqlDb = await Database.load('mysql://user:password@host/test');
const postgresDb = await Database.load('postgres://user:password@host/test');
```

### Syntax

sqlx is the underlying library and its query syntax is used.

SQLite and PostgreSQL use the "$#" syntax when substituting query data:

```javascript
const insertResult = await db.execute(
  'INSERT into todos (id, title, status) VALUES ($1, $2, $3)',
  [todos.id, todos.title, todos.status]
);

const updateResult = await db.execute(
  'UPDATE todos SET title = $1, status = $2 WHERE id = $3',
  [todos.title, todos.status, todos.id]
);
```

MySQL uses "?":

```javascript
const mysqlResult = await db.execute(
  'INSERT into todos (id, title, status) VALUES (?, ?, ?)',
  [todos.id, todos.title, todos.status]
);
```

### Migrations

Migrations are defined in Rust with the `Migration` struct: a unique version number, a description, the SQL to execute, and the kind (Up or Down).

```rust
use tauri_plugin_sql::{Migration, MigrationKind};

let migration = Migration {
    version: 1,
    description: "create_initial_tables",
    sql: "CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT);",
    kind: MigrationKind::Up,
};
```

SQL can also come from a file with `include_str!`:

```rust
let migration = Migration {
    version: 1,
    description: "create_initial_tables",
    sql: include_str!("../drizzle/0000_graceful_boomer.sql"),
    kind: MigrationKind::Up,
};
```

Register migrations on the plugin `Builder` with `add_migrations` for a specific database connection:

```rust
use tauri_plugin_sql::{Builder, Migration, MigrationKind};

fn main() {
    let migrations = vec![
        // Define your migrations here
        Migration {
            version: 1,
            description: "create_initial_tables",
            sql: "CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT);",
            kind: MigrationKind::Up,
        }
    ];

    tauri::Builder::default()
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:mydatabase.db", migrations)
                .build(),
        )
        ...
}
```

To apply migrations when the plugin is initialized, add the connection string to `tauri.conf.json`:

```json
{
  "plugins": {
    "sql": {
      "preload": ["sqlite:mydatabase.db"]
    }
  }
}
```

Alternatively the client-side `load()` also runs the migrations for a given connection string:

```ts
import Database from '@tauri-apps/plugin-sql';
const db = await Database.load('sqlite:mydatabase.db');
```

### Permissions

```json
{
  "permissions": [
    ...,
    "sql:default",
    "sql:allow-execute",
  ]
}
```

`sql:default` enables all reading related operations and allows to load or close a connection (`allow-close`, `allow-load`, `allow-select`).

| Identifier | Notes |
| --- | --- |
| `sql:allow-close` / `sql:deny-close` | close a connection |
| `sql:allow-execute` / `sql:deny-execute` | write statements |
| `sql:allow-load` / `sql:deny-load` | load a connection |
| `sql:allow-select` / `sql:deny-select` | read queries |

## Notes

- Tauri plugin (Rust core + system WebView) that exposes sqlx to the frontend. It is not an ORM or a database client library: for the TypeScript ORM see the drizzle skill, for the Node.js SQL Server client see the mssql skill, for hosted Postgres see the supabase skill.
- All migrations are executed within a transaction; if any migration fails, the entire transaction is rolled back.
- Migration management: each migration needs a unique version number (applied in order); write idempotent migrations; test them thoroughly. Ensure migrations are defined in the correct order and are safe to run multiple times.
- Variable names were made unique where the official per-tab snippets are combined into one block.
- Source: `tauri-apps/plugins-workspace@sql-v2.6.0` `plugins/sql/Cargo.toml`, `plugins/sql/permissions/autogenerated/reference.md`; docs `plugin/sql.mdx` @ `32f68c5`.

## Related

- [store.md](./store.md)
- [../plugin-js-api-core/sql.md](../plugin-js-api-core/sql.md)
