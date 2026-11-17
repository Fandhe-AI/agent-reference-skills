---
source: https://docs.cloud.google.com/assured-workloads/access-transparency/docs/overview
---

# Overview of Access Transparency

Access Transparency logs record the actions Google personnel take when accessing Customer Data, including the affected resource and action, the time, the reason, and accessor details (physical location, employing entity, job category). Access Approval lets you authorize such requests; Key Access Justifications adds key-level control for approvals signed with a customer-managed key.

## Signature / Usage

Access Transparency logs are written to the log name below in each project (view with Private Logs Viewer access).

```text
logName="projects/PROJECT_ID/logs/cloudaudit.googleapis.com%2Faccess_transparency"
```

## Notes

- Access Transparency logs are similar to Cloud Audit Logs: Cloud Audit Logs record actions taken by members of your organization in your resources; Access Transparency logs record actions taken by Google personnel. Together they cover customer actions and Google administrative access. Cloud Audit Logs itself is covered by the planned `gcp-observability` skill.
- Use cases: verify Google personnel access only for valid business reasons (outage fix, support request); verify access aligns with the products and data on a support case; verify and track legal or regulatory compliance; ingest into a SIEM such as Google Security Operations (Security Command Center findings can be combined as context).
- All access to Customer Data requires a valid justification for privileged access; see the justification reason codes in the reading-logs page.
- All Google employees must sign a confidentiality agreement and comply with Google's Code of Conduct. For government requests for Customer Data, Google's policy is to direct the government to request data directly from the customer.
- The list of services that produce Access Transparency logs is on the official supported-services page (`https://docs.cloud.google.com/assured-workloads/access-transparency/docs/supported-services`).
- To approve access requests before access happens, use Access Approval.
- Snippet taken from https://docs.cloud.google.com/assured-workloads/access-transparency/docs/reading-logs (the Logging filter for Access Transparency logs).
- Source: https://docs.cloud.google.com/assured-workloads/access-transparency/docs/overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [reading-logs.md](./reading-logs.md)
- [enable-access-transparency.md](./enable-access-transparency.md)
- [privileged-access.md](./privileged-access.md)
- [administrative-access.md](./administrative-access.md)
- [access-approval-overview.md](./access-approval-overview.md)
- [key-access-justifications-overview.md](./key-access-justifications-overview.md)
