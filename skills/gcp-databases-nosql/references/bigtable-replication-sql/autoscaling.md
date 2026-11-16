---
source: https://docs.cloud.google.com/bigtable/docs/autoscaling
---

# Autoscaling

Bigtable autoscaling continuously monitors a cluster and adds or removes nodes based on CPU utilization target, storage utilization target, and minimum and maximum node counts. It works on HDD and SSD clusters in all regions and is configured via the Google Cloud console, gcloud or the Java client library. Some features are Enterprise Plus only.

## Signature / Usage

### View autoscaling system event logs (Logs Explorer query)

```text
resource.type="audited_resource" resource.labels.service="bigtableadmin.googleapis.com"
resource.labels.method="AutoscaleCluster"
```

Example log entry:

```text
Grew from 9 to 10 nodes to maintain CPU utilization at 60%.
```

## Options / Props

| Parameter | Description |
|-----------|-------------|
| CPU utilization target | 10% to 80% of cluster CPU capacity. Nodes are added immediately when exceeded; removed when substantially lower |
| Minimum nodes | Greater than zero; not lower than 10% of the maximum (hard limit; max 40 means min at least 4). Even number if 2x node scaling is enabled (default for Enterprise Plus) |
| Maximum nodes | Greater than zero, at least the minimum, at most 10x the minimum (hard limit). Even number with 2x node scaling |
| Storage utilization target | Terabytes per node before scale-up; default 50% (2.5 TB SSD, 8 TB HDD). Excludes the infrequent access tier |
| Combined SSD and infrequent access | Per-node limit for SSD plus infrequent access (tiered storage, Preview) |

Per-node capacity limits: 5 TB SSD, 16 TB HDD. Console takes TB per node; gcloud, API and client libraries take an integer in GiB per node.

| Percentage | SSD | HDD |
|------------|-----|-----|
| 80% | 4 TB or 4,096 GiB | 12.8 TB or 13,107 GiB |
| 70% | 3.5 TB or 3,584 GiB | 11.2 TB or 11,468 GiB |
| 60% | 3 TB or 3,072 GiB | 9.6 TB or 9,830 GiB |
| 50% | 2.5 TB or 2,560 GiB | 8 TB or 8,192 GiB |

Tiered storage combined limit: Enterprise 32 TB per node; Enterprise Plus 32 TB or 64 TB per node.

Monitoring metrics:

| Metric |
|--------|
| `bigtable.googleapis.com/cluster/autoscaling/min_node_count` |
| `bigtable.googleapis.com/cluster/autoscaling/max_node_count` |
| `bigtable.googleapis.com/cluster/autoscaling/recommended_node_count_for_cpu` |
| `bigtable.googleapis.com/cluster/autoscaling/recommended_node_count_for_storage` |
| `bigtable.googleapis.com/memory_layer/request_unit_usage` (Enterprise Plus only) |

## Notes

- Each dimension yields a recommended node count and Bigtable uses the highest (10 nodes for storage, 12 for CPU gives 12).
- At max nodes with CPU target exceeded, requests may have high latency or fail; at max nodes with the storage limit exceeded, writes fail.
- Autoscaling alone may not suit bursty traffic or sudden batch workloads because rebalancing new nodes takes time; for predictable spikes adjust settings beforehand (raise the minimum). Scale-down is slower than scale-up. Small clusters can see temporary latency when a node is added or removed.
- Raising the minimum triggers an immediate attempt to scale; if a zone is out of nodes, Bigtable keeps retrying and logs an audit entry per failed attempt, so the node count can be below the configured minimum until scaling completes.
- Storage target: latency-sensitive apps keep utilization below 60%; others may use 70% or more. Sizing the maximum: storage divided by the per-node target (10 TB SSD / 2.5 TB = 4, so choose higher); examples 25 TB gives 10, 35 TB gives 14, 50 TB gives 20. When moving from manual allocation, use at least the highest node count of the last month.
- Replicated instances: each cluster's autoscaling is independent; configure every cluster and choose a higher maximum than for a single-cluster instance to cover replication work.
- In-memory tier (Preview, Enterprise Plus) uses vertical scaling for point-read throughput and scales horizontally when in-memory capacity is reached.
- Required permissions: `create` and `update` on the cluster and instance.
- Fine-tuning: lower the CPU target if latency is high; compare recommended and provisioned node counts; raise the maximum if it is frequently hit.
- Wide-column NoSQL database; not a relational database (see `gcp-databases-relational`).
- Source: https://docs.cloud.google.com/bigtable/docs/autoscaling (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- The source also describes Console and gcloud configuration without showing commands in this twin.

## Related

- [replication-settings.md](./replication-settings.md)
- [replication-overview.md](./replication-overview.md)
