---
source: https://developers.cloudflare.com/r2/objects/delete-objects/
---

# Delete objects

Delete objects or folders via the dashboard, Workers API, S3 API, or Wrangler.

## Signature / Usage

Adapted (not in the official docs): added a pre-shared-secret authorization check (403 before any bucket operation); see Notes.

```ts
export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext) {
		if (
			!env.AUTH_KEY_SECRET ||
			request.headers.get("X-Custom-Auth-Key") !== env.AUTH_KEY_SECRET
		) {
			return new Response("Forbidden", { status: 403 });
		}

		await env.MY_BUCKET.delete("image.png");
		return new Response("Deleted");
	},
} satisfies ExportedHandler<Env>;
```

```ts
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

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

await S3.send(
	new DeleteObjectCommand({
		Bucket: "my-bucket",
		Key: "image.png",
	}),
);
```

```python
import boto3

s3 = boto3.client(
	service_name="s3",
	# Provide your Cloudflare account ID
	endpoint_url=f"https://{ACCOUNT_ID}.r2.cloudflarestorage.com",
	# Retrieve your S3 API credentials for your R2 bucket via API tokens (see: https://developers.cloudflare.com/r2/api/tokens)
	aws_access_key_id=ACCESS_KEY_ID,
	aws_secret_access_key=SECRET_ACCESS_KEY,
	region_name="auto", # Required by SDK but not used by R2
)

s3.delete_object(Bucket="my-bucket", Key="image.png")
```

```sh
wrangler r2 object delete test-bucket/image.png
```

## Notes

- Adapted from the official docs: added an authorization check (secret binding `AUTH_KEY_SECRET` compared to the `X-Custom-Auth-Key` header); the official example is unauthenticated and must not be deployed as is.
- Deleting objects is irreversible.
- Dashboard: select objects and/or folders (a mix is allowed), then **Delete** and confirm. To delete everything, use Empty a bucket.
- Bucket lock rules also apply when deleting folders from the dashboard.

## Related

- [Delete buckets](./buckets-delete.md)
- [Bucket locks](./buckets-bucket-locks.md)
- [Object lifecycles](./buckets-object-lifecycles.md)
- [Use R2 from Workers](./workers-api-usage.md)
