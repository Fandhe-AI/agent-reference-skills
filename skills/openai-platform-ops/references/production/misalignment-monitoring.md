# Misalignment Monitoring

Checks whether an agent is properly interpreting the user's instructions in consequential contexts (transferring or accessing sensitive data, making destructive changes). Reviews model reasoning and actions asynchronously and can stop a conversation when it identifies a potential issue.

A flag indicates the agent's actions need review; it does not establish that the user violated a policy or that the agent acted contrary to instructions. Monitoring can miss issues or flag legitimate activity, so keep application safeguards, including human approval for consequential actions.

## Signature / Usage

Receive project alerts by subscribing a project webhook to `safety.alert.created`. The webhook carries only an alert ID:

```json
{
  "object": "event",
  "id": "evt_123",
  "type": "safety.alert.created",
  "created_at": 1787659200,
  "data": {
    "id": "alert_0123456789abcdef0123456789abcdef"
  }
}
```

Retrieve the alert with an API key for the same project that has the `api.safety.alerts.read` permission:

```bash
curl "https://api.openai.com/v1/safety/alerts/alert_0123456789abcdef0123456789abcdef" \
  -H "Authorization: Bearer ${OPENAI_API_KEY}"
```

```python
from openai import OpenAI

client = OpenAI()
alert = client.safety.alerts.retrieve("alert_0123456789abcdef0123456789abcdef")
print(alert.error_type, alert.reason)
```

### Request coverage

| Requests | Behavior |
|----------|----------|
| Responses API requests using persisted reasoning, WebSockets, or OpenAI compaction | Monitored. The system can identify continuations of a conversation and block further execution. |
| Responses API requests using none of those mechanisms | Monitored. Configured webhooks can receive alerts, but the system does not automatically stop the conversation. |
| Chat Completions API requests | Not covered by this monitoring system. Other safety checks still apply. |

Configuring an alert webhook does not enable automatic stopping.

### Handling a stopped request

When monitoring blocks a request before streaming begins, the API returns HTTP `403`, error type `invalid_request_error`, code `misalignment_policy_violation`. Match the error code rather than the message text. Streaming integrations must also handle errors while consuming the stream, even after receiving output.

1. Stop dispatching further actions for the affected conversation; do not automatically retry the blocked workflow.
2. Preserve relevant request and response IDs, tool calls, and application records per your data handling policies.
3. Show the error information to the responsible user or operator so they can compare the agent's actions with the intended work and review changes already made.

## Notes

- Source: https://developers.openai.com/api/docs/guides/safety-checks/misalignment-monitoring (fetched 2026-10-17).
- The API provides no general way to resume a conversation stopped by misalignment monitoring.
- Monitoring is asynchronous: an action may already have completed before a concern is identified, and a stopped request does not undo earlier actions.
- Webhook setup, signature verification, acknowledgments, retries, and duplicate deliveries follow the Webhooks guide.
- The event's `id` identifies the webhook event; `data.id` is the alert ID.
- Use the returned `request_id` and `response_id` to find affected work in your records. When `request_paused` is `true`, registering a safety block succeeded; this does not confirm execution stopped or earlier actions were reversed.
- `reason` can be `null`, including for Zero Data Retention (ZDR) requests. A non-null `reason` is a category description, not a transcript or full investigation report.
- A `404` with code `safety_alert_not_found` means check the alert ID and project credentials; missing, inaccessible, or incomplete records can return it. Alert delivery and retrieval are not a complete audit history.
- Project-level alerts are separate from organization-level enforcement notifications (see Safety enforcement notifications).

## Related

- [Safety enforcement notifications](./safety-enforcement.md)
- [Safety checks](./safety-checks.md)
- [Safety best practices](./safety-best-practices.md)
