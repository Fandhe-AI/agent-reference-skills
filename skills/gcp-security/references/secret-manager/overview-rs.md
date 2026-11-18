---
source: https://docs.cloud.google.com/secret-manager/regional-secrets/overview-rs
---

# Secret Manager overview (regional secrets)

The regional service lets you specify that your secrets can only be stored or accessed in a particular region. A regional secret's metadata includes replication locations, labels, annotations and permissions; secret versions hold the data and provide an audit trail. The default global service is described in [overview.md](./overview.md).

## Signature / Usage

### Create a secret restricted to one location

This is the global service's user-managed replication example restricted to one location; the regional service uses the `--location=LOCATION` flag of the same command instead.

```bash
gcloud secrets create my-secret --data-file=/tmp/secret \
    --replication-policy=user-managed --locations=us-central1
```

### Capabilities

- Versions: rollback, recovery and auditing; aliases; disable or destroy versions.
- Encryption: TLS in transit, AES-256 at rest; optional CMEK for regional secrets.
- Access: IAM roles and conditions (regional access-control and manage-access pages).
- Rotation: scheduled rotation (regional rotation schedules page).
- Data residency: store sensitive data within a specific location.
- Parameter Manager: extension for application configuration; can reference secrets; requires the Parameter Manager API and the required IAM roles.

## Options / Props

### Secret Manager vs Cloud KMS

| Feature | Secret Manager | Cloud KMS |
|---|---|---|
| Primary function | Store, manage, and access secrets as binary blobs or text strings. | Manage cryptographic keys and use them to encrypt or decrypt data. |
| Data stored | Actual secret values. With the appropriate permissions, you can view the contents of the secret. | Cryptographic keys. You can't view, extract, or export the actual cryptographic secrets (the bits and bytes) that are used for encryption and decryption operations. |
| Encryption | Encrypts secrets at rest and in transit using Google-owned and managed keys or customer-managed keys. | Provides encryption and decryption capabilities for other services. |
| Typical use cases | Store configuration information such as database passwords, API keys, or TLS certificates needed by an application at runtime. | Handle large encryption workloads, such as encrypting rows in a database or encrypting binary data such as images and files. You can also use Cloud KMS to perform other cryptographic operations such as signing and verification. |

## Notes

- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/secrets/create (gcloud 593.0.0 help). `--location=LOCATION` is documented on the same command. Regional locations: [locations.md](./locations.md). Data written with `--data-file=` avoids putting the value on the command line.
- Secret Manager always encrypts data before it is persisted (AES-256) and the API always communicates over secure HTTP(S). For CMEK on regional secrets see "Add CMEK encryption to regional secrets" (https://docs.cloud.google.com/secret-manager/regional-secrets/create-secret-cmek-encryption). Disabling or destroying a CMEK key makes the data encrypted with it inaccessible.
- Source: https://docs.cloud.google.com/secret-manager/regional-secrets/overview-rs (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [global-regionalized-service-comparison.md](./global-regionalized-service-comparison.md)
- [locations.md](./locations.md)
