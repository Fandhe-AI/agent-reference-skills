# vercel activity

View activity events for a linked project or team, with filtering by type, date range, and project.

## Signature / Usage

```bash
vercel activity
vercel activity ls --all --since 30d
vercel activity ls --type deployment --since 7d
vercel activity types
```

## Options / Props

| Name | Shorthand | Description |
|------|-----------|-------------|
| `--type` | | Filter by event type (repeatable or comma-separated). Run `vercel activity types` to list all types |
| `--since` | | Show events after a date: ISO 8601 or relative (`1d`, `7d`, `30d`) |
| `--until` | | Show events before a date; same formats as `--since` |
| `--project` | `-p` | Filter by project name or ID; overrides auto-detected linked project |
| `--all` | `-a` | Show all team events; cannot be combined with `--project` |
| `--limit` | | Max events to return (default: 20, max: 100) |
| `--next` | | Pagination cursor from previous page's output |
| `--format` | | Output format; `json` emits structured JSON |

## Notes

- `--all` and `--project` are mutually exclusive
- Pagination: `--next` accepts the timestamp value printed after each page

## Related

- [logs.md](./logs.md)
