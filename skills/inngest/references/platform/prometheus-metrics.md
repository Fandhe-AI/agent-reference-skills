# Prometheus Metrics Export

Scraping Inngest function run metrics via a Prometheus-compatible endpoint, compatible with Prometheus, Grafana, and New Relic.

## Signature / Usage

Navigate to **Integrations → Prometheus** in the Inngest dashboard, select the target environment, and copy the generated scrape configuration:

```yaml
scrape_configs:
  - job_name: inngest
    scheme: https
    static_configs:
      - targets: ["app.inngest.com"]
    metrics_path: /v1/metrics   # path provided in generated config
    authorization:
      credentials: <your-inngest-api-key>
```

For self-hosted Inngest, metrics are exposed at `GET /metrics`:

```bash
# Enable per-function counters on self-hosted
INNGEST_EXPERIMENTAL_PROM_METRICS=1 ./inngest
```

## Options / Props

| Metric category | Description |
|-----------------|-------------|
| Function runs | Scheduling, startup, and completion events; completion includes status tags |
| SDK requests | Scheduling, startup, and completion events; error classification included |
| Step outputs | Cumulative bytes consumed by step output data |
| Steps (gauge) | Count of actively running steps and count of scheduled steps awaiting execution |

## Notes

- Configure the integration in the Inngest dashboard: Integrations → Prometheus; select the environment to generate a scrape configuration with authentication credentials
- Granularity and delay by plan:
  - Basic: 15-minute aggregation, 15-minute delay
  - Pro: 5-minute aggregation, 5-minute delay
  - Enterprise: 1-minute aggregation, immediate availability
- Rate limit: 30 requests per minute across the metrics endpoint (all plans)

## Related

- [Observability & Metrics](./observability-metrics.md)
- [Self-Hosting](./self-hosting.md)
