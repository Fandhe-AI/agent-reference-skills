---
source: https://docs.cloud.google.com/pubsub/docs/monitor-subscription
---

# Monitor subscriptions

The Google Cloud console provides a Metrics dashboard for one subscription or for all subscriptions in a project, which you can copy into custom dashboards, edit in Metrics Explorer with PromQL, and turn into alerting policies.

## Signature / Usage

The source page has only Console steps and no code block. The retention command below turns on retention of acknowledged messages for an existing subscription, which makes the **Retention** section of the dashboard appear.

Adapted (not in the official docs): dropped `--message-retention-duration=1d` so the command keeps the subscription's current retention duration.

```bash
gcloud pubsub subscriptions update SUBSCRIPTION_ID \
  --retain-acked-messages
```

## Options / Props

### Dashboard sections

| View | Sections |
|------|----------|
| All subscriptions in a project (Subscriptions page, Metrics tab) | Overview, Quota |
| Single subscription (subscription details, Metrics tab) | Overview, Health, Retention, and Pull or Push depending on the subscription type; Retention is shown only if message retention is enabled |

### Key charts

| Chart | Section | Use |
|-------|---------|-----|
| Oldest unacked message | Health | Messages taking a long time to be acknowledged after publish. |
| Unacked messages by region | Overview | Unacknowledged messages in each region. |
| Delivery latency health score | Health | Which factors may contribute to higher delivery latency. |
| Administrator operations | Quota (all subscriptions) | Administrative operations on subscriptions; each charges one unit against this quota. |

## Notes

- Adapted from the official docs: the borrowed command also sets `--message-retention-duration=1d`; on a subscription whose retention duration is longer (the default is 7 days), that shortens retention and can discard older unacknowledged messages (see subscription-message-retention.md), so the example sets only `--retain-acked-messages`. Set `--message-retention-duration` only when you intend to change the duration.
- Prerequisites: a Cloud Billing account, a project with billing enabled, at least one topic with a subscription, and familiarity with Cloud Monitoring and Metrics Explorer. Alerting itself is documented in `gcp-observability`.
- Customize: "Save as custom dashboard" copies all charts to a new or existing custom dashboard; a single chart is added with More Actions, "Add to custom dashboard". Edit a chart via "View in Metrics Explorer" (PromQL) then "Save chart".
- If a chart has no "Create alerting policy" option, save it to a custom dashboard and use "Convert to alert chart" from the chart's More Actions.
- Forwarded dead-letter messages are counted by the `subscription/dead_letter_message_count` metric (see the dead-letter page).
- Snippet taken from https://docs.cloud.google.com/pubsub/docs/subscription-message-retention (the update command that enables message retention).
- For quotas, see the Pub/Sub quotas and limits page.
- Source: https://docs.cloud.google.com/pubsub/docs/monitor-subscription (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [subscription-message-retention.md](./subscription-message-retention.md)
- [dead-letter-topics.md](./dead-letter-topics.md)
- [subscription-retry-policy.md](./subscription-retry-policy.md)
