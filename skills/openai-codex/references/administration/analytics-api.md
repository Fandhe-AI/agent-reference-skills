# Analytics API

Understand the purpose and administration boundary of the Codex Analytics API — programmatic, aggregated Codex usage/activity metrics for a ChatGPT workspace.

## Overview

Use the Analytics API to join aggregated Codex metrics with internal organizational data, or to automate recurring reporting (data warehouses, business intelligence, internal reporting) without depending on an interactive dashboard. It is not a raw audit-log interface — use the Compliance API for auditable activity records.

## Authentication and scope

Requests authenticate with a Platform organization API key; the key's organization must align with the workspace's associated organization. Results are limited to a single ChatGPT workspace.

## Notes

- The authenticated [Codex Analytics API reference](https://chatgpt.com/codex/cloud/settings/apireference) is the source of truth for access requirements, routes, schemas, and pagination — this page doesn't duplicate that contract.

## Related

- [Workspace analytics](./workspace-analytics.md)
- [Compliance API and audit events](./compliance-api.md)
- [Governance](./governance.md)
- [Admin rollout guide](./admin-rollout-guide.md)
