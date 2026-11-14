---
source: https://developers.cloudflare.com/r2/local-development/
---

# Local development

Develop and test applications against R2 with Wrangler or the Cloudflare Vite plugin, using local R2 simulations or remote bindings, local public endpoints, and a local S3-compatible endpoint.

## Signature / Usage

Add an R2 binding to the Wrangler configuration file and start the development server:

```jsonc
{
  "r2_buckets": [
    {
      "binding": "BUCKET",
      "bucket_name": "my-bucket"
    }
  ]
}
```

```sh
npx wrangler dev
```

```sh
npx vite
```

### Connect to a remote bucket

Add the binding to a development environment with `"remote": true`, then start the server with that environment:

```jsonc
{
  "env": {
    "development": {
      "r2_buckets": [
        {
          "binding": "BUCKET",
          "bucket_name": "my-bucket-development",
          "remote": true
        }
      ]
    }
  }
}
```

```sh
npx wrangler dev --env development
```

### Populate a local bucket

```sh
echo 'Hello, R2!' > hello.txt
npx wrangler r2 object put my-bucket/hello.txt --file=./hello.txt --local
```

With a custom persistence directory, use the same one for the commands that populate local data:

```sh
npx wrangler r2 object put my-bucket/hello.txt --file=./hello.txt --local --persist-to ./local-state
```

### Serve objects publicly

Every local bucket is served over HTTP at the following path on the development server:

```txt
/cdn-cgi/local/r2/public/<BUCKET_ID>/<KEY>
```

```sh
curl http://localhost:8787/cdn-cgi/local/r2/public/my-bucket/hello.txt
```

### Serve buckets over the S3 API

Add `local_dev.experimental_s3_credentials` to the local bucket binding to opt in:

```jsonc
{
  "r2_buckets": [
    {
      "binding": "BUCKET",
      "bucket_name": "my-bucket",
      "local_dev": {
        "experimental_s3_credentials": {
          "accessKeyId": "local-access-key-id",
          "secretAccessKey": "local-secret-access-key"
        }
      }
    }
  ]
}
```

The bucket is served at the following path on the development server:

```txt
/cdn-cgi/local/r2/s3
```

```js
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

const S3 = new S3Client({
	region: "auto",
	endpoint: "http://localhost:8787/cdn-cgi/local/r2/s3",
	credentials: {
		accessKeyId: "local-access-key-id",
		secretAccessKey: "local-secret-access-key",
	},
	forcePathStyle: true,
});

const object = await S3.send(
	new GetObjectCommand({ Bucket: "my-bucket", Key: "hello.txt" }),
);
console.log(await object.Body?.transformToString());
```

```sh
AWS_ACCESS_KEY_ID=local-access-key-id \
AWS_SECRET_ACCESS_KEY=local-secret-access-key \
aws s3api get-object \
  --endpoint-url http://localhost:8787/cdn-cgi/local/r2/s3 \
  --region auto \
  --bucket my-bucket \
  --key hello.txt \
  downloaded-hello.txt
```

## Options / Props

### Local S3 endpoint operations

| Type | Operations |
| --- | --- |
| Bucket | ListBuckets, HeadBucket, ListObjects, ListObjectsV2, GetBucketLocation, GetBucketEncryption |
| Object | GetObject, HeadObject, PutObject, CopyObject, DeleteObject, DeleteObjects |
| Multipart | CreateMultipartUpload, UploadPart, UploadPartCopy, CompleteMultipartUpload, AbortMultipartUpload |

### Version requirements

| Feature | Requirement |
| --- | --- |
| Local Explorer (`/cdn-cgi/local/explorer`) | Wrangler 4.118.0 or later, or Cloudflare Vite plugin 1.50.0 or later |
| Local public endpoint (`/cdn-cgi/local/r2/public/...`) | Wrangler 4.100.0 or later |
| Local S3 endpoint (`/cdn-cgi/local/r2/s3`, experimental) | Wrangler 4.115.0 or later; latest Cloudflare Vite plugin for Vite projects |

## Notes

- By default, R2 bindings use Miniflare to simulate buckets on your machine. Local buckets start empty and store data separately from deployed buckets; operations on them do not affect data or billing in your Cloudflare account. A newly created local bucket is empty; data from a remote bucket is not copied into it.
- Remote bindings affect individual bindings and differ from `wrangler dev --remote`, which runs the Worker on Cloudflare. Writes and deletes through a remote binding change the remote bucket's data and normal R2 charges apply; use a dedicated development bucket. Bindings are not inherited by named environments, so repeat the other bindings the Worker needs in the environment.
- For Vite, set `CLOUDFLARE_ENV=development` when starting the server; set `remoteBindings: false` in the Cloudflare plugin options to turn off remote connections. With Wrangler, `wrangler dev --env development --local` temporarily overrides remote bindings. `cf dev` starts the server configured for projects that use the Cloudflare CLI with `cloudflare.config.ts`.
- Applications that only use S3 still need a Worker development server to host the local bucket. Wrangler's default address is `http://localhost:8787`; Vite's is `http://localhost:5173`. Substitute the address your server prints.
- `wrangler r2 object get` and `wrangler r2 object delete` with `--local` read and remove local objects. Without `--local`, these commands act on the remote bucket. Open `/cdn-cgi/local/explorer` on the development server to list local R2 objects, view metadata, upload, or delete.
- Local objects persist across sessions in `.wrangler/state` by default. Change the directory with Wrangler's `--persist-to` flag or the Vite plugin's `persistState` option. Commands that populate local data must use the same persistence directory as the development server.
- The public endpoint's `<BUCKET_ID>` is the bucket's `bucket_name`, or the binding name when `bucket_name` is not set. It simulates a public bucket: it accepts `GET` and `HEAD`, honors `Range` and conditional request headers, and returns stored HTTP metadata. Any other method returns `401`. Buckets configured with `remote = true` are not served. It does not enable public access to a deployed bucket.
- The S3 endpoint is opt-in and experimental. `accessKeyId` and `secretAccessKey` are both required, arbitrary strings that you choose; they are not R2 API tokens and grant no access to production buckets. Requests use AWS Signature Version 4 via the `Authorization` header or presigned URL query parameters. Set the client region to `auto` and turn on path-style addressing; the bucket is addressed by its `bucket_name` (or the binding name when unset). Remote bindings do not forward this local endpoint to a deployed bucket. `ListBuckets` returns only the buckets that share the credentials the request was signed with.
- Limitations of the local S3 endpoint: SSE-C is rejected rather than applied; `x-amz-storage-class` accepts `STANDARD` only (`STANDARD_IA` is rejected); cross-origin requests are always allowed, whereas production buckets answer preflight according to their CORS configuration.
- Distinct from the Local uploads bucket feature (see `buckets-local-uploads.md`), which is a production upload-performance setting.
- Wrangler flags and Miniflare are covered by the cloudflare-wrangler skill; the Workers-side local development model by the cloudflare-workers skill.
- Source: https://developers.cloudflare.com/r2/local-development/ (production `34d908a`, fetched 2026-11-14)

## Related

- [Get started: Workers API](./get-started-workers-api.md)
- [Use R2 from Workers](./workers-api-usage.md)
- [Public buckets](./buckets-public-buckets.md)
- [Presigned URLs](./s3-presigned-urls.md)
- [S3 API compatibility](./s3-api-compatibility.md)
