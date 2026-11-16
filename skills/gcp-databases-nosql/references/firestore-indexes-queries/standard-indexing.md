---
source: https://docs.cloud.google.com/firestore/native/docs/standard-indexing
---

# Manage Standard edition indexes

How to create and manage automatic (exemptions), manual and vector indexes in Firestore Standard edition: through error-message links, the console, the Firebase CLI, or Terraform, and how to monitor index builds as long-running operations.

## Signature / Usage

### Create a missing index through an error message

A compound query with a range clause that has no matching index fails with an error containing a link that opens the Firebase console to create the index (links always open in the Firebase console, even though you can manage Standard edition from the Google Cloud console too). Review the prefilled info and click Create. For non-array and non-map fields you must pick ascending or descending even if you do not need ordering; the choice does not affect equality behavior. If a vector index is missing, the error message includes a Google Cloud CLI command to create it.

### Console (Google Cloud console)

In Databases, select the database, then Indexes. The Manual tab manages manual indexes (Create Index, or Create vector index which takes a vector field path and number of dimensions; delete via More > Delete). The Automatic tab manages exemptions (Add Exemption with Collection ID and Field path; field path `*` makes a collection-level exemption; deleting an exemption reverts to inherited settings).

### Firebase CLI

```bash
firebase init firestore
firebase deploy
firebase deploy --only firestore
```

`firebase init firestore` generates a JSON file with the default indexes; edit it and deploy. `--only firestore` deploys Firestore indexes and rules only. If you edit indexes in the console, update the local indexes file too.

### Monitor index builds

```bash
gcloud firestore operations list
```

```bash
gcloud firestore operations describe operation-name
```

Operation names are prefixed `projects/[PROJECT_ID]/databases/(default)/operations/`; the prefix can be omitted for `describe`.

```text
projects/project-id/databases/(default)/operations/ASA1MTAwNDQxNAgadGx1YWZlZAcSeWx0aGdpbi1zYm9qLW5pbWRhEgopEg
```

Progress of an index build (`workCompleted` / `workEstimated`):

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

### Roles and permissions to create indexes

| Role / permission | Notes |
|---|---|
| `roles/datastore.owner` | Any one of these roles is sufficient |
| `roles/datastore.indexAdmin` | |
| `roles/editor` | |
| `roles/owner` | |
| `datastore.indexes.create`, `datastore.indexes.delete`, `datastore.indexes.get`, `datastore.indexes.list`, `datastore.indexes.update` | Custom roles need all five |

### Terraform resources

| Resource | Used for |
|---|---|
| `google_firestore_field` | Single-field (automatic) index configuration and exemptions |
| `google_firestore_index` | Composite (manual), vector and Datastore mode indexes (`api_scope = "DATASTORE_MODE_API"`) |

## Notes

- Index build time = setup (a few minutes minimum, even for an empty database) + backfill (grows with the number of matching existing field values). Index builds are long-running operations; listed operations remain visible for a few days after completion.
- `workCompleted` / `workEstimated` count documents; dividing gives a rough progress estimate that can be inaccurate because it depends on delayed statistics collection. A finished operation contains `"done": true`; check its `state` for the result. Do not depend on `done` existing for in-progress operations.
- Index build errors usually mean an index limit was hit (for example the maximum index entries per document); check limits, then retry.
- Deleting a manual index or an exemption is destructive for query support; try it on a disposable database first.
- Migrating `google_datastore_index` (deprecated, unavailable in terraform-provider-google 6.0.0 and later) to `google_firestore_index`: write the equivalent resource (`kind` becomes `collection`, `ancestor` becomes `query_scope` with `ALL_ANCESTORS` mapping to `COLLECTION_RECURSIVE` and otherwise `COLLECTION_GROUP`, add `api_scope = "DATASTORE_MODE_API"`, `properties` becomes `fields` with `name` / `direction` becoming `field_path` / `order`), `terraform import`, remove the old resource and its state, run `terraform plan`. Warning from the source: do not run `terraform apply` if the plan shows any index resource being replaced or deleted, as that may lose the index and cause downtime.
- The source also shows Terraform HCL examples (single-field, composite, vector, Datastore mode, migration) and many Console steps; they are omitted here.
- Firebase CLI / Firebase console usage is out of scope of this skill beyond what the source states. Firestore pages here describe Google Cloud's managed document database, distinct from Supabase Postgres (`supabase`) and Cloudflare KV / D1 (`cloudflare-storage`).
- `datastore.indexes.*` is the legacy alias of `datastore.schemas.*`; the IAM roles reference (`references/iam/firestore.md`) lists the `datastore.schemas.*` names (see `firestore-security/iam.md`).
- Source: https://docs.cloud.google.com/firestore/native/docs/standard-indexing (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [standard-index-overview.md](./standard-index-overview.md)
- [enterprise-indexing.md](./enterprise-indexing.md)
- [query-explain.md](./query-explain.md)
