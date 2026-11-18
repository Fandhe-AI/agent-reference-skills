---
source: https://docs.cloud.google.com/kms/docs/key-wrapping
---

# Key wrapping

Key wrapping encrypts one key with another to store it or send it over an untrusted channel. Cloud KMS uses it to import keys: each import job has an import method that names the wrapping protocol. The gcloud CLI can wrap automatically, or you can wrap manually (for example with OpenSSL on Linux).

## Signature / Usage

Creating an import job with the recommended import method:

```bash
gcloud kms import-jobs create strider --location=us-central1 \
    --keyring=fellowship \
    --import-method=rsa-oaep-3072-sha256-aes-256 \
    --protection-level=hsm
```

### RSAES-OAEP with SHA-1 / SHA-256 + AES-KWP

Hybrid scheme: (1) the import job public key encrypts a one-time-use AES-256 key with RSAES-OAEP and MGF-1 and the import method's digest; (2) that AES-256 key encrypts the target key material with AES Key Wrap with Padding (RFC 5649). The wrapped material is the concatenation of step 1 then step 2 output. Same as PKCS #11 `CKM_RSA_AES_KEY_WRAP`; alternatively use `CKM_RSA_PKCS_OAEP` and `CKM_AES_KEY_WRAP_PAD`. If your source HSM lacks it, wrap manually with the job's public key.

### RSAES-OAEP with SHA-256

The job public key directly encrypts the target key material with RSAES-OAEP, MGF-1 and SHA-256 (PKCS #11 `CKM_RSA_PKCS_OAEP`). Its size limits make it unsuitable for importing RSA private keys.

## Options / Props

| Import method | Import job key type | Key wrapping algorithm |
|---|---|---|
| RSA_OAEP_3072_SHA1_AES_256 | 3072-bit RSA | RSAES-OAEP with SHA-1 + AES-KWP |
| RSA_OAEP_4096_SHA1_AES_256 | 4096-bit RSA | RSAES-OAEP with SHA-1 + AES-KWP |
| RSA_OAEP_3072_SHA256_AES_256 (recommended) | 3072-bit RSA | RSAES-OAEP with SHA-256 + AES-KWP |
| RSA_OAEP_4096_SHA256_AES_256 | 4096-bit RSA | RSAES-OAEP with SHA-256 + AES-KWP |
| RSA_OAEP_3072_SHA256 | 3072-bit RSA | RSAES-OAEP with SHA-256 |
| RSA_OAEP_4096_SHA256 | 4096-bit RSA | RSAES-OAEP with SHA-256 |

## Notes

- Format key material before wrapping (see formatting-keys-for-import). Manually wrapped key files and unwrapped keys must not be committed or shared.
- The gcloud 593.0.0 help lists further import methods (`hpke-kem-ml-kem-1024-hkdf-sha256-aes-256-gcm`, `hpke-kem-ml-kem-768-hkdf-sha256-aes-256-gcm`, `hpke-kem-xwing-hkdf-sha256-aes-256-gcm`) that this page does not describe.
- Source: https://docs.cloud.google.com/kms/docs/key-wrapping (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/kms/import-jobs/create (gcloud 593.0.0 help).

## Related

- [key-import.md](./key-import.md)
- [formatting-keys-for-import.md](./formatting-keys-for-import.md)
