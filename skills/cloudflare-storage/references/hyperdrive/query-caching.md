---
source: https://developers.cloudflare.com/hyperdrive/concepts/query-caching/
---

# Query caching

Hyperdrive caches eligible read queries by default (`max_age` 60s, `stale_while_revalidate` 15s); writes and non-immutable function queries are not cached.

## Signature / Usage

Create a separate cache-disabled configuration against the same database:

```sh
npx wrangler hyperdrive create my-database-fresh --connection-string="<DATABASE_CONNECTION_STRING>" --caching-disabled
```

Turn off caching on an existing configuration:

```sh
npx wrangler hyperdrive update <HYPERDRIVE_CONFIG_ID> --caching-disabled
```

Bind both and route fresh reads through the cache-disabled binding:

```jsonc
{
	"hyperdrive": [
		{
			"binding": "HYPERDRIVE",
			"id": "<YOUR_HYPERDRIVE_CACHE_ENABLED_CONFIGURATION_ID>",
		},
		{
			"binding": "HYPERDRIVE_CACHE_DISABLED",
			"id": "<YOUR_HYPERDRIVE_CACHE_DISABLED_CONFIGURATION_ID>",
		},
	],
}
```

```ts
export default {
	async fetch(request, env, ctx): Promise<Response> {
		// Create clients inside your handler — not in global scope
		const client = postgres(env.HYPERDRIVE.connectionString);
		// Use the cache-disabled binding for auth, permissions, and reads after writes.
		const clientNoCache = postgres(env.HYPERDRIVE_CACHE_DISABLED.connectionString);
		// ...
	},
} satisfies ExportedHandler<Env>;
```

MySQL variant:

Adapted (not in the official docs): `disableEval: true` added to both connections (required by mysql2 on Workers); see Notes.

```ts
export default {
	async fetch(request, env, ctx): Promise<Response> {
		// Create connections inside your handler — not in global scope
		const connection = await createConnection({
			host: env.HYPERDRIVE.host,
			user: env.HYPERDRIVE.user,
			password: env.HYPERDRIVE.password,
			database: env.HYPERDRIVE.database,
			port: env.HYPERDRIVE.port,
			disableEval: true,
		});
		// Use the cache-disabled binding for auth, permissions, and reads after writes.
		const connectionNoCache = await createConnection({
			host: env.HYPERDRIVE_CACHE_DISABLED.host,
			user: env.HYPERDRIVE_CACHE_DISABLED.user,
			password: env.HYPERDRIVE_CACHE_DISABLED.password,
			database: env.HYPERDRIVE_CACHE_DISABLED.database,
			port: env.HYPERDRIVE_CACHE_DISABLED.port,
			disableEval: true,
		});
		// ...
	},
} satisfies ExportedHandler<Env>;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `max_age` | seconds | Maximum lifetime a response is served from cache; default 60; maximum 1 hour. Entries may be evicted earlier if rarely used |
| `stale_while_revalidate` | seconds | Extra period during which stale results are served while revalidating; default 15 |

Common PostgreSQL functions that are not cacheable:

| Function | PostgreSQL volatility category | Cached |
| --- | --- | --- |
| `NOW()` | STABLE | No |
| `CURRENT_TIMESTAMP` | STABLE | No |
| `CURRENT_DATE` | STABLE | No |
| `CURRENT_TIME` | STABLE | No |
| `LOCALTIME` | STABLE | No |
| `LOCALTIMESTAMP` | STABLE | No |
| `TIMEOFDAY()` | VOLATILE | No |
| `RANDOM()` | VOLATILE | No |
| `LASTVAL()` | VOLATILE | No |
| `TXID_CURRENT()` | STABLE | No |

## Notes

- Mutating queries (`INSERT`, `UPSERT`, `CREATE TABLE`) and queries using functions designated `volatile` or `stable` by PostgreSQL are not cached. Only `IMMUTABLE` functions are compatible. Move the call into application code and pass the value as a parameter:

```sql
-- Cacheable: uses a parameterized date value instead of CURRENT_DATE
SELECT * FROM articles WHERE DATE(published_time) = $1
ORDER BY published_time DESC LIMIT 50
```

```sql
-- Cacheable: uses a parameterized date value instead of CURDATE()
SELECT * FROM articles WHERE DATE(published_time) = ?
ORDER BY published_time DESC LIMIT 50
```

```sql
-- Not cached: mutating queries
INSERT INTO users(id, name, email) VALUES(555, 'Matt', 'hello@example.com');

-- Not cached: LASTVAL() is a volatile function
SELECT LASTVAL(), * FROM articles LIMIT 50;

-- Not cached: NOW() is a stable function
SELECT * FROM events WHERE created_at > NOW() - INTERVAL '1 hour';
```

- MySQL non-cached examples: `SELECT LAST_INSERT_ID(), articles.* FROM articles LIMIT 50;` (volatile) and `SELECT * FROM events WHERE created_at > NOW() - INTERVAL 1 HOUR;` (non-deterministic).
- Corrected from the official docs: the official MySQL example is `SELECT LAST_INSERT_ID(), * FROM articles LIMIT 50;`, which is invalid in MySQL (an unqualified `*` cannot follow another select expression); it is written here as `articles.*`.
- Do not use SQL comments as cache controls: Hyperdrive uses text-based pattern matching to detect uncacheable functions, including names inside comments (`-- NOW()` makes the query uncacheable). Other comment text does not change the cache key: `/* some text here */ SELECT * FROM some_table;` and `/* some different text here */ SELECT * FROM some_table;` share the same cached value. Avoid uncacheable function names anywhere in query text.
- Read-after-write: Hyperdrive does not purge cached reads when you write. A later matching `SELECT` can return a cached result until `max_age` expires (or during the `stale_while_revalidate` window). Choose per read: cache where brief staleness is fine; lower `max_age` / `stale_while_revalidate`; use a cache-disabled configuration for authentication, sessions, permissions, billing, admin settings and reads right after a write; disable caching everywhere only if most reads must be fresh (pooling and fast setup still apply).
- If an ORM or auth library owns the SQL, create separate clients for cached and cache-disabled bindings and pass the cache-disabled client to that library.
- Multiple configurations to the same database: account for the total origin connections across them (see [tune-connection-pool](./tune-connection-pool.md)).
- `wrangler dev` with a local connection string does not use caching.
- Adapted from the official docs: the MySQL variant snippets omit `disableEval: true`, which mysql2 needs on Workers (see [connect-mysql-drivers](./connect-mysql-drivers.md)); both `createConnection` calls now include it. The `postgres(...)` and `createConnection` snippets are fragments (imports and the rest of the handler elided) as in the source.
- `UPSERT` in the list of non-cached mutating queries is the official wording; PostgreSQL's upsert is `INSERT ... ON CONFLICT`, also a write.

## Related

- [How Hyperdrive works](./how-hyperdrive-works.md)
- [Metrics and analytics](./metrics.md)
- [Troubleshoot and debug](./troubleshooting.md)
- [Wrangler commands](./wrangler-commands.md)
