---
source: https://docs.cloud.google.com/iam/docs/service-account-impersonation
---

# Service account impersonation and credentials

How principals authenticate as service accounts: impersonation, short-lived credentials, self-impersonation limits, and service account keys.

## Signature / Usage

Ways to impersonate a service account:

- Set the gcloud `--impersonate-service-account` flag or the `impersonate-service-account` property; gcloud creates short-lived credentials and runs the command with them. The flag can also be used when creating an Application Default Credentials file so client libraries impersonate automatically.
- Create short-lived credentials with the Service Account Credentials API (`generateAccessToken()`), then use them for API requests.
- Use a credential configuration file with Workload Identity Federation (external workloads get an environment-specific credential, then a short-lived service account credential).

Public key endpoints for Google-owned and managed key pairs:

```text
X.509 certificate: https://www.googleapis.com/service_accounts/v1/metadata/x509/SERVICE_ACCOUNT_EMAIL
JSON Web Key (JWK): https://www.googleapis.com/service_accounts/v1/jwk/SERVICE_ACCOUNT_EMAIL
Raw format: https://www.googleapis.com/service_accounts/v1/metadata/raw/SERVICE_ACCOUNT_EMAIL
```

Self-impersonation error:

```text
FAILED_PRECONDITION: You can't create a token for the same service account that
you used to authenticate the request.
```

## Options / Props

| Credential type from the Service Account Credentials API |
|---|
| OAuth 2.0 access tokens (default lifetime 1 hour) |
| OpenID Connect (OIDC) ID tokens |
| Self-signed JSON Web Tokens (JWTs) |
| Self-signed binary blobs |

| Org policy constraint | Effect |
|---|---|
| `constraints/iam.disableServiceAccountKeyCreation` | Prevents creating user-managed service account keys |
| `constraints/iam.disableServiceAccountKeyUpload` | Prevents uploading a public key for a service account |
| `constraints/iam.serviceAccountKeyExpiryHours` | Sets an expiry (hours) for all newly created keys; existing keys unaffected |

## Notes

- Required permission to impersonate: `iam.serviceAccounts.getAccessToken` (for example `roles/iam.serviceAccountTokenCreator`).
- Impersonation always involves two identities (the principal and the service account); most audit logs record both. Some services (App Engine, GKE) do not log the identity that created the short-lived credentials. The Google Cloud console always uses your user credentials; you cannot impersonate there.
- Authentication without impersonation: attached service accounts and service account keys involve only one identity, so audit logs record only the service account. Keys or SSH access to privileged resources create privilege-escalation and non-repudiation risks.
- Use cases: temporary elevated access, testing whether a permission set suffices (create a service account with the roles to test, then impersonate), local development that requires a service account identity (avoids keys), and authenticating external apps via Workload Identity Federation.
- Self-impersonation is prohibited for: generating a new access token from a short-lived credential of the same account (self-signed JWTs are the exception), and signing a blob or JWT usable against the IAM API, Service Account Credentials API, or OAuth 2.0 API. This prevents indefinite refresh of stolen tokens; use different credentials (user credentials or another account) instead.
- Each service account has a Google-owned key pair (private key always in escrow; rotated regularly, probabilistically). Cache downloaded public keys at most 24 hours; a retrieved key is valid for at least 24 hours.
- User-managed keys: up to 10 per service account; Google stores only the public half. Create via the IAM API (private key returned once) or upload your own public key. If your organization was created on or after May 3, 2024, the key creation and upload constraints are enforced by default.
- Warning: service account keys are a security risk; choose a more secure alternative where possible, store keys in a hardware- or software-based key store, and validate keys from external sources.
- Expiry times: default is no expiry. Use short expiry (for example 8, 24, or 168 hours) for non-production or third-party tools; avoid for production workloads, CI pipelines, and rotation systems. To set an expiry you must stop enforcing `iam.disableServiceAccountKeyCreation`; if it was not previously enforced, confirm no resources need permanent keys first or you risk an outage.
- Source: https://docs.cloud.google.com/iam/docs/service-account-impersonation
- Source: https://docs.cloud.google.com/iam/docs/service-account-creds
- Retrieved 2026-11-14. Content CC BY 4.0; code samples Apache 2.0.

## Related

- [service-accounts-overview-types.md](./service-accounts-overview-types.md)
- [service-accounts-permissions-actas.md](./service-accounts-permissions-actas.md)
- gcp-client-libraries covers ADC code; gcp-cli covers gcloud.
