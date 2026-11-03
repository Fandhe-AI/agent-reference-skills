---
source: https://developers.cloudflare.com/d1/wrangler-commands/
---

# Wrangler commands

D1 Wrangler commands use REST APIs to interact with the control plane. Each command is run as `npx wrangler d1 ...` (or `yarn wrangler` / `pnpm wrangler`).

## Signature / Usage

```sh
npx wrangler d1 create <NAME>
npx wrangler d1 info <NAME>
npx wrangler d1 list
npx wrangler d1 delete <NAME>
npx wrangler d1 execute <DATABASE>
npx wrangler d1 export <NAME>
npx wrangler d1 time-travel info <DATABASE>
npx wrangler d1 time-travel restore <DATABASE>
npx wrangler d1 migrations create <DATABASE> <MESSAGE>
npx wrangler d1 migrations list <DATABASE>
npx wrangler d1 migrations apply <DATABASE>
npx wrangler d1 insights <NAME>
```

## Options / Props

### `d1 create`

Creates a new D1 database and provides the binding and UUID for your config file. Acts on remote D1 databases.

| Name | Type | Description |
|------|------|-------------|
| `<NAME>` | string, required | The name of the new D1 database |
| `--location` | string | A hint for the primary location of the new DB. Options: `weur` Western Europe, `eeur` Eastern Europe, `apac` Asia Pacific, `oc` Oceania, `wnam` Western North America, `enam` Eastern North America |
| `--jurisdiction` | string | Restrict the database to run and store data within a jurisdiction. If set, the location hint is ignored. Options: `eu` European Union, `fedramp` FedRAMP-compliant data centers, `us` United States |
| `--use-remote` | boolean | Use a remote binding when adding the newly created resource to your config |
| `--update-config` | boolean | Automatically update your config file with the newly added resource |
| `--binding` | string | The binding name of this resource in your Worker |

### `d1 info`

Get information about a D1 database, including the current database size and state. Acts on remote D1 databases.

| Name | Type | Description |
|------|------|-------------|
| `<NAME>` | string, required | The name of the DB |
| `--json` | boolean (default false) | Return output as JSON |

### `d1 list`

List all D1 databases in your account. Acts on remote D1 databases.

| Name | Type | Description |
|------|------|-------------|
| `--json` | boolean (default false) | Return output as JSON |

### `d1 delete`

Delete a D1 database. Acts on remote D1 databases.

| Name | Type | Description |
|------|------|-------------|
| `<NAME>` | string, required | The name or binding of the DB |
| `--skip-confirmation` (alias `--y`) | boolean (default false) | Skip confirmation |

### `d1 execute`

Execute a command or SQL file. You must provide either `--command` or `--file`.

| Name | Type | Description |
|------|------|-------------|
| `<DATABASE>` | string, required | The name or binding of the DB |
| `--command` | string | The SQL query you wish to execute, or multiple queries separated by ';' |
| `--file` | string | A .sql file to ingest |
| `--yes` (alias `--y`) | boolean | Answer "yes" to any prompts |
| `--local` | boolean | Execute against a local DB for use with `wrangler dev` |
| `--remote` | boolean | Execute against a remote D1 database for use with remote bindings or your deployed Worker |
| `--persist-to` | string | Directory to use for local persistence (for use with `--local`) |
| `--json` | boolean (default false) | Return output as JSON |
| `--preview` | boolean (default false) | Execute against a preview D1 database |

### `d1 export`

Export the contents or schema of your database as a .sql file.

| Name | Type | Description |
|------|------|-------------|
| `<NAME>` | string, required | The name of the D1 database to export |
| `--local` | boolean | Export from your local DB you use with `wrangler dev` |
| `--remote` | boolean | Export from a remote D1 database |
| `--skip-confirmation` (alias `--y`) | boolean (default false) | Skip confirmation |
| `--output` | string, required | Path to the SQL file for your export |
| `--table` | string | Which tables to include in export |
| `--no-schema` | boolean | Only output table contents, not the DB schema |
| `--no-data` | boolean | Only output table schema, not the contents |

### `d1 time-travel info`

Retrieve information about a database at a specific point-in-time. Acts on remote D1 databases.

| Name | Type | Description |
|------|------|-------------|
| `<DATABASE>` | string, required | The name or binding of the DB |
| `--timestamp` | string | A Unix (seconds from epoch) or RFC3339 timestamp (e.g. 2023-07-13T08:46:42.228Z) to retrieve a bookmark for |
| `--json` | boolean (default false) | Return output as JSON |

### `d1 time-travel restore`

Restore a database back to a specific point-in-time. Acts on remote D1 databases.

| Name | Type | Description |
|------|------|-------------|
| `<DATABASE>` | string, required | The name or binding of the DB |
| `--bookmark` | string | Bookmark to use for time travel |
| `--timestamp` | string | A Unix or RFC3339 timestamp to retrieve a bookmark for (within the last 30 days) |
| `--json` | boolean (default false) | Return output as JSON |

### `d1 migrations create`

Generates a new versioned file inside the `migrations` folder, e.g. `0000_create_user_table.sql`.

| Name | Type | Description |
|------|------|-------------|
| `<DATABASE>` | string, required | The name or binding of the DB |
| `<MESSAGE>` | string, required | The Migration message |

### `d1 migrations list`

View a list of unapplied migration files.

| Name | Type | Description |
|------|------|-------------|
| `<DATABASE>` | string, required | The name or binding of the DB |
| `--local` | boolean | Check migrations against a local DB for use with `wrangler dev` |
| `--remote` | boolean | Check migrations against a remote DB for use with `wrangler dev --remote` |
| `--preview` | boolean (default false) | Check migrations against a preview D1 DB |
| `--persist-to` | string | Directory for local persistence (must use `--local`) |

### `d1 migrations apply`

Apply any unapplied D1 migrations. Prompts for confirmation; after applying, a backup is captured. In CI/CD or other non-interactive environments the confirmation is skipped but the backup is still captured. If a migration errors, it is rolled back and the previous successful migration remains applied.

| Name | Type | Description |
|------|------|-------------|
| `<DATABASE>` | string, required | The name or binding of the DB |
| `--local` | boolean | Execute against a local DB for use with `wrangler dev` |
| `--remote` | boolean | Execute against a remote DB for use with `wrangler dev --remote` |
| `--preview` | boolean (default false) | Execute against a preview D1 DB |
| `--persist-to` | string | Directory for local persistence (must use `--local`) |

### `d1 insights` (Experimental)

Get information about the queries run on a D1 database. Acts on remote D1 databases.

| Name | Type | Description |
|------|------|-------------|
| `<NAME>` | string, required | The name of the DB |
| `--time-period` | string (default `1d`) | Fetch data from now to the provided time period |
| `--sort-type` | string (default `sum`) | The operation to sort insights by |
| `--sort-by` | string (default `time`) | The field to sort insights by |
| `--sort-direction` | string (default `DESC`) | Sort direction |
| `--limit` | number (default 5) | Fetch insights about the first X queries |
| `--json` | boolean (default false) | Return output as JSON |

Global flags accepted by every command: `--version` (alias `-v`), `--cwd`, `--config` (alias `-c`), `--env` (alias `-e`), `--env-file`, `--install-skills` (boolean, default false), `--profile`.

## Notes

- Corrected from the official docs: the official global-flags block writes the aliases as `--v`, `--c` and `--e`; the real Wrangler short aliases are single-dash `-v`, `-c` and `-e`.
- Per the release notes, since `wrangler@3.33.0` `d1 execute` and `d1 migrations apply` default to a local database; pass `--remote` for the deployed database.
- Wrangler in general (installation, configuration, other commands) is covered by the cloudflare-wrangler skill.

## Related

- [Migrations](./migrations.md)
- [Time Travel and backups](./time-travel.md)
- [Import and export data](./import-export-data.md)
- [Find slow and expensive queries](./find-expensive-queries.md)
- [Getting started](./get-started.md)
