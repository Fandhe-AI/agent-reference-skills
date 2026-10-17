# vercel routes

Manage project-level routing rules (rewrites, redirects, header transforms) that apply to all deployments. Changes are staged until published.

## Signature / Usage

```bash
vercel routes list
vercel routes add --ai "Rewrite /api/* to https://backend.internal/*" --yes
vercel routes add "API Proxy" \
  --src "/api/:path*" --src-syntax path-to-regexp \
  --action rewrite --dest "https://api.example.com/:path*" --yes
vercel routes edit "API Proxy" --dest "https://new-api.example.com/:path*"
vercel routes delete "Old Redirect" --yes
vercel routes publish --yes
vercel routes list --diff
vercel routes list-versions --count 50
vercel routes inspect "API Proxy" --diff
vercel routes enable "API Proxy"
vercel routes disable "API Proxy"
vercel routes restore <version-id> --yes
```

## Options / Props

### list

| Name | Description |
|------|-------------|
| `-s, --search <QUERY>` | Search by name, description, source, or destination |
| `-f, --filter <TYPE>` | Filter by type: `rewrite`, `redirect`, `set_status`, `transform` |
| `--production` | List routes from the live production version |
| `--version-id <VERSION_ID>` | List routes from a specific version |
| `--diff` | Compare staged changes against production |
| `-e, --expand` | Show expanded details for each route |

### add / edit

| Name | Description |
|------|-------------|
| `--ai <PROMPT>` | Generate/modify route from natural language |
| `--src <PATTERN>` | Path pattern to match |
| `--src-syntax <SYNTAX>` | Pattern syntax: `regex` (default), `path-to-regexp`, `equals` |
| `--action <TYPE>` | Action: `rewrite`, `redirect`, `set-status` |
| `--dest <URL>` | Destination URL for rewrite or redirect |
| `--status <CODE>` | HTTP status code |
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
| `--disabled` | Create in disabled state |
| `--name <NAME>` | (edit) Change the route name |
| `--no-dest` / `--no-status` | (edit) Remove the destination / status code |
| `--clear-conditions` | (edit) Remove all conditions |
| `--clear-headers` | (edit) Remove all response headers |
| `--clear-transforms` | (edit) Remove all request header and query transforms |
| `--position <POSITION>` | Position: `start`, `end`, `before:<id>`, `after:<id>` |
| `-y, --yes` | Skip confirmation |

### reorder

| Name | Description |
|------|-------------|
| `--position <POSITION>` | Target position: number (1-based), `start`, `end`, `before:<id>`, `after:<id>` |
| `--first` | Move to first position |
| `--last` | Move to last position |
| `-y, --yes` | Skip confirmation |

### list-versions / inspect / restore

| Name | Description |
|------|-------------|
| `list-versions --count <NUMBER>` | Number of versions to fetch (default: 20, max: 100) |
| `inspect <name-or-id> --diff` | Compare this route's staged changes against production |
| `restore <version-id> -y, --yes` | Restore a previous version to production; takes effect immediately |

### export

| Name | Description |
|------|-------------|
| `--format <FORMAT>` | `json` (default) or `ts` |

## Notes

- Staging workflow: changes are staged → `vercel routes diff` → `vercel routes publish`
- `vercel routes discard-staging` cancels staged changes
- `enable <name-or-id>` re-enables a disabled route; `disable <name-or-id>` keeps the route in configuration but stops it affecting traffic
- `--version-id` on `list` supports prefix matching; `--action` is required with `--dest` or `--status` (and when switching types on `edit`)
- Condition types for `--has` / `--missing`: `header`, `cookie`, `query`, `host`
- Can also define routes in source control via `vercel.json` or `vercel.ts`

## Related

- [redirects.md](./redirects.md)
- [firewall.md](./firewall.md)
