---
source: https://docs.cloud.google.com/batch/docs/authentication
---

# Authenticate to Batch

How to authenticate to Batch programmatically with the gcloud CLI or REST, for local development, on Google Cloud, and on-premises or other clouds. Authorization uses IAM.

## Signature / Usage

### Local development: ADC for client libraries

```bash
gcloud init
```

```bash
gcloud auth application-default login
```

Not needed in Cloud Shell.

### Local development: REST from the command line

Replace `PROJECT_ID` with your Google Cloud project ID.

```bash
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://iam.googleapis.com/v1/projects/PROJECT_ID/serviceAccounts"
```

### Service account impersonation

Needs `iam.serviceAccounts.getAccessToken` (Service Account Token Creator, `roles/iam.serviceAccountTokenCreator`).

```bash
gcloud config set auth/impersonate_service_account SERVICE_ACCT_EMAIL
```

Local ADC file with impersonation (supported only for Go, Java, Node.js and Python client libraries):

```bash
gcloud auth application-default login --impersonate-service-account=SERVICE_ACCT_EMAIL
```

### On Google Cloud: attach a service account

Needs Create Service Accounts (`roles/iam.serviceAccountCreator`) and Project IAM Admin (`roles/resourcemanager.projectIamAdmin`).

```bash
gcloud iam service-accounts create SERVICE_ACCOUNT_NAME
```

```bash
gcloud projects add-iam-policy-binding PROJECT_ID --member="serviceAccount:SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com" --role=ROLE
```

Let the principal that attaches the service account act as it (`USER_EMAIL` is a Google Account email):

```bash
gcloud iam service-accounts add-iam-policy-binding SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com --member="user:USER_EMAIL" --role=roles/iam.serviceAccountUser
```

Create the compute resource with the service account attached:

```bash
gcloud compute instances create INSTANCE_NAME --zone=ZONE --service-account=SERVICE_ACCOUNT_EMAIL
```

## Options / Props

| Environment | Method |
|---|---|
| Local development | User credentials (ADC for client libraries; gcloud credentials for REST), or service account impersonation |
| On Google Cloud | Service account attached to the compute resource (preferred). For most services it must be attached at creation; Compute Engine allows attaching or replacing it at any time. |
| On-premises / other cloud | Workload identity federation (preferred) |

## Notes

- In production, do not grant the Owner, Editor or Viewer roles to the service account; grant a predefined or custom role that meets your needs. `ROLE` affects which project resources the service account can access.
- Use impersonation only if user credentials cannot be used or to test a service account's permissions.
- Batch roles are listed in [get-started.md](./get-started.md); authorization uses IAM (IAM in general is in `gcp-foundation`; ADC details in `gcp-foundation`).
- The source also shows PowerShell for the REST request (omitted).
- Google Cloud Batch (`batch.googleapis.com`) — not the Claude / OpenAI batch APIs (`anthropic-api-core`, `openai-api-core`) and not Kubernetes Jobs (`gcp-gke`).
- Source: https://docs.cloud.google.com/batch/docs/authentication (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [get-started.md](./get-started.md)
- [create-run-job.md](./create-run-job.md)
