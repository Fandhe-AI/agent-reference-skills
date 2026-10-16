# safety

`curl` calls for the Safety APIs (project safety alerts and organization safety cases). These use a normal **restricted API key** (`OPENAI_API_KEY`) with a safety read permission, not an Admin API key (`OPENAI_ADMIN_KEY`).

## Retrieve a project safety alert

Call this after receiving a `safety.alert.created` webhook. Replace the illustrative `alert_0123456789abcdef0123456789abcdef` value with `data.id` from the webhook (the event's own `id` identifies the webhook event, not the alert). Use an API key authorized for the same project with the `api.safety.alerts.read` permission.

```bash
curl "https://api.openai.com/v1/safety/alerts/alert_0123456789abcdef0123456789abcdef" \
  -H "Authorization: Bearer ${OPENAI_API_KEY}"
```

Source: [Misalignment monitoring guide](https://developers.openai.com/api/docs/guides/safety-checks/misalignment-monitoring), "Receive project safety alerts".

## Retrieve a safety case

Call this after receiving a `safety.warning_issued` or `safety.deactivation_issued` webhook, using the event's `data.id` as the case ID. Use an API key for the same organization with **Restricted** permissions and **Safety** set to **Read** (`api.safety.read`).

```bash
curl "https://api.openai.com/v1/safety/cases/C-abc123" \
  -H "Authorization: Bearer ${OPENAI_API_KEY}"
```

A successful lookup returns HTTP `200` and a case object. Retrieving a case does not change or reverse the enforcement.

Source: [Safety enforcement notifications guide](https://developers.openai.com/api/docs/guides/safety-enforcement), "Retrieve the case".

## Notes

- Project alerts (`safety.alert.created`, project-level) and organization cases (`safety.warning_issued` / `safety.deactivation_issued`, organization-level) are separate notification paths with different key scopes.
- Webhook setup and signature verification are covered by the Webhooks guide, not duplicated here.
