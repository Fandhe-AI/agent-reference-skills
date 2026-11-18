---
source: https://docs.cloud.google.com/pubsub/docs/subscription-message-filter
---

# Subscription message filters

A subscription filter delivers only messages whose attributes match the expression; Pub/Sub automatically acknowledges the non-matching messages. Filters operate on attributes only, never on message data. Pull and push subscriptions (including StreamingPull) can have filters.

## Signature / Usage

### Create a pull subscription with a filter

```bash
gcloud pubsub subscriptions create SUBSCRIPTION_ID \
  --topic=TOPIC_ID \
  --message-filter='FILTER'
```

### Create a push subscription with a filter

```bash
gcloud pubsub subscriptions create SUBSCRIPTION_ID \
  --topic=TOPIC_ID \
  --push-endpoint=PUSH_ENDPOINT \
  --message-filter='FILTER'
```

### REST

```text
PUT https://pubsub.googleapis.com/v1/projects/PROJECT_ID/subscriptions/SUBSCRIPTION_ID
Authorization: Bearer $(gcloud auth print-access-token)
```

```json
{
  "topic": "projects/PROJECT_ID/topics/TOPIC_ID",
  "filter": "FILTER"
}
```

```json
{
  "topic": "projects/PROJECT_ID/topics/TOPIC_ID",
  "pushConfig": {
    "pushEndpoint": "PUSH_ENDPOINT"
  },
  "filter": "FILTER"
}
```

### Node.js (TypeScript)

```typescript
/**
 * TODO(developer): Uncomment these variables before running the sample.
 */
// const topicNameOrId = 'YOUR_TOPIC_NAME_OR_ID';
// const subscriptionNameOrId = 'YOUR_SUBSCRIPTION_NAME_OR_ID';
// const filterString = 'YOUR_FILTER_STRING';   // e.g. 'attributes.author="unknown"'

// Imports the Google Cloud client library
import {PubSub} from '@google-cloud/pubsub';

// Creates a client; cache this for further use
const pubSubClient = new PubSub();

async function createSubscriptionWithFilter(
  topicNameOrId: string,
  subscriptionNameOrId: string,
  filterString: string,
) {
  // Creates a new subscription
  await pubSubClient
    .topic(topicNameOrId)
    .createSubscription(subscriptionNameOrId, {
      filter: filterString,
    });
  console.log(
    `Created subscription ${subscriptionNameOrId} with filter ${filterString}.`,
  );
}
```

### Python

```python
from google.cloud import pubsub_v1

# TODO(developer): Choose an existing topic.
# project_id = "your-project-id"
# topic_id = "your-topic-id"
# subscription_id = "your-subscription-id"
# filter = "attributes.author=\"unknown\""

publisher = pubsub_v1.PublisherClient()
subscriber = pubsub_v1.SubscriberClient()
topic_path = publisher.topic_path(project_id, topic_id)
subscription_path = subscriber.subscription_path(project_id, subscription_id)

with subscriber:
    subscription = subscriber.create_subscription(
        request={"name": subscription_path, "topic": topic_path, "filter": filter}
    )
    print(f"Created subscription with filtering enabled: {subscription}")
```

### Filter syntax

Key presence and key/value equality (the value must be a string literal; an equality expression must start with a key):

```text
attributes:KEY
```

```text
attributes.KEY = "VALUE"
```

Keys with characters other than hyphens, underscores or alphanumerics need a string literal:

```text
attributes."iana.org/language_tag" = "en"
```

Boolean operators (uppercase `AND`, `NOT`, `OR`; `NOT` has highest precedence; use parentheses and complete expressions to combine `AND` and `OR`):

```text
attributes:"iana.org/language_tag" AND (attributes.name = "net" OR attributes.name = "org")
```

Unary minus instead of `NOT`:

```text
attributes.name = "com" AND -attributes:"iana.org/language_tag"
```

Prefix match (the only supported function):

```text
hasPrefix(attributes.KEY, "SUBSTRING")
```

### Change a filter (workaround)

1. Take a snapshot of the subscription whose filter you want to change.
2. Create a new subscription with the new filter.
3. In the console, open the new subscription, click **Replay messages**, set **Seek** to **To a snapshot**, select the snapshot from step 1 and click **Seek**. No messages are lost during the transition.
4. Switch subscribers to the new subscription; then you can delete the original subscription.

## Options / Props

### Filter expressions on the `name` attribute

| Filter | Description |
|---|---|
| `attributes:name` | Messages with the `name` attribute |
| `NOT attributes:name` | Messages without the `name` attribute |
| `attributes.name = "com"` | Messages with the `name` attribute and the value of `com` |
| `attributes.name != "com"` | Messages that don't have the `name` attribute with the value `com` |
| `hasPrefix(attributes.name, "co")` | Messages with the `name` attribute and a value that starts with `co` |
| `NOT hasPrefix(attributes.name, "co")` | Messages that don't have the `name` attribute with a value that starts with `co` |

### Operators and rules

| Item | Rule |
|---|---|
| Comparison operators | `:`, `=`, `!=` |
| Boolean operators | `AND`, `NOT`, `OR` (uppercase); unary minus allowed instead of `NOT` |
| Functions | `hasPrefix` only; general regular expressions are not supported |
| Case | Keys and values are case-sensitive and must match exactly |
| Maximum length | 256 bytes; for a larger filter use a Single Message Transform (SMT) |
| Mutability | Immutable after the subscription is created |
| Filterable data | Attributes only, not message data |
| Valid | `attributes.name = "com"` (key compared to value) |
| Invalid | `"com" = attributes.name`; `attributes.name = attributes.website`; `attributes.name = "com" AND ("net" OR "org")`; `AND` and `OR` mixed without parentheses |

### Backlog metrics (only count messages that match the filter)

| Metric |
|---|
| `subscription/backlog_bytes` |
| `subscription/unacked_bytes_by_region` |
| `subscription/num_undelivered_messages` |
| `subscription/num_unacked_messages_by_region` |
| `subscription/oldest_unacked_message_age` |
| `subscription/oldest_unacked_message_age_by_region` |
| `topic/unacked_bytes_by_region` |
| `topic/num_unacked_messages_by_region` |
| `topic/oldest_unacked_messages_age_by_region` |

## Notes

- Clarified from the official docs: the source describes `attributes.name != "com"` as "Messages without the `name` attribute and the value of `com`" and `NOT hasPrefix(attributes.name, "co")` as "Messages without the `name` attribute and a value that starts with `co`"; read as the negation of the `=` and `hasPrefix` rows, they select messages that do not satisfy those conditions. Messages that do not match the filter are acknowledged automatically and are not delivered.
- Messages auto-acknowledged by the filter do not incur outbound message fees, but do incur message delivery fees and seek-related storage fees (see the Pub/Sub pricing page).
- Each subscription on a topic can have a different filter.
- Snapshots of a subscription with a filter contain all newer messages (including non-matching ones); a seek then redelivers only messages matching the seeking subscription's filter.
- The source's gcloud push example uses `--push-endpoint` and `--message-filter`, both present in gcloud 593.0.0 `pubsub subscriptions create`.
- The push example sets no push authentication. With `--push-auth-service-account`, the service account is used as the identity for the generated OpenID Connect token for authenticated push (gcloud 593.0.0 help); Pub/Sub then sends a signed JWT in the authorization header of the push request, and subscribers can validate it (https://docs.cloud.google.com/pubsub/docs/authenticate-push-subscriptions).
- The last step of the filter-change workaround deletes the original subscription; try the procedure on a disposable project first.
- The source also shows Console, C++, C#, Go, Java, Ruby and PHP forms, and a CommonJS Node.js variant; they are omitted.
- Source: https://docs.cloud.google.com/pubsub/docs/subscription-message-filter (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [exactly-once-delivery.md](./exactly-once-delivery.md)
- [replay-overview.md](./replay-overview.md)
- [replay-message.md](./replay-message.md)
