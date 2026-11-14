# vercel redirects

Manage project-level redirects that apply to all deployments and environments without requiring a new deployment.

## Signature / Usage

```bash
vercel redirects list
vercel redirects add /old /new --status 301
vercel redirects import redirects.csv --force
vercel redirects promote <version-id>
vercel redirects restore <version-id>
vercel redirects remove /old-path
vercel redirects list --query "/old-path"
vercel redirects list --limit 25 --next 2
vercel redirects list --redirects-version ver_abc123
```

## Options / Props

### list

| Name | Description |
|------|-------------|
| `--next <CURSOR>` | Show the next page, using the cursor the CLI prints with the previous page |
| `--limit <NUMBER>` | Redirects per page (default: 50) |
| `-q, --query <TEXT>` | Search by source or destination |
| `--staging` | List redirects from the staging version |
| `--redirects-version <VERSION_ID>` | List redirects from a specific version ID |

### add

| Name | Description |
|------|-------------|
| `--case-sensitive` | Make redirect case-sensitive |
| `--name <NAME>` | Version name for this redirect (max 256 chars) |
| `--preserve-query-params` | Preserve query parameters when redirecting |
| `--status <CODE>` | HTTP status code: 301, 302, 307, or 308 |
| `-y, --yes` | Skip prompts and use defaults |

### import

| Name | Description |
|------|-------------|
| `--force` | Replace all existing redirects |
| `-y, --yes` | Skip confirmation prompt |

### remove / promote / restore

Each subcommand uses the linked project unless the global `--project` option is passed with a project name or ID.

| Name | Description |
|------|-------------|
| `-y, --yes` | Skip confirmation prompt |

## Notes

- Subcommands: `list`, `list-versions`, `add`, `import`, `remove`, `promote <version-id>`, `restore <version-id>`
- `import` accepts a CSV or JSON file. CSV header: `source,destination,statusCode,caseSensitive,preserveQueryParams`; JSON is an array of objects with the same keys (`statusCode` is a number, the other two are booleans)
- `upload` and `--overwrite` (older names) and the `--page` / `--per-page` / `-s, --search` / `--version` list flags are not in the current official page; use `import` / `--force` / `--next` / `--limit` / `-q, --query` / `--redirects-version`
- Changes take effect immediately after being created and promoted to production; no new deployment needed
- Redirects can also be defined in `vercel.json`
- Source: https://vercel.com/docs/cli/redirects (fetched 2026-11-14)

## Related

- [routes.md](./routes.md)
