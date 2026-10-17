<!-- source: https://platform.claude.com/docs/en/manage-claude/compliance-api / last verified: 2026-10-16 -->

# Compliance API

Programmatic access to your organization's Claude activity, chats, files, projects, sessions in Claude apps, and users for compliance, audit, and governance. Available to Claude Enterprise and Claude Console customers.

## Signature / Usage

```bash
curl --fail-with-body -sS \
  "https://api.anthropic.com/v1/compliance/activities?limit=1" \
  --header "x-api-key: $ANTHROPIC_COMPLIANCE_ACCESS_KEY"
```

Every endpoint lives under `/v1/compliance/*` on `https://api.anthropic.com` and authenticates through the `x-api-key` header. Two key types unlock the Compliance API: a **Compliance Access Key** (created in claude.ai) reaches every endpoint, and an **Admin API key** (created in Claude Console) reaches the Activity Feed only.

A Claude Enterprise tenant has one parent organization with linked organizations of two kinds: claude.ai organizations (chats, files, projects, sessions) and Claude Console organizations (Claude API workloads). A key covering the parent organization reaches directory data (organizations, users, roles, groups, effective settings) across every linked organization; content endpoints (chats, files, projects, sessions) serve Claude Enterprise data only. The session endpoints return transcripts of local sessions (on users' machines: Cowork, Claude Code, Claude Science, Claude for Microsoft 365, Claude in Chrome, Google Docs/Sheets/Slides add-ins, captured while users are signed in with their Claude Enterprise account) and of remote sessions (Cowork sessions started on claude.ai web or mobile, running in the cloud). See `compliance-sessions.md`. A standalone Claude Console organization (no parent) uses Admin API keys and can query the Activity Feed only.

## Notes

- All `/v1/compliance/*` endpoints share a rate limit of 600 requests per minute per parent organization; local session endpoints count only against that shared limit, and remote session endpoints carry a second request budget on top.
- The Compliance API differs from the claude.ai audit-log CSV export (narrower, capped lookback, no content access) and from the Analytics API (aggregated usage/cost vs. per-event records).
- Inference hooks act inline (pre-inference, can deny in real time); the Compliance API retrieves records after the fact with richer data.

## Related

- [compliance-api-access.md](./compliance-api-access.md)
- [compliance-activity-feed.md](./compliance-activity-feed.md)
- [compliance-content-data.md](./compliance-content-data.md)
- [compliance-org-data.md](./compliance-org-data.md)
- [compliance-integration-patterns.md](./compliance-integration-patterns.md)
- [compliance-errors.md](./compliance-errors.md)
- [compliance-faq.md](./compliance-faq.md)
