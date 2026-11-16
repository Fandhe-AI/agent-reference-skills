---
source: https://docs.cloud.google.com/firestore/mongodb-compatibility/docs/indexing
---

# Manage indexes

Create, partition and delete indexes (single field, compound, sparse, multikey, unique, text, 2dsphere) with the MongoDB API or gcloud, and manage the long-running index build operations.

## Signature / Usage

### Create an index (MongoDB API)

```javascript
db.restaurants.createIndex({"cuisine" : 1})
db.restaurants.createIndex({"cuisine" : 1}, {sparse: true})
db.runCommand({"createIndexes":"restaurant", "indexes": [{"key": {"cuisine":1}, "name": "cuisine_index"}]})
```

### Create an index (gcloud)

Set `api-scope` to `mongodb-compatible-api`.

```bash
gcloud firestore indexes composite create \
--database='DATABASE_ID' \
--collection-group=COLLECTION \
--field-config=FIELD_CONFIGURATION \
--query-scope=collection-group \
--density=dense \
--api-scope=mongodb-compatible-api
```

For each field add `--field-config=field-path=`, for example `--field-config=field-path=user-id,order=descending` and `--field-config=field-path=score,order=descending`.

Sparse: `--density=sparse-any`. Multikey: add `--multikey`. Unique: add `--unique`.

### Text index

```javascript
db.cities.createIndex({"country": "text", "food": "text"})
db.cities.createIndex({"country": "text"}, {"default_language": "french", "language_override": "myLanguageField"})
```

Partitioned text index (`PARTITIONED_FIELD` is a top-level string field):

Adapted (not in the official docs): added the missing comma after `name` and the closing brace of `firestoreOptions`; the source's command is a syntax error.

```javascript
db.runCommand({
  createIndexes: "cities",
  indexes: [
    {
      key: { "country": "text", "food": "text"},
      name: "country_text_food_text",
      firestoreOptions: {"customPartitionFields": ["PARTITIONED_FIELD"]}
    }
  ]
})
```

```bash
gcloud firestore indexes composite create \
  --database='DATABASE_ID' \
  --collection-group=COLLECTION_GROUP \
  --field-config=field-path=FIELD_NAME,search-config='{"text-spec": {"index-specs": [{"index-type": "tokenized", "match-type": "match-globally"}]}}' \
  --api-scope=mongodb-compatible-api \
  --search-index-options=text-language=en \
  --async
```

### 2dsphere index

```javascript
db.restaurants.createIndex({"location" : "2dsphere", "region": "2dsphere"})
```

Partitioned 2dsphere index:

Adapted (not in the official docs): added the missing comma after `name` and the closing brace of `firestoreOptions`; the source's command is a syntax error.

```javascript
db.runCommand({
  createIndexes: "restaurants",
  indexes: [
    {
      key: { "location": "2dsphere", "region": "2dsphere" },
      name: "location_2dsphere_region_2dsphere",
      firestoreOptions: {"customPartitionFields": ["PARTITIONED_FIELD"]}
    }
  ]
})
```

```bash
gcloud firestore indexes composite create \
  --database='DATABASE_ID' \
  --collection-group=COLLECTION_GROUP \
  --field-config=field-path=FIELD_NAME,search-config='{"geo-spec": {}}' \
  --api-scope=mongodb-compatible-api \
  --async
```

### Delete an index

```javascript
db.restaurants.dropIndex("cuisine_index")
db.restaurants.dropIndex({"cuisine" : 1})
```

```bash
gcloud firestore indexes composite list \
--database='DATABASE_ID'
gcloud firestore indexes composite delete INDEX_NAME \
--database='DATABASE_ID'
```

Index builds are long-running operations: monitor them with `gcloud firestore operations list` and `gcloud firestore operations describe operation-name`.

## Options / Props

| Item | Value |
| --- | --- |
| Roles to create indexes | `roles/datastore.owner`, `roles/datastore.indexAdmin`, `roles/editor`, `roles/owner` |
| Custom-role permissions | `datastore.indexes.create`, `.delete`, `.get`, `.list`, `.update` |
| Limit | One index per request; `db.collection.createIndexes()` unsupported |
| Text index | One per collection; field must be a string or array of strings; array indexes are not search-indexed |
| Partition field | One top-level string field; queries on a partitioned index must specify it |
| Default language | Long name (`english`) or ISO code (`en`); defaults to English; override field must be top-level, defaults to `language`; `null` character disables the override |
| `--density` | `dense`, `sparse-any` (Terraform `DENSE`, `SPARSE_ANY`) |
| Audit log method | `google.firestore.admin.v1.FirestoreAdmin.CreateIndex` |
| Build time | Minimum a few minutes even for an empty database; backfill time grows with matching data |
| Operation names | `projects/PROJECT_ID/databases/DATABASE_ID/operations/...`; prefix may be omitted for `describe`; listed for a few days after completion |
| Progress | `workCompleted` / `workEstimated` (estimate may be inaccurate) |

Supported text languages (code = name): und = Autodetect, af, ak, sq, am, ar, hy, az, eu, be, bn, bs, bg, my, ca, ceb, chr, zh, zh-Hant (Chinese_Traditional), hr, cs, da, nl, en, eo, et, fil, fi, fr, gl, ka, de, el, gu, ht, ha, haw, iw (Hebrew), hi, hmn, hu, is, ig, id, ga, it, ja, jv, kn, kk, km, ko, lo, la, lv, lt, lb, mk, mg, ms, ml, mt, mi, mr, mfe, mn, sr-ME, ne, no, ny, or, fa, pl, pt-BR, pt-PT, pa, ro, ru, gd, sr, st, si, sk, sl, so, es, su, sw, sv, tg, ta, te, th, tr, uk, ur, uz, vi, cy, yi, yo, zu. See the source page for the full code-to-name table.

## Notes

- Dropping a collection with `drop()` also deletes all its indexes. Index deletion is destructive; try it on a disposable index first.
- Corrected from the official docs: the partitioned-index examples originally read `name: "country_text_food_text"` (and `name: "location_2dsphere_region_2dsphere"`) with no trailing comma and `firestoreOptions: {"customPartitionFields": ["PARTITIONED_FIELD"]` without the closing `}`.
- Source inconsistency: the createIndexes example uses collection `"restaurant"` while the other examples use `restaurants`.
- The source also shows Console and Terraform (`google_firestore_index` with `api_scope = "MONGODB_COMPATIBLE_API"`) forms; omitted.
- Source: https://docs.cloud.google.com/firestore/mongodb-compatibility/docs/indexing (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [supported-features-80.md](./supported-features-80.md)
- [behavior-differences.md](./behavior-differences.md)
