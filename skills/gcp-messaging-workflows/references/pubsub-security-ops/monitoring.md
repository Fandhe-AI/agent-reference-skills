---
source: https://docs.cloud.google.com/pubsub/docs/monitoring
---

# Monitor Pub/Sub with Cloud Monitoring

Pub/Sub reports metrics for the monitored resource types `pubsub_topic`, `pubsub_subscription` and `pubsub_snapshot` to Cloud Monitoring. Use dashboards, Metrics Explorer and PromQL to watch backlog, delivery latency, ack deadline expiration, throughput, push health, quota usage and publisher health.

## Signature / Usage

### Alert when any Pub/Sub quota exceeds 80% usage

```promql
sum by (quota_metric, location) (
  increase({
    "__name__"="serviceruntime.googleapis.com/quota/rate/net_usage",
    "monitored_resource"="consumer_quota",
    "service"="pubsub.googleapis.com"
  }[1m])
)
/
max by (quota_metric, location) (
   max_over_time({
    "__name__"="serviceruntime.googleapis.com/quota/limit",
    "monitored_resource"="consumer_quota",
    "service"="pubsub.googleapis.com"
  }[1m])
)
> 0.8
```

### Delivery latency health score

```promql
sum_over_time(
  {
    "__name__"="pubsub.googleapis.com/subscription/delivery_latency_health_score",
    "monitored_resource"="pubsub_subscription",
    "subscription_id"="$SUBSCRIPTION"
  }[${__interval}]
)
```

### Messages sent to a subscription over a rolling 10-minute period

Replace `$PROJECT_NAME` and `$SUBSCRIPTION_NAME`.

```promql
sum(
  increase({
    "__name__"="pubsub.googleapis.com/subscription/sent_message_count",
    "monitored_resource"="pubsub_subscription",
    "project_id"="$PROJECT_NAME",
    "subscription_id"="$SUBSCRIPTION_NAME"
  }[10m])
)
```

### Fraction of push requests acknowledged

```promql
rate({
  "__name__"="pubsub.googleapis.com/subscription/push_request_count",
  "monitored_resource"="pubsub_subscription",
  "subscription_id"="$SUBSCRIPTION",
  "response_class"="ack"
}[${__interval}])
/
rate({
  "__name__"="pubsub.googleapis.com/subscription/push_request_count",
  "monitored_resource"="pubsub_subscription",
  "subscription_id"="$SUBSCRIPTION"
}[${__interval}])
```

### Individual messages published to a topic

Replace `$PROJECT_NAME` and `$TOPIC_ID`.

```promql
sum by (topic_id) (
  increase({
    "__name__"="pubsub.googleapis.com/topic/message_sizes_count",
    "monitored_resource"="pubsub_topic",
    "project_id"="$PROJECT_NAME",
    "topic_id"="$TOPIC_ID"
  }[${__interval}])
)
```

## Options / Props

### Backlog metrics (use the `by_region` versions)

| Use | Instead of |
|-----|-----------|
| `subscription/num_unacked_messages_by_region` | `subscription/num_undelivered_messages` |
| `subscription/oldest_unacked_message_age_by_region` | `subscription/oldest_unacked_message_age` |

### Common backlog issues

| Symptoms | Problem | Solutions |
|----------|---------|-----------|
| `oldest_unacked_message_age_by_region` and `num_unacked_messages_by_region` grow together | Subscribers not keeping up | Add subscriber threads, processes, machines or containers; look for bugs that prevent acking or timely processing; monitor ack deadline expiration |
| Steady small backlog with steadily growing `oldest_unacked_message_age_by_region` | Stuck messages | Examine application logs for crashing messages; raise a support case only after your code processes each message; consider forwarding crashing messages to a dead-letter topic |
| `oldest_unacked_message_age_by_region` exceeds the subscription message retention duration | Permanent data loss | Alert before the retention duration lapses |

### Delivery latency health score criteria (rolling 10-minute window; 1 = healthy, 0 = unhealthy)

| Criterion | Score is 0 when |
|-----------|-----------------|
| Seek requests | Any seek request in the last 10 minutes |
| Nacked messages | Any nack in the last 10 minutes |
| Expired ack deadlines | Any expired ack deadline in the last 10 minutes |
| Ack latencies | 99.9th percentile ack latency over the last 10 minutes was ever greater than 30 seconds |
| Low utilization | StreamingPull: not enough open streams; push: too many outstanding messages to the endpoint; pull: not enough outstanding pull requests |

### Metrics by subscription type

| Purpose | Pull / StreamingPull | Push |
|---------|----------------------|------|
| Ack deadline expiration | `subscription/expired_ack_deadlines_count` | `subscription/push_request_count` filtered by `response_code != "success"` |
| Batch throughput | Pull: `subscription/pull_request_count` (may include pulls that returned no messages); StreamingPull: `subscription/streaming_pull_response_count` | One message per push request |
| Individual message throughput | `subscription/sent_message_count` filtered by `delivery_type` | same |

### Other metrics named in the source

| Metric | Use |
|--------|-----|
| `subscription/push_request_count` | Group by `response_code` and `subscription_id`; response codes act as implicit acks |
| `subscription/num_outstanding_messages` | Aim for fewer than 1,000 outstanding messages |
| `subscription/push_request_latencies` | Endpoint latency distribution; 100 ms per message implies about 10 messages per second |
| `subscription/ack_message_count` with `delivery_type` = `filter` | Rate of messages auto-acked because they do not match a subscription filter |
| `subscription/byte_cost` with `operation_type` = `filter_drop` | Throughput and cost of filter-dropped messages |
| `subscription/dead_letter_message_count` | Undeliverable messages forwarded to a dead-letter topic; compare with `topic/send_request_count` for the dead-letter topic |
| `topic/send_request_count` | Publish health, grouped by `response_code`; also batch publish volume |
| `topic/message_sizes` | Count gives individual (unbatched) published messages |
| `serviceruntime.googleapis.com/quota/rate/net_usage` and `serviceruntime.googleapis.com/quota/limit` | Historical quota usage (monitored resource `consumer_quota`) |

## Notes

- Metrics might have occasional gaps; backlog metrics can have gaps of up to several minutes. Do not use the global (non-`by_region`) backlog versions if dashboards and alerts must survive a single-region outage: they need all regions with messages, so one unavailable region creates a data gap.
- Alert on backlog relative to your throughput; the absolute count is not meaningful (a million-message backlog can be fine at a million messages per second and unacceptable at one per second).
- A small ack deadline expiration rate (for example 0.1 to 1%) might be healthy; excessive rates cost you for every redelivery and show up as duplicates, so subscribers must tolerate duplicates.
- Push: subscriptions back off exponentially on timeouts or errors, so the backlog can grow quickly. Higher outstanding-message limits require acknowledging more than 99% of received messages. After throughput reaches the order of 10,000 messages per second, the service adjusts the outstanding limit in increments of 1,000; no specific guarantees are made beyond the maximum value, so 1,000 outstanding messages is a good guide.
- Subscriptions with filters: backlog metrics include only messages that match the filter. Subscriptions with SMTs: backlog metrics include messages the SMT filters out until the SMT runs on them, so the backlog and oldest age can look larger than what is delivered; keep this in mind when autoscaling subscribers.
- Publishers: investigate error rates greater than 1% (a background retryable error rate below 1% is not a concern). Client libraries retry but do not guarantee publication; at minimum log permanent publish errors, and you can build a logs-based metric with an alerting policy.
- Dashboards: Pub/Sub has built-in dashboards (monitor topics, monitor subscriptions); use Cloud Monitoring for metrics from other resources. Cloud Monitoring itself is covered by `gcp-observability`. See the Pub/Sub quotas page for default quota limits. For scaling signals, see the Pub/Sub metrics autoscaling best-practices page.
- `$PROJECT_NAME` fills the `project_id` label; the source says to replace the placeholders "with your actual project and topic identifiers", so use the project ID, not the display name.
- The source also shows Console click-paths for dashboards and Metrics Explorer, and two more PromQL queries (messages sent over a rolling 1-hour period and publisher quota fraction per region) that are omitted here.
- Source: https://docs.cloud.google.com/pubsub/docs/monitoring (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [encryption.md](./encryption.md)
- [resource-location-restriction.md](./resource-location-restriction.md)
- [troubleshooting.md](./troubleshooting.md)
