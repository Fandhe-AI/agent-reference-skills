---
source: https://docs.cloud.google.com/firestore/native/docs/manage-data/export-import
---

# Exporting and importing data

The Firestore managed export and import service copies documents to and from Cloud Storage, via `gcloud` or the Firestore Admin API. Use it to recover from accidental deletion, move data between databases, or export for offline processing and BigQuery loading.

> Caution (source): exporting incurs one read operation per document exported. These reads do not appear in the console usage section. Understand this before setting up recurring exports to avoid an unexpected bill.

## Signature / Usage

Replace `BUCKET_NAME` with the bucket (optionally followed by a file prefix such as `BUCKET_NAME/my-exports-folder/export-name`; without one, the service creates a timestamp-based prefix), `DATABASE` with the database name (`'(default)'` for the default database), `EXPORT_PREFIX` with the export folder, and `OPERATION_NAME` with an operation name.

### Grant the service agent bucket access

Needed when the bucket is in another project (same-project buckets work by default). Replace `PROJECT_NUMBER` with your project number:

Adapted (not in the official docs): square-bracket placeholders (`[BUCKET_NAME]` style) replaced by bare upper-case ones; zsh treats `[...]` as a glob pattern.

```bash
gsutil iam ch serviceAccount:service-PROJECT_NUMBER@gcp-sa-firestore.iam.gserviceaccount.com:roles/storage.admin \
    gs://BUCKET_NAME
```

### Export

All documents (add `--async` to not wait):

Adapted (not in the official docs): square-bracket placeholders (`[BUCKET_NAME]` style) replaced by bare upper-case ones; zsh treats `[...]` as a glob pattern.

```bash
  gcloud firestore export gs://BUCKET_NAME \
  --database=DATABASE
```

Specific collection groups:

Adapted (not in the official docs): square-bracket placeholders (`[BUCKET_NAME]` style) replaced by bare upper-case ones; zsh treats `[...]` as a glob pattern.

```bash
gcloud firestore export gs://BUCKET_NAME \
--collection-ids=COLLECTION_GROUP_ID_1,COLLECTION_GROUP_ID_2 \
--database=DATABASE
```

From a PITR timestamp (`PITR_TIMESTAMP` is a minute-granularity timestamp such as `2023-05-26T10:20:00.00Z`; add `--collection-ids` for specific groups):

Adapted (not in the official docs): square-bracket placeholders (`[BUCKET_NAME]` style) replaced by bare upper-case ones; zsh treats `[...]` as a glob pattern.

```bash
gcloud firestore export gs://BUCKET_NAME_PATH \
    --snapshot-time=PITR_TIMESTAMP
```

### Import

Imports overwrite existing documents with the same ID. To import specific collection groups (only from an export of specific collection groups), add `--collection-ids=COLLECTION_GROUP_ID_1,COLLECTION_GROUP_ID_2`.

Adapted (not in the official docs): square-bracket placeholders (`[BUCKET_NAME]` style) replaced by bare upper-case ones; zsh treats `[...]` as a glob pattern.

```bash
gcloud firestore import gs://BUCKET_NAME/EXPORT_PREFIX/ --database=DATABASE
```

```bash
gcloud firestore import gs://my-bucket/2017-05-25T23:54:39_76544/ --database='cymbal'
```

### Manage operations

Adapted (not in the official docs): square-bracket placeholders (`[BUCKET_NAME]` style) replaced by bare upper-case ones; zsh treats `[...]` as a glob pattern.

```bash
gcloud firestore operations list
gcloud firestore operations describe OPERATION_NAME
gcloud firestore operations cancel OPERATION_NAME
gcloud firestore operations delete OPERATION_NAME
```

Decode a metadata file:

```bash
protoc --decode_raw < export0.export_metadata
```

## Options / Props

| Item | Value |
|---|---|
| Firestore roles | `Owner`, `Cloud Datastore Owner`, or `Cloud Datastore Import Export Admin` |
| Cloud Storage roles | `Owner` or `Storage Admin` |
| Firestore service agent | `service-PROJECT_NUMBER@gcp-sa-firestore.iam.gserviceaccount.com` |
| Legacy account | App Engine default service account `PROJECT_ID@appspot.gserviceaccount.com` |
| Org policy constraint | `firestore.requireP4SAforImportExport` (Require Firestore Service Agent for import/export) |
| Billing label | `goog-firestoremanaged:exportimport` |
| BigQuery column limit | 10,000 columns per table; map fields may be treated as bytes to stay under it |
| Output format | LevelDB log format; metadata `ALL_NAMESPACES_KIND_[COLLECTION_GROUP_ID].export_metadata` |
| Operation name prefix | `projects/[PROJECT_ID]/databases/(default)/operations/` (may be omitted in `describe`, `cancel`, `delete`) |

## Notes

- Billing must be enabled (Firebase projects must be on Blaze). The bucket cannot be a Requester Pays bucket or a Rapid bucket; place it near the database location.
- An export is not an exact snapshot; it may include changes made while running. An export does not contain index definitions; imports use current index definitions.
- Import reuses exported document IDs and overwrites existing documents with the same ID; unaffected documents remain. Imports don't trigger Cloud Functions, but snapshot listeners receive updates. Don't add or remove documents in exported files, or the import fails. `.overall_export_metadata` must keep the same name as its parent folder when moved or copied.
- Exports must use `--collection-ids` to later import only specific collection groups or load into BigQuery. A collection group's export does not include subcollections of its collections unless listed.
- Cancelling does not undo work: exported files remain in Cloud Storage, imported updates stay, and a partial export cannot be imported. `operations delete` does not delete export files. Closing the terminal does not cancel an operation.
- Cancel and delete are state-changing, and imports overwrite existing documents; try them on a disposable database first.
- Export costs one read per document, import one write per document; export/import don't trigger budget alerts until completion and don't appear in the usage dashboard. `workEstimated` / `workCompleted` give a rough progress estimate.
- PITR exports require PITR enabled, a whole-minute RFC 3339 timestamp within 7 days and not before `earliestVersionTime`; failed PITR exports are not charged.
- With VPC Service Controls, use the Firestore service agent. Migrating from the App Engine service account is irreversible: grant the `Firestore Service Agent` role (read and write on the bucket) on buckets in other projects, then click Migrate in the console, or set the org policy constraint (which does not grant bucket permissions).
- Corrected from the official docs: the gcloud and gsutil examples use square-bracket placeholders such as `gs://[BUCKET_NAME]`, `--database=[DATABASE]` and `gcloud firestore operations describe [OPERATION_NAME]`. The import-specific-collection-groups block is summarized in prose.
- The source also shows Console steps and BigQuery load details (omitted). Table cells keep the source's square-bracket notation; they are not commands.
- Firestore's managed document database (Native / Datastore mode, MongoDB compatibility) — distinct from Supabase Postgres (`supabase`) and Cloudflare KV / D1 (`cloudflare-storage`).
- Source: https://docs.cloud.google.com/firestore/native/docs/manage-data/export-import (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [use-pitr.md](./use-pitr.md)
- [backups.md](./backups.md)
- [monitor-usage.md](./monitor-usage.md)
