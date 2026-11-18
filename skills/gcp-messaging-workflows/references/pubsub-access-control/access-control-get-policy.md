---
source: https://docs.cloud.google.com/pubsub/docs/access-control#get-policy
---

# Get an IAM policy on a topic or subscription

The Pub/Sub IAM API gets and sets policies on individual topics and subscriptions and tests a caller's permissions on a resource. `getIamPolicy()` returns a JSON object containing the policy attached to the resource, including its `etag`. The methods can be called through the client libraries, the API Explorer, or directly over HTTP.

## Signature / Usage

### Subscription: gcloud

Adapted (not in the official docs): Shell variable expansions are double-quoted to prevent word splitting and globbing.

```bash
gcloud pubsub subscriptions get-iam-policy \
   "projects/${PROJECT}/subscriptions/${SUBSCRIPTION}" \
   --format json
```

Output:

```json
{
  "etag": "BwUjMhCsNvY=",
  "bindings": [
    {
      "role": "roles/pubsub.admin",
      "members": [
        "user:user-1@gmail.com"
      ]
    },
    {
      "role": "roles/pubsub.editor",
      "members": [
        "serviceAccount:service-account-2@appspot.gserviceaccount.com",
        "user:user-3@gmail.com"
      ]
    }
  ]
}
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

async function getSubscriptionPolicy(subscriptionNameOrId) {
  // Retrieves the IAM policy for the subscription
  const [policy] = await pubSubClient
    .subscription(subscriptionNameOrId)
    .iam.getPolicy();

  console.log(`Policy for subscription: ${JSON.stringify(policy.bindings)}.`);
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

policy = client.get_iam_policy(request={"resource": subscription_path})

print("Policy for subscription {}:".format(subscription_path))
for binding in policy.bindings:
    print("Role: {}, Members: {}".format(binding.role, binding.members))

client.close()
```

### Topic: gcloud

Adapted (not in the official docs): Shell variable expansions are double-quoted to prevent word splitting and globbing.

```bash
gcloud pubsub topics get-iam-policy \
    "projects/${PROJECT}/topics/${TOPIC}" \
    --format json
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

async function getTopicPolicy(topicNameOrId) {
  // Retrieves the IAM policy for the topic
  const [policy] = await pubSubClient.topic(topicNameOrId).iam.getPolicy();
  console.log('Policy for topic: %j.', policy.bindings);
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

policy = client.get_iam_policy(request={"resource": topic_path})

print("Policy for topic {}:".format(topic_path))
for binding in policy.bindings:
    print("Role: {}, Members: {}".format(binding.role, binding.members))
```

## Options / Props

| Method | Required permission |
|---|---|
| `projects.topics.getIamPolicy` | `pubsub.topics.getIamPolicy` on the requested topic |
| `projects.subscriptions.getIamPolicy` | `pubsub.subscriptions.getIamPolicy` on the requested subscription |

## Notes

- Adapted from the official docs: unquoted shell variable expansions in the commands are double-quoted (`"${VAR}"`).
- You cannot use the Pub/Sub IAM API to manage policies at the Google Cloud project level.
- The sample output is shown with normalized indentation.
- The source also shows Console steps, the TypeScript variant of the Node.js samples, and C#, Go, Java, PHP and Ruby samples; they are omitted.
- Source: https://docs.cloud.google.com/pubsub/docs/access-control#get-policy (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [access-control-set-policy.md](./access-control-set-policy.md)
- [access-control-test-permissions.md](./access-control-test-permissions.md)
- [access-control.md](./access-control.md)
