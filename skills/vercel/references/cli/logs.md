# vercel logs

Display request logs or stream live runtime logs for a Vercel project.

## Signature / Usage

```bash
vercel logs
vercel logs --follow
vercel logs --level error --since 1h
vercel logs --environment production --status-code 500 --json
vercel logs --query "timeout" --json | jq '.message'
```

## Options / Props

| Name | Shorthand | Description |
|------|-----------|-------------|
| `--project` | `-p` | Project name or ID (default: linked project) |
| `--deployment` | `-d` | Filter by specific deployment ID or URL |
| `--follow` | `-f` | Stream live runtime logs (streams for up to 5 minutes) |
| `--json` | `-j` | Output in JSON Lines format |
| `--expand` | `-x` | Show full log message instead of truncating |
| `--limit` | `-n` | Max log entries to return (default: 100) |
| `--environment` | | Filter by environment: `production` or `preview` |
| `--level` | | Filter by level: `error`, `warning`, `info`, `fatal` (repeatable) |
| `--status-code` | | Filter by HTTP status code or wildcard: `500`, `4xx`, `5xx` |
| `--source` | | Filter by source: `serverless`, `edge-function`, `edge-middleware`, `static` (repeatable) |
| `--query` | `-q` | Full-text search across log messages |
| `--request-id` | | Filter by specific request ID |
| `--since` | | Start time: ISO 8601 or relative (`1h`, `30m`; default: 24h ago) |
| `--until` | | End time: ISO 8601 or relative (default: now) |
| `--branch` | `-b` | Filter by git branch (auto-detected by default); use `--no-branch` to disable |

## Notes

- Default shows request logs from the last 24 hours for the linked project and branch
- `--follow` finds the latest deployment for the current git branch
- Combine `--follow --deployment` to stream logs for a specific deployment

## Related

- [inspect.md](./inspect.md)
- [traces.md](./traces.md)
