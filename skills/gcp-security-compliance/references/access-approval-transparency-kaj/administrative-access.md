---
source: https://docs.cloud.google.com/assured-workloads/cloud-provider-access-management/docs/administrative-access
---

# Overview of administrative access controls

Core principles behind Google Cloud's administrative access controls: Customer Data must not be accessible to Google employees without an auditable justification and, optionally, an explicit approval.

## Signature / Usage

Administrative access to Customer Data is logged once Access Transparency is enabled; near real-time audit logs are published to each project's logs under this log name.

```text
logName="projects/PROJECT_ID/logs/cloudaudit.googleapis.com%2Faccess_transparency"
```

## Options / Props

### Automated vs human access

| Automated access | Human access |
|---|---|
| No humans can access, view, or export content handled by these systems. Out of scope for Access Transparency logs (for example, programs that periodically hash customer content to check for corruption). | Any access that grants or can grant a human access to user content, including a human using an automated path for indirect access. In scope for Access Transparency and Access Approval. |

### Emergency vs non-emergency access

| Emergency access | Non-emergency access |
|---|---|
| Occurs when there is an urgent threat to the integrity of Google's services, infrastructure, or any customer services or content. Access with one of these justifications can override an organization's Access Approval policy. Rare; logged in Access Approval with the `auto-approved` status. | Any access that does not meet the emergency requirements, for example support personnel looking at Customer Data to help with a support request you filed. |

## Notes

- Administrative access means access to Customer Data by Google personnel by administrative means (for example, an employee using an internal support tool to read a Spanner database to diagnose a support case). Granting a Google employee direct project-level IAM access is not administrative access.
- Core principles: deny access by default (Customer Data belongs to the customer); the content owner's control over administrative access is a core commitment, provided through Access Transparency and Access Approval; every access requires a justification (with some exceptions); access logging is universal.
- Assured Workloads can provide administrative controls meeting the stricter guidelines of US government certifications, including restrictions on data access by non-US personnel (see the personnel data access and support controls page).
- Snippet taken from https://docs.cloud.google.com/assured-workloads/access-transparency/docs/reading-logs (the Logging filter for Access Transparency logs).
- Source: https://docs.cloud.google.com/assured-workloads/cloud-provider-access-management/docs/administrative-access (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [privileged-access.md](./privileged-access.md)
- [access-transparency-overview.md](./access-transparency-overview.md)
- [access-approval-overview.md](./access-approval-overview.md)
- [key-access-justifications-overview.md](./key-access-justifications-overview.md)
