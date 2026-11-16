---
source: https://docs.cloud.google.com/sql/docs/postgres/cmek
---

# About customer-managed encryption keys (CMEK)

Cloud SQL for PostgreSQL encrypts customer content at rest by default (Google default encryption). With CMEK you control the symmetric key encryption keys (KEKs) in Cloud KMS: protection level, location, rotation, usage and access permissions. This page explains how CMEK works with Cloud SQL, its key format, behavior, and restrictions.

## Signature / Usage

Key format (the key ring location must match the instance region):

```text
projects/[KMS_PROJECT_ID]/locations/[LOCATION]/keyRings/[KEY_RING]/cryptoKeys/[KEY_NAME]
```

### Operations and CMEK

| Operation | Behavior |
|-----------|----------|
| Instance creation | Configure the instance to use customer-managed keys at creation |
| Backup creation | Backups inherit the instance's Cloud KMS key; for enhanced backups, Backup and DR Service uses the CMEK inherited from the instance, not the one on the backup vault |
| Instance restore | The key accesses data on the backup instance; restoring to a different instance can use a different key |
| Replica creation | Same region: inherits the parent's CMEK. Different region: select a CMEK from that region (each region has its own keys) |
| Clone creation | Inherits the source instance's key |
| Instance update | Cloud SQL checks the CMEK key |

## Options / Props

Restrictions:

- You can't enable CMEK on an existing instance.
- You can't assign a different key to a replica in the same region as the primary; cross-region replicas need a new key for the replica region.
- You can't assign a different key to a clone.
- CMEK can't encrypt external servers (external primary instances and replicas) or instance metadata (instance ID, database version, machine type, flags, backup schedule, etc.).
- CMEK doesn't encrypt user data in transit (queries and responses).
- After instance creation you can't change the encryption key type (Google-owned and managed to Cloud KMS, or the reverse).
- Cloud SQL does not support Customer-Supplied Encryption Keys (CSEK).
- CMEK is available in all Cloud SQL instance locations, but the Cloud KMS key ring location must match the instance region; a multi-region or global key will not work and instance creation fails if regions don't match.
- Cloud KMS Autokey works with Cloud SQL for PostgreSQL only when creating resources with Terraform or the REST API, and doesn't create keys for `BackupRun` resources.

## Notes

- Warning (source): never destroy the key version initially used to encrypt your instance. Destroying it also destroys backups created from the instance, and it can't be re-created, even after key rotation. Never destroy a key version used when creating a backup. Destroying a key version is destructive and irreversible (disabling is reversible); try on a disposable resource first.
- If Cloud SQL can't access the key (for example, you disable the key version), it suspends the instance and resumes it automatically once the key is accessible, which can take up to 10 minutes.
- Key rotation doesn't re-encrypt existing instances automatically; you can re-encrypt a CMEK primary or replica with the new primary key version, usually with zero downtime. Automated and manual backups use the latest primary key version.
- A service account that exists in the project requests key access from Cloud KMS; the console creates it automatically when you first choose the Customer-managed key option.
- Enhanced backups: the instance needs access to the CMEK from both the Cloud SQL service agent and the Backup and DR Service service agent. Revoking the Cloud SQL service agent suspends the instance and blocks new backups but existing enhanced backups stay restorable; revoking the Backup and DR agent keeps the instance usable but blocks new enhanced backups and restores until access returns. Disabling a key version blocks restoring backups encrypted with it; destroyed versions make them permanently unrestorable.
- Export/import: to keep exported data encrypted, set a customer-managed key on the Cloud Storage bucket before exporting; importing into a new instance has no special requirements. With data cache on a CMEK-enabled Enterprise Plus instance, the local SSD is encrypted too.
- The source also describes external key managers (Cloud EKM) and Key Access Justifications; diagrams omitted.
- Cloud SQL is managed PostgreSQL / MySQL / SQL Server on Google Cloud, distinct from Supabase Postgres (`supabase`).
- Source: https://docs.cloud.google.com/sql/docs/postgres/cmek (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [roles-and-permissions.md](./roles-and-permissions.md)
- [iam-authentication.md](./iam-authentication.md)
