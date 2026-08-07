<!-- source: https://platform.claude.com/docs/en/manage-claude/compliance-api / last verified: 2026-08-07 -->

# Compliance API

Programmatic access to your organization's Claude activity, chats, files, projects, and users for compliance, audit, and governance. Available to Claude Enterprise and Claude Console customers.

## Signature / Usage

```bash
curl --fail-with-body -sS \
  "https://api.anthropic.com/v1/compliance/activities?limit=1" \
  --header "x-api-key: $ANTHROPIC_COMPLIANCE_ACCESS_KEY"
```

Every endpoint lives under `/v1/compliance/*` on `https://api.anthropic.com` and authenticates through the `x-api-key` header. Two key types unlock the Compliance API: a **Compliance Access Key** (created in claude.ai) reaches every endpoint, and an **Admin API key** (created in Claude Console) reaches the Activity Feed only.

A Claude Enterprise tenant has one parent organization with linked organizations of two kinds: claude.ai organizations (chats, files, projects, remote sessions) and Claude Console organizations (Claude API workloads). A key covering the parent organization reaches directory data (organizations, users, roles, groups, effective settings) across every linked organization; content endpoints (chats, files, projects, remote sessions) serve claude.ai data only. A standalone Claude Console organization (no parent) uses Admin API keys and can query the Activity Feed only.

## Notes

- All `/v1/compliance/*` endpoints share a rate limit of 600 requests per minute per parent organization; remote session endpoints carry an additional budget on top.
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
