# vercel metrics

Query observability metrics and inspect available metrics, dimensions, and aggregations. Requires Observability Plus.

## Signature / Usage

```bash
vercel metrics vercel.request.count
vercel metrics vercel.request.count --group-by route --since 24h
vercel metrics vercel.request.route_cpu_duration_ms --aggregation p95 --group-by route
vercel metrics vercel.request.count --all --group-by project_id
vercel metrics schema
vercel metrics schema vercel.request
```

## Options / Props

| Name | Shorthand | Description |
|------|-----------|-------------|
| `--aggregation` | `-a` | Aggregation function (e.g. `sum`, `p95`); defaults to metric schema default |
| `--group-by` | | Dimension to group by (repeatable) |
| `--filter` | `-f` | OData filter expression (e.g. `"route eq '/api/logs'"`) |
| `--since` | | Start of time range: relative (`1h`, `24h`, `7d`) or ISO timestamp (default: last hour) |
| `--until` | | End of time range (default: now) |
| `--granularity` | `-g` | Time bucket size (e.g. `1h`); CLI computes appropriate default |
| `--limit` | | Max grouped results per time bucket (default: 10) |
| `--project` | `-p` | Project name or ID (default: linked project) |
| `--all` | | Query across all team projects; cannot combine with `--project` |
| `--format` | | `json` for structured output |

## Notes

- `vercel metrics schema` lists all available metrics
- `vercel metrics schema <metric-or-prefix>` shows valid aggregations and dimensions for a metric
- Requires Metrics permission

## Related

- [logs.md](./logs.md)
- [traces.md](./traces.md)
