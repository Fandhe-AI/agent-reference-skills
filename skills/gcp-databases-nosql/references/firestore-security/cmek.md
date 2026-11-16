---
source: https://docs.cloud.google.com/firestore/native/docs/cmek
---

# Customer-managed encryption keys (CMEK)

Firestore encrypts all data at rest by default with Google's default encryption and requires no setup (server-side encryption). With CMEK, a key you control in Cloud KMS protects the database instead; client-side encryption can be layered on top. This page also covers the merged "Server-side encryption" page.

## Signature / Usage

The source pages contain no commands. CMEK can be enabled only when creating a database. Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/firestore/databases/create (create a Firestore Native database in `nam5` encrypted by a CMEK key):

```bash
gcloud firestore databases create --location=nam5 \
  --kms-key-name=projects/PROJECT_ID/locations/us/keyRings/KEY_RING_ID/cryptoKeys/CRYPTO_KEY_ID
```

The principal that needs access to the Cloud KMS key is the Firestore service agent `service-PROJECT_NUMBER@gcp-sa-firestore.iam.gserviceaccount.com` (name taken from https://docs.cloud.google.com/firestore/native/docs/securing-with-vpc-sc); re-granting it access restores a key made unavailable by removed permission.

## Options / Props

| Topic | Behavior |
|-------|----------|
| Protected with CMEK | Data at rest on disk or flash, including indexes and backups |
| Not protected by the CMEK key | Data in transit or in memory; database metadata (Google default encryption) |
| Key availability polling | Firestore polls Cloud KMS every 5 minutes; if unavailable, within 10 minutes reads, writes and queries return `FAILED_PRECONDITION` ("The customer-managed encryption key required by the requested resource is not accessible") |
| Unavailable key situations | Disabling or destroying the in-use key version; removing key access from the Firestore service account |
| Reinstatement | Re-enable a disabled version; restore a version scheduled for destruction; re-grant the Firestore service agent access. Access returns usually within minutes, rarely a few hours; KMS disable/destroy can take up to 3 hours to propagate |
| TTL while key unavailable | TTL deletion is delayed until the key is reinstated |
| Import / export while unavailable | Stop progressing and are marked `Failed`; not retried after reinstatement |
| Index builds / enabling TTL policies while unavailable | Stop progressing; retried after reinstatement |
| Key rotation | Firestore re-encrypts with the latest primary version; keep old and new versions available during re-encryption |
| External key (Cloud EKM) unavailable | Full operations on a best-effort basis for up to 1 hour; then the database is taken offline with `FAILED_PRECONDITION` |
| Backups | Encrypted with the primary key version at backup creation; key and version cannot be modified afterwards, even after rotation. First backup of a CMEK database is created 24 hours after backup schedules are enabled |
| Restore / clone encryption | Default: same as backup / source. Alternatives: CMEK database with a newly specified key, or non-CMEK database using Google's default encryption |
| Pricing | Cloud KMS charges for the key and crypto operations (Firestore calls the key every 5 minutes, unrelated to request volume); no additional Firestore cost. If the key is revoked, storage is billed on the last available day's size |

### Limitations

- You can't change a key for a CMEK-protected database (rotate, enable and disable are allowed).
- Key Visualizer is supported only for entity and document data, not index data.
- CMEK can be enabled only when creating a new database; to migrate, export and import to a new CMEK database, or restore / clone from a non-CMEK database.
- Firestore supports a limited number of CMEK-protected databases.
- CMEK protection is not supported with Cloud Functions (1st gen); use Cloud Run functions Firestore triggers (2nd gen).
- Behaviors with unavailable or disabled keys: PITR settings can still be changed (database metadata is not encrypted by CMEK); a CMEK database with unavailable keys can be deleted; disabled keys are not listed in the console when creating a database, and entering one manually fails with `FAILED_PRECONDITION` (400).

## Notes

- Warning (source): don't let your key become unavailable for longer than seven days. CMEK-protected databases with keys unavailable for more than 7 days may be deleted. To preserve data beyond that, enable backups with the required retention; a valid key is required for backup creation, so create a backup before revoking the key. Backups incur additional charges.
- Caution (source): a database that remains disabled for more than 7 consecutive days might be deleted automatically; if an external key is deleted and cannot be recovered, databases encrypted with it become permanently inaccessible.
- Destroying a key version can cause unrecoverable data loss; try key disable/destroy only on a disposable database first.
- Data can leave a CMEK database via backup and restore, clone, or import / export to a non-CMEK database; restrict these with IAM and use CMEK organization policy constraints to require CMEK for restored / cloned databases and import buckets.
- Server-side encryption page: data is encrypted automatically and decrypted transparently for authorized users; each object's data and metadata is encrypted and each key is itself encrypted with regularly rotated master keys. With client-side encryption data is encrypted twice; Firestore does not know your client-side keys, so you must manage them securely. TLS protects data in transit.
- The source says access to this release is by an access request form; instructions for CMEK tasks are on the official "Use CMEK" page (https://docs.cloud.google.com/firestore/native/docs/use-cmek).
- Source: https://docs.cloud.google.com/firestore/native/docs/cmek (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/firestore/native/docs/server-side-encryption (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Snippet source: https://docs.cloud.google.com/sdk/gcloud/reference/firestore/databases/create (gcloud 593.0.0 help text, EXAMPLES section; the help text wraps the key name across two lines, joined here).
- Source: https://docs.cloud.google.com/firestore/native/docs/securing-with-vpc-sc (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [securing-with-vpc-sc.md](./securing-with-vpc-sc.md)
- [iam.md](./iam.md)
