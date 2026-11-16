---
source: https://docs.cloud.google.com/firestore/native/docs/ttl
---

# Manage data retention with TTL policies

TTL policies designate a field as the expiration time for documents in a collection group so stale data is deleted automatically, typically within 24 hours after expiration.

## Signature / Usage

### Create a TTL policy

```bash
 gcloud firestore fields ttls update \
  ttl_field \
  --collection-group=collection_group_name \
  --enable-ttl 
```

With an expiration offset (e.g. `7d`, `24h`; defaults to 0):

```bash
 gcloud firestore fields ttls update \
  ttl_field \
  --collection-group=collection_group_name \
  --enable-ttl \
  --expiration-offset=expiration_offset 
```

Add `--async` to not wait. Enabling takes a minimum of ten minutes or more.

### View policies and operations

```bash
gcloud firestore fields ttls list
```

```bash
gcloud firestore fields ttls list  --collection-group=collection_group_name
```

```bash
gcloud firestore operations list
```

### Disable a TTL policy

```bash
gcloud firestore fields ttls update ttl_field --collection-group=collection_group_name --disable-ttl
```

## Options / Props

### Limits and permissions

| Item | Value |
|---|---|
| TTL fields per collection group | One |
| Field level configurations | Max 1000 (a single-field index exemption and a TTL policy on one field count as one) |
| View policies | `datastore.indexes.list`, `datastore.indexes.get` |
| Modify policies | `datastore.indexes.update` |
| Check TTL operations | `datastore.operations.list`, `datastore.operations.get` |
| Standard edition TTL value | `Date and time` |
| Enterprise edition TTL value | `Date and time` or an `Array` containing a `Date and time` |

### Cloud Monitoring metrics

| Metric type | Metric name | Description |
|---|---|---|
| `firestore.googleapis.com/document/ttl_deletion_count` | Time-to-live deletion count | Total count of documents deleted by TTL policies |
| `firestore.googleapis.com/document/ttl_expiration_to_deletion_delays` | Time-to-live expiration to deletion delays | Time between expiry and actual deletion |

## Notes

- TTL deletes count towards document delete costs. Deletion is not instantaneous: expired documents still appear in queries until deleted. Deleting a document does not delete its subcollections. Order and transactionality are not guaranteed; use a client library if you need that.
- Applying a policy on an existing collection group bulk-deletes all expired data; past-dated documents are deleted within 24 hours of the policy becoming active. The latest TTL field value is always honored. A missing field or a value like `null` disables expiry per document. TTL deletes run at lower priority, call snapshot listeners and trigger Cloud Run functions Firestore triggers.
- Datastore mode: TTL cannot be used with the Optimistic With Entity Groups concurrency mode.
- Some Enterprise edition TTL policies created before February 2026 don't apply to `Date and time` values inside arrays; disable and re-enable to update.
- A TTL field can be indexed or unindexed; indexing a timestamp can create hotspots. Standard edition creates single-field indexes by default; add a single-field index exemption to disable it.
- Disabling a policy stops future expirations. TTL policies are not included in backups.
- Enabling a TTL policy is destructive (expired documents are deleted permanently); try it on a disposable collection group or database first.
- The source also shows Console steps (omitted). Placeholders `ttl_field`, `collection_group_name`, `expiration_offset` are lower-case in the source.
- Firestore's managed document database (Native / Datastore mode, MongoDB compatibility) — distinct from Supabase Postgres (`supabase`) and Cloudflare KV / D1 (`cloudflare-storage`).
- `datastore.indexes.*` is the legacy alias of `datastore.schemas.*`; the IAM roles reference (`references/iam/firestore.md`) lists the `datastore.schemas.*` names (see `firestore-security/iam.md`).
- Source: https://docs.cloud.google.com/firestore/native/docs/ttl (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [monitor-usage.md](./monitor-usage.md)
- [backups.md](./backups.md)
