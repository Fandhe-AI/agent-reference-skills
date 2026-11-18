---
source: https://docs.cloud.google.com/monitoring/support/notification-options
---

# Slack and Google Chat notification channels

The Monitoring Slack integration posts to a Slack channel when a new alert is created. The Google Cloud Monitoring app lets Google Chat spaces receive notifications (Preview).

## Signature / Usage

### Slack

You must be a Slack Workspace Owner or Admin. Record the channel URL in Slack; then in the Alerting page click **Edit notification channels**, **Add New** in the **Slack** section, select your workspace and click **Allow**. Enter **Slack Channel Name** and **Cloud Alerting Display Name**; optionally click **Send test notification** (a message `This is a test alert notification...` appears in the channel).

For a private channel, invite the Monitoring app manually by sending this message in the channel:

```text
/invite @Google Cloud Monitoring
```

When creating an alerting policy, select **Slack** in **Notifications**.

### Google Chat (Preview)

1. In Google Chat open or create the space; install the Google Cloud Monitoring app (**Apps and Integrations**, or enter `@Google Cloud Monitoring` and press Enter, then **Add to space**).
2. Copy the chat space ID (included in the installation confirmation, or the characters following `space/` at the end of the space URL).
3. In the Alerting page click **Edit notification channels**, go to the **Google Chat** section, click **Add New**, enter the **Chat Space ID** and click **Save**.

## Options / Props

| Channel | Field | Description |
|---------|-------|-------------|
| Slack | Slack Channel Name | Channel that receives notifications. |
| Slack | Cloud Alerting Display Name | Short descriptive statement shown on the **Notification channels** page. |
| Google Chat | Chat Space ID | Series of numbers and letters following `space/` in the space URL. |

## Notes

- Inviting the Monitoring app is required for private Slack channels and optional for public channels.
- Google Chat is Preview: subject to the "Pre-GA Offerings Terms" in the Service Specific Terms; pre-GA features are available "as is" and might have limited support.
- In an organization, the Google Workspace administrator must add the app to the Marketplace apps allowlist (enable access at the top organizational unit) and configure Marketplace app user install settings. Installation from the Google Workspace Marketplace listing isn't supported; use the Chat procedure above.
- You can't view or manage the alert in the Google Cloud Monitoring app; to acknowledge the alert or snooze the policy use the Google Cloud console, the Google Cloud CLI or the Cloud Monitoring API.
- Slack and Cloud Mobile App notifications share one internal service with PagerDuty and webhooks (single point of failure); use email or Pub/Sub for redundancy. Slack authorization is a credential grant to your workspace; limit who can edit channels.
- Snippet is the only code in the source for these channels.
- Source: https://docs.cloud.google.com/monitoring/support/notification-options (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [notification-options.md](./notification-options.md)
- [notification-channel-pubsub.md](./notification-channel-pubsub.md)
