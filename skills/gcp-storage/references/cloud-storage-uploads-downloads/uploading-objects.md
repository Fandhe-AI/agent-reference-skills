---
source: https://docs.cloud.google.com/storage/docs/uploading-objects
---

# Upload objects from a file system

Upload objects from the local file system with `gcloud storage cp` / `rsync`, client libraries, or the JSON and XML APIs. For choosing an upload method by file size, see the object uploads overview (https://docs.cloud.google.com/storage/docs/uploads); for uploading from memory see https://docs.cloud.google.com/storage/docs/uploading-objects-from-memory.

## Signature / Usage

### Command line

```bash
gcloud storage cp OBJECT_LOCATION gs://DESTINATION_BUCKET_NAME
```

`OBJECT_LOCATION` is the local path (for example `Desktop/dog.png`). Use `--recursive` to upload directories. Fixed-key and custom object metadata can be set with `gcloud storage cp` command flags. A success response looks like `Completed files 1/1 | 164.3kiB/164.3kiB`.

### Upload a directory

```bash
gcloud storage rsync --recursive LOCAL_DIRECTORY gs://DESTINATION_BUCKET_NAME/FOLDER_NAME
```

`FOLDER_NAME` is optional. `cp --recursive` also uploads directories.

### Python

```python
from google.cloud import storage


def upload_blob(bucket_name, source_file_name, destination_blob_name):
    """Uploads a file to the bucket."""
    # The ID of your GCS bucket
    # bucket_name = "your-bucket-name"
    # The path to your file to upload
    # source_file_name = "local/path/to/file"
    # The ID of your GCS object
    # destination_blob_name = "storage-object-name"

    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(destination_blob_name)

    # Optional: set a generation-match precondition to avoid potential race conditions
    # and data corruptions. The request to upload is aborted if the object's
    # generation number does not match your precondition. For a destination
    # object that does not yet exist, set the if_generation_match precondition to 0.
    # If the destination object already exists in your bucket, set instead a
    # generation-match precondition using its generation number.
    generation_match_precondition = 0

    blob.upload_from_filename(source_file_name, if_generation_match=generation_match_precondition)

    print(
        f"File {source_file_name} uploaded to {destination_blob_name}."
    )
```

### Node.js

Adapted (not in the official docs): declared `generationMatchPrecondition` (0 = only create if the object does not exist), which the official sample uses without defining.

```javascript
/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// The ID of your GCS bucket
// const bucketName = 'your-unique-bucket-name';

// The path to your file to upload
// const filePath = 'path/to/your/file';

// The new ID for your GCS file
// const destFileName = 'your-new-file-name';

// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');

// Creates a client
const storage = new Storage();

async function uploadFile() {
  const generationMatchPrecondition = 0;
  const options = {
    destination: destFileName,
    // Optional:
    // Set a generation-match precondition to avoid potential race conditions
    // and data corruptions. The request to upload is aborted if the object's
    // generation number does not match your precondition. For a destination
    // object that does not yet exist, set the ifGenerationMatch precondition to 0
    // If the destination object already exists in your bucket, set instead a
    // generation-match precondition using its generation number.
    preconditionOpts: {ifGenerationMatch: generationMatchPrecondition},
  };

  await storage.bucket(bucketName).upload(filePath, options);
  console.log(`${filePath} uploaded to ${bucketName}`);
}

uploadFile().catch(console.error);
```

### JSON API media upload (single request, no object metadata)

```bash
curl -X POST --data-binary @OBJECT_LOCATION \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    -H "Content-Type: OBJECT_CONTENT_TYPE" \
    "https://storage.googleapis.com/upload/storage/v1/b/BUCKET_NAME/o?uploadType=media&name=OBJECT_NAME"
```

### JSON API multipart upload (single request, with metadata)

Create a `multipart/related` file:

```text
--separator_string
Content-Type: application/json; charset=UTF-8

{"name":"my-document.txt"}

--separator_string
Content-Type: text/plain

This is a text file.
--separator_string--
```

```bash
curl -X POST --data-binary @MULTIPART_FILE_LOCATION \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    -H "Content-Type: multipart/related; boundary=BOUNDARY_STRING" \
    -H "Content-Length: MULTIPART_FILE_SIZE" \
    "https://storage.googleapis.com/upload/storage/v1/b/BUCKET_NAME/o?uploadType=multipart"
```

### XML API

```bash
curl -X PUT --data-binary @OBJECT_LOCATION \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    -H "Content-Type: OBJECT_CONTENT_TYPE" \
    "https://storage.googleapis.com/BUCKET_NAME/OBJECT_NAME"
```

## Options / Props

### Required roles

Grant Storage Object User (`roles/storage.objectUser`) on the bucket. Required permissions:

| Permission | When required |
|---|---|
| `storage.objects.create` | Always |
| `storage.objects.delete` | Only for uploads that overwrite an existing object |
| `storage.objects.get` | Only when using the gcloud CLI |
| `storage.objects.list` | Only when using the gcloud CLI; also to verify uploads in the console |
| `storage.buckets.list` | Console use; not in Storage Object User, get it via Storage Admin (`roles/storage.admin`) on the project |

### Placeholders

| Name | Meaning |
|---|---|
| `OBJECT_CONTENT_TYPE` | Content type, for example `image/png` |
| `OBJECT_NAME` | URL-encoded object name; `pets/dog.png` is `pets%2Fdog.png` |
| `BOUNDARY_STRING` | Boundary you define, for example `separator_string` |
| `OBJECT_METADATA` | JSON metadata; at minimum a `name` attribute, for example `{"name": "myObject"}` |
| `MULTIPART_FILE_SIZE` | Total size in bytes of the multipart file |

## Notes

- A successful JSON multipart upload returns `200 OK` with the file's metadata.
- With the XML API, metadata can only be set when the object is written (uploading, copying, replacing), via request headers like `Content-Type`.
- To add or change metadata of an existing object, see viewing and editing object metadata.
- `if_generation_match=0` / `DoesNotExist` preconditions abort the upload if the object already exists; see request preconditions.
- The source also shows Console steps and C++, C#, Go, Java, PHP, Ruby, Rust and Terraform samples, and multi-file concurrent uploads with Transfer Manager (Java, Node.js, Python).
- Upload types (single-request, resumable, XML multipart, parallel composite) and their limits: https://docs.cloud.google.com/storage/docs/uploads-downloads and https://docs.cloud.google.com/storage/quotas.
- Cloud Storage is Google Cloud's object storage; it is distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`).
- Corrected from the official docs: the Node.js sample referenced `generationMatchPrecondition` in `preconditionOpts: {ifGenerationMatch: generationMatchPrecondition}` without declaring it (ReferenceError); it is now declared as `0`, as in the Python sample.
- The source suggests Storage Admin (`roles/storage.admin`) for console use; that role grants full control of the bucket (granted on the project: of every bucket in the project, including IAM policy changes and bucket deletion). A narrower role that contains `storage.buckets.list`, such as Storage Bucket Viewer (`roles/storage.bucketViewer`, Beta; `storage.buckets.get` and `storage.buckets.list` only) granted on the project, is enough for listing buckets in the console.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/storage (IAM roles reference for Cloud Storage; retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/storage/docs/uploading-objects (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [downloading-objects.md](./downloading-objects.md)
