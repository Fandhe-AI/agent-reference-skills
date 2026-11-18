---
source: https://docs.cloud.google.com/pubsub/docs/access-control#sample_use_case_cross-project_communication
---

# Cross-project access and IAM propagation

Pub/Sub IAM fine-tunes access when a service account in one project works with Pub/Sub resources in another. This page lists the steps for publishing to, subscribing on, and receiving from resources in a different project, and the partial availability behavior of IAM checks.

## Signature / Usage

### Check the policy on the resource in the other project

Use the resource-level policy of the topic (or subscription) in project B to see which principals already hold roles.

Adapted (not in the official docs): Shell variable expansions are double-quoted to prevent word splitting and globbing.

```bash
gcloud pubsub topics get-iam-policy \
    "projects/${PROJECT}/topics/${TOPIC}" \
    --format json
```

### Publish to a topic in a different project

A service account in project A publishes to a topic in project B.

1. Enable the Pub/Sub API in project A.
2. Grant the service account the `pubsub.topics.publish` permission either on project B or on the topic. The Pub/Sub Publisher (`roles/pubsub.publisher`) role includes this permission.

### Create a subscription in a different project

A service account in project A creates a subscription in project A for a topic in project B.

1. Enable the Pub/Sub API in both projects.
2. Grant the service account `pubsub.subscriptions.create` on project A and `pubsub.topics.attachSubscription` on the topic in project B. The Pub/Sub Editor (`roles/pubsub.editor`) role includes these permissions.
3. Create a subscription in project A that is attached to the topic in project B.

### Receive messages from a topic in a different project

A service account in project A receives messages from a subscription in project B.

1. Enable the Pub/Sub API in project A.
2. Grant the service account the Pub/Sub Subscriber (`roles/pubsub.subscriber`) role on either project B or on the subscription.

## Options / Props

| Scenario | Enable Pub/Sub API in | Permission | Grant on | Role that includes it |
|---|---|---|---|---|
| Publish to a topic in another project | Project A | `pubsub.topics.publish` | Project B or the topic | `roles/pubsub.publisher` |
| Create a subscription in A for a topic in B | Projects A and B | `pubsub.subscriptions.create` | Project A | `roles/pubsub.editor` |
| Create a subscription in A for a topic in B | Projects A and B | `pubsub.topics.attachSubscription` | The topic in project B | `roles/pubsub.editor` |
| Receive from a subscription in another project | Project A | Pub/Sub Subscriber role (no single permission named in the source) | Project B or the subscription | `roles/pubsub.subscriber` |

## Notes

- Adapted from the official docs: unquoted shell variable expansions in the commands are double-quoted (`"${VAR}"`).
- Prefer the resource-level grant (the topic or the subscription) over a grant on project B, as the source offers both.
- Creating a subscription S in project A attached to topic T in project B needs permissions on both project A and topic T; user identity information can then be captured in project B's audit logs.
- Partial availability: authorization checks depend on the IAM subsystem. To keep response latency low for data operations (publishing and message consumption), the system may fall back on cached IAM policies, so a changed policy may take time to take effect. See the IAM documentation (https://docs.cloud.google.com/iam) for when changes take effect.
- If you have trouble accessing or authenticating Pub/Sub resources, see General troubleshooting: https://docs.cloud.google.com/pubsub/docs/troubleshooting
- For the full predefined role list see https://docs.cloud.google.com/iam/docs/roles-permissions/pubsub
- Snippet taken from https://docs.cloud.google.com/pubsub/docs/access-control#get-policy (the topic `get-iam-policy` gcloud command).
- Source: https://docs.cloud.google.com/pubsub/docs/access-control#sample_use_case_cross-project_communication (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [access-control.md](./access-control.md)
- [access-control-set-policy.md](./access-control-set-policy.md)
- [access-control-get-policy.md](./access-control-get-policy.md)
