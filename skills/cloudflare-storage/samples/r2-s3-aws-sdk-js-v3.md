---
source: https://developers.cloudflare.com/r2/examples/aws/aws-sdk-js-v3/
---

# Use R2 with the AWS SDK for JavaScript v3

Point `@aws-sdk/client-s3` at the R2 endpoint, list buckets, and generate presigned GET and PUT URLs.

The block below is the first part of the official fence (cut at the end; the following `ListObjectsV2Command` call and output comments are at the official URL).

```ts
import {
	S3Client,
	ListBucketsCommand,
	ListObjectsV2Command,
	GetObjectCommand,
	PutObjectCommand,
} from "@aws-sdk/client-s3";

const S3 = new S3Client({
	region: "auto", // Required by SDK but not used by R2
	// Provide your Cloudflare account ID
	endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
	// Retrieve your S3 API credentials for your R2 bucket via API tokens (see: https://developers.cloudflare.com/r2/api/tokens)
	credentials: {
		accessKeyId: ACCESS_KEY_ID,
		secretAccessKey: SECRET_ACCESS_KEY,
	},
});

console.log(await S3.send(new ListBucketsCommand({})));
```

```ts
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Use the expiresIn property to determine how long the presigned link is valid.
console.log(
	await getSignedUrl(
		S3,
		new GetObjectCommand({ Bucket: "my-bucket", Key: "dog.png" }),
		{ expiresIn: 3600 },
	),
);
// You can also create links for operations such as PutObject to allow temporary write access to a specific key.
// Specify ContentType to restrict uploads to a specific file type.
console.log(
	await getSignedUrl(
		S3,
		new PutObjectCommand({
			Bucket: "my-bucket",
			Key: "dog.png",
			ContentType: "image/png",
		}),
		{ expiresIn: 3600 },
	),
);
```

```sh
curl -X PUT "https://my-bucket.<ACCOUNT_ID>.r2.cloudflarestorage.com/dog.png?X-Amz-Algorithm=..." \
  -H "Content-Type: image/png" \
  --data-binary @dog.png
```

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  // Set this to today's date
  "compatibility_date": "2026-11-03",
  "compatibility_flags": [
    "nodejs_compat"
  ],
  "alias": {
    "@aws-sdk/xml-builder": "@aws-sdk/xml-builder/dist-cjs/index.js"
  }
}
```

## Notes

- `ACCOUNT_ID`, `ACCESS_KEY_ID`, `SECRET_ACCESS_KEY` are placeholders; create an S3 access key first (api-tokens).
- S3-compatible API does not work with local `wrangler dev`. The Wrangler `alias` fence is only for running the SDK inside a Worker (needs `nodejs_compat` and a direct `@aws-sdk/xml-builder` dependency to avoid `DOMParser is not defined`); for plain reads/writes in a Worker prefer the R2 binding.
- A presigned PUT with `ContentType` requires the client to send the matching `Content-Type` header; combine with bucket CORS rules to limit abuse.
- Related: [s3-presigned-urls](../references/r2/s3-presigned-urls.md), [buckets-cors](../references/r2/buckets-cors.md), [api-tokens](../references/r2/api-tokens.md).
