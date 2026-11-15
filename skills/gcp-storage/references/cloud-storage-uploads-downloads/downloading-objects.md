---
source: https://docs.cloud.google.com/storage/docs/downloading-objects
---

# Download objects

Download objects (or byte ranges of objects) from a bucket to persistent storage with `gcloud storage cp`, client libraries, or the JSON and XML APIs. To read objects interactively or into memory see https://docs.cloud.google.com/storage/docs/reading-objects.

## Signature / Usage

### Command line

```bash
gcloud storage cp gs://BUCKET_NAME/OBJECT_NAME SAVE_TO_LOCATION
```

If a download is interrupted, run the same `cp` command to resume it. Download a whole bucket or folder:

```bash
gcloud storage cp --recursive gs://BUCKET_NAME/FOLDER_NAME .
```

### Python

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

### Node.js

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

### REST (JSON API and XML API)

Adapted (not in the official docs): added --fail so an HTTP error is not saved as the downloaded file.

```bash
curl --fail -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -o "SAVE_TO_LOCATION" \
  "https://storage.googleapis.com/storage/v1/b/BUCKET_NAME/o/OBJECT_NAME?alt=media"
```

The XML API form uses the URL `https://storage.googleapis.com/BUCKET_NAME/OBJECT_NAME`.

### Download a portion of an object (Range header)

Adapted (not in the official docs): added --fail so an HTTP error is not saved as the downloaded file.

```bash
curl --fail -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -H "Range: bytes=FIRST_BYTE-LAST_BYTE" \
  -o "SAVE_TO_LOCATION" \
  "https://storage.googleapis.com/storage/v1/b/BUCKET_NAME/o/OBJECT_NAME?alt=media"
```

The XML API form uses `https://storage.googleapis.com/BUCKET_NAME/OBJECT_NAME`. Python byte-range sample: `blob.download_to_filename(destination_file_name, start=start_byte, end=end_byte)`; Node.js passes `start` and `end` in the `download()` options.

## Options / Props

### Required roles

| Role / permission | Detail |
|---|---|
| `roles/storage.objectViewer` | On the bucket; contains `storage.objects.get` |
| `roles/storage.admin` | On the bucket, instead of the above, when using the Google Cloud console |
| `storage.buckets.list` | Console only |
| `storage.objects.get` | Always |
| `storage.objects.list` | Console only |

### Placeholders

| Name | Meaning |
|---|---|
| `OBJECT_NAME` | URL-encoded in REST calls; `pets/dog.png` is `pets%2Fdog.png` |
| `SAVE_TO_LOCATION` | Local path to save to, for example `Desktop/dog.png` |
| `FIRST_BYTE` / `LAST_BYTE` | Byte range, for example `1000` and `1999` |

## Notes

- If you use customer-supplied encryption keys, see https://docs.cloud.google.com/storage/docs/encryption/using-customer-supplied-keys#download-decrypt.
- Checksums apply to an entire object; they cannot validate a portion of an object.
- The gcloud CLI automatically resumes interrupted downloads, except streaming downloads. A partially downloaded temporary file is visible in the destination until completion, then replaced. Temporary tracker files are stored by default under `.config/gcloud/surface_data/storage/tracker_files` in the home directory; view or change with `gcloud config get storage/tracker_files_directory`.
- If object transcoding occurs, the `Range` header is silently ignored and the entire object is served.
- The console does not support downloading portions of an object. Some client library languages download portions to a file, others write to `stdout` or memory.
- The source also shows Console steps, C++, C#, Go, Java, PHP, Ruby and Rust samples, and multi-object parallel downloads.
- Download types (simple, sliced, streaming) and per-tool support: https://docs.cloud.google.com/storage/docs/uploads-downloads.
- Cloud Storage is Google Cloud's object storage; it is distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`).
- Adapted from the official docs: the curl download examples (`curl -X GET ... -o "SAVE_TO_LOCATION"`) gained `--fail` so HTTP errors exit non-zero instead of writing the error body to `SAVE_TO_LOCATION`.
- The source suggests Storage Admin (`roles/storage.admin`) for console use; that role grants full control of the bucket (granted on the project: of every bucket in the project, including IAM policy changes and bucket deletion). A narrower role that contains `storage.buckets.list`, such as Storage Bucket Viewer (`roles/storage.bucketViewer`, Beta; `storage.buckets.get` and `storage.buckets.list` only) granted on the project, is enough for listing buckets in the console.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/storage (IAM roles reference for Cloud Storage; retrieved 2026-11-14)
- Source: https://docs.cloud.google.com/storage/docs/downloading-objects (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [uploading-objects.md](./uploading-objects.md)
