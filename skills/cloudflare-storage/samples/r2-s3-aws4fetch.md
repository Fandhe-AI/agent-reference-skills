---
source: https://developers.cloudflare.com/r2/examples/aws/aws4fetch/
---

# Use R2 with aws4fetch

Sign S3-compatible requests to R2 with the dependency-free `aws4fetch` package and produce presigned URLs from a Worker.

The first block is the first part of the official fence (cut at the end; the `ListObjectsV2` request and XML output comments are at the official URL).

```ts
import { AwsClient } from "aws4fetch";

// Provide your Cloudflare account ID
const R2_URL = `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`;

const client = new AwsClient({
	// Retrieve your S3 API credentials for your R2 bucket via API tokens (see: https://developers.cloudflare.com/r2/api/tokens)
	accessKeyId: ACCESS_KEY_ID,
	secretAccessKey: SECRET_ACCESS_KEY,
});

const ListBucketsResult = await client.fetch(R2_URL);
console.log(await ListBucketsResult.text());
```

```ts
import { AwsClient } from "aws4fetch";

const client = new AwsClient({
	service: "s3", // Required by SDK but not used by R2
	region: "auto", // Required by SDK but not used by R2
	// Retrieve your S3 API credentials for your R2 bucket via API tokens (see: https://developers.cloudflare.com/r2/api/tokens)
	accessKeyId: ACCESS_KEY_ID,
	secretAccessKey: SECRET_ACCESS_KEY,
});

// Provide your Cloudflare account ID
const R2_URL = `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`;

// Use the `X-Amz-Expires` query param to determine how long the presigned link is valid.
console.log(
	(
		await client.sign(
			new Request(`${R2_URL}/my-bucket/dog.png?X-Amz-Expires=${3600}`),
			{
				aws: { signQuery: true },
			},
		)
	).url.toString(),
);
// You can also create links for operations such as PutObject to allow temporary write access to a specific key.
// Specify Content-Type header to restrict uploads to a specific file type.
console.log(
	(
		await client.sign(
			new Request(`${R2_URL}/my-bucket/dog.png?X-Amz-Expires=${3600}`, {
				method: "PUT",
				headers: {
					"Content-Type": "image/png",
				},
			}),
			{
				aws: { signQuery: true },
			},
		)
	).url.toString(),
);
```

## Notes

- `aws4fetch` uses `fetch` and `SubtleCrypto` only (no Node.js dependencies), so it suits Workers. Responses from `client.fetch` are raw S3 XML.
- Presigned PUT URLs signed with a `Content-Type` header require the client to send the same header.
- Related: [s3-presigned-urls](../references/r2/s3-presigned-urls.md), [buckets-cors](../references/r2/buckets-cors.md), [api-tokens](../references/r2/api-tokens.md).
