# vercel metrics

Query observability metrics and inspect available metrics, dimensions, and aggregations. Most metrics require Observability Plus.

## Signature / Usage

```bash
vercel metrics schema
vercel metrics schema vercel.function_invocation
vercel metrics vercel.request.count --group-by route --since 24h
vercel metrics vercel.request.route_cpu_duration_ms --aggregation p95 --group-by route
vercel metrics vercel.request.count --all --group-by projectId --since 24h --prod
vercel metrics <metric_name> --group-by <dimension> --order-by value --order asc
vercel metrics database.duration_ms --filter 'plan:pro'
```

## Options / Props

| Name | Shorthand | Description |
|------|-----------|-------------|
| `--aggregation` | `-a` | Aggregation function (e.g. `sum`, `p95`); defaults based on the metric's unit |
| `--group-by` | | Dimension to group by (repeatable) |
| `--filter` | `-f` | Filter using Vercel's KQL subset (e.g. `'environment:production'`, `'httpStatus >= 500'`); repeatable, combined with `AND` |
| `--prod` | | Limit to production data; equivalent to `--filter 'environment:production'` |
| `--since` | `-s` | Start of time range: relative (`1h`, `24h`, `7d`), date, or ISO timestamp (default: last hour) |
| `--until` | `-u` | End of time range (default: now) |
| `--granularity` | `-g` | Time bucket size (e.g. `1h`); CLI computes a default |
| `--limit` | `-l` | Max grouped results per time bucket (default: 10) |
| `--order-by` | | `count` or `value`; only with `--group-by`. Default `count` when the metric supports counting data points, otherwise `value` |
| `--order` | | `asc` or `desc` (default `desc`) for grouped results |
| `--project` | `-p` | Project name or ID (default: linked project) |
| `--all` | | Query across all team projects; cannot combine with `--project` |
| `--format` | | `json` for structured output |

## Notes

- `vercel metrics schema` lists queryable metrics for the current team context (including custom metrics); `schema <metric-or-prefix>` shows dimensions and aggregations
- Platform metric names start with `vercel.` and are grouped by prefix. Families listed on the docs page: Requests (`vercel.request`), Vercel Functions (`vercel.function_invocation`), Routing Middleware, External API requests, AI Gateway, Web Analytics, Speed Insights, Firewall, AI traffic, BotID, Image Optimization, Incremental Static Regeneration, Drive, Vercel Sandbox, Vercel Queues, Workflows, and Custom metrics
- Custom metrics use the names passed to `metric()` in your application (e.g. `database.duration_ms`) and are filtered by attribute: `vercel metrics database.duration_ms --filter 'plan:pro'`. There is no separate `database` subcommand in the docs; `database` is a custom-metric namespace used in the examples
- Web Analytics and Speed Insights metrics work without Observability Plus; all other metrics require Observability Plus
- Filter KQL subset: `field:value`, `field != value`, numeric comparisons, `field:(a OR b)`, `field:*` (exists), prefix/suffix/contains wildcards (string dimensions only, no infix), `field =~ "regex"`, `AND` / `OR` / `NOT`, grouping. Wrap the whole filter in single quotes. Limits: 2,048 characters and 8 nesting levels per filter, 50 expression nodes per query
- Use `--format json` for scripts, agents and CI checks

## Related

- [logs.md](./logs.md)
- [traces.md](./traces.md)
