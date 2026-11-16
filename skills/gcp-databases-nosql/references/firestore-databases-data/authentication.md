---
source: https://docs.cloud.google.com/firestore/native/docs/authentication
---

# Authentication

How to authenticate to Firestore programmatically with server client libraries, the gcloud CLI and the REST / RPC APIs. The right setup depends on the interface and where your code runs. Mobile and web client libraries use Firestore security rules and Firebase Auth instead.

## Signature / Usage

### Local development: Application Default Credentials

```bash
gcloud init
```

```bash
gcloud auth application-default login
```

Not needed in Cloud Shell. Credentials are stored in the local credential file used by ADC.

### Local development: service account impersonation

Requires `iam.serviceAccounts.getAccessToken` (included in Service Account Token Creator, `roles/iam.serviceAccountTokenCreator`).

```bash
gcloud config set auth/impersonate_service_account SERVICE_ACCT_EMAIL
```

Local ADC file via impersonation (supported only for Go, Java, Node.js and Python client libraries):

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

Let a principal attach the service account to resources:

```bash
gcloud iam service-accounts add-iam-policy-binding SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com --member="user:USER_EMAIL" --role=roles/iam.serviceAccountUser
```

Example with Compute Engine:

```bash
gcloud compute instances create INSTANCE_NAME --zone=ZONE --service-account=SERVICE_ACCOUNT_EMAIL
```

## Options / Props

| Item | Value |
|------|-------|
| Roles needed to create/grant | Create Service Accounts (`roles/iam.serviceAccountCreator`), Project IAM Admin (`roles/resourcemanager.projectIamAdmin`) |
| Role to attach a service account | `roles/iam.serviceAccountUser` |
| Impersonation permission | `iam.serviceAccounts.getAccessToken` (`roles/iam.serviceAccountTokenCreator`) |
| Outside Google Cloud | Workload identity federation (preferred) |

## Notes

- Client libraries use ADC to find credentials in defined locations, so the same code works locally and in production. On Google Cloud, using the attached service account is the preferred method.
- For most services you must attach the service account when creating the resource and can't change it later; Compute Engine allows attaching at any time.
- In production, do not grant the Owner, Editor or Viewer roles to the service account; grant a predefined or custom role.
- Authorization uses IAM; see the Firestore IAM roles (`roles/datastore.*`) in the security for server client libraries page: https://docs.cloud.google.com/firestore/native/docs/security/iam
- This page does not apply to mobile / web SDKs (security rules + Firebase Auth): https://docs.cloud.google.com/firestore/docs/security/get-started
- For details on ADC, service accounts and Workload Identity Federation see `gcp-foundation`; for gcloud auth see `gcp-cli`.
- Source: https://docs.cloud.google.com/firestore/native/docs/authentication (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [use-rest-api.md](./use-rest-api.md)
- [create-database-server-client-library.md](./create-database-server-client-library.md)
- [manage-databases.md](./manage-databases.md)
