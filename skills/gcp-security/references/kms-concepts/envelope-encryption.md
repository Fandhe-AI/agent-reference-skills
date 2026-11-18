---
source: https://docs.cloud.google.com/kms/docs/envelope-encryption
---

# Envelope encryption

Envelope encryption encrypts (wraps) a data encryption key (DEK) with a key encryption key (KEK). With Cloud KMS as the central keystore at the application layer, you generate DEKs locally, encrypt data with them, wrap the DEKs with a Cloud KMS key, and store the encrypted data together with the wrapped DEK. The KEK never leaves Cloud KMS.

## Signature / Usage

### Encrypt a file with a Cloud KMS key

This is the direct (non-envelope) call, usable to wrap a small DEK file: per the gcloud help, the plaintext file must not be larger than 64KiB. By default the primary key version is used.

```bash
gcloud kms encrypt --key=frodo --keyring=fellowship \
  --location=global --plaintext-file=path/to/input/plaintext \
  --ciphertext-file=path/to/output/ciphertext
```

### Encrypt flow (from the source)

1. Generate a DEK locally (for example with OpenSSL, AES-256 in GCM).
2. Encrypt the data locally with the DEK.
3. Generate or reuse a Cloud KMS key as the KEK and use it to encrypt (wrap) the DEK.
4. Store the encrypted data and the wrapped DEK.

### Decrypt flow (from the source)

1. Retrieve the encrypted data and the wrapped DEK.
2. Use the Cloud KMS key to unwrap the DEK.
3. Decrypt the data with the plaintext DEK.

## Options / Props

### DEK best practices

| Practice |
|---|
| Generate DEKs locally |
| When stored, always encrypt DEKs at rest |
| Store the DEK near the data it encrypts |
| Generate a new DEK every time you write the data (then DEKs need no rotation) |
| Don't use the same DEK for data from two different users |
| Use a strong algorithm such as 256-bit AES in GCM |

### KEK best practices

| Practice |
|---|
| Store KEKs centrally |
| Set DEK granularity by use case (for example one KEK can wrap all DEKs of a workload) |
| Rotate keys regularly and after a suspected incident |

### Limits

| Item | Value |
|---|---|
| `Encrypt` / `Decrypt` maximum data input size | 64 KiB (Cloud KMS is designed to manage KEKs; data that won't approach this limit can be encrypted directly) |

### CSEK products

| Product | CSEK topic |
|---|---|
| Cloud Storage | Customer-supplied encryption keys |
| Compute Engine | Encrypt disks with customer-supplied encryption keys |

## Notes

- Warning from the source: do NOT store a plaintext DEK. Don't log or print plaintext DEKs in shared terminals or CI logs.
- Google Cloud encrypts customer content at rest at the storage layer by default using envelope encryption with Google's internal key management service. Several Google Cloud products integrate with Cloud KMS for CMEK; for products without CMEK you can implement application-layer envelope encryption, which also works for data in other clouds or on premises.
- With CSEK you supply an AES-256 key as the KEK, itself protected by a Cloud KMS key. Now that keys can be imported into Cloud KMS, imported keys with CMEK-enabled services can replace CSEK.
- The source links a sample using Tink and Cloud KMS (client-side encryption) and the OpenSSL EVP encryption / decryption examples; it contains no code of its own.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/kms/encrypt (gcloud 593.0.0 help).
- Source: https://docs.cloud.google.com/kms/docs/envelope-encryption (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [key-management-service.md](./key-management-service.md)
- [key-rotation.md](./key-rotation.md)
- [asymmetric-encryption.md](./asymmetric-encryption.md)
