---
source: https://docs.cloud.google.com/storage/docs/lifecycle
---

# Object Lifecycle Management

A lifecycle configuration set on a bucket contains rules, each with exactly one action and one or more conditions; Cloud Storage performs the action automatically on objects that meet the conditions (TTL deletion, storage class downgrade, version retention).

## Signature / Usage

Example condition value formats from the source:

```text
"matchesSuffix": [".jpg", ".png"]
"matchesPrefix":["pictures/paris_"]
```

Example use cases: downgrade objects older than 365 days to Coldline; delete objects created before January 1, 2019; keep only the 3 most recent versions in a versioned bucket. General format: bucket resource representation for JSON or lifecycle configuration format for XML (see official links); set it with the lifecycle setup page (https://docs.cloud.google.com/storage/docs/managing-lifecycles#set).

### Rule semantics

- An object must match all conditions of a rule for its action to run. Rules with the same action: any matching rule triggers it.
- If multiple rules match one object, only one action is taken: `Delete` takes precedence over `SetStorageClass`; among `SetStorageClass` rules the class with the lowest at-rest storage price wins (Nearline vs Coldline with identical conditions gives Coldline).
- Test rules on development data first, or on a small production subset with `matchesPrefix` / `matchesSuffix`.
- Changes can take up to 24 hours to take effect, and old configuration may still act meanwhile (changing `age` 10 to 20 days: an 11-day-old object could still be deleted up to 24 hours later).
- All conditions are optional but at least one is required. An invalid configuration returns `400 Bad request` and the existing configuration stays.
- JSON uses `lowerCamelCase`, XML `UpperCamelCase`; in XML `numNewerVersions` is named `NumberOfNewerVersions`.

## Options / Props

### Actions (exactly one per rule)

| Action | Behavior |
|---|---|
| `Delete` | Deletes the object. By default a live object becomes soft-deleted and is retained 7 days (restorable). With Object Versioning, deleting the live version makes it noncurrent; deleting a noncurrent version removes it. Has no effect while an object hold or unmet retention policy applies; runs after the hold is removed and retention is met. |
| `SetStorageClass` | Changes storage class and updates modification time. Not allowed on Autoclass buckets. |
| `AbortIncompleteMultipartUpload` | Aborts incomplete multipart uploads and deletes parts. Only `age`, `matchesPrefix`, `matchesSuffix` can be used with it; other conditions cause an error. |

Warning: if you disable soft delete on your bucket, any objects you delete are permanently removed and cannot be restored. Set up rules carefully so you do not delete more data than intended.

### `SetStorageClass` transitions

| Original storage class | New storage class |
|---|---|
| Durable Reduced Availability (DRA) | Nearline, Coldline, Archive, Multi-Regional/Regional |
| Standard, Multi-Regional, Regional | Nearline, Coldline, Archive |
| Nearline | Coldline, Archive |
| Coldline | Archive |

For buckets in a region the new class cannot be Multi-Regional; for multi-region or dual-region buckets it cannot be Regional. Cloud Storage does not validate transitions: an unlisted transition is accepted but will not occur.

### Conditions

| Condition | Satisfied when |
|---|---|
| `age` | Resource reaches the age in days from creation time (object creation = upload completion; multipart upload = initiation; unaffected by becoming noncurrent). `0` is satisfied at midnight UTC after creation. |
| `createdBefore` | Created before midnight UTC of the given date |
| `customTimeBefore` | Date part of `Custom-Time` earlier than the date (`YYYY-MM-DD`); never satisfied without `Custom-Time` |
| `daysSinceCustomTime` | The number of days passed since `Custom-Time`; never satisfied without `Custom-Time` |
| `daysSinceNoncurrentTime` | Days since the object became noncurrent (typically with versioning) |
| `isLive` | `false` matches noncurrent versions; `true` matches live versions (all objects are live without versioning) |
| `matchesStorageClass` | Object has one of `STANDARD`, `NEARLINE`, `COLDLINE`, `ARCHIVE`, `MULTI_REGIONAL`, `REGIONAL`, `DURABLE_REDUCED_AVAILABILITY`. Not allowed on Autoclass buckets. |
| `matchesPrefix` / `matchesSuffix` | Case-sensitive exact match of name beginning/end; lists allowed; do not include bucket name or leading `/`; up to 1000 prefixes and suffixes in total across all rules; no duplicate within a condition |
| `noncurrentTimeBefore` | Became noncurrent before the date (`YYYY-MM-DD`); never satisfied for live objects |
| `numNewerVersions` | At least N newer versions exist (including the live version); live version counts 0 newer |
| `sizeAboveBytes` / `sizeBelowBytes` | Object data size larger/smaller than the value (metadata excluded); maximum 5 TiB; use both for a range |

- Caution: do not use `MULTI_REGIONAL` in `matchesStorageClass` for a regional bucket, or `REGIONAL` for a multi-region or dual-region bucket (error when setting the configuration). To cover older legacy-class Standard objects also include `REGIONAL` and `DURABLE_REDUCED_AVAILABILITY` (regional bucket) or `MULTI_REGIONAL` and `DURABLE_REDUCED_AVAILABILITY` (multi/dual-region).
- In a hierarchical namespace bucket `sizeBelowBytes` cannot delete empty folders (never satisfied by an empty folder).

## Notes

- Actions run asynchronously; there can be a lag between meeting conditions and the action. Do not rely on timing. Charges still apply until then, except at-rest storage is waived when: soft delete is disabled, a `Delete` rule has only `age` (or `age` plus `matchesStorageClass`), the age condition is met, and there are no object holds.
- Versioned buckets: a live object deleted by a rule becomes noncurrent and is deleted later if the noncurrent version also satisfies the rule.
- `SetStorageClass` cost: counts as a Class A operation billed at the destination class rate. For small objects the cost may outweigh savings; use `sizeAboveBytes`. Unlike a manual rewrite it does not rewrite the object: no inter-region replication, retrieval or early deletion fees from the change itself, and time in the original class counts toward the new class's minimum storage duration (Nearline to Coldline after 20 days, deleted 60 days later: 10-day early deletion charge, versus a rewrite to Coldline after 20 days, which incurs a retrieval fee and a 10-day early deletion charge at the class change, and a 30-day early deletion charge when the object is deleted 60 days after the rewrite). With soft delete, storage charges increase and early deletion charges shrink by the retention period.
- Object creation time for multi-request uploads (such as resumable uploads) is upload completion; objects are not subject to lifecycle rules until completion. A `Custom-Time` set at the start of an upload can be much earlier than creation time.
- Expiration time metadata: with a `Delete` rule using `age` (plus optionally `matchesStorageClass`), objects can carry an expiration time, retrievable only through the XML API as the `x-goog-expiration` response header. It is unavailable when other conditions exist, the storage class does not match, the object has a hold, or soft delete is enabled. With a bucket retention policy the expiration is the later of the `age` time and the retention period; with conflicting rules the earliest applies.
- Tracking: Cloud Storage usage logs (`cs_user_agent` value `GCS Lifecycle Management`) or Pub/Sub notifications (does not record who acted).
- Destructive: `Delete` rules remove data. Test on a disposable bucket or a prefix subset first.
- The source also lists configuration samples in a separate page and points to a Cloud Storage basics skill for AI coding assistants.
- Cloud Storage is Google Cloud's object storage; it is distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`).
- Source: https://docs.cloud.google.com/storage/docs/lifecycle (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [object-versioning.md](./object-versioning.md)
- [soft-delete.md](./soft-delete.md)
- [bucket-lock.md](./bucket-lock.md)
- [object-holds.md](./object-holds.md)
