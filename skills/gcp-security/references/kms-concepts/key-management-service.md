---
source: https://docs.cloud.google.com/kms/docs/key-management-service
---

# Cloud Key Management Service overview

Cloud KMS creates and manages cryptographic keys for compatible Google Cloud services (CMEK) and for your own applications. It can generate software or hardware keys, import keys, link external keys (Cloud EKM), automate key provisioning (Autokey), encrypt / decrypt, sign / verify (digital and MAC signatures) and establish shared secrets with key encapsulation mechanisms. The page also compares Cloud KMS key types with Google default encryption, customer-supplied keys and Confidential Computing.

## Signature / Usage

### Create a Cloud KMS key

A software-protected key for encryption; `--protection-level` defaults to `software`. Cloud HSM and Cloud EKM examples are on the protection levels page.

```bash
gcloud kms keys create frodo --location=us-east1 \
  --keyring=fellowship --purpose=encryption
```

## Options / Props

### Choose the right encryption

| Encryption type | Compatible services | Features |
|---|---|---|
| Google-owned and Google-managed keys (Google Cloud default encryption) | All Google Cloud services that store customer data | No configuration; AES-256; most services rotate keys automatically; FIPS 140-3 Level 1 validated |
| CMEK, software (Cloud KMS keys) | 40+ services | You control automatic rotation schedule, IAM, enable / disable / destroy of key versions; symmetric and asymmetric keys; symmetric keys rotate automatically; FIPS 140-3 Level 1; keys unique to a customer |
| CMEK, hardware (Cloud HSM keys) | 40+ services | Optionally managed through Autokey; same controls as software; FIPS 140-2 Level 3 validated; optional Single-tenant Cloud HSM instance (extra cost) for more cryptographic isolation |
| CMEK, external (Cloud EKM keys) | 30+ services | You control IAM, enable / disable / destroy; keys never sent to Google; key material in a compatible EKM provider reached over the internet or a VPC; symmetric keys only for encryption / decryption; rotate manually with Cloud EKM and your provider; FIPS 140-2 Level 2 or Level 3 depending on the EKM |
| Client-side encryption using Cloud KMS keys | Use client libraries in your applications | Symmetric and asymmetric keys for encryption, decryption, signing and signature validation; functionality varies by protection level |
| Cloud HSM for Google Workspace | Multi-tenant Cloud HSM keys for client-side encryption (CSE) in Google Workspace | Symmetric keys for encryption and decryption |
| Customer-supplied encryption keys (CSEK) | Cloud Storage, Compute Engine | You provide key material when needed; Google does not permanently store it. CSEK for Compute Engine is deprecated |
| Confidential Computing | Compute Engine, GKE, Managed Service for Apache Spark | Encryption-in-use for VMs; keys can't be accessed by Google |

### Protection-level feature summary

| Protection level | Notes |
|---|---|
| Software | Generate in Cloud KMS and use in all Google Cloud locations; symmetric keys with automatic rotation or asymmetric keys with manual rotation; FIPS 140-3 Level 1 modules |
| Imported software | Import keys created elsewhere; import new key versions to rotate manually |
| Multi-tenant Cloud HSM (`HSM`) | FIPS 140-2 Level 3 HSM clusters managed by Google Cloud; the same compatible services as software keys |
| Single-tenant Cloud HSM (`HSM_SINGLE_TENANT`) | Dedicated HSM partitions you control; instance operations need a quorum of designated administrators and two-factor authentication with security keys you own outside Google Cloud |
| External (Cloud EKM) | Keys held in a supported key manager, reached over the internet or a VPC; some services that support Cloud KMS keys don't support Cloud EKM keys |

## Notes

- Google Cloud default encryption (Keystore), CSEK and Confidential Computing are not features of Cloud KMS. Data from multiple customers might use the same key encryption key under default encryption, and you can't view or manage those keys or review key usage logs.
- Autokey is the recommended choice for CMEK if the keys it creates meet all your requirements. Organization policies can require CMEK for compatible resources and restrict which project holds the key resources.
- CMEK key disable / destroy makes data encrypted with the key inaccessible (crypto-shredding is a stated goal); try on a disposable key first.
- Prices are not copied; the source lists a cost per key version for each CMEK protection level. See https://docs.cloud.google.com/kms/pricing. The SLA is at https://docs.cloud.google.com/kms/sla.
- `--protection-level` values in the gcloud 593.0.0 help: `software`, `hsm`, `hsm-single-tenant`, `external`, `external-vpc`.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/kms/keys/create (gcloud 593.0.0 help).
- Source: https://docs.cloud.google.com/kms/docs/key-management-service (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [protection-levels.md](./protection-levels.md)
- [resource-hierarchy.md](./resource-hierarchy.md)
- [envelope-encryption.md](./envelope-encryption.md)
- [algorithms.md](./algorithms.md)
- [quotas.md](./quotas.md)
