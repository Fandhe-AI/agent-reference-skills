---
source: https://docs.cloud.google.com/kms/docs/digital-signatures
---

# Digital signatures

A digital signature verifies the integrity and authenticity of data and provides non-repudiation. The signer uses a private key to sign; anyone with the public key can verify. Cloud KMS creates asymmetric `ASYMMETRIC_SIGN` keys, signs, and returns public keys, but does not verify signatures itself.

## Signature / Usage

### Create a signature and retrieve the public key

The output paths are examples; `--public-key-format` must be `nist-pqc` for NIST PQC algorithms (the help states this).

```bash
gcloud kms asymmetric-sign --location=us-central1 \
  --keyring=hitchhiker --key=dont-panic --version=3 \
  --digest-algorithm=sha256 --input-file=/tmp/my/file.to.sign \
  --signature-file=/tmp/my/signature
```

Adapted (not in the official docs): the public key is retrieved for the key version used to sign (`us-central1` / `hitchhiker` / `dont-panic` / version `3`).

```bash
gcloud kms keys versions get-public-key 3 --key=dont-panic \
  --keyring=hitchhiker --location=us-central1 \
  --public-key-format=pem --output-file=/tmp/my/public_key.file
```

### Signing workflow (from the source)

1. The signer creates an asymmetric key that supports signing (usable for many signatures).
2. The signer performs a private key operation over the data.
3. The signer gives the data and signature to the recipient.
4. The recipient verifies with the signer's public key; failure means the data was altered.

## Options / Props

### PQC key and signature sizes (bytes)

| Algorithm | Private key | Public key | Signature | NIST Security Category |
|---|---|---|---|---|
| SLH_DSA_SHA2_128s | 64 | 32 | 7856 | 1 |
| ML_DSA_44 | 2560 | 1312 | 2420 | 2 |
| ML_DSA_65 | 4032 | 1952 | 3309 | 3 |
| ML_DSA_87 | 4896 | 2592 | 4627 | 5 |

### Cloud KMS functionality

| Capability | Detail |
|---|---|
| Create key | Asymmetric key with purpose `ASYMMETRIC_SIGN`; supports elliptic curve and RSA signing algorithms |
| Create signature | Create a digital signature with the asymmetric key |
| Retrieve public key | For an asymmetric key version |
| Verify | Not provided by Cloud KMS; use open tools such as OpenSSL with the retrieved public key |

## Notes

- NIST PQC standards: ML-DSA (FIPS 204) and SLH-DSA (FIPS 205). Supported: pure randomized `ML-DSA-44`, `ML-DSA-65`, `ML-DSA-87` (or external-μ variants) and `SLH-DSA-SHA2-128s` (or its pre-hash variant). Only standalone implementations are supported because there is no standard for hybridizing post-quantum and classical signatures.
- Example use cases: validating builds (signed binaries) and validating certificate subjects issued by a CA.
- Generated signature and public key files are inputs for sharing, but never commit or share private key material (it never leaves Cloud KMS).
- Snippets taken from https://docs.cloud.google.com/sdk/gcloud/reference/kms/asymmetric-sign and https://docs.cloud.google.com/sdk/gcloud/reference/kms/keys/versions/get-public-key (gcloud 593.0.0 help).
- Adapted from the official docs: the source's `get-public-key` example uses a different key (`us-east1` / `fellowship` / `frodo` / version `2`) than the signing example; it is changed to the signing key version so that the public key can verify the signature.
- Source: https://docs.cloud.google.com/kms/docs/digital-signatures (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [algorithms.md](./algorithms.md)
- [mac-signatures.md](./mac-signatures.md)
- [key-rotation.md](./key-rotation.md)
