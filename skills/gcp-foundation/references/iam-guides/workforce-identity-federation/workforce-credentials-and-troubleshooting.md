---
source: https://docs.cloud.google.com/iam/docs/workforce-obtaining-short-lived-credentials
---

# Workforce Identity Federation: short-lived credentials and troubleshooting

Sign in with browser-based flows or credential configuration files, exchange IdP tokens through the Security Token Service, manage sessions, and troubleshoot attribute mapping, sign-in and quota errors.

## Signature / Usage

### Browser-based sign-in (login configuration file)

```bash
gcloud auth login
```

Point gcloud at the login configuration file via environment variable, configuration property, or flag:

```bash
export CLOUDSDK_AUTH_LOGIN_CONFIG_FILE=LOGIN_CONFIG_PATH
gcloud auth login
```

```bash
gcloud config set auth/login_config_file LOGIN_CONFIG_PATH
gcloud auth login
gcloud config unset auth/login_config_file
```

```bash
gcloud auth login \
    --login-config=LOGIN_CONFIG_PATH
```

### Credential configuration (non-interactive, OIDC file-sourced)

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

```bash
gcloud auth login --cred-file=/path/to/config.json
```

### Token exchange with the Security Token Service

```bash
curl https://sts.googleapis.com/v1/token \
    --data-urlencode "audience=//iam.googleapis.com/locations/global/workforcePools/WORKFORCE_POOL_ID/providers/WORKFORCE_PROVIDER_ID" \
    --data-urlencode "grant_type=urn:ietf:params:oauth:grant-type:token-exchange" \
    --data-urlencode "requested_token_type=urn:ietf:params:oauth:token-type:access_token" \
    --data-urlencode "scope=https://www.googleapis.com/auth/cloud-platform" \
    --data-urlencode "subject_token_type=SUBJECT_TOKEN_TYPE" \
    --data-urlencode "subject_token=EXTERNAL_SUBJECT_TOKEN"  \
    --data-urlencode "options={\"userProject\":\"BILLING_PROJECT_NUMBER\"}"
```

```json
{
  "access_token": "ya29.dr.AaT61Tc6Ntv1ktbGkaQ9U_MQfiQw...",
  "issued_token_type": "urn:ietf:params:oauth:token-type:access_token",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

### Sessions

```bash
gcloud auth revoke
gcloud auth list
gcloud config set account principal://iam.googleapis.com/locations/global/workforcePools/WORKFORCE_POOL_ID/subject/SUBJECT_ID
```

### Quota exhaustion containment

```bash
gcloud iam workforce-pools update WORKFORCE_POOL_ID \
    --location=global \
    --disable-programmatic-signin
```

Re-enable with `--no-disable-programmatic-signin`.

### Create-provider error and fix

```text
ERROR: (gcloud.iam.workforce-pools.providers.create-oidc) INVALID_ARGUMENT: Missing OIDC web single sign-on config.
```

Set `web-sso-response-type` and `web-sso-assertion-claims-behavior` when creating the OIDC provider. Enable detailed audit logging with `--detailed-audit-logging` at provider creation.

## Options / Props

| `subject_token_type` | Meaning |
|---|---|
| `urn:ietf:params:oauth:token-type:id_token` | OIDC ID token (JWT) |
| `urn:ietf:params:oauth:token-type:saml2` | SAML assertion |

| Credential source | Behavior |
|---|---|
| File-sourced | Token loaded from a file; another process must refresh it before it expires |
| URL-sourced | Token fetched with HTTP GET from a local server; plain text or JSON ID token |
| Executable-sourced | Non-interactive or interactive executables returning the token |

| Troubleshooting item | Resolution |
|---|---|
| Inspect IdP response | HAR file: decode `SAMLResponse` or `id_token` on the `/signin-callback` path (not available for OIDC code flow); with gcloud decode the `--credential-source-file` content |
| Attribute mapping errors | Need `roles/iam.workforcePoolEditor`; add `https://auth.cloud.google/signin-callback/locations/global/workforcePools/POOL_ID/providers/PROVIDER_ID` to the IdP's allowed redirect URIs; use **Debug IdP token** in the provider details page |
| Permission denied | User lacks `roles/iam.workforcePoolAdmin` |
| HTTP 429 | Org quota `sts.googleapis.com/workforce_requests` (default 1,000 per minute) exhausted |

| 429 containment action | Effect |
|---|---|
| Stop the workload | None; recommended when identified |
| Disable programmatic sign-in on the pool | Blocks programmatic exchange including gcloud and kubectl for humans; console sign-in still works |
| Disable pool or provider | Blocks all authentication for it |

## Notes

- Warning: `gcloud auth login` stores credentials in the home directory, usable by anyone with file system access. Do not use it for automated workloads on remote systems with persistent storage; separate human and workload use and prefer a secret manager with environment variables.
- The principal needs `serviceusage.services.use` on the workforce pool user project / billing project.
- gcloud transparently refreshes the Google Cloud token while the IdP credential is still valid; once the IdP credential expires you must re-authenticate. Administrators can revoke all sessions for a subject (see revoke sessions in the official docs). The Looker integration uses `https://auth.cloud.google/authorize` and the Cloud OAuth API.
- During a 429 outage use an emergency administrator that does not authenticate through Workforce Identity Federation (for example a Cloud Identity super administrator). Throttled exchanges are rejected before validation and do not appear in Cloud Audit Logs; find the source from IdP sign-in logs or workload configurations. Deleting a subject does not reduce quota consumption. Prevent recurrence by moving workloads to Workload Identity Federation, retrying with exponential backoff and jitter, alerting at 80% quota, and requesting an increase in advance.
- Requests for HAR files from users: ask them to remove PII and cookies first.
- Source: https://docs.cloud.google.com/iam/docs/workforce-obtaining-short-lived-credentials
- Source: https://docs.cloud.google.com/iam/docs/troubleshooting-workforce-identity-federation
- Retrieved 2026-11-14. Content CC BY 4.0; code samples Apache 2.0.

## Related

- [workforce-identity-federation-overview.md](./workforce-identity-federation-overview.md)
- gcp-client-libraries covers ADC and client libraries; gcp-cli covers gcloud generally.
