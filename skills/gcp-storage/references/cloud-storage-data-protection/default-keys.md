---
source: https://docs.cloud.google.com/storage/docs/encryption/default-keys
---

# Google-owned and Google-managed encryption keys

Cloud Storage always encrypts data on the server side, before it is written to disk, at no additional charge, using keys that Cloud Storage manages on your behalf.

## Signature / Usage

No setup is required. When you need to supply your own key material for objects, these request headers apply (snippet taken from https://docs.cloud.google.com/storage/docs/encryption/customer-supplied-keys; the default encryption page itself has no code):

```text
x-goog-encryption-algorithm
x-goog-encryption-key
x-goog-encryption-key-sha256
```

## Options / Props

| Item | Value |
|---|---|
| Algorithm | AES-256, in most cases using Galois/Counter Mode (GCM) |
| Cost | No additional charge |
| Configuration | None required; no change to how you access the service; no visible performance impact |
| Reads | Data is automatically decrypted for an authorized user |
| In transit | Use TLS (HTTPS) to protect data over the Internet |

## Notes

- Keys are managed with the same hardened key management systems Google uses for its own encrypted data, including strict access controls and auditing. Details on rotation and storage are in Google's "Default encryption at rest" documentation.
- You can configure which encryption methods are allowed or restricted for new objects in your buckets (see https://docs.cloud.google.com/storage/docs/encryption/enforce-encryption-types).
- Other options: customer-managed keys (CMEK) and customer-supplied keys (CSEK); see the related pages.
- Cloud Storage is Google Cloud's object storage; it is distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`).
- Source: https://docs.cloud.google.com/storage/docs/encryption/default-keys (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source (snippet): https://docs.cloud.google.com/storage/docs/encryption/customer-supplied-keys

## Related

- [customer-managed-keys.md](./customer-managed-keys.md)
- [customer-supplied-keys.md](./customer-supplied-keys.md)
