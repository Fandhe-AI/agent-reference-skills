---
source: https://developers.cloudflare.com/r2/objects/upload-objects/
---

# Upload objects

Upload via the dashboard, Workers API, S3 API, or CLI, using single-part `PUT` or multipart upload.

## Signature / Usage

Workers single upload:

```ts
export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		try {
			const object = await env.MY_BUCKET.put("image.png", request.body, {
				httpMetadata: {
					contentType: "image/png",
				},
			});

			if (object === null) {
				return new Response("Precondition failed or upload returned null", {
					status: 412,
				});
			}

			return Response.json({
				key: object.key,
				size: object.size,
				etag: object.etag,
			});
		} catch (err) {
			return new Response(`Upload failed: ${err}`, { status: 500 });
		}
	},
} satisfies ExportedHandler<Env>;
```

Workers multipart upload:

```ts
export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const key = "large-file.bin";

		// Create a new multipart upload
		const multipartUpload = await env.MY_BUCKET.createMultipartUpload(key);

		try {
			// In a real application, these would be actual data chunks.
			// Each part except the last must be at least 5 MiB.
			const firstChunk = new Uint8Array(5 * 1024 * 1024); // placeholder
			const secondChunk = new Uint8Array(1024); // placeholder

			const part1 = await multipartUpload.uploadPart(1, firstChunk);
			const part2 = await multipartUpload.uploadPart(2, secondChunk);

			// Complete the upload with all parts
			const object = await multipartUpload.complete([part1, part2]);

			return Response.json({
				key: object.key,
				etag: object.httpEtag,
			});
		} catch (err) {
			// Abort on failure so incomplete uploads do not count against storage
			await multipartUpload.abort();
			return new Response(`Multipart upload failed: ${err}`, { status: 500 });
		}
	},
} satisfies ExportedHandler<Env>;
```

Client-driven multipart through a Worker (actions `mpu-create`, `mpu-uploadpart`, `mpu-complete`, `mpu-abort`); resume with `resumeMultipartUpload`:

```ts
const upload = env.MY_BUCKET.resumeMultipartUpload(key, uploadId);
const part = await upload.uploadPart(partNumber, request.body);
const object = await upload.complete(body.parts);
await upload.abort();
```

S3 API single upload:

```ts
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { readFile } from "node:fs/promises";

const S3 = new S3Client({
	region: "auto",
	endpoint: `https://<ACCOUNT_ID>.r2.cloudflarestorage.com`,
	credentials: {
		accessKeyId: "<ACCESS_KEY_ID>",
		secretAccessKey: "<SECRET_ACCESS_KEY>",
	},
});

const fileContent = await readFile("./image.png");

const response = await S3.send(
	new PutObjectCommand({
		Bucket: "my-bucket",
		Key: "image.png",
		Body: fileContent,
		ContentType: "image/png",
	}),
);
console.log(`Uploaded successfully. ETag: ${response.ETag}`);
```

S3 API automatic multipart (`@aws-sdk/lib-storage`):

```ts
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { createReadStream } from "node:fs";

const S3 = new S3Client({
	region: "auto",
	endpoint: `https://<ACCOUNT_ID>.r2.cloudflarestorage.com`,
	credentials: {
		accessKeyId: "<ACCESS_KEY_ID>",
		secretAccessKey: "<SECRET_ACCESS_KEY>",
	},
});

const upload = new Upload({
	client: S3,
	params: {
		Bucket: "my-bucket",
		Key: "large-file.bin",
		Body: createReadStream("./large-file.bin"),
	},
	// Upload parts in parallel (default: 4)
	leavePartsOnError: false,
});

upload.on("httpUploadProgress", (progress) => {
	console.log(`Uploaded ${progress.loaded ?? 0} bytes`);
});

const result = await upload.done();
console.log(`Upload complete. ETag: ${result.ETag}`);
```

S3 API presigned PUT URL:

```ts
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const presignedUrl = await getSignedUrl(
	S3,
	new PutObjectCommand({
		Bucket: "my-bucket",
		Key: "user-upload.png",
		ContentType: "image/png",
	}),
	{ expiresIn: 3600 }, // Valid for 1 hour
);
```

Python manual multipart (`boto3`): `create_multipart_upload`, `upload_part`, `complete_multipart_upload`, `abort_multipart_upload`; `upload_file` switches to multipart automatically for large files.

```python
mpu = s3.create_multipart_upload(Bucket=bucket, Key=key)
upload_id = mpu["UploadId"]
response = s3.upload_part(Bucket=bucket, Key=key, UploadId=upload_id, PartNumber=1, Body=data)
s3.complete_multipart_upload(
    Bucket=bucket,
    Key=key,
    UploadId=upload_id,
    MultipartUpload={"Parts": [{"PartNumber": 1, "ETag": response["ETag"]}]},
)
```

CLI:

```sh
# Upload a single file
rclone copy /path/to/local/image.png r2:bucket_name

# Upload everything in a directory
rclone copy /path/to/local/folder r2:bucket_name
```

```sh
wrangler r2 object put test-bucket/image.png --file=image.png
```

## Options / Props

|  | Single upload (`PUT`) | Multipart upload |
| --- | --- | --- |
| **Best for** | Small to medium files (under ~100 MB) | Large files, or when you need parallelism and resumability |
| **Maximum object size** | 5 GiB | 5 TiB (up to 10,000 parts) |
| **Part size** | N/A | 5 MiB – 5 GiB per part |
| **Resumable** | No — must restart the entire upload | Yes — only failed parts need to be retried |
| **Parallel upload** | No | Yes — parts can be uploaded concurrently |

## Notes

- Most S3 SDKs and tools (such as `rclone`) automatically choose multipart for large files above a configurable threshold.
- Part limits: minimum 5 MiB (except the last part), maximum 5 GiB, maximum 10,000 parts, all parts except the last must be the same size.
- Incomplete multipart uploads are aborted after 7 days by default; change via a custom lifecycle policy.
- ETags: each part's ETag is the MD5 of its content; the completed multipart object's ETag is the hash of the concatenated binary MD5 sums of all parts followed by a hyphen and the part count (e.g. `f77dc0eecdebcd774a2a22cb393ad2ff-2` for parts `bce6bf66aeb76c7040fdd5f4eccb78e6` and `8165449fc15bbf43d3b674595cbcc406`).
- Dashboard **Create folder** creates a zero-byte object with a key ending in `/` as a placeholder.
- Wrangler `r2 object put` supports files up to 315 MB, one object at a time; Content-Type, Content-Disposition, Cache-Control and other HTTP header metadata can be set via flags.
- For Workers presigned URLs the docs use `aws4fetch` (`AwsClient`, `r2.sign(new Request(url, { method: "PUT" }), { aws: { signQuery: true } })`) with `X-Amz-Expires` set to `3600`.

## Related

- [Workers API reference](./workers-api-reference.md)
- [Use the R2 multipart API from Workers](./workers-multipart-usage.md)
- [Presigned URLs](./s3-presigned-urls.md)
- [S3 API compatibility](./s3-api-compatibility.md)
- [Object lifecycles](./buckets-object-lifecycles.md)
