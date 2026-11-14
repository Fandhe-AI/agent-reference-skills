---
source: https://docs.cloud.google.com/iam/docs/service-account-permissions
---

# Service account roles, permissions, and act-as enforcement

Roles that let principals impersonate or attach service accounts, permissions needed per scenario, and how to enforce the `iam.serviceAccounts.actAs` check for legacy services.

## Signature / Usage

Grant impersonation or attachment on a specific service account (see the service account access-management docs for the commands); the permission model:

```text
Attach SA to a resource      -> iam.serviceAccounts.actAs (e.g. roles/iam.serviceAccountUser) + permission to create the resource
Impersonate (access token)   -> iam.serviceAccounts.getAccessToken (roles/iam.serviceAccountTokenCreator)
Sign blob / JWT              -> iam.serviceAccounts.signBlob / iam.serviceAccounts.signJwt
Delegation chain A -> B -> C -> iam.serviceAccounts.implicitDelegation on B for A; getAccessToken on C for B
OIDC ID token only           -> iam.serviceAccounts.getOpenIdToken (roles/iam.serviceAccountOpenIdTokenCreator)
Create SA key                -> iam.serviceAccountKeys.create (roles/editor, roles/iam.serviceAccountKeyAdmin)
```

Org policy constraints to enforce actAs checks for services with legacy behavior:

```text
constraints/appengine.enforceServiceAccountActAsCheck
constraints/composer.enforceServiceAccountActAsCheck
constraints/dataflow.enforceComputeDefaultServiceAccountCheck
constraints/dataproc.enforceComputeDefaultServiceAccountCheck   (also covers Cloud Data Fusion)
```

## Options / Props

### Roles

| Role | ID | Purpose |
|---|---|---|
| Service Account User | `roles/iam.serviceAccountUser` | Attach a service account to a resource. Does not allow creating short-lived credentials or `--impersonate-service-account`. |
| Service Account Token Creator | `roles/iam.serviceAccountTokenCreator` | Create OAuth 2.0 access tokens, OIDC ID tokens, signed JWTs/blobs; use `--impersonate-service-account`. |
| Service Account OpenID Connect Identity Token Creator | `roles/iam.serviceAccountOpenIdTokenCreator` | Only `iam.serviceAccounts.getOpenIdToken`. |
| Workload Identity User | `roles/iam.workloadIdentityUser` | Impersonate service accounts from GKE workloads (`getAccessToken`, `getOpenIdToken`). |

Token Creator permissions: `iam.serviceAccounts.getAccessToken`, `iam.serviceAccounts.getOpenIdToken`, `iam.serviceAccounts.implicitDelegation`, `iam.serviceAccounts.signBlob`, `iam.serviceAccounts.signJwt`.

### Permissions that enable other capabilities

| Permission | Enabled operations |
|---|---|
| `iam.serviceAccounts.getAccessToken` | Get an access token for the service account |
| `iam.serviceAccounts.getOpenIdToken` | Get an ID token for the service account |
| `iam.serviceAccounts.signJwt` | Sign a JWT; get an access or ID token via a JWT bearer token |
| `iam.serviceAccounts.signBlob` | Sign any blob including JWTs; get an access or ID token via a JWT bearer token |

### Legacy act-as behavior by service

| Service | Legacy behavior |
|---|---|
| App Engine | Users could deploy apps using the default App Engine service account without permission to impersonate it |
| Managed Airflow (Composer) | Users could attach any project service account to an environment without impersonation permission |
| Cloud Data Fusion, Dataflow, Dataproc | Users could attach the Compute Engine default service account without impersonation permission |
| Dataform | Users could attach a service account and run workflow invocations without impersonation permission (strict act-as mode is now enforced globally) |

## Notes

- Attaching a service account requires `iam.serviceAccounts.actAs` plus permission to create the resource. `signBlob()` signs arbitrary payloads (for example Cloud Storage signed URLs); `signJwt()` signs only well-formed JWTs. The Google-managed private key is always held in escrow.
- Caution: impersonation grants access to everything the service account can access; be careful with highly privileged accounts (Compute Engine / App Engine default accounts, which get `roles/editor`). Understand which capabilities a permission effectively enables before adding it to custom roles.
- OIDC ID tokens from the Google OIDC provider are not directly accepted by most Google APIs without additional identity federation.
- Warning: external key material (`iam.serviceAccountKeys.create`) gives full access to all of the service account's resources to anyone holding it; rotate keys.
- Enforcement steps per service: (1) optionally downscope the default account with role recommendations; (2) grant users a role containing `iam.serviceAccounts.actAs` (for example Service Account User) on the project or the specific account; (3) enable the constraint. The constraints are visible only in environments with legacy behavior; if you do not see them they are already enforced. The permission discrepancy finder and the boolean org policy enforcer (GoogleCloudPlatform/professional-services) help at scale.
- Managed Airflow: identify each environment's service account (Composer environments > Environment configuration > Service account), confirm least privilege, then enforce.
- Dataflow / Dataproc / Data Fusion: to stop using the Compute Engine default account, create a new service account with least-privilege roles, grant users actAs on it, enable both constraints, and use the new account for new resources. Data Fusion custom service accounts are Enterprise-only.
- Dataform: grant Service Account User on the specific service account to users creating workflow invocations. For a custom service account grant the default Dataform service agent Service Account Token Creator (all repository operations) and, only when using workflow configurations, Service Account User. Audit with Cloud Asset Inventory over `dataform.Repository` and `dataform.WorkflowConfig`, inspecting `resource.data.serviceAccount`.
- Best practices: audit service accounts, keys and their allow policies with the IAM API; disable or delete unneeded keys; remove users who do not need to manage or use accounts; give service accounts minimal permissions.
- Source: https://docs.cloud.google.com/iam/docs/service-account-permissions
- Source: https://docs.cloud.google.com/iam/docs/service-accounts-actas
- Retrieved 2026-11-14. Content CC BY 4.0; code samples Apache 2.0.

## Related

- [service-accounts-overview-types.md](./service-accounts-overview-types.md)
- [service-accounts-impersonation-credentials.md](./service-accounts-impersonation-credentials.md)
- gcp-cli covers gcloud generally.
