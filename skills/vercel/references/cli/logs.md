# vercel logs

Query runtime logs for a Vercel project; `vercel logs requests` lists CDN request records.

## Signature / Usage

```bash
# Runtime logs from the last 30 minutes
vercel logs

# CDN request records with a 5xx status
vercel logs requests --query 'httpStatus >= 500'

vercel logs runtime --environment production --query 'level:error' --since 1h
vercel logs requests --query 'requestMethod:POST AND cacheResult:MISS'
vercel logs --next <cursor>
vercel logs runtime --query 'level:error' --json | jq 'select(.type == "log") | .data'
```

## Options / Props

| Name | Shorthand | Description |
|------|-----------|-------------|
| `--project` | `-p` | Project name or ID (default: linked project) |
| `--deployment` | | Filter by deployment ID or URL (the `-d` shorthand is now always `--debug`) |
| `--environment` | | Filter by deployment environment, including custom environments |
| `--query` | `-q` | Filter using Vercel's subset of Kibana Query Language (KQL) |
| `--since` | `-s` | Start of the time window: relative (`1h`, `30m`), ISO 8601, or `now` (default: 30 minutes before `--until`) |
| `--until` | `-u` | End of the time window; same values as `--since` (default: now) |
| `--limit` | `-n` | Max records to return (default: 100, max: 10,000) |
| `--next` | `-N` | Continue a previous query using the cursor (keeps team, project, filter, time window) |
| `--json` | | One JSON object per line: `{"type":"log"\|"request","data":<event>}`, final line is a `summary` |
| `--follow` | `-f` | Deprecated: prints a warning and returns query results instead of streaming |

## Notes

- Describes `vercel logs` in Vercel CLI v64.0.0 and later (breaking change vs earlier versions)
- Default: latest 100 records from the last 30 minutes for the linked project, across production, preview, and custom environments. Query range and filterable fields depend on plan
- `--follow` no longer streams: it prints a deprecation warning and returns the query results (previously streamed live logs for up to 5 minutes; the old `--follow --deployment` combination no longer streams)
- `--next` cannot be combined with `--project`, `--deployment`, `--environment`, `--query`, `--since` or `--until` (usage error); `--limit` may change
- JSON summary line has `recordsReturned`, `timeRange`, `pagination` (`hasMore`, `next`), `excludedIntervals`; an empty result prints only the summary
- `--non-interactive` implies `--json`
- KQL syntax: `field:value`, `field:(a OR b)`, `field:*`, `field != value`, numeric comparisons (`>`, `>=`, `<`, `<=`) on request records such as `httpStatus`, `field:*text*`, `AND` / `OR` / `NOT`, grouping with `(...)`. Wrap the whole query in single quotes; double-quote values with spaces or reserved characters. In runtime logs a bare word searches the message (case-insensitive). `requestId` uses the query time window; widen with `--since` for requests older than 30 minutes. List fields with `vercel logs runtime --help` / `vercel logs requests --help`
- `-F json` is not mentioned on the current official page (not confirmed in official docs)
- Source: https://vercel.com/docs/cli/logs (fetched 2026-11-14)

### Removed and changed options

Passing an old option prints the replacement. `--search`, `--source`, `--branch`, `--expand` and `-j` fail with a usage error. In v65.12.0 and later, the command still runs the other old options and a positional deployment as their replacement and prints a warning; a value or combination it cannot convert (such as `--level` with `--status-code`) fails with a usage error.

| Old usage | Replacement |
| --- | --- |
| `--search <text>` | `--query` with a bare word, e.g. `--query 'timeout'` |
| `--level error` | `--query 'level:error'` |
| `--source serverless` | `--query 'source:function'` |
| `--source static` | Static and CDN traffic is in `vercel logs requests` |
| `--status-code 500` | `vercel logs requests --query 'httpStatus:500'` |
| `--status-code 5xx` | `vercel logs requests --query 'httpStatus >= 500 AND httpStatus < 600'` |
| `--request-id <id>` | `--query 'requestId:"<id>"'` |
| `--branch <name>` | No longer supported; remove it from the command |
| `--expand` | Removed; full runtime messages shown by default |
| `--no-follow`, `--no-branch` | Removed; the command runs a query for the time window you set |
| Positional deployment, `-d` | `--deployment`; `-d` is now always `--debug` |
| `-j` shorthand for JSON | `--json` |

## Related

- [inspect.md](./inspect.md)
- [traces.md](./traces.md)
