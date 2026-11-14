# vercel routes

Manage project-level routing rules (rewrites, redirects, header transforms) that apply to all deployments. Changes are staged until published.

## Signature / Usage

```bash
vercel routes list
vercel routes add --ai "Rewrite /api/* to https://backend.internal/*" --yes
vercel routes add "API Proxy" \
  --src "/api/:path*" --src-syntax path-to-regexp \
  --action rewrite --dest "https://api.example.com/:path*" --yes
vercel routes update "API Proxy" --dest "https://new-api.example.com/:path*"
vercel routes remove "Old Redirect" --yes
vercel routes publish --yes
vercel routes list --diff
vercel routes list-versions --limit 50
vercel routes inspect "API Proxy" --diff
vercel routes enable "API Proxy"
vercel routes disable "API Proxy"
vercel routes restore <version-id> --yes
vercel routes move "API Proxy" --position 3
vercel routes export --output ts
vercel routes list --type rewrite --query "api"
vercel routes discard-staging
```

## Options / Props

### list

| Name | Description |
|------|-------------|
| `-q, --query <TEXT>` | Search by name, description, source, or destination |
| `--type <TYPE>` | Filter by type: `rewrite`, `redirect`, `set_status`, `transform` |
| `--production` | List routes from the live production version |
| `--routes-version <VERSION>` | List routes from a specific version ID (supports prefix matching) |
| `--diff` | Compare staged changes against production; use with `--routes-version` to compare a specific version |
| `--expand` | Show expanded details for each route |

### add / update

| Name | Description |
|------|-------------|
| `--ai <PROMPT>` | Generate/modify route from natural language |
| `--src <PATTERN>` | Path pattern to match |
| `--src-syntax <SYNTAX>` | Pattern syntax: `regex` (default), `path-to-regexp`, `equals` |
| `--action <TYPE>` | Action: `rewrite`, `redirect`, `set-status` |
| `--dest <URL>` | Destination URL for rewrite or redirect |
| `--status <CODE>` | HTTP status code (301, 302, 303, 307, 308 for redirects, or any valid code for set-status) |
| `--has <CONDITION>` | Condition that must match (repeatable): `type:key`, `type:key:value`, `type:key:op=value` |
| `--missing <CONDITION>` | Condition that must NOT match (repeatable) |
| `--set-response-header <KEY=VALUE>` | Set response header (repeatable) |
| `--append-response-header <KEY=VALUE>` | Append to response header (repeatable) |
| `--delete-response-header <KEY>` | Delete response header (repeatable) |
| `--set-request-header <KEY=VALUE>` | Set request header (repeatable) |
| `--append-request-header <KEY=VALUE>` | Append to request header (repeatable) |
| `--delete-request-header <KEY>` | Delete request header (repeatable) |
| `--set-request-query <KEY=VALUE>` | Set query parameter (repeatable) |
| `--append-request-query <KEY=VALUE>` | Append to query parameter (repeatable) |
| `--delete-request-query <KEY>` | Delete query parameter (repeatable) |
| `--description <TEXT>` | Route description (max 1024 chars) |
| `--no-enable` | (add) Create the route in a disabled state; enable later with `vercel routes enable` |
| `--name <NAME>` | (update) Change the route name |
| `--no-dest` / `--no-status` | (update) Remove the destination / status code |
| `--clear-conditions` | (update) Remove all conditions |
| `--clear-headers` | (update) Remove all response headers |
| `--clear-transforms` | (update) Remove all request header and query transforms |
| `--position <POSITION>` | Position: `start`, `end`, `before:<id>`, `after:<id>` |
| `-y, --yes` | Skip confirmation |

### move

| Name | Description |
|------|-------------|
| `--position <POSITION>` | Target position: number (1-based), `start`, `end`, `before:<id>`, `after:<id>` |
| `--first` | Move to first position |
| `--last` | Move to last position |
| `-y, --yes` | Skip confirmation |

### list-versions / inspect / restore / remove / publish / discard-staging

| Name | Description |
|------|-------------|
| `list-versions -n, --limit <NUMBER>` | Number of versions to fetch (default: 20, max: 100) |
| `inspect <name-or-id> --diff` | Compare this route's staged changes against production |
| `restore <version-id> -y, --yes` | Restore a previous version to production; takes effect immediately |

### export

| Name | Description |
|------|-------------|
| `-o, --output <FORMAT>` | Output file format: `json` (default) or `ts` |

## Notes

- Staging workflow: changes are staged → review with `vercel routes list --diff` → `vercel routes publish`
- `vercel routes discard-staging` cancels staged changes
- `enable <name-or-id>` re-enables a disabled route; `disable <name-or-id>` keeps the route in configuration but stops it affecting traffic
- `--routes-version` on `list` supports prefix matching; `--action` is required with `--dest` or `--status` (and when switching types on `update`)
- Every subcommand uses the linked project unless the global `--project` option is passed with a project name or ID
- `remove` accepts multiple names or IDs: `vercel routes remove "Route A" "Route B"`; `remove`, `publish`, `discard-staging`, `restore` take `-y, --yes`
- Condition operators for `--has` / `--missing`: `eq`, `contains`, `re`, `exists`
- Routes are evaluated in order, so `move` position affects which route matches first
- The earlier subcommand and flag names `edit`, `delete`, `reorder`, `diff`, `-s/--search`, `-f/--filter`, `--version-id`, `--count`, `--format`, `--disabled` are not in the current official page; it documents `update`, `remove`, `move`, `list --diff`, `-q/--query`, `--type`, `--routes-version`, `--limit`, `--output`, `--no-enable`
- Condition types for `--has` / `--missing`: `header`, `cookie`, `query`, `host`
- Can also define routes in source control via `vercel.json` or `vercel.ts`; `vercel routes export` outputs routes in those formats
- Source: https://vercel.com/docs/cli/routes (fetched 2026-11-14)

## Related

- [redirects.md](./redirects.md)
- [firewall.md](./firewall.md)
