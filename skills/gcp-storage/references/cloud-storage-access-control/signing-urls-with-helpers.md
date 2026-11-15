---
source: https://docs.cloud.google.com/storage/docs/access-control/signing-urls-with-helpers
---

# Create signed URLs with Cloud Storage tools (V4 signing)

Create V4 signed URLs that give time-limited read or write access with the Google Cloud CLI or client libraries, using service account credentials.

## Signature / Usage

### Before you begin

1. Enable the Service Account Credentials API (`iamcredentials.googleapis.com`; requires `serviceusage.services.enable`, available through Owner `roles/owner` or Service Usage Admin `roles/serviceusage.serviceUsageAdmin`).
2. Create a service account (skip if you already have one).
3. Give the service account permission to perform the request the signed URL will make. Ask your administrator to grant one of the following, on the bucket (or managed folder) the URLs are for rather than the project (see Notes):
   - Storage Object User (`roles/storage.objectUser`): signed URLs for both upload and download; also required if the URL could overwrite an existing object.
   - Storage Object Viewer (`roles/storage.objectViewer`): download only.
   - Storage Object Creator (`roles/storage.objectCreator`): upload only, without overwriting existing objects.
4. Have permission to sign blobs with the service account: Service Account Token Creator (`roles/iam.serviceAccountTokenCreator`), containing `iam.serviceAccounts.signBlob`. With user credentials, you are the principal and the role is granted on the service account. With a service account attached to a compute instance, the service account is the principal (to impersonate itself) and the role is granted on that service account's own IAM policy, not on the project (see Notes).

### Download an object (command line)

```bash
gcloud storage sign-url gs://BUCKET_NAME/OBJECT_NAME --impersonate-service-account=SERVICE_ACCOUNT_EMAIL --duration=10m
```

`SERVICE_ACCOUNT_EMAIL` is the service account whose key does the signing (for example `signed-url-account@my-project.iam.gserviceaccount.com`). Successful output includes `expiration`, `http_verb: GET`, `resource` and `signed_url`.

### Download an object (Node.js)

```javascript
/**
 * TODO(developer): Uncomment the following lines before running the sample.
 * Note: when creating a signed URL, unless running in a GCP environment,
 * a service account must be used for authorization.
 */
// The ID of your GCS bucket
// const bucketName = 'your-unique-bucket-name';

// The full path of your file inside the GCS bucket, e.g. 'yourFile.jpg' or 'folder1/folder2/yourFile.jpg'
// const fileName = 'your-file-name';

// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');

// Creates a client
const storage = new Storage();

async function generateV4ReadSignedUrl() {
  // These options will allow temporary read access to the file
  const options = {
    version: 'v4',
    action: 'read',
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
  };

  // Get a v4 signed URL for reading the file
  const [url] = await storage
    .bucket(bucketName)
    .file(fileName)
    .getSignedUrl(options);

  console.log('Generated GET signed URL:');
  console.log(url);
  console.log('You can use this URL with any user agent, for example:');
  console.log(`curl '${url}'`);
}

generateV4ReadSignedUrl().catch(console.error);
```

### Download an object (Python)

```python
import datetime

from google.cloud import storage


def generate_download_signed_url_v4(bucket_name, blob_name):
    """Generates a v4 signed URL for downloading a blob.

    Note that this method requires a service account key file.
    """
    # bucket_name = 'your-bucket-name'
    # blob_name = 'your-object-name'

    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(blob_name)

    url = blob.generate_signed_url(
        version="v4",
        # This URL is valid for 15 minutes
        expiration=datetime.timedelta(minutes=15),
        # Allow GET requests using this URL.
        method="GET",
    )

    print("Generated GET signed URL:")
    print(url)
    print("You can use this URL with any user agent, for example:")
    print(f"curl '{url}'")
    return url

```

### Upload an object (command line)

```bash
gcloud storage sign-url gs://BUCKET_NAME/OBJECT_NAME --impersonate-service-account=SERVICE_ACCOUNT_EMAIL --http-verb=PUT --duration=1h --headers=content-type=CONTENT_TYPE
```

`CONTENT_TYPE` is the uploaded object's content type (for example `image/png`). The output's `x-goog-signedheaders` is `content-type;host` (URL-encoded), so the upload request must send that `Content-Type`.

### Upload an object (Node.js)

```javascript
/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// The ID of your GCS bucket
// const bucketName = 'your-unique-bucket-name';

// The full path of your file inside the GCS bucket, e.g. 'yourFile.jpg' or 'folder1/folder2/yourFile.jpg'
// const fileName = 'your-file-name';

// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');

// Creates a client
const storage = new Storage();

async function generateV4UploadSignedUrl() {
  // These options will allow temporary uploading of the file with outgoing
  // Content-Type: application/octet-stream header.
  const options = {
    version: 'v4',
    action: 'write',
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    contentType: 'application/octet-stream',
  };

  // Get a v4 signed URL for uploading file
  const [url] = await storage
    .bucket(bucketName)
    .file(fileName)
    .getSignedUrl(options);

  console.log('Generated PUT signed URL:');
  console.log(url);
  console.log('You can use this URL with any user agent, for example:');
  console.log(
    "curl -X PUT -H 'Content-Type: application/octet-stream' " +
      `--upload-file my-file '${url}'`
  );
}

generateV4UploadSignedUrl().catch(console.error);
```

### Upload an object (Python)

```python
import datetime

from google.cloud import storage


def generate_upload_signed_url_v4(bucket_name, blob_name):
    """Generates a v4 signed URL for uploading a blob using HTTP PUT.

    Note that this method requires a service account key file.
    """
    # bucket_name = 'your-bucket-name'
    # blob_name = 'your-object-name'

    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(blob_name)

    url = blob.generate_signed_url(
        version="v4",
        # This URL is valid for 15 minutes
        expiration=datetime.timedelta(minutes=15),
        # Allow PUT requests using this URL.
        method="PUT",
        content_type="application/octet-stream",
    )

    print("Generated PUT signed URL:")
    print(url)
    print("You can use this URL with any user agent, for example:")
    print(
        "curl -X PUT -H 'Content-Type: application/octet-stream' "
        "--upload-file my-file '{}'".format(url)
    )
    return url

```

## Options / Props

| Item | Value |
|---|---|
| API to enable | Service Account Credentials API (`iamcredentials.googleapis.com`) |
| Signer permission | `iam.serviceAccounts.signBlob` (role: Service Account Token Creator, `roles/iam.serviceAccountTokenCreator`) |
| Download permission | `storage.objects.get` (not needed for upload-only) |
| Upload permission | `storage.objects.create` (not needed for download-only) |
| Overwrite permission | `storage.objects.delete` (not needed if uploads never overwrite) |
| `gcloud storage sign-url` flags used | `--impersonate-service-account`, `--duration` (for example `10m`, `1h`), `--http-verb=PUT`, `--headers=content-type=CONTENT_TYPE` |
| Maximum expiration (V4) | 604800 seconds (7 days). `gcloud storage sign-url` with `--impersonate-service-account` (system-managed key): 12 hours; 7 days only with `--private-key-file` or an account authorized with `gcloud auth activate-service-account` (gcloud help) |
| Required headers | Any header in `X-Goog-SignedHeaders` (for example `content-type` and `host` for uploads) must be sent with the request |

## Notes

- Query parameters in a V4 signed URL are verified by the signature; a request that adds a query parameter not part of the signature fails. This allows parameters such as `response-content-disposition` to override object metadata for authenticated `GET` requests.
- Limitation: HMAC credentials are not supported when using Cloud Storage tools to generate signed URLs.
- Anyone who holds the generated URL can use it until it expires, so it makes the resource accessible to every holder; share it only with intended recipients and keep durations short.
- `gcloud storage sign-url` caps `--duration` at 12 hours when it signs with a system-managed key (the `--impersonate-service-account` examples above), because that key may not remain valid longer; the 7-day V4 maximum applies only with `--private-key-file` or an account authorized with `gcloud auth activate-service-account` (gcloud `storage sign-url` help).
- The Python samples note that they require a service account key file; the Go sample comment lists a private key, an access ID with `iam.serviceAccounts.signBlob`, or a custom `SignBytes` function as signing options. Prefer impersonation or `signBlob` over downloaded keys where possible; credential setup is in `gcp-foundation` (ADC, service accounts).
- The source also shows C++, C#, Go, Java, PHP, Ruby and Rust samples for download and upload; they are omitted here.
- Cloud Storage is Google Cloud's object storage; it is distinct from Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`).
- Source inconsistency (corrected in step 4 above): for a service account attached to a compute instance the source says "this role should be granted on the project that contains the service account". A project-level grant of `roles/iam.serviceAccountTokenCreator` lets that service account sign as, and mint tokens for, every service account in the project, which contradicts least privilege; to impersonate itself it only needs the role on its own IAM policy.
- Least privilege (not stated by the source, which gives no grant level in step 3): grant the storage role on the bucket or managed folder the signed URLs are for. A project-level grant lets the signing service account mint URLs for every bucket in the project. All three roles can be granted down to the managed folder level (IAM role reference, https://docs.cloud.google.com/iam/docs/roles-permissions/storage).
- Least privilege: grant `roles/iam.serviceAccountTokenCreator` on the service account itself (`gcloud iam service-accounts add-iam-policy-binding SA_EMAIL --member=serviceAccount:SA_EMAIL --role=roles/iam.serviceAccountTokenCreator`) rather than on the project, which would allow impersonating every service account in it.
- Source: https://docs.cloud.google.com/storage/docs/access-control/signing-urls-with-helpers (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/storage/sign-url (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/storage (IAM roles reference for Cloud Storage; retrieved 2026-11-14)

## Related

- [signed-urls.md](./signed-urls.md)
- [access-control.md](./access-control.md)
