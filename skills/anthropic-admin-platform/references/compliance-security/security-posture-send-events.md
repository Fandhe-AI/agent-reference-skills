<!-- source: https://platform.claude.com/docs/en/manage-claude/compliance-security-posture/send-events / last verified: 2026-11-14 -->

# Send Security posture events to your SIEM

Request Security posture activities from the Compliance API Activity Feed with `activity_types[]`, read one activity field by field, and keep a SIEM current with a scheduled read that catches late activities (4-hour look-back every run, 15-day re-read daily).

## Signature / Usage

```bash
curl --fail-with-body -sS -G \
  "https://api.anthropic.com/v1/compliance/activities" \
  -H "x-api-key: $ANTHROPIC_COMPLIANCE_ACCESS_KEY" \
  -H "anthropic-version: 2026-10-21" \
  --data-urlencode "activity_types[]=org_security_control_attestation_updated" \
  --data-urlencode "created_at.gte=2026-10-20T00:00:00Z" \
  --data-urlencode "order=asc" \
  --data-urlencode "limit=5000"
```

## Options / Props

| Item | Value |
| --- | --- |
| Key / scope | Compliance Access Key covering the organization with `read:compliance_activities` or `read:org_audit` |
| `activity_types[]` | `org_security_control_attestation_updated` |
| `created_at.gte` | earliest `created_at` to read |
| `order` | `asc` returns oldest first |
| `limit` | `5000` in the example |
| Pagination | with `order=asc`, pass `last_id` as `after_id` for the next page; stop when `has_more` is false |
| Activity fields | `id`, `type`, `created_at`, `organization_id`, `organization_uuid`, `actor`, `control`, `action` (e.g. `attested`), `status` (e.g. `accepted_risk`) |

## Notes

- An empty `data` array is valid: the feed holds only changes since it began recording these activities for the organization. Check availability, have someone attest to a control, then repeat.
- Late activities: an activity can become queryable later than the usual 1-minute indexing lag with an already-past `created_at`. Re-read a fixed 4-hour look-back window on every run (for example every 5 minutes), keep the same query and `order` on every page, compute `created_at.gte` in UTC (URL-encoded) at the start of each run, and deduplicate on `id` (required because runs overlap).
- Failed runs: if a request fails after the retries in the Compliance API errors page, end the run; the next run reads its whole window again.
- Once a day run the same loop with a 15-day window (reaches activities queryable up to 14 days after `created_at`). Record each completed re-read's start; delete a stored `id` only if stored more than 16 days before the latest recorded start; if more than a day has passed since the latest start, use `created_at.gte` = 15 days before it. The feed keeps activities for 6 years.
- Already ingesting the full feed (no filter excluding these activities): pass through unrecognized `type` or field values, and add the 4-hour and daily 15-day re-reads.
- Verify: after someone attests, run the loop until it stores the activity; run again and it must not store it twice.
- This is the Compliance API security-posture feature (not Claude Code security review).
- Source: https://platform.claude.com/docs/en/manage-claude/compliance-security-posture/send-events (retrieved 2026-11-14)

## Related

- [security-posture.md](./security-posture.md)
- [security-posture-events-reference.md](./security-posture-events-reference.md)
- [security-posture-detect-changes.md](./security-posture-detect-changes.md)
- [security-posture-ocsf-mapping.md](./security-posture-ocsf-mapping.md)
- [security-posture-results-reference.md](./security-posture-results-reference.md)
