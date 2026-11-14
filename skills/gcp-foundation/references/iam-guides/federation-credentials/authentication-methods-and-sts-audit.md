---
source: https://docs.cloud.google.com/iam/docs/authentication
---

# Authenticating to the IAM API and API Index

How to authenticate to IAM programmatically (client libraries, gcloud, REST) for local development, on Google Cloud, and outside Google Cloud, plus the index of IAM-related APIs.

## Signature / Usage

### Local development: ADC for client libraries and tools

```bash
gcloud init
gcloud auth application-default login
```

`gcloud auth application-default login` is unnecessary in Cloud Shell. With an external IdP, first sign in to the gcloud CLI with your federated identity.

### Local development: REST from the command line

```
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://iam.googleapis.com/v1/projects/PROJECT_ID/serviceAccounts"
```

```
$cred = gcloud auth print-access-token
$headers = @{ "Authorization" = "Bearer $cred" }

Invoke-WebRequest `
    -Method GET `
    -Headers $headers `
    -Uri "https://iam.googleapis.com/v1/projects/PROJECT_ID/serviceAccounts" | Select-Object -Expand Content
```

### Local development: service account impersonation

Requires `iam.serviceAccounts.getAccessToken` (in `roles/iam.serviceAccountTokenCreator`).

```bash
gcloud config set auth/impersonate_service_account SERVICE_ACCT_EMAIL
```

```bash
gcloud auth application-default login --impersonate-service-account=SERVICE_ACCT_EMAIL
```

The ADC impersonation form is supported only for the Go, Java, Node.js, and Python client libraries.

### On Google Cloud: attach a service account

```bash
gcloud iam service-accounts create SERVICE_ACCOUNT_NAME
gcloud projects add-iam-policy-binding PROJECT_ID --member="serviceAccount:SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com" --role=ROLE
gcloud iam service-accounts add-iam-policy-binding SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com --member="user:USER_EMAIL" --role=roles/iam.serviceAccountUser
gcloud compute instances create INSTANCE_NAME --zone=ZONE --service-account=SERVICE_ACCOUNT_EMAIL
```

Prerequisite roles for the caller: Create Service Accounts (`roles/iam.serviceAccountCreator`) and Project IAM Admin (`roles/resourcemanager.projectIamAdmin`).

### On-premises or another cloud

Use workload identity federation (see the Google Cloud authentication documentation for setting up ADC for on-premises or another cloud provider).

## Options / Props

### IAM-related APIs

| API | Purpose |
|-----|---------|
| IAM REST / RPC API | Roles, permissions, service accounts and keys. |
| Privileged Access Manager REST / RPC API | Just-in-time temporary role grants. |
| Security Token Service REST API | Exchange access tokens. |
| Service Account Credentials REST API | Short-lived, limited-privilege credentials for service accounts. |
| Workload Identity API | Trigger service agent creation. |
| Agent Identity Credentials REST API | Retrieve and finalize authorization credentials for auth providers. |
| Agent Identity REST API | Manage auth providers for Agent Identity. |
| Cloud OAuth REST API (Preview) | Exchange credentials for short-lived access tokens, revoke tokens, manage OAuth configurations. |
| IAM MCP tools | Inspect and manage IAM policy configuration. |

## Notes

- Client libraries use Application Default Credentials (ADC) to find credentials without code changes across environments.
- Attaching a service account is the preferred method for code running on Google Cloud compute. For most services it must be attached at resource creation; Compute Engine can change it at any time.
- In production, do not grant the Owner, Editor, or Viewer roles to the service account; grant a predefined or custom role.
- Reference pages in the API index: retry strategy, client libraries, `gcloud iam`, conditions attribute reference, roles and permissions index, principal identifiers, resource types that accept allow policies, resource types with built-in identities, service agents, permissions supported in deny policies, support levels for custom roles.
- Source: https://docs.cloud.google.com/iam/docs/authentication (retrieved 2026-11-14; CC BY 4.0)
- Source: https://docs.cloud.google.com/iam/docs/apis (retrieved 2026-11-14; CC BY 4.0)

## Related

- [short-lived-credentials.md](./short-lived-credentials.md)
- [workload-identity-federation-best-practices.md](./workload-identity-federation-best-practices.md)
- Other skills: gcp-client-libraries (ADC code), gcp-cli (gcloud)
