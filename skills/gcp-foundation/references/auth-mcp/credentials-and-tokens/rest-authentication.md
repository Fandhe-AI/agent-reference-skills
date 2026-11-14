---
source: https://docs.cloud.google.com/docs/authentication/rest
---

# Authenticate for using REST

How to authenticate a REST request to a Google API using gcloud credentials, ADC, service account impersonation, the metadata server, or an API key, and how to set the quota project.

## Signature / Usage

### Before you begin

Install the gcloud CLI; if using an external IdP, first sign in with your federated identity; then initialize and enable the Cloud Resource Manager and IAM APIs (needs `serviceusage.services.enable`, e.g. Owner or Service Usage Admin):

```bash
gcloud init
```

```bash
gcloud services enable cloudresourcemanager.googleapis.com iam.googleapis.com
```

Without the gcloud CLI, use service account impersonation or the metadata server to generate a token.

### Credential types

- gcloud CLI credentials: easiest and most secure in local development if your user has the IAM permissions. These are not the credentials you provide to ADC.
- ADC credentials: preferred for production REST calls (ADC finds credentials from the resource, such as a Compute Engine VM); also usable locally.
- Credentials from impersonating a service account: more setup; use for testing with a service account locally or temporary elevated privileges.
- Metadata server credentials: same as ADC would find for the attached service account, but you request the token explicitly with an HTTP GET; does not rely on the gcloud CLI.
- API keys: only for APIs that accept them, and the key must not be restricted from that API.

The examples need `resourcemanager.projects.get` (included in, e.g., Browser `roles/browser`).

### gcloud CLI credentials

```
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     "https://cloudresourcemanager.googleapis.com/v3/projects/PROJECT_ID"
```

PowerShell:

```
$cred = gcloud auth print-access-token
$headers = @{ "Authorization" = "Bearer $cred" }

Invoke-WebRequest `
    -Method GET `
    -Headers $headers `
    -Uri "https://cloudresourcemanager.googleapis.com/v3/projects/PROJECT_ID" | Select-Object -Expand Content
```

### Application Default Credentials

First provide credentials to ADC. On a Google Cloud compute resource do not provide user credentials; use the attached service account.

```
curl -X GET \
     -H "Authorization: Bearer $(gcloud auth application-default print-access-token)" \
     "https://cloudresourcemanager.googleapis.com/v3/projects/PROJECT_ID"
```

PowerShell:

```
$cred = gcloud auth application-default print-access-token
$headers = @{ "Authorization" = "Bearer $cred" }

Invoke-WebRequest `
    -Method GET `
    -Headers $headers `
    -Uri "https://cloudresourcemanager.googleapis.com/v3/projects/PROJECT_ID" | Select-Object -Expand Content
```

### Impersonated service account

The impersonating principal needs `iam.serviceAccounts.getAccessToken` on the privilege-bearing service account (Service Account Token Creator `roles/iam.serviceAccountTokenCreator`), even if the user is project Owner. The service account needs the permissions for the API method. `PRIV_SA` is its email, for example `my-sa@my-project.iam.gserviceaccount.com`.

```
curl -X GET \
    -H "Authorization: Bearer $(gcloud auth print-access-token --impersonate-service-account=PRIV_SA)" \
    "https://cloudresourcemanager.googleapis.com/v3/projects/PROJECT_ID"
```

To generate a short-lived token programmatically, see "Create a short-lived access token" in the IAM docs.

### Metadata server

Available on Compute Engine, App Engine standard and flexible, Cloud Run functions, Cloud Run, GKE, and Cloud Build. Query for a token, then use it:

```
curl "http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token" \
    -H "Metadata-Flavor: Google"
```

```
{
      "access_token":"ya29.AHES6ZRN3-HlhAPya30GnW_bHSb_QtAi85nHq39HE3C2LTrCARA",
      "expires_in":3599,
      "token_type":"Bearer"
 }
```

```
curl -X GET \
    -H "Authorization: Bearer ACCESS_TOKEN" \
    "https://cloudresourcemanager.googleapis.com/v3/projects/PROJECT_ID"
```

### API keys

Use the `x-goog-api-key` header:

```
curl -X POST \
    -H "X-goog-api-key: API_KEY" \
    -H "Content-Type: application/json; charset=utf-8" \
    -d @request.json \
    "https://translation.googleapis.com/language/translate/v2"
```

If the header cannot be used, use the `key` query parameter (exposes the key in the URL):

```
POST https://language.googleapis.com/v1/documents:analyzeEntities?key=API_KEY
```

### Set the quota project with a REST request

For some APIs called with user credentials you must set the project billed and used for quota, via the `x-goog-user-project` header. You need `serviceusage.services.use` (Service Usage Consumer role) on that project. Request body `request.json` for the Translation example:

```
{
  "q": "hello",
  "source": "en",
  "target": "es"
}
```

```
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "x-goog-user-project: PROJECT_ID" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://translation.googleapis.com/language/translate/v2"
```

PowerShell:

```
$cred = gcloud auth print-access-token
$headers = @{ "Authorization" = "Bearer $cred"; "x-goog-user-project" = "PROJECT_ID" }

Invoke-WebRequest `
    -Method POST `
    -Headers $headers `
    -ContentType: "application/json; charset=utf-8" `
    -InFile request.json `
    -Uri "https://translation.googleapis.com/language/translate/v2" | Select-Object -Expand Content
```

## Notes

- API keys sent in the URL (`key=` parameter) can be stolen through URL scans; prefer the header and treat keys as secrets.
- The `curl ... print-access-token` pattern passes a token on the command line; use it only on trusted machines.
- Source: https://docs.cloud.google.com/docs/authentication/rest (retrieved 2026-11-14; text CC BY 4.0, code samples Apache 2.0)

## Related

- [../adc/troubleshoot-adc.md](../adc/troubleshoot-adc.md)
- [service-account-impersonation.md](./service-account-impersonation.md)
- [../api-keys/use-api-keys.md](../api-keys/use-api-keys.md)
