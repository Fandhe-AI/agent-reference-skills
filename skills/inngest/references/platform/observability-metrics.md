# Observability & Metrics

Built-in observability for durable function execution — metrics dashboards, event logs, and per-step timing data without code instrumentation.

## Signature / Usage

Navigate to the observability dashboard:

1. Open **Inngest Cloud → Functions** — overview list showing failure rates and throughput per function
2. Click a specific function — opens the **Function metrics page** with 7 charts (status pie, failed functions, run throughput, step throughput, backlog)
3. Open **Events** in the sidebar — shows event volume, associated triggers, and throughput charts
4. Click an event row to open **Event Logs** — full payload, triggered functions, and raw data
5. Press **Cmd/Ctrl + K** — global search across apps, functions, and events by name or ID

## Notes

- **Functions list** shows failure rate percentages and processing volume for each function, making error surges and throughput drops visible at a glance
- **Function metrics page** provides seven charts:
  - Function Status (pie chart): runs categorized as failed / succeeded / cancelled
  - Failed Functions: top 6 underperforming functions by failure frequency
  - Total Runs Throughput: rate of function runs started per app (visualizes flow control effects)
  - Total Steps Throughput: rate of step executions grouped by app
  - Backlog: function runs waiting to be processed at a given time bucket (helps evaluate concurrency capacity)
- **Events page** shows event volume, associated function triggers, throughput charts, and source app column
- **Event Logs** display full event payloads, triggered functions, and raw data for debugging
- Press **Cmd/Ctrl + K** for quick search across apps, functions, and events by name or ID
- No code instrumentation required — all metrics are captured automatically

## Related

- [Traces](./traces.md)
- [Inspecting Function Runs](./inspecting-function-runs.md)
- [Prometheus Metrics Export](./prometheus-metrics.md)
