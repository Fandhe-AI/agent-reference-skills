---
source: https://developers.cloudflare.com/r2/buckets/event-notifications/
---

# Event notifications

Send messages to a Cloudflare Queue when data in an R2 bucket changes. Consume with a consumer Worker or pull over HTTP.

## Signature / Usage

```sh
npx wrangler r2 bucket notification create <BUCKET_NAME> --event-type <EVENT_TYPE> --queue <QUEUE_NAME>
```

Adapted (not in the official docs): the `$ ` shell-prompt prefixes were removed; see Notes.

```sh
# Filter using prefix
npx wrangler r2 bucket notification create <BUCKET_NAME> --event-type <EVENT_TYPE> --queue <QUEUE_NAME> --prefix "<PREFIX_VALUE>"

# Filter using suffix
npx wrangler r2 bucket notification create <BUCKET_NAME> --event-type <EVENT_TYPE> --queue <QUEUE_NAME> --suffix "<SUFFIX_VALUE>"

# Filter using prefix and suffix. Both the conditions will be used for filtering
npx wrangler r2 bucket notification create <BUCKET_NAME> --event-type <EVENT_TYPE> --queue <QUEUE_NAME> --prefix "<PREFIX_VALUE>" --suffix "<SUFFIX_VALUE>"
```

Message body:

```json
{
	"account": "3f4b7e3dcab231cbfdaa90a6a28bd548",
	"action": "CopyObject",
	"bucket": "my-bucket",
	"object": {
		"key": "my-new-object",
		"size": 65536,
		"eTag": "c846ff7a18f28c2e262116d6e8719ef0"
	},
	"eventTime": "2024-05-24T19:36:44.379Z",
	"copySource": {
		"bucket": "my-bucket",
		"object": "my-original-object"
	}
}
```

## Options / Props

Event types:

| Event type | Description | Trigger actions |
| --- | --- | --- |
| `object-create` | Triggered when new objects are created or existing objects are overwritten. | `PutObject`, `CopyObject`, `CompleteMultipartUpload` |
| `object-delete` | Triggered when an object is explicitly removed from the bucket. | `DeleteObject`, `LifecycleDeletion` |

Message properties:

| Property | Type | Description |
| --- | --- | --- |
| `account` | String | The Cloudflare account ID that the event is associated with. |
| `action` | String | The type of action that triggered the event notification. Example actions include: `PutObject`, `CopyObject`, `CompleteMultipartUpload`, `DeleteObject`. |
| `bucket` | String | The name of the bucket where the event occurred. |
| `object` | Object | A nested object containing details about the object involved in the event. |
| `object.key` | String | The key (or name) of the object within the bucket. |
| `object.size` | Number | The size of the object in bytes. Note: not present for object-delete events. |
| `object.eTag` | String | The entity tag (eTag) of the object. Note: not present for object-delete events. |
| `eventTime` | String | The time when the action that triggered the event occurred. |
| `copySource` | Object | A nested object containing details about the source of a copied object. Note: only present for events triggered by `CopyObject`. |
| `copySource.bucket` | String | The bucket that contained the source object. |
| `copySource.object` | String | The name of the source object. |

## Notes

- Prerequisites: an existing bucket, an existing queue, and a consumer Worker or HTTP pull enabled on the queue. Dashboard: bucket **Settings** > **Event notifications** > **Add notification**.
- Up to 100 event notification rules per bucket. Rules without prefix/suffix apply to all objects.
- Queues per-queue throughput is 5,000 messages per second; split rules across multiple queues beyond that.
- Overlapping or conflicting rules that could trigger multiple notifications for one event are not allowed (e.g. an `object-create` rule without prefix plus another `object-create` rule with prefix `images/`).
- Adapted from the official docs: the `$ ` shell-prompt prefixes were removed from the filter examples so they can be copy-pasted.
- Cloudflare Queues is covered by the cloudflare-stateful skill (https://developers.cloudflare.com/queues/).

## Related

- [Event subscriptions](./platform-event-subscriptions.md)
- [Object lifecycles](./buckets-object-lifecycles.md)
