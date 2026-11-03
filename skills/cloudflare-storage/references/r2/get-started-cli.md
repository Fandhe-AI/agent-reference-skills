---
source: https://developers.cloudflare.com/r2/get-started/cli/
---

# Get started: CLI

Manage R2 buckets and objects from the terminal with Wrangler, rclone, or the AWS CLI.

## Signature / Usage

```sh
# Upload myfile.txt to my-bucket
wrangler r2 object put my-bucket/myfile.txt --file ./myfile.txt

# Download myfile.txt and save it as downloaded.txt
wrangler r2 object get my-bucket/myfile.txt --file ./downloaded.txt
```

```sh
# Upload myfile.txt to my-bucket
rclone copy myfile.txt r2:my-bucket/

# Download myfile.txt from my-bucket to the current directory
rclone copy r2:my-bucket/myfile.txt .
```

```sh
# Upload myfile.txt to my-bucket
aws s3 cp myfile.txt s3://my-bucket/ --endpoint-url https://<ACCOUNT_ID>.r2.cloudflarestorage.com

# Download myfile.txt from my-bucket to current directory
aws s3 cp s3://my-bucket/myfile.txt ./ --endpoint-url https://<ACCOUNT_ID>.r2.cloudflarestorage.com

# List all objects in my-bucket
aws s3 ls s3://my-bucket/ --endpoint-url https://<ACCOUNT_ID>.r2.cloudflarestorage.com
```

## Options / Props

| Tool | Best for |
| --- | --- |
| Wrangler | Single object operations and managing bucket settings with minimal setup |
| rclone | Bulk object operations, migrations, and syncing directories |
| AWS CLI | Existing AWS workflows or familiarity with AWS CLI |

## Notes

- Create a bucket: `npx wrangler login`, then `npx wrangler r2 bucket create my-bucket`, then verify with `npx wrangler r2 bucket list`.
- S3-API tools (AWS CLI, rclone) need an Access Key ID and Secret Access Key: dashboard **R2 > Manage R2 API tokens > Create API token**, choose **Object Read & Write** and the target buckets. The secret cannot be viewed again. Wrangler needs no API credentials (`wrangler login`).
- rclone: version 1.59 or later. In `rclone config` create remote `r2`, storage type **Amazon S3 Compliant Storage Providers**, provider **Cloudflare R2**, then enter keys and the S3 API endpoint.
- AWS CLI via `aws configure`: Default region name `auto`, Default output format `json`.
- Wrangler install: `npm i -D wrangler`.
- Wrangler is the Cloudflare Workers CLI; see the cloudflare-wrangler skill for general Wrangler usage.

## Related

- [Get started](./get-started.md)
- [Wrangler commands](./wrangler-commands.md)
- [Presigned URLs](./s3-presigned-urls.md)
