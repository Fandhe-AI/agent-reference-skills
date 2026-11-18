---
source: https://docs.cloud.google.com/pubsub/docs/authentication
---

# Authenticate to Pub/Sub

How you authenticate to Pub/Sub programmatically depends on the interface (client libraries, gcloud CLI, REST) and the environment where your code runs. Client libraries use Application Default Credentials (ADC). Pub/Sub does not support API keys as an authentication method.

## Signature / Usage

### Local development: ADC for client libraries or third-party tools

```bash
gcloud init
```

If you use a local shell (not needed in Cloud Shell), create local authentication credentials for your user account:

```bash
gcloud auth application-default login
```

If the gcloud CLI warns that your account lacks the `serviceusage.services.use` permission, ask an administrator to grant you the Service Usage Consumer role (`roles/serviceusage.serviceUsageConsumer`), then run:

```bash
gcloud auth application-default set-quota-project PROJECT_ID
```

If you use an external identity provider (IdP), first sign in to the gcloud CLI with your federated identity.

### Local development: REST requests from the command line

The example lists service accounts for the project; use the same pattern for any REST request:

```bash
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "x-goog-user-project: PROJECT_ID" \
     "https://iam.googleapis.com/v1/projects/PROJECT_ID/serviceAccounts"
```

### Local development: service account impersonation

Use it when user credentials are not feasible or to test a service account's permissions. You need `iam.serviceAccounts.getAccessToken`, included in Service Account Token Creator (`roles/iam.serviceAccountTokenCreator`).

```bash
gcloud config set auth/impersonate_service_account SERVICE_ACCT_EMAIL
```

For a local ADC file that uses impersonation (supported only for the Go, Java, Node.js and Python client libraries):

```bash
gcloud auth application-default login --impersonate-service-account=SERVICE_ACCT_EMAIL
```

### On Google Cloud: attach a service account to the compute resource

Use the credentials of the service account attached to the compute resource running your code; this is the preferred method on Google Cloud. For most services you must attach the service account when you create the resource and cannot add or replace it later (Compute Engine can attach one to a VM at any time).

You need `roles/iam.serviceAccountCreator` and `roles/resourcemanager.projectIamAdmin`. Create the service account:

```bash
gcloud iam service-accounts create SERVICE_ACCOUNT_NAME
```

Grant a role to the service account:

```bash
gcloud projects add-iam-policy-binding PROJECT_ID --member="serviceAccount:SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com" --role=ROLE
```

Grant the principal that attaches the service account to other resources the Service Account User role:

```bash
gcloud iam service-accounts add-iam-policy-binding SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com --member="user:USER_EMAIL" --role=roles/iam.serviceAccountUser
```

Create the resource with the service account attached (Compute Engine example):

Adapted (not in the official docs): the placeholder `SERVICE_ACCOUNT_EMAIL` is written as `SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com`, the email of the service account created in the previous steps, so the commands act on the same account.

```bash
gcloud compute instances create INSTANCE_NAME --zone=ZONE --service-account=SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com
```

## Options / Props

| Environment | Recommended method |
|-------------|--------------------|
| Local development | User credentials via ADC (`gcloud auth application-default login`); service account impersonation if needed |
| On Google Cloud | Service account attached to the compute resource |
| On-premises or another cloud provider | Workload identity federation (preferred) |
| API keys | Not supported by Pub/Sub |

## Notes

- Authorization after authentication is done with IAM; roles are described in the Pub/Sub access control docs.
- In production environments, do not grant the Owner, Editor or Viewer roles to the service account. Grant a predefined or custom role that meets your needs. `--role=ROLE` in the project-level binding above is a placeholder; the source shows only the project-level grant, so choose the narrowest role that fits.
- `--impersonate-service-account` ADC files work only for Go, Java, Node.js and Python client libraries.
- The `gcloud auth print-access-token` curl example shown calls the IAM API, not Pub/Sub; the source says to use the same pattern for any REST request.
- Corrected from the official docs: the Compute Engine example used `--service-account=SERVICE_ACCOUNT_EMAIL` while the earlier steps create and grant `SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com`; the source says to set the flag to "the email address for the service account that you created", so that email is used.
- Service accounts, ADC and IAM are covered by `gcp-foundation`; shared client-library auth patterns by `gcp-client-libraries`.
- The source also shows PowerShell for the REST example.
- Source: https://docs.cloud.google.com/pubsub/docs/authentication (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [encryption.md](./encryption.md)
- [troubleshooting.md](./troubleshooting.md)
