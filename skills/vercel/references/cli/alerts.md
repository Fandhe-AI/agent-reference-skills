# vercel alerts

List recent alerts for a linked project, a specific project, or an entire team. Supports AI investigation summaries and alert rule management.

## Signature / Usage

```bash
vercel alerts
vercel alerts --all
vercel alerts --type usage_anomaly --since 2026-03-01T00:00:00.000Z
vercel alerts inspect <groupId>
vercel alerts rules ls
vercel alerts rules add --body ./rule.json
```

## Options / Props

| Name | Shorthand | Description |
|------|-----------|-------------|
| `--project` | `-p` | Filter by project name or ID; overrides linked project |
| `--all` | `-a` | Show team-wide alerts; cannot combine with `--project` |
| `--type` | | Filter by alert type (repeatable or comma-separated: `usage_anomaly`, `error_anomaly`) |
| `--ai` | | Print AI investigation summaries instead of table output |
| `--since` | | Start of time range (ISO 8601). Default: last 24 hours |
| `--until` | | End of time range (ISO 8601); `--since` must be earlier |
| `--limit` | | Max alert groups to return (1–100) |
| `--format` | | `json` for structured output |

## Notes

- Default scope: linked project from the last 24 hours
- `--all` requires team context

## Related

- [activity.md](./activity.md)
