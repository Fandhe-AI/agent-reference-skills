# vercel activity

View activity events for a linked project or team, with filtering by type, date range, and project.

## Signature / Usage

```bash
vercel activity
vercel activity ls --all --since 30d
vercel activity ls --type deployment --since 7d
vercel activity types
vercel activity --all --json | jq '.events[] | {type, text: .text}'
```

## Options / Props

| Name | Shorthand | Description |
|------|-----------|-------------|
| `--type` | | Filter by event type (repeatable or comma-separated). Run `vercel activity types` to list all types |
| `--since` | `-s` | Show events after a date: ISO 8601 or relative (`1d`, `7d`, `30d`) |
| `--until` | `-u` | Show events before a date; same formats as `--since` |
| `--project` | `-p` | Filter by project name or ID; overrides auto-detected linked project |
| `--all` | `-a` | Show all team events; cannot be combined with `--project` |
| `--limit` | | Max events to return (default: 20, max: 100) |
| `--next` | | Pagination cursor from previous page's output |
| `--json` | | Print events as JSON (includes a `scope` object with `teamSlug` and, for single-project scope, `projectName` / `projectIds`) |

## Notes

- `--all` and `--project` are mutually exclusive
- Pagination: `--next` accepts the timestamp value printed after each page

- `vercel activity types` lists all event types with descriptions; it also accepts `--json`
- The previous version of this page documented `--format json`; the current official page documents `--json` only
- Source: https://vercel.com/docs/cli/activity (fetched 2026-11-14)

## Related

- [logs.md](./logs.md)
