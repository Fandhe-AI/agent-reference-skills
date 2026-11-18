---
source: https://docs.cloud.google.com/managed-service-for-apache-kafka/docs/monitor-cluster
---

# Monitor a Managed Service for Apache Kafka cluster

The service exports several metrics available in open-source Kafka as well as service-specific metrics such as consumer group offset lag. Metrics belong to four resource categories (Cluster, Topic, Topic Partition, Topic Partition Consumer Group) and are viewed on the Cluster details dashboards or in Metrics Explorer. Cloud Monitoring itself (charts, alerting, notification channels) is covered by `gcp-observability`.

## Signature / Usage

The service is identified by `managedkafka.googleapis.com`; the metric types below are prefixed with it (for example `managedkafka.googleapis.com/message_in_count`). Example PromQL query for message rates per broker:

```promql
sum by (resource_container, location, cluster_id, broker_index) (
  rate(
    {
      "managedkafka.googleapis.com/message_in_count",
      monitored_resource="managedkafka.googleapis.com/Topic"
    }[${__interval}]
  )
)
```

In Metrics Explorer, enter `Apache Kafka` in the filter and select one of the active resources: Apache Kafka Cluster, Apache Kafka Topic, Apache Kafka Topic Partition, Apache Kafka Topic Partition Consumer Group.

## Options / Props

### Cluster metrics (filter by label `cluster_id`)

| Metric | Description | Equivalent MBean name |
|--------|-------------|-----------------------|
| `cpu/core_usage_time` | Cumulative CPU usage of the cluster in vCPU; useful for understanding the cost of operation | N/A |
| `cpu/limit` | Current CPU count configured for the cluster; ratio with `cpu/usage` gives utilization | N/A |
| `memory/usage` | Current RAM usage; ratio with `memory/limit` gives utilization | N/A |
| `memory/limit` | Current configured RAM size | N/A |
| `jvm/memory_area/bytes_used` | Used bytes of a JVM memory area (heap or non-heap) for brokers and controllers | `java.lang:type=Memory,HeapMemoryUsage.used` `java.lang:type=Memory,NonHeapMemoryUsage.used` |
| `jvm/memory_area/bytes_committed` | Committed bytes of a JVM memory area for brokers and controllers | `java.lang:type=Memory,HeapMemoryUsage.committed` `java.lang:type=Memory,NonHeapMemoryUsage.committed` |
| `cluster_byte_in_count` | Total bytes from clients sent to all topics | `kafka.server:type=BrokerTopicMetrics,name=BytesInPerSec` |
| `cluster_byte_out_count` | Total bytes sent to clients from all topics | `kafka.server:type=BrokerTopicMetrics,name=BytesOutPerSec` |
| `cluster_message_in_count` | Total messages published to all topics | `kafka.server:type=BrokerTopicMetrics,name=MessagesInPerSec` |
| `request_count` | Total requests made to the broker | `kafka.network:type=RequestMetrics,name=RequestsPerSec,request= {Produce\|FetchConsumer\|FetchFollower},version=([0-9]+)` |
| `request_byte_count` | Total size in bytes of requests made to the cluster | `kafka.network:type=RequestMetrics,name=RequestBytes,request= ([-.\w]+)` |
| `partitions` | Current number of partitions handled by the cluster, by broker | `kafka.server:type=ReplicaManager,name=PartitionCount` |
| `request_latencies` | Milliseconds taken for each request, at various percentiles | `kafka.network:type=RequestMetrics,name=TotalTimeMs,request= {Produce\|FetchConsumer\|FetchFollower}` |
| `consumer_groups` | Current number of consumer groups consuming from the broker | `kafka.server:type=GroupMetadataManager,name=NumGroups` |
| `offline_partitions` | Offline topic partitions as observed by the controller | `kafka.controller:type=KafkaController,name=OfflinePartitionCount` |

### Topic metrics (filter by labels `cluster_id`, `topic_id`)

| Metric | Description | Equivalent MBean name |
|--------|-------------|-----------------------|
| `message_in_count` | Total messages published to the topic | `kafka.server:type=BrokerTopicMetrics,name=MessagesInPerSec, topic=([-.\w]+)` |
| `byte_in_count` | Total bytes from clients sent to the topic | `kafka.server:type=BrokerTopicMetrics,name=BytesInPerSec,topic=([-.\w]+)` |
| `topic_request_count` | Total produce and fetch requests made to the topic | `kafka.server:type=BrokerTopicMetrics,name=TotalProduceRequestsPerSec,topic=([-.\w]+)` `kafka.server:type=BrokerTopicMetrics,name=TotalFetchRequestsPerSec,topic=([-.\w]+)` |
| `topic_error_count` | Total failed produce and failed fetch requests made to the topic | `kafka.server:type=BrokerTopicMetrics,name=FailedProduceRequestsPerSec,topic=([-.\w]+)` `kafka.server:type=BrokerTopicMetrics,name=FailedFetchRequestsPerSec,topic=([-.\w]+)` |
| `byte_out_count` | Total bytes sent to clients | `kafka.server:type=BrokerTopicMetrics,name=BytesOutPerSec, topic=([-.\w]+)` |

### Partition metrics (filter by labels `cluster_id`, `topic_id`, `partition_index`)

| Metric | Description | Equivalent MBean name |
|--------|-------------|-----------------------|
| `consumer_lag` | Replication lag in messages between leader and each follower replica | `kafka.server:type=FetcherLagMetrics,name=ConsumerLag,clientId=([-.\w]+),topic=([-.\w]+),partition=([0-9]+)` |
| `log_segments` | Current number of log segments; useful to confirm storage tiering stays healthy | `kafka.log:type=Log,name=NumLogSegments,topic=([-.\w]+),partition=([0-9]+)` |
| `first_offset` | First offset of each partition; with `last_offset` bounds the number of stored messages and finds the oldest offset | `kafka.log:type=Log,name=LogStartOffset,topic=([-.\w]+),partition=([0-9]+)` |
| `last_offset` | Last offset in the partition; useful to find the offset needed to reprocess data from a past time | `kafka.log:type=Log,name=LogEndOffset,topic=([-.\w]+),partition=([0-9]+)` |
| `byte_size` | Size of the partition on disk in bytes | N/A |

### Consumer group metrics (filter by label `consumer_group_id`)

| Metric | Description | Equivalent MBean name |
|--------|-------------|-----------------------|
| `offset_lag` | Difference between the latest offset and the last committed offset of the consumer group for each partition; estimates how many produced messages the consumer has not yet processed | N/A |

### mTLS metric

| Metric | Description |
|--------|-------------|
| `managedkafka.googleapis.com/mtls_truststore_update_count` | Truststore update attempts with a `STATUS` label (`SUCCESS` or a failure reason such as `CA_POOL_FETCH_ERROR`); refreshed hourly per cluster; the mTLS page recommends alerting on persistent errors for more than three hours |

## Notes

- Corrected from the official docs: the source writes the role ID as `roles/managedkafka.Viewer`; role IDs are case-sensitive and the IAM roles and permissions reference lists `roles/managedkafka.viewer` (https://docs.cloud.google.com/iam/docs/roles-permissions/managedkafka).
- Viewing requires the Managed Kafka Viewer role (`roles/managedkafka.viewer`) on the project.
- Snippet taken from https://docs.cloud.google.com/managed-service-for-apache-kafka/docs/monitor-clients (the query is shown there on one line in a table cell; line breaks were added for readability, the tokens are unchanged). The monitor-cluster page itself has no code block.
- The tables list commonly used metrics only; the complete list is at https://docs.cloud.google.com/monitoring/api/metrics_gcp_i_o#gcp-managedkafka . Metric names in the source are shown without the `managedkafka.googleapis.com/` prefix.
- Open-source Kafka error metrics for consumer groups are not available by partition, only at topic level. Some metrics can be grouped by broker index, which maps to the zone where the broker is provisioned (see View brokers).
- The `mtls_truststore_update_count` row comes from https://docs.cloud.google.com/managed-service-for-apache-kafka/docs/authentication-kafka-mtls and https://docs.cloud.google.com/managed-service-for-apache-kafka/docs/authn-types-kafka (retrieved 2026-11-18).
- The source also shows the Console click-paths for the Cluster details Monitoring tabs and Metrics Explorer.
- Google Cloud Managed Service for Apache Kafka runs Apache Kafka; metric semantics follow upstream Apache Kafka MBeans.
- Source: https://docs.cloud.google.com/managed-service-for-apache-kafka/docs/monitor-cluster (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [monitor-clients.md](./monitor-clients.md)
- [authentication-kafka-mtls.md](./authentication-kafka-mtls.md)
