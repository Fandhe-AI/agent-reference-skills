---
source: https://docs.cloud.google.com/kms/docs/cmek-recommended-practices
---

# Recommended practices for using CMEKs

Recommended practices and design decisions for configuring encryption at rest with customer-managed encryption keys (CMEK): key material source, governance and storage models, separation of duties, IaC pipelines, Autokey, key location / granularity / protection level / rotation, least privilege, guardrails and detective controls.

## Signature / Usage

### Key creation with a rotation schedule

The page recommends 90 days for software keys and 365 days for Cloud HSM keys; this example is only the flag syntax.

```bash
gcloud kms keys create strider --location=global \
    --keyring=rangers --purpose=encryption --rotation-period=30d \
    --next-rotation-time=2017-10-12T12:34:56.1234Z
```

## Options / Props

### Governance and storage matrix

| Governance model | Dedicated-project key storage | Same-project key storage |
|---|---|---|
| Centralized governance | Fully centralized. Use: strict regulatory requirements mandating project boundary isolation. High setup complexity; needs automation (such as a "project factory"). | Governed ownership. Use: central security oversight with developer velocity. Low setup complexity; guardrails enforce policy, keys co-located with resources. |
| Delegated governance | Not recommended (cross-project IAM complexity defeats delegation). | Autonomous DevOps. Use: high-velocity decentralized organizations. Minimal setup complexity. |

### Recommended role separation

| Responsibility | Recommended role | Permission summary |
|---|---|---|
| Key administration (lifecycle, governance; humans and IaC principals with elevated privileges) | Cloud KMS Admin (`roles/cloudkms.admin`) | Create, rotate, enable, disable, destroy keys and related resources; manage IAM policies |
| Resource provisioning (humans and IaC principals without elevated privileges) | Service-specific roles such as BigQuery User (`roles/bigquery.user`), Compute Admin (`roles/compute.admin`) | Select keys during resource creation |
| Key usage (encrypt / decrypt) | Cloud KMS CryptoKey Encrypter/Decrypter (`roles/cloudkms.cryptoKeyEncrypterDecrypter`) | Encrypt and decrypt data; grant only to service agents (automatic with Autokey) |

### Key location rules (manual CMEK)

| Resource type | Key ring and key location |
|---|---|
| Regional and zonal | Same region as the resource, or `global`; can't use a multi-region key ring other than `global` |
| Multi-region (for example BigQuery dataset in `us`) | Same multi-region; can't use a regional key |
| Global | `global` |

### Protection level and rotation guidance

| Need | Choice |
|---|---|
| External storage | Manual CMEK with Cloud EKM; `EXTERNAL_VPC` recommended for availability |
| Dedicated hardware | Manual CMEK with Single-tenant Cloud HSM |
| Automated provisioning and lifecycle | Cloud KMS Autokey (Multi-tenant Cloud HSM) |
| Key material must stay in an HSM | Multi-tenant Cloud HSM |
| Otherwise | Software-backed keys |
| Software key rotation | 90 days (industry standard) |
| Cloud HSM key rotation | 365 days |
| External keys | Rotate manually |

### Guardrail constraints and controls

| Control | Purpose |
|---|---|
| `constraints/gcp.restrictNonCmekServices` | Block creation of certain resource types without a CMEK |
| `constraints/cloudkms.minimumDestroyScheduledDuration` | Minimum scheduled-for-destruction duration (recommended 30 days or your preferred duration) |
| `constraints/cloudkms.allowedProtectionLevels` | New keys, key versions and import jobs must use allowed protection levels |
| Project liens (Preview) | Block deletion of Cloud KMS projects while the lien is enforced |

### Practices automated by Autokey

| Practice | Autokey behavior |
|---|---|
| Location | Key in the same location as the resource |
| Separation of duties | Maintained between key administrators and resource owners |
| IAM grants on new keys | Granted automatically |
| Protection level | `HSM` |
| Granularity | Recommended granularity strategies |
| Rotation | Automatic every 365 days |

## Notes

- Generate key material in Cloud KMS when possible; importing (BYOK) adds risks: automation to import new versions on schedule, secure storage or escrow of original material, leaks during import, impact of re-importing a destroyed key.
- Granularity recommendation: each key used for a single project, a single location, a single service, and where possible a single resource. Autokey follows this.
- Recommended storage: one centralized key project per environment, not the same project as the protected resources (dedicated-project); keep the same pattern across dev, test and prod to avoid drift. Same-project storage may increase complexity for BYOK or Cloud EKM keys.
- Key point: no principal should have both administrative roles (Cloud KMS Admin) and usage roles (Encrypter/Decrypter) on the same resource. Avoid basic roles (Owner, Editor, Viewer); for example grant `roles/cloudkms.importer` instead of `roles/cloudkms.admin` for import only.
- IaC pipelines: with Autokey the pipeline only needs `roles/cloudkms.autokeyUser` to create a `KeyHandle`; a pipeline that enables Autokey needs the more permissive `roles/cloudkms.autokeyAdmin`, so apply separation of duties to those IaC principals too.
- Compliance and Autokey: only your administrators can disable, rotate or destroy key versions; you can disable Autokey or revoke permissions at any hierarchy level; every Autokey action is recorded in Cloud Logging.
- Scheduled for destruction: key destruction is irreversible and can cause permanent data loss. Default is 30 days (soft delete period); a Cloud KMS Admin can create a key with a duration as low as 24 hours; the duration can only be set during key creation. While scheduled for destruction a key can't be used; restore it before the period ends. Try destruction on a disposable key first.
- Where Autokey use is enforced, all keys are hardware-backed. Require-Autokey configuration: see `kms/docs/enable-autokey#enforce-autokey`.
- Detective controls: aggregate Cloud KMS Admin Activity audit logs centrally; data access logs for key use are optional and can generate substantial volume and cost. Enable Security Command Center for Cloud KMS vulnerability findings (publicly accessible keys, overly permissive `owner` role, separation-of-duties violations; see the `gcp-security-compliance` skill). Use the Encryption metrics dashboard and Key usage dashboard (also via the Cloud KMS Inventory API) to monitor.
- All CMEK keys must use the symmetric `ENCRYPT_DECRYPT` purpose and the `GOOGLE_SYMMETRIC_ENCRYPTION` algorithm (this is the source's wording for keys with the `SOFTWARE` / `HSM` protection levels; Cloud EKM keys used as CMEK, with the `EXTERNAL` / `EXTERNAL_VPC` protection levels, use `EXTERNAL_SYMMETRIC_ENCRYPTION` instead, see https://docs.cloud.google.com/kms/docs/algorithms); rotate at least yearly where compliance requires, more often for sensitive workloads.
- Source: https://docs.cloud.google.com/kms/docs/cmek-recommended-practices (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/kms/keys/create (gcloud 593.0.0 help).

## Related

- [cmek.md](./cmek.md)
- [autokey-overview.md](./autokey-overview.md)
- [kms-autokey.md](./kms-autokey.md)
