---
source: https://developers.cloudflare.com/r2/objects/download-objects/
---

# Download objects

Download objects via the dashboard, Workers API, S3 API (including presigned URLs), or Wrangler.

## Signature / Usage

```ts
export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext) {
		const object = await env.MY_BUCKET.get("image.png");
		if (object === null) {
			return new Response("Object not found", { status: 404 });
		}
		return new Response(object.body);
	},
} satisfies ExportedHandler<Env>;
```

```ts
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

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

const response = await S3.send(
	new GetObjectCommand({
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

response = s3.get_object(Bucket="my-bucket", Key="image.png")
image_data = response["Body"].read()
```

```sh
wrangler r2 object get test-bucket/image.png
```

## Options / Props

| Wrangler flag | Description |
| --- | --- |
| `--file` | Set a new name for the object as it is downloaded |
| `--pipe` | Pipe the download to standard output (stdout) |

## Notes

- Wrangler downloads into the current working directory.
- For client-side downloads, the app generates a presigned GET URL with an S3 SDK, sends it to the client, and the client downloads directly from R2.
- Dashboard: object **...** menu, **Download**.

## Related

- [Presigned URLs](./s3-presigned-urls.md)
- [Use R2 from Workers](./workers-api-usage.md)
- [S3 API compatibility](./s3-api-compatibility.md)
