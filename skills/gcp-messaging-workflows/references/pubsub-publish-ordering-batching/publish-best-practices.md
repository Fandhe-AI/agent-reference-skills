---
source: https://docs.cloud.google.com/pubsub/docs/publish-best-practices
---

# Publishing best practices and topic monitoring

Best practices for publishing to Pub/Sub topics (result handling, message IDs, retention before first publish, batching, flow control, retry settings, message storage policy, ordering keys), plus how to monitor topics in the Cloud console (merged from the topic monitoring page).

## Signature / Usage

Publish through a client with custom batch settings (Python):

Adapted (not in the official docs): a failed publish only raised inside the done callback, after which the sample still printed that the messages were published; the futures are now checked with `result()` after `futures.wait`, so a failure stops the script.

```python
from concurrent import futures
from google.cloud import pubsub_v1

# TODO(developer)
# project_id = "your-project-id"
# topic_id = "your-topic-id"

# Configure the batch to publish as soon as there are 10 messages
# or 1 KiB of data, or 1 second has passed.
batch_settings = pubsub_v1.types.BatchSettings(
    max_messages=10,  # default 100
    max_bytes=1024,  # default 1 MB
    max_latency=1,  # default 10 ms
)
publisher = pubsub_v1.PublisherClient(batch_settings)
topic_path = publisher.topic_path(project_id, topic_id)
publish_futures = []

# Resolve the publish future in a separate thread.
def callback(future: pubsub_v1.publisher.futures.Future) -> None:
    message_id = future.result()
    print(message_id)

for n in range(1, 10):
    data_str = f"Message number {n}"
    # Data must be a bytestring
    data = data_str.encode("utf-8")
    publish_future = publisher.publish(topic_path, data)
    # Non-blocking. Allow the publisher client to batch multiple messages.
    publish_future.add_done_callback(callback)
    publish_futures.append(publish_future)

futures.wait(publish_futures, return_when=futures.ALL_COMPLETED)
for publish_future in publish_futures:
    # Re-raise a failed publish instead of reporting success.
    publish_future.result()

print(f"Published messages with batch settings to {topic_path}.")
```

## Options / Props

### Best practices

| Topic | Task |
|---|---|
| Result handling | The publish call returns a future; handle it asynchronously. Options: log and ignore (if not every message must publish), retry on transient failures such as `Deadline exceeded`, persist the message to a file or storage for later retry on errors needing intervention such as `Not found` or `Permission denied`, or propagate the error upstream. A successful result is the message ID. |
| Message IDs | Publishers and subscribers should preserve message IDs (store or log them) to troubleshoot duplicates, redeliveries and data loss. |
| Retention before publishing | Messages published to a topic with no attached subscriber are not retained and cannot be delivered to subscriptions attached later. Attach a subscription (pull, push, BigQuery or Cloud Storage; or choose a default subscription when creating the topic) or enable topic message retention (storage costs for topic-retained messages are billed to the project that holds the topic). |
| Batching | Enabled by default in client libraries. Batches by message request size, number of messages and time; a batch is published when any one threshold is met. Improves efficiency and throughput and reduces publishing cost, but adds per-message latency. Names and defaults differ per library. |
| Flow control | Set maximum outstanding messages and maximum outstanding message bytes to handle transient spikes; without it requests pile up and fail with `Deadline exceeded`. |
| Bandwidth and CPU | Throughput is bound by network bandwidth, request count, CPU and memory. With high latency avoid many small requests. More cores allow a higher thread count. |
| Retry | Change publisher retry settings only if the defaults are insufficient (see the table below). |
| Message storage policy | Restrict persistence to chosen regions; requests published to a region outside the list are forwarded to the nearest allowed region. Configurable on a topic or as an organization policy (project, folder or organization); topic policy can change only in ways that do not violate the organization policy. |
| Ordering keys | Use a locational endpoint so all keyed messages publish to the same region; configure a resume publishing function. |

### Java client publisher retry defaults (as stated in the source)

| Variable | Default |
|---|---|
| `initialRetryDelay` | 100 milliseconds |
| `retryDelayMultiplier` | 4 (up to `100 ms * 4 = 400 ms` for the second retry, `400 ms * 4 = 1600 ms` for the third) |
| `maxRetryDelay` | 60 seconds |
| `initialRpcTimeout` | 5 seconds |
| `rpcTimeoutMultiplier` | 4.0 (up to `5 s * 4 = 20 s` for the second retry, `10 s * 4 = 40 s` for the third) |
| `maxRpcTimeout` | 600 seconds |
| `totalTimeout` | 600 seconds |

### Topic monitoring dashboard

| Scope | Sections |
|---|---|
| All topics (Topics page, Metrics tab) | Overview, Quota |
| Single topic (topic details, Metrics tab) | Overview, Subscriptions, Retention (Retention only if message retention is enabled on the topic) |

| Chart | Use |
|---|---|
| Publish requests (Overview) | spot sudden spikes in publish requests |
| Average number of messages per batch (Overview) | check batch size; a smaller batch gives lower publish latency |
| Administrator operations (Quota, all topics) | each administrator operation charges one unit against the quota |

### Metrics for imported topics

| Metric | Meaning |
|---|---|
| `pubsub/topic/ingestion_byte_count` | bytes ingested from an import source into an import topic, per import source and partition (shard) |
| `pubsub/topic/ingestion_message_count` | number of imported messages per import source and partition |
| `pubsub/topic/ingestion_data_source_state` | state of the external source; error codes and workarounds are in the import topic troubleshooting pages (Amazon Kinesis Data Streams, Cloud Storage, Amazon MSK, Azure Event Hubs, Confluent Cloud) |
| `pubsub/topic/ingestion_failure_count` | ingestion failures; Cloud Storage import topics include bucket name and failure reason; Amazon MSK, Azure Event Hubs and Confluent Cloud include Kafka topic or event hub name, partition and failure reason |

## Notes

- Ordering: ordering is preserved on the publish side and within a region. Messages published to several regions are ordered only within a region; if all messages go to one region, subscribers spread across regions still receive them in order. Use a locational endpoint.
- Resume publishing: with an ordering key the client library retries a request repeatedly, independent of the retry settings. On a non-retryable error it does not publish the message and stops publishing other messages with the same ordering key; call `resumePublish` when ready to continue on that key.
- A dashboard can be saved as a custom dashboard ("Save as custom dashboard" or "Add to custom dashboard" per chart), a chart opened in Metrics Explorer and edited with PromQL, and an alerting policy created from a chart (or "Convert to alert chart" after saving to a custom dashboard when "Create alerting policy" is missing). Console click-paths are not reproduced. Alerting itself is in `gcp-observability`.
- Monitoring prerequisites: Cloud Billing account, a project with billing enabled and at least one topic.
- Corrected from the official docs: the Python sample ended with `futures.wait(publish_futures, return_when=futures.ALL_COMPLETED)` followed by the success message, so a publish error raised only inside the `callback` and the script still reported success; each future's `result()` is now called after the wait.
- Source inconsistency: for `rpcTimeoutMultiplier` the source gives the third-retry timeout as `10 seconds * 4 = 40 seconds`, although its second-retry timeout is 20 seconds; the values are copied as written.
- Source: https://docs.cloud.google.com/pubsub/docs/publish-best-practices (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/pubsub/docs/monitor-topic (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/pubsub/docs/batch-messaging (Python batch settings).

## Related

- [batch-messaging.md](./batch-messaging.md)
- [flow-control-messages.md](./flow-control-messages.md)
- [ordering.md](./ordering.md)
- [compress-messages.md](./compress-messages.md)
