---
source: https://developers.cloudflare.com/r2/examples/rclone/
---

# Use R2 with rclone

Add an R2 remote to rclone, then list, copy, and presign objects.

```toml
[r2]
type = s3
provider = Cloudflare
access_key_id = abc123
secret_access_key = xyz456
endpoint = https://<accountid>.r2.cloudflarestorage.com
acl = private
```

```sh
rclone tree r2:
# /
# ├── user-uploads
# │   └── foobar.png
# └── my-bucket-name
#     ├── cat.png
#     └── todos.txt

rclone tree r2:my-bucket-name
# /
# ├── cat.png
# └── todos.txt
```

```sh
# Upload dog.txt to the user-uploads bucket
rclone copy dog.txt r2:user-uploads/
rclone tree r2:user-uploads
# /
# ├── foobar.png
# └── dog.txt

# Download dog.txt from the user-uploads bucket
rclone copy r2:user-uploads/dog.txt .
```

```sh
rclone copy long-video.mp4 r2:user-uploads/ --s3-upload-cutoff=100M --s3-chunk-size=100M
```

```sh
# You can pass the --expire flag to determine how long the presigned link is valid. The --unlink flag isn't supported by R2.
rclone link r2:my-bucket-name/cat.png --expire 3600
# https://<accountid>.r2.cloudflarestorage.com/my-bucket-name/cat.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=<credential>&X-Amz-Date=<timestamp>&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=<signature>
```

## Notes

- Requires rclone v1.59 or later; older versions may return `HTTP 401: Unauthorized`. Run `rclone config file` to find the config file.
- With a token limited to object-level permissions, add `no_check_bucket = true` to the remote.
- Each multipart part is a Class A operation and a multipart upload costs at least 3x a single `PutObject`; tune `--s3-chunk-size` / `--s3-upload-cutoff`.
- Related: [get-started-s3](../references/r2/get-started-s3.md), [api-tokens](../references/r2/api-tokens.md).
