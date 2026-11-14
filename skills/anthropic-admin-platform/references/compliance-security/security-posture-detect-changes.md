<!-- source: https://platform.claude.com/docs/en/manage-claude/compliance-security-posture/detect-changes / last verified: 2026-11-14 -->

# Detect changes in Security posture

Sample SIEM detection rules over Compliance API Activity Feed `org_security_control_attestation_updated` activities: accepted risks, controls attested as Failed, unexpected editors, bursts of changes, and attestations that end automatically. Rules are plain descriptions plus queries in no particular query language.

## Signature / Usage

```sql
type == "org_security_control_attestation_updated"
AND status == "accepted_risk"
AND actor.type != "system_actor"
```

## Options / Props

| Rule | Condition |
| --- | --- |
| A risk was accepted | `status == "accepted_risk"` and `actor.type != "system_actor"` |
| A control was attested as Failed | `status == "control_failed"` and `actor.type != "system_actor"` |
| Someone outside an allowlist changed an attestation | `actor.type != "system_actor"` and not (`actor.type == "user_actor"` and `actor.user_id IN allowed_user_ids`) |
| One person made many attestation changes | `actor.type == "user_actor"`, group by `organization_uuid`, `actor.user_id` over a sliding 1 hour of `created_at`, `count(distinct id) >= 10` (10 and 1 hour are examples) |
| An attestation ended automatically | `action == "lapsed"` |

## Notes

- Queries use Activity Feed field names plus `stored_at` (when you stored an activity). Deduplicate by `id` before counting; run over the time since the last completed run by `stored_at`, not `created_at`, because activities can arrive late.
- Fire rules only on activities you stored, never on ones you have not (may be late, or a change the feed does not record).
- Exclude `system_actor` on acceptance rules because an automatic change such as `lapsed` keeps the `status` but is not an acceptance.
- Key the allowlist on `actor.user_id`, not `actor.email_address` (the address at the time of the activity). Any other actor than a listed `user_actor` or a `system_actor` fires the allowlist rule.
- Burst rule: alert only for a group holding an activity stored since the last run, count over every stored activity, and count by `created_at` to measure the person's pace.
- A `lapsed` activity means the check result or current value differs from the one the attestation was saved on, not that `review_date` passed; it can come late.
- Keep rules working as values change: identify automatic changes by `actor.type`, not `actor.service`; do not drop activities with unlisted `control`, `action` or `status` values (a new `action` can record an acceptance).
- Test the allowlist rule by having someone not on the list attest to a control with no attestation whose result no one relies on, then clear it; until cleared the attestation can change that control's result.
- This is the Compliance API security-posture feature (not Claude Code security review).
- Source: https://platform.claude.com/docs/en/manage-claude/compliance-security-posture/detect-changes (retrieved 2026-11-14)

## Related

- [security-posture.md](./security-posture.md)
- [security-posture-send-events.md](./security-posture-send-events.md)
- [security-posture-events-reference.md](./security-posture-events-reference.md)
- [security-posture-check-events-against-results.md](./security-posture-check-events-against-results.md)
- [security-posture-ocsf-mapping.md](./security-posture-ocsf-mapping.md)
