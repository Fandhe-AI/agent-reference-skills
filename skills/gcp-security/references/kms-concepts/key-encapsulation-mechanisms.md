---
source: https://docs.cloud.google.com/kms/docs/key-encapsulation-mechanisms
---

# Key encapsulation mechanisms

A key encapsulation mechanism establishes a shared secret between two parties over an untrusted channel using key generation, encapsulation (public key produces a shared secret and ciphertext) and decapsulation (private key recovers the secret). Cloud KMS keys with purpose `KEY_ENCAPSULATION` support decapsulation; encapsulation must be done outside Cloud KMS with the public key.

## Signature / Usage

### Decapsulate a shared secret

Decapsulate a ciphertext with the private key of a `KEY_ENCAPSULATION` key version.

```bash
gcloud kms decapsulate --location=us-central1 \
  --keyring=my-keyring --key=my-key --version=3 \
  --ciphertext-file=/tmp/my/secret.file.enc \
  --shared-secret-file=/tmp/my/secret.file.dec
```

### Workflow (from the source)

1. The sender retrieves the recipient's public key.
2. The sender encapsulates with the public key, generating a shared secret and ciphertext.
3. The sender sends the ciphertext.
4. The recipient decapsulates with the private key; both now share the secret.

## Options / Props

### Post-quantum KEM sizes (bytes)

| Algorithm | Public key | Ciphertext | Shared secret |
|---|---|---|---|
| ML_KEM_768 | 1184 | 1088 | 32 |
| ML_KEM_1024 | 1568 | 1568 | 32 |
| KEM_XWING | 1216 | 1120 | 32 |

### Cloud KMS capabilities

| Capability | Detail |
|---|---|
| Create key | Purpose `KEY_ENCAPSULATION` with a key encapsulation algorithm |
| Retrieve public key | For a KEM key |
| Decapsulate | `decapsulate` with the private key |
| Encapsulate | Not provided; use open SDKs and tools with the public key |

## Notes

- Cloud KMS supports ML-KEM-768 and ML-KEM-1024 (NIST FIPS 203) and X-Wing, a hybrid KEM combining ML-KEM-768 with X25519. PQ-KEMs resist "store now, decrypt later" attacks that target RSA / ECDSA-protected data.
- KEMs are a building block for key exchange protocols and Hybrid Public Key Encryption (HPKE, RFC 9180).
- Per the algorithms page, key encapsulation keys currently use the `software` protection level only.
- The decapsulated shared secret is written to a file; protect it and don't print it in shared terminals or CI logs.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/kms/decapsulate (gcloud 593.0.0 help).
- Source: https://docs.cloud.google.com/kms/docs/key-encapsulation-mechanisms (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [algorithms.md](./algorithms.md)
- [asymmetric-encryption.md](./asymmetric-encryption.md)
