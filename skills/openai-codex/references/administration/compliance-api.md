# Compliance API and audit events

Understand the purpose and administration boundary of the Compliance API — auditable records for security, legal, governance, and investigation workflows.

## Overview

Use the Compliance API to export supported records into an audit/investigation system, apply organizational retention and legal-hold processes, correlate Codex activity with other security/identity data, and support approved investigations. It is not a productivity dashboard — don't use it to infer code quality or individual performance; use [Workspace analytics](./workspace-analytics.md) or the [Analytics API](./analytics-api.md) for adoption reporting instead.

## Get started

1. Open the [Admin API reference](https://chatgpt.com/admin/api-reference) and confirm your admin role can access the needed compliance resources.
2. Use the append-only compliance log stream for ongoing collection.
3. Test ingestion into a non-production SIEM system or data lake.
4. Schedule continuous collection and apply your organization's access/retention/legal-hold controls to exported records — don't assume the source retention window replaces your own retention policy.

## Notes

- The authenticated [Admin API reference](https://chatgpt.com/admin/api-reference) owns current routes, event coverage, schemas, filters, retention behavior, and request mechanics — this page doesn't duplicate that contract.
- Compliance coverage follows the ChatGPT workspace and products represented in the current authenticated reference. Platform API organization data follows its own separate administration controls.

## Related

- [Workspace analytics](./workspace-analytics.md)
- [Admin rollout guide](./admin-rollout-guide.md)
- [Governance](./governance.md)
- [Analytics API](./analytics-api.md)
