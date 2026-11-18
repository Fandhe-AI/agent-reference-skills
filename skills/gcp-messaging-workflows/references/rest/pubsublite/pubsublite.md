---
source: https://pubsublite.googleapis.com/$discovery/rest?version=v1
---

# Pub/Sub Lite API REST API (pubsublite)

## Signature / Usage

Base URL: `https://pubsublite.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `pubsublite.admin.projects.locations.operations.cancel`

- Versions: v1
- `POST https://pubsublite.googleapis.com/v1/admin/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `pubsublite.admin.projects.locations.operations.delete`

- Versions: v1
- `DELETE https://pubsublite.googleapis.com/v1/admin/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `pubsublite.admin.projects.locations.operations.get`

- Versions: v1
- `GET https://pubsublite.googleapis.com/v1/admin/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `pubsublite.admin.projects.locations.operations.list`

- Versions: v1
- `GET https://pubsublite.googleapis.com/v1/admin/{+name}/operations`
- Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListOperationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation's parent resource. |
| `filter` | query | string | no | The standard list filter. |
| `pageSize` | query | integer (int32) | no | The standard list page size. |
| `pageToken` | query | string | no | The standard list page token. |
| `returnPartialSuccess` | query | boolean | no | When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. |

### `pubsublite.admin.projects.locations.reservations.create`

- Versions: v1
- `POST https://pubsublite.googleapis.com/v1/admin/{+parent}/reservations`
- Creates a new reservation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Reservation`; Response: `Reservation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent location in which to create the reservation. Structured like `projects/{project_number}/locations/{location}`. |
| `reservationId` | query | string | yes | Required. The ID to use for the reservation, which will become the final component of the reservation's name. This value is structured like: `my-reservation-name`. |

### `pubsublite.admin.projects.locations.reservations.delete`

- Versions: v1
- `DELETE https://pubsublite.googleapis.com/v1/admin/{+name}`
- Deletes the specified reservation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the reservation to delete. Structured like: projects/{project_number}/locations/{location}/reservations/{reservation_id} |

### `pubsublite.admin.projects.locations.reservations.get`

- Versions: v1
- `GET https://pubsublite.googleapis.com/v1/admin/{+name}`
- Returns the reservation configuration.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Reservation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the reservation whose configuration to return. Structured like: projects/{project_number}/locations/{location}/reservations/{reservation_id} |

### `pubsublite.admin.projects.locations.reservations.list`

- Versions: v1
- `GET https://pubsublite.googleapis.com/v1/admin/{+parent}/reservations`
- Returns the list of reservations for the given project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListReservationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent whose reservations are to be listed. Structured like `projects/{project_number}/locations/{location}`. |
| `pageSize` | query | integer (int32) | no | The maximum number of reservations to return. The service may return fewer than this value. If unset or zero, all reservations for the parent will be returned. |
| `pageToken` | query | string | no | A page token, received from a previous `ListReservations` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListReservations` must match the call that provided the page token. |

### `pubsublite.admin.projects.locations.reservations.patch`

- Versions: v1
- `PATCH https://pubsublite.googleapis.com/v1/admin/{+name}`
- Updates properties of the specified reservation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Reservation`; Response: `Reservation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the reservation. Structured like: projects/{project_number}/locations/{location}/reservations/{reservation_id} |
| `updateMask` | query | string (google-fieldmask) | yes | Required. A mask specifying the reservation fields to change. |

### `pubsublite.admin.projects.locations.reservations.topics.list`

- Versions: v1
- `GET https://pubsublite.googleapis.com/v1/admin/{+name}/topics`
- Lists the topics attached to the specified reservation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListReservationTopicsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the reservation whose topics to list. Structured like: projects/{project_number}/locations/{location}/reservations/{reservation_id} |
| `pageSize` | query | integer (int32) | no | The maximum number of topics to return. The service may return fewer than this value. If unset or zero, all topics for the given reservation will be returned. |
| `pageToken` | query | string | no | A page token, received from a previous `ListReservationTopics` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListReservationTopics` must match the call that provided the page token. |

### `pubsublite.admin.projects.locations.subscriptions.create`

- Versions: v1
- `POST https://pubsublite.googleapis.com/v1/admin/{+parent}/subscriptions`
- Creates a new subscription.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Subscription`; Response: `Subscription`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent location in which to create the subscription. Structured like `projects/{project_number}/locations/{location}`. |
| `skipBacklog` | query | boolean | no | If true, the newly created subscription will only receive messages published after the subscription was created. Otherwise, the entire message backlog will be received on the subscription. Defaults to false. |
| `subscriptionId` | query | string | yes | Required. The ID to use for the subscription, which will become the final component of the subscription's name. This value is structured like: `my-sub-name`. |

### `pubsublite.admin.projects.locations.subscriptions.delete`

- Versions: v1
- `DELETE https://pubsublite.googleapis.com/v1/admin/{+name}`
- Deletes the specified subscription.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the subscription to delete. |

### `pubsublite.admin.projects.locations.subscriptions.get`

- Versions: v1
- `GET https://pubsublite.googleapis.com/v1/admin/{+name}`
- Returns the subscription configuration.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Subscription`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the subscription whose configuration to return. |

### `pubsublite.admin.projects.locations.subscriptions.list`

- Versions: v1
- `GET https://pubsublite.googleapis.com/v1/admin/{+parent}/subscriptions`
- Returns the list of subscriptions for the given project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListSubscriptionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent whose subscriptions are to be listed. Structured like `projects/{project_number}/locations/{location}`. |
| `pageSize` | query | integer (int32) | no | The maximum number of subscriptions to return. The service may return fewer than this value. If unset or zero, all subscriptions for the parent will be returned. |
| `pageToken` | query | string | no | A page token, received from a previous `ListSubscriptions` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListSubscriptions` must match the call that provided the page token. |

### `pubsublite.admin.projects.locations.subscriptions.patch`

- Versions: v1
- `PATCH https://pubsublite.googleapis.com/v1/admin/{+name}`
- Updates properties of the specified subscription.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Subscription`; Response: `Subscription`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the subscription. Structured like: projects/{project_number}/locations/{location}/subscriptions/{subscription_id} |
| `updateMask` | query | string (google-fieldmask) | yes | Required. A mask specifying the subscription fields to change. |

### `pubsublite.admin.projects.locations.subscriptions.seek`

- Versions: v1
- `POST https://pubsublite.googleapis.com/v1/admin/{+name}:seek`
- Performs an out-of-band seek for a subscription to a specified target, which may be timestamps or named positions within the message backlog. Seek translates these targets to cursors for each partition and orchestrates subscribers to start consuming messages from these seek cursors. If an operation is returned, the seek has been registered and subscribers will eventually receive messages from the seek cursors (i.e. eventual consistency), as long as they are using a minimum supported client library version and not a system that tracks cursors independently of Pub/Sub Lite (e.g. Apache Beam, Dataflow, Spark). The seek operation will fail for unsupported clients. If clients would like to know when subscribers react to the seek (or not), they can poll the operation. The seek operation will succeed and complete once subscribers are ready to receive messages from the seek cursors for all partitions of the topic. This means that the seek operation will not complete until all subscribers come online. If the previous seek operation has not yet completed, it will be aborted and the new invocation of seek will supersede it.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SeekSubscriptionRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the subscription to seek. |

### `pubsublite.admin.projects.locations.topics.create`

- Versions: v1
- `POST https://pubsublite.googleapis.com/v1/admin/{+parent}/topics`
- Creates a new topic.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Topic`; Response: `Topic`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent location in which to create the topic. Structured like `projects/{project_number}/locations/{location}`. |
| `topicId` | query | string | yes | Required. The ID to use for the topic, which will become the final component of the topic's name. This value is structured like: `my-topic-name`. |

### `pubsublite.admin.projects.locations.topics.delete`

- Versions: v1
- `DELETE https://pubsublite.googleapis.com/v1/admin/{+name}`
- Deletes the specified topic.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the topic to delete. |

### `pubsublite.admin.projects.locations.topics.get`

- Versions: v1
- `GET https://pubsublite.googleapis.com/v1/admin/{+name}`
- Returns the topic configuration.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Topic`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the topic whose configuration to return. |

### `pubsublite.admin.projects.locations.topics.getPartitions`

- Versions: v1
- `GET https://pubsublite.googleapis.com/v1/admin/{+name}/partitions`
- Returns the partition information for the requested topic.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `TopicPartitions`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The topic whose partition information to return. |

### `pubsublite.admin.projects.locations.topics.list`

- Versions: v1
- `GET https://pubsublite.googleapis.com/v1/admin/{+parent}/topics`
- Returns the list of topics for the given project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListTopicsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent whose topics are to be listed. Structured like `projects/{project_number}/locations/{location}`. |
| `pageSize` | query | integer (int32) | no | The maximum number of topics to return. The service may return fewer than this value. If unset or zero, all topics for the parent will be returned. |
| `pageToken` | query | string | no | A page token, received from a previous `ListTopics` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListTopics` must match the call that provided the page token. |

### `pubsublite.admin.projects.locations.topics.patch`

- Versions: v1
- `PATCH https://pubsublite.googleapis.com/v1/admin/{+name}`
- Updates properties of the specified topic.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Topic`; Response: `Topic`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the topic. Structured like: projects/{project_number}/locations/{location}/topics/{topic_id} |
| `updateMask` | query | string (google-fieldmask) | yes | Required. A mask specifying the topic fields to change. |

### `pubsublite.admin.projects.locations.topics.subscriptions.list`

- Versions: v1
- `GET https://pubsublite.googleapis.com/v1/admin/{+name}/subscriptions`
- Lists the subscriptions attached to the specified topic.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListTopicSubscriptionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the topic whose subscriptions to list. |
| `pageSize` | query | integer (int32) | no | The maximum number of subscriptions to return. The service may return fewer than this value. If unset or zero, all subscriptions for the given topic will be returned. |
| `pageToken` | query | string | no | A page token, received from a previous `ListTopicSubscriptions` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListTopicSubscriptions` must match the call that provided the page token. |

### `pubsublite.cursor.projects.locations.subscriptions.commitCursor`

- Versions: v1
- `POST https://pubsublite.googleapis.com/v1/cursor/{+subscription}:commitCursor`
- Updates the committed cursor.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CommitCursorRequest`; Response: `CommitCursorResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `subscription` | path | string | yes | The subscription for which to update the cursor. |

### `pubsublite.cursor.projects.locations.subscriptions.cursors.list`

- Versions: v1
- `GET https://pubsublite.googleapis.com/v1/cursor/{+parent}/cursors`
- Returns all committed cursor information for a subscription.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListPartitionCursorsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The subscription for which to retrieve cursors. Structured like `projects/{project_number}/locations/{location}/subscriptions/{subscription_id}`. |
| `pageSize` | query | integer (int32) | no | The maximum number of cursors to return. The service may return fewer than this value. If unset or zero, all cursors for the parent will be returned. |
| `pageToken` | query | string | no | A page token, received from a previous `ListPartitionCursors` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListPartitionCursors` must match the call that provided the page token. |

### `pubsublite.topicStats.projects.locations.topics.computeHeadCursor`

- Versions: v1
- `POST https://pubsublite.googleapis.com/v1/topicStats/{+topic}:computeHeadCursor`
- Compute the head cursor for the partition. The head cursor's offset is guaranteed to be less than or equal to all messages which have not yet been acknowledged as published, and greater than the offset of any message whose publish has already been acknowledged. It is zero if there have never been messages in the partition.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ComputeHeadCursorRequest`; Response: `ComputeHeadCursorResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `topic` | path | string | yes | Required. The topic for which we should compute the head cursor. |

### `pubsublite.topicStats.projects.locations.topics.computeMessageStats`

- Versions: v1
- `POST https://pubsublite.googleapis.com/v1/topicStats/{+topic}:computeMessageStats`
- Compute statistics about a range of messages in a given topic and partition.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ComputeMessageStatsRequest`; Response: `ComputeMessageStatsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `topic` | path | string | yes | Required. The topic for which we should compute message stats. |

### `pubsublite.topicStats.projects.locations.topics.computeTimeCursor`

- Versions: v1
- `POST https://pubsublite.googleapis.com/v1/topicStats/{+topic}:computeTimeCursor`
- Compute the corresponding cursor for a publish or event time in a topic partition.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ComputeTimeCursorRequest`; Response: `ComputeTimeCursorResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `topic` | path | string | yes | Required. The topic for which we should compute the cursor. |

### Example request skeleton

Generated from the Discovery entry of `pubsublite.admin.projects.locations.operations.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://pubsublite.googleapis.com/v1/admin/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1 of `pubsublite` (retrieved 2026-11-14). Resources on this page: admin, cursor, topicStats.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are defined in the `schemas` section of the Discovery documents in Source.
- Deprecated: the Pub/Sub Lite documentation says "Pub/Sub Lite is deprecated. Effective January 31, 2027, Pub/Sub Lite will be turned down.", "Pub/Sub Lite is no longer available for new customers after September 24, 2024." and that projects that did not use Pub/Sub Lite between April 15, 2025 and July 15, 2025 cannot access it starting on July 15, 2025; it recommends migrating to Google Cloud Managed Service for Apache Kafka (https://docs.cloud.google.com/pubsub/lite/docs/migrate-pubsub-lite-to-managed-service-for-apache-kafka) or Pub/Sub (https://docs.cloud.google.com/pubsub/lite/docs/migrate-pubsub-lite-to-pubsub) (https://docs.cloud.google.com/pubsub/lite/docs, retrieved 2026-11-18). The methods are still in the v1 Discovery document.
- Source: https://pubsublite.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
