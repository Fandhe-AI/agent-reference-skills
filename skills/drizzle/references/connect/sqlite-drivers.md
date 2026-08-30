---
source: https://orm.drizzle.team/docs/sqlite/get-started-sqlite
---

# SQLite drivers (better-sqlite3 / libSQL-Turso / Bun SQLite / Node SQLite / D1 / Expo / OP SQLite)

Drizzle ORM has native support for SQLite connections across several drivers: `better-sqlite3`, `libsql` (local files or Turso remote databases), `node:sqlite`, `bun:sqlite`, Cloudflare D1, Expo SQLite, and OP SQLite. All mirror the SQLite-like `all`, `get`, `values`, and `run` query methods.

## Signature / Usage

```ts
// better-sqlite3
import { drizzle } from 'drizzle-orm/better-sqlite3';

const db = drizzle(process.env.DB_FILE_NAME);

const result = await db.all('select 1');
```

```ts
// libSQL / Turso — connects to local SQLite files or Turso remote databases
import { drizzle } from 'drizzle-orm/libsql';

const db = drizzle(process.env.DATABASE_URL);

const result = await db.all('select 1');
```

```ts
// libSQL with explicit client (Turso remote)
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

const client = createClient({
  url: process.env.DATABASE_URL,
  authToken: process.env.DATABASE_AUTH_TOKEN,
});
const db = drizzle({ client });
```

```ts
// bun:sqlite
import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';

const sqlite = new Database('sqlite.db');
const db = drizzle({ client: sqlite });

// sync API also available
const result = db.select().from(users).all();
```

```ts
// node:sqlite
import { drizzle } from 'drizzle-orm/node-sqlite';

const db = drizzle('sqlite.db');

const result = await db.execute('select 1');
```

```ts
// Cloudflare D1 (inside a Worker)
import { drizzle } from 'drizzle-orm/d1';

export default {
  async fetch(request: Request, env: { BINDING_NAME: D1Database }) {
    const db = drizzle(env.BINDING_NAME);
    const result = await db.select().from(users).all();
    return Response.json(result);
  },
};
```

```ts
// Expo SQLite
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { openDatabaseSync } from 'expo-sqlite';

const expo = openDatabaseSync('db.db');
const db = drizzle(expo);

await db.select().from(users);
```

```ts
// OP SQLite
import { drizzle } from 'drizzle-orm/op-sqlite';
import { open } from '@op-engineering/op-sqlite';

const opsqlite = open({ name: 'myDB' });
const db = drizzle(opsqlite);

await db.select().from(users);
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `drizzle-orm/better-sqlite3` | package | Native, synchronous `better-sqlite3` driver |
| `drizzle-orm/libsql` | package | `@libsql/client`; connects to local SQLite files or Turso remote databases |
| `drizzle-orm/node-sqlite` | package | Node's built-in `node:sqlite` module; both sync and async APIs |
| `drizzle-orm/bun-sqlite` | package | Bun's built-in `bun:sqlite` module; both sync and async APIs |
| `drizzle-orm/d1` | package | Cloudflare D1, Cloudflare's queryable relational database |
| `drizzle-orm/expo-sqlite` | package | Expo SQLite; supports Drizzle Kit migrations bundled into the app and `useLiveQuery` |
| `drizzle-orm/op-sqlite` | package | OP-SQLite (`@op-engineering/op-sqlite`), embeds the latest SQLite with a low-level API |

## Notes

- Transcribed from `sqlite/get-started-sqlite.mdx`, `sqlite/connect-turso.mdx`, `sqlite/connect-bun-sqlite.mdx`, `sqlite/connect-node-sqlite.mdx`, `sqlite/connect-cloudflare-d1.mdx`, `sqlite/connect-expo-sqlite.mdx`, `sqlite/connect-op-sqlite.mdx`.
- `libSQL` is a fork of SQLite offering more ALTER statements, native encryption-at-rest configuration, and a larger set of supported extensions compared to `better-sqlite3`.
- `node:sqlite` and `bun:sqlite` are synchronous drivers exposed with both async and sync APIs (`.all()`, `.get()`, `.values()`, `.run()`).
- Expo SQLite and OP SQLite require SQL migrations bundled into the app: install `babel-plugin-inline-import`, update `babel.config.js`/`metro.config.js` to handle `.sql` extensions, and set `driver: 'expo'` in `drizzle.config.ts`; then run `useMigrations` at startup with the generated `migrations.js`.
- Expo SQLite's `useLiveQuery` hook makes a Drizzle query reactive; requires `openDatabaseSync(..., { enableChangeListener: true })`.
- Cloudflare D1 requires a `wrangler.json`/`wrangler.toml` with a `d1_databases` binding.

## Related

- [PostgreSQL](./get-started-postgresql.md)
- [MySQL drivers](./mysql-drivers.md)
- [Database connection overview](./connect-overview.md)
