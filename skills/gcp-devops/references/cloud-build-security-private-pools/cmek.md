---
source: https://docs.cloud.google.com/build/docs/securing-builds/cmek
---

# Cloud Build and customer-managed encryption keys (CMEK)

Cloud Build provides CMEK compliance by encrypting the build-time persistent disk with an ephemeral key generated for each build. No configuration is required. The key is accessible only to the build processes that need it for the lifetime of the build, then wiped from memory and destroyed. It is not retained anywhere, not accessible to Google engineers or support staff, and cannot be restored, so data protected with it is permanently inaccessible once the build completes.

## Signature / Usage

### Keep build logs CMEK compliant

To be CMEK compliant, store build logs only in Cloud Logging or in your own Cloud Storage bucket. Use `logging: CLOUD_LOGGING_ONLY` for Cloud Logging, or `logging: GCS_ONLY` with a `logsBucket` for a user-created Cloud Storage bucket as below.

```yaml
steps:
- name: 'bash'
  args: ['echo', 'Hello world!']
logsBucket: 'LOGS_BUCKET_LOCATION'
options:
  logging: GCS_ONLY
```

## Options / Props

### How ephemeral key encryption works

| Step | What Cloud Build does |
|---|---|
| 1 | Mints a random 256-bit encryption key for each build-time persistent disk |
| 2 | Uses the Customer-Supplied Encryption Key (CSEK) feature of persistent disk with this key as the disk encryption key |
| 3 | Destroys the ephemeral key as soon as the disk is created; the key is never logged or written to persistent storage and is irretrievable |
| 4 | Deletes the persistent disk when the build completes; no traces of the key or the encrypted data remain in Google infrastructure |

## Notes

- Source: https://docs.cloud.google.com/build/docs/securing-builds/cmek (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/build/docs/securing-builds/configure-user-specified-service-accounts (build config storing logs in a user-created Cloud Storage bucket).
- Ephemeral key encryption does not apply to source mirroring: when you create or trigger a build using source mirroring (and not GitHub triggers), your source code is stored in Cloud Storage or Cloud Source Repositories and you control its storage location and encryption. Cloud Source Repositories is End of Sale (unavailable to new customers since June 17, 2024).
- Log storage options are described at https://docs.cloud.google.com/build/docs/securing-builds/store-manage-build-logs. The source states logs must be stored "only in Cloud Logging" or "your own Cloud Storage bucket" to be CMEK compliant.
- Cloud KMS keys themselves are covered by the `gcp-security` skill.

## Related

- [configure-user-specified-service-accounts.md](./configure-user-specified-service-accounts.md)
- [generate-validate-build-provenance.md](./generate-validate-build-provenance.md)
