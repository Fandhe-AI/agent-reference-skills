# vercel metrics

Query observability metrics and inspect available metrics, dimensions, and aggregations. Most metrics require Observability Plus.

## Signature / Usage

```bash
# List queryable metrics for the current team context
vercel metrics schema

# Inspect a metric or metric prefix
vercel metrics schema <metric-or-prefix>

# Query a custom metric and filter by an attribute
vercel metrics database.duration_ms --query 'plan:pro'

# Query production data for a specific project
vercel metrics <metric_name> --since 7d --granularity 1d --project project-name --environment production

# Query grouped results
vercel metrics <metric_name> --group-by <dimension> --since 1d --limit 5 --project project-name --environment production

# Query across every project in the current team
vercel metrics <metric_name> --all --group-by projectId --since 24h --environment production

vercel metrics <metric_name> --group-by <dimension> --order-by value --order asc
vercel metrics <metric_name> --json
```

## Options / Props

| Name | Shorthand | Description |
|------|-----------|-------------|
| `--aggregation` | `-a` | Aggregation function (e.g. `sum`, `p95`); defaults based on the metric's unit |
| `--group-by` | | Dimension to group by (repeatable) |
| `--query` | `-q` | Filter using Vercel's KQL subset (e.g. `'environment:production'`, `'httpStatus >= 500'`); repeatable, combined with `AND` |
| `--environment` | `-e` | Limit to one environment such as `production` or `preview`; `--environment production` is equivalent to `--query 'environment:production'` |
| `--since` | `-s` | Start of time range: relative (`1h`, `24h`, `7d`), date, or ISO timestamp (default: last hour) |
| `--until` | `-u` | End of time range (default: now) |
| `--granularity` | `-g` | Time bucket size: `1m`, `5m`, `15m`, `1h`, `4h`, `1d`; CLI computes a default and raises too-small values to the smallest size the range supports |
| `--limit` | `-n` | Max grouped results per time bucket (default: 10) |
| `--order-by` | | `count` or `value`; only with `--group-by`. Default `count` when the metric supports counting data points, otherwise `value` |
| `--order` | | `asc` or `desc` (default `desc`) for grouped results |
| `--project` | `-p` | Project name or ID (default: linked project) |
| `--all` | | Query across all team projects; cannot combine with `--project` |
| `--json` | | Output JSON instead of text (also works with `schema`) |

## Notes

- `vercel metrics schema` lists queryable metrics for the current team context (including custom metrics); `schema <metric-or-prefix>` shows dimensions and aggregations
- Platform metric names start with `vercel.` and are grouped by prefix. Families listed on the docs page: Requests (`vercel.request`), Vercel Functions (`vercel.function_invocation`), Routing Middleware, External API requests, AI Gateway, Web Analytics, Speed Insights, Firewall, AI traffic, BotID, Image Optimization, Incremental Static Regeneration, Drive, Vercel Sandbox, Vercel Queues, Workflows, and Custom metrics
- Custom metrics use the names passed to `metric()` in your application (e.g. `database.duration_ms`) and are filtered by attribute: `vercel metrics database.duration_ms --query 'plan:pro'`. There is no separate `database` subcommand in the docs; `database` is a custom-metric namespace used in the examples
- Web Analytics and Speed Insights metrics work without Observability Plus; all other metrics require Observability Plus
- Filter KQL subset: `field:value` (also `=` / `==`), `field != value`, numeric comparisons, `field:(a OR b)`, `field:*` (exists), prefix/suffix/contains wildcards (string dimensions only, no infix), `field =~ "regex"`, `AND` / `OR` / `NOT`, grouping. Wrap the whole filter in single quotes. Limit: 8 nesting levels per filter (the 2,048-character and 50-node limits noted earlier are not on the current official page; not confirmed)
- Use `--json` for scripts, agents and CI checks
- Repeat `--query` to combine filters with `AND`, e.g. `-q 'country:US' -q 'deviceType != mobile'`. Wildcards and `=~` regex require string dimensions; bare quoted phrases and unfielded wildcard searches are unsupported. OData filter syntax is deprecated; use KQL
- Older docs (and this page before 2026-11-14) used `--filter` / `-f`, `--prod` and `--format json`; the current official page documents `--query` / `-q`, `--environment` / `-e` and `--json` instead, and does not mention the old names (whether they still work is not confirmed in official docs)
- Source: https://vercel.com/docs/cli/metrics (fetched 2026-11-14)

## Related

- [logs.md](./logs.md)
- [traces.md](./traces.md)
