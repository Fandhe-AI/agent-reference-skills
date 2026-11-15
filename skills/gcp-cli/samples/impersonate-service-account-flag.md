---
source: https://docs.cloud.google.com/sdk/docs/authorizing
---

# Elevate Temporarily with --impersonate-service-account

Run one gcloud command as a service account without a key file, then make impersonation the default or remove it.

## Signature / Usage

### Prerequisite

Your active account needs the Service Account Token Creator role (`roles/iam.serviceAccountTokenCreator`, which contains `iam.serviceAccounts.getAccessToken`) on the target service account. Authorize with your own identity first:

```bash
gcloud auth login
```

### Impersonate for one command

Official example (an identity token for an impersonated service account):

```bash
gcloud auth print-identity-token \
    --impersonate-service-account="my-account@example.iam.gserviceaccount.com" \
    --audiences="https://service-hash-uc.a.run.app"
```

Adapted (not in the official docs): the global `--impersonate-service-account` flag is applied to `gcloud projects list`; `SERVICE_ACCT_EMAIL` is the placeholder used on the Authorize page.

```bash
gcloud projects list --impersonate-service-account=SERVICE_ACCT_EMAIL
```

### Impersonate through a delegation chain

Adapted (not in the official docs): the comma-separated form described in the global flag help, written as a runnable command. The active account needs the role on `SERVICE_ACCOUNT_1`, which needs it on `SERVICE_ACCOUNT_2`.

```bash
gcloud projects list \
  --impersonate-service-account=SERVICE_ACCOUNT_1,SERVICE_ACCOUNT_2
```

### Print a short-lived access token

Adapted (not in the official docs): `--impersonate-service-account` (global flag) and `--lifetime` (`gcloud auth print-access-token`, in seconds) combined from their separate help texts.

```bash
gcloud auth print-access-token \
  --impersonate-service-account=SERVICE_ACCT_EMAIL \
  --lifetime=LIFETIME
```

### Impersonate by default, then stop

```bash
gcloud config set auth/impersonate_service_account SERVICE_ACCT_EMAIL
```

```bash
gcloud config unset auth/impersonate_service_account
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `--impersonate-service-account=EMAILS` | global flag | Make all API requests of this invocation as the service account (comma-separated list = delegation chain) |
| `auth/impersonate_service_account` | property | Default impersonated service account; the flag overrides it per invocation |
| `--lifetime=LIFETIME` | flag (`auth print-access-token`) | Token lifetime in seconds; default 3600, up to 43200 with an org policy constraint |
| `roles/iam.serviceAccountTokenCreator` | IAM role | Required on the target service account |

## Notes

- The impersonation is done without creating, downloading, or activating a key for the service account.
- Extending `--lifetime` beyond 3600 seconds requires the org policy constraint `constraints/iam.allowServiceAccountCredentialLifetimeExtension`; the flag only works while impersonation is in effect.
- If the property stays set, `gcloud auth application-default login` can also behave unexpectedly; the official fix is `gcloud config unset auth/impersonate_service_account` before logging in again.
- Granting the Token Creator role, ADC impersonation (`gcloud auth application-default login --impersonate-service-account`), and key-less design belong to the `gcp-foundation` skill. Client-library usage is in the `gcp-client-libraries` skill.
- Source: https://docs.cloud.google.com/sdk/docs/authorizing (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference (Google Cloud CLI 593.0.0 help for `--impersonate-service-account`, retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/auth/print-identity-token (Google Cloud CLI 593.0.0 help, retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/auth/print-access-token (Google Cloud CLI 593.0.0 help, retrieved 2026-11-14)

## Related

- [authorizing-service-accounts.md](../references/config-auth/authorizing-service-accounts.md)
- [authorizing-accounts-credentials.md](../references/config-auth/authorizing-accounts-credentials.md)
- [properties.md](../references/config-auth/properties.md)
