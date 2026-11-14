---
source: https://developers.cloudflare.com/r2/api/s3/presigned-urls/
---

# Presigned URLs

Presigned URLs grant temporary access to a specific R2 object without exposing API credentials. They are generated server-side with AWS Signature Version 4 and no communication with R2.

## Signature / Usage

Adapted (not in the official docs): added `signableHeaders: new Set(["content-type"])` to the `PutObjectCommand` presign options so `Content-Type` is part of the signature; see Notes.

```ts
import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const S3 = new S3Client({
	region: "auto", // Required by SDK but not used by R2
	// Provide your Cloudflare account ID
	endpoint: `https://<ACCOUNT_ID>.r2.cloudflarestorage.com`,
	// Retrieve your S3 API credentials for your R2 bucket via API tokens (see: https://developers.cloudflare.com/r2/api/tokens)
	credentials: {
		accessKeyId: '<ACCESS_KEY_ID>',
		secretAccessKey: '<SECRET_ACCESS_KEY>',
	},
});

// Generate presigned URL for reading (GET)
const getUrl = await getSignedUrl(
	S3,
	new GetObjectCommand({ Bucket: "my-bucket", Key: "image.png" }),
	{ expiresIn: 3600 }, // Valid for 1 hour
);

// Generate presigned URL for writing (PUT)
// Specify ContentType to restrict uploads to a specific file type
const putUrl = await getSignedUrl(
	S3,
	new PutObjectCommand({
		Bucket: "my-bucket",
		Key: "image.png",
		ContentType: "image/png",
	}),
	{ expiresIn: 3600, signableHeaders: new Set(["content-type"]) },
);
```

Adapted (not in the official docs): added an authorization check (403 before any URL is issued); see Notes.

```ts
import { AwsClient } from "aws4fetch";

export default {
	async fetch(request, env): Promise<Response> {
		// Require authorization before issuing presigned URLs
		if (
			!env.AUTH_KEY_SECRET ||
			request.headers.get("X-Custom-Auth-Key") !== env.AUTH_KEY_SECRET
		) {
			return new Response("Forbidden", { status: 403 });
		}

		const client = new AwsClient({
			service: "s3",
			region: "auto",
			// Store your S3 API credentials as secrets (see: https://developers.cloudflare.com/r2/api/tokens)
			accessKeyId: env.R2_ACCESS_KEY_ID,
			secretAccessKey: env.R2_SECRET_ACCESS_KEY,
		});

		const R2_URL = `https://${env.ACCOUNT_ID}.r2.cloudflarestorage.com`;

		const getUrl = (
			await client.sign(
				new Request(`${R2_URL}/my-bucket/image.png?X-Amz-Expires=3600`),
				{ aws: { signQuery: true } },
			)
		).url.toString();

		const putUrl = (
			await client.sign(
				new Request(`${R2_URL}/my-bucket/image.png?X-Amz-Expires=3600`, {
					method: "PUT",
					headers: { "Content-Type": "image/png" },
				}),
				{ aws: { signQuery: true, allHeaders: true } },
			)
		).url.toString();

		return Response.json({ getUrl, putUrl });
	},
} satisfies ExportedHandler<Env>;
```

```python
import boto3

s3 = boto3.client(
    service_name="s3",
    endpoint_url='https://<ACCOUNT_ID>.r2.cloudflarestorage.com',
    aws_access_key_id='<ACCESS_KEY_ID>',
    aws_secret_access_key='<SECRET_ACCESS_KEY>',
    region_name="auto", # Required by SDK but not used by R2
)

# Generate presigned URL for reading (GET)
get_url = s3.generate_presigned_url(
	'get_object',
	Params={'Bucket': 'my-bucket', 'Key': 'image.png'},
	ExpiresIn=3600  # Valid for 1 hour
)

# Generate presigned URL for writing (PUT)
put_url = s3.generate_presigned_url(
	'put_object',
	Params={
		'Bucket': 'my-bucket',
		'Key': 'image.png',
		'ContentType': 'image/png'
	},
	ExpiresIn=3600
)
```

```sh
# Generate presigned URL for reading (GET)
# The AWS CLI presign command defaults to GET operations
aws s3 presign --endpoint-url https://<ACCOUNT_ID>.r2.cloudflarestorage.com \
  s3://my-bucket/image.png \
  --expires-in 3600
```

Using a presigned URL:

Adapted (not in the official docs): the PUT request sends `Content-Type: image/png`, matching the signed value; see Notes.

```sh
# Download using a GET presigned URL
curl "https://my-bucket.<ACCOUNT_ID>.r2.cloudflarestorage.com/image.png?X-Amz-Algorithm=..."

# Upload using a PUT presigned URL (Content-Type must match the signed value)
curl -X PUT "https://my-bucket.<ACCOUNT_ID>.r2.cloudflarestorage.com/image.png?X-Amz-Algorithm=..." \
  -H "Content-Type: image/png" \
  --data-binary @image.png
```

## Options / Props

| Pattern | Grants | Good for |
| --- | --- | --- |
| Presigned URLs | A single S3 operation on a single object | Granting direct HTTP access to a single object without an S3 client, such as a browser upload or a shareable download link |
| Temporary credentials | Multiple S3 operations, scoped to a bucket and a set of permitted operations, and optionally to specific paths | Callers that use a standard S3 client or SDK to perform multiple operations in a scoped session |

Signature parameters: `X-Amz-Algorithm`, `X-Amz-Credential`, `X-Amz-Date`, `X-Amz-Expires` (seconds the URL remains valid from `X-Amz-Date`), `X-Amz-Signature`, `X-Amz-SignedHeaders`.

## Notes

- To generate one you specify: resource identifier (account ID, bucket, object path), operation (GET, PUT, HEAD, or DELETE), and expiry from 1 second to 7 days (604,800 seconds).
- The Workers R2 binding cannot generate presigned URLs; sign with an S3 client such as `aws4fetch` or AWS SDK for JavaScript v3 with `nodejs_compat`.
- Restrict `Content-Type`: the signature includes it, so uploads with a different `Content-Type` fail with `403/SignatureDoesNotMatch`. With aws4fetch set `allHeaders: true` and send the same `Content-Type`.
- Adapted from the official docs: the AWS SDK v3 `getSignedUrl` hoists headers out of the signature by default, so `ContentType` alone is not enforced; `signableHeaders: new Set(["content-type"])` keeps it signed. The curl PUT now sends `-H "Content-Type: image/png"`; without it (or with a different value) the upload fails with `SignatureDoesNotMatch`.
- Adapted from the official docs: added an authorization check to the Worker example; the official example is unauthenticated, so anyone could obtain presigned URLs for the bucket, and must not be deployed as is.
- Browser use needs CORS rules on the bucket. Tampering with resource, operation, or expiry returns `403/SignatureDoesNotMatch`. The same URL can be reused until it expires.
- Supported methods: `GET`, `HEAD`, `PUT`, `DELETE`. `POST` (multipart form uploads via HTML forms) is not supported. The AWS CLI `presign` supports GET only.
- Treat presigned URLs as bearer tokens; use short expirations for sensitive operations.
- They work with the S3 API domain (`<ACCOUNT_ID>.r2.cloudflarestorage.com`) and cannot be used with custom domains. For authentication on custom domains use WAF HMAC validation (Pro plan or above).
- Local development: to test presigned requests locally, configure the S3 client with the local S3-compatible endpoint and credentials (see `local-development.md`). Generate URLs using that endpoint and path-style addressing. The local endpoint accepts signed requests for local buckets only.
- Source: https://developers.cloudflare.com/r2/api/s3/presigned-urls/ (production `34d908a`, fetched 2026-11-14)

## Related

- [Local development](./local-development.md)

- [Authentication](./api-tokens.md)
- [Temporary credentials](./s3-temporary-credentials.md)
- [CORS](./buckets-cors.md)
- [Public buckets](./buckets-public-buckets.md)
