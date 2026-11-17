---
source: https://docs.cloud.google.com/compute/docs/access/service-accounts
---

# Service accounts

How Compute Engine uses user-managed service accounts and Google-managed service agents, how authorization is the intersection of IAM roles and access scopes, and the default scopes and the `cloud-platform` best practice.

## Signature / Usage

### Compute Engine default service account email

```text
PROJECT_NUMBER-compute@developer.gserviceaccount.com
```

### Google APIs Service Agent email

```text
PROJECT_NUMBER@cloudservices.gserviceaccount.com
```

### Compute Engine Service Agent email

```text
service-PROJECT_NUMBER@compute-system.iam.gserviceaccount.com
```

### Best-practice access scope

```text
https://www.googleapis.com/auth/cloud-platform
```

### Attach a custom service account with the full scope

Snippet taken from https://docs.cloud.google.com/compute/docs/access/create-enable-service-accounts-for-instances:

```bash
gcloud compute instances create VM_NAME \
    --service-account=SERVICE_ACCOUNT_EMAIL \
    --scopes=https://www.googleapis.com/auth/cloud-platform
```

## Options / Props

### Service account kinds

| Kind | Attachable to a VM | Notes |
|---|---|---|
| New user-managed service account | Yes | Created with IAM; grant roles, then attach. |
| Compute Engine default service account | Yes | Created when the Compute Engine API is enabled; attached by default to VMs created with gcloud or the console unless you pick another or none. |
| Google APIs Service Agent | No | Runs internal Google processes; owned by Google, not listed under Service Accounts in the console; by default has the project editor role and is listed under IAM. MIGs and autoscaling use its credentials. |
| Compute Engine Service Agent | No | Used by Compute Engine to access the user-managed service account on VMs; hidden in IAM unless "Include Google-provided role grants" is selected; by default has `compute.serviceAgent` on the project. |

### Default access scopes of a new instance

| Scope | Access |
|---|---|
| `https://www.googleapis.com/auth/devstorage.read_only` | Read-only Cloud Storage |
| `https://www.googleapis.com/auth/logging.write` | Write Compute Engine logs |
| `https://www.googleapis.com/auth/monitoring.write` | Publish metric data |
| `https://www.googleapis.com/auth/service.management.readonly` | Read-only Service Management for Cloud Endpoints (Alpha) |
| `https://www.googleapis.com/auth/servicecontrol` | Service Control for Cloud Endpoints (Alpha) |
| `https://www.googleapis.com/auth/trace.append` | Write trace data to Cloud Trace |

### Example scopes

| Scope | Access |
|---|---|
| `https://www.googleapis.com/auth/cloud-platform` | View and manage data across Google Cloud services in the project |
| `https://www.googleapis.com/auth/compute` | Full control of Compute Engine methods |
| `https://www.googleapis.com/auth/compute.readonly` | Read-only Compute Engine methods |
| `https://www.googleapis.com/auth/devstorage.read_only` | Read-only Cloud Storage |
| `https://www.googleapis.com/auth/logging.write` | Write Compute Engine logs |

## Notes

- A VM has at most one attached service account; one service account can be attached to many VMs, and changing its roles affects all of them. Attaching a new one replaces the previous one.
- Authorization needs both the IAM roles granted to the service account and the instance access scopes. Access scopes are the legacy method, apply per VM for its life, define default OAuth scopes for gcloud CLI and client library requests, and do not apply to gRPC calls. They have no effect unless the related API is enabled on the service account's project. Best practice: set `cloud-platform` and restrict with IAM roles.
- Example from the source: with `cloud-platform` and roles `roles/compute.instanceAdmin.v1`, `roles/storage.objectViewer`, `roles/compute.networkAdmin`, only those permissions apply; with the `devstorage.read_only` scope, `roles/storage.objectAdmin` does not let gcloud or client libraries manage objects by default.
- Default service account: depending on organization policy it may be granted the Editor role automatically. The source strongly recommends enforcing the `iam.automaticIamGrantsForDefaultServiceAccounts` organization policy constraint (enforced by default if your organization was created after May 3, 2024) and replacing Editor with narrower roles, checking the impact with Policy Simulator first. Prefer a dedicated user-managed service account with only the roles the workload needs, not the default account with broad roles.
- Deleting or disabling the default service account can break applications; a deleted account may be recoverable within 30 days (otherwise see https://docs.cloud.google.com/compute/docs/troubleshooting/troubleshooting-default-service-accounts).
- Do not change the roles of the Google APIs Service Agent unless a role recommendation suggests it (revoking breaks MIGs and autoscaling); avoid changing the Compute Engine Service Agent roles too (it can cause outages inside VMs).
- You can also write firewall rules that match traffic by service account; firewall rules themselves are in `gcp-networking`.
- Distance line: service accounts for Compute Engine VMs; service accounts and IAM in general are in `gcp-foundation`.
- Source: https://docs.cloud.google.com/compute/docs/access/service-accounts (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/compute/docs/access/create-enable-service-accounts-for-instances (retrieved 2026-11-17).

## Related

- [create-enable-service-accounts-for-instances.md](./create-enable-service-accounts-for-instances.md)
- [iam.md](./iam.md)
- [access.md](./access.md)
