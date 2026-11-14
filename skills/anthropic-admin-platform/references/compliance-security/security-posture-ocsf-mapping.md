<!-- source: https://platform.claude.com/docs/en/manage-claude/compliance-security-posture/ocsf-mapping / last verified: 2026-11-14 -->

# Map Security posture events to OCSF

Mapping of Security posture Activity Feed activities to Open Cybersecurity Schema Framework (OCSF) 1.6.0, applied in your own pipeline after reading and before storing. `org_security_control_attestation_updated` maps to the Entity Management class (3004).

## Signature / Usage

```json
{
  "class_uid": 3004,
  "category_uid": 3,
  "activity_id": 1,
  "type_uid": 300401,
  "severity_id": 1,
  "time": 1794495872517,
  "metadata": {
    "version": "1.6.0",
    "profiles": ["host"],
    "uid": "activity_01Kp5RvNd8Wc3TgMy6BxQf4Z",
    "event_code": "org_security_control_attestation_updated",
    "original_time": "2026-11-12T15:04:32.517208Z",
    "logged_time": 1794495910000,
    "tenant_uid": "91012d09-e48b-438e-a489-1bebfd8fa6f9",
    "product": { "vendor_name": "Anthropic", "name": "Compliance API" }
  },
  "actor": {
    "user": {
      "uid": "user_01TuVwXyZaBcDeFgH2JkLmN4",
      "email_addr": "admin@example.com"
    }
  },
  "src_endpoint": { "ip": "192.0.2.34" },
  "http_request": { "user_agent": "ExampleBrowser/1.0" },
  "entity": {
    "type_id": 99,
    "type": "Security control attestation",
    "uid": "mdm_chat_required_organization",
    "data": { "status": "completed" }
  },
  "unmapped": {
    "action": "attested",
    "actor": { "type": "user_actor" },
    "organization_id": "org_01JuY4bkwkH1x4PodBJaWmh2"
  }
}
```

## Options / Props

Attributes for every activity:

| Activity field | OCSF attribute | Note |
| --- | --- | --- |
| `id` | `metadata.uid` | copy |
| `type` | `metadata.event_code` | copy |
| `created_at` | `time` | RFC 3339 to whole milliseconds since Unix epoch |
| `created_at` | `metadata.original_time` | copy string |
| none | `metadata.logged_time` | time you stored it (`stored_at`), ms since epoch |
| `organization_uuid` | `metadata.tenant_uid` | copy |
| `organization_id` | `unmapped.organization_id` | copy |
| none | `metadata.version` | constant `1.6.0` |
| none | `metadata.product.vendor_name` | constant `Anthropic` |
| none | `metadata.product.name` | constant `Compliance API` |
| none | `type_uid` | `class_uid * 100 + activity_id` |
| none | `severity_id` | `1` (Informational); set alert priority in the detection rule |
| none | `metadata.profiles` | add `host` |
| `actor.type` | `unmapped.actor.type` | copy |
| `actor.user_id` | `actor.user.uid` | `user_actor` only |
| `actor.email_address` | `actor.user.email_addr` | `user_actor` only |
| `actor.ip_address` | `src_endpoint.ip` | `user_actor` only |
| `actor.user_agent` | `http_request.user_agent` | `user_actor` only |
| `actor.service` | `actor.app_name` | `system_actor` only |

Attestation activity (Entity Management):

| Activity field | OCSF attribute | Note |
| --- | --- | --- |
| none | `class_uid` / `category_uid` | `3004` (Entity Management) / `3` (Identity & Access Management) |
| `action` | `activity_id` | per table below |
| `action` | `unmapped.action` | copy (two `action` values share one `activity_id`) |
| none | `entity.type_id` / `entity.type` | `99` (Other) / `Security control attestation` |
| `control` | `entity.uid` | copy |
| `status` | `entity.data.status` | copy |
| `review_date` | `entity.data.review_date` | copy |
| `previous_status` | `unmapped.previous_status` | copy |

| `action` | `activity_id` | `type_uid` |
| --- | --- | --- |
| `attested` | `1` (Create) | `300401` |
| `changed` | `3` (Update) | `300403` |
| `renewed` | `3` (Update) | `300403` |
| `cleared` | `4` (Delete) | `300404` |
| `lapsed` | `11` (Deactivate) | `300411` |
| any other value | `99` (Other) | `300499` |

## Notes

- Put every field with no OCSF attribute in `unmapped` under its Activity Feed name, including unrecognized ones. Where a field is absent or `null`, leave out the OCSF attribute. For `99` (Other), set `activity_name` to the `action` value.
- Do not map `status` to `status_id` or any pass/fail value: an attestation is a person's statement, not a check result.
- Version differences: in OCSF 1.7.0 `metadata.uid` is the OCSF event's own identifier and `metadata.original_event_uid` holds the source identifier; OCSF 1.9.0 deprecates `actor.app_name` in favor of `actor.application`.
- This is the Compliance API security-posture feature (not Claude Code security review).
- Source: https://platform.claude.com/docs/en/manage-claude/compliance-security-posture/ocsf-mapping (retrieved 2026-11-14)

## Related

- [security-posture.md](./security-posture.md)
- [security-posture-events-reference.md](./security-posture-events-reference.md)
- [security-posture-send-events.md](./security-posture-send-events.md)
- [security-posture-detect-changes.md](./security-posture-detect-changes.md)
