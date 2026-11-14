---
source: https://docs.cloud.google.com/iam/docs/pam-overview
---

# Privileged Access Manager: Overview, Permissions, and Setup

Privileged Access Manager (PAM) provides just-in-time temporary privilege elevation through entitlements, with audit of who had access to what and when.

## Signature / Usage

An entitlement defines: eligible requesters, whether a justification is required, roles (optionally with IAM Conditions) to grant temporarily, a maximum grant duration, optional approvers (and whether they must justify), and optional notification recipients. A requester asks for a grant; if successful they receive the roles until the grant ends, then PAM revokes them.

Enable PAM (console): open the Privileged Access Manager page, select the organization/folder/project, click **Set up PAM**, click **Grant role** to give the Privileged Access Manager Service Agent role (`roles/privilegedaccessmanager.serviceAgent`) to the organization-level service agent, then **Complete setup**.

```text
service-org-ORGANIZATION_NUMBER@gcp-sa-pam.iam.gserviceaccount.com
```

Add the service agent to security controls: `exceptionPrincipals` of deny policies, and VPC Service Controls access levels or an ingress rule.

Allow-list the notification sender for requesters, approvers and admins:

```text
pam-noreply@google.com
```

## Options / Props

### Roles for administrators

| Task | Roles |
|---|---|
| Create/update/delete entitlements, organization | `roles/privilegedaccessmanager.admin` + `roles/iam.securityAdmin` |
| ... folder | `roles/privilegedaccessmanager.admin` + `roles/resourcemanager.folderAdmin` |
| ... project | `roles/privilegedaccessmanager.admin` + `roles/resourcemanager.projectIamAdmin` |
| View entitlements and grants | `roles/privilegedaccessmanager.viewer` |
| View audit logs | `roles/logging.viewer` (`logging.logEntries.list`) (corrected from the official page, which lists `roles/logs.viewer`) |

Key permissions: `privilegedaccessmanager.locations.checkOnboardingStatus`, `serviceusage.services.enable` (enable), `privilegedaccessmanager.entitlements.{create,delete,get,list,setIamPolicy}`, `privilegedaccessmanager.grants.{get,list,revoke}`, `privilegedaccessmanager.operations.{delete,get,list}`, plus `resourcemanager.{organizations,folders,projects}.{get,getIamPolicy,setIamPolicy}`. Requesters and approvers need no PAM-specific permissions.

### Capabilities

| Area | Detail |
|---|---|
| Resources | Projects, folders, organizations; scope narrower with IAM Conditions (all allow-policy condition attributes; services must support granular IAM) |
| Roles | Predefined, custom, and Admin/Writer/Reader basic roles; legacy Owner/Editor/Viewer unsupported |
| Identities | Cloud Identity, Workforce Identity Federation, Workload Identity Federation, agent identities |
| Multi-level / multi-party approvals (Preview) | Up to 2 sequential levels, up to 5 approvals per level (Security Command Center Enterprise or Premium) |
| Scope customization (Preview) | Requesters narrow a grant to specific roles/resources |
| Service account / agent identity approvers (Preview) | Enabled in PAM settings |
| Inheritance (Preview) | Org/folder entitlements and grants visible and requestable from descendants |
| Notification preferences (Preview) | Resource-wide enable/disable per event and persona |
| Grant scheduling (Preview) | Up to 7 days in advance |
| Grant withdrawal (Preview) | Withdraw pending/scheduled grants, end active grants |
| Retention | Grants deleted 30 days after denied/revoked/withdrawn/expired/ended; audit logs follow `_Required` bucket retention |

### Email notification events

| Recipients | Event |
|---|---|
| Eligible requesters | Entitlement assigned and available |
| Grant approvers | Grant requested and needs approval |
| Grant requester | Activated or failed to activate; ended; denied; expired (not decided within 24 hours or by scheduled activation); revoked |
| Entitlement administrator | Grant activated or failed; grant ended |

## Notes

- PAM adds and removes role bindings with time-based IAM Conditions in allow policies; activation and revocation follow standard access change propagation.
- Do not manually modify PAM-managed role bindings. With Terraform use non-authoritative IAM resources so PAM bindings are not overwritten.
- PAM uses only the organization-level service agent, even when set up for a folder or project; folder/project-level service agents are not created.
- For Pub/Sub notifications, route Cloud Audit Logs to Pub/Sub with a Logging sink.
- Do not include service agent roles in entitlements; be careful with roles that end in `setIamPolicy` or contain `iam.roles.update` because requesters can use them to give themselves lasting access.
- Source: https://docs.cloud.google.com/iam/docs/pam-overview
- Source: https://docs.cloud.google.com/iam/docs/pam-permissions-and-setup
- Source: https://docs.cloud.google.com/iam/docs/pam-audit-entitlement-events
- Retrieved 2026-11-14. Content CC BY 4.0.

## Related

- [pam-entitlements-and-settings.md](./pam-entitlements-and-settings.md)
- [pam-grants.md](./pam-grants.md)
