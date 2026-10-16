# Safety Enforcement Notifications

Connect OpenAI enforcement notices (warnings, deactivations) to your team's workflows using safety webhooks and the Safety Case Read API. For example, on a warning your application can retrieve the case, identify the affected user, and create an internal review ticket.

## Signature / Usage

Create an organization-level webhook endpoint in the organization webhook settings and subscribe to the safety events. A warning notification:

```json
{
  "id": "evt_example",
  "object": "event",
  "created_at": 1787659200,
  "type": "safety.warning_issued",
  "data": {
    "id": "C-abc123"
  }
}
```

Look up the case with an API key for the same organization (Restricted permissions, **Safety** = **Read**, i.e. `api.safety.read`):

```bash
curl "https://api.openai.com/v1/safety/cases/C-abc123" \
  -H "Authorization: Bearer ${OPENAI_API_KEY}"
```

A successful lookup returns HTTP `200`:

```json
{
  "id": "C-abc123",
  "object": "safety.case",
  "created_at": 1787659100,
  "entity_identifier": "entity_identifier",
  "reason": "cyber_abuse",
  "notice": {
    "type": "warning"
  }
}
```

### Events

| Event | Notice |
|-------|--------|
| `safety.warning_issued` | A warning for a safety identifier in your organization. |
| `safety.deactivation_issued` | A deactivation for a safety identifier in your organization. |

### Troubleshooting

| Symptom | What to check |
|---------|---------------|
| Signature verification fails | Check the signing secret and preserve the raw request body as described in the Webhooks guide. |
| Lookup returns `401` | Check that the API key is present and valid. |
| Lookup returns `403` | Check that the key has the `api.safety.read` permission. |
| Lookup returns `404` | Use `data.id`, not the event ID. Check that the case belongs to the key's organization. |
| Lookup returns `429` or a transient `5xx` | Retry with backoff and a bounded retry policy. Preserve the event for later processing or investigation. |

## Notes

- Source: https://developers.openai.com/api/docs/guides/safety-enforcement (fetched 2026-10-17).
- Use cases: route warning and deactivation notices to trust and safety or support, add case info to an investigation or support ticket, associate a notice with a user through your safety-identifier mapping.
- Use a stable safety identifier per user, keep your own mapping from identifier to user, and avoid personal information in the identifier. `entity_identifier` in the case represents the affected safety identifier.
- The event's `id` identifies the webhook event; `data.id` identifies the safety case.
- These organization-level notifications are separate from project-level misalignment alerts. Retrieving a case does not change or reverse the enforcement.

## Related

- [Safety checks](./safety-checks.md)
- [Safety best practices](./safety-best-practices.md)
- [Misalignment monitoring](./misalignment-monitoring.md)
