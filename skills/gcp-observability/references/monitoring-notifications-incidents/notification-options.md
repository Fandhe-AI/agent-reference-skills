---
source: https://docs.cloud.google.com/monitoring/support/notification-options
---

# Notification channels (overview, email, mobile app, SMS)

Notification channels in Cloud Monitoring notify you or your on-call team when an alerting policy triggers. You configure channels in the Google Cloud console and attach them to alerting policies, for example to publish alerts for Compute Engine instances to a Pub/Sub topic and notify an on-call Slack channel. Supported only for Google Cloud projects; for App Hub configurations select the App Hub host project or management project. Because notifications might contain sensitive data, review your regulatory practices before you create a channel.

## Signature / Usage

### Redundancy example: a Pub/Sub topic as a backup channel

The source recommends pairing Cloud Mobile App, PagerDuty, webhooks or Slack channels with email or Pub/Sub. Creating the topic for a Pub/Sub channel:

```bash
gcloud pubsub topics create notificationTopic
```

### Email

In the Alerting page, click **Edit notification channels**, then **Add New** in the **Email** section, enter a single email address and a description, and click **Save**. If you use a group email address, configure the group to accept mail from `alerting-noreply@google.com`.

### Mobile App

Install the Google Cloud console Mobile App and select a project in it; a channel is created when none exists and, after a few minutes, is listed under **Mobile Devices** on the **Notification channels** page. In the alerting policy **Notifications** section, select **Google Cloud console (mobile)** and choose the device.

### SMS

In the **SMS** section click **Add New**, complete the dialog and click **Send Verification Code**, then enter the code and click **Verify**. In the alerting policy select the **SMS** type and a verified phone number.

### Create a channel on demand

In the notification dialog of an alerting policy click **Manage Notification Channels** (opens a new tab), add the channel, return and click **Refresh**, then select the channel.

## Options / Props

### Channel scope for Mobile App

| Scope | Behavior |
|-------|----------|
| Device | Notifications go only to the specific device that created the channel. The **Display name** includes device information. |
| User | Notifications go to all of your devices that have the Google Cloud console Mobile App installed. |

### Required role

| Role | Purpose |
|------|---------|
| `roles/monitoring.editor` (Monitoring Editor) | View and configure notification channels in the Google Cloud console (on the project). |

## Notes

- Redundancy: create multiple channel types. Google Cloud has no control over many delivery systems after handing off a notification. Cloud Mobile App, PagerDuty, webhooks and Slack are powered by the same internal service and share a single point of failure, so use email or Pub/Sub as the redundant channel. SMS isn't fully reliable and might not be available in certain regions, so always add a different channel type as backup.
- For automation tools that read, reroute or transform notifications, use the webhook or Pub/Sub channels; other types are not recommended because their notification format is subject to change.
- Cloud Monitoring determines the Mobile App scope when the channel is created; you can't select or change it.
- Cloud Monitoring doesn't support a test option for notification channels. To test, create an alerting policy on a VM's CPU utilization with **Below threshold** set above the current value, add the channels, set **Alert autoclose duration** to **30 min**, and verify notifications arrive on each channel. Delete the policy afterwards (the alert closes after the autoclose duration), and delete any test VM.
- Missing notifications: search the Logs Explorer for log entries about notification channel errors (Cloud Monitoring queries in the Logging query library). Unsupported channel: send notifications to Pub/Sub and build a pipeline (a Python/Flask Cloud Run example and the `cloud-alerting-notification-forwarding` repository are linked from the source).
- Edit or delete: **Edit notification channels** lists each type; use **Edit** / **Delete**. You can't delete a channel in the console while it is associated with an alerting policy; use the Google Cloud CLI or the Cloud Monitoring API instead. Deleting a channel stops notifications sent through it.
- The source also shows Console click-paths for every channel type. Channels by API are in "Create and manage notification channels by API" (https://docs.cloud.google.com/monitoring/alerts/using-channels-api).
- Source: https://docs.cloud.google.com/monitoring/support/notification-options (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from the Pub/Sub section of the same page.

## Related

- [notification-channel-pubsub.md](./notification-channel-pubsub.md)
- [notification-channel-webhooks.md](./notification-channel-webhooks.md)
- [notification-channel-pagerduty.md](./notification-channel-pagerduty.md)
- [notification-channel-slack-google-chat.md](./notification-channel-slack-google-chat.md)
- [notification-payload-schema.md](./notification-payload-schema.md)
- [incidents-events.md](./incidents-events.md)
