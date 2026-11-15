---
source: https://docs.cloud.google.com/storage-transfer/docs/metadata-preservation
---

# Metadata preservation

Which object and file metadata Storage Transfer Service preserves between sources and destinations. Metadata not explicitly mentioned is not preserved.

## Signature / Usage

Preserve optional POSIX metadata (UID, GID, MODE, symlinks) through `metadataOptions` in the job body. Defaults: `gid` `GID_SKIP`, `uid` `UID_SKIP`, `mode` `MODE_SKIP`, `symlink` `SYMLINK_SKIP`.

The block below is a fragment, not a complete request body: `...` stands for the rest of the `transferSpec` (data source, sink, agent pools).

Adapted (not in the official docs): added the missing comma after `projectId` and moved the `#` default comments out of the block (they are listed above the fence); the `...` placeholder is kept, so the block is labelled `text`.

```text
{
  "description": "metadata-example",
  "projectId": "example-project-id",
  "transferSpec": {
    ...
    "transferOptions": {
      "metadataOptions": {
        "gid":     "GID_NUMBER",
        "uid":     "UID_NUMBER",
        "mode":    "MODE_PRESERVE",
        "symlink": "SYMLINK_PRESERVE"
      }
    }
  }
}
```

## Options / Props

| Source to Cloud Storage | Preserved | Not preserved |
|---|---|---|
| Amazon S3 / S3-compatible | Fixed-key metadata (`Cache-Control`, `Content-Disposition`, `Content-Type`); user-defined metadata as custom metadata; `ETag` as custom `x-goog-source-etag`; size | ACLs, object tags, other system metadata, timestamps (`timeCreated`/`updated` reflect Cloud Storage times) |
| Azure Storage | Fixed-key metadata; user-defined metadata as custom; `ETag` as `x-goog-source-etag`; size | ADLS Gen2 POSIX permissions, `x-ms-blob-public-access`, index tags, timestamp metadata |
| Cloud Storage bucket | Fixed-key; custom metadata; size; generation as `x-goog-reserved-source-generation`; temporary holds (skip with `temporaryHold` = `TEMPORARY_HOLD_SKIP`); optional ACLs, storage class, CMEK, `timeCreated` (stored in `customTime`) | Event-based holds, `updated`, `etag`, `componentCount` |
| URL list | Fixed-key metadata (editable); `Content-Length` and `MD5` (non-editable; no `MD5` if source gives none) | Timestamps, other non-editable metadata |
| POSIX file system | `mtime` as `goog-reserved-file-mtime`; size; optional numeric UID, GID, MODE, symlinks (default: none) | `mtime` for folders |

Storage class at destination: default is the destination bucket's class; a specific class can be set on all objects; bucket-to-bucket can also preserve the source class.

POSIX to Cloud Storage key names: `goog-reserved-posix-gid`, `goog-reserved-posix-uid`, `goog-reserved-posix-mode`; symlinks become objects with `goog-reserved-file-is-symlink:true` whose content is the link target (target not validated or copied).

## Notes

- Cloud Storage to POSIX: preserved metadata is written back; symlinks are recreated (broken if the target is missing). Cloud Storage source objects with preserved CMEK need the destination bucket in the same location as the key, and for another project the destination project's Cloud Storage service account added to the key.
- POSIX to POSIX preserves UID/GID/MODE for files and folders (empty folders recreated); folder metadata is saved as 0-byte folder objects in the intermediate bucket, so object counts there can exceed the file count. Folder metadata is not preserved for manifest transfers.
- When preserving ACLs avoid creating inaccessible objects (https://docs.cloud.google.com/storage/docs/access-control#best-practices).
- Adapted from the official docs: the source example had `"projectId": "example-project-id"` without a trailing comma and `# Default is ...` comments inside the JSON; `...` stands for the rest of the `transferSpec`, so the block is shown as a `text` fragment rather than valid JSON.
- Source: https://docs.cloud.google.com/storage-transfer/docs/metadata-preservation (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-transfers.md](./create-transfers.md)
- [known-limitations-transfer.md](./known-limitations-transfer.md)
