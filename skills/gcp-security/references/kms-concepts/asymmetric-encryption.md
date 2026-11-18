---
source: https://docs.cloud.google.com/kms/docs/asymmetric-encryption
---

# Asymmetric encryption

Asymmetric encryption encrypts plaintext with the public key of a key pair and decrypts with the private key. Cloud KMS supports RSA algorithms for keys with purpose `ASYMMETRIC_DECRYPT`. It does not encrypt for you: you retrieve the public key and encrypt with open tools such as OpenSSL, then decrypt with Cloud KMS.

## Signature / Usage

### Decrypt data with an asymmetric key

The gcloud help states that, by default, integrity verification is performed on data sent to and received from Cloud KMS.

```bash
gcloud kms asymmetric-decrypt --location=us-central1 \
  --keyring=hitchhiker --key=dont-panic --version=3 \
  --ciphertext-file=/tmp/my/secret.file.enc \
  --plaintext-file=/tmp/my/secret.file.dec
```

### Workflow (from the source)

1. The sender retrieves the recipient's public key.
2. The sender encrypts plaintext with the public key.
3. The sender sends the ciphertext to the recipient.
4. The recipient decrypts with the private key.

## Options / Props

| Capability | Detail |
|---|---|
| Create key | Asymmetric key with purpose `ASYMMETRIC_DECRYPT` (see the RSA decryption algorithms on the algorithms page) |
| Retrieve public key | Used to encrypt data outside Cloud KMS; Cloud KMS has no method to asymmetrically encrypt |
| Decrypt | Decrypt data with the asymmetric key in Cloud KMS |

## Notes

- Asymmetric encryption supports only a very small plaintext size, so it is generally used for encryption keys, not large data. It can be a variation of envelope encryption: anyone with the public key encrypts the DEK, and only Cloud KMS can decrypt it on behalf of the key owner.
- RSA encryption is susceptible to quantum attacks ("store now, decrypt later"); see key encapsulation for long-term confidentiality.
- Never commit or share decrypted plaintext files, and don't print decrypted keys in shared terminals or CI logs.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/kms/asymmetric-decrypt (gcloud 593.0.0 help).
- Source: https://docs.cloud.google.com/kms/docs/asymmetric-encryption (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [algorithms.md](./algorithms.md)
- [envelope-encryption.md](./envelope-encryption.md)
- [key-encapsulation-mechanisms.md](./key-encapsulation-mechanisms.md)
