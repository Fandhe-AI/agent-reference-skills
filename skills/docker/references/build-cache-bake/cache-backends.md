---
source: https://docs.docker.com/build/cache/backends/
---

# Cache storage backends

BuildKit caches build results in its own internal cache and can also export build cache to an external location for import in future builds. An external cache is almost essential in CI/CD environments with little persistence between runs.

## Signature / Usage

```console
$ docker buildx build --push -t <registry>/<image> \
  --cache-to type=registry,ref=<registry>/<cache-image>[,parameters...] \
  --cache-from type=registry,ref=<registry>/<cache-image>[,parameters...] .
```

## Options / Props

Backends supported by Buildx:

| Backend | Description |
| --- | --- |
| `inline` | Embeds the build cache into the image; pushed to the same location as the main output. Only works with the `image` exporter. |
| `registry` | Embeds the build cache into a separate image, pushed to a dedicated location separate from the main output. |
| `local` | Writes the build cache to a local directory on the filesystem. |
| `gha` | Uploads the build cache to GitHub Actions cache (beta). |
| `s3` | Uploads the build cache to an AWS S3 bucket (unreleased). |
| `azblob` | Uploads the build cache to Azure Blob Storage (unreleased). |

Common configuration parameters:

| Parameter | Applies to | Description |
| --- | --- | --- |
| `mode` (`min` / `max`) | `--cache-to`; all backends except `inline` | `min` (default) caches only layers exported into the resulting image; `max` caches all layers, including intermediate steps. |
| `compression` | `local`, `registry` | Same options as the exporter compression options (e.g. `zstd`). |
| `oci-mediatypes` | `local`, `registry` | Same as the exporter OCI options; only meaningful with `--cache-to`. |
| `image-manifest` | `local`, `registry` | Set to `true` to generate a single image manifest instead of an image index (needed for registries such as Amazon ECR that don't support `application/vnd.oci.image.index.v1+json`). |

## Notes

- The default `docker` driver supports the `inline`, `local`, `registry`, and `gha` backends only if the containerd image store is enabled. Other backends require a different driver.
- Warning: manage secrets with the dedicated `--secret` option; manually handling secrets with `COPY` or `ARG` could leak credentials.
- Unlike the local BuildKit cache (always enabled), every external backend must be explicitly exported to (`--cache-to`) and imported from (`--cache-from`). Import parameters are auto-detected.
- Each cache writes to some location; no location can be written twice without overwriting previously cached data. For scoped caches (for example one per Git branch) use different locations.
- Since BuildKit v0.21, `image-manifest` is enabled by default.
- Multiple caches: export to more than one destination and import from many, e.g. branch plus main:

```console
$ docker buildx build --push -t <registry>/<image> \
  --cache-to type=registry,ref=<registry>/<cache-image>:<branch> \
  --cache-from type=registry,ref=<registry>/<cache-image>:<branch> \
  --cache-from type=registry,ref=<registry>/<cache-image>:main .
```

- Mode example: `--cache-to type=registry,ref=<registry>/<cache-image>,mode=max`. Compression example: `...,compression=zstd`. OCI example: `...,oci-mediatypes=true,image-manifest=true`.

## Related

- [Inline cache](./cache-backend-inline.md)
- [Local cache](./cache-backend-local.md)
- [Registry cache](./cache-backend-registry.md)
- [GitHub Actions cache](./cache-backend-gha.md)
- [Amazon S3 cache](./cache-backend-s3.md)
- [Azure Blob Storage cache](./cache-backend-azblob.md)
