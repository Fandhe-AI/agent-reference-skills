---
source: https://docs.cloud.google.com/storage/docs/deleting-objects
---

# Delete objects

Delete a single object, groups of objects by prefix, or up to billions of objects with storage batch operations. Deletion is destructive; try these commands on a disposable bucket first.

## Signature / Usage

### Delete a single object

```bash
gcloud storage rm gs://BUCKET_NAME/OBJECT_NAME
```

### Delete objects with a common prefix (destructive)

```bash
gcloud storage rm --recursive gs://BUCKET_NAME/PREFIX
```

`PREFIX` is the common prefix, for example `pets/`.

### Python

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

### REST

```bash
curl -X DELETE \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://storage.googleapis.com/storage/v1/b/BUCKET_NAME/o/OBJECT_NAME"
```

The XML API form is the same call to `https://storage.googleapis.com/BUCKET_NAME/OBJECT_NAME`. In these request URLs `OBJECT_NAME` is URL-encoded: `pets/dog.png` becomes `pets%2Fdog.png`.

### XML API multi-object delete (up to 1,000 objects)

```xml
<Delete>
    <Object>
      <Key>OBJECT_NAME</Key>
      <VersionId>VERSION_ID</VersionId>
    </Object>
    ...
    <Quiet>QUIET_RESPONSE_BOOLEAN</Quiet>
  </Delete>
```

```bash
curl -X POST --data-binary @XML_FILE_NAME \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://storage.googleapis.com/BUCKET_NAME?delete"
```

## Options / Props

### Required roles

| Task | Role |
|---|---|
| Delete with gcloud CLI or REST APIs | Storage Object User (`roles/storage.objectUser`) on the bucket |
| Delete with the console | Storage Admin (`roles/storage.admin`) on the bucket, or Viewer (`roles/viewer`) plus Storage Object User |

| Permission | When |
|---|---|
| `storage.objects.delete` | Always |
| `storage.objects.list` | Console, or gcloud `--recursive` / wildcards |
| `storage.buckets.list` | Console |

### Multi-object delete fields

| Field | Description |
|---|---|
| `OBJECT_NAME` | Object name in the `<Key>` element of the XML body, as stored (for example `pets/dog.png`), not URL-encoded; escape XML special characters such as `&` and `<` as entities. Up to 1,000 objects per request |
| `VERSION_ID` | Version ID of the object, for example `11111` |
| `Quiet` | `False` gives a verbose response with every object's result; `True` lists only failures (an empty `<DeleteResult/>` if all succeed) |

## Notes

- Keep soft delete enabled unless the bucket holds only short-lived data; with soft delete disabled deleted objects cannot be recovered.
- Deleting Nearline, Coldline or Archive data can incur early deletion charges. With Object Versioning enabled, the original object stays until deleted explicitly by generation number.
- Source inconsistency: the source describes the `<Key>` value as "the URL-encoded name of the object. For example, `pets/dog.png`, URL-encoded as `pets%2Fdog.png`", but its own example responses show unencoded keys (`<Key>images/photo1.jpg</Key>`). `<Key>` carries the object name itself, so a URL-encoded key such as `pets%2Fdog.png` names a different object; the table above follows the examples. URL encoding applies to object names in request URL paths (the JSON and XML single-object calls), not to the XML body.
- The XML multi-object delete is not atomic; partial failures are possible, so use the verbose response (Data Access audit logs also show failure details).
- Avoid `gcloud storage` for bulk deletes of a hundred thousand or more objects (very slow). The console can bulk delete up to several million objects in the background. For millions or billions of objects use storage batch operations (manifest file or prefixes); to delete by age or class use Object Lifecycle Management; JSON API batch requests group up to 100 calls per HTTP request.
- Amazon S3 tools: `aws s3api delete-objects` with `--endpoint-url` set to `storage.googleapis.com`, or S3-compatible libraries (for example Boto3) with `endpoint_url='https://storage.googleapis.com'` and HMAC credentials, call the multi-object delete XML API.
- The source also shows Console steps, C++, C#, Go, Java, PHP, Ruby, Rust and Node.js samples, and a Boto3 client initialization sample.
- Cloud Storage is Google Cloud's object storage; it is distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`).
- Source: https://docs.cloud.google.com/storage/docs/deleting-objects (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [uploads-downloads.md](./uploads-downloads.md)
- [managed-folders.md](./managed-folders.md)
