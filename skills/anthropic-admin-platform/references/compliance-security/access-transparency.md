<!-- source: https://platform.claude.com/docs/en/manage-claude/access-transparency / last verified: 2026-08-07 -->

# Access Transparency

Receive an audit record of human access to your organization's data by Anthropic personnel, delivered through the Compliance API Activity Feed. Available to eligible customers on request (not self-serve); covers prompt/response content sent through the Claude Messages API or Claude Code sessions.

## Signature / Usage

```bash
curl --fail-with-body -sS -G \
  "https://api.anthropic.com/v1/compliance/activities" \
  --data-urlencode "activity_types[]=anthropic_access" \
  --data-urlencode "limit=50" \
  --header "x-api-key: $ANTHROPIC_COMPLIANCE_ACCESS_KEY"
```

## Options / Props

| Field | Type | Description |
| --- | --- | --- |
| `accessed_at` | RFC 3339 string | When the access occurred (may be earlier than feed visibility) |
| `created_at` | RFC 3339 string | When the activity became visible in the feed |
| `actor` | object | Always `{type: "anthropic_actor", email_address: null}` — individual identity not disclosed |
| `accessor_department` | string | Anthropic team that performed the access, e.g. `Safeguards` |
| `reason_code` | enum | `safety_review`, `incident_response`, `policy_violation_investigation`, `csae_report` |
| `resource_details.type` / `.id` / `.parent` | — | Currently only `message`; `.id` matches the Messages API response `id` |

## Notes

- Two event types on the same feed: `anthropic_access` (human view) and `cmek_preserve` (content preserved outside a CMEK key, whether human- or automation-initiated; same field shape).
- Covers: Claude API, Claude Code (via API key), Claude Platform on AWS. Does not cover: Batch/Files APIs, Claude for Enterprise/Work seats, Cowork, Claude in Chrome, consumer plans, Workbench, Microsoft Foundry, Bedrock, Google Cloud.
- Automated processing (model serving, safety classifiers) never generates `anthropic_access` events; an empty feed does not mean no automated processing occurred.
- Delivery is not real-time: events arrive within two business days of the access/preservation.
- Enabled at the organization level only (no per-workspace enrollment); not guaranteed retroactive to content written before enablement (up to a 2-hour gap after enabling).
- Does not change what Anthropic can access — governed independently by your agreement and Usage Policies.

## Related

- [compliance-api.md](./compliance-api.md)
- [compliance-activity-feed.md](./compliance-activity-feed.md)
- [cmek.md](./cmek.md)
- [api-and-data-retention.md](./api-and-data-retention.md)
