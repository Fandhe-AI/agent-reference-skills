---
source: https://docs.cloud.google.com/sdk/gcloud/reference/auth
---

# Auth, ADC and Impersonation

Copy-paste gcloud commands for signing in to the gcloud CLI, configuring Application Default Credentials (ADC), and impersonating service accounts.

## Signature / Usage

### Sign in to the gcloud CLI

```bash
gcloud init
```

```bash
gcloud auth login
```

Authorizes the gcloud CLI only (not ADC). `gcloud init` also performs other common setup.

### Sign in with a credential configuration file

```bash
gcloud auth login --cred-file=WORKLOAD_IDENTITY_FEDERATION_CREDENTIAL_FILE
```

Workload Identity Federation credential file for workloads outside Google Cloud.

```bash
gcloud auth login --cred-file=SERVICE_ACCT_KEY
```

Service account key sign-in (keys are not recommended; prefer impersonation).

### Sign in with Workforce Identity Federation

```bash
gcloud auth login --login-config="LOGIN_CONFIG_FILE_PATH"
```

```bash
gcloud config set auth/login_config_file LOGIN_CONFIG_PATH
gcloud auth login
gcloud config unset auth/login_config_file
```

### Sign in with a service account key file

```bash
gcloud auth activate-service-account --key-file=KEY_FILE
```

### List, switch and revoke accounts

```bash
gcloud auth list
```

```bash
gcloud config set account principal://iam.googleapis.com/locations/global/workforcePools/WORKFORCE_POOL_ID/subject/SUBJECT_ID
```

```bash
gcloud auth revoke
```

### Set up ADC for local development

```bash
gcloud auth application-default login
```

Writes a local ADC file used by client libraries (not by the gcloud CLI itself).

```bash
gcloud auth application-default revoke
```

### Set the quota project

```bash
gcloud auth application-default set-quota-project YOUR_PROJECT
```

```bash
gcloud config set billing/quota_project YOUR_PROJECT
```

The first command updates the ADC file; the second sets the quota project for gcloud calls to client-based APIs.

### Impersonate a service account for one command

```bash
gcloud storage buckets list --impersonate-service-account=SERVICE_ACCT_EMAIL
```

### Impersonate a service account by default

```bash
gcloud config set auth/impersonate_service_account SERVICE_ACCT_EMAIL
```

```bash
gcloud config unset auth/impersonate_service_account
```

### Set up ADC with impersonation

```bash
gcloud auth application-default login --impersonate-service-account SERVICE_ACCT_EMAIL
```

### Print tokens

```bash
gcloud auth print-access-token
```

```bash
gcloud auth print-access-token --impersonate-service-account=PRIV_SA
```

```bash
gcloud auth print-identity-token
```

The generic identity token is for development against Cloud Run services or functions you can invoke; do not use it in production.

### Point ADC at a key file (environment variable)

```bash
export GOOGLE_APPLICATION_CREDENTIALS="KEY_PATH"
```

Applies to the current shell session only.

## Options / Props

| Command | Flag | Meaning |
| --- | --- | --- |
| `gcloud auth login` | `--cred-file` | Sign in from a credential configuration file or key |
| `gcloud auth login` | `--login-config` | Workforce Identity Federation login configuration file |
| `gcloud auth application-default login` | `--impersonate-service-account` | Create an impersonated local ADC file |
| `gcloud auth application-default login` | `--client-id-file`, `--scopes` | OAuth client and scopes for non-Google Cloud apps such as Google Drive |
| `gcloud auth print-access-token` | `--impersonate-service-account` | Token for the impersonated service account |

## Notes

- `gcloud auth login` configures the gcloud CLI; `gcloud auth application-default login` configures ADC for client libraries. They are independent.
- Impersonation requires `roles/iam.serviceAccountTokenCreator` on the target service account and the Service Account Credentials API (`iamcredentials.googleapis.com`) enabled.
- The local ADC file contains a refresh token; use a single-user workstation and run `gcloud auth application-default revoke` when finished.
- Use only a disposable or test environment when trying `auth revoke` and `application-default revoke`, because they invalidate the stored sign-in.
- Source: https://docs.cloud.google.com/docs/authentication/gcloud (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/docs/authentication/provide-credentials-adc (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/docs/authentication/use-service-account-impersonation (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/docs/authentication/troubleshoot-adc (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/docs/authentication/get-id-token (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/iam/docs/workforce-console-sso (retrieved 2026-11-14)

## Related

- [gcloud-authentication.md](../references/auth-mcp/credentials-and-tokens/gcloud-authentication.md)
- [set-up-adc.md](../references/auth-mcp/adc/set-up-adc.md)
- [troubleshoot-adc.md](../references/auth-mcp/adc/troubleshoot-adc.md)
- [service-account-impersonation.md](../references/auth-mcp/credentials-and-tokens/service-account-impersonation.md)
- [id-tokens.md](../references/auth-mcp/credentials-and-tokens/id-tokens.md)
