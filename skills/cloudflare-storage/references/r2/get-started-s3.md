---
source: https://developers.cloudflare.com/r2/get-started/s3/
---

# Get started: S3

R2 supports an S3-compatible API, so any S3 SDK, library, or tool works against your buckets by changing the endpoint URL.

## Signature / Usage

```txt
https://<ACCOUNT_ID>.r2.cloudflarestorage.com
```

```python
import boto3

s3 = boto3.client(
    service_name='s3',
    # Provide your R2 endpoint: https://<ACCOUNT_ID>.r2.cloudflarestorage.com
    endpoint_url='https://<ACCOUNT_ID>.r2.cloudflarestorage.com',
    # Provide your R2 Access Key ID and Secret Access Key
    aws_access_key_id='<ACCESS_KEY_ID>',
    aws_secret_access_key='<SECRET_ACCESS_KEY>',
    region_name='auto',  # Required by boto3, not used by R2
)

# Upload a file
s3.upload_file('myfile.txt', 'my-bucket', 'myfile.txt')
print('Uploaded myfile.txt')

# Download a file
s3.download_file('my-bucket', 'myfile.txt', 'downloaded.txt')
print('Downloaded to downloaded.txt')

# List objects
response = s3.list_objects_v2(Bucket='my-bucket')
for obj in response.get('Contents', []):
    print(f"Object: {obj['Key']}")
```

Adapted (not in the official docs): `list.Contents` is guarded with `?? []` because ListObjectsV2 omits `Contents` for an empty bucket; see Notes.

```js
import {
	S3Client,
	PutObjectCommand,
	GetObjectCommand,
	ListObjectsV2Command,
} from "@aws-sdk/client-s3";

const s3 = new S3Client({
	region: "auto", // Required by AWS SDK, not used by R2
	// Provide your R2 endpoint: https://<ACCOUNT_ID>.r2.cloudflarestorage.com
	endpoint: "https://<ACCOUNT_ID>.r2.cloudflarestorage.com",
	credentials: {
		// Provide your R2 Access Key ID and Secret Access Key
		accessKeyId: "<ACCESS_KEY_ID>",
		secretAccessKey: "<SECRET_ACCESS_KEY>",
	},
});

// Upload a file
await s3.send(
	new PutObjectCommand({
		Bucket: "my-bucket",
		Key: "myfile.txt",
		Body: "Hello, R2!",
	}),
);
console.log("Uploaded myfile.txt");

// Download a file
const response = await s3.send(
	new GetObjectCommand({
		Bucket: "my-bucket",
		Key: "myfile.txt",
	}),
);
const content = await response.Body.transformToString();
console.log("Downloaded:", content);

// List objects
const list = await s3.send(
	new ListObjectsV2Command({
		Bucket: "my-bucket",
	}),
);
console.log(
	"Objects:",
	(list.Contents ?? []).map((obj) => obj.Key),
);
```

## Notes

- Adapted from the official docs: the JavaScript example calls `list.Contents.map(...)` directly, but `ListObjectsV2` omits `Contents` when the bucket is empty, which would throw a `TypeError`. The example uses `(list.Contents ?? []).map(...)`, matching the Python example's `response.get('Contents', [])`.
- Create a bucket first: `npx wrangler login`, `npx wrangler r2 bucket create my-bucket`, `npx wrangler r2 bucket list`.
- Credentials: dashboard **Storage & databases > R2 > Overview > Manage in API Tokens > Create Account API token** (or **Create User API token**), choose **Object Read & Write** and **Apply to specific buckets only**. Copy the Access Key ID and Secret Access Key; the secret cannot be viewed again.
- The S3 API endpoint URL is shown at the bottom of the Create API Token confirmation page, or on the R2 Overview page.
- Install: `pip install boto3` (Python) or `npm install @aws-sdk/client-s3` (JavaScript).
- R2 is Cloudflare's S3-compatible object storage; for Supabase Storage see the supabase skill, for Vercel Blob see the vercel skill.

## Related

- [S3 API compatibility](./s3-api-compatibility.md)
- [Authentication](./api-tokens.md)
- [Presigned URLs](./s3-presigned-urls.md)
- [Public buckets](./buckets-public-buckets.md)
- [CORS](./buckets-cors.md)
- [Object lifecycles](./buckets-object-lifecycles.md)
