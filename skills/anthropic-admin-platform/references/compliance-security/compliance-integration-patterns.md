<!-- source: https://platform.claude.com/docs/en/manage-claude/compliance-integration-patterns / last verified: 2026-08-07 -->

# Design your compliance integration

Choose between window polling and cursor-driven Activity Feed consumption, correlate Compliance API events with your SIEM, and plan content retention. Required scope: `read:compliance_activities`.

## Signature / Usage

```bash
# Window polling
curl --fail-with-body -sS -G \
  "https://api.anthropic.com/v1/compliance/activities" \
  --header "x-api-key: $ANTHROPIC_COMPLIANCE_ACCESS_KEY" \
  --data-urlencode "created_at.gte=2026-04-20T07:00:00Z" \
  --data-urlencode "created_at.lt=2026-04-20T08:00:00Z" \
  --data-urlencode "limit=5000"

# Cursor-driven incremental read
curl --fail-with-body -sS -G \
  "https://api.anthropic.com/v1/compliance/activities" \
  --header "x-api-key: $ANTHROPIC_COMPLIANCE_ACCESS_KEY" \
  --data-urlencode "limit=5000" \
  --data-urlencode "before_id=$first_id"
```

## Options / Props

| Pattern | Choose when |
| --- | --- |
| Window polling | Fixed schedule, stateless workers, tolerate replaying/overlapping windows |
| Cursor-driven incremental reads | Lowest latency, avoid re-reading pages, durable cursor storage available |

| Compliance API field | SIEM join target |
| --- | --- |
| `actor.user_id` | Stable identity-provider user ID (preferred over email) |
| `actor.email_address` | Directory email fallback |
| `actor.ip_address` | Network/VPN/endpoint logs |
| `created_at` | Time-window correlation |

## Notes

- Max `limit` per page is 5,000; cursors are opaque; requests capped at 600/min per parent organization.
- Window polling: set `created_at.lt` at least 1 minute in the past (the documented indexing lag); tile windows without gaps; deduplicate on activity `id` and widen/reconcile to catch late-indexed activities.
- Cursor-driven: persist `first_id` from the final page (`has_more: false`) and pass as `before_id` next run; persist only after finishing the full loop, not on intermediate pages.
- Treat the feed as at-least-once delivery; deduplicate on `id`. No `total_count` or checksum is returned — log starting cursor, terminal `last_id`, record count, and `request-id` for completeness attestation.
- `compliance_api_accessed` activities record who queried compliance data; ingest them for self-audit.
- Retention horizons: Activity Feed and remote session transcripts 6 years (Anthropic-controlled); chat/file/project content follows your org's claude.ai retention policy; Compliance API hard-deletes are not retained.

## Related

- [compliance-activity-feed.md](./compliance-activity-feed.md)
- [compliance-content-data.md](./compliance-content-data.md)
- [compliance-faq.md](./compliance-faq.md)
