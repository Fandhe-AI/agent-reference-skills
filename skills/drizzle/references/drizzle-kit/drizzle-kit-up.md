---
source: https://orm.drizzle.team/docs/drizzle-kit-up
---

# `drizzle-kit up`

Upgrades Drizzle schema snapshots to a newer version. Required whenever Drizzle Kit introduces breaking changes to the JSON snapshot format and bumps its internal version.

## Signature / Usage

```bash
npx drizzle-kit up --dialect=postgresql
```

Requires `dialect`, either via `drizzle.config.ts` or CLI options.

```ts
// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
});
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `dialect` | string | — (required) | Database dialect |
| `out` | string | `./drizzle` | Migrations folder |
| `config` | string | `drizzle.config.ts` | Configuration file path |

## Notes

- Migration (v0 → v1): running `drizzle-kit up` performs the migrations-log-table upgrade — it adds the `name` and `applied_at` columns and backfills existing rows via a multi-step strategy (millis match against folder timestamps, hash tiebreaker for same-second migrations, hash-only fallback if millis matching fails).

## Related

- [drizzle-kit-migrate](./drizzle-kit-migrate.md)
- [drizzle-kit-check](./drizzle-kit-check.md)
