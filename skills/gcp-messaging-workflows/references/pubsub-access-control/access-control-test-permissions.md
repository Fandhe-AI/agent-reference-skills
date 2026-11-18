---
source: https://docs.cloud.google.com/pubsub/docs/access-control#test-permissions
---

# Test IAM permissions on a topic or subscription

`testIamPermissions()` takes a resource name and a set of permissions and returns the subset of those permissions that the caller has. It is meant for permission-aware UIs and command-line tools, not for authorization.

## Signature / Usage

### Subscription: gcloud

Lists the permissions that can be tested on the resource.

Adapted (not in the official docs): Shell variable expansions are double-quoted to prevent word splitting and globbing.

```bash
gcloud iam list-testable-permissions \
   "https://pubsub.googleapis.com/v1/projects/${PROJECT}/subscriptions/${SUBSCRIPTION}" \
   --format json
```

Output:

```json
[
  {
    "name": "pubsub.subscriptions.consume",
    "stage": "GA"
  },
  {
    "name": "pubsub.subscriptions.delete",
    "stage": "GA"
  },
  {
    "name": "pubsub.subscriptions.get",
    "stage": "GA"
  },
  {
    "name": "pubsub.subscriptions.getIamPolicy",
    "stage": "GA"
  },
  {
    "name": "pubsub.subscriptions.setIamPolicy",
    "stage": "GA"
  },
  {
    "name": "pubsub.subscriptions.update",
    "stage": "GA"
  }
]
```

### Subscription: Node.js

```javascript
/**
 * TODO(developer): Uncomment this variable before running the sample.
 */
// const subscriptionNameOrId = 'YOUR_SUBSCRIPTION_NAME_OR_ID';

// Imports the Google Cloud client library
const {PubSub} = require('@google-cloud/pubsub');

// Creates a client; cache this for further use
const pubSubClient = new PubSub();

async function testSubscriptionPermissions(subscriptionNameOrId) {
  const permissionsToTest = [
    'pubsub.subscriptions.consume',
    'pubsub.subscriptions.update',
  ];

  // Tests the IAM policy for the specified subscription
  const [permissions] = await pubSubClient
    .subscription(subscriptionNameOrId)
    .iam.testPermissions(permissionsToTest);

  console.log('Tested permissions for subscription: %j', permissions);
}
```

### Subscription: Python

```python
from google.cloud import pubsub_v1

# TODO(developer): Choose an existing subscription.
# project_id = "your-project-id"
# subscription_id = "your-subscription-id"

client = pubsub_v1.SubscriberClient()
subscription_path = client.subscription_path(project_id, subscription_id)

permissions_to_check = [
    "pubsub.subscriptions.consume",
    "pubsub.subscriptions.update",
]

allowed_permissions = client.test_iam_permissions(
    request={"resource": subscription_path, "permissions": permissions_to_check}
)

print(
    "Allowed permissions for subscription {}: {}".format(
        subscription_path, allowed_permissions
    )
)

client.close()
```

### Topic: gcloud

Adapted (not in the official docs): Shell variable expansions are double-quoted to prevent word splitting and globbing.

```bash
gcloud iam list-testable-permissions \
   "https://pubsub.googleapis.com/v1/projects/${PROJECT}/topics/${TOPIC}" \
   --format json
```

Output:

```json
[
  {
    "name": "pubsub.topics.attachSubscription",
    "stage": "GA"
  },
  {
    "name": "pubsub.topics.delete",
    "stage": "GA"
  },
  {
    "name": "pubsub.topics.detachSubscription",
    "stage": "GA"
  },
  {
    "name": "pubsub.topics.get",
    "stage": "GA"
  },
  {
    "name": "pubsub.topics.getIamPolicy",
    "stage": "GA"
  },
  {
    "name": "pubsub.topics.publish",
    "stage": "GA"
  },
  {
    "name": "pubsub.topics.setIamPolicy",
    "stage": "GA"
  },
  {
    "name": "pubsub.topics.update",
    "stage": "GA"
  }
]
```

### Topic: Node.js

```javascript
/**
 * TODO(developer): Uncomment this variable before running the sample.
 */
// const topicNameOrId = 'YOUR_TOPIC_NAME_OR_ID';

// Imports the Google Cloud client library
const {PubSub} = require('@google-cloud/pubsub');

// Creates a client; cache this for further use
const pubSubClient = new PubSub();

async function testTopicPermissions(topicNameOrId) {
  const permissionsToTest = [
    'pubsub.topics.attachSubscription',
    'pubsub.topics.publish',
    'pubsub.topics.update',
  ];

  // Tests the IAM policy for the specified topic
  const [permissions] = await pubSubClient
    .topic(topicNameOrId)
    .iam.testPermissions(permissionsToTest);

  console.log('Tested permissions for topic: %j', permissions);
}
```

### Topic: Python

```python
from google.cloud import pubsub_v1

# TODO(developer): Choose an existing topic.
# project_id = "your-project-id"
# topic_id = "your-topic-id"

client = pubsub_v1.PublisherClient()
topic_path = client.topic_path(project_id, topic_id)

permissions_to_check = ["pubsub.topics.publish", "pubsub.topics.update"]

allowed_permissions = client.test_iam_permissions(
    request={"resource": topic_path, "permissions": permissions_to_check}
)

print(
    "Allowed permissions for topic {}: {}".format(topic_path, allowed_permissions)
)
```

## Options / Props

| Method | Required permission |
|---|---|
| `projects.topics.testIamPermissions` | None |
| `projects.subscriptions.testIamPermissions` | None |
| `projects.snapshots.testIamPermissions` | None |

## Notes

- Adapted from the official docs: unquoted shell variable expansions in the commands are double-quoted (`"${VAR}"`).
- `testIamPermissions` is designed to test permission-aware UIs and command-line tools, not authorization. This operation might fail open without warning, so never use its result to authorize a request.
- The sample outputs are shown with normalized indentation.
- The source also shows C#, Go, Java, PHP and Ruby samples; they are omitted.
- Source: https://docs.cloud.google.com/pubsub/docs/access-control#test-permissions (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [access-control-get-policy.md](./access-control-get-policy.md)
- [access-control-set-policy.md](./access-control-set-policy.md)
- [access-control.md](./access-control.md)
