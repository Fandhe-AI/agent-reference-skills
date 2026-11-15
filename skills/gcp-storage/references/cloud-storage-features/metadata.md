---
source: https://docs.cloud.google.com/storage/docs/metadata
---

# Object metadata

Object metadata identifies an object's properties and controls its behavior: editable fixed-key and custom metadata, non-editable fields (generation, metageneration, checksums), and timestamps across command line, JSON, XML and RPC APIs.

## Signature / Usage

### Editable vs non-editable

- Metadata is stored as key-value pairs (for example `storageClass:STANDARD`).
- Editable at any time: fixed-key metadata such as `Cache-Control`, and custom metadata.
- Settable only at object creation or rewrite: for example `storageClass`, customer-managed encryption keys.
- View only: for example `generation`, creation time.
- Avoid non-ASCII characters when editing metadata; they are not permitted in HTTP headers used by the XML API.

### Cache-Control

If an object has no `Cache-Control` entry, the default is:

| Condition | Default |
|---|---|
| Not CMEK-encrypted and not in a VPC Service Controls perimeter | `public, max-age=3600` |
| Encrypted with a customer-managed encryption key | `no-cache, no-store, max-age=0` |
| Stored within a VPC service perimeter | `private, max-age=0` |
| In a VPC service perimeter and CMEK-encrypted | `no-cache, no-store, max-age=0, must-revalidate` |

- To prevent serving cached versions of publicly readable objects, set `Cache-Control: no-store`.
- To serve an object as stored without transformations (such as removing gzip content-encoding), set `Cache-Control:no-transform`.

### Generation and metageneration

| Property | Description |
|---|---|
| `generation` (or `version ID` in the S3-compatible API) | Identifies the object version; exists for every object regardless of Object Versioning. Unique per version; might not increase for future versions; unrelated objects' numbers are unrelated. |
| `metageneration` | Metadata version; begins at `1` for each new `generation` and increases on every metadata update of that generation. Meaningful only together with `generation`. |

Both are used for request preconditions and for listing/accessing/restoring/deleting noncurrent versions.

### Reference snippet

Snippet taken from https://docs.cloud.google.com/storage/docs/request-preconditions (generation precondition on an upload):

```bash
gcloud storage cp OBJECT_LOCATION gs://DESTINATION_BUCKET_NAME --if-generation-match=GENERATION
```

## Options / Props

### Fixed-key editable metadata

Access control metadata (IAM / ACLs), `Cache-Control`, `Content-Disposition`, `Content-Encoding`, `Content-Language` (values up to 100 characters; ISO 639-1 codes), `Content-Type`, `Custom-Time`, object contexts, object holds, retention configuration.

- `Content-Type` defaults to `application/octet-stream` or `application/x-www-form-urlencoded` (depending on how uploaded) if not specified and undeterminable. `gcloud storage` may set it from the file extension; an explicit value overrides.
- `Content-Encoding`: verify files are really compressed with the stated encoding before upload. Do not gzip already-compressed content.
- `Custom-Time`: RFC 3339 `YYYY-MM-DD'T'HH:MM:SS.SS'Z'` (or without fraction when milliseconds are zero); used with the `DaysSinceCustomTime` lifecycle condition. Cannot be removed once set and cannot decrease; rewrite the object to effectively remove or reset it.
- Object contexts: user-defined key-value pairs; modifying them updates the object's metageneration and ETag.
- Custom metadata: you define both key and value; after creation you can delete the key or change the value. It has a size limit and incurs storage costs. In the XML API (and in the final request of a JSON API resumable upload) it is sent as headers prefixed with `x-goog-meta-`.
- Bulk updates of fixed-key/custom metadata and retention for millions or billions of objects: Storage batch operations.

### Checksums and ETags

| Item | Rule |
|---|---|
| CRC32C | All objects have one; Base64-encoded, big-endian. Differs from the CRC popularly known as CRC32. |
| MD5 | Present only if the object is not a composite object and was not uploaded via XML API multipart upload. A `Content-MD5` request header makes Cloud Storage validate the upload; mismatch rejects the request. |
| ETag | All objects have one; may differ between XML and JSON APIs. Assume only that it changes when data or metadata changes. It equals the MD5 only if: XML API request, Google-owned and Google-managed encryption keys only, and not a composite / XML multipart object. |

### Timestamps

| Command line | JSON API | XML API | RPC API | Meaning |
|---|---|---|---|---|
| `creation_time` | `timeCreated` | `Created` | `create_time` | Creation time; does not change |
| `update_time` | `updated` | `LastModified` | `update_time` | Last metadata modification (including changes made by Cloud Storage, e.g. lifecycle storage-class change) |
| `noncurrent_time` | `timeDeleted` | `DeletedTime` | `delete_time` | Deletion time; only for noncurrent versions |
| `soft_delete_time` | `softDeleteTime` | — | `soft_delete_time` | Time of soft delete; only in buckets with a soft delete policy |
| `hard_delete_time` | `hardDeleteTime` | — | `hard_delete_time` | Soft delete time plus retention duration; permanent once set, does not change when the duration changes |
| `retention_settings.retainUntilTime` | `retention.retainUntilTime` | `x-goog-object-lock-retain-until-date` | `retention.retain_until_time` | Earliest time the object can be deleted or replaced; independent of bucket retention policy; maximum 3,155,760,000 seconds (100 years) from now |
| `retention_expiration` | `retentionExpirationTime` | — | `retention_expire_time` | Earliest deletion time; depends on object retention configuration and bucket retention policy |
| `storage_class_update_time` | `timeStorageClassUpdated` | — | `update_storage_class_time` | Last storage class change (creation time initially) |
| `finalize_time` | `timeFinalized` | `Finalized` | `finalize_time` | Finalization time |
| `contexts.KEY.createTime` / `updateTime` | `contexts.custom.KEY.createTime` / `updateTime` | — | `contexts.custom.KEY.createTime` / `updateTime` | When a context key was first added / last updated |
| `custom_time` | `customTime` | `x-goog-custom-time` | `custom_time` | User-specified timestamp; cannot be removed or moved earlier |

## Notes

- `Cache-Control` is also an HTTP request header, but Cloud Storage ignores it and sets response `Cache-Control` based on stored metadata.
- If you allow caching, clients can keep receiving older versions; there is no way to force a cached object to expire globally, so revoking public access does not immediately stop cached serving. For more control, configure Cloud CDN in front of the bucket.
- Cloud Storage is Google Cloud's object storage; it is distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`).
- Source: https://docs.cloud.google.com/storage/docs/metadata (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source (snippet): https://docs.cloud.google.com/storage/docs/request-preconditions

## Related

- [request-preconditions.md](./request-preconditions.md)
- [consistency.md](./consistency.md)
