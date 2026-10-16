---
source: https://docs.docker.com/build/exporters/
---

# Exporters overview

Exporters save build results to a specified output type. Select one with the `--output` CLI option.

## Signature / Usage

```console
$ docker buildx build --tag <registry>/<image> \
  --output type=<TYPE> .
```

Exporters:

- `image`: exports the build result to a container image.
- `registry`: exports the result to a container image and pushes it to the specified registry.
- `local`: exports the build root filesystem into a local directory.
- `tar`: packs the build root filesystem into a local tarball.
- `oci`: exports the result to the local filesystem in OCI image layout format.
- `docker`: exports the result to the local filesystem in Docker Image Specification v1.2.0 format.
- `cacheonly`: runs the build and creates a cache without exporting an output.

`--load` and `--push` let Buildx infer exporter settings. `--push` with `--tag` uses the `image` exporter with `push=true`; `--load` is shorthand for `--output type=docker`.

## Notes

### Use cases

```console
# Load to image store (docker exporter)
$ docker buildx build --output type=docker,name=<registry>/<image> .
$ docker buildx build --tag <registry>/<image> --load .

# Push to registry
$ docker buildx build --tag <registry>/<image> --push .
$ docker buildx build --output type=image,name=<registry>/<image>,push=true .
$ docker buildx build --output type=registry,name=<registry>/<image> .

# Image layout to a tar file (oci or docker; dest = tarball path)
$ docker buildx build --output type=oci,dest=./image.tar .

# Filesystem export
$ docker buildx build --output type=local,dest=<path/to/output> .

# Cache only
$ docker buildx build --output type=cacheonly
```

- Without an exporter or shorthand, Buildx defaults to `cacheonly` (with a warning), except with the `docker` driver, which uses the `docker` exporter.
- Docker Build Cloud (`cloud` driver): with no output an untagged result stays in the cloud build cache; with `--tag` the image is auto-loaded for a single-platform build on one cloud node; use `--load` explicitly; `--output type=cacheonly` keeps a tagged result in the cache. The target Docker context decides which Engine image store receives the image. Direct loading is unavailable for multi-node or multi-platform builds, multiple distinct image outputs, outputs targeting different contexts, and outputs to a file, stdout, or directory.

### Multiple exporters

Repeat `--output`. Requires both Buildx and BuildKit 0.13.0 or later.

```console
$ docker buildx build \
  --output type=registry,tag=<registry>/<image> \
  --output type=local,dest=<path/to/output> \
  --load .
```

### Common configuration options

Compression:

```console
$ docker buildx build \
  --output type=image,name=<registry>/<image>,push=true,compression=zstd .
```

- `compression-level=<value>`: 0-9 for `gzip` and `estargz`; 0-22 for `zstd`. Higher means smaller output and longer compression time.
- `force-compression=true`: re-compress layers imported from a previous image if the algorithm differs.
- `gzip` / `estargz` use Go `compress/gzip`; `zstd` uses `github.com/klauspost/compress/zstd`.

| compression-level (zstd) | Internal level | Approximate zstd level | Description |
| --- | --- | --- | --- |
| 0-2 | Fastest | ~1 | Fastest compression, larger file size |
| 3-6 (default) | Default | ~3 | Balanced compression and speed |
| 7-8 | Better | ~7 | Better compression, slower |
| 9-22 | Best | ~11 | Best compression, slowest |

OCI media types: `image`, `registry`, `oci`, and `docker` exporters use Docker media types by default; enable OCI media types with `oci-mediatypes`:

```console
$ docker buildx build \
  --output type=image,name=<registry>/<image>,push=true,oci-mediatypes=true .
```

## Related

- [Image and registry exporters](./exporter-image-registry.md)
- [Local and tar exporters](./exporter-local-tar.md)
- [OCI and Docker exporters](./exporter-oci-docker.md)
- [Export binaries](./export.md)
