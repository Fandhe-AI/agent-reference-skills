---
source: https://docs.cloud.google.com/network-intelligence-center/docs/flow-analyzer/overview
---

# Flow Analyzer overview

Flow Analyzer lets you analyze VPC traffic flows at 5-tuple granularity without writing SQL against VPC Flow Logs. It is built on Observability Analytics and powered by BigQuery. You must select a project with a log bucket that contains VPC Flow Logs, and the bucket must be Observability Analytics enabled.

## Signature / Usage

Flow Analyzer needs a log bucket holding VPC Flow Logs, which are produced by VPC Flow Logs configurations. The source page has no commands; existing configurations can be listed with:

```bash
gcloud network-management vpc-flow-logs-configs list \
    --location=global
```

## Options / Props

| Area | Options |
|---|---|
| Traffic aggregation | Source and destination (uses SRC and DEST fields); Client and server (smaller port number is the server; `gke_service` resources are servers) |
| Time range | Default one hour; presets, custom start/end, or centered on a timestamp; time zone preference |
| Filters | Basic filters (source/destination or client/server, flow parameters; multiple values of one filter use OR, multiple filters use AND); SQL filters using BigQuery SQL syntax |
| Display modes | Data volume (default: bytes and packets sent); Packet drops (drop rate and drop count); Latency (RTT, TCP traffic) |
| Bytes sent aggregation | Total traffic (default); Average, Median, P95, Maximum traffic rate (bytes per second) |
| Packets sent aggregation | Aggregate packets (default); Average, Median, P95, Maximum packets rate |
| Sampling point | Source endpoint; Destination endpoint; Sum of source and destination; Average of source and destination (deduplicates, traffic in an alignment period divided by two when both report) |
| Packet drops | Metric: packets sent (default) or bytes sent; timeline: Drop rate (%) (default) or Drop count; sampling point source (egress drops) or destination (ingress drops); Drop reason column |
| Latency ranking | Average, Max, Median, P95, P99, Standard deviation; chart aggregation Average / Max / Median / P95 / P99 |
| Alignment period | 5 seconds to 1 day; Automatic mode picks one by range |

## Notes

- Results: the Highest data flows chart shows the top five flows; the All data flows table shows up to 5,000 rows.
- Bytes sent covers payload only (no headers) and can be zero; because data is sampled and headers are excluded, it cannot be used to estimate costs.
- Smaller alignment periods reduce performance; for example a 1 minute alignment over 30 days yields more than 43,000 data points, so some options are disabled for long durations.
- Flow details panel: drill down by an extra field (top three flows, Compare to past toggle), and an Egress AS paths tab (filters such as longer than, shorter than, has first ASN, contains ASN).
- Explore in Log Analytics opens a prefilled query for raw SQL editing.
- VPC Flow Logs themselves are described in vpc-flow-logs.md. Generic Cloud Logging belongs to the `gcp-observability` skill.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/network-management/vpc-flow-logs-configs/list (gcloud 593.0.0 help); the source page has no code.
- Source: https://docs.cloud.google.com/network-intelligence-center/docs/flow-analyzer/overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [vpc-flow-logs.md](./vpc-flow-logs.md)
- [network-intelligence-center-overview.md](./network-intelligence-center-overview.md)
