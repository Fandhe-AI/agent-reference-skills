---
source: https://docs.cloud.google.com/resource-manager/docs/organization-policy/restricting-service-accounts
---

# Restricting Service Account Usage

Organization policy constraints that limit how IAM service accounts, their keys, and related credentials can be created or used. Not retroactive.

## Signature / Usage

Boolean (legacy) policy:

```yaml
name: organizations/012345678901/policies/iam.disableServiceAccountCreation
spec:
  rules:
  - enforce: true
```

List (legacy) policy:

```yaml
name: organizations/012345678901/policies/iam.allowServiceAccountCredentialLifetimeExtension
spec:
  rules:
  - values:
      allowedValues:
      - SERVICE_ACCOUNT_ADDRESS
```

Older gcloud forms shown on the official page:

```
gcloud resource-manager org-policies enable-enforce \
    --organization 'ORGANIZATION_ID' \
    CONSTRAINT_NAME
```

```
disable-enforce
```

(`disable-enforce` is the same command as `enable-enforce` with that subcommand.)

```bash
gcloud resource-manager org-policies allow \
    CONSTRAINT_NAME \
    VALUE_1 [VALUE_N ...] \
    --organization=ORGANIZATION_ID \
```

`CONSTRAINT_NAME` example: `constraints/iam.allowServiceAccountCredentialLifetimeExtension`. Prefer `gcloud org-policies set-policy` (see `using-constraints.md`).

Error messages:

```
FAILED_PRECONDITION: Service account creation is not allowed on this project.
```

```
FAILED_PRECONDITION: Operation denied by org policy:
["constraints/iam.managed.disableServiceAccountApiKeyCreation":
"When enforced, disables creation of API Keys bound to service accounts."]
```

```
FAILED_PRECONDITION: Key creation is not allowed on this service account.
```

```
FAILED_PRECONDITION: Workload Identity is disabled by the organization
policy constraints/iam.disableWorkloadIdentityClusterCreation. Contact your
administrator to enable this feature.
```

## Options / Props

| Constraint | Kind | Effect |
|-----------|------|--------|
| `iam.managed.preventPrivilegedBasicRolesForDefaultServiceAccounts` | Managed boolean | Default service accounts can never be granted Editor or Owner (automatically or manually) |
| `iam.automaticIamGrantsForDefaultServiceAccounts` | Legacy boolean | Disables only the automatic Editor grant to default service accounts; later manual grants remain possible. Enforced by default for organizations created on/after May 3, 2024 |
| `iam.managed.disableServiceAccountCreation` / `iam.disableServiceAccountCreation` | Managed / legacy boolean | Disable creation of new service accounts; services that auto-create default service accounts (Compute Engine, GKE, App Engine, Dataflow) fail to enable |
| `iam.managed.disableServiceAccountApiKeyCreation` | Managed boolean | Disable API keys bound to service accounts; enforced by default |
| `iam.managed.disableServiceAccountKeyCreation` / `iam.disableServiceAccountKeyCreation` | Managed / legacy boolean | Disable new external service account keys and Cloud Storage HMAC keys; legacy one enforced by default for orgs created on/after May 3, 2024 |
| `iam.managed.disableServiceAccountKeyUpload` / `iam.disableServiceAccountKeyUpload` | Managed / legacy boolean | Disable uploading external public keys; legacy enforced by default for orgs on/after May 3, 2024 |
| `iam.disableCrossProjectServiceAccountUsage` | Legacy boolean | Prevent service accounts from being attached to resources in other projects |
| `iam.restrictCrossProjectServiceAccountLienRemoval` | Legacy boolean | Lien (added for cross-project service account use) removable only with `resourcemanager.projects.updateLiens` on the organization |
| `iam.disableWorkloadIdentityClusterCreation` | Legacy boolean | New GKE clusters must be created with Workload Identity disabled; existing clusters unaffected |
| `iam.allowServiceAccountCredentialLifetimeExtension` | Legacy list | Service accounts allowed access tokens up to 12 hours (default max 1 hour / 3,600 s) |
| `iam.serviceAccountKeyExpiryHours` | Legacy list (ALLOW only) | Expiry for newly created keys: `1h`, `8h`, `24h`, `168h`, `336h`, `720h`, `1440h`, `2160h`. Cannot be merged with a parent policy (replace or inherit only) |
| `iam.workloadIdentityPoolProviders` | Legacy list | Allowed external identity provider URIs: AWS `https://sts.amazonaws.com`, Azure `https://sts.windows.net/azure-tenant-id`, other OIDC issuer URI |
| `iam.workloadIdentityPoolAwsAccounts` | Legacy list | Allowed AWS account IDs (default: any) |
| `iam.serviceAccountKeyExposureResponse` | Legacy list (ALLOW only) | `DISABLE_KEY` (auto-disable exposed key; default from June 16, 2024) or `WAIT_FOR_ABUSE`. Cannot be merged with a parent policy (must replace) |

## Notes

- Disabling service account creation: workloads that need impersonation may lack a usable account; enable cross-project service account attachment and create service accounts in a centralized project. To enable services whose default service accounts cannot be created, temporarily remove the constraint, enable the services, create the accounts, then re-enforce.
- Setting a key expiry can cause a production outage; review the key-expiry best practices before setting it. Use the shortest acceptable expiry.
- Exposed key detection is best-effort (not guaranteed). `DISABLE_KEY` writes Cloud Audit Logs (disable action by `gcp-compromised-key-response@system.gserviceaccount.com`), sets `extendedStatus.value` on the key, and notifies project owners and security contacts. Keys exposed between January 16 and June 16, 2024 were logged retroactively and not auto-disabled: rotate them. `WAIT_FOR_ABUSE` raises the risk of misuse.
- Tags can include or exclude tagged service accounts from enforcement, except `iam.disableCrossProjectServiceAccountUsage` (enforced at project level, so SA tags are not evaluated).
- Console: Organization policies > constraint > Manage policy > Override parent's policy > Add a rule > Enforcement On (boolean) or Policy type Allow + custom values (list; choose Merge with parent or Replace).
- Source: https://docs.cloud.google.com/resource-manager/docs/organization-policy/restricting-service-accounts
- Retrieved 2026-11-14. Content is CC BY 4.0; code examples are Apache 2.0.

## Related

- [constraints-reference.md](./constraints-reference.md)
- [using-constraints.md](./using-constraints.md)
- [tags-condition.md](./tags-condition.md)
- gcp-security (Secret Manager, KMS, workload identity)
