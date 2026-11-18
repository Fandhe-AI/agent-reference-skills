---
source: https://docs.cloud.google.com/kms/quotas
---

# Quotas

Cloud KMS enforces quotas on management and usage of resources such as keys, key versions and locations, but there is no quota on the number of key rings, keys, key versions or other resources you can have. Effective February 16, 2026 the quota system changed to token-based, regional, dynamically adjusted metrics with mostly soft enforcement. The page documents both the new quotas and the old quotas (old metrics could be monitored until August 31, 2026).

## Signature / Usage

### Opt a project in to the quota adjuster

The source recommends opting in to the quota adjuster; each project that contains Cloud KMS resources must be opted in separately. Example for the project `12321`:

```bash
gcloud quotas adjuster settings update --enablement=enabled \
    --project=12321
```

## Options / Props

### Timeline

| Date | What changes |
|---|---|
| October 28, 2024 | Cloud KMS started allowing over-quota requests for hardware (Cloud HSM) keys while the system is not overloaded |
| February 16, 2026 | New metrics used for quota enforcement; old metrics remain available for monitoring only; you can opt in to the quota adjuster |
| August 31, 2026 | Old metrics retired and can no longer be monitored |

### Before vs after February 16, 2026

| Aspect | Before | After |
|---|---|---|
| Location scope | Mixed (some global, some regional) | Regional: all metrics per region; multi-region usage counts against the region that serves the request |
| Limits | Static project defaults; limit increases by request | Dynamic: initial limits set from project-specific limits and prior usage; opt in to quota adjuster recommended |
| Enforcement | Hard: over-limit requests denied | Soft: over-limit read, most write and cryptographic requests are allowed if the system can serve them. Hard-enforced: create and import requests for Cloud HSM keys, and all requests for Cloud EKM keys |
| Cloud HSM quotas | Separate for symmetric, asymmetric and `generateRandomBytes` | One HSM quota; key sizes and operations consume different amounts |
| Measurement | Requests | Tokens per operation (relative processing cost) |
| Time scale | Mixed: some reported per minute but enforced per second | Same as enforced: most per minute; Cloud EKM per second |
| Project scope | Some on the project with the keys, some on the calling project | All on the project containing the `CryptoKey` / `CryptoKeyVersion` resources |
| CMEK | No quotas on software keys used in CMEK integrations | CMEK usage counts against the Software usage limit with soft enforcement |

### Quotas after February 16, 2026

| Metric | Time scale and default | Enforcement | Operations |
|---|---|---|---|
| Read usage `cloudkms.googleapis.com/read_usage` | Minute, 600 TPM | Software: soft; hardware: soft; external: hard | `cryptoKeys` get / getIamPolicy / list / testIamPermissions; `cryptoKeyVersions` get / list; `ekmConnections` get / getIamPolicy / list / testIamPermissions / verifyConnectivity; `importJobs` get / getIamPolicy / list / testIamPermissions; `keyRings` get / getIamPolicy / list / testIamPermissions; `locations` get / list |
| Write usage `cloudkms.googleapis.com/write_usage` | Minute, 100 TPM | Software: soft; hardware: soft; external: hard | `cryptoKeys` create / patch / setIamPolicy / updatePrimaryVersion; `cryptoKeyVersions` create / destroy / import / patch / restore; `ekmConnections` create / patch / setIamPolicy; `importJobs` create / setIamPolicy; `keyRings` create / setIamPolicy |
| Software usage `cloudkms.googleapis.com/software_usage` | Minute, 6,000,000 TPM | Soft | `cryptoKeys` encrypt / decrypt; `cryptoKeyVersions` asymmetricDecrypt / asymmetricSign / decapsulate / getPublicKey / macSign / macVerify / rawEncrypt / rawDecrypt; `locations.generateRandomBytes` |
| HSM usage `cloudkms.googleapis.com/hsm_usage` | Minute, 3,000,000 TPM | Soft | Same operations as software usage |
| External KMS usage `cloudkms.googleapis.com/external_kms_usage` | Second, 10,000 TPS | Hard | Same operations as software usage |

### Tokens per operation

| Cloud KMS resource | Operation | Tokens |
|---|---|---|
| All Cloud KMS resources | All read operations | Read usage: 1 |
| All software-backed and external resources | All write operations | Write usage: 1 |
| Hardware-backed keys | Write operations other than create and import | Write usage: 1 |
| Hardware-backed symmetric and MAC keys | Create and import | Write usage: 1; HSM usage: 1,200 |
| Hardware-backed asymmetric keys | Create and import | Write usage: 1; HSM usage: 50,000 |
| Software-backed keys | All cryptographic operations | Software usage: 100 |
| External (Cloud EKM) keys | All cryptographic operations | External KMS usage: 100 |
| Hardware (Cloud HSM) keys | Symmetric encryption or decryption; MAC sign or verify; `getPublicKey` | HSM usage: 100 |
| Hardware (Cloud HSM) keys | `generateRandomBytes` | HSM usage: 1,000 |
| Hardware (Cloud HSM) keys | Asymmetric sign with 2048-bit RSA; asymmetric decrypt with 2048-bit keys | HSM usage: 1,500 |
| Hardware (Cloud HSM) keys | Asymmetric sign with 3072-bit RSA; asymmetric decrypt with 3072-bit keys | HSM usage: 3,500 |
| Hardware (Cloud HSM) keys | Asymmetric sign with `EC_SIGN_P224_SHA256`, `EC_SIGN_P256_SHA256` or `EC_SIGN_SECP256K1_SHA256` | HSM usage: 4,500 |
| Hardware (Cloud HSM) keys | Asymmetric sign with `EC_SIGN_P384_SHA384` or `EC_SIGN_P521_SHA512` | HSM usage: 7,000 |
| Hardware (Cloud HSM) keys | Asymmetric decrypt with 4096-bit keys; asymmetric sign with 4096-bit RSA | HSM usage: 14,000 |

### Suggested preparation

| Use case | Suggested preparation |
|---|---|
| Existing projects | New metric limits are calculated automatically from actual usage; no action required |
| New projects with high usage | Opt in to the quota adjuster; allow 1-2 weeks of gradual traffic increase, or proactively request the limits you need |
| Monitoring | Old metrics available through August 31, 2026; set up monitoring on the new metrics (available from February 16, 2026) before that date |
| Quota adjuster | Recommended; each project containing Cloud KMS resources must opt in separately |

### Quotas before February 16, 2026 (old metrics)

| Quota | Applies to | Limit | Operations |
|---|---|---|---|
| Read requests `cloudkms.googleapis.com/read_requests` | Calling project | 300 QPM | Same read operations as Read usage. Exempted: console operations |
| Write requests `cloudkms.googleapis.com/write_requests` | Calling project | 60 QPM | Same write operations as Write usage. Exempted: console operations |
| Cryptographic requests `cloudkms.googleapis.com/crypto_requests` | Calling project | 60,000 QPM | encrypt, decrypt, asymmetricDecrypt, asymmetricSign, getPublicKey, macSign, macVerify, rawEncrypt, rawDecrypt, `generateRandomBytes`. Exempted: CMEK integrations |
| HSM symmetric cryptographic requests per region `cloudkms.googleapis.com/hsm_symmetric_requests` | Hosting project | 500 QPS | encrypt, decrypt, asymmetricDecrypt, asymmetricSign, getPublicKey, macSign, macVerify, rawEncrypt, rawDecrypt. Exempted: Single-tenant Cloud HSM keys |
| HSM asymmetric cryptographic requests per region `cloudkms.googleapis.com/hsm_asymmetric_requests` | Hosting project | 50 QPS | encrypt, decrypt, asymmetricDecrypt, asymmetricSign, getPublicKey, macSign, macVerify. Exempted: Single-tenant Cloud HSM keys |
| HSM generate random requests per region `cloudkms.googleapis.com/hsm_generate_random_requests` | Hosting project | 50 QPS | `locations.generateRandomBytes`. Exempted: Single-tenant Cloud HSM keys |
| External cryptographic requests per region `cloudkms.googleapis.com/external_kms_requests` | Hosting project | 100 QPS | encrypt, decrypt, asymmetricDecrypt, asymmetricSign, getPublicKey, macSign, macVerify |

## Notes

- Calling project = the project making the call; hosting project = the project containing the keys. Old calling-project quotas exclude usage by Google Cloud services using your keys for CMEK (for example requests from BigQuery, Bigtable or Spanner).
- Old quotas show limits in QPM in the console, but hosting-project quotas are enforced per second; exceeding a QPS limit returns `RESOURCE_EXHAUSTED` (HTTP `429`) even if per-minute usage is under the listed QPM limit. Console usage doesn't count against the old Read / Write requests quotas.
- Old-quota examples use `KEY_PROJECT` (keys, Multi-tenant Cloud HSM and Cloud EKM), `SPANNER_PROJECT` (a Spanner instance using CMEK keys from `KEY_PROJECT`; its CMEK encrypt / decrypt doesn't count toward its Cryptographic requests quota) and `SERVICE_PROJECT` (a service account managing keys in `KEY_PROJECT`; its calls count against `SERVICE_PROJECT`). Spanner CMEK use of HSM or EKM keys counts against `KEY_PROJECT`'s per-region HSM / external quotas.
- Wording note: the retrieved source describes the February 16, 2026 changes in future tense ("scheduled to go into effect"); its own timeline gives the dates above, which precede the retrieval date.
- See https://docs.cloud.google.com/kms/docs/monitor-adjust-quotas for monitoring, adjusting and troubleshooting quotas. Prices are not copied; see https://docs.cloud.google.com/kms/pricing.
- The quota adjuster commands (`gcloud quotas ...`) are a separate gcloud group, not part of `gcloud kms`.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/quotas/adjuster/settings/update (gcloud 593.0.0 help).
- Source: https://docs.cloud.google.com/kms/quotas (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [key-management-service.md](./key-management-service.md)
- [resource-hierarchy.md](./resource-hierarchy.md)
- [protection-levels.md](./protection-levels.md)
