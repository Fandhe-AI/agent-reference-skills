---
source: https://docs.cloud.google.com/docs/terraform/authentication
---

# Authenticate to Google Cloud when using Terraform

Application Default Credentials (ADC) is the recommended way to authenticate Terraform to Google Cloud; Terraform then runs in development or production without changing how it authenticates.

## Signature / Usage

### Local development with a user account

```bash
gcloud init
```

```bash
gcloud auth application-default login
```

Not needed in Cloud Shell. If you use an external identity provider (IdP), first sign in to the gcloud CLI with your federated identity.

### Local development with service account impersonation

Requires the Service Account Token Creator role (`roles/iam.serviceAccountTokenCreator`) on the service account you impersonate.

```bash
gcloud auth application-default login --impersonate-service-account SERVICE_ACCT_EMAIL
```

To let users share one primary authentication source with a variable service account per environment, set `impersonate_service_account`:

```hcl
provider "google" {
  impersonate_service_account = "SERVICE_ACCT_EMAIL"
}
```

### Running on Google Cloud: attach a user-managed service account

Requires `roles/iam.serviceAccountCreator` and `roles/resourcemanager.projectIamAdmin`.

```bash
gcloud iam service-accounts create SERVICE_ACCOUNT_NAME
```

```bash
gcloud projects add-iam-policy-binding PROJECT_ID --member="serviceAccount:SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com" --role=ROLE
```

Grant the principal that will attach the service account to other resources:

```bash
gcloud iam service-accounts add-iam-policy-binding SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com --member="user:USER_EMAIL" --role=roles/iam.serviceAccountUser
```

## Options / Props

| Environment | Method |
|-------------|--------|
| Local development | User account ADC (`gcloud auth application-default login`), or service account impersonation |
| On Google Cloud (Cloud Shell) | Credentials from sign-in |
| On Google Cloud (Compute Engine, App Engine, Cloud Run functions) | Attached user-managed service account (preferred for production) |
| On-premises or another cloud | Workload Identity Federation (preferred, via a credential configuration file and `GOOGLE_APPLICATION_CREDENTIALS`); service account key as a fallback |
| Cloud Storage backend | Any of the methods above |

## Notes

- Default service accounts are not recommended: by default they are highly privileged, violating least privilege.
- In production do not grant the Owner, Editor, or Viewer roles; use a predefined or custom role.
- Service account keys are a security risk if not managed correctly; the source says to choose a more secure alternative whenever possible (Workload Identity Federation is described as more secure than creating a key) and, if you must use a key, to follow "Best practices for managing service account keys". Key creation might be disabled for your organization. A key acquired from an external source must be validated before use.
- To create a key and make it available to ADC, the source refers to "Creating a service account key" (https://docs.cloud.google.com/iam/docs/keys-create-delete#creating).
- Workload Identity Federation setup: "Workload Identity Federation with other clouds" in the IAM documentation (in `gcp-foundation`).
- Source: https://docs.cloud.google.com/docs/terraform/authentication (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [install-configure-terraform.md](./install-configure-terraform.md)
- [store-state.md](./store-state.md)
- [basic-commands.md](./basic-commands.md)
