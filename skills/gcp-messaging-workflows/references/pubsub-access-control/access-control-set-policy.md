---
source: https://docs.cloud.google.com/pubsub/docs/access-control#set-policy
---

# Set an IAM policy on a topic or subscription

`setIamPolicy()` attaches a policy to a topic or subscription. It takes a `SetIamPolicyRequest` containing the policy to set and the resource, and returns the resulting policy. Because the call replaces the whole policy, always read the current policy first and send it back with its `etag`.

## Signature / Usage

### Subscription: gcloud (read, edit, apply)

1. Save the policy for the subscription.

Adapted (not in the official docs): Shell variable expansions are double-quoted to prevent word splitting and globbing.

```bash
gcloud pubsub subscriptions get-iam-policy \
   "projects/${PROJECT}/subscriptions/${SUBSCRIPTION}" \
   --format json > subscription_policy.json
```

2. Open `subscription_policy.json` and update bindings by giving appropriate roles to appropriate principals. Keep the `etag` from the file.

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
        "serviceAccount:service-account-2@appspot.gserviceaccount.com"
      ]
    }
  ]
}
```

3. Apply the new subscription policy.

Adapted (not in the official docs): Shell variable expansions are double-quoted to prevent word splitting and globbing.

```bash
gcloud pubsub subscriptions set-iam-policy \
  "projects/${PROJECT}/subscriptions/${SUBSCRIPTION}" \
  subscription_policy.json
```

### Topic: gcloud (read, edit, apply)

Adapted (not in the official docs): Shell variable expansions are double-quoted to prevent word splitting and globbing.

```bash
gcloud pubsub topics get-iam-policy \
   "projects/${PROJECT}/topics/${TOPIC}" \
   --format json > topic_policy.json
```

Edit `topic_policy.json`, keeping the `etag`:

```json
{
  "etag": "BwUjMhCsNvY=",
  "bindings": [
    {
      "role": "roles/pubsub.editor",
      "members": [
        "user:user-1@gmail.com",
        "user:user-2@gmail.com"
      ]
    }
  ]
}
```

Apply it.

Adapted (not in the official docs): Shell variable expansions are double-quoted to prevent word splitting and globbing.

```bash
gcloud pubsub topics set-iam-policy \
   "projects/${PROJECT}/topics/${TOPIC}" \
   topic_policy.json
```

### Subscription: Python

Adapted (not in the official docs): the members are placeholders (`VIEWER_MEMBER`, `EDITOR_MEMBER`) instead of `domain:google.com` and `group:cloud-logs@google.com`, and the editor binding uses `roles/pubsub.editor` instead of the basic role `roles/editor`.

```python
from google.cloud import pubsub_v1

# TODO(developer): Choose an existing subscription.
# project_id = "your-project-id"
# subscription_id = "your-subscription-id"

client = pubsub_v1.SubscriberClient()
subscription_path = client.subscription_path(project_id, subscription_id)

policy = client.get_iam_policy(request={"resource": subscription_path})

# Add a principal as a viewer, for example "user:alice@example.com".
policy.bindings.add(role="roles/pubsub.viewer", members=["VIEWER_MEMBER"])

# Add a group as an editor, for example "group:team@example.com".
policy.bindings.add(role="roles/pubsub.editor", members=["EDITOR_MEMBER"])

# Set the policy
policy = client.set_iam_policy(
    request={"resource": subscription_path, "policy": policy}
)

print("IAM policy for subscription {} set: {}".format(subscription_id, policy))

client.close()
```

## Options / Props

| Method | Required permission |
|---|---|
| `projects.topics.setIamPolicy` | `pubsub.topics.setIamPolicy` on the requested topic |
| `projects.subscriptions.setIamPolicy` | `pubsub.subscriptions.setIamPolicy` on the requested subscription |
| `projects.snapshots.setIamPolicy` | `pubsub.snapshots.setIamPolicy` on the requested snapshot |

## Notes

- Adapted from the official docs: running the source's Python sample as written grants `roles/pubsub.viewer` to `domain:google.com` and the basic role `roles/editor` to `group:cloud-logs@google.com` on your subscription. The example replaces both members with placeholders and uses `roles/pubsub.editor`; set the members you intend to grant before running it.
- Adapted from the official docs: unquoted shell variable expansions in the commands are double-quoted (`"${VAR}"`).
- Omitted: the source's Node.js subscription and topic samples build a new policy object with `members: ['allUsers']` bound to `roles/pubsub.viewer` and call `iam.setPolicy(newPolicy)` without reading the current policy or its `etag`, so they replace every existing binding and make the resource readable by anyone on the internet. They are not reproduced; use the gcloud get, edit, set flow above or the Python read-modify-write sample, which keep the `etag`.
- The Python subscription sample reads the policy with `get_iam_policy`, modifies the returned object and sets it back, so the `etag` is preserved. In the source, its comment says "Add all users as viewers" but it binds `domain:google.com`, which grants the role to every user of that domain, not `allUsers`; the example's comments are reworded for the placeholders.
- Source inconsistency: the Python subscription sample binds `roles/editor`, a basic role that the same page describes as highly permissive, while the surrounding text and the source's Node.js samples use `roles/pubsub.editor`; the example uses `roles/pubsub.editor`.
- `set-iam-policy` replaces the whole policy: keep the `etag` from the file you read, so that a concurrent change makes the call fail instead of being silently overwritten.
- The Python topic sample follows the same pattern with `PublisherClient` and `topic_path` and role `roles/pubsub.publisher`; it is omitted. The source also shows C#, Go, Java, PHP and Ruby.
- Granting through the Pub/Sub IAM API works only on individual topics and subscriptions, not at project level. The source also shows Console steps (IAM page for project-level grants; Topics list, Permissions tab, Add principal for resources).
- Source: https://docs.cloud.google.com/pubsub/docs/access-control#set-policy (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [access-control-get-policy.md](./access-control-get-policy.md)
- [access-control-test-permissions.md](./access-control-test-permissions.md)
- [access-control.md](./access-control.md)
