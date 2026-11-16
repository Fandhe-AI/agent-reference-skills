---
source: https://docs.cloud.google.com/firestore/native/docs/use-pitr
---

# Work with point-in-time recovery (PITR)

Enable and disable PITR, inspect retention and `earliestVersionTime`, read PITR data, clone a database at a timestamp, and export/import PITR data.

## Signature / Usage

### Enable PITR at database creation

```bash
gcloud firestore databases create\
  --location=LOCATION\
  --database=DATABASE_ID\
  --type=firestore-native\
  --enable-pitr
```

### Disable PITR

```bash
gcloud firestore databases update\
  --database=DATABASE_ID\
  --no-enable-pitr
```

### Get retention period and earliest version time

```bash
gcloud firestore databases describe --database=DATABASE_ID
```

Replace `DATABASE_ID` with the database ID or `'(default)'`. Relevant output fields: `earliestVersionTime`, `pointInTimeRecoveryEnablement` (`POINT_IN_TIME_RECOVERY_ENABLED` / `POINT_IN_TIME_RECOVERY_DISABLED`, or absent when disabled), `versionRetentionPeriod` (`3600s` disabled, seven days when enabled).

### Read PITR data (Node.js)

PITR reads in server client libraries (Go, Java, Node.js, PHP) require a `ReadOnly` transaction; `readTime` cannot be set directly on reads. Mobile and web SDKs are not supported.

```javascript
const documentSnapshot = await firestore.runTransaction(
    updateFunction => updateFunction.get(documentRef),
    {readOnly: true, readTime: new Firestore.Timestamp(1684098540, 0)}
);

const querySnapshot = await firestore.runTransaction(
    updateFunction => updateFunction.get(query),
    {readOnly: true, readTime: new Firestore.Timestamp(1684098540, 0)}
);
```

REST: set `readTime` on the read request. Per the Firestore v1 Discovery document, it is the `readTime` query parameter of `documents.get`, `documents.list` and `documents.listDocuments`, and a top-level `readTime` field of the request body of `batchGet`, `listCollectionIds`, `runQuery`, `runAggregationQuery` and `partitionQuery`. For multiple PITR reads, call `beginTransaction` with `options.readOnly.readTime` (a `ReadOnly` transaction) and pass the returned transaction to the reads. The FirestoreIO Apache Beam connector supports `withReadTime(@Nullable Instant readTime)`.

### Clone a database

```bash
gcloud firestore databases clone \
--source-database='SOURCE_DATABASE' \
--snapshot-time='PITR_TIMESTAMP' \
--destination-database='DESTINATION_DATABASE_ID'
```

Example:

```bash
gcloud firestore databases clone \
--source-database='projects/example-project/databases/(default)' \
--snapshot-time='2025-06-01T10:20:00.00Z' \
--destination-database='example-dest-db'
```

Change encryption with `--encryption-type` (`use-source-encryption` default, `google-default-encryption`, `customer-managed-encryption` with `--kms-key-name`):

```bash
gcloud firestore databases clone \
--source-database='projects/example-project/databases/(default)' \
--snapshot-time='2025-06-01T10:20:00.00Z' \
--destination-database='example-dest-db' \
--encryption-type='customer-managed-encryption' \
--kms-key-name='projects/example-project/locations/us-central1/keyRings/example-key-ring/cryptoKeys/example-key'
```

### Export PITR data, then import

```bash
gcloud firestore export gs://BUCKET_NAME_PATH \
    --snapshot-time=PITR_TIMESTAMP \
    --collection-ids=COLLECTION_IDS \
    --namespace-ids=NAMESPACE_IDS
```

Import with the steps in [export-import.md](./export-import.md); existing documents are overwritten.

## Options / Props

| Item | Value |
|---|---|
| Enable at create | `--enable-pitr` on `databases create` only (console cannot enable PITR at creation) |
| `PITR_TIMESTAMP` | RFC 3339, minute granularity, e.g. `2025-06-01T10:20:00.00Z` or `2025-06-01T10:30:00.00-07:00` |
| `SOURCE_DATABASE` | `projects/PROJECT_ID/databases/SOURCE_DATABASE_ID` |
| `--tags` (clone) | Optional `KEY=VALUE` pairs, e.g. `--tags=key1=value1,key2=value2` |
| `datastore.databases.create` | Enable PITR when creating a database |
| `datastore.databases.update`, `datastore.databases.list` | Update PITR settings |
| `datastore.databases.get`, `datastore.entities.get`, `datastore.entities.list` | Read PITR data |
| `datastore.databases.export` / `datastore.databases.import` | Export / import PITR data |
| `datastore.databases.clone` | Clone a database |

## Notes

- Role: Cloud Datastore Owner (`roles/datastore.owner`) on the project contains the permissions above.
- Billing must be enabled. Retention starts from enablement; disabling makes PITR data unreadable; re-enabling immediately after disabling makes past PITR data unavailable. If data was deleted in the last hour and PITR is disabled, enable PITR within one hour of deletion. Reads on expired PITR data fail.
- Without PITR, clone works for any minute in the past hour; with PITR, any minute in the last 7 days (or less if enabled more recently).
- Export fails with `Point-in-Time Recovery must be enabled in order to execute exports at a snapshot timestamp` when PITR is disabled, even within the past hour. Timestamp must be a whole minute, within 7 days, not before `earliestVersionTime`. Failed PITR exports are not charged.
- A clone is created in the source's location with all data and indexes; by default it keeps the source's encryption (Google default or CMEK). It does not clone App Engine search data or blob entities from a `(default)` database.
- `earliestVersionTime` is stale the moment it is queried; account for the delay before initiating recovery.
- Source inconsistency: the source prose names the flag `--enable-ptir`, while the command uses `--enable-pitr`.
- The source also shows Console steps, Java samples (read-only transaction and Beam), and the Firebase CLI `firestore:databases:clone` form (omitted).
- Firestore's managed document database (Native / Datastore mode, MongoDB compatibility) — distinct from Supabase Postgres (`supabase`) and Cloudflare KV / D1 (`cloudflare-storage`).
- Source inconsistency: the source says "pass the `readTime` value as as a supported PITR timestamp in the `readOptions` method"; the REST methods have no `readOptions` field, so the locations above follow the Discovery document (see `references/rest/firestore/firestore.md` and `references/rest-schemas/firestore/`).
- Source: https://docs.cloud.google.com/firestore/native/docs/use-pitr (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [pitr.md](./pitr.md)
- [export-import.md](./export-import.md)
- [backups.md](./backups.md)
