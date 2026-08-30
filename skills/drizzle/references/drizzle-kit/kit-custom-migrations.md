---
source: https://orm.drizzle.team/docs/kit-custom-migrations
---

# Custom migrations

Drizzle lets you generate empty migration files to write your own custom SQL migrations for DDL alterations not currently supported by Drizzle Kit, or for data seeding. Run them with `drizzle-kit migrate`.

## Signature / Usage

```bash
drizzle-kit generate --custom --name=seed-users
```

```sql
-- ./drizzle/20242409135510_seed-users/migration.sql

INSERT INTO "users" ("name") VALUES('Dan');
INSERT INTO "users" ("name") VALUES('Andrew');
INSERT INTO "users" ("name") VALUES('Dandrew');
```

## Notes

- Running custom JavaScript/TypeScript migration or seeding scripts is planned for an upcoming release (tracked in GitHub discussion #2832); not yet available.

## Related

- [drizzle-kit-generate](./drizzle-kit-generate.md)
- [drizzle-kit-migrate](./drizzle-kit-migrate.md)
