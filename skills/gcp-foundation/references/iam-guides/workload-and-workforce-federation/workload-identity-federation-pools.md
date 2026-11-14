---
source: https://docs.cloud.google.com/iam/docs/manage-workload-identity-pools-providers
---

# Managing Workload Identity Pools and Providers

Create, list, get, update, delete, and undelete workload identity pools and their providers (AWS or OIDC/Azure), and apply the recommended organization policy constraints.

## Signature / Usage

Pools and providers are managed through console, gcloud, or REST. The documented gcloud commands:

```bash
gcloud iam workload-identity-pools create
gcloud iam workload-identity-pools list
gcloud iam workload-identity-pools update
gcloud iam workload-identity-pools delete
gcloud iam workload-identity-pools undelete
gcloud iam workload-identity-pools providers create-aws
gcloud iam workload-identity-pools providers create-oidc
gcloud iam workload-identity-pools providers update-aws
gcloud iam workload-identity-pools providers update-oidc
gcloud iam workload-identity-pools providers delete
gcloud iam workload-identity-pools providers undelete
```

REST methods: `projects.locations.workloadIdentityPools.{create,list,get,patch,delete,undelete}` and `projects.locations.workloadIdentityPools.providers.{create,list,get,patch,delete,undelete}`.

Restrict which IdPs may be federated (organization policy list constraint; applies only to creating/updating IdPs):

```bash
gcloud resource-manager org-policies allow constraints/iam.workloadIdentityPoolProviders \
     https://sts.amazonaws.com --organization=ORGANIZATION_NUMBER
```

```bash
gcloud resource-manager org-policies allow constraints/iam.workloadIdentityPoolAwsAccounts \
    ACCOUNT_ID --organization=ORGANIZATION_NUMBER
```

```bash
gcloud resource-manager org-policies allow constraints/iam.workloadIdentityPoolProviders \
     https://sts.windows.net/AZURE_TENANT_ID --organization=ORGANIZATION_NUMBER
```

Allow SAML (public keys are uploaded with the provider; use a centrally managed project):

```bash
gcloud resource-manager org-policies allow constraints/iam.workloadIdentityPoolProviders \
     KEY_UPLOAD --organization=ORGANIZATION_NUMBER
```

Block federation from all providers:

```yaml
constraint: constraints/iam.workloadIdentityPoolProviders
listPolicy:
  allValues: DENY
```

```bash
gcloud resource-manager org-policies set-policy FILE_NAME.yaml \
    --organization=ORGANIZATION_NUMBER
```

Disable service account key creation and upload when you never need keys:

```bash
gcloud resource-manager org-policies enable-enforce \
    constraints/iam.disableServiceAccountKeyCreation \
    --organization=ORGANIZATION_NUMBER
gcloud resource-manager org-policies enable-enforce \
    constraints/iam.disableServiceAccountKeyUpload \
    --organization=ORGANIZATION_NUMBER
```

## Options / Props

| Item | Detail |
|---|---|
| View pools/providers | `roles/iam.workloadIdentityPoolViewer` on the project |
| Manage pools/providers | `roles/iam.workloadIdentityPoolAdmin` |
| Pool permissions | `iam.googleapis.com/workloadIdentityPools.{get,list,create,update,delete,undelete}` |
| Provider permissions | `iam.googleapis.com/workloadIdentityPoolProviders.{get,list,create,update,delete,undelete}` |
| Provider types | AWS (account ID; default mapping OK) and OIDC (issuer URL; Azure uses `https://sts.windows.net/AZURE_TENANT_ID`) |
| OIDC mapping | Recommended: map `google.subject` to `assertion.sub` |
| Attribute condition | Optional CEL expression selecting which identities can authenticate |
| Pool/provider ID | Cannot be changed later; prefix `gcp-` is reserved |
| Pool state | Can be created disabled, enabled/disabled, display name and description editable |

## Notes

- Deleting a pool also deletes its providers and the identities lose access; consider disabling first. Pools and providers can be undeleted for 30 days; names cannot be reused until permanent deletion.
- The allowed-IdP constraint does not affect providers configured before it was enabled.
- SAML restrictions by entity ID give only an illusion of security; permit SAML pools only in a centrally managed project.
- If your organization was created on or after May 3, 2024, the key creation and upload constraints are enforced by default.
- Monitor authentication events with Cloud Monitoring IAM metrics.
- Federation support varies by product (launch stage and limitations per Google Cloud product). For workforce federation the console (federated), gcloud, and APIs each have per-product limitations; for workload federation the limits apply to gcloud and APIs. Check the official federated-identity supported-products list for a specific product before relying on it.
- Source: https://docs.cloud.google.com/iam/docs/manage-workload-identity-pools-providers
- Source: https://docs.cloud.google.com/iam/docs/federated-identity-supported-services
- Retrieved 2026-11-14. Content CC BY 4.0; code samples Apache 2.0.

## Related

- [workforce-identity-federation-pools.md](./workforce-identity-federation-pools.md)
- [managed-workload-identity.md](./managed-workload-identity.md)
- gcp-security (VPC Service Controls and Secret Manager are separate)
