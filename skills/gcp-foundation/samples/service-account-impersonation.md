---
source: https://docs.cloud.google.com/docs/authentication/use-service-account-impersonation
---

# Create a Service Account and Impersonate It (No Key File)

Create a service account, give a caller Service Account Token Creator on it, and use short-lived credentials instead of a key.

## Signature / Usage

### Create the service account and grant it a role

```bash
gcloud iam service-accounts create SERVICE_ACCOUNT_NAME \
  --description="DESCRIPTION" \
  --display-name="DISPLAY_NAME"
```

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="serviceAccount:SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com" \
  --role="ROLE_NAME"
```

### Allow the caller to impersonate it

The caller needs Service Account Token Creator (`roles/iam.serviceAccountTokenCreator`) on the service account, even in a project the caller created. Enable the Service Account Credentials API (`iamcredentials.googleapis.com`) first.

```bash
gcloud iam service-accounts add-iam-policy-binding \
  SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com \
  --member="user:USER_EMAIL" \
  --role="roles/iam.serviceAccountTokenCreator"
```

### Impersonate for one gcloud command

```
gcloud storage buckets list --impersonate-service-account=SERVICE_ACCT_EMAIL
```

### Impersonate by default in gcloud

```
gcloud config set auth/impersonate_service_account SERVICE_ACCT_EMAIL
```

Stop impersonating:

```
gcloud config unset auth/impersonate_service_account
```

### Impersonate for client libraries (local ADC)

```
gcloud auth application-default login --impersonate-service-account SERVICE_ACCT_EMAIL
```

### Inspect and clean up

```bash
gcloud iam service-accounts list --project=PROJECT_ID
```

```bash
gcloud iam service-accounts disable SA_NAME@PROJECT_ID.iam.gserviceaccount.com
```

```bash
gcloud iam service-accounts delete \
    SA_NAME@PROJECT_ID.iam.gserviceaccount.com
```

## Options / Props

| Field | Rule |
|---|---|
| `SERVICE_ACCOUNT_NAME` | 6-30 characters, lowercase alphanumerics and dashes; cannot be changed after creation |
| Create role | `roles/iam.serviceAccountCreator` |
| Impersonation role | `roles/iam.serviceAccountTokenCreator` (contains `iam.serviceAccounts.getAccessToken`) |

## Notes

- Impersonation needs a prior authenticated identity and the credentials do not persist, so it is safer than a service account key.
- Impersonation should involve two principals; self-impersonation lets a service account mint tokens that can be refreshed in perpetuity.
- Deleting is destructive: undelete works only within 30 days, and a re-created same-name account does not inherit roles. Use a throwaway project for the cleanup commands.
- After creation wait 60 seconds or more; reads are eventually consistent.
- Source: https://docs.cloud.google.com/docs/authentication/use-service-account-impersonation (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/iam/docs/service-accounts-create (retrieved 2026-11-14)

## Related

- [service-account-impersonation.md](../references/auth-mcp/credentials-and-tokens/service-account-impersonation.md)
- [service-accounts-create-manage.md](../references/iam-guides/service-account-lifecycle/service-accounts-create-manage.md)
- [set-up-adc.md](../references/auth-mcp/adc/set-up-adc.md)
