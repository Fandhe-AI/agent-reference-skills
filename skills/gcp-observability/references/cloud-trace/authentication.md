---
source: https://docs.cloud.google.com/trace/docs/authentication
---

# Authenticate to Cloud Trace

How to authenticate to the Cloud Trace API from client libraries (Application Default Credentials) or REST, depending on where your code runs. Complete the basic setup in the Instrument for Cloud Trace page first.

## Signature / Usage

### Local development: ADC with user credentials

```bash
gcloud init
```

```bash
gcloud auth application-default login
```

If gcloud warns that your account lacks `serviceusage.services.use`, ask an administrator for Service Usage Consumer (`roles/serviceusage.serviceUsageConsumer`), then:

```bash
gcloud auth application-default set-quota-project PROJECT_ID
```

### Local development: REST with gcloud credentials

The source shows a request that lists service accounts; use the same pattern for any REST request.

```text
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "x-goog-user-project: PROJECT_ID" \
     "https://iam.googleapis.com/v1/projects/PROJECT_ID/serviceAccounts"
```

### Local development: service account impersonation

Requires `iam.serviceAccounts.getAccessToken` (included in Service Account Token Creator, `roles/iam.serviceAccountTokenCreator`).

```bash
gcloud config set auth/impersonate_service_account SERVICE_ACCT_EMAIL
```

```bash
gcloud auth application-default login --impersonate-service-account=SERVICE_ACCT_EMAIL
```

### On Google Cloud: attach a service account

```bash
gcloud iam service-accounts create SERVICE_ACCOUNT_NAME
```

```bash
gcloud projects add-iam-policy-binding PROJECT_ID --member="serviceAccount:SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com" --role=ROLE
```

```bash
gcloud iam service-accounts add-iam-policy-binding SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com --member="user:USER_EMAIL" --role=roles/iam.serviceAccountUser
```

```bash
gcloud compute instances create INSTANCE_NAME --zone=ZONE --service-account=SERVICE_ACCOUNT_EMAIL
```

## Options / Props

| Item | Value |
|---|---|
| Roles to create and grant | Create Service Accounts `roles/iam.serviceAccountCreator`, Project IAM Admin `roles/resourcemanager.projectIamAdmin` |
| Role for the Trace service account | Cloud Trace Agent `roles/cloudtrace.agent` (writes) |
| Impersonated ADC file | Supported only for the Go, Java, Node.js and Python client libraries |

## Notes

- The source also shows a PowerShell form of the REST request.
- ROLE in the project-level binding: for writing spans use `roles/cloudtrace.agent`. In production do not grant Owner, Editor or Viewer; use a predefined or custom role. The binding is project-wide; the source offers no resource-level grant for Trace.
- For most services the service account must be attached when the resource is created; Compute Engine lets you attach one at any time. This is the preferred method on Google Cloud compute resources.
- Outside Google Cloud, workload identity federation is preferred.
- Source: https://docs.cloud.google.com/trace/docs/authentication (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [setup.md](./setup.md)
