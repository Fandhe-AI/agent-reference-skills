---
source: https://docs.docker.com/build/cache/backends/registry/
---

# Registry cache

The `registry` cache storage is an extension of the `inline` cache: the cache is entirely separate from the image, so you can distribute the final image without the cache, cache multi-stage builds efficiently in `max` mode, and use exporters other than `image`.

## Signature / Usage

```console
$ docker buildx build --push -t <registry>/<image> \
  --cache-to type=registry,ref=<registry>/<cache-image>[,parameters...] \
  --cache-from type=registry,ref=<registry>/<cache-image> .
```

## Options / Props

| Name | Option | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `ref` | `cache-to`, `cache-from` | String | | Full name of the cache image to import. |
| `mode` | `cache-to` | `min`, `max` | `min` | Cache layers to export. |
| `oci-mediatypes` | `cache-to` | `true`, `false` | `true` | Use OCI media types in exported manifests. |
| `image-manifest` | `cache-to` | `true`, `false` | `true` | When using OCI media types, generate an image manifest instead of an image index for the cache image. |
| `compression` | `cache-to` | `gzip`, `estargz`, `zstd` | `gzip` | Compression type. |
| `compression-level` | `cache-to` | `0..22` | | Compression level. |
| `force-compression` | `cache-to` | `true`, `false` | `false` | Forcibly apply compression. |
| `ignore-error` | `cache-to` | Boolean | `false` | Ignore errors caused by failed cache exports. |

## Notes

- Works with the default `docker` driver only when the containerd image store is enabled; otherwise use a different driver.
- `ref` can be any valid value as long as it is not the same as the target location the image is pushed to: different tags (`foo/bar:latest` and `foo/bar:build-cache`), separate image names (`foo/bar` and `foo/bar-cache`), or different repositories (`docker.io/foo/bar` and `ghcr.io/foo/bar`).
- If the `--cache-from` target doesn't exist, the cache import step fails but the build continues.

## Related

- [Cache storage backends](./cache-backends.md)
- [Inline cache](./cache-backend-inline.md)
