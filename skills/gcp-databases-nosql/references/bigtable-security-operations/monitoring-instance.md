---
source: https://docs.cloud.google.com/bigtable/docs/monitoring-instance
---

# Monitoring

Bigtable can be monitored visually in the Google Cloud console (system insights, instance / cluster / table overview, Cloud Monitoring, Key Visualizer) or programmatically through the Cloud Monitoring API. Monitor CPU, disk and (Preview) in-memory tier usage for every cluster: past certain thresholds a cluster performs poorly and can return errors.

## Signature / Usage

### Storage utilization alert

Create an alerting policy in Cloud Monitoring with these values (from the source tables). A recommended threshold is 70%.

| New condition field | Value |
|---|---|
| Resource and Metric | Resource **Cloud Bigtable Cluster**, metric category **Cluster**, metric **Storage utilization** (metric.type `bigtable.googleapis.com/cluster/storage_utilization`) |
| Filter | `cluster = YOUR_CLUSTER_ID` |

| Configure alert trigger field | Value |
|---|---|
| Condition type | `Threshold` |
| Condition triggers if | `Any time series violates` |
| Threshold position | `Above threshold` |
| Threshold value | 70 |
| Retest window | `10 minutes` |

### Add nodes when utilization is too high

The source advises adding nodes to a cluster that uses more than the recommended percentage of the storage limit, or whose disk load is frequently at 100%. Set a cluster to 10 nodes (example from the gcloud reference):

```bash
gcloud bigtable clusters update my-cluster-id \
    --instance=my-instance-id --num-nodes=10
```

## Options / Props

### CPU and disk guidance

| Metric | Notes |
|---|---|
| Average CPU utilization | Average across all nodes; includes change stream activity; `<system>` in app profile charts = background work (replication, compaction) |
| High-granularity CPU utilization of hottest node | Preferred over "CPU utilization of hottest node"; if often above the recommended value while average is fine, access is skewed: use Key Visualizer and review schema design |
| Change stream CPU utilization | CPU caused by change stream activity |
| Storage utilization (% max) | Do not use more than 70% of the hard limit unless you will not add significant data (up to 100%) |
| Storage utilization (bytes) | Physical compressed size, excludes change stream usage; can take up to 2 hours to reflect changes |
| Change stream storage utilization (bytes) | Billed but not counted in storage utilization |
| Disk load | HDD: share of maximum HDD read bandwidth; SSD with tiered storage: share of infrequent access tier throughput; add nodes if frequently 100% |
| In-memory tier (Preview, Enterprise Plus) | Max request units (reads per second, 5 minute window; 1 request unit = 1 KiB point read), request unit count, read request count, read latencies, hit ratio, ineligible reason count |

### Instance overview metrics

CPU utilization average, CPU of hottest node (and high-granularity), rows read / written, read / write throughput (bytes per second), system error rate, replication latency for input / output (99th percentile, seconds).

### Cluster overview metrics

Number of nodes, maximum / minimum node count target and recommended number of nodes for CPU / storage target (autoscaling only), CPU utilization, storage utilization, in-memory tier metrics (Enterprise Plus only). The Logs chart shows system event logs, generated only for clusters that use autoscaling.

### Table overview metrics

Storage utilization (bytes), CPU utilization, read / write latency, rows read / written, read / write requests, read / write throughput, automatic failovers; plus per-cluster replication state, encryption key and status, and latest backup date.

### System insights extras

- Chart range: past 1 hour to past 6 weeks; resources: instances, tables, application profiles, replication.
- User error rate (status codes `INVALID_ARGUMENT`, `NOT_FOUND`, `PERMISSION_DENIED`, `RESOURCE_EXHAUSTED`, `OUT_OF_RANGE`); to view it, group by instance.
- System error rate (`UNKNOWN`, `ABORTED`, `UNIMPLEMENTED`, `INTERNAL`, `UNAVAILABLE`).
- Client-side latency metrics, SQL read latency, SQL automatic failovers, Data Boost SPUs and eligibility, node count.
- Replication latency chart: 50th, 99th and 100th percentiles.

### Required roles (system insights dashboards)

| Task | Role |
|---|---|
| Create and edit custom dashboards | `roles/monitoring.dashboardEditor` (`monitoring.dashboards.create`, `monitoring.dashboards.update`) |
| Open and view Metrics Explorer charts | `roles/monitoring.dashboardViewer` (`monitoring.dashboards.get`, `monitoring.dashboards.list`) |
| Create and edit Metrics Explorer alerts | `roles/monitoring.editor` |

## Notes

- If any cluster exceeds the hard storage limit per node, writes to all clusters in the instance fail until you add nodes to each cluster over the limit; removing nodes that would push a cluster over the limit is denied. Deleted data takes up more space until compaction.
- Compaction runs independently per cluster over about a week, so storage metrics can differ between clusters (a new cluster may show 0 bytes temporarily).
- Autoscaling is recommended so Bigtable adds and removes nodes by workload. Requests grouped by cluster may show an `<unspecified>` cluster ID for requests that could not reach a cluster.
- The source also shows Console click-paths for each overview page, dashboard customization and the alert policy wizard. The source lists "Metrics" and Key Visualizer as separate pages.
- Java client library users can enable client-side metrics. Bigtable is a wide-column NoSQL database, not a relational one.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/bigtable/clusters/update (the monitoring page has no code block). For clusters with autoscaling, the same command takes `--autoscaling-max-nodes`.
- Source: https://docs.cloud.google.com/bigtable/docs/monitoring-instance (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [change-streams-overview.md](./change-streams-overview.md)
- [backups.md](./backups.md)
