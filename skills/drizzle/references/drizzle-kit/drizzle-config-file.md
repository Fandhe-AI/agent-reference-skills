---
source: https://orm.drizzle.team/docs/drizzle-config-file
---

# Drizzle Kit configuration file

Drizzle Kit lets you declare configuration options in a TypeScript or JavaScript configuration file (`drizzle.config.ts` by default).

## Signature / Usage

```ts
// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema.ts",
  out: "./drizzle",
});
```

Multiple config files are supported for multi-database/multi-stage projects, selected via `--config`:

```bash
drizzle-kit generate --config=drizzle-dev.config.ts
drizzle-kit generate --config=drizzle-prod.config.ts
```

## Options / Props

| Name | Type | Default | Applies to commands |
| --- | --- | --- | --- |
| `dialect` | dialect string (e.g. `postgresql`, `mysql`, `sqlite`, `mssql`, `singlestore`, `gel`) | — (required) | `generate`, `push`, `pull`, `studio`, `migrate`, `up`, `export` |
| `schema` | `string` \| `string[]` (glob) | — (required) | `generate`, `push`, `export`, `studio` |
| `out` | `string` \| `string[]` | `drizzle` | `generate`, `pull`, `migrate`, `check`, `up` |
| `driver` | `aws-data-api` \| `pglite` | — | `push`, `migrate`, `pull`, `studio` |
| `dbCredentials` | dialect-specific object (`url`, or `user`/`password`/`host`/`port`/`database`, or driver-specific fields) | — | `push`, `pull`, `migrate`, `studio` |
| `migrations.table` | `string` | `__drizzle_migrations` | `migrate`, `push`, `pull` |
| `migrations.schema` | `string` | `drizzle` | `migrate`, `push`, `pull` |
| `introspect.casing` | `"preserve"` \| `"camel"` | `"camel"` | `pull` |
| `tablesFilter` | `string` \| `string[]` (glob) | — | `push`, `pull` |
| `schemaFilter` | `string[]` (glob) | — | `push`, `pull` |
| `extensionsFilters` | `["postgis"]`-style array | `[]` | `push`, `pull` |
| `entities.roles` | `boolean` \| `{ provider: "neon" \| "supabase", include: string[], exclude: string[] }` | `false` | `push`, `pull` |
| `verbose` | `boolean` | `false` | `pull` |
| `breakpoints` | `boolean` | `true` | `generate`, `pull` |

## Notes

- `driver` is only needed for vendor-specific exceptions (`aws-data-api`, `pglite`, and `d1-http` for SQLite) — Drizzle Kit otherwise auto-picks the driver from the project based on `dialect`.
- `entities.roles` lets `drizzle-kit` manage database roles; `provider: "neon" | "supabase"` accounts for roles those platforms create automatically so they're excluded from management by default, combinable with explicit `include`/`exclude`.
- Migration (v0 → v1): `schemaFilter` now defaults to managing **all schemas** (previously only `public`) and supports glob patterns (e.g. `"app_*"`).
- The `mssql` dialect's connection is handled entirely through `dbCredentials`/`dialect: "mssql"` here; the low-level node-mssql driver client itself is covered by the separate `mssql` skill.

## Related

- [kit-overview](./kit-overview.md)
- [drizzle-kit-push](./drizzle-kit-push.md)
- [drizzle-kit-pull](./drizzle-kit-pull.md)
