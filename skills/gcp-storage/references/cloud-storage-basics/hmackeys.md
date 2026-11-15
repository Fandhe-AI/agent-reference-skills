---
source: https://docs.cloud.google.com/storage/docs/authentication/hmackeys
---

# HMAC keys

HMAC keys are credentials associated with an account (typically a service account) used to create HMAC-SHA256 signatures that authenticate requests to the Cloud Storage XML API. They let you reuse existing code written for other storage providers.

## Signature / Usage

Cloud Monitoring metric used when migrating from user account keys to service account keys (labels `access_id` and `authentication_method` help track which keys are in use):

```text
storage.googleapis.com/authn/authentication_count
```

Steps to create and manage keys: https://docs.cloud.google.com/storage/docs/authentication/managing-hmackeys.

## Options / Props

### Key parts

| Part | Detail |
|---|---|
| Access ID | Alphanumeric string linked to an account; 61 characters for a service account, 24 characters for a user account |
| Secret | 40-character Base-64 encoded pre-shared key linked to an access ID; far more sensitive than the access ID |

### Restrictions

| Restriction | Detail |
|---|---|
| API | XML API only, not the JSON API |
| Count | Maximum 10 HMAC keys per service account; deleted keys do not count |
| Propagation | Up to 60 seconds after creation before a service account key is usable; keys of a deleted service account can work up to 5 minutes; up to 5 minutes to become usable again after undeleting the service account |
| `restrictAuthTypes` constraint | When enabled on a resource you can no longer create or activate HMAC keys for the specified account type in it |

## Notes

- HMAC keys are separate from normal service account RSA keys. They cannot generate OAuth 2.0 tokens; RSA keys can generate both OAuth 2.0 tokens and XML API signatures.
- The secret is shown once when you create a service account key; it cannot be retrieved by you or Google Cloud, so store it securely with its access ID and create a new key if it is lost. User account keys are created on the Interoperability tab of Cloud Storage Settings (needs `resourcemanager.projects.get`).
- Best practices: do not share secrets, rotate keys regularly, delete and replace keys immediately if you suspect misuse, and update code with new keys before deleting old keys (deleted keys become invalid immediately and are not recoverable).
- Deleting an account deletes its HMAC keys; disable the account and confirm traffic is unaffected before deleting it.
- Prefer service accounts over user accounts for production. After migrating, grant the service account the needed roles (for example `Storage Object Admin`, or separate accounts with `Storage Object Viewer` for reading and `Storage Object Creator` for writing), test, verify with the metric above that user account keys are unused, then delete them and revoke the user's access. Optionally enable `restrictAuthTypes` on user account HMAC keys.
- Source: https://docs.cloud.google.com/storage/docs/authentication/hmackeys (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [xml-api-overview.md](./xml-api-overview.md)
- [interoperability.md](./interoperability.md)
- [quotas.md](./quotas.md)
