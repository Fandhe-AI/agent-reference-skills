---
source: https://docs.cloud.google.com/support/docs/access-control
---

# Customer Care Access Control and Audit Logging

IAM roles that control who can create, view, and manage Customer Care support cases and support accounts, plus how Customer Care API calls appear in Cloud Audit Logs.

## Signature / Usage

Prerequisites: Standard, Enhanced, or Premium Support, and the Organization Administrator role (`roles/resourcemanager.organizationAdmin`). Granting roles needs `resourcemanager.organizations.setIamPolicy` on the organization. Console: **IAM** page, **Add**, specify user / Google Group / domain, select a **Support** role (use least privilege), **Save**.

Audit logs for Customer Care (Logs Explorer):

```
protoPayload.serviceName="cloudsupport.googleapis.com"
```

## Options / Props

| Role | Purpose | Grant level |
|------|---------|-------------|
| Support Administrator `roles/cloudsupport.admin` | Manage the support account (assign support users, modify roles, manage support billing, enable case sharing); does not itself allow viewing cases | Organization only |
| Support Viewer `roles/cloudsupport.viewer` | Read-only support account details; cannot view cases | Organization only |
| Tech Support Editor `roles/cloudsupport.techSupportEditor` | View, create, update, escalate, and close cases (`cloudsupport.techCases.*`) | Organization, folder, project |
| Tech Support Viewer `roles/cloudsupport.techSupportViewer` | View cases and account information | Organization, folder, project |
| Advisory Support Editor `roles/cloudsupport.advisorySupportEditor` | Read-write advisory support cases | -- |
| Advisory Support Viewer `roles/cloudsupport.advisorySupportViewer` | Read-only advisory support cases | -- |
| Support Subscription Editor `roles/cloudsupport.supportSubscriptionEditor` | Create, update, delete, undelete support event subscriptions | Organization only |
| Support Subscription Viewer `roles/cloudsupport.supportSubscriptionViewer` | View support event subscriptions | Organization only |

Audit log types: Data Access (`DATA_READ`, `DATA_WRITE`) for the Support API `v2` and `v2beta` services:

| Type | Methods |
|------|---------|
| `DATA_READ` | `CaseAttachmentService` (`DownloadAttachment`, `GetAttachment`, `ListAttachments`), `CaseService` (`GetCase`, `ListCases`), `CommentService` (`GetComment`, `ListComments`), `SupportEventSubscriptionService` (`GetSupportEventSubscription`, `ListSupportEventSubscriptions`), v2beta `FeedService.ShowFeed` |
| `DATA_WRITE` | `CreateAttachment`, `CloseCase`, `CreateCase`, `EscalateCase`, `UpdateCase`, `CreateComment`, `CreateSupportEventSubscription`, `DeleteSupportEventSubscription`, `UndeleteSupportEventSubscription`, `UpdateSupportEventSubscription` |

Methods without audit logs: `CaseService.SearchCaseClassifications` and `CaseService.SearchCases` (v2 and v2beta), because they are high volume, low auditing value, or covered by another log.

## Notes

- Organization-level cases require `resourcemanager.organizations.get` (for example via `roles/resourcemanager.organizationViewer`); Organization Viewer is not the same as Viewer at the organization level and exposes no resources.
- Roles can be combined on the same resource; roles granted at several hierarchy levels combine (for example Viewer on the organization plus Editor on one project lets you view all cases and edit only that project's).
- Support Account Administrator must also hold a Tech Support role to see cases. Cases from retired Silver, Gold, or Platinum Support are managed through IAM roles after enabling Standard, Enhanced, or Premium.
- Granting `roles/resourcemanager.organizationAdmin` together with `roles/cloudsupport.admin` to a group lets it manage other users' support roles; this is highly privileged, so limit membership.
- Source: https://docs.cloud.google.com/support/docs/access-control, https://docs.cloud.google.com/support/docs/audit-logging (retrieved 2026-11-14; CC BY 4.0)

## Related

- [support-cases.md](./support-cases.md)
- [../support-plans/customer-care-plans.md](../support-plans/customer-care-plans.md)
