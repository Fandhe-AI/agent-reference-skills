---
source: https://docs.cloud.google.com/docs/authentication/provide-credentials-adc
---

# Set Up Application Default Credentials for Local Development

Create local ADC from a user account or by impersonating a service account, and attach a service account for production resources.

## Signature / Usage

### User account

```bash
gcloud auth application-default login
```

```bash
gcloud init
```

Revoke the local ADC file when no longer needed:

```bash
gcloud auth application-default revoke
```

### Service account impersonation

Requires Service Account Token Creator (`roles/iam.serviceAccountTokenCreator`) on the service account.

```
gcloud auth application-default login --impersonate-service-account SERVICE_ACCT_EMAIL
```

### Resource with an attached service account

Create the service account, grant it a role, and let the deploying principal attach it:

```bash
gcloud iam service-accounts create SERVICE_ACCOUNT_NAME
```

```bash
gcloud projects add-iam-policy-binding PROJECT_ID --member="serviceAccount:SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com" --role=ROLE
```

```bash
gcloud iam service-accounts add-iam-policy-binding SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com --member="user:USER_EMAIL" --role=roles/iam.serviceAccountUser
```

### On-premises or another cloud

The preferred approach is Workload Identity Federation: create a credential configuration file and point `GOOGLE_APPLICATION_CREDENTIALS` at it (see the GitHub Actions sample for a pipeline example).

## Options / Props

| Environment | Method |
|---|---|
| Local development | `gcloud auth application-default login` (user) or `--impersonate-service-account` |
| Resource on Google Cloud | Attached user-managed service account (preferred for production) |
| Containerized | Local ADC for testing; Cloud Run service identity; Workload Identity Federation for GKE |
| On-premises / other cloud | Workload Identity Federation credential configuration file |
| Cloud Shell / Cloud Code | Sign-in credentials; gcloud cannot configure ADC there |

## Notes

- The gcloud CLI itself does not use ADC; `application-default login` only makes credentials available to client libraries.
- The local ADC file contains your refresh token; anyone with file system access can use it, so revoke it when done.
- Do not grant Owner, Editor, or Viewer to the attached service account in production; grant a predefined or custom role. Avoid the default service accounts (highly privileged).
- Service account key files are intentionally not shown here; keys are a security risk and may be blocked by organization policy. If a key is unavoidable, treat it as a high-risk credential in a disposable project.
- Source: https://docs.cloud.google.com/docs/authentication/provide-credentials-adc (retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/docs/authentication/set-up-adc-local-dev-environment (retrieved 2026-11-14)

## Related

- [set-up-adc.md](../references/auth-mcp/adc/set-up-adc.md)
- [how-adc-works.md](../references/auth-mcp/adc/how-adc-works.md)
- [troubleshoot-adc.md](../references/auth-mcp/adc/troubleshoot-adc.md)
