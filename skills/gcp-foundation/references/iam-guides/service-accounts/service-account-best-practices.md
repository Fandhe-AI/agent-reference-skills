---
source: https://docs.cloud.google.com/iam/docs/best-practices-service-accounts
---

# Service Account Best Practices

How to choose, manage, limit, and protect service accounts. Service accounts are both principals (limit their privileges) and resources (protect them from compromise).

## Signature / Usage

### Choosing an authentication method (ADC-aware tools, gcloud, client libraries, REST)

1. Single-user development environment (workstation, Cloud Shell, VDI)? If the use case does not require a service account, authenticate with user credentials; otherwise impersonate a service account with user credentials.
2. Running in Google Cloud on GKE: use Workload Identity Federation for GKE. Other Google Cloud resources: attach a service account to the resource.
3. Outside Google Cloud with an external IdP that supports workload identity federation: configure Workload Identity Federation. Otherwise: create a service account key (last resort).

### Permissions that let a user act as or impersonate a service account

```text
iam.serviceAccounts.getAccessToken
iam.serviceAccounts.getOpenIdToken
iam.serviceAccounts.actAs
iam.serviceAccounts.implicitDelegation
iam.serviceAccounts.signBlob
iam.serviceAccounts.signJwt
iam.serviceAccountKeys.create
deploymentmanager.deployments.create
cloudbuild.builds.create
```

Roles containing some of them include Owner, Editor, Service Account User (`roles/iam.serviceAccountUser`), Service Account Token Creator (`roles/iam.serviceAccountTokenCreator`), Service Account Key Admin (`roles/iam.serviceAccountKeyAdmin`), Service Account Admin (`roles/iam.serviceAccountAdmin`), Workload Identity User (`roles/iam.workloadIdentityUser`), Deployment Manager Editor, Cloud Build Editor. `iam.serviceAccounts.setIamPolicy` (Owner, Security Admin, Service Account Admin) gives full control over a service account.

### Organization policy constraints

```text
constraints/iam.automaticIamGrantsForDefaultServiceAccounts
Disable service account key creation
Disable service account key upload
```

### Naming convention prefixes

```text
vm-        service accounts attached to a VM instance
wlifgke-   Workload Identity Federation for GKE
wlif-      Workload Identity Federation
onprem-    on-premises applications
```

Example: `vm-travelexpenses@` for a VM running a travel expenses application.

## Options / Props

| Practice | Guidance |
|----------|----------|
| Manage as resources | Treat a service account and its associated resource (VM, app) as one unit with the same lifecycle and processes. |
| Single purpose | One service account per application; avoid default service accounts (Editor on the project by default). Shared accounts blur audit logs, lifecycles, and access. |
| Naming and docs | Prefix by usage, embed app name, use description for contact and docs; no sensitive terms in the email. |
| Unused accounts | Disable when unused; use Activity Analyzer / service account insights (unused 90 days). Disable before deleting: delete + recreate with the same name gives a new identity and loses IAM bindings; disable/re-enable keeps them. Default service accounts cannot be recreated after deletion. |
| Default account grants | Enable `constraints/iam.automaticIamGrantsForDefaultServiceAccounts`; it does not remove Editor from existing default accounts. Services use service agents, not default accounts, to access your resources. |
| Access scopes | Coarse-grained (e.g. `devstorage.read_only` cannot target a bucket). Use dedicated service accounts and fine-grained allow policies instead; use service account principal sets for shared requirements. |
| Domain-wide delegation | Lets a service account impersonate any user in Cloud Identity / Workspace, including super-admins. Avoid; if needed, restrict OAuth scopes. Prefer a service account or OAuth consent flow. |
| Temporary privilege elevation | Dedicated per-component service accounts plus a supervisor with Service Account Token Creator on them; a token broker issues short-lived tokens. |
| Credential Access Boundaries | Downscope access tokens passed to other components; downscoping is supported only by Cloud Storage. |
| Role recommendations | Identify unused permissions and adjust allow policies. |
| Lateral movement insights | Find roles allowing a service account in one project to impersonate one in another; attaching a service account across projects is not lateral movement. |

### Privilege-escalation protections

- Do not let users impersonate service accounts more privileged than themselves, and do not let them change the allow policy of such accounts. Ask which resources inside and outside the project the user could reach.
- Do not let users create or upload service account keys; apply the key creation/upload constraints.
- Do not grant service account roles (for example Token Creator) at project or folder level; manage access per service account.
- Do not run less-protected code (user scripts, remote repos, startup scripts from buckets, VM Manager guest policies) on resources with a privileged service account attached; any code can read tokens from the metadata server.
- Limit shell access to VMs with privileged accounts: OS Login requires `iam.serviceAccounts.actAs` on the attached account; metadata-based SSH keys, Windows credentials, custom PAM, and Active Directory join are not rechecked after the first login. Consider IAP TCP forwarding with `roles/iap.tunnelResourceAccessor` only for users allowed to act as the account.
- Limit metadata server access to selected users and processes.

## Notes

- Service accounts have no password and cannot sign in with a browser; they are specific to Google Cloud.
- Abuse patterns: privilege escalation, spoofing, non-repudiation, information disclosure.
- If your organization was created on or after May 3, 2024, the default-service-account grant, key creation, and key upload constraints are enforced by default.
- Editor and Owner on a project include permissions that make key creation and impersonation possible; avoid granting them.
- Source: https://docs.cloud.google.com/iam/docs/best-practices-service-accounts (retrieved 2026-11-14; CC BY 4.0)

## Related

- [service-account-key-best-practices.md](./service-account-key-best-practices.md)
- [short-lived-credentials.md](../federation-credentials/short-lived-credentials.md)
- Other skill: gcp-security (VPC Service Controls, Secret Manager, IAP)
