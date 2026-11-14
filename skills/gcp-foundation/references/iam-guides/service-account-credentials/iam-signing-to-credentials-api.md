---
source: https://docs.cloud.google.com/iam/docs/migrating-to-credentials-api
---

# Migrating Signing from the IAM API to the Service Account Credentials API

The IAM API `signJwt` / `signBlob` methods have been deprecated since July 1, 2020; use the Service Account Credentials API (`iamcredentials.googleapis.com`).

## Signature / Usage

Endpoints (use the wildcard `-` for the project; do not put the project ID):

```text
POST https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/sa-email:signJwt
POST https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/sa-email:signBlob
```

Client library service account names:

```text
projects/-/serviceAccounts/my-service-account@my-project.iam.gserviceaccount.com
```

The old form (invalid for the new API) includes the project ID:

```text
projects/my-project/serviceAccounts/my-service-account@my-project.iam.gserviceaccount.com
```

gcloud commands that sign (`sign-jwt` is moving to the new API; add an `exp` claim, up to 1 hour ahead):

```bash
gcloud beta iam service-accounts sign-jwt
gcloud iam service-accounts sign-blob
```

## Options / Props

| Aspect | IAM API | Service Account Credentials API |
|---|---|---|
| Host | `iam.googleapis.com` | `iamcredentials.googleapis.com` |
| signJwt `exp` claim | If omitted, auto-set to 1 hour ahead; max 12 hours | Not added automatically; if provided, max 12 hours; you must provide it for Google API authentication |
| signBlob request field | `bytesToSign` (base64) | `payload` (same value) |
| signBlob response | `keyId`, `signature` | `keyId`, `signedBlob` (signature only) |
| Audit method name | `google.iam.admin.v1.SignBlob` / `SignJwt` | `SignBlob` / `SignJwt` |
| Audit service name | `iam.googleapis.com` | `iamcredentials.googleapis.com` |
| Quota | Separate | Separate; compare "Sign requests per minute" and "Generate credentials" on the Quotas page |

## Notes

- Client libraries are separate (add the IAM Credentials client; remove the old `iam_credentials`-style library when no longer needed). Python: use `sign_jwt()` / `sign_blob()`; `google-auth` >= 1.21.2; `python-storage` >= 1.30.0 when signing via those libraries.
- Data Access audit logs for the IAM API must be enabled to log signing requests; this also enables them for the Service Account Credentials API, and they count toward logging ingestion charges.
- Source: https://docs.cloud.google.com/iam/docs/migrating-to-credentials-api
- Retrieved 2026-11-14. Content CC BY 4.0; code samples Apache 2.0.

## Related

- [credential-access-boundaries.md](./credential-access-boundaries.md)
