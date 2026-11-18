---
source: https://docs.cloud.google.com/monitoring/support/notification-options
---

# PagerDuty notification channel

PagerDuty supports two-way synchronization with Monitoring. An alert created in Monitoring opens an alert in PagerDuty; you can't use PagerDuty to close an alert in Monitoring; if you resolve an alert in PagerDuty while Monitoring still has it open, the alert is reopened in PagerDuty.

## Signature / Usage

### Set up

1. In PagerDuty, create a service (or edit an existing one), add the integration `Events API v1` on the service's **Integrations** panel, and copy the integration key.
2. In Cloud Monitoring, open the **Alerting** page, select the project (for App Hub configurations the host or management project), click **Edit notification channels**, and in the **PagerDuty** section click **Add New**.
3. Enter the **Display Name** (should match the PagerDuty service name) and paste the integration key into the **Service Key** field. Click **Save**.
4. When creating an alerting policy, select **PagerDuty** in **Notifications** and choose your configuration.

### JSON packet format

```text
{
    "description": A string of various fields in the alert,
    "details": JSON payload with schema version 1.2.
}
```

### Map severity levels

By default PagerDuty notifications show all alert severity levels as "critical". In the PagerDuty service **Settings**, go to **Event Management** > **View Orchestration Rules** > **New Rule**. For each Monitoring severity value, create a conditional rule: choose **If events match certain conditions**, select the code editor, and in the **If** section enter `event.custom_details.incident.severity matches part` followed by the severity value (for example `VALUE` in quotes) and click **Next**. Under **Step 2** select **Alert Data** and set the alert severity to the matching PagerDuty value, then save. Use **Else rule** to add more rules.

## Options / Props

| Item | Description |
|------|-------------|
| Display Name | Should match the name of the PagerDuty service with the new integration. |
| Service Key | The PagerDuty integration key (from an `Events API v1` integration). |
| `details` | JSON payload with schema version 1.2; see the payload page. |

## Notes

- The integration key is a secret credential: don't commit it or paste it into shared scripts or shell history; restrict who can edit notification channels (`roles/monitoring.editor`).
- PagerDuty shares a single point of failure with webhooks, Slack and the Mobile App; add email or Pub/Sub as a redundant channel.
- The source also shows only Console steps for this channel (no gcloud or Terraform).
- Source: https://docs.cloud.google.com/monitoring/support/notification-options (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [notification-payload-schema.md](./notification-payload-schema.md)
- [notification-options.md](./notification-options.md)
