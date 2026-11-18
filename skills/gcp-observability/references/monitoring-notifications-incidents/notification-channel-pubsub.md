---
source: https://docs.cloud.google.com/monitoring/support/notification-options
---

# Pub/Sub notification channels

Publishes alert notifications to a Pub/Sub topic. Pub/Sub uses a different delivery mechanism than the Mobile App, PagerDuty, webhooks and Slack, so it is recommended as the redundant channel. To receive notifications you must also create a pull, push or BigQuery subscription.

## Signature / Usage

### Notification service account

When you add the first Pub/Sub notification channel to a project, Cloud Monitoring creates a service account for the project and grants it the Monitoring Notification Service Agent role (`roles/monitoring.notificationServiceAgent`). Format:

```text
service-PROJECT_NUMBER@gcp-sa-monitoring-notification.iam.gserviceaccount.com
```

Retrieve the project number:

```bash
gcloud projects describe PROJECT_ID --format="value(project_number)"
```

### Create a topic

```bash
gcloud pubsub topics create notificationTopic
```

Create the channel with the Monitoring API, the Google Cloud CLI or the console (**Edit notification channels** > **Pub/Sub** > **Add New**; enter a display name and the topic name; optionally **Send test notification**; then **Add channel**).

### Authorize the service account for a specific topic

```bash
gcloud pubsub topics add-iam-policy-binding \
projects/PROJECT_NUMBER/topics/notificationTopic --role=roles/pubsub.publisher \
--member=serviceAccount:service-PROJECT_NUMBER@gcp-sa-monitoring-notification.iam.gserviceaccount.com
```

Successful output looks similar to:

Adapted (not in the official docs): the list markers are ASCII `-`; the source used the Unicode hyphen U+2010 (`‐`).

```text
 Updated IAM policy for topic [notificationTopic].
 bindings:
 - members:
    - serviceAccount:service-PROJECT_NUMBER@gcp-sa-monitoring-notification.iam.gserviceaccount.com
    role: roles/pubsub.publisher
 etag: BwWcDOIw1Pc=
 version: 1
```

### Authorize for all topics (console)

On the project's IAM page select **Include Google-provided role grants**, find the notification service account (reload if not listed), click **Edit**, **Add another role**, and add **Pub/Sub Publisher**. In the channel dialog this is **Manage roles** > **Pub/Sub Publisher**.

## Options / Props

| Item | Description |
|------|-------------|
| `roles/pubsub.publisher` | Lets the notification service account publish to the topic; grant it on the topic. |
| `roles/pubsub.subscriber` | Grant to a service account created in the subscriber project when the subscription is in a different project than the topic. |
| `roles/monitoring.notificationServiceAgent` | Granted automatically to the notification service account. |

## Notes

- If the channel and topic are in different projects, enable the Pub/Sub and Monitoring APIs in both projects.
- A message storage policy or data residency restrictions on the topic might stop Monitoring from publishing (`FAILED_PRECONDITION` error).
- Complete the authorization step when you create the channel by API or CLI, or skipped it in the console.
- Granting Pub/Sub Publisher for all topics lets the service account publish to every topic in the project; the topic-level binding above is the narrower grant.
- The payload follows the version 1.2 schema.
- The source also shows Console steps.
- Corrected from the official docs: the sample `add-iam-policy-binding` output wrote its YAML list markers as `‐ members:` and `‐ serviceAccount:...` with U+2010 HYPHEN, which is not a YAML sequence indicator; gcloud prints an ASCII `-`.
- Source: https://docs.cloud.google.com/monitoring/support/notification-options (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [notification-payload-schema.md](./notification-payload-schema.md)
- [notification-options.md](./notification-options.md)
- [notification-channel-webhooks.md](./notification-channel-webhooks.md)
