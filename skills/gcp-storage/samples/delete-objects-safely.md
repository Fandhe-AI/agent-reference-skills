---
source: https://docs.cloud.google.com/storage/docs/deleting-objects
---

# Delete Objects with a Generation Precondition

Delete a single object, delete by prefix, and delete from Python only if the object has not changed since you read it. Try these on a disposable bucket first.

## Signature / Usage

### Delete a single object

```bash
gcloud storage rm gs://BUCKET_NAME/OBJECT_NAME
```

### Delete objects with a common prefix (destructive)

`PREFIX` is the common prefix, for example `pets/`. This removes every matching object; try it on a disposable bucket first.

```bash
gcloud storage rm --recursive gs://BUCKET_NAME/PREFIX
```

### Python: delete only the generation you read

```python
from google.cloud import storage


def delete_blob(bucket_name, blob_name):
    """Deletes a blob from the bucket."""
    # bucket_name = "your-bucket-name"
    # blob_name = "your-object-name"

    storage_client = storage.Client()

    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(blob_name)
    generation_match_precondition = None

    # Optional: set a generation-match precondition to avoid potential race conditions
    # and data corruptions. The request to delete is aborted if the object's
    # generation number does not match your precondition.
    blob.reload()  # Fetch blob metadata to use in generation_match_precondition.
    generation_match_precondition = blob.generation

    blob.delete(if_generation_match=generation_match_precondition)

    print(f"Blob {blob_name} deleted.")
```

## Options / Props

| Item | Value |
|---|---|
| Role (gcloud / REST) | Storage Object User (`roles/storage.objectUser`) on the bucket |
| Permissions | `storage.objects.delete` always; `storage.objects.list` for `--recursive` or wildcards |
| XML multi-object delete | Up to 1,000 objects per request; not atomic |

## Notes

- Destructive: `gcloud storage rm --recursive` cannot be undone unless soft delete or Object Versioning keeps a copy. Use a disposable bucket first.
- Keep soft delete enabled unless the bucket holds only short-lived data; see the soft-delete sample.
- Deleting Nearline, Coldline or Archive data can incur early deletion charges.
- Avoid `gcloud storage` for bulk deletes of 100,000 or more objects; use storage batch operations or Object Lifecycle Management instead.
- The source also shows Console steps, REST and XML API calls, and C++, C#, Go, Java, PHP, Ruby, Rust and Node.js samples.
- Cloud Storage is Google Cloud's object storage; it is distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`).
- Source: https://docs.cloud.google.com/storage/docs/deleting-objects (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [soft-delete-policy.md](./soft-delete-policy.md)
- [upload-download-with-preconditions.md](./upload-download-with-preconditions.md)
- https://docs.cloud.google.com/storage/docs/deleting-objects
