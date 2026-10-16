---
source: https://docs.docker.com/build/cache/backends/azblob/
---

# Azure Blob Storage cache

The `azblob` cache store uploads the build cache to Azure's blob storage service.

## Signature / Usage

```console
$ docker buildx build --push -t <registry>/<image> \
  --cache-to type=azblob,name=<cache-image>[,parameters...] \
  --cache-from type=azblob,name=<cache-image>[,parameters...] .
```

## Options / Props

| Name | Option | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `name` | `cache-to`, `cache-from` | String | | Required. The name of the cache image. |
| `account_url` | `cache-to`, `cache-from` | String | | Base URL of the storage account. |
| `secret_access_key` | `cache-to`, `cache-from` | String | | Blob storage account key, see authentication. |
| `mode` | `cache-to` | `min`, `max` | `min` | Cache layers to export. |
| `ignore-error` | `cache-to` | Boolean | `false` | Ignore errors caused by failed cache exports. |

## Notes

- Not supported with the default `docker` driver; create a new builder using a different driver.
- Authentication: if `secret_access_key` is unspecified it is read from environment variables on the BuildKit server following the Azure Go SDK scheme. The variables are read from the server, not the Buildx client.
- The overview page labels the `azblob` backend "(unreleased)".

## Related

- [Cache storage backends](./cache-backends.md)
