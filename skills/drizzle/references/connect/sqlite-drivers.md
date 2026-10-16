---
source: https://orm.drizzle.team/docs/sqlite/get-started-sqlite
---

# SQLite drivers (better-sqlite3 / libSQL-Turso / Turso Database / SQLite Cloud / Bun SQLite / Node SQLite / D1 / Durable Objects / Expo / OP SQLite)

Drizzle ORM has native support for SQLite connections across several drivers: `better-sqlite3`, `libsql` (local files or Turso remote databases), Turso Database (`@tursodatabase/*`), SQLite Cloud, `node:sqlite`, `bun:sqlite`, Cloudflare D1, Cloudflare Durable Objects SQLite, Expo SQLite, and OP SQLite. All mirror the SQLite-like `all`, `get`, `values`, and `run` query methods.

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

```ts
// Turso Database (@tursodatabase/database)
import { drizzle } from 'drizzle-orm/tursodatabase/database';

const db = drizzle('sqlite.db');

const result = await db.all('select 1');
```

```ts
// Turso Database Serverless (@tursodatabase/serverless)
import { connect } from '@tursodatabase/serverless';
import { drizzle } from 'drizzle-orm/tursodatabase-serverless';

const client = connect({
  url: process.env.TURSO_URL,
  authToken: process.env.TURSO_TOKEN,
});
const db = drizzle({ client });
```

```ts
// Turso Database Sync (@tursodatabase/sync)
import { connect } from '@tursodatabase/sync';
import { drizzle } from 'drizzle-orm/tursodatabase-sync';

const client = await connect({
  path: 'local.db',                // path used as a prefix for local files created by sync-engine
  url: 'https://<db>.turso.io',    // URL of the remote database: turso db show <db>
  authToken: '...',                // auth token issued from the Turso Cloud: turso db tokens create <db>
  clientName: 'turso-sync-example' // arbitrary client name
});
const db = drizzle({ client });
```

```ts
// SQLite Cloud (@sqlitecloud/drivers)
import { drizzle } from 'drizzle-orm/sqlite-cloud';

const db = drizzle(process.env.SQLITE_CLOUD_CONNECTION_STRING);

const result = await db.all('select 1');
```

```ts
// Cloudflare Durable Objects SQLite — storage-backed; migrate at start-up inside the Durable Object
import { drizzle, DrizzleSqliteDODatabase } from 'drizzle-orm/durable-sqlite';
import { DurableObject } from 'cloudflare:workers'
import { migrate } from 'drizzle-orm/durable-sqlite/migrator';
import migrations from '../drizzle/migrations';

export class MyDurableObject extends DurableObject {
	storage: DurableObjectStorage;
	db: DrizzleSqliteDODatabase<any>;

	constructor(ctx: DurableObjectState, env: Env) {
		super(ctx, env);
		this.storage = ctx.storage;
		this.db = drizzle(this.storage, { logger: false });

		// Make sure all migrations complete before accepting queries.
		ctx.blockConcurrencyWhile(async () => {
			await this._migrate();
		});
	}

	async _migrate() {
		migrate(this.db, migrations);
	}
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `drizzle-orm/better-sqlite3` | package | Native, synchronous `better-sqlite3` driver |
| `drizzle-orm/libsql` | package | `@libsql/client`; connects to local SQLite files or Turso remote databases |
| `drizzle-orm/tursodatabase/database` | package | Turso Database local driver, via `@tursodatabase/database` |
| `drizzle-orm/tursodatabase-serverless` | package | Turso Database over the wire, via `@tursodatabase/serverless` (`connect`; `TURSO_URL` / `TURSO_TOKEN`) |
| `drizzle-orm/tursodatabase-sync` | package | Turso Database sync engine, via `@tursodatabase/sync` (`connect` with `path` / `url` / `authToken` / `clientName`) |
| `drizzle-orm/sqlite-cloud` | package | SQLite Cloud, via `@sqlitecloud/drivers` |
| `drizzle-orm/durable-sqlite` | package | Cloudflare Durable Objects SQLite (`DrizzleSqliteDODatabase`); migrator at `drizzle-orm/durable-sqlite/migrator` |
| `drizzle-orm/node-sqlite` | package | Node's built-in `node:sqlite` module; both sync and async APIs |
| `drizzle-orm/bun-sqlite` | package | Bun's built-in `bun:sqlite` module; both sync and async APIs |
| `drizzle-orm/d1` | package | Cloudflare D1, Cloudflare's queryable relational database |
| `drizzle-orm/expo-sqlite` | package | Expo SQLite; supports Drizzle Kit migrations bundled into the app and `useLiveQuery` |
| `drizzle-orm/op-sqlite` | package | OP-SQLite (`@op-engineering/op-sqlite`), embeds the latest SQLite with a low-level API |

## Notes

- Transcribed from `sqlite/get-started-sqlite.mdx`, `sqlite/connect-turso.mdx`, `sqlite/connect-bun-sqlite.mdx`, `sqlite/connect-node-sqlite.mdx`, `sqlite/connect-cloudflare-d1.mdx`, `sqlite/connect-expo-sqlite.mdx`, `sqlite/connect-op-sqlite.mdx`, `sqlite/connect-turso-database.mdx`, `sqlite/connect-turso-serverless.mdx`, `sqlite/connect-turso-sync.mdx`, `sqlite/connect-sqlite-cloud.mdx`, `sqlite/connect-cloudflare-do.mdx`, `sqlite/connect-react-native-sqlite.mdx`.
- Cloudflare Durable Objects SQLite needs a `wrangler.toml` with a `[[durable_objects.bindings]]` entry, a `[[migrations]]` entry with `new_sqlite_classes`, and a `[[rules]]` entry (`type = "Text"`, `globs = ["**/*.sql"]`) so generated migrations can be imported. Run the migrator inside `ctx.blockConcurrencyWhile` in the constructor; bundling database work into a single Durable Object call is the fastest option, since every individual query call is a round-trip to the Durable Object.
- React Native SQLite: the official page is a stub — use Expo SQLite instead, because the popular React Native SQLite library does not support the Hermes runtime.
- `libSQL` is a fork of SQLite offering more ALTER statements, native encryption-at-rest configuration, and a larger set of supported extensions compared to `better-sqlite3`.
- `node:sqlite` and `bun:sqlite` are synchronous drivers exposed with both async and sync APIs (`.all()`, `.get()`, `.values()`, `.run()`).
- Expo SQLite and OP SQLite require SQL migrations bundled into the app: install `babel-plugin-inline-import`, update `babel.config.js`/`metro.config.js` to handle `.sql` extensions, and set `driver: 'expo'` in `drizzle.config.ts`; then run `useMigrations` at startup with the generated `migrations.js`.
- Expo SQLite's `useLiveQuery` hook makes a Drizzle query reactive; requires `openDatabaseSync(..., { enableChangeListener: true })`.
- In the Turso Database Sync example, `url: 'https://<db>.turso.io'` and `authToken: '...'` are placeholders copied verbatim from the official `connect-turso-sync.mdx`; replace them with the values from `turso db show <db>` and `turso db tokens create <db>` (keep the token in an environment variable).
- Cloudflare D1 requires a `wrangler.json`/`wrangler.toml` with a `d1_databases` binding.

## Related

- [PostgreSQL](./get-started-postgresql.md)
- [MySQL drivers](./mysql-drivers.md)
- [Database connection overview](./connect-overview.md)
