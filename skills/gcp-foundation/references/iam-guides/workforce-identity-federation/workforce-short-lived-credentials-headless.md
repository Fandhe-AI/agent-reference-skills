---
source: https://docs.cloud.google.com/iam/docs/workforce-obtaining-short-lived-credentials
---

# Workforce Identity Federation: obtain short-lived credentials

Exchange IdP credentials (OIDC ID token or SAML assertion) for short-lived Google Cloud access tokens through Security Token Service (or the Cloud OAuth API for Looker), using credential configuration files, client libraries, REST, or the gcloud CLI. Works on headless machines.

## Signature / Usage

Prerequisites: principals need `serviceusage.services.use` (least privilege role: `roles/serviceusage.serviceUsageConsumer`) on the user project; enable the IAM, Security Token Service, Cloud OAuth, and IAM Credentials APIs.

### OIDC credential configuration files

File-sourced (another process must refresh the token file before it expires):

```bash
gcloud iam workforce-pools create-cred-config \
    locations/global/workforcePools/WORKFORCE_POOL_ID/providers/WORKFORCE_PROVIDER_ID \
    --subject-token-type=urn:ietf:params:oauth:token-type:id_token \
    --credential-source-file=PATH_TO_OIDC_ID_TOKEN \
    --workforce-pool-user-project=WORKFORCE_POOL_USER_PROJECT \
    --output-file=config.json
```

```json
{
  "type": "external_account",
  "audience": "//iam.googleapis.com/locations/global/workforcePools/WORKFORCE_POOL_ID/providers/WORKFORCE_PROVIDER_ID",
  "subject_token_type": "urn:ietf:params:oauth:token-type:id_token",
  "token_url": "https://sts.googleapis.com/v1/token",
  "workforce_pool_user_project": "WORKFORCE_POOL_USER_PROJECT",
  "credential_source": {
    "file": "PATH_TO_OIDC_CREDENTIALS_FILE"
  }
}
```

URL-sourced (local server answering HTTP GET with an ID token, plain text or JSON):

```bash
gcloud iam workforce-pools create-cred-config \
    locations/global/workforcePools/WORKFORCE_POOL_ID/providers/WORKFORCE_PROVIDER_ID \
    --subject-token-type=urn:ietf:params:oauth:token-type:id_token \
    --credential-source-url=URL_TO_RETURN_OIDC_ID_TOKEN \
    --workforce-pool-user-project=WORKFORCE_POOL_USER_PROJECT \
    --output-file=config.json
```

Executable-sourced (non-interactive): the executable prints JSON to stdout.

```
{
  "version": 1,
  "success": true,
  "token_type": "urn:ietf:params:oauth:token-type:id_token",
  "id_token": "HEADER.PAYLOAD.SIGNATURE",
  "expiration_time": 1620499962
}
```

```
{
  "version": 1,
  "success": false,
  "code": "401",
  "message": "Caller not authorized."
}
```

```bash
gcloud iam workforce-pools create-cred-config \
    locations/global/workforcePools/WORKFORCE_POOL_ID/providers/WORKFORCE_PROVIDER_ID \
    --subject-token-type=urn:ietf:params:oauth:token-type:id_token  \
    --executable-command=EXECUTABLE_COMMAND \
    --executable-timeout-millis=EXECUTABLE_TIMEOUT \
    --executable-output-file=EXECUTABLE_OUTPUT_FILE \
    --workforce-pool-user-project=WORKFORCE_POOL_USER_PROJECT \
    --output-file /path/to/generated/config.json
```

Interactive executable-sourced (add the interactive timeout and the output file):

```bash
gcloud iam workforce-pools create-cred-config \
    locations/global/workforcePools/WORKFORCE_POOL_ID/providers/WORKFORCE_PROVIDER_ID \
    --subject-token-type=urn:ietf:params:oauth:token-type:id_token  \
    --executable-command=EXECUTABLE_COMMAND \
    --executable-interactive-timeout-millis=EXECUTABLE_INTERACTIVE_TIMEOUT \
    --executable-output-file=EXECUTABLE_OUTPUT_FILE \
    --workforce-pool-user-project=WORKFORCE_POOL_USER_PROJECT \
    --output-file /path/to/generated/config.json
```

```json
{
  "type": "external_account",
  "audience": "//iam.googleapis.com/locations/global/workforcePools/WORKFORCE_POOL_ID/providers/WORKFORCE_PROVIDER_ID",
  "subject_token_type": "urn:ietf:params:oauth:token-type:id_token",
  "token_url": "https://sts.googleapis.com/v1/token",
  "workforce_pool_user_project": "WORKFORCE_POOL_USER_PROJECT",
  "credential_source": {
    "executable": {
      "command": "EXECUTABLE_COMMAND",
      "interactive_timeout_millis": "EXECUTABLE_INTERACTIVE_TIMEOUT",
      "timeout_millis": "EXECUTABLE_TIMEOUT",
      "output_file": "EXECUTABLE_OUTPUT_FILE"
    }
  }
}
```

### SAML credential configuration files

File-sourced (base64-encoded SAML assertion; `--subject-token-type=urn:ietf:params:oauth:token-type:saml2` is required):

```bash
gcloud iam workforce-pools create-cred-config \
    locations/global/workforcePools/WORKFORCE_POOL_ID/providers/WORKFORCE_PROVIDER_ID \
    --output-file=federation_config.json \
    --credential-source-file=CREDENTIAL_FILE \
    --subject-token-type=urn:ietf:params:oauth:token-type:saml2 \
    --workforce-pool-user-project=WORKFORCE_POOL_USER_PROJECT
```

Executable-sourced: stdout JSON.

```
{
  "version": 1,
  "success": true,
  "token_type": "urn:ietf:params:oauth:token-type:saml2",
  "saml_response": "...",
  "expiration_time": 1620499962
}
```

```bash
gcloud iam workforce-pools create-cred-config \
    locations/global/workforcePools/WORKFORCE_POOL_ID/providers/WORKFORCE_PROVIDER_ID \
    --subject-token-type=urn:ietf:params:oauth:token-type:saml2  \
    --executable-command=EXECUTABLE_COMMAND \
    --executable-timeout-millis=EXECUTABLE_TIMEOUT \
    --executable-output-file=EXECUTABLE_OUTPUT_FILE \
    --workforce-pool-user-project=WORKFORCE_POOL_USER_PROJECT \
    --output-file /path/to/generated/config.json
```

Interactive mode: add `--executable-interactive-timeout-millis=EXECUTABLE_INTERACTIVE_TIMEOUT` (with `--executable-output-file`) to the same command. Sign in with a credential config:

```bash
gcloud auth login --cred-file=/path/to/config.json
```

### Browser-based gcloud sign-in

```bash
gcloud iam workforce-pools create-login-config \
    locations/global/workforcePools/WORKFORCE_POOL_ID/providers/WORKFORCE_PROVIDER_ID \
    --output-file=LOGIN_CONFIG_PATH
```

Point gcloud at the file with `CLOUDSDK_AUTH_LOGIN_CONFIG_FILE`, `gcloud config set auth/login_config_file LOGIN_CONFIG_PATH` (undo with `gcloud config unset auth/login_config_file`), or `gcloud auth login --login-config=LOGIN_CONFIG_PATH`; with `--activate` just run `gcloud auth login`.

### Client libraries

```python
from google.cloud import storage
import google.auth

credentials, project = google.auth.default(
    scopes=['https://www.googleapis.com/auth/devstorage.read_only'])

client = storage.Client(
    project="project-id", credentials=credentials)
```

```java
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;

GoogleCredentials credentials = GoogleCredentials.getApplicationDefault();
GoogleCredentials sourceCredentials = credentials
    .createScoped(Arrays.asList("https://www.googleapis.com/auth/devstorage.read_only"));

Storage storageService = StorageOptions.newBuilder().setProjectId("project-id")
    .setCredentials(sourceCredentials).build().getService();
```

### REST (Security Token Service)

Adapted (not in the official docs): the response is captured in a variable so the access token is not printed to the terminal or logs; the response shape is shown below.

```bash
STS_RESPONSE="$(curl -s https://sts.googleapis.com/v1/token \
    --data-urlencode "audience=//iam.googleapis.com/locations/global/workforcePools/WORKFORCE_POOL_ID/providers/WORKFORCE_PROVIDER_ID" \
    --data-urlencode "grant_type=urn:ietf:params:oauth:grant-type:token-exchange" \
    --data-urlencode "requested_token_type=urn:ietf:params:oauth:token-type:access_token" \
    --data-urlencode "scope=https://www.googleapis.com/auth/cloud-platform" \
    --data-urlencode "subject_token_type=SUBJECT_TOKEN_TYPE" \
    --data-urlencode "subject_token=EXTERNAL_SUBJECT_TOKEN"  \
    --data-urlencode "options={\"userProject\":\"BILLING_PROJECT_NUMBER\"}")"
ACCESS_TOKEN="$(printf '%s' "${STS_RESPONSE}" | jq -r '.access_token')"
```

```json
{
  "access_token": "ya29.dr.AaT61Tc6Ntv1ktbGkaQ9U_MQfiQw...",
  "issued_token_type": "urn:ietf:params:oauth:token-type:access_token",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

### Session management

```bash
gcloud auth revoke
```

```bash
gcloud auth list
```

```bash
gcloud config set account principal://iam.googleapis.com/locations/global/workforcePools/WORKFORCE_POOL_ID/subject/SUBJECT_ID
```

## Options / Props

| Name | Description |
|------|-------------|
| `--subject-token-type` | `urn:ietf:params:oauth:token-type:id_token` (OIDC) or `urn:ietf:params:oauth:token-type:saml2` (SAML). |
| `--credential-source-file` / `--credential-source-url` / `--executable-command` | Where the third-party credential is read from. |
| `--executable-timeout-millis` | Optional; default 30s. |
| `--executable-interactive-timeout-millis` | Non-zero value enables interactive mode (requires `--executable-output-file`). |
| `--executable-output-file` | Optional cache of generated credentials (required in interactive mode). |
| `--workforce-pool-user-project` | Project for quota and billing; principal needs `serviceusage.services.use`. |
| Executable env vars | `GOOGLE_EXTERNAL_ACCOUNT_AUDIENCE`, `GOOGLE_EXTERNAL_ACCOUNT_TOKEN_TYPE`, `GOOGLE_EXTERNAL_ACCOUNT_OUTPUT_FILE` (set by client libraries). |
| `GOOGLE_EXTERNAL_ACCOUNT_ALLOW_EXECUTABLES` | Must be `1` to enable executable-sourced credentials in client libraries. |
| Executable JSON fields | `version` (only `1`), `success`, `token_type`, `id_token` / `saml_response`, `expiration_time` (required only if an output file is set), `code`, `message` (errors; non-zero exit). |
| Minimum client library versions | bq tool: gcloud CLI 390.0.0; gcloud: 392.0.0; C++ 2.31.0 (gRPC 1.42.0); .NET `Google.Apis.Auth` 1.58.0; Go `cloud.google.com/go/auth` v0.1.0; Java `google-auth-library-oauth2-http` 1.2.0; Node.js `google-auth-library` 7.10.0; PHP `google/auth` 1.35.0; Python `google-auth` 2.3.0; Ruby `googleauth` 1.6.0; Rust `google-cloud-auth` 1.7.0. |

## Notes

- Workforce pools belong to an organization, not a project, so Node.js `GoogleAuth` and Python storage clients must be given a project ID explicitly (or `GOOGLE_CLOUD_PROJECT`).
- Neither the gcloud CLI nor the bq tool supports executable-sourced credential types.
- `gcloud auth login` stores credentials in the home directory; do not use it for automated workloads on remote systems with persistent storage. For long-lived access, run a process that continuously refreshes credentials or a local server returning them.
- When the IdP credential expires, gcloud cannot get new Google Cloud tokens and you must re-authenticate. Admins can revoke all sessions for a subject via the workforce-revoke-sessions guide.
- Looker integrations use `https://auth.cloud.google/authorize` and the Cloud OAuth API (`cloudoauth.googleapis.com`) instead of STS.
- Omitted because the source markup is corrupted: the SAML URL-sourced `--credential-source-url` command and the SAML interactive config JSON (contain stray `<var>` markup); the Go and Node.js client samples (contain `#` comments that are not valid in those languages). Use the corresponding OIDC patterns above and the official page for these.
- The source text names one flag `--exeutable-interactive-timeout-millis` (typo) in prose; the correct flag in the command is `--executable-interactive-timeout-millis`.
- Adapted from the official docs: the REST STS exchange `curl` captures the response in a variable instead of printing the access token.
- Source: https://docs.cloud.google.com/iam/docs/workforce-obtaining-short-lived-credentials (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [Workforce sign-in: console (federated) and gcloud CLI](./workforce-console-and-gcloud-sign-in.md)
- [Workforce credentials and troubleshooting](./workforce-credentials-and-troubleshooting.md)
