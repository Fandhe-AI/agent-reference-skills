<!-- source: https://platform.claude.com/docs/en/manage-claude/api-and-data-retention / last verified: 2026-08-07 -->

# API and data retention

How the Claude API, Claude Platform on AWS, and Claude in Microsoft Foundry retain data, covering zero data retention (ZDR) and HIPAA readiness. Applies where Anthropic is the data processor; Amazon Bedrock and Google Cloud's Agent Platform have their own equivalent controls as data processor.

## Signature / Usage

HIPAA feature-restriction error (organization enabled for HIPAA, request includes a non-eligible feature):

```json
{
  "type": "error",
  "error": {
    "type": "invalid_request_error",
    "message": "The requested features are not available for HIPAA-regulated organizations without Zero Data Retention: code_execution."
  }
}
```

## Options / Props

| Arrangement | Covers | Does not cover |
| --- | --- | --- |
| Zero data retention (ZDR) | Messages/Token Counting APIs (eligible features), Claude Code (API keys from Commercial org, or Claude Enterprise w/ ZDR), Claude Platform on AWS (on request) | Console/Workbench, Claude Managed Agents, consumer plans, Enterprise/Teams UIs (except Claude Code), Claude for Excel, Covered Models (Fable 5/Mythos 5), third-party integrations, CORS, flagged content |
| HIPAA readiness | Claude API for eligible features, with signed BAA | Consumer plans, Console/Workbench usage, Bedrock/Google Cloud, Claude Platform on AWS, Microsoft Foundry, third-party integrations, Claude Code, most beta features, flagged content |

Feature eligibility values: **Yes** (fully eligible), **Yes (qualified)** (prompts/outputs not stored but a bounded technical artifact is retained briefly), **No** (not eligible; HIPAA blocks with 400, ZDR does not block but the feature's own retention policy applies).

## Notes

- Claude Fable 5 and Claude Mythos 5 are Covered Models requiring 30-day retention; not available under ZDR. A ZDR org can enable 30-day retention for a single workspace (Console > Workspaces > Privacy controls) to use these models while other workspaces stay ZDR.
- PHI must not appear in JSON schema definitions (structured outputs / strict tool use) — property names, `enum`/`const` values, and `pattern` regexes are cached separately from message content and do not receive the same protection.
- Even under ZDR/HIPAA, Anthropic may retain flagged content up to 2 years per automated trust & safety review, or as required by law.
- Compliance API data (Activity Feed, remote session transcripts) follows its own 6-year retention model, separate from ZDR/HIPAA.
- HIPAA enablement via Console (standard BAA) is permanent once accepted and cannot be disabled by an admin; a negotiated/custom BAA requires contacting sales.
- Cannot mix HIPAA and non-HIPAA workloads in one organization — HIPAA is enforced org-wide.

## Related

- [data-residency.md](./data-residency.md)
- [cmek.md](./cmek.md)
- [access-transparency.md](./access-transparency.md)
