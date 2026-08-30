---
source: https://orm.drizzle.team/docs/drizzle-kit-pull
---

# `drizzle-kit pull`

Introspects your existing database schema and generates a `schema.ts` Drizzle schema file (database-first migrations approach). Useful when the database is managed outside the TypeScript project or by someone else.

## Signature / Usage

```bash
npx drizzle-kit pull --dialect=postgresql --url=postgresql://user:password@host:port/dbname
```

Requires `dialect` and database connection credentials, either via `drizzle.config.ts` or CLI options.

```ts
// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://user:password@host:port/dbname",
  },
});
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `dialect` | string | — (required) | Database dialect |
| `driver` | string | — | Driver exception, e.g. `aws-data-api`, `pglite`, `d1-http` |
| `out` | string | `./drizzle` | Output folder path for the generated schema |
| `url` / `user` / `password` / `host` / `port` / `database` | string | — | Connection params |
| `config` | string | `drizzle.config.ts` | Configuration file path |
| `introspect-casing` | `preserve` \| `camel` | — | Strategy for JS keys creation in columns/tables |
| `tablesFilter` | string / string[] | `"*"` | Glob-based table name filter |
| `schemaFilter` | string / string[] | `"*"` | Glob-based schema name filter |
| `extensionsFilters` | string[] | `[]` | Installed database extensions whose own tables should be ignored |
| `init` | boolean | — | Mark the pulled schema as an applied migration so subsequent migrations diff against it |

## Notes

- Migration (v0 → v1): `schemaFilter` now defaults to **all schemas** (previously only `public`) and supports glob patterns. `--init` is a new flag in v1.

## Related

- [drizzle-kit-push](./drizzle-kit-push.md)
- [drizzle-config-file](./drizzle-config-file.md)
