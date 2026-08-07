# Insights

SQL-based query and analytics platform within the Inngest dashboard for analyzing events, function runs, steps, trace spans, and metadata.

## Signature / Usage

```
Dashboard → Insights → write SQL query or "Use AI to generate queries"
```

```sql
-- example: query recent function runs
SELECT * FROM runs WHERE data.function_id = 'my-function' LIMIT 100
```

## Notes

- Query engine is ClickHouse SQL; supports arithmetic, string, date/time, array, map, JSON, aggregate, and window functions, plus aggregate combinators (`If`, `OrNull`, `ArgMin`/`ArgMax`)
- Six primary tables: `events` (inbound event data), `runs` (function execution records), `steps` and `step_attempts` (step-level execution data), `extended_trace_spans` (OpenTelemetry span information), `metadata` (system and user-defined metadata)
- JSON fields on events/runs can be accessed via dot notation (e.g., `data.function_id`) or native ClickHouse JSON functions
- Array indexing is 1-indexed (not 0-indexed), unlike most programming languages
- Queries can be saved and shared with team members
- Results are capped at 1000 rows per page, and historical data has a few-minute lag — not suitable for monitoring live executions

## Related

- [Observability & Metrics](./observability-metrics.md)
- [Traces](./traces.md)
- [Inspecting Function Runs](./inspecting-function-runs.md)
