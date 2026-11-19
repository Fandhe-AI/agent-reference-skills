---
source: https://docs.cloud.google.com/knowledge-catalog/docs/cmek
---

# Customer-managed encryption keys (CMEK) for Knowledge Catalog

Knowledge Catalog (formerly Dataplex Universal Catalog) encrypts customer content at rest with Google default encryption. You can instead use Cloud KMS customer-managed encryption keys (CMEK), configured at the organization level, with one CMEK per location for all Knowledge Catalog resources. Switching to CMEK is irreversible.

## Signature / Usage

### Create the service account and grant the key role

```bash
gcloud beta services identity create \
    --service=dataplex.googleapis.com \
    --organization=ORG_ID
```

```bash
gcloud kms keys add-iam-policy-binding KEY_NAME \
    --location=LOCATION \
    --keyring KEY_RING \
    --project=KEY_PROJECT_ID \
    --member serviceAccount:service-org-ORG_ID@gcp-sa-dataplex.iam.gserviceaccount.com \
    --role roles/cloudkms.cryptoKeyEncrypterDecrypter
```

### Grant yourself the encryption admin role

```bash
gcloud organizations add-iam-policy-binding ORG_ID \
    --member='user:USER_EMAIL' \
    --role='roles/dataplex.encryptionAdmin'
```

### Configure the key and check progress

```bash
gcloud dataplex encryption-config create default \
    --location=LOCATION \
    --organization=ORG_ID \
    --key=KEY_RESOURCE_ID
```

```bash
gcloud dataplex encryption-config describe default \
    --location=LOCATION \
    --organization=ORG_ID
```

When the process completes the output shows `encryptionState: COMPLETED`. `KEY_RESOURCE_ID` has the form `projects/PROJECT_ID/locations/LOCATION/keyRings/KEY_RING/cryptoKeys/KEY_NAME`.

### Upgrade a CMEK configuration enabled before November 7, 2025

```text
  gcloud dataplex encryption-config update organizations/ORG_ID/locations/LOCATION/encryptionConfigs/default --enable-metastore-encryption
```

If you enable CMEK for the first time after November 7, 2025, Knowledge Catalog Metastore and Search are included in CMEK coverage by default.

### Grant key access for data profile and data quality scans on CMEK-encrypted BigQuery resources

```bash
gcloud kms keys add-iam-policy-binding KEY_NAME \
    --location=LOCATION \
    --keyring=KEYRING_NAME \
    --member="serviceAccount:service-PROJECT_NUMBER@gcp-sa-dataplex.iam.gserviceaccount.com" \
    --role="roles/cloudkms.cryptoKeyEncrypterDecrypter"
```

```bash
gcloud kms keys add-iam-policy-binding KEY_NAME \
    --location=LOCATION \
    --keyring=KEYRING_NAME \
    --member="serviceAccount:bq-PROJECT_NUMBER@bigquery-encryption.iam.gserviceaccount.com" \
    --role="roles/cloudkms.cryptoKeyEncrypterDecrypter"
```

## Options / Props

### Features covered by CMEK

| Feature |
|---|
| Auto data quality |
| Data profiling |
| Data discovery |
| Data insights |
| Knowledge Catalog |
| Business Glossary |
| Knowledge Catalog search |

### Roles and service accounts

| Item | Value |
|---|---|
| Role to switch an organization to CMEK | Organization Administrator (`roles/resourcemanager.organizationAdmin`) |
| Role to configure CMEK | Dataplex Encryption Admin (`roles/dataplex.encryptionAdmin`) |
| Role on the key | Cloud KMS CryptoKey Encrypter/Decrypter (`roles/cloudkms.cryptoKeyEncrypterDecrypter`) |
| Knowledge Catalog service account | `service-org-ORG_ID@gcp-sa-dataplex.iam.gserviceaccount.com` |
| CMEK-specific service account | `service-org-ORG_ID@gcp-sa-dataplex-cmek.iam.gserviceaccount.com` |
| Cloud EKM service account (EKM over VPC) | `service-KEY_PROJECT_NUMBER@gcp-sa-ekms.iam.gserviceaccount.com` with `roles/servicedirectory.viewer` and `roles/servicedirectory.pscAuthorizedService` in the VPC project |
| Cloud KMS service account (Cloud EKM) | `service-KEY_PROJECT_NUMBER@gcp-sa-cloudkms.iam.gserviceaccount.com` |

### Organization policy constraints

| Constraint | Effect |
|---|---|
| `constraints/gcp.restrictNonCmekServices` | Adding `dataplex.googleapis.com` and setting `Deny` prohibits creating Knowledge Catalog resources without CMEK; requests fail if no key is set for the location; validated at the resource project level |
| `constraints/gcp.restrictCmekCryptoKeyProjects` | Restricts CMEK keys to listed projects, folders or organizations when set to `Allow`; validated at the resource project level during resource creation and at the organization level when configuring CMEK |

### Availability timeline after enabling CMEK

| Phase | Behavior |
|---|---|
| Infrastructure provisioning | Typically 6 to 8 hours; full access, data still encrypted with Google-managed encryption; with `constraints/gcp.restrictNonCmekServices` set, resource creation requests fail until it completes |
| Encryption of existing data | One-time, up to two hours; Dataplex API methods are temporarily unavailable |
| After encryption | API methods fully available; new data is encrypted with the CMEK |

## Notes

- Irreversible: switching to CMEK cannot be reverted to Google default encryption, and a configured Cloud KMS key cannot be updated or changed. Try the configuration in a disposable organization first where possible.
- Data loss: if the key is disabled or destroyed, data becomes inaccessible. If the key is unavailable for more than 30 days, data encrypted with it is automatically deleted and cannot be recovered. With Cloud EKM, key unavailability of 30 days results in permanent data loss.
- If Cloud KMS is temporarily unavailable, Knowledge Catalog continues full operation on a best-effort basis for up to one hour, after which data becomes temporarily inaccessible.
- Data Lineage doesn't store customer core content or sensitive data and doesn't require CMEK. Assured Workloads customers can't use other Knowledge Catalog features because CMEK isn't supported for them; customers not using Assured Workloads can use them with Google default encryption.
- CMEK is organization-level only (per location), not supported for specific projects or folders, and not supported in the global region. Cross-organizational metadata search doesn't work with CMEK.
- Don't migrate projects into or out of the CMEK organization; changing a project's organizational placement permanently loses its Knowledge Catalog-stored metadata.
- Backups are kept for a maximum of 15 days; backups made after enabling CMEK use the key, earlier ones stay under Google default encryption for up to 15 days. Cloud KMS keys, Cloud HSM keys and Cloud External Key Manager keys are supported; key rotation is supported and new versions are used automatically.
- With VPC Service Controls on the Cloud KMS key, grant the CMEK-specific service account access with an ingress rule.
- Audit Knowledge Catalog requests to Cloud KMS by enabling audit logging for the Cloud Key Management Service API.
- The source also shows Console steps. Cloud KMS keys themselves are in `gcp-security`; BigQuery CMEK for datasets is in `gcp-bigquery`.
- Source: https://docs.cloud.google.com/knowledge-catalog/docs/cmek (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- The source says the CMEK-specific service account (`service-org-ORG_ID@gcp-sa-dataplex-cmek.iam.gserviceaccount.com`) "is used for encrypting and decrypting data stored in Knowledge Catalog", while its grant command gives `roles/cloudkms.cryptoKeyEncrypterDecrypter` to `service-org-ORG_ID@gcp-sa-dataplex.iam.gserviceaccount.com`; the command is kept as the source writes it, and the source does not say whether the CMEK-specific account also needs the key role.

## Related

- [vpc-sc.md](./vpc-sc.md)
- [audit-logging.md](./audit-logging.md)
