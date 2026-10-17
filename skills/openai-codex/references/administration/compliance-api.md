# Compliance API and audit events

Understand the purpose and administration boundary of the Compliance API — auditable records for security, legal, governance, and investigation workflows.

## Overview

Use the Compliance API to export supported records into an audit/investigation system, apply organizational retention and legal-hold processes, correlate Codex activity with other security/identity data, and support approved investigations. It is not a productivity dashboard — don't use it to infer code quality or individual performance; use [Workspace analytics](./workspace-analytics.md) or the [Analytics API](./analytics-api.md) for adoption reporting instead.

## Get started

1. Open the [Admin API reference](https://chatgpt.com/admin/api-reference) and confirm your admin role can access the needed compliance resources.
2. Use the append-only compliance log stream for ongoing collection.
3. Test ingestion into a non-production SIEM system or data lake.
4. Schedule continuous collection and apply your organization's access/retention/legal-hold controls to exported records — don't assume the source retention window replaces your own retention policy.

## Download logs

Download the Bash script (https://developers.openai.com/downloads/compliance-api/download_compliance_files.sh) or PowerShell script (https://developers.openai.com/downloads/compliance-api/download_compliance_files.ps1). Both list and download every available log file after a given timestamp, follow pagination, and write JSONL to standard output (errors go to standard error). Set `COMPLIANCE_API_KEY` to your Enterprise Compliance API key; replace `<workspace_or_org_id>` with your ChatGPT workspace ID or API Platform organization ID and `<after>` with an ISO 8601 timestamp that includes a time zone. This example retrieves `AUTH_LOG` files, 100 at a time. On macOS or Linux install Bash, `curl`, and `jq`:

```bash
bash ./download_compliance_files.sh "<workspace_or_org_id>" AUTH_LOG 100 "<after>" > output.jsonl
```

The Windows script supports PowerShell 5.1 or later; review the downloaded file, and if Windows blocks it and policy permits run `Unblock-File -Path .\download_compliance_files.ps1`. This example (PowerShell 7) saves UTF-8 without a byte-order mark:

```powershell
.\download_compliance_files.ps1 "<workspace_or_org_id>" AUTH_LOG 100 "<after>" |
  Set-Content -Encoding utf8NoBOM output.jsonl
```

## Notes

- The Admin API reference is now at https://chatgpt.com/public/admin/api-reference; a Compliance Platform guide in the Help Center gives an overview of available compliance surfaces and integration patterns. Example uses: stream immutable compliance events into a SIEM for investigations, or route them into an approved electronic discovery workflow.
- Audit records for Local computer access with Work Cloud (ChatGPT Work): it has the same Compliance API support as Work Cloud, with records under the `conversation_message` and `codex_log` event types; local execution also generates OpenTelemetry events collected separately through an OTel collector endpoint. These sources don't establish a complete record of every local command, file operation, screenshot, approval, or external action. Confirm retention and deletion behavior and compare exported records with actions performed in a representative task. Policy API support doesn't change Compliance API event coverage; hook-based auditing (admin-defined MCP hooks on the cloud coordinator) should be tested separately.

- The authenticated [Admin API reference](https://chatgpt.com/admin/api-reference) owns current routes, event coverage, schemas, filters, retention behavior, and request mechanics — this page doesn't duplicate that contract.
- Compliance coverage follows the ChatGPT workspace and products represented in the current authenticated reference. Platform API organization data follows its own separate administration controls.

## Related

- [Workspace analytics](./workspace-analytics.md)
- [Admin rollout guide](./admin-rollout-guide.md)
- [Governance](./governance.md)
- [Analytics API](./analytics-api.md)
