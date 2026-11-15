---
source: https://docs.cloud.google.com/storage/docs/uploads-downloads
---

# Upload Large Files and Directories with gcloud

Upload files and directories with `gcloud storage cp` and `rsync`, which use resumable uploads automatically, and resume an interrupted transfer by re-running the command.

## Signature / Usage

### Upload a file

```bash
gcloud storage cp OBJECT_LOCATION gs://DESTINATION_BUCKET_NAME
```

### Upload a directory

`FOLDER_NAME` is optional.

```bash
gcloud storage rsync --recursive LOCAL_DIRECTORY gs://DESTINATION_BUCKET_NAME/FOLDER_NAME
```

### Resume an interrupted download

Re-run the same command; the gcloud CLI resumes automatically (except streaming downloads).

```bash
gcloud storage cp gs://BUCKET_NAME/OBJECT_NAME SAVE_TO_LOCATION
```

### Download a byte range (REST)

`OBJECT_NAME` must be URL-encoded (`pets/dog.png` becomes `pets%2Fdog.png`).

Adapted (not in the official docs): added --fail so an HTTP error is not saved as the downloaded file.

```bash
curl --fail -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -H "Range: bytes=FIRST_BYTE-LAST_BYTE" \
  -o "SAVE_TO_LOCATION" \
  "https://storage.googleapis.com/storage/v1/b/BUCKET_NAME/o/OBJECT_NAME?alt=media"
```

## Options / Props

| Item | Value |
|---|---|
| Maximum object size | 5 TiB |
| Resumable upload session | Must complete within 7 days of initiation; cost is one Class A operation |
| Chunk size (client libraries) | Multiple of 256 KiB |
| Compose request | Up to 32 source objects |
| Writes to the same object name | One per second |
| gcloud upload types | Single-request (resumable managed automatically), streaming, parallel composite |

## Notes

- Resuming multiple files: the source says to re-run the same `cp` / `rsync` command and add `--no-clobber` to skip files already completed.
- Do not use parallel composite uploads in a bucket with a retention policy; components cannot be deleted until each meets the minimum retention.
- A resumable session URI acts as an authentication token: anyone holding it can upload, so send it only over HTTPS.
- Sessions are pinned to the region where they were initiated; keep clients in the bucket's location.
- The gcloud CLI keeps partial downloads in the destination until completion and tracker files under `.config/gcloud/surface_data/storage/tracker_files`.
- Corrected from the official docs: the curl range example gained `--fail` so HTTP errors exit non-zero instead of writing the error body to `SAVE_TO_LOCATION`.
- Cloud Storage is Google Cloud's object storage; it is distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`).
- Source: https://docs.cloud.google.com/storage/docs/uploads-downloads (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage/docs/uploading-objects (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage/docs/downloading-objects (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage/docs/resumable-uploads (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage/quotas (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [upload-download-with-preconditions.md](./upload-download-with-preconditions.md)
- [delete-objects-safely.md](./delete-objects-safely.md)
- https://docs.cloud.google.com/storage/docs/resumable-uploads
