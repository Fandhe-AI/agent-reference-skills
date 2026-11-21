---
source: https://docs.cloud.google.com/generative-ai-app-builder/docs/authentication
---

# Authenticate to Agent Search

How to authenticate programmatically to Agent Search (formerly Vertex AI Search; Discovery Engine API) through client libraries (Application Default Credentials) or REST (gcloud CLI credentials or ADC), where API keys are accepted, and how to set up authentication for local development, on Google Cloud, and on-premises.

## Signature / Usage

### Local development: ADC for client libraries

Install and initialize the Google Cloud CLI:

```bash
gcloud init
```

If you're using an external identity provider (IdP), first sign in to the gcloud CLI with your federated identity. In a local shell, create local authentication credentials for your user account (not needed in Cloud Shell):

```bash
gcloud auth application-default login
```

### Local development: REST requests from the command line

Use gcloud CLI credentials with `gcloud auth print-access-token`. The source's example lists service accounts for a project (the same pattern applies to any REST request); replace `PROJECT_ID`:

```bash
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://iam.googleapis.com/v1/projects/PROJECT_ID/serviceAccounts"
```

### Local development: service account impersonation

Requires the `iam.serviceAccounts.getAccessToken` permission, included in the Service Account Token Creator (`roles/iam.serviceAccountTokenCreator`) role. Configure gcloud to impersonate:

```bash
gcloud config set auth/impersonate_service_account SERVICE_ACCT_EMAIL
```

Create a local ADC file with impersonation (supported only for the Go, Java, Node.js and Python client libraries):

```bash
gcloud auth application-default login --impersonate-service-account=SERVICE_ACCT_EMAIL
```

### On Google Cloud: attach a service account

For code running on a Google Cloud compute resource, use the service account attached to it (the preferred method). For most services you must attach the service account when you create the resource; Compute Engine lets you attach one at any time. You need `roles/iam.serviceAccountCreator` and `roles/resourcemanager.projectIamAdmin`.

```bash
gcloud iam service-accounts create SERVICE_ACCOUNT_NAME
```

Grant a role to the service account (`ROLE` is the role to grant):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID --member="serviceAccount:SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com" --role=ROLE
```

Grant the principal that will attach the service account the Service Account User role (`USER_EMAIL` is a Google Account email):

```bash
gcloud iam service-accounts add-iam-policy-binding SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com --member="user:USER_EMAIL" --role=roles/iam.serviceAccountUser
```

Create a Compute Engine instance with the service account attached:

```bash
gcloud compute instances create INSTANCE_NAME --zone=ZONE --service-account=SERVICE_ACCOUNT_EMAIL
```

## Notes

- API keys: Agent Search supports API keys for these API methods:
  - `userEvents.Collect`: See "Create an API key" in the record user events guide
  - `servingConfigs.searchLite`: See "Get search results for an app with website data (API key)"
- API keys associate an API call with a project (for billing and quota purposes) without determining the identity of the caller, and work only with API methods that support them.
- In production environments, do not grant the Owner, Editor, or Viewer roles to the service account; grant a predefined role or custom role that meets your needs.
- Outside Google Cloud (on-premises or another cloud provider), the preferred method is workload identity federation (see "Set up ADC for on-premises or another cloud provider").
- Authorization: after authenticating you must be authorized through IAM; see access-control.md.
- The twin also shows a PowerShell variant of the REST request, omitted here.
- Client-library code in this skill uses ADC, as the source does. Gemini Developer API keys (Google AI Studio) are a different product and are covered by the `google-gemini-api` skill.
- Source: https://docs.cloud.google.com/generative-ai-app-builder/docs/authentication (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [before-you-begin.md](./before-you-begin.md)
- [access-control.md](./access-control.md)
- [migrate-from-cse.md](./migrate-from-cse.md)
