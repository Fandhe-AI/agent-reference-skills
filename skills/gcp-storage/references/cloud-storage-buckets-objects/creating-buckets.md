---
source: https://docs.cloud.google.com/storage/docs/creating-buckets
---

# Create buckets

Create a Cloud Storage bucket with the console, gcloud CLI, client libraries, Terraform or the JSON / XML APIs. Unless specified, a bucket is created in the `US` multi-region with Standard default storage class and a seven-day soft delete retention duration.

## Signature / Usage

### Command line

```bash
gcloud storage buckets create gs://BUCKET_NAME --location=BUCKET_LOCATION
```

Success prints `Creating gs://BUCKET_NAME/...`. For a configurable dual-region set `--location` to the location code and use `--placement` with a valid region pair, for example `--location=ASIA --placement=ASIA-EAST1,ASIA-SOUTHEAST1`.

Adapted (not in the official docs): the original example breaks the command across two lines without a `\` continuation, which runs the second line as a separate command; joined with `\` so it works as one command.

```bash
gcloud storage buckets create gs://BUCKET_NAME --project=PROJECT_ID --default-storage-class=STORAGE_CLASS --location=BUCKET_LOCATION --uniform-bucket-level-access \
--soft-delete-duration=RETENTION_DURATION --encryption-enforcement-file=ENCRYPTION_ENFORCEMENT_FILE
```

### Python

```python
from google.cloud import storage


def create_bucket_class_location(bucket_name):
    """
    Create a new bucket in the US region with the coldline storage
    class
    """
    # bucket_name = "your-new-bucket-name"

    storage_client = storage.Client()

    bucket = storage_client.bucket(bucket_name)
    bucket.storage_class = "COLDLINE"
    new_bucket = storage_client.create_bucket(bucket, location="us")

    print(
        "Created bucket {} in {} with storage class {}".format(
            new_bucket.name, new_bucket.location, new_bucket.storage_class
        )
    )
    return new_bucket
```

### Node.js

Adapted (not in the official docs): the comment's plain `http://g.co/cloud/storage/docs/locations#location-mr` link is replaced with the HTTPS documentation URL.

```javascript
/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// The ID of your GCS bucket
// const bucketName = 'your-unique-bucket-name';

// The name of a storage class
// See the StorageClass documentation for other valid storage classes:
// https://googleapis.dev/java/google-cloud-clients/latest/com/google/cloud/storage/StorageClass.html
// const storageClass = 'coldline';

// The name of a location
// See this documentation for other valid locations:
// https://docs.cloud.google.com/storage/docs/locations#location-mr
// const location = 'ASIA';

// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');

// Creates a client
// The bucket in the sample below will be created in the project associated with this client.
// For more information, please see https://cloud.google.com/docs/authentication/production or https://googleapis.dev/nodejs/storage/latest/Storage.html
const storage = new Storage();

async function createBucketWithStorageClassAndLocation() {
  // For default values see: https://cloud.google.com/storage/docs/locations and
  // https://cloud.google.com/storage/docs/storage-classes
  const [bucket] = await storage.createBucket(bucketName, {
    location,
    [storageClass]: true,
  });

  console.log(
    `${bucket.name} created with ${storageClass} class in ${location}`
  );
}

createBucketWithStorageClassAndLocation().catch(console.error);
```

### JSON API

Create a JSON file with the bucket settings (must include `name`).

Adapted (not in the official docs): removed the trailing comma after the `uniformBucketLevelAccess` object, which makes the original body invalid JSON.

```json
{
  "name": "BUCKET_NAME",
  "location": "BUCKET_LOCATION",
  "storageClass": "STORAGE_CLASS",
  "iamConfiguration": {
    "uniformBucketLevelAccess": {
      "enabled": true
    }
  }
}
```

```bash
curl -X POST --data-binary @JSON_FILE_NAME \
 -H "Authorization: Bearer $(gcloud auth print-access-token)" \
 -H "Content-Type: application/json" \
 "https://storage.googleapis.com/storage/v1/b?project=PROJECT_IDENTIFIER"
```

### XML API

```xml
<CreateBucketConfiguration>
  <StorageClass>STORAGE_CLASS</StorageClass>
  <LocationConstraint>BUCKET_LOCATION</LocationConstraint>
</CreateBucketConfiguration>
```

```bash
curl -X PUT --data-binary @XML_FILE_NAME \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -H "x-goog-project-id: PROJECT_ID" \
  "https://storage.googleapis.com/BUCKET_NAME"
```

A successful XML request returns no response.

## Options / Props

### gcloud flags

| Flag | Description |
|---|---|
| `--location` | Bucket location, for example `US`; for a configurable dual-region the location code |
| `--placement` | Region pair for a configurable dual-region |
| `--project` | Project ID or number the bucket is associated with, for example `my-project` |
| `--default-storage-class` | Default storage class, for example `STANDARD` |
| `--uniform-bucket-level-access` | Enable uniform bucket-level access |
| `--soft-delete-duration` | Soft delete retention duration, for example `10d` |
| `--encryption-enforcement-file` | File defining which encryption methods are restricted or allowed for new objects |

### Required roles and permissions

Grant Storage Admin (`roles/storage.admin`) on the project.

| Permission | When |
|---|---|
| `storage.buckets.create` | Always |
| `storage.buckets.enableObjectRetention` | Only when enabling object retention configurations |
| `storage.buckets.list` | Console only |
| `resourcemanager.projects.get` | Console only |

Cross-bucket replication needs additional roles and permissions.

### REST placeholders

| Name | Meaning |
|---|---|
| `BUCKET_LOCATION` | Location, for example `US`; for a configurable dual-region, the location code plus `customPlacementConfig` (JSON) or `<CustomPlacementConfig>` (XML) |
| `STORAGE_CLASS` | Default storage class, for example `STANDARD` |
| `PROJECT_IDENTIFIER` | Project ID or number (JSON API) |

## Notes

- The bucket name is non-editable metadata; it must be given at creation. For a zonal bucket with the Rapid storage class see https://docs.cloud.google.com/storage/docs/rapid/create-zonal-buckets.
- In the console only a globally unique name is required; hierarchical namespace can only be enabled at creation; uniform access control is recommended; to avoid being locked out when setting IP filtering include your own IP address; to disable soft delete clear the Soft delete policy checkbox (for short-lived temporary data only).
- The source also shows Console steps, C++, C#, Go, Java, PHP, Ruby and Rust samples, and a Terraform `google_storage_bucket` resource.
- Corrected from the official docs: the gcloud example had `--uniform-bucket-level-access` followed by a bare line break before `--soft-delete-duration=RETENTION_DURATION`, which the shell runs as a separate command; a `\` continuation was added.
- Corrected from the official docs: the JSON body had `"enabled": true }, }` with a trailing comma after the `uniformBucketLevelAccess` object, which is invalid JSON; the comma was removed.
- Upload and download concepts: https://docs.cloud.google.com/storage/docs/uploads-downloads.
- Cloud Storage is Google Cloud's object storage; it is distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`).
- Adapted from the official docs: the Node.js sample comment `// http://g.co/cloud/storage/docs/locations#location-mr` now reads `// https://docs.cloud.google.com/storage/docs/locations#location-mr`.
- Source: https://docs.cloud.google.com/storage/docs/creating-buckets (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [bucket-metadata.md](./bucket-metadata.md)
- [hns-overview.md](./hns-overview.md)
- [uploads-downloads.md](./uploads-downloads.md)
