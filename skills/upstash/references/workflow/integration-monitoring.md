# Datadog and Prometheus Integrations

Send QStash / Workflow metrics (publish counts, success and error rates, retries, DLQ, schedule executions) to Datadog, or scrape them with Prometheus and visualize them in Grafana.

## Signature / Usage

Adapted (not in the official docs): the block below summarizes the documented Grafana data source address and header format; it is not an official code sample.

```text
address: https://api.upstash.com/monitoring/prometheus
header:  Authorization: Bearer <MONITORING_TOKEN>
```

## Options / Props

| Integration | Steps |
|-------------|-------|
| Datadog | Datadog: Integrations, search "Upstash", Install, Connect Accounts, then select the personal or team Upstash account to link; metrics appear in Datadog dashboards shortly after |
| Datadog removal | Datadog, Integrations, Upstash, Remove; Upstash stops publishing metrics; also remove related Datadog API keys / configuration on the Datadog side |
| Prometheus | Upstash Console, QStash, Settings, Monitoring: enable Prometheus and copy the monitoring token; in Grafana add a Prometheus data source with the address above and the token as HTTP header; import the "Upstash QStash Dashboard" (grafana.com dashboard 24206) |

## Notes

- The Prometheus snippet is an editor-written summary of the documented address and header (see the Adapted line above it)
- Both integrations cover the Prod Pack
- Datadog: the integration can be established for one account at a time; to change the account scope (add or remove teams) re-establish it from scratch
- Metrics come from QStash, the infrastructure underneath Workflow
- Sources: https://upstash.com/docs/workflow/integrations/datadog and https://upstash.com/docs/workflow/integrations/prometheus (fetched 2026-11-14; no version pin on the site)

## Related

- [how-it-works](./how-it-works.md)
- [pricing](./pricing.md)
- [multi-region](./multi-region.md)
