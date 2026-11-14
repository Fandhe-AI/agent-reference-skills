---
source: https://docs.cloud.google.com/iam/docs/service-account-overview
---

# Service accounts: overview, types, and lifecycle considerations

What service accounts are, the three types (user-managed, default, service agents), principal identifiers for service account sets, and lifecycle guidance.

## Signature / Usage

A service account is a special kind of account used by an application or compute workload (for example a Compute Engine instance) rather than a person. It is identified by its unique email address:

```text
service-account-name@project-id.iam.gserviceaccount.com
```

Applications authenticate as a service account by either obtaining short-lived credentials (automatic for attached service accounts and `--impersonate-service-account`) or using a service account key to sign a JWT and exchange it for an access token.

### Principal identifiers for service accounts

| Principal type | Principal identifier |
|---|---|
| An individual service account | `serviceAccount:SA_EMAIL_ADDRESS` (example: `serviceAccount:my-service-account@my-project.iam.gserviceaccount.com`) |
| All service accounts in a project | `principalSet://cloudresourcemanager.googleapis.com/projects/PROJECT_NUMBER/type/ServiceAccount` |
| All service accounts in all projects in a folder | `principalSet://cloudresourcemanager.googleapis.com/folders/FOLDER_NUMBER/type/ServiceAccount` |
| All service accounts in all projects in an organization | `principalSet://cloudresourcemanager.googleapis.com/organizations/ORGANIZATION_NUMBER/type/ServiceAccount` |

### Default service account emails

| Service | Service account name | Email address |
|---|---|---|
| App Engine (and services that use it) | App Engine default service account | `project-id@appspot.gserviceaccount.com` |
| Compute Engine (and services that use it) | Compute Engine default service account | `project-number-compute@developer.gserviceaccount.com` |

The Google APIs Service Agent uses `project-number@cloudservices.gserviceaccount.com`. The role manager service account `service-agent-manager@system.gserviceaccount.com` appears only in audit logs.

### serviceDelegationHistory in service agent audit logs

Some service agents (BigQuery Connection Service Agent, BigQuery Connection Delegation Service Agent) record who the agent acted for:

```json
{
  "protoPayload": {
    "@type": "type.googleapis.com/google.cloud.audit.AuditLog",
    "authenticationInfo": {
      "principalEmail": "bqcx-442188550395-jujw@gcp-sa-bigquery-condel.iam.gserviceaccount.com",
      "serviceDelegationHistory": {
        "originalPrincipal": "user:my-user@example.com",
        "serviceMetadata": [
          {
            "principalSubject": "serviceAccount:bqcx-442188550395-jujw@gcp-sa-bigquery-condel.iam.gserviceaccount.com",
            "serviceDomain": "bigquery.googleapis.com",
          }
        ]
      }
    }
  }
}
```

## Options / Props

### Types of service accounts

| Type | Description |
|---|---|
| User-managed | You create and manage them (update, disable, enable, delete, control access). Used as workload identities. |
| Default | User-managed accounts created automatically when you enable/use certain services (App Engine, Compute Engine). You manage them afterwards. |
| Service agents | Created and managed by Google Cloud so services can act on your behalf. Not created in your projects; cannot be accessed directly. |

### Service agent kinds

| Kind | Notes |
|---|---|
| Service-specific service agents | Act for one service; associated with a project, folder, organization, or a service-specific resource (e.g. a Cloud SQL instance). Email contains the numeric ID of the project/folder/organization, or a numeric project ID plus a unique identifier. |
| Google APIs Service Agent | Runs internal processes, mainly for Compute Engine. Default role `roles/compute.instanceGroupManagerServiceAgent`; may also get `roles/dataproc.serviceAgent` (Dataproc API), `roles/cloudscheduler.serviceAgent` (Cloud Scheduler API), or `roles/editor` (project created before April 2026, or Cloud Deployment Manager API enabled). |
| Role manager for service agents | `service-agent-manager@system.gserviceaccount.com`; manages roles granted to other service agents; visible only in audit logs. |

### Where service accounts live and quotas

- Each service account lives in one project and cannot be moved afterwards.
- Options: same project as resources (simple, harder to track), or centralize in separate projects (requires extra setup to attach cross-project; the API for the accessed resource usually must be enabled in both projects).
- Quota: search **Service Account Count** in the project quotas page.

## Notes

- Service accounts are both principals (grant them roles, e.g. `roles/storage.objectViewer` on a bucket) and resources (grant others roles on them, e.g. `roles/iam.serviceAccountUser`, `roles/iam.serviceAccountTokenCreator`, `roles/iam.serviceAccountAdmin`).
- Service accounts do not belong to your Google Workspace domain; they cannot own Workspace assets (they can create assets in shared drives). With domain-wide delegation, assets are created in the domain because calls are authorized as the impersonated user.
- Starting August 27, 2026, Google temporarily restricts new access to the Gemini API from service accounts; existing ones keep working. Use authentication-enabled API keys for new integrations (this skill does not cover the Gemini API; see `google-gemini-api`).
- Warning: default Compute Engine and App Engine service accounts may be granted `roles/editor` on creation. Enforce `iam.automaticIamGrantsForDefaultServiceAccounts` (enforced by default for organizations created after May 3, 2024) and replace Editor with narrower roles; use Policy Simulator and role recommendations (bindings older than 90 days) to do it safely.
- Warning: do not revoke roles granted to service agents unless a role recommendation suggests it; services will stop working. A custom organization policy can prevent revoking service agent roles.
- Service agents created on request (before first use of a service) are not automatically granted their usual roles; you must grant them. Concurrent policy change errors during simultaneous creation are retried automatically by the Service Agent Manager.
- When denying permissions to principal sets that include service agents (for example `principalSet://goog/public:all`), add your service agents as exceptions using the project/folder/organization service agent principal set.
- Service agents are hidden on the console IAM page unless **Include Google-provided role grants** is checked. Creation time and email format of default service accounts and service agents are subject to change.
- Prevent creation of service accounts with the `constraints/iam.disableServiceAccountCreation` organization policy constraint. Enforcing it can stop services from creating default service accounts; mitigate with cross-project attachment of centrally created service accounts. Workload Identity Federation features may still require service accounts; use constraints to block federation from all identity providers if unused.
- Keep track of accounts using the display name (purpose / contact), updated via `serviceAccounts.update()`.
- Compute Engine: change an instance's service account with `instances.setServiceAccount`; access scopes must be configured in addition to IAM roles; avoid deleting accounts still used by running instances.
- Unused accounts: find via service account insights (no authentication in 90 days), Activity Analyzer, and service account usage metrics. Security Command Center Premium Event Threat Detection reports dormant accounts (inactive more than 180 days). Disable first, then delete once sure.
- Recreating a deleted service account with the same name does not restore old bindings or resource attachments: bindings reference a unique internal ID, and deleted bindings show a `deleted:` prefix. Prefer unique names, or undelete. For Compute Engine, change the attached service account; for other resources, recreate the resource and attach the new account.
- Service account keys are a security risk; prefer alternatives (see the authentication decision tree in the Google Cloud authentication docs). Validate keys acquired from external sources.
- Source: https://docs.cloud.google.com/iam/docs/service-account-overview
- Source: https://docs.cloud.google.com/iam/docs/service-account-types
- Retrieved 2026-11-14. Content CC BY 4.0; code samples Apache 2.0.

## Related

- [service-accounts-permissions-actas.md](./service-accounts-permissions-actas.md)
- [service-accounts-impersonation-credentials.md](./service-accounts-impersonation-credentials.md)
- gcp-security (KMS / Secret Manager / VPC Service Controls / IAP) and gcp-client-libraries (ADC code) cover adjacent topics.
