---
source: https://docs.cloud.google.com/iam/docs/workload-download-cred-and-grant-access
---

# Workload Identity Federation: grant access and download credential config

Allow an external workload to access Google Cloud via direct resource access (recommended) or service account impersonation, then download the credential configuration used as application default credentials (ADC).

## Signature / Usage

Principal identifiers (use the project number, not the project ID):

```
principal://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/subject/SUBJECT
principalSet://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/group/GROUP
principalSet://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/attribute.ATTRIBUTE_NAME/ATTRIBUTE_VALUE
principalSet://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/*
```

The last form (whole pool) is listed for service account impersonation.

### Direct resource access

```
gcloud projects describe $(gcloud config get-value core/project) --format=value\(projectNumber\)
```

```
gcloud storage buckets add-iam-policy-binding BUCKET_ID \
    --role=roles/storage.objectViewer \
    --member="principal://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/subject/SUBJECT"
```

```
gcloud storage buckets add-iam-policy-binding BUCKET_ID \
    --role=roles/storage.objectViewer \
    --member="principalSet://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/group/GROUP"
```

```
gcloud storage buckets add-iam-policy-binding BUCKET_ID \
    --role=roles/storage.objectViewer \
    --member="principalSet://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/attribute.ATTRIBUTE_NAME/ATTRIBUTE_VALUE"
```

### Service account impersonation

Enable the IAM, Security Token Service, and Service Account Credentials APIs (`iam.googleapis.com`, `sts.googleapis.com`, `iamcredentials.googleapis.com`), create a dedicated service account for the workload, grant it access to target resources, then:

```
gcloud iam service-accounts add-iam-policy-binding SERVICE_ACCOUNT_EMAIL \
    --role=roles/iam.workloadIdentityUser \
    --member="principal://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/subject/SUBJECT"
```

```
gcloud iam service-accounts add-iam-policy-binding SERVICE_ACCOUNT_EMAIL \
    --role=roles/iam.workloadIdentityUser \
    --member="principalSet://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/group/GROUP"
```

```
gcloud iam service-accounts add-iam-policy-binding SERVICE_ACCOUNT_EMAIL \
    --role=roles/iam.workloadIdentityUser \
    --member="principalSet://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_ID/attribute.ATTRIBUTE_NAME/ATTRIBUTE_VALUE"
```

### Download the configuration (console)

Workload Identity Pools page > select pool > **Grant access** > **Grant access using federated identities (Recommended)** > **Download config** > choose Provider, OIDC token path or SAML assertion path, and Format type > **Download configuration**; note the saved path.

## Options / Props

| Name | Description |
|------|-------------|
| `BUCKET_ID` | Bucket to grant access on (any resource supporting allow policies works). |
| `PROJECT_NUMBER` | Project number of the project containing the workload identity pool. |
| `POOL_ID` | Workload identity pool ID. |
| `SUBJECT` | Value mapped to `google.subject`. |
| `GROUP` | Value mapped to `google.groups`. |
| `ATTRIBUTE_NAME` / `ATTRIBUTE_VALUE` | Custom attribute from the attribute mapping. |
| `SERVICE_ACCOUNT_EMAIL` | Service account the federated identity impersonates. |

## Notes

- Recommended: direct resource access (principal is the federated identity). Use service account impersonation only when the called API has Google Cloud API limitations for federated identities.
- Use a dedicated service account per workload. The service account may be in a different project than the pool; service accounts from other projects do not appear under "Connected service accounts" in the pool, so grant `roles/iam.workloadIdentityUser` from the **Service Accounts** page (**Manage access** > **Add principal**).
- Prefer narrow principals (subject or attribute) over the whole-pool `/*` principal, which lets every identity in the pool impersonate the service account.
- The example grants `roles/storage.objectViewer`; choose the least-privileged role for your workload.
- Source: https://docs.cloud.google.com/iam/docs/workload-download-cred-and-grant-access (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [OIDC and SAML providers](./wif-oidc-saml-providers.md)
- [Other clouds and Kubernetes](./wif-other-clouds-and-kubernetes.md)
