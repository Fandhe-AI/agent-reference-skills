---
source: https://developers.cloudflare.com/r2/examples/aws/boto3/
---

# Use R2 with Python boto3

Configure a boto3 S3 client for R2, run common object operations, and generate presigned URLs.

```python
import boto3

s3 = boto3.client(
    service_name="s3",
    endpoint_url="https://<ACCOUNT_ID>.r2.cloudflarestorage.com",
    aws_access_key_id="<ACCESS_KEY_ID>",
    aws_secret_access_key="<SECRET_ACCESS_KEY>",
    region_name="auto",
)
```

```python
# Get object metadata
s3.head_object(Bucket="my-bucket", Key="dog.png")

# Get object
response = s3.get_object(Bucket="my-bucket", Key="dog.png")

# Upload single file
with open("./dog.png", "rb") as f:
    s3.upload_fileobj(f, "my-bucket", "dog.png")

# Delete object
s3.delete_object(Bucket="my-bucket", Key="dog.png")
```

```python
# Generate presigned URL for reading (GET)
get_url = s3.generate_presigned_url(
    "get_object",
    Params={"Bucket": "my-bucket", "Key": "dog.png"},
    ExpiresIn=3600,  # Valid for 1 hour
)

# Generate presigned URL for writing (PUT)
put_url = s3.generate_presigned_url(
    "put_object",
    Params={
        "Bucket": "my-bucket",
        "Key": "dog.png",
        "ContentType": "image/png",
    },
    ExpiresIn=3600,
)
```

## Notes

- Credentials may be omitted from the client if `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` are set. `region_name="auto"` is required by the SDK but unused by R2.
- For multi-GB uploads the official page recommends the low-level multipart API with a `ThreadPoolExecutor` (16 MiB parts, 10 workers) instead of `upload_fileobj`; see the official URL for the full script.
- A presigned PUT with `ContentType` needs a matching `Content-Type` header on the upload.
- Related: [s3-presigned-urls](../references/r2/s3-presigned-urls.md), [workers-multipart-usage](../references/r2/workers-multipart-usage.md), [api-tokens](../references/r2/api-tokens.md).
