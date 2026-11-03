---
source: https://developers.cloudflare.com/r2/api/s3/temporary-credentials/
---

# Temporary credentials

Short-lived, scoped S3 credentials derived from an R2 API token. They use AWS Signature Version 4 plus a session token sent via the `X-Amz-Security-Token` header, and expire automatically.

## Signature / Usage

```ts
import { AwsClient } from "aws4fetch";

const R2_URL = `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`;

const client = new AwsClient({
	accessKeyId: ACCESS_KEY_ID,
	secretAccessKey: SECRET_ACCESS_KEY,
	sessionToken: SESSION_TOKEN,
	service: "s3",
});

const response = await client.fetch(`${R2_URL}/my-bucket/image.png`);
```

```python
import boto3

s3 = boto3.client(
    service_name="s3",
    endpoint_url="https://<ACCOUNT_ID>.r2.cloudflarestorage.com",
    aws_access_key_id="<ACCESS_KEY_ID>",
    aws_secret_access_key="<SECRET_ACCESS_KEY>",
    aws_session_token="<SESSION_TOKEN>",
    region_name="auto",
)
```

Adapted (not in the official docs): the variables are `export`ed and quoted so the `<...>` placeholders are not parsed as shell redirection; see Notes.

```sh
export AWS_ACCESS_KEY_ID="<ACCESS_KEY_ID>"
export AWS_SECRET_ACCESS_KEY="<SECRET_ACCESS_KEY>"
export AWS_SESSION_TOKEN="<SESSION_TOKEN>"
```

Path scoping (Temporary Credentials API body):

```jsonc
{
  "prefixes": ["uploads/user-123/"],
  "objects": ["shared/manifest.json"]
}
```

Path scoping (local signing, JWT payload):

```jsonc
{
  "paths": {
    "prefixPaths": ["uploads/user-123/"],
    "objectPaths": ["shared/manifest.json"]
  }
}
```

## Options / Props

`scope` (passed as `permission` to the API):

| Scope | Allows |
| --- | --- |
| `object-read-only` | Read and list objects in the bucket. |
| `object-read-write` | Read, write, and list objects in the bucket. |
| `admin-read-only` | Read and list objects, view bucket configuration, and read from the data catalog. |
| `admin-read-write` | Read, write, and list objects, edit bucket configuration, and read and write to the data catalog. |

`actions` (local signing only for now):

| Category | Actions |
| --- | --- |
| Read | `HeadObject`, `GetObject`, `GetBucketLocation`, `ListObjectsV1`, `ListObjectsV2`, `ListMultipartUploads`, `ListParts` |
| Write | `PutObject`, `DeleteObject`, `DeleteObjects`, `CopyObject` |
| Multipart | `CreateMultipartUpload`, `UploadPart`, `UploadPartCopy`, `AbortMultipartUpload`, `CompleteMultipartUpload` |

## Notes

- Two generation paths: the Temporary Credentials API (parent API token, bucket name, optional scoping; returns access key ID, secret access key, and session token) or local client-side signing.
- Local signing: build a JWT payload identifying bucket and scope; sign with HS256 using the parent secret access key; derive the temporary secret access key as the SHA-256 hex digest of the signed JWT; encode the session token as `base64("jwt/" + <signed-jwt>)`. The parent access key ID is reused as the temporary access key ID. Use it for many short-lived credentials, environments that cannot reach the Cloudflare API, or action-level scoping.
- Each credential is bound to exactly one bucket and cannot exceed its parent token's permissions. Provide exactly one of `scope` or `actions`; setting both or neither is rejected with `400 InvalidArgument` on `X-Amz-Security-Token`. `actions: ["GetObject", "HeadObject"]` denies `ListObjectsV2` even though `object-read-only` would allow listing.
- `ttlSeconds` sets lifetime; use the shortest that fits. Revoking the parent token immediately invalidates derived credentials.
- Adapted from the official docs: the environment-variable snippet is `export`ed and quoted so the `<...>` placeholders are not parsed as shell redirection.
- Never ship the parent secret access key to a client; local signing must run in a trusted environment.

## Related

- [Authentication](./api-tokens.md)
- [Presigned URLs](./s3-presigned-urls.md)
- [Error codes](./api-error-codes.md)
