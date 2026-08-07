# Governance

Choose the appropriate analytics, usage, and audit surface for each administration question.

## Overview

Governance for Codex activity spans interactive analytics, programmatic reporting, related ChatGPT usage controls, and audit records. Analytics and compliance data serve different purposes.

## Signature / Usage

| If you need to | Start with |
|-----------------|------------|
| Understand adoption across ChatGPT | [Workspace analytics](./workspace-analytics.md) |
| Review Codex adoption/activity interactively | Codex analytics dashboard |
| Load aggregated Codex reporting into another system | [Analytics API](./analytics-api.md) |
| Export records for audit or investigation | [Compliance API and audit events](./compliance-api.md) |
| Review plan-dependent ChatGPT workspace credit controls | [ChatGPT usage limits and spend controls](./usage-limits.md) |

## Administration surfaces

- [Workspace analytics](https://chatgpt.com/admin/usage) — interactive workspace reporting
- Authenticated [Codex Analytics API reference](https://chatgpt.com/codex/cloud/settings/apireference) — scheduled, programmatic reporting
- Authenticated [Admin API reference](https://chatgpt.com/admin/api-reference) — audit and investigation integrations

## Notes

- ChatGPT workspace analytics covers broad adoption/engagement; Codex analytics focuses on Codex activity. Both are interactive reporting, not raw audit logs — don't build a durable reporting contract from dashboard labels or downloaded report fields.
- ChatGPT workspace usage controls (credits) are separate from analytics and don't configure feature entitlements; eligible Codex activity can consume workspace credits and exhausted limits can pause access to eligible features.

## Related

- [Admin rollout guide](./admin-rollout-guide.md)
- [Workspace analytics](./workspace-analytics.md)
- [Analytics API](./analytics-api.md)
- [Compliance API and audit events](./compliance-api.md)
