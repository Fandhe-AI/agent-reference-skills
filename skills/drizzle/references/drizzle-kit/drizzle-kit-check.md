---
source: https://orm.drizzle.team/docs/drizzle-kit-check
---

# `drizzle-kit check`

Checks the consistency of your generated SQL migrations history — useful when multiple developers alter the database schema on different branches.

## Signature / Usage

```bash
npx drizzle-kit check --dialect=postgresql
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
| `ignore-conflicts` | boolean | `false` | Skip commutativity conflict checks |

## Notes

- Migration (v0 → v1): `check` now performs a commutativity check across migration branches — it builds a DAG from snapshot `prevIds`, finds fork points, computes the DDL diff from parent to each branch leaf, and checks conflicts via a footprint map of interfering DDL statement types (e.g. two branches altering the same column, or a rename vs. an alter). Conflicting migrations are reported by branch. `--ignore-conflicts` bypasses the check.
- See `kit-migrations-for-teams` for the broader team-workflow context (that page is a stub pending a documented v3 migrations folder structure).

### rc.5 changes

- Migration (rc.4 → rc.5): the `postgresql` dialect rejects `--ignore-conflicts` in `generate`, `check` and `migrate`; use `drizzle-kit generate --fix-conflicts` to repair conflicting migration branches (preview with `--explain`). The flag is still listed above for other dialects.
- Source: https://orm.drizzle.team/docs/v0-v1-changes (docs repo commit 55f7f9e, retrieved 2026-11-14)

- [drizzle-kit-generate](./drizzle-kit-generate.md)
- [kit-migrations-for-teams](./kit-migrations-for-teams.md)
