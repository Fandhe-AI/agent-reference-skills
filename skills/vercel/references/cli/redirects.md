# vercel redirects

Manage project-level redirects that apply to all deployments and environments without requiring a new deployment.

## Signature / Usage

```bash
vercel redirects list
vercel redirects add /old /new --status 301
vercel redirects upload redirects.csv --overwrite
vercel redirects promote <version-id>
vercel redirects restore <version-id>
vercel redirects remove /old-path
```

## Options / Props

### list

| Name | Description |
|------|-------------|
| `--page <NUMBER>` | Page number |
| `--per-page <NUMBER>` | Redirects per page (default: 50) |
| `-s, --search <QUERY>` | Search by source or destination |
| `--staging` | List redirects from the staging version |
| `--version <VERSION_ID>` | List redirects from a specific version ID |

### add

| Name | Description |
|------|-------------|
| `--case-sensitive` | Make redirect case-sensitive |
| `--name <NAME>` | Version name for this redirect (max 256 chars) |
| `--preserve-query-params` | Preserve query parameters when redirecting |
| `--status <CODE>` | HTTP status code: 301, 302, 307, or 308 |
| `-y, --yes` | Skip prompts and use defaults |

### upload

| Name | Description |
|------|-------------|
| `--overwrite` | Replace all existing redirects |
| `-y, --yes` | Skip confirmation |

### remove / promote / restore

| Name | Description |
|------|-------------|
| `-y, --yes` | Skip confirmation prompt |

## Notes

- Subcommands: `list`, `list-versions`, `add`, `upload`, `remove`, `promote <version-id>`, `restore <version-id>`
- CSV upload format: `source,destination,status,caseSensitive,preserveQueryParams`
- Changes take effect immediately after creation; no deployment needed

## Related

- [routes.md](./routes.md)
