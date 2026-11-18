---
source: https://docs.cloud.google.com/kms/docs/algorithms
---

# Key purposes and algorithms

A Cloud KMS key's function is set by its protection level (where operations run), purpose (which operations it can perform) and algorithm (the parameters). Each value has an "SDK" form for gcloud (lower-case) and a "REST" form for the Cloud KMS API. The purpose can't be changed after creation; the algorithm can change per new key version within the purpose's scope; the protection level can't change. The page also flags which algorithms are quantum-safe and which are recommended.

## Signature / Usage

### Algorithm naming formats

Naming patterns of algorithm names:

```text
EC_SIGN_ELLIPTIC_CURVE_DIGEST_ALGORITHM
```

```text
RSA_SIGN_PADDING_ALGORITHM_MODULUS_BIT_LENGTH_DIGEST_ALGORITHM
```

```text
RSA_SIGN_RAW_PADDING_ALGORITHM_MODULUS_BIT_LENGTH
```

```text
RSA_DECRYPT_PADDING_ALGORITHM_MODULUS_BIT_LENGTH_DIGEST_ALGORITHM
```

```text
HMAC_HASH_ALGORITHM
```

### Create an asymmetric signing key with a default algorithm

The SDK name of the algorithm goes in `--default-algorithm`.

```bash
gcloud kms keys create samwise --location=us-east1 \
  --keyring=fellowship --purpose=asymmetric-signing \
  --default-algorithm=ec-sign-p256-sha256
```

## Options / Props

### Protection levels

| SDK | REST | Where operations run |
|---|---|---|
| `software` | `SOFTWARE` | In software |
| `hsm` | `HSM` | In an HSM |
| `hsm-single-tenant` | `HSM_SINGLE_TENANT` | Dedicated cluster of HSM partitions for a single-tenant Cloud HSM instance |
| `external` | `EXTERNAL` | Key in an external key manager, connected over the internet. Limited to symmetric encryption and asymmetric signing |
| `external-vpc` | `EXTERNAL_VPC` | Key in an external key manager, connected over VPC. Limited to symmetric encryption and asymmetric signing |

### Key purposes

| Use for | SDK | REST | Methods |
|---|---|---|---|
| Symmetric encryption | `encryption` | `ENCRYPT_DECRYPT` | `cryptoKeys.encrypt`, `cryptoKeys.decrypt` |
| Raw symmetric encryption | `raw-encryption` | `RAW_ENCRYPT_DECRYPT` | `rawEncrypt`, `rawDecrypt` |
| Asymmetric signing | `asymmetric-signing` | `ASYMMETRIC_SIGN` | `cryptoKeyVersions.asymmetricSign`, `getPublicKey` |
| Asymmetric encryption | `asymmetric-encryption` | `ASYMMETRIC_DECRYPT` | `cryptoKeyVersions.asymmetricDecrypt`, `getPublicKey` |
| Key encapsulation | `key-encapsulation` | `KEY_ENCAPSULATION` | `cryptoKeyVersions.decapsulate`, `getPublicKey` |
| MAC signing | `mac` | `MAC` | `cryptoKeyVersions.macSign`, `macVerify` |

### Symmetric encryption (`ENCRYPT_DECRYPT`)

| SDK / REST | Description | Protection levels |
|---|---|---|
| `google-symmetric-encryption` / `GOOGLE_SYMMETRIC_ENCRYPTION` | AES-256 GCM, padded with Cloud KMS-internal metadata | `software`, `hsm`, `hsm-single-tenant` |
| `external-symmetric-encryption` / `EXTERNAL_SYMMETRIC_ENCRYPTION` | AES-256 GCM | `external`, `external-vpc` |

### Raw symmetric encryption (`RAW_ENCRYPT_DECRYPT`)

| SDK / REST | Description |
|---|---|
| `aes-128-cbc` / `AES_128_CBC` | AES-128 CBC, no authentication. Requires expert role: Cloud KMS Expert Raw AES-CBC Key Manager (`roles/cloudkms.expertRawAesCbc`) |
| `aes-128-ctr` / `AES_128_CTR` | AES-128 CTR, no authentication. Requires expert role: Cloud KMS Expert Raw AES-CTR Key Manager (`roles/cloudkms.expertRawAesCtr`) |
| `aes-128-gcm` / `AES_128_GCM` | AES-128 GCM with additional authenticated data (AAD) |
| `aes-256-cbc` / `AES_256_CBC` | AES-256 CBC, no authentication. Requires `roles/cloudkms.expertRawAesCbc` |
| `aes-256-ctr` / `AES_256_CTR` | AES-256 CTR, no authentication. Requires `roles/cloudkms.expertRawAesCtr` |
| `aes-256-gcm` / `AES_256_GCM` | AES-256 GCM with AAD |

### Elliptic curve signing

| SDK / REST | Description | Protection levels |
|---|---|---|
| `ec-sign-ed25519` / `EC_SIGN_ED25519` | EdDSA on Curve25519, PureEdDSA mode (raw data input, not hashed) | `software` |
| `ec-sign-p256-sha256` / `EC_SIGN_P256_SHA256` | Recommended. ECDSA P-256, SHA-256 | `software`, `hsm`, `hsm-single-tenant`, `external`, `external-vpc` |
| `ec-sign-p384-sha384` / `EC_SIGN_P384_SHA384` | ECDSA P-384, SHA-384 | `software`, `hsm`, `hsm-single-tenant`, `external`, `external-vpc` |
| `ec-sign-secp256k1-sha256` / `EC_SIGN_SECP256K1_SHA256` | ECDSA secp256k1, SHA-256 (signatures in normalized "lower-S" form only) | `hsm`, `hsm-single-tenant` |

### RSA signing

| SDK / REST | Description | Protection levels |
|---|---|---|
| `rsa-sign-pss-2048-sha256` / `RSA_SIGN_PSS_2048_SHA256` | RSASSA-PSS 2048-bit, SHA-256 | `software`, `hsm`, `hsm-single-tenant`, `external`, `external-vpc` |
| `rsa-sign-pss-3072-sha256` / `RSA_SIGN_PSS_3072_SHA256` | Recommended. RSASSA-PSS 3072-bit, SHA-256 | `software`, `hsm`, `hsm-single-tenant`, `external`, `external-vpc` |
| `rsa-sign-pss-4096-sha256` / `RSA_SIGN_PSS_4096_SHA256` | RSASSA-PSS 4096-bit, SHA-256 | `software`, `hsm`, `hsm-single-tenant`, `external`, `external-vpc` |
| `rsa-sign-pss-4096-sha512` / `RSA_SIGN_PSS_4096_SHA512` | RSASSA-PSS 4096-bit, SHA-512 | `software`, `hsm`, `hsm-single-tenant`, `external`, `external-vpc` |
| `rsa-sign-pkcs1-2048-sha256` / `RSA_SIGN_PKCS1_2048_SHA256` | RSASSA-PKCS1 v1.5 2048-bit, SHA-256 | `software`, `hsm`, `hsm-single-tenant`, `external`, `external-vpc` |
| `rsa-sign-pkcs1-3072-sha256` / `RSA_SIGN_PKCS1_3072_SHA256` | RSASSA-PKCS1 v1.5 3072-bit, SHA-256 | `software`, `hsm`, `hsm-single-tenant`, `external`, `external-vpc` |
| `rsa-sign-pkcs1-4096-sha256` / `RSA_SIGN_PKCS1_4096_SHA256` | RSASSA-PKCS1 v1.5 4096-bit, SHA-256 | `software`, `hsm`, `hsm-single-tenant`, `external`, `external-vpc` |
| `rsa-sign-pkcs1-4096-sha512` / `RSA_SIGN_PKCS1_4096_SHA512` | RSASSA-PKCS1 v1.5 4096-bit, SHA-512 | `software`, `hsm`, `hsm-single-tenant`, `external`, `external-vpc` |
| `rsa-sign-raw-pkcs1-2048` / `RSA_SIGN_RAW_PKCS1_2048` | RSASSA-PKCS1 v1.5 signing without encoding, 2048-bit | `software`, `hsm`, `hsm-single-tenant` |
| `rsa-sign-raw-pkcs1-3072` / `RSA_SIGN_RAW_PKCS1_3072` | Same, 3072-bit | `software`, `hsm`, `hsm-single-tenant` |
| `rsa-sign-raw-pkcs1-4096` / `RSA_SIGN_RAW_PKCS1_4096` | Same, 4096-bit | `software`, `hsm`, `hsm-single-tenant` |

### Post-quantum (PQC) signing

| SDK / REST | Description |
|---|---|
| `pq-sign-ml-dsa-44` / `PQ_SIGN_ML_DSA_44` | Pure ML-DSA-44 (FIPS 204), matrix A (4,4) |
| `pq-sign-ml-dsa-44-external-mu` / `PQ_SIGN_ML_DSA_44_EXTERNAL_MU` | External-μ ML-DSA-44 |
| `pq-sign-ml-dsa-65` / `PQ_SIGN_ML_DSA_65` | Pure ML-DSA-65, matrix A (6,5) |
| `pq-sign-ml-dsa-65-external-mu` / `PQ_SIGN_ML_DSA_65_EXTERNAL_MU` | External-μ ML-DSA-65 |
| `pq-sign-ml-dsa-87` / `PQ_SIGN_ML_DSA_87` | Pure ML-DSA-87, matrix A (8,7) |
| `pq-sign-ml-dsa-87-external-mu` / `PQ_SIGN_ML_DSA_87_EXTERNAL_MU` | External-μ ML-DSA-87 |
| `pq-sign-slh-dsa-sha2-128s` / `PQ_SIGN_SLH_DSA_SHA2_128S` | Pure stateless hash-based signature |
| `pq-sign-hash-slh-dsa-sha2-128s-sha256` / `PQ_SIGN_HASH_SLH_DSA_SHA2_128S_SHA256` | Pre-hash stateless hash-based signature |

### Asymmetric decryption (RSA-OAEP)

| SDK / REST | Description |
|---|---|
| `rsa-decrypt-oaep-2048-sha1` / `RSA_DECRYPT_OAEP_2048_SHA1` | RSAES-OAEP 2048-bit, SHA-1 |
| `rsa-decrypt-oaep-2048-sha256` / `RSA_DECRYPT_OAEP_2048_SHA256` | 2048-bit, SHA-256 |
| `rsa-decrypt-oaep-3072-sha1` / `RSA_DECRYPT_OAEP_3072_SHA1` | 3072-bit, SHA-1 |
| `rsa-decrypt-oaep-3072-sha256` / `RSA_DECRYPT_OAEP_3072_SHA256` | Recommended. 3072-bit, SHA-256 |
| `rsa-decrypt-oaep-4096-sha1` / `RSA_DECRYPT_OAEP_4096_SHA1` | 4096-bit, SHA-1 |
| `rsa-decrypt-oaep-4096-sha256` / `RSA_DECRYPT_OAEP_4096_SHA256` | 4096-bit, SHA-256 |
| `rsa-decrypt-oaep-4096-sha512` / `RSA_DECRYPT_OAEP_4096_SHA512` | 4096-bit, SHA-512 |

### Key encapsulation

| SDK / REST | Description |
|---|---|
| `kem-xwing` / `KEM_XWING` | Recommended. X-Wing hybrid KEM combining ML-KEM-768 with X25519 |
| `ml-kem-768` / `ML_KEM_768` | ML-KEM-768 (FIPS 203) |
| `ml-kem-1024` / `ML_KEM_1024` | ML-KEM-1024 (FIPS 203) |

### MAC signing (HMAC)

| SDK / REST | Description | Quantum-safe |
|---|---|---|
| `hmac-sha1` / `HMAC_SHA1` | HMAC with SHA-1 | No |
| `hmac-sha224` / `HMAC_SHA224` | HMAC with SHA-224 | Yes |
| `hmac-sha256` / `HMAC_SHA256` | Recommended. HMAC with SHA-256 | Yes |
| `hmac-sha384` / `HMAC_SHA384` | HMAC with SHA-384 | Yes |
| `hmac-sha512` / `HMAC_SHA512` | HMAC with SHA-512 | Yes |

## Notes

- Key purposes: Two keys with the same purpose may use different algorithms but support the same set of operations.
- Symmetric encryption (`ENCRYPT_DECRYPT`): AES-256 in GCM; generally quantum-safe. Quantum-safe: Yes for both.
- Raw symmetric encryption (`RAW_ENCRYPT_DECRYPT`): Encrypt and decrypt without Cloud KMS-internal metadata (for example with imported keys, to encrypt locally and decrypt in Google Cloud or the reverse). Protection levels: `software`, `hsm`, `hsm-single-tenant`. Quantum-safe: Yes for all.
- Elliptic curve signing: Quantum-safe: No. `ec-sign-p256-sha256` is Recommended.
- RSA signing: Quantum-safe: No. Recommended: `rsa-sign-pss-3072-sha256`. "Raw" algorithms are PKCS #1 signing without `DigestInfo` encoding (digest the message, apply PKCS #1 padding to the digest directly, sign the padded digest). For PSS the salt length equals the digest length and the same digest is used for MGF1 (for example `RSA_SIGN_PSS_2048_SHA256` uses a 256-bit salt).
- Post-quantum (PQC) signing: Names start with `PQ_SIGN_`. Protection level: `software` only. Quantum-safe: Yes. Pure algorithms take raw data; pre-hash and external-μ algorithms accept a hash value derived from the data. Use `external_mu` as the digest algorithm for all external-μ ML-DSA variants.
- Asymmetric decryption (RSA-OAEP): Protection levels: `software`, `hsm`, `hsm-single-tenant`. Quantum-safe: No. All use OAEP. Recommended: `rsa-decrypt-oaep-3072-sha256`. Vulnerable to "store now, decrypt later"; choose a key encapsulation algorithm for long-term confidentiality.
- Key encapsulation: Protection level: `software` only. Quantum-safe: Yes.
- MAC signing (HMAC): Protection levels: `software`, `hsm`, `hsm-single-tenant`. Recommended: `hmac-sha256`.
- Protection-level support is condensed from the source's per-protection-level tables; the source lists no algorithms for `external` / `external-vpc` under raw symmetric, PQC, asymmetric decryption, KEM or MAC, and none for `hsm` / `hsm-single-tenant` under PQC signing or KEM.
- Elliptic curve and RSA signing algorithms are susceptible to future quantum attacks; for long-term non-repudiation choose a post-quantum signing algorithm. Symmetric algorithms such as AES-256 are generally considered quantum-safe. For HMAC, `HMAC-SHA1` is not quantum-safe; use a larger hash for long-term trust.
- The gcloud 593.0.0 help for `kms keys create --default-algorithm` also lists `aes-256-kwp`, `kem-ecdh-p256` and `kem-ecdh-p384`, which this source page does not document. The Cloud KMS quotas page mentions `EC_SIGN_P224_SHA256` and `EC_SIGN_P521_SHA512`, also absent from this algorithms table.
- Source inconsistency: the source lists the raw symmetric methods as `cryptoKeys.rawEncrypt` and `cryptoKeys.rawDecrypt`; in the Cloud KMS v1 Discovery document `rawEncrypt` and `rawDecrypt` are methods of `cryptoKeyVersions`.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/kms/keys/create (gcloud 593.0.0 help).
- Source: https://docs.cloud.google.com/kms/docs/algorithms (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [protection-levels.md](./protection-levels.md)
- [digital-signatures.md](./digital-signatures.md)
- [asymmetric-encryption.md](./asymmetric-encryption.md)
- [mac-signatures.md](./mac-signatures.md)
- [key-encapsulation-mechanisms.md](./key-encapsulation-mechanisms.md)
