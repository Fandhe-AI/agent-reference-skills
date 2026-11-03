---
source: https://developers.cloudflare.com/r2/get-started/cli/
---

# R2 S3-compatible clients

Copy-paste commands for using R2 through the S3-compatible API with the aws CLI and rclone. Both need an Access Key ID and Secret Access Key from an R2 API token (see [api-tokens.md](../references/r2/api-tokens.md)). Wrangler needs no S3 credentials; see [r2.md](./r2.md). Reference: [get-started-cli.md](../references/r2/get-started-cli.md), [s3-presigned-urls.md](../references/r2/s3-presigned-urls.md).

## aws CLI: configure a profile

```sh
aws configure
```

When prompted, enter your R2 Access Key ID, Secret Access Key, `auto` as the default region name, and `json` as the output format. `auto` is required by the SDK but not used by R2.

## aws CLI: list buckets and objects

```sh
# Provide your Cloudflare account ID
aws s3api list-buckets --endpoint-url https://<ACCOUNT_ID>.r2.cloudflarestorage.com

aws s3api list-objects-v2 --endpoint-url https://<ACCOUNT_ID>.r2.cloudflarestorage.com --bucket my-bucket
```

## aws CLI: upload, download, and list

```sh
# Upload myfile.txt to my-bucket
aws s3 cp myfile.txt s3://my-bucket/ --endpoint-url https://<ACCOUNT_ID>.r2.cloudflarestorage.com

# Download myfile.txt from my-bucket to current directory
aws s3 cp s3://my-bucket/myfile.txt ./ --endpoint-url https://<ACCOUNT_ID>.r2.cloudflarestorage.com

# List all objects in my-bucket
aws s3 ls s3://my-bucket/ --endpoint-url https://<ACCOUNT_ID>.r2.cloudflarestorage.com
```

## aws CLI: generate a presigned URL

```sh
# You can pass the --expires-in flag to determine how long the presigned link is valid.
aws s3 presign --endpoint-url https://<ACCOUNT_ID>.r2.cloudflarestorage.com  s3://my-bucket/ferriswasm.png --expires-in 3600
```

## aws CLI: change an object's storage class

```sh
aws s3api copy-object \
  --endpoint-url https://<ACCOUNT_ID>.r2.cloudflarestorage.com \
  --bucket bucket-name \
  --key path/to/object.txt \
  --copy-source /bucket-name/path/to/object.txt \
  --storage-class STANDARD_IA
```

Switches an object from `STANDARD` to `STANDARD_IA` using the `CopyObject` API (`x-amz-storage-class` header).

## rclone: configure a remote

```sh
rclone config
```

Choose `n` for a new remote, name it `r2`, select `Amazon S3 Compliant Storage Providers`, then `Cloudflare R2 storage` as the provider, and enter the Access Key ID, Secret Access Key, and S3 API endpoint. rclone v1.59 or later is required; earlier versions may return `HTTP 401: Unauthorized`.

## rclone: edit an existing configuration

```sh
rclone config file
```

Add the remote to the printed configuration file:

```toml
[r2]
type = s3
provider = Cloudflare
access_key_id = abc123
secret_access_key = xyz456
endpoint = https://<accountid>.r2.cloudflarestorage.com
acl = private
```

If you use a token with object-level permissions, also add `no_check_bucket = true`. Do not commit this file; it contains credentials.

## rclone: list buckets and objects

```sh
rclone tree r2:
rclone tree r2:my-bucket-name
```

## rclone: upload and download

```sh
# Upload dog.txt to the user-uploads bucket
rclone copy dog.txt r2:user-uploads/

# Download dog.txt from the user-uploads bucket
rclone copy r2:user-uploads/dog.txt .
```

Upload a whole directory and verify:

```sh
rclone copy /path/to/local/folder r2:bucket_name
rclone ls r2:bucket_name
```

## rclone: tune multipart part size

```sh
rclone copy long-video.mp4 r2:user-uploads/ --s3-upload-cutoff=100M --s3-chunk-size=100M
```

Each part upload counts as a separate Class A operation, so larger parts use fewer operations but cost more to retry. `--s3-upload-cutoff` is generally no less than `--s3-chunk-size`.

## rclone: generate a presigned URL

```sh
# You can pass the --expire flag to determine how long the presigned link is valid. The --unlink flag isn't supported by R2.
rclone link r2:my-bucket-name/cat.png --expire 3600
```
