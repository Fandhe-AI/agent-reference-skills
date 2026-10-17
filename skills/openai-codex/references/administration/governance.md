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

## Analytics dashboard, usage controls, and APIs

- Analytics dashboard: ChatGPT provides workspace-wide analytics for broad adoption and engagement; Codex analytics focuses on Codex activity. Both are interactive reporting surfaces, not raw audit logs; the Workspace analytics guide describes current roles and views. Examples: workspace analytics for a quick adoption check, the Analytics API to load aggregated Codex reporting into a business intelligence system, the Compliance API to send auditable records to a SIEM or electronic discovery workflow.
- Related ChatGPT usage controls: separate from analytics and don't configure feature entitlements; depending on the plan, eligible Codex activity can consume ChatGPT workspace credits, and exhausted limits can pause access to eligible features. They don't set a universal Codex limit or govern Platform API billing.
- Analytics API: for programmatic, aggregated Codex reporting (data warehouses, business intelligence, internal reporting that shouldn't depend on an interactive dashboard); the API reference covers access requirements, routes, schemas, fields, reporting windows, and pagination. The Codex Analytics API reference is at https://chatgpt.com/public/admin/api-reference (tag Codex Enterprise Analytics).
- Compliance API: for security, legal, and governance workflows needing auditable records (not an adoption or productivity dashboard). Local computer access with Work Cloud has the same Compliance API support as Work Cloud with records under `conversation_message` and `codex_log`; local execution generates separate OpenTelemetry events collected through an OTel collector endpoint. Use the policy API for Global settings and the Agent Security UI for Local and Codex Cloud settings; test hook-based auditing separately. Conversation visibility alone doesn't establish a complete record of local actions. See compliance-api.md.

## Notes

- ChatGPT workspace analytics covers broad adoption/engagement; Codex analytics focuses on Codex activity. Both are interactive reporting, not raw audit logs — don't build a durable reporting contract from dashboard labels or downloaded report fields.
- ChatGPT workspace usage controls (credits) are separate from analytics and don't configure feature entitlements; eligible Codex activity can consume workspace credits and exhausted limits can pause access to eligible features.

## Related

- [Admin rollout guide](./admin-rollout-guide.md)
- [Workspace analytics](./workspace-analytics.md)
- [Analytics API](./analytics-api.md)
- [Compliance API and audit events](./compliance-api.md)
