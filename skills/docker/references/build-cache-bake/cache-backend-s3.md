---
source: https://docs.docker.com/build/cache/backends/s3/
---

# Amazon S3 cache

The `s3` cache storage uploads the build cache to Amazon S3 or other S3-compatible services such as MinIO.

## Signature / Usage

```console
$ docker buildx build --push -t <user>/<image> \
  --cache-to type=s3,region=<region>,bucket=<bucket>,name=<cache-image>[,parameters...] \
  --cache-from type=s3,region=<region>,bucket=<bucket>,name=<cache-image> .
```

## Options / Props

| Name | Option | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `region` | `cache-to`, `cache-from` | String | | Required. Geographic location. |
| `bucket` | `cache-to`, `cache-from` | String | | Required. Name of the S3 bucket. |
| `name` | `cache-to`, `cache-from` | String | `buildkit` | Name of the cache image. |
| `endpoint_url` | `cache-to`, `cache-from` | String | | Endpoint of the S3 bucket. |
| `prefix` | `cache-to`, `cache-from` | String | | Prefix to prepend to all filenames. |
| `blobs_prefix` | `cache-to`, `cache-from` | String | `blobs/` | Prefix to prepend to blob filenames. |
| `upload_parallelism` | `cache-to` | Integer | `4` | Number of parallel layer uploads. |
| `touch_refresh` | `cache-to` | Time | `24h` | Interval for updating the timestamp of unchanged cache layers. |
| `manifests_prefix` | `cache-to`, `cache-from` | String | `manifests/` | Prefix to prepend to manifest filenames. |
| `use_path_style` | `cache-to`, `cache-from` | Boolean | `false` | When `true`, uses `bucket` in the URL instead of hostname. |
| `access_key_id` | `cache-to`, `cache-from` | String | | See authentication. |
| `secret_access_key` | `cache-to`, `cache-from` | String | | See authentication. |
| `session_token` | `cache-to`, `cache-from` | String | | See authentication. |
| `mode` | `cache-to` | `min`, `max` | `min` | Cache layers to export. |
| `ignore-error` | `cache-to` | Boolean | `false` | Ignore errors caused by failed cache exports. |

## Notes

- Not supported with the default `docker` driver; create a new builder using a different driver.
- Authentication: Buildx can reuse existing AWS credentials configured via a credentials file or environment variables. Alternatively set `access_key_id`, `secret_access_key` and `session_token` on the CLI. See the AWS Go SDK "Specifying Credentials" documentation.
- The overview page labels the `s3` backend "(unreleased)".

## Related

- [Cache storage backends](./cache-backends.md)
