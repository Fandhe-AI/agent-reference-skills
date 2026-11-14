<!-- source: https://platform.claude.com/docs/en/manage-claude/compliance-security-posture/events-reference / last verified: 2026-11-14 -->

# Security posture events reference

The Activity Feed `org_security_control_attestation_updated` activity records that someone recorded, changed, saved again, or cleared the organization's attestation for a security control, or that it ended automatically. Its fields, `action` values, an example, and what the feed does not record.

## Signature / Usage

```json
{
  "id": "activity_01Hq7ZtYc4Vb2NmKx8RsPd3W",
  "type": "org_security_control_attestation_updated",
  "created_at": "2026-10-20T15:04:00.220114Z",
  "organization_id": "org_01JuY4bkwkH1x4PodBJaWmh2",
  "organization_uuid": "91012d09-e48b-438e-a489-1bebfd8fa6f9",
  "actor": {
    "type": "user_actor",
    "email_address": "priya@example.com",
    "user_id": "user_01WxYzAbCdEfGhJkMnPqRsTu",
    "ip_address": "192.0.2.34",
    "user_agent": "Mozilla/5.0..."
  },
  "control": "directory_sync_enabled",
  "action": "attested",
  "status": "accepted_risk"
}
```

## Options / Props

| Field | Type | Description |
| --- | --- | --- |
| `control` | string | Identifier of the security control, for example `oauth_conditional_access`; treat as an opaque string |
| `action` | string | What changed (see below) |
| `status` | string | Attestation's value: `completed`, `accepted_risk` or `control_failed`; absent when cleared |
| `previous_status` | string | Value before this change, one of the same three; absent when `action` is `attested` |
| `review_date` | string | UTC day (ISO 8601 date) the attestation is due to end; absent if saved with no end date or cleared |

| `action` | Meaning |
| --- | --- |
| `attested` | Attestation recorded for a control that had none |
| `changed` | Saved again with another value or, where `status` equals `previous_status`, the same value as with `renewed` |
| `renewed` | Saved again with the same value |
| `cleared` | A person cleared an attestation |
| `lapsed` | Attestation ended automatically, not by a person |

## Notes

- Needs a Compliance Access Key covering the organization with `read:compliance_activities` or `read:org_audit`. Pass through any unlisted `control`, `action` or other field value, ignore unexpected fields, and treat a missing key and `null` alike.
- `created_at` is the time of a person's change or, for an automatic one, the time the change was recorded (can be later). `actor` is a `user_actor` for a person and a `system_actor` for an automatic change such as `lapsed`.
- On information-only controls the value Reviewed is recorded as `completed`. On `renewed` and `lapsed`, `status` equals `previous_status`; a save with the same value after `lapsed` is recorded as `renewed`, not `attested`.
- `lapsed` means the check result or the control's current value differs from the one the attestation was saved against (the value can change with no setting changed, e.g. Anthropic rewords it). `status` is the value that ended. A manual control's attestation never gets `lapsed`; the activity can come later than its cause.
- The feed does not record: changes from before it began recording these activities for the organization or while the Compliance API was off (never added later); rarely, a change of any kind; every end date that arrives; each time the page is turned off or on; comments saved with an attestation or any mark that one exists; which kind of control an attestation is for; every change that could end an attestation. Do not read an absent activity as no change; the endpoint can omit a control that an activity names.
- This is the Compliance API security-posture feature (not Claude Code security review).
- Source: https://platform.claude.com/docs/en/manage-claude/compliance-security-posture/events-reference (retrieved 2026-11-14)

## Related

- [security-posture.md](./security-posture.md)
- [security-posture-send-events.md](./security-posture-send-events.md)
- [security-posture-detect-changes.md](./security-posture-detect-changes.md)
- [security-posture-ocsf-mapping.md](./security-posture-ocsf-mapping.md)
- [security-posture-results-reference.md](./security-posture-results-reference.md)
