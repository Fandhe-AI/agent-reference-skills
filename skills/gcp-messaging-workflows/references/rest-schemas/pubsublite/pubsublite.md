---
source: https://pubsublite.googleapis.com/$discovery/rest?version=v1
---

# Pub/Sub Lite API message schemas (pubsublite)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/pubsublite/`.

### `CancelOperationRequest`

- The request message for Operations.CancelOperation.
- Version: v1

### `Capacity`

- The throughput capacity configuration for each partition.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `publishMibPerSec` | integer (int32) | Publish throughput capacity per partition in MiB/s. Must be >= 4 and <= 16. |
| `subscribeMibPerSec` | integer (int32) | Subscribe throughput capacity per partition in MiB/s. Must be >= 4 and <= 32. |

### `CommitCursorRequest`

- Request for CommitCursor.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cursor` | Cursor | The new value for the committed cursor. |
| `partition` | string (int64) | The partition for which to update the cursor. Partitions are zero indexed, so `partition` must be in the range \[0, topic.num_partitions). |

### `CommitCursorResponse`

- Response for CommitCursor.
- Version: v1

### `ComputeHeadCursorRequest`

- Compute the current head cursor for a partition.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `partition` | string (int64) | Required. The partition for which we should compute the head cursor. |

### `ComputeHeadCursorResponse`

- Response containing the head cursor for the requested topic and partition.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `headCursor` | Cursor | The head cursor. |

### `ComputeMessageStatsRequest`

- Compute statistics about a range of messages in a given topic and partition.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endCursor` | Cursor | The exclusive end of the range. The range is empty if end_cursor <= start_cursor. Specifying a start_cursor before the first message and an end_cursor after the last message will retrieve all messages. |
| `partition` | string (int64) | Required. The partition for which we should compute message stats. |
| `startCursor` | Cursor | The inclusive start of the range. |

### `ComputeMessageStatsResponse`

- Response containing stats for messages in the requested topic and partition.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `messageBytes` | string (int64) | The number of quota bytes accounted to these messages. |
| `messageCount` | string (int64) | The count of messages. |
| `minimumEventTime` | string (google-datetime) | The minimum event timestamp across these messages. For the purposes of this computation, if a message does not have an event time, we use the publish time. The timestamp will be unset if there are no messages. |
| `minimumPublishTime` | string (google-datetime) | The minimum publish timestamp across these messages. Note that publish timestamps within a partition are not guaranteed to be non-decreasing. The timestamp will be unset if there are no messages. |

### `ComputeTimeCursorRequest`

- Compute the corresponding cursor for a publish or event time in a topic partition.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `partition` | string (int64) | Required. The partition for which we should compute the cursor. |
| `target` | TimeTarget | Required. The target publish or event time. Specifying a future time will return an unset cursor. |

### `ComputeTimeCursorResponse`

- Response containing the cursor corresponding to a publish or event time in a topic partition.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cursor` | Cursor | If present, the cursor references the first message with time greater than or equal to the specified target time. If such a message cannot be found, the cursor will be unset (i.e. `cursor` is not present). |

### `Cursor`

- A cursor that describes the position of a message within a topic partition.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `offset` | string (int64) | The offset of a message within a topic partition. Must be greater than or equal 0. |

### `DeliveryConfig`

- The settings for a subscription's message delivery.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deliveryRequirement` | string enum | The DeliveryRequirement for this subscription. Values: `DELIVERY_REQUIREMENT_UNSPECIFIED`, `DELIVER_IMMEDIATELY`, `DELIVER_AFTER_STORED`. |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `ExportConfig`

- Configuration for a Pub/Sub Lite subscription that writes messages to a destination. User subscriber clients must not connect to this subscription.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `currentState` | string enum | Output only. The current state of the export, which may be different to the desired state due to errors. This field is output only. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `PAUSED`, `PERMISSION_DENIED`, `NOT_FOUND`. |
| `deadLetterTopic` | string | Optional. The name of an optional Pub/Sub Lite topic to publish messages that can not be exported to the destination. For example, the message can not be published to the Pub/Sub service because it does not satisfy the constraints documented at https://cloud.google.com/pubsub/docs/publisher. Structured like: projects/{project_number}/locations/{location}/topics/{topic_id}. Must be within the same project and location as the subscription. The topic may be changed or removed. |
| `desiredState` | string enum | The desired state of this export. Setting this to values other than `ACTIVE` and `PAUSED` will result in an error. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `PAUSED`, `PERMISSION_DENIED`, `NOT_FOUND`. |
| `pubsubConfig` | PubSubConfig | Messages are automatically written from the Pub/Sub Lite topic associated with this subscription to a Pub/Sub topic. |

### `ListOperationsResponse`

- The response message for Operations.ListOperations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The standard List next-page token. |
| `operations` | array<Operation> | A list of operations that matches the specified filter in the request. |
| `unreachable` | array<string> | Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. |

### `ListPartitionCursorsResponse`

- Response for ListPartitionCursors
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `partitionCursors` | array<PartitionCursor> | The partition cursors from this request. |

### `ListReservationTopicsResponse`

- Response for ListReservationTopics.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token that can be sent as `page_token` to retrieve the next page of results. If this field is omitted, there are no more results. |
| `topics` | array<string> | The names of topics attached to the reservation. The order of the topics is unspecified. |

### `ListReservationsResponse`

- Response for ListReservations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token that can be sent as `page_token` to retrieve the next page of results. If this field is omitted, there are no more results. |
| `reservations` | array<Reservation> | The list of reservation in the requested parent. The order of the reservations is unspecified. |

### `ListSubscriptionsResponse`

- Response for ListSubscriptions.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token that can be sent as `page_token` to retrieve the next page of results. If this field is omitted, there are no more results. |
| `subscriptions` | array<Subscription> | The list of subscriptions in the requested parent. The order of the subscriptions is unspecified. |

### `ListTopicSubscriptionsResponse`

- Response for ListTopicSubscriptions.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token that can be sent as `page_token` to retrieve the next page of results. If this field is omitted, there are no more results. |
| `subscriptions` | array<string> | The names of subscriptions attached to the topic. The order of the subscriptions is unspecified. |

### `ListTopicsResponse`

- Response for ListTopics.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token that can be sent as `page_token` to retrieve the next page of results. If this field is omitted, there are no more results. |
| `topics` | array<Topic> | The list of topic in the requested parent. The order of the topics is unspecified. |

### `Operation`

- This resource represents a long-running operation that is the result of a network API call.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `done` | boolean | If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. |
| `error` | Status | The error result of the operation in case of failure or cancellation. |
| `metadata` | object | Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. |
| `name` | string | The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. |
| `response` | object | The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. |

### `OperationMetadata`

- Metadata for long running operations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | The time the operation was created. |
| `endTime` | string (google-datetime) | The time the operation finished running. Not set if the operation has not completed. |
| `target` | string | Resource path for the target of the operation. For example, targets of seeks are subscription resources, structured like: projects/{project_number}/locations/{location}/subscriptions/{subscription_id} |
| `verb` | string | Name of the verb executed by the operation. |

### `PartitionConfig`

- The settings for a topic's partitions.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `capacity` | Capacity | The capacity configuration. |
| `count` | string (int64) | The number of partitions in the topic. Must be at least 1. Once a topic has been created the number of partitions can be increased but not decreased. Message ordering is not guaranteed across a topic resize. For more information see https://cloud.google.com/pubsub/lite/docs/topics#scaling_capacity |
| `scale` | integer (int32) | DEPRECATED: Use capacity instead which can express a superset of configurations. Every partition in the topic is allocated throughput equivalent to `scale` times the standard partition throughput (4 MiB/s). This is also reflected in the cost of this topic; a topic with `scale` of 2 and count of 10 is charged for 20 partitions. This value must be in the range \[1,4\]. |

### `PartitionCursor`

- A pair of a Cursor and the partition it is for.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cursor` | Cursor | The value of the cursor. |
| `partition` | string (int64) | The partition this is for. |

### `PubSubConfig`

- Configuration for exporting to a Pub/Sub topic.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `topic` | string | The name of the Pub/Sub topic. Structured like: projects/{project_number}/topics/{topic_id}. The topic may be changed. |

### `Reservation`

- Metadata about a reservation resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | The name of the reservation. Structured like: projects/{project_number}/locations/{location}/reservations/{reservation_id} |
| `throughputCapacity` | string (int64) | The reserved throughput capacity. Every unit of throughput capacity is equivalent to 1 MiB/s of published messages or 2 MiB/s of subscribed messages. Any topics which are declared as using capacity from a Reservation will consume resources from this reservation instead of being charged individually. |

### `ReservationConfig`

- The settings for this topic's Reservation usage.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `throughputReservation` | string | The Reservation to use for this topic's throughput capacity. Structured like: projects/{project_number}/locations/{location}/reservations/{reservation_id} |

### `RetentionConfig`

- The settings for a topic's message retention.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `perPartitionBytes` | string (int64) | The provisioned storage, in bytes, per partition. If the number of bytes stored in any of the topic's partitions grows beyond this value, older messages will be dropped to make room for newer ones, regardless of the value of `period`. |
| `period` | string (google-duration) | How long a published message is retained. If unset, messages will be retained as long as the bytes retained for each partition is below `per_partition_bytes`. |

### `SeekSubscriptionRequest`

- Request for SeekSubscription.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `namedTarget` | string enum | Seek to a named position with respect to the message backlog. Values: `NAMED_TARGET_UNSPECIFIED`, `TAIL`, `HEAD`. |
| `timeTarget` | TimeTarget | Seek to the first message whose publish or event time is greater than or equal to the specified query time. If no such message can be located, will seek to the end of the message backlog. |

### `SeekSubscriptionResponse`

- Response for SeekSubscription long running operation.
- Version: v1

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `Subscription`

- Metadata about a subscription resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deliveryConfig` | DeliveryConfig | The settings for this subscription's message delivery. |
| `exportConfig` | ExportConfig | If present, messages are automatically written from the Pub/Sub Lite topic associated with this subscription to a destination. |
| `name` | string | The name of the subscription. Structured like: projects/{project_number}/locations/{location}/subscriptions/{subscription_id} |
| `topic` | string | The name of the topic this subscription is attached to. Structured like: projects/{project_number}/locations/{location}/topics/{topic_id} |

### `TimeTarget`

- A target publish or event time. Can be used for seeking to or retrieving the corresponding cursor.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `eventTime` | string (google-datetime) | Request the cursor of the first message with event time greater than or equal to `event_time`. If messages are missing an event time, the publish time is used as a fallback. As event times are user supplied, subsequent messages may have event times less than `event_time` and should be filtered by the client, if necessary. |
| `publishTime` | string (google-datetime) | Request the cursor of the first message with publish time greater than or equal to `publish_time`. All messages thereafter are guaranteed to have publish times >= `publish_time`. |

### `Topic`

- Metadata about a topic resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | The name of the topic. Structured like: projects/{project_number}/locations/{location}/topics/{topic_id} |
| `partitionConfig` | PartitionConfig | The settings for this topic's partitions. |
| `reservationConfig` | ReservationConfig | The settings for this topic's Reservation usage. |
| `retentionConfig` | RetentionConfig | The settings for this topic's message retention. |

### `TopicPartitions`

- Response for GetTopicPartitions.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `partitionCount` | string (int64) | The number of partitions in the topic. |

### Shape of `Capacity`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "publishMibPerSec": "integer (int32)",
  "subscribeMibPerSec": "integer (int32)"
}
```

## Notes

- Generated from the Discovery document(s) v1 of `pubsublite` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Deprecated: the Pub/Sub Lite documentation says "Pub/Sub Lite is deprecated. Effective January 31, 2027, Pub/Sub Lite will be turned down.", "Pub/Sub Lite is no longer available for new customers after September 24, 2024." and that projects that did not use Pub/Sub Lite between April 15, 2025 and July 15, 2025 cannot access it starting on July 15, 2025; it recommends migrating to Google Cloud Managed Service for Apache Kafka (https://docs.cloud.google.com/pubsub/lite/docs/migrate-pubsub-lite-to-managed-service-for-apache-kafka) or Pub/Sub (https://docs.cloud.google.com/pubsub/lite/docs/migrate-pubsub-lite-to-pubsub) (https://docs.cloud.google.com/pubsub/lite/docs, retrieved 2026-11-18). The methods are still in the v1 Discovery document.
- Source: https://pubsublite.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
