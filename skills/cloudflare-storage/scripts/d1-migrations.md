---
source: https://developers.cloudflare.com/d1/reference/migrations/
---

# D1 migrations

Copy-paste commands to create, list, and apply D1 migrations (SQL files in the `migrations/` folder). See [migrations.md](../references/d1/migrations.md) for details.

## Create a migration

```sh
npx wrangler d1 migrations create <DATABASE> <MESSAGE>
```

Generates a versioned SQL file such as `0000_create_user_table.sql` in `migrations/`. Either the database name or the binding name works, but the binding name can change, so the official docs suggest using the database name. If `migrations_pattern` matches only nested files (as with Drizzle's layout), `migrations create` does not apply; generate migrations with your ORM instead.

## List unapplied migrations

```sh
npx wrangler d1 migrations list <DATABASE>
```

Use `--local`, `--remote`, or `--preview` to choose the target database.

## Apply migrations to a local database

```sh
wrangler d1 migrations apply your-database --local
```

Also usable in CI to prepare a local test database.

## Apply migrations to a remote database

> **Warning**: This changes the production schema. Wrangler captures a backup after applying, and a failing migration is rolled back while earlier successful ones stay applied. In CI or other non-interactive environments the confirmation prompt is skipped. Run `migrations list` first to confirm what will be applied.

```sh
npx wrangler d1 migrations apply <DATABASE> --remote
```

## Defer foreign keys inside a migration (SQL)

When a migration makes changes that would violate foreign key constraints, run this statement before them.

```sql
PRAGMA defer_foreign_keys = true
```
