---
source: https://developers.cloudflare.com/d1/reference/migrations/
---

# Migrations

Version your D1 schema with `.sql` migration files in a `migrations` folder, created, listed and applied with Wrangler.

## Signature / Usage

```jsonc
{
	"d1_databases": [
		{
			"binding": "<BINDING_NAME>", // i.e. if you set this to "DB", it will be available in your Worker at `env.DB`
			"database_name": "<DATABASE_NAME>",
			"database_id": "<UUID>",
			"preview_database_id": "<UUID>",
			"migrations_table": "<d1_migrations>", // Customize this value to change your applied migrations table name
			"migrations_dir": "<FOLDER_NAME>", // Specify your custom migration directory
			"migrations_pattern": "<GLOB>" // Optional: discover migrations using a glob pattern (see below)
		}
	]
}
```

Nested layouts (e.g. Drizzle):

```jsonc
{
	"d1_databases": [
		{
			"binding": "DB",
			"database_name": "my-database",
			"database_id": "<UUID>",
			"migrations_dir": "migrations",
			"migrations_pattern": "migrations/*/migration.sql"
		}
	]
}
```

Commands (see Wrangler commands): `wrangler d1 migrations create`, `list`, `apply`.

Temporarily disable foreign key checks while applying a migration:

```sql
PRAGMA defer_foreign_keys = true
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `migrations_dir` | string | Custom migrations directory (default `migrations/`). |
| `migrations_table` | string | Table recording applied migrations (default `d1_migrations`). |
| `migrations_pattern` | glob string | Discover migrations by glob. `*` matches one path segment, `**` any number. |

## Notes

- Each migration file name carries a version number; files are listed sequentially. Features: create an empty migration, list unapplied, apply remaining.
- Use the database name rather than the binding name when running migrations: binding names can change, database names cannot.
- `migrations_pattern` rules: `migrations_dir` must also be set; the pattern must start with `migrations_dir`; each migration is recorded in the migrations table as the path relative to `migrations_dir` (e.g. `0001_init/migration.sql`).
- `wrangler d1 migrations create` only writes top-level files in `migrations_dir`; for nested layouts generate migrations with your ORM (e.g. `drizzle-kit generate`; see the drizzle skill).
- To disable foreign keys during migration use `PRAGMA defer_foreign_keys = true` before violating changes.
- Run schema changes once through migrations, not on your application's hot path.
- Migrations create a backup after apply and roll back a failing migration (see Wrangler commands).

## Related

- [Wrangler commands](./wrangler-commands.md)
- [Define foreign keys](./foreign-keys.md)
- [Local development](./local-development.md)
- [Use indexes](./use-indexes.md)
