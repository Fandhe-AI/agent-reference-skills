# Analytics API

The Analytics APIs provide aggregated usage and activity metrics for a ChatGPT workspace. The unified Daily Usage Analytics API reports daily ChatGPT, Codex, and Work usage; confirm that the endpoint is enabled for your workspace before using it.

## Overview

Use the Analytics API to automate recurring workspace usage reporting, join aggregated usage metrics with internal organizational data, build a controlled reporting layer for approved audiences, and avoid coupling an integration to an interactive dashboard (data warehouses, business intelligence, internal reporting). It is not a raw audit-log interface — use the Compliance API for auditable activity records.

## Authentication and scope

Analytics API results are scoped to a single ChatGPT workspace. For the unified Daily Usage Analytics API, use a workspace-scoped Admin key with `enterprise.analytics.usage.read`; the Codex scope `codex.enterprise.analytics.read` doesn't grant access to that endpoint. The API reference owns current key provisioning, scope requirements, routes, schemas, fields, time semantics, and pagination behavior.

## Notes

- The Admin API reference (https://chatgpt.com/public/admin/api-reference) is the source of truth for current access requirements, routes, request and response schemas, metrics, time semantics, and pagination — this page doesn't duplicate that contract.
- Earlier revisions of this page described authentication with a Platform organization API key aligned to the workspace's organization; the current official page instead specifies the workspace-scoped Admin key and scope above.

## Related

- [Workspace analytics](./workspace-analytics.md)
- [Compliance API and audit events](./compliance-api.md)
- [Governance](./governance.md)
- [Admin rollout guide](./admin-rollout-guide.md)
