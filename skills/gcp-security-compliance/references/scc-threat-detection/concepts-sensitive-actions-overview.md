---
source: https://docs.cloud.google.com/security-command-center/docs/concepts-sensitive-actions-overview
---

# Overview of Sensitive Actions Service

Sensitive Actions Service is a built-in Security Command Center service (Standard-legacy, Standard, Premium, and Enterprise (Deprecated) service tiers) that detects actions in your organization, folders and projects that could be damaging if taken by a malicious actor. Most detected actions are legitimate, so findings may need investigation before you can tell they are not threats. Findings are classified as observations.

## Signature / Usage

### Show all findings caused by one user's actions

Sensitive Actions Service findings are viewed by finding class or finding source on the **Findings** page of the console. Because most detected actions are legitimate, investigate who acted: copy the address next to **Principal email** in the finding details pane, then enter this query in the query editor of the **Findings** page. Replace `USER_EMAIL` with the copied email address.

```text
access.principal_email="USER_EMAIL"
```

## Options / Props

### Findings (display name starts with the MITRE ATT&CK tactic)

| Display name | API name | Description |
|---|---|---|
| `Defense Evasion: Organization Policy Changed` | `change_organization_policy` | An organization-level organization policy was created, updated or deleted, in an organization more than 10 days old. Not available for project-level activations. |
| `Defense Evasion: Remove Billing Admin` | `remove_billing_admin` | An organization-level billing administrator IAM role was removed, in an organization more than 10 days old. |
| `Impact: GPU Instance Created` | `gpu_instance_created` | A GPU instance was created by a principal that has not recently created a GPU instance in the same project. |
| `Impact: Many Instances Created` | `many_instances_created` | Many instances were created in a project by the same principal in one day. |
| `Impact: Many Instances Deleted` | `many_instances_deleted` | Many instances were deleted in a project by the same principal in one day. |
| `Persistence: Add Sensitive Role` | `add_sensitive_role` | A sensitive or highly-privileged organization-level IAM role was granted, in an organization more than 10 days old. Not available for project-level activations. |
| `Persistence: Project SSH Key Added` | `add_ssh_key` | A project-level SSH key was created in a project more than 10 days old. |

### Restrictions

| Restriction | Detail |
|---|---|
| Account support | Detection is limited to actions taken by user accounts (Google accounts). |
| CMEK | If your logs are encrypted with customer-managed encryption keys (CMEK), the service cannot read them and cannot alert you. |
| Log bucket location | Admin Activity audit logs whose log bucket is in a location other than `global` cannot be scanned (for example when a storage location is specified for the `_Required` bucket of a project, folder or organization). |

## Notes

- The service monitors all of your organization's Admin Activity audit logs, which are always on; on detection it writes a finding to Security Command Center and a log entry to the Google Cloud platform logs (Sensitive Actions Service).
- The Security Command Center Enterprise service tier will shut down on May 21, 2027; an organization using it automatically moves to the Premium service tier on or after that date.
- Snippet taken from https://docs.cloud.google.com/security-command-center/docs/how-to-use-event-threat-detection (Findings page query editor). The source page has no code.
- Source: https://docs.cloud.google.com/security-command-center/docs/concepts-sensitive-actions-overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview-threats.md](./overview-threats.md)
- [how-to-investigate-threats.md](./how-to-investigate-threats.md)
- [concepts-event-threat-detection-overview.md](./concepts-event-threat-detection-overview.md)
