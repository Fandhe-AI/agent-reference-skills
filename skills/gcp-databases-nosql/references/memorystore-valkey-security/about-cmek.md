---
source: https://docs.cloud.google.com/memorystore/docs/valkey/about-cmek
---

# About customer-managed encryption keys (CMEK)

CMEK in Cloud KMS lets you control the key encryption keys (KEKs) that protect stored Memorystore for Valkey data. Google-managed data encryption keys (DEKs) encrypt the data; your KEKs encrypt the DEKs. CMEK can be enabled only on new instances.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/memorystore/docs/valkey/use-cmek

```bash
gcloud kms keys add-iam-policy-binding  \
projects/PROJECT_ID/locations/REGION_ID/keyRings/KEY_RING/cryptoKeys/KEY_NAME \
--member=serviceAccount:service-PROJECT_NUMBER@gcp-sa-memorystore.iam.gserviceaccount.com \
--role=roles/cloudkms.cryptoKeyEncrypterDecrypter
```

Key resource ID format:

```text
projects/CMEK_ENABLED_PROJECT/locations/REGION/keyRings/KEY_RING_NAME/cryptoKeys/KEY_NAME
```

## Options / Props

| Item | Detail |
|------|--------|
| Encrypted data | backups, persistence (RDB and AOF), and metadata for security features (basic token auth, in-transit encryption); in-memory data is not encrypted by CMEK |
| Service account | `service-PROJECT_NUMBER@gcp-sa-memorystore.iam.gserviceaccount.com` needs `roles/cloudkms.cryptoKeyEncrypterDecrypter` |
| Key | symmetric encryption algorithm; key ring and key in the same region/location as the instance, otherwise creation fails; key may be in another project |
| Org policy constraints | `constraints/gcp.restrictNonCmekServices`, `constraints/gcp.restrictCmekCryptoKeyProjects` |
| Cost | no extra Memorystore cost; Cloud KMS bills key and encrypt/decrypt operations |

### Key version behavior

| Event | Effect |
|-------|--------|
| Primary version disabled/destroyed | No new backups; persistence deactivated (no charge); cannot read existing persisted data; cannot update or re-enable until the primary version is enabled or restored; instance is out of SLA; in-memory reads and writes continue |
| Older version disabled/destroyed | Backups encrypted with it become inaccessible; persistence stays enabled and data is re-encrypted with the primary version via a maintenance-like update |
| Access to key revoked | In-memory caching continues; backups and persistence deactivated |
| Primary version rotated | New backups use the new version; existing backups not re-encrypted; persistence nodes keep the older version until next maintenance |
| Key replaced | Applies to future operations only; persistence switches at next restart or maintenance |
| Primary version enabled/restored | Backups possible again; persistence re-enabled via maintenance-like update |

## Notes

- Destroying a key version is permanent (crypto-shredding); Google cannot recover the data. Try key lifecycle changes on a disposable instance first.
- On-demand re-encryption is unsupported. For backups, create a new backup with the new key and delete old backups manually, or export one to Cloud Storage. For persistence, run simulated maintenance to force the new key.
- Cloud EKM: if an external key is unavailable at creation the instance is not created; if it becomes unavailable later, backups and persistence are deactivated while caching continues.
- Limitations: no CMEK on existing instances; key, key ring and instance in the same region; symmetric keys only; Cloud KMS rates are subject to quota.
- Managed Valkey on Google Cloud; distinct from Upstash Redis (`upstash`). IAM and org policy basics: `gcp-foundation`.
- Source: https://docs.cloud.google.com/memorystore/docs/valkey/about-cmek (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [use-cmek.md](./use-cmek.md)
- [security-overview.md](./security-overview.md)
