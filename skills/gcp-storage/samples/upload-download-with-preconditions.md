---
source: https://docs.cloud.google.com/storage/docs/uploading-objects
---

# Upload and Download Objects with Python and Node.js (with Preconditions)

Upload a local file with a generation-match precondition so the write cannot silently overwrite or race, then download the object again.

## Signature / Usage

### gcloud

```bash
gcloud storage cp OBJECT_LOCATION gs://DESTINATION_BUCKET_NAME
```

```bash
gcloud storage cp gs://BUCKET_NAME/OBJECT_NAME SAVE_TO_LOCATION
```

Replace an existing object only if its generation still matches:

```bash
gcloud storage cp OBJECT_LOCATION gs://DESTINATION_BUCKET_NAME --if-generation-match=GENERATION
```

### Python upload (create only if the object does not exist)

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

### Node.js upload

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

### Python download

```python
from google.cloud import storage


def download_blob(bucket_name, source_blob_name, destination_file_name):
    """Downloads a blob from the bucket."""
    # The ID of your GCS bucket
    # bucket_name = "your-bucket-name"

    # The ID of your GCS object
    # source_blob_name = "storage-object-name"

    # The path to which the file should be downloaded
    # destination_file_name = "local/path/to/file"

    storage_client = storage.Client()

    bucket = storage_client.bucket(bucket_name)

    # Construct a client side representation of a blob.
    # Note `Bucket.blob` differs from `Bucket.get_blob` as it doesn't retrieve
    # any content from Google Cloud Storage. As we don't need additional data,
    # using `Bucket.blob` is preferred here.
    blob = bucket.blob(source_blob_name)
    blob.download_to_filename(destination_file_name)

    print(
        "Downloaded storage object {} from bucket {} to local file {}.".format(
            source_blob_name, bucket_name, destination_file_name
        )
    )
```

### Node.js download

```javascript
/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// The ID of your GCS bucket
// const bucketName = 'your-unique-bucket-name';

// The ID of your GCS file
// const fileName = 'your-file-name';

// The path to which the file should be downloaded
// const destFileName = '/local/path/to/file.txt';

// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');

// Creates a client
const storage = new Storage();

async function downloadFile() {
  const options = {
    destination: destFileName,
  };

  // Downloads the file
  await storage.bucket(bucketName).file(fileName).download(options);

  console.log(
    `gs://${bucketName}/${fileName} downloaded to ${destFileName}.`
  );
}

downloadFile().catch(console.error);
```

## Options / Props

| Precondition | Behavior |
|---|---|
| `ifGenerationMatch` / `if_generation_match` / `--if-generation-match` | Proceeds if the generation matches; else `412 Precondition Failed`. `0` means the object must not exist (or only noncurrent versions exist) |
| `ifGenerationNotMatch` | Proceeds if the generation does not match; else `304 Not Modified` |
| Required role (upload) | Storage Object User (`roles/storage.objectUser`) on the bucket |
| Required role (download) | Storage Object Viewer (`roles/storage.objectViewer`) on the bucket |

## Notes

- A plain upload to an existing name overwrites the object; use `0` for create-only writes or enable Object Versioning to keep earlier versions.
- A precondition often costs an extra metadata request; store generation numbers locally and use `0` for objects you know are new.
- Authentication for the client libraries uses Application Default Credentials; setup is in `gcp-foundation`. The language-neutral client library overview will be in the `gcp-client-libraries` skill (planned).
- Corrected from the official docs: the Node.js upload sample referenced `generationMatchPrecondition` without declaring it (ReferenceError); it is declared as `0`.
- The source also shows Console steps and C++, C#, Go, Java, PHP, Ruby, Rust samples.
- Cloud Storage is Google Cloud's object storage; it is distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`).
- Source: https://docs.cloud.google.com/storage/docs/uploading-objects (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage/docs/downloading-objects (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/storage/docs/request-preconditions (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-secure-bucket.md](./create-secure-bucket.md)
- [upload-large-files.md](./upload-large-files.md)
- [delete-objects-safely.md](./delete-objects-safely.md)
- https://docs.cloud.google.com/storage/docs/request-preconditions
