---
source: https://docs.cloud.google.com/secret-manager/docs/overview
---

# Secret Manager overview

Secret Manager stores and manages sensitive data such as API keys, usernames, passwords and certificates. This page covers the default global service, which lets you store and access secrets from any Google Cloud region. A secret is a global resource holding metadata (labels, annotations, permissions) and secret versions; a secret version stores the actual data and is identified by a unique ID or timestamp.

## Signature / Usage

### Create a secret (global, automatic replication is the CLI default)

```bash
gcloud secrets create SECRET_ID \
    --replication-policy="REPLICATION_POLICY"
```

### Capabilities

- Versions: gradual rollouts, emergency rollback, audit history; pin versions to workloads, add aliases, disable or destroy versions.
- Encryption: TLS in transit, AES-256 at rest by default; optional Customer-Managed Encryption Keys (CMEK) from Cloud KMS.
- Access: fine-grained IAM roles and IAM conditions on Secret Manager resources.
- Replication: automatic (Google Cloud chooses regions; you are charged for one location) or user managed (you choose regions; you are charged per location).
- Rotation: scheduled rotation notifications.
- Data residency: regional secrets.
- Parameter Manager: an extension of Secret Manager for application configuration (database connection strings, feature flags, environment names, port numbers); it can reference secrets stored in Secret Manager. You must enable the Parameter Manager API and grant the required IAM roles.

## Options / Props

### Secret Manager vs Cloud KMS

| Feature | Secret Manager | Cloud KMS |
|---|---|---|
| Primary function | Store, manage, and access secrets as binary blobs or text strings. | Manage cryptographic keys and use them to encrypt or decrypt data. |
| Data stored | Actual secret values. With the appropriate permissions, you can view the contents of the secret. | Cryptographic keys. You can't view, extract, or export the actual cryptographic secrets (the bits and bytes) that are used for encryption and decryption operations. |
| Encryption | Encrypts secrets at rest and in transit using Google-owned and managed keys or customer-managed keys. | Provides encryption and decryption capabilities for other services. |
| Typical use cases | Store configuration information such as database passwords, API keys, or TLS certificates needed by an application at runtime. | Handle large encryption workloads, such as encrypting rows in a database or encrypting binary data such as images and files. You can also use Cloud KMS to perform other cryptographic operations such as signing and verification. |

## Notes

- Google Cloud Secret Manager (`gcloud secrets`, `secretmanager.googleapis.com`) — not Cloudflare Workers secrets (`cloudflare-workers`) or Vercel environment variables (`vercel`).
- Secret Manager always encrypts secret data before it is persisted, using server-side keys it manages on your behalf; no setup is needed. The API always communicates over secure HTTP(S).
- Snippet taken from https://docs.cloud.google.com/secret-manager/docs/creating-and-accessing-secrets (`REPLICATION_POLICY` is `automatic` or `user-managed`; `user-managed` also needs `--locations`, see gcloud 593.0.0 help).
- The regional service is documented in [overview-rs.md](./overview-rs.md); the choice is in [global-regionalized-service-comparison.md](./global-regionalized-service-comparison.md).
- Source: https://docs.cloud.google.com/secret-manager/docs/overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [creating-and-accessing-secrets.md](./creating-and-accessing-secrets.md)
- [choosing-replication.md](./choosing-replication.md)
- [best-practices.md](./best-practices.md)
- [overview-rs.md](./overview-rs.md)
