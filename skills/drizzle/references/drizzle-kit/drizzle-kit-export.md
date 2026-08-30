---
source: https://orm.drizzle.team/docs/drizzle-kit-export
---

# `drizzle-kit export`

Exports the SQL representation of the Drizzle schema and prints the SQL DDL to the console, allowing external tools (e.g. Atlas) to handle migrations.

## Signature / Usage

```bash
npx drizzle-kit export --dialect=postgresql --schema=./src/schema.ts
```

Requires `dialect` and `schema`, either via `drizzle.config.ts` or CLI options.

```ts
// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema.ts",
});
```

```bash
npx drizzle-kit export --config=./configs/drizzle.config.ts
# outputs:
# CREATE TABLE "users" (
#         "id" serial PRIMARY KEY,
#         "email" text NOT NULL,
#         "name" text
# );
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `dialect` | string | — (required) | Database dialect |
| `schema` | string | — (required) | Path to TypeScript schema file(s) or folder(s) |
| `config` | string | `drizzle.config.ts` | Configuration file path |
| `--sql` | boolean | `true` | Generates SQL representation of the Drizzle schema (only output format currently supported) |

## Related

- [drizzle-kit-generate](./drizzle-kit-generate.md)
- [drizzle-config-file](./drizzle-config-file.md)
