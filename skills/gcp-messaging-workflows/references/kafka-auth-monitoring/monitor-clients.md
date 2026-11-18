---
source: https://docs.cloud.google.com/managed-service-for-apache-kafka/docs/monitor-clients
---

# Monitor Kafka client applications

How to monitor the health of producers and consumers of a Managed Service for Apache Kafka cluster. Server-side metrics need no extra instrumentation and expose hot brokers and latency spikes; client-side metrics catch problems the server does not see. Cloud Monitoring dashboards and alerts are covered by `gcp-observability`.

## Signature / Usage

PromQL queries for custom dashboards and alerts (Prometheus Query Language in Cloud Monitoring).

Message rates per broker:

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

Request latency (95th percentile, Produce):

```promql
sum by (resource_container, location, cluster_id, broker_index, request) (
  avg_over_time(
    {
      "managedkafka.googleapis.com/request_latencies",
      monitored_resource="managedkafka.googleapis.com/Cluster",
      "percentile"="95",
      "request"="Produce"
    }[${__interval}]
  )
)
```

Request error counts:

```promql
sum by (resource_container, location, cluster_id, broker_index, request) (
  rate(
    {
      "managedkafka.googleapis.com/topic_error_count",
      monitored_resource="managedkafka.googleapis.com/Topic"
    }[${__interval}]
  )
)
```

Consumer lag, top 5 consumer groups by offset lag:

```promql
topk(5,
  max by (resource_container, location, cluster_id, consumer_group_id) (
    max_over_time(
      {
        "managedkafka.googleapis.com/offset_lag",
        monitored_resource="managedkafka.googleapis.com/TopicPartitionConsumerGroup"
      }[${__interval}]
    )
  )
)
```

## Options / Props

### Signals

| Signal | Metric | Notes |
|--------|--------|-------|
| Message rate (per broker, per topic) | `message_in_count` | Compare with expected throughput |
| Bandwidth per topic and broker | `byte_in_count` | Query `sum by (resource_container, location, cluster_id, broker_index, topic_id)` |
| Request rate | `request_count` (monitored resource `managedkafka.googleapis.com/Cluster`, label `"request"="Produce"`) | Also `topic_request_count` for cluster totals (resource `Topic`) |
| Request latency | `request_latencies` (label `"percentile"="95"`) | Spikes in producer latency may mean imbalanced load or client misconfiguration |
| Request errors | `topic_error_count` | Does not reflect all errors; also monitor client-side errors and time-outs |
| Consumer lag, top 5 partitions | `offset_lag` (resource `managedkafka.googleapis.com/TopicPartitionConsumerGroup`) | `topk(5, max by (... topic_id, partition_index) ...)` |
| Consumer lag, top 5 consumer groups | `offset_lag` | Alert on maximum lag across the critical topics |

### Client-side JMX metrics to instrument first

| Metric | MBean |
|--------|-------|
| Request error rates | `kafka.producer:type=producer-metrics,client-id="{client-id}"` |
| Request average latency | `kafka.producer:type=producer-metrics,client-id="{client-id}"` |

### Mitigations

| Symptom | Action |
|---------|--------|
| Imbalanced load across brokers (hot brokers) | Make sure auto rebalancing is enabled on the cluster |
| Unusually high request rate | Check for many small requests (0-1000 bytes each); review producer `max.request.size` and `batch.size` |
| Misbehaving clients | Check authentication, networking and flow control configuration |
| Excessive lag across all topics or partitions in a cluster | The cluster might be overloaded; scale it up |
| Excessive lag across all topics or partitions in one broker | The broker might be overloaded; improve key distribution or reassign partitions to other brokers |

## Notes

- The source shows each query on one line inside a table cell; line breaks and indentation were added for readability, the tokens are unchanged.
- Server-side examples of errors not reflected in `topic_error_count`: misconfigured authorization that prevents producing without showing in the metric, and cluster failures that stop a broker from responding at all.
- Client-side problems invisible to the server: misconfigured authentication or networking (messages accumulate in client queues and are re-enqueued after time-outs) and misconfigured flow control (a growing backlog of requests expires before it can be sent). On Compute Engine, GKE or Cloud Run, log-based metrics in Cloud Monitoring can detect high error rates, but some Kafka clients hide the exceptions unless log levels are raised, so also monitor request latency.
- The source's remaining PromQL rows (message rates per broker per topic for the largest 5 topics, bandwidth per topic and broker, request rate and cluster totals, top 5 partitions by offset lag) follow the same pattern and are summarized in the Signals table; the queries above are four of the nine shown.
- Kafka throughput metrics per topic and for the cluster do not always have the same values when aggregated; use an aggregate for high-level alerting and per-topic metrics for troubleshooting.
- Java clients expose many metrics through JMX; see https://kafka.apache.org/37/operations/monitoring/ . The JMX ports on client machines can be read interactively.
- Google Cloud Managed Service for Apache Kafka runs Apache Kafka; client properties follow upstream Apache Kafka.
- Source: https://docs.cloud.google.com/managed-service-for-apache-kafka/docs/monitor-clients (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [monitor-cluster.md](./monitor-cluster.md)
- [access-control-kafka-acls.md](./access-control-kafka-acls.md)
