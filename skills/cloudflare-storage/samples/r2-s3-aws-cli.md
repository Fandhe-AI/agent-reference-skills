---
source: https://developers.cloudflare.com/r2/examples/aws/aws-cli/
---

# Use R2 with the aws CLI

Configure an aws CLI profile for R2 and list buckets, list objects, and presign a URL.

```shell
aws configure
```

```sh
AWS Access Key ID [None]: <ACCESS_KEY_ID>
AWS Secret Access Key [None]: <SECRET_ACCESS_KEY>
Default region name [None]: auto
Default output format [None]: json
```

```sh
# Provide your Cloudflare account ID
aws s3api list-buckets --endpoint-url https://<ACCOUNT_ID>.r2.cloudflarestorage.com
# {
#     "Buckets": [
#         {
#             "Name": "my-bucket",
#             "CreationDate": "2022-05-18T17:19:59.645000+00:00"
#         }
#     ],
#     "Owner": {
#         "DisplayName": "134a5a2c0ba47b38eada4b9c8ead10b6",
#         "ID": "134a5a2c0ba47b38eada4b9c8ead10b6"
#     }
# }

aws s3api list-objects-v2 --endpoint-url https://<ACCOUNT_ID>.r2.cloudflarestorage.com --bucket my-bucket
# {
#     "Contents": [
#         {
#             "Key": "ferriswasm.png",
#             "LastModified": "2022-05-18T17:20:21.670000+00:00",
#             "ETag": "\"eb2b891dc67b81755d2b726d9110af16\"",
#             "Size": 87671,
#             "StorageClass": "STANDARD"
#         }
#     ]
# }
```

```sh
# You can pass the --expires-in flag to determine how long the presigned link is valid.
aws s3 presign --endpoint-url https://<ACCOUNT_ID>.r2.cloudflarestorage.com  s3://my-bucket/ferriswasm.png --expires-in 3600
# https://<ACCOUNT_ID>.r2.cloudflarestorage.com/my-bucket/ferriswasm.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=<credential>&X-Amz-Date=<timestamp>&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=<signature>
```

## Notes

- `region` can be `auto`; it is required by the CLI but not used by R2. Every command needs `--endpoint-url`.
- Related: [get-started-s3](../references/r2/get-started-s3.md), [s3-presigned-urls](../references/r2/s3-presigned-urls.md), [api-tokens](../references/r2/api-tokens.md).
