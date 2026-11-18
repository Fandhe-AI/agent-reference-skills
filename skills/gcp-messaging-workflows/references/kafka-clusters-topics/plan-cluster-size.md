---
source: https://docs.cloud.google.com/managed-service-for-apache-kafka/docs/plan-cluster-size
---

# Plan the Size of Your Kafka Cluster

How to estimate vCPU, memory and disk for a Managed Service for Apache Kafka cluster and which rules apply when you resize an existing cluster. Size is set by vCPU count (minimum 3) and memory (1 GiB to 8 GiB per vCPU), and both can be updated after creation.

## Signature / Usage

### Estimate vCPUs and memory

Inputs: write throughput (producers to cluster, MBps) and read throughput (consumers from cluster, MBps). The source gives these formulas as inline code:

- Total write bandwidth: `Total write bandwidth = produce rate * replicas`
- Total read bandwidth: `Total read bandwidth = consume rate + produce rate * ( replicas - 1)`
- Write-equivalent rate: `Write-equivalent rate = (total write bandwidth) + (total read bandwidth / 4)`
- vCPUs: `vCPU count = ceiling (write-equivalent rate / 20 MBps / utilization)`
- Memory: `Memory = vCPU count * 4 GiB`

### Worked example

Write 50 MBps, read 100 MBps, 3 replicas, 50% target utilization:

- `Total write bandwidth = 50 MBps * 3 replicas = 150 MBps`
- `Total read traffic = 100 MBps + 50 MBps * (3 - 1) = 200 MBps`
- `Write-equivalent rate = 150 MBps + (200 MBps / 4) = 200 MBps`
- `Target utilization = 0.5`
- `Number of vCPUs = ceiling (200 MBps / 20 MBps / 0.5) = 20 vCPUs`
- `Memory = 20 vCPUs * 4 GiB = 80 GiB`

### Minimum disk per broker

With the assumption of 250 MiB needed per partition (for clusters with moderate utilization), the minimum disk size per broker is `250 MiB * partition count * replication factor / broker count`.

### Resize an existing cluster

```bash
gcloud managed-kafka clusters update mycluster \
    --location=us-central1 --cpu=3
```

## Options / Props

### Sizing parameters and limits

| Item | Value |
|------|-------|
| Minimum vCPU count | 3 |
| Memory | 1 GiB to 8 GiB per vCPU; 4 GiB per vCPU recommended |
| Default replicas | 3 |
| Capacity of one vCPU in one zone | 20 MBps (estimated); batches smaller than 10 KB reduce throughput per CPU |
| Read vs write | Read bandwidth is 4 times more efficient to process than write bandwidth |
| Baseline utilization target | 50% (or ratio of average write-equivalent bandwidth to peak bandwidth if traffic is known) |
| Partition replicas per cluster | 100,000 (hard limit; split a larger workload across clusters) |
| Partition replicas per broker | 4,000 (not a hard limit; increase cluster size to get more brokers) |
| Default local disk | 100 GiB per vCPU, per broker |
| Default max segment file size | 230 MiB (broker `log.segment.bytes`, topic `segment.bytes`; maximum age by broker `log.roll.ms` / `log.roll.hours`, topic `segment.ms`); assume 250 MiB per partition |
| Disk alert threshold | Configure a larger disk if usage is over 80% of total disk size (metrics `disk/used_bytes`, `disk/limit`) |

### Rules for updating an existing cluster

| Rule |
|------|
| The cluster's overall vCPU-to-memory ratio must remain between 1:1 and 1:8. |
| At least 1 vCPU and 1 GiB of memory for each existing broker; the number of brokers never decreases. |
| With a custom disk configuration, the update must meet the disk configuration requirements for local storage. |
| On upscale, the average vCPU and memory per broker can't decrease by more than 10% compared to before the update. Example: 45 vCPUs (3 brokers) to 48 vCPUs (4 brokers) lowers vCPU per broker from 15 to 12 (20%) and fails. |
| To decrease by more than 10%, reduce in several stages, monitor utilization after each, and rebalance partitions if needed. |
| The 10% check can be disabled with the `allow_broker_downscale_on_cluster_upscale=true` flag on `gcloud managed-kafka clusters update` (accepting the performance risk). |

### Example update operations (start: 75 vCPUs, 130 GiB, 5 brokers)

| Target | New brokers | Per-broker change | Result |
|--------|-------------|-------------------|--------|
| 80 vCPUs, 140 GiB | ceiling(80 / 15) = 6 | 13.33 vCPUs (-11.1%), 23.33 GiB (-10.2%) | Fails (over 10%) |
| 85 vCPUs, 150 GiB | ceiling(85 / 15) = 6 | 14.17 vCPUs (-5.5%), 25 GiB (-3.8%) | Succeeds |

## Notes

- Corrected from the official docs: the source names the segment size setting `log.roll.bytes` and the segment age setting `log.segment.ms`; neither exists in Apache Kafka. The size is `segment.bytes` (topic) / `log.segment.bytes` (broker) and the age is `segment.ms` (topic) / `log.roll.ms` or `log.roll.hours` (broker). Source: https://github.com/apache/kafka/blob/3.7.0/clients/src/main/java/org/apache/kafka/common/config/TopicConfig.java and https://github.com/apache/kafka/blob/3.7.0/server-common/src/main/java/org/apache/kafka/server/config/ServerTopicConfigSynonyms.java (tag 3.7.0, retrieved 2026-11-19).
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/managed-kafka/clusters/update (gcloud 593.0.0 help); `--cpu=3` is the help's example value, not a sizing recommendation.
- Test with your real workload for the most accurate sizing; monitor resource usage and scale up if needed.
- A broker with no disk capacity behaves unpredictably and can result in data loss as well as cluster instability; keep unused disk capacity on each broker.
- Flag spelling: the source writes the override as `allow_broker_downscale_on_cluster_upscale=true`; the gcloud 593.0.0 help for `gcloud managed-kafka clusters update` names it `--allow-broker-downscale-on-cluster-upscale` (no value). Use the help's spelling on the command line.
- The initial broker count is `max(3, ceiling(vCPUs / 15))` (see the networking page for subnet IP sizing).
- Source: https://docs.cloud.google.com/managed-service-for-apache-kafka/docs/plan-cluster-size (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-cluster.md](./create-cluster.md)
- [networking-kafka.md](./networking-kafka.md)
- [overview.md](./overview.md)
