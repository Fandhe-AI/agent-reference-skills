---
source: https://orm.drizzle.team/docs/rls
---

# Row-Level Security (RLS)

Drizzle exposes a raw representation of Postgres RLS policies and roles that can be attached to any Postgres table, with dedicated helpers for Neon and Supabase.

## Signature / Usage

```ts
import { sql } from "drizzle-orm";
import { integer, pgPolicy, pgRole, pgTable } from "drizzle-orm/pg-core";

export const admin = pgRole("admin");

export const users = pgTable("users", {
  id: integer(),
}, (t) => [
  pgPolicy("policy", {
    as: "permissive",
    to: admin,
    for: "delete",
    using: sql``,
    withCheck: sql``,
  }),
]);
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `as` | `'permissive' \| 'restrictive'` | policy type |
| `to` | role \| `'public' \| 'current_role' \| 'current_user' \| 'session_user'` \| string | role the policy applies to; accepts a `pgRole` object |
| `for` | `'all' \| 'select' \| 'insert' \| 'update' \| 'delete'` | commands the policy applies to |
| `using` | `SQL` | `USING` clause expression |
| `withCheck` | `SQL` | `WITH CHECK` clause expression |

## Notes

- `pgTable.withRLS('name', columns)` enables RLS on a table without any policy; adding any `pgPolicy` to a table auto-enables RLS
- `pgRole(name, { createRole, createDb, inherit })` defines a role; `pgRole(name).existing()` marks a role that already exists in the DB so drizzle-kit does not manage it
- `pgPolicy(...).link(existingTable)` attaches a policy to a table that already exists in the database (common with Neon/Supabase-managed tables)
- `drizzle.config.ts`'s `entities.roles` (`true` / `{ exclude, include, provider: 'neon' | 'supabase' }`) controls which roles drizzle-kit manages in migrations
- RLS on views requires `securityInvoker: true` in the view's `.with({...})` options
- `drizzle-orm/neon` exports `crudPolicy`, `authenticatedRole`, `anonymousRole`, `authUid` helpers for Neon-based RLS
- `drizzle-orm/supabase` exports `anonRole`, `authenticatedRole`, `serviceRole`, predefined `auth.users` / `realtime.messages` tables, and `authUid`/`realtimeTopic` sql helpers for Supabase-based RLS
- The low-level Supabase database connection, project setup, and its client SDK are covered by the separate `supabase` skill; this page only covers Drizzle's RLS policy/role API and its Supabase-specific helper imports

## Related

- [Views](./views.md)
- [Schema declaration](./sql-schema-declaration.md)
