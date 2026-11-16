---
source: https://docs.cloud.google.com/firestore/native/docs/enterprise-indexing
---

# Manage Enterprise edition indexes

Create, list and delete indexes in Firestore Enterprise edition (standard composite, sparse, unique, text and geospatial) with the console, `gcloud` or Terraform, and track index builds as long-running operations.

## Signature / Usage

### Create an index

```bash
gcloud firestore indexes composite create \
--database='DATABASE_ID' \
--collection-group=COLLECTION \
--field-config=FIELD_CONFIGURATION \
--query-scope=collection-group \
--density=dense
```

Replace `DATABASE_ID` with a database ID, `COLLECTION` with a collection name, and `FIELD_CONFIGURATION` with a field configuration (one `--field-config=field-path=` per field), for example:

```text
    --field-config=field-path=user-id,order=descending \
    --field-config=field-path=score,order=descending
```

For a sparse index set `--density=sparse-any`. For a unique index add the `--unique` flag.

### Create a text index

```bash
gcloud firestore indexes composite create \
  --database='DATABASE_ID' \
  --collection-group=COLLECTION_GROUP \
  --field-config=field-path=FIELD_NAME,search-config='{"text-spec": {"index-specs": [{"index-type": "tokenized", "match-type": "match-globally"}]}}' \
  --search-index-options=text-language=en \
  --async
```

### Create a geospatial index

```bash
gcloud firestore indexes composite create \
  --database='DATABASE_ID' \
  --collection-group=COLLECTION_GROUP \
  --field-config=field-path=FIELD_NAME,search-config='{"geo-spec": {}}' \
  --async
```

`--async` runs index creation in the background.

### Delete an index

```bash
gcloud firestore indexes composite list \
--database='DATABASE_ID'
```

```bash
gcloud firestore indexes composite delete INDEX_NAME \
--database='DATABASE_ID'
```

### Monitor index builds

```bash
gcloud firestore operations list
```

```bash
gcloud firestore operations describe operation-name
```

Operation names look like:

```text
projects/PROJECT_ID/databases/DATABASE_ID/operations/ASA1MTAwNDQxNAgadGx1YWZlZAcSeWx0aGdpbi1zYm9qLW5pbWRhEgopEg
```

Example progress output:

```text
{
  "operations": [
    {
      "name": "projects/project-id/operations/AyAyMDBiM2U5NTgwZDAtZGIyYi0zYjc0LTIzYWEtZjg1ZGdWFmZWQHEjF0c2Flc3UtcmV4ZWRuaS1uaW1kYRUKSBI",
      "metadata": {
        "@type": "type.googleapis.com/google.firestore.admin.v1.IndexOperationMetadata",
        "common": {
          "operationType": "CREATE_INDEX",
          "startTime": "2020-06-23T16:52:25.697539Z",
          "state": "PROCESSING"
        },
        "progressDocuments": {
          "workCompleted": "219327",
          "workEstimated": "2198182"
        }
       },
    },
    ...
```

## Options / Props

### Roles and permissions

| Role / permission | Notes |
|---|---|
| `roles/datastore.owner`, `roles/datastore.indexAdmin`, `roles/editor`, `roles/owner` | Any one is sufficient |
| `datastore.indexes.create`, `.delete`, `.get`, `.list`, `.update` | Custom roles need all five (`datastore.indexes.*`) |

### gcloud flags used

| Flag | Description |
|---|---|
| `--database` | Database ID |
| `--collection-group` | Collection to index |
| `--field-config` | `field-path=...,order=...` or `field-path=...,search-config=...` per field |
| `--query-scope=collection-group` | Index query scope |
| `--density=dense` / `--density=sparse-any` | Non-sparse (default shown) or sparse index |
| `--unique` | Unique index |
| `--search-index-options=text-language=en` | Default language of a text index |
| `--async` | Run creation in the background |

### Terraform `google_firestore_index` values

| Placeholder | Allowed values |
|---|---|
| `ORDER` | `ASCENDING` or `DESCENDING` |
| `DENSITY` | `SPARSE_ANY` or `DENSE` |

## Notes

- Index build time: minimum a few minutes even for an empty database, plus backfill time proportional to the number of matching existing field values. Operations stay listed for a few days after completion.
- `workEstimated` / `workCompleted` are document counts; divide for a rough estimate (may be inaccurate due to delayed statistics). A completed operation has `"done": true`; if `done` is not set the operation has not completed. See `state` for the result.
- `gcloud firestore indexes composite delete` is destructive; try it on a disposable database first.
- On the console, text indexes ask for Search Type Text, query scope, default language and optional language override path; geospatial indexes use Search Type Geo (2dsphere). The source also shows Console steps and a Terraform example (`google_firestore_index` with `multikey` and `density`), omitted here.
- Firestore pages here describe Google Cloud's managed document database (Native mode, Datastore mode, MongoDB compatibility), distinct from Supabase Postgres (`supabase`) and Cloudflare KV / D1 (`cloudflare-storage`).
- Source: https://docs.cloud.google.com/firestore/native/docs/enterprise-indexing (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [enterprise-index-overview.md](./enterprise-index-overview.md)
- [standard-indexing.md](./standard-indexing.md)
- [query-explain.md](./query-explain.md)
- gcloud reference: https://docs.cloud.google.com/sdk/gcloud/reference/firestore/indexes/composite/create
