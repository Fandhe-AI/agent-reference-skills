---
source: https://docs.cloud.google.com/kms/docs/mac-signatures
---

# MAC signatures

A MAC signature verifies the integrity and authenticity of data using symmetric cryptography: the same secret key creates and verifies the MAC tag, so sender and receiver must share the key. Cloud KMS supports only HMAC algorithms for keys with purpose `MAC`.

## Signature / Usage

### Create a MAC signature

Per the gcloud help, the signature is saved base64 encoded; integrity verification of the request and response is on by default.

```bash
gcloud kms mac-sign --location=us-central1 --keyring=hitchhiker \
  --key=dont-panic --version=3 --input-file=/tmp/my/file.to.sign \
  --signature-file=/tmp/my/signature
```

### Workflow (from the source)

1. Signer and recipient agree on a shared MAC key.
2. The signer performs a sign operation to compute a MAC tag.
3. The signer gives the data and MAC tag to the recipient.
4. The recipient verifies with the shared key; failure means the data was altered.

## Options / Props

| Item | Value |
|---|---|
| Key purpose | `MAC` |
| Algorithms | HMAC only (hash functions such as SHA-2 or SHA-3); see the algorithms page |
| Maximum file size | 16 KiB for Cloud HSM keys; 64 KiB for all other keys |

## Notes

- MAC tags can't prove which of the two key holders signed the data. To verify the sender, use digital signatures with asymmetric keys.
- HMAC strength depends on the hash function, hash output size and key size. A good fit for file-transfer integrity checks because it is efficient.
- Per the algorithms page, keys with purpose `MAC` support `cryptoKeyVersions.macSign` and `cryptoKeyVersions.macVerify`; gcloud 593.0.0 has `gcloud kms mac-verify` for verification.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/kms/mac-sign (gcloud 593.0.0 help).
- Source: https://docs.cloud.google.com/kms/docs/mac-signatures (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [algorithms.md](./algorithms.md)
- [digital-signatures.md](./digital-signatures.md)
