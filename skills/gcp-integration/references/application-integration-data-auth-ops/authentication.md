---
source: https://docs.cloud.google.com/application-integration/docs/authentication
---

# Authenticate to Application Integration programmatically

How you authenticate to the Application Integration API depends on the interface and the environment where your code runs. The API is accessed through REST, using gcloud CLI credentials or Application Default Credentials (ADC); authorization then uses IAM.

## Signature / Usage

### Local development: client libraries or third-party tools (ADC)

Install the Google Cloud CLI, initialize it, and (in a local shell, not Cloud Shell) create local credentials for your user account. With an external identity provider, first sign in to the gcloud CLI with your federated identity.

```bash
gcloud init
```

```bash
gcloud auth application-default login
```

### Local development: REST requests from the command line

Include `gcloud auth print-access-token` in the command. The source's example lists service accounts for a project and notes the same pattern works for any REST request (replace `PROJECT_ID`):

```bash
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://iam.googleapis.com/v1/projects/PROJECT_ID/serviceAccounts"
```

### Local development: service account impersonation

Requires the `iam.serviceAccounts.getAccessToken` permission, included in Service Account Token Creator (`roles/iam.serviceAccountTokenCreator`).

```bash
gcloud config set auth/impersonate_service_account SERVICE_ACCT_EMAIL
```

A local ADC file with impersonation is supported only for the Go, Java, Node.js and Python client libraries:

```bash
gcloud auth application-default login --impersonate-service-account=SERVICE_ACCT_EMAIL
```

### On Google Cloud: attached service account

The preferred method for code on a Google Cloud compute resource is the credentials of the service account attached to that resource. For most services the service account must be attached when the resource is created (Compute Engine can attach one at any time). You need Create Service Accounts (`roles/iam.serviceAccountCreator`) and Project IAM Admin (`roles/resourcemanager.projectIamAdmin`).

```bash
gcloud iam service-accounts create SERVICE_ACCOUNT_NAME
```

```bash
gcloud projects add-iam-policy-binding PROJECT_ID --member="serviceAccount:SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com" --role=ROLE
```

Grant the principal that will attach the service account the Service Account User role (`USER_EMAIL` is the email address for a Google Account):

```bash
gcloud iam service-accounts add-iam-policy-binding SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com --member="user:USER_EMAIL" --role=roles/iam.serviceAccountUser
```

Create the resource with the service account attached (Compute Engine example; set `--zone` and `--service-account`):

```bash
gcloud compute instances create INSTANCE_NAME --zone=ZONE --service-account=SERVICE_ACCOUNT_EMAIL
```

### On-premises or another cloud provider

The preferred method is workload identity federation (see "Set up ADC for on-premises or another cloud provider" in the Google Cloud authentication docs).

## Notes

- In production, do not grant the Owner, Editor or Viewer roles to the service account; grant a predefined or custom role. The `gcloud projects add-iam-policy-binding` example above is a project-level grant, as the source shows it; Project IAM Admin (`roles/resourcemanager.projectIamAdmin`) is a project-level admin role, kept as the source names it.
- The run-as identity change for integration runs is on the prepare-for-authorization-changes page; roles for the API are on the access-control page.
- After authentication you must be authorized through IAM (https://docs.cloud.google.com/application-integration/docs/access-control).
- Omitted: the PowerShell variant of the REST example. The source documents REST as the only programmatic access path.
- Source: https://docs.cloud.google.com/application-integration/docs/authentication (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [access-control.md](./access-control.md)
- [prepare-for-authorization-changes.md](./prepare-for-authorization-changes.md)
- [configure-authentication-profiles.md](./configure-authentication-profiles.md)
