---
source: https://docs.cloud.google.com/kms/docs/key-import
---

# Key import

You can import externally created keys into Cloud KMS as new key versions, into `SOFTWARE`, `HSM` (Multi-tenant Cloud HSM) or `HSM_SINGLE_TENANT` keys. Key material is wrapped for transit (automatically by the gcloud CLI or manually). Google has access to the wrapping private key only within the scope of the import job; for Cloud HSM keys it never leaves Cloud HSM.

## Signature / Usage

Creating an import job for a Cloud HSM target key:

```bash
gcloud kms import-jobs create strider --location=us-central1 \
    --keyring=fellowship \
    --import-method=rsa-oaep-3072-sha256-aes-256 \
    --protection-level=hsm
```

### Import flow (automatic wrapping)

1. Create a target key ring and key (no versions yet).
2. Create an import job defining the target and the import method (wrapping key algorithm). The public key wraps the key on the client; the private key stays in Google Cloud to unwrap.
3. Wrap the key: the gcloud CLI does this automatically, or wrap manually (configure OpenSSL, download the wrapping key once per import job, set variables and wrap once per key) for compliance reasons.
4. For up to three days, until the import job expires, make import requests. The CLI downloads the job's public key and wraps with it plus a client private key; the wrapped material is sent, unwrapped with the job's private key and inserted atomically as a new version of the target key.
5. For symmetric keys, set the imported version as primary yourself; it is not set automatically.

## Options / Props

### Supported key formats

| Key type | Requirement |
|----------|-------------|
| Symmetric encryption | 16 bytes (raw symmetric encryption only) or 32 bytes of binary data, not encoded (decode hex / base64 first) |
| Symmetric signing (MAC) | Length equal to the hash output length (HMAC-SHA256: 32 bytes), not encoded |
| Asymmetric encryption or signing | PKCS #8 (RFC 5208), DER-encoded, using a length and algorithm combination supported by Cloud KMS |
| RSA public exponent | Must be 65,537 or higher (FIPS PUB 186-4 B.3.1) |

### Other limits

| Item | Value |
|------|-------|
| Protection levels | `SOFTWARE`, `HSM`, `HSM_SINGLE_TENANT`; can't import into a Cloud EKM key |
| Wrapping key size | Default 3072; set import method for 4096 |
| Import job lifetime | Up to three days until it expires |

## Notes

- Aspects such as key length can't be changed after creation; such keys can't be imported.
- Never share or commit unwrapped key files or manually generated wrapped keys; delete local plaintext key material after import.
- Source: https://docs.cloud.google.com/kms/docs/key-import (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/kms/import-jobs/create (gcloud 593.0.0 help).

## Related

- [formatting-keys-for-import.md](./formatting-keys-for-import.md)
- [key-wrapping.md](./key-wrapping.md)
- [single-tenant-hsm.md](./single-tenant-hsm.md)
