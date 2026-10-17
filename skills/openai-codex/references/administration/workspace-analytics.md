# Workspace analytics

Compare ChatGPT workspace analytics, Codex analytics, reporting APIs, and audit records.

## Overview

Use ChatGPT workspace analytics for broad workspace adoption, Codex analytics for Codex-focused reporting, the Analytics API for programmatic aggregates, and the Compliance API for auditable records. These reporting surfaces don't grant product access or set runtime policy.

## Reporting surfaces

| Surface | Use it for | Contract owner |
|---------|-------------|-----------------|
| ChatGPT workspace analytics | Interactive, workspace-wide adoption/engagement reporting | Help Center guidance |
| Codex analytics | Interactive Codex adoption/activity reporting | Authenticated Codex analytics dashboard |
| Analytics API | Programmatic, aggregated Codex reporting | Authenticated Codex Analytics API reference |
| Compliance API | Audit, security, legal, and investigation records | Authenticated Admin API reference |

## Review Codex analytics

The authenticated Codex analytics dashboard (`admin.openai.com/analytics/codex`) focuses on Codex reporting; use it for interactive exploration, not as a stable schema contract. For a walkthrough of the Insights dashboard (explore Use cases and Tasks, compare activity with consumption and reach, open a category for details) see Usage Insights on the official site. For automated reporting use the Analytics API (the Codex Analytics API reference is tag "Codex Enterprise Analytics" in the Admin API reference); for auditable records use the Compliance API. ChatGPT workspace analytics and Codex analytics cover different product scopes; availability, roles, dashboard sections, freshness, privacy behavior, and export formats can change, so use the Workspace analytics Help Center guidance for current procedures.

## Notes

- Treat downloaded reports as identifiable organizational data; apply the organization's access/storage/retention policy rather than assuming export privacy matches an aggregated dashboard.
- Dashboard categories, fields, filters, and export formats can change independently of this page — use the authenticated API references for automated/programmatic reporting.
- Analytics describes activity; it doesn't grant access or change runtime permissions.

## Related

- [Analytics API](./analytics-api.md)
- [Compliance API and audit events](./compliance-api.md)
- [Governance](./governance.md)
- [Roles and workspace permissions](./roles-and-workspace-permissions.md)
- [ChatGPT usage limits and spend controls](./usage-limits.md)
