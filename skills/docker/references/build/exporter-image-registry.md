---
source: https://docs.docker.com/build/exporters/image-registry/
---

# Image and registry exporters

The `image` exporter outputs the build result as a container image. The `registry` exporter is identical but automatically pushes the result by setting `push=true`.

## Signature / Usage

```console
$ docker buildx build --output type=image[,parameters] .
$ docker buildx build --output type=registry[,parameters] .
```

## Options / Props

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | String | | Image name. To specify multiple names, use a comma-separated list. |
| `push` | `true`,`false` | `false` | Push after creating the image. |
| `push-by-digest` | `true`,`false` | `false` | Push image without name. |
| `registry.insecure` | `true`,`false` | `false` | Allow pushing to insecure registry. |
| `dangling-name-prefix` | `<value>` | | Name image with `prefix@<digest>`, used for anonymous images. |
| `name-canonical` | `true`,`false` | | Add additional canonical name `name@<digest>`. |
| `compression` | `uncompressed`,`gzip`,`estargz`,`zstd` | `gzip` | Compression type. |
| `compression-level` | `0..22` | | Compression level. |
| `force-compression` | `true`,`false` | `false` | Forcefully apply compression. |
| `rewrite-timestamp` | `true`,`false` | `false` | Rewrite file timestamps to the `SOURCE_DATE_EPOCH` value. |
| `oci-mediatypes` | `true`,`false` | `false` | Use OCI media types in exporter manifests. |
| `oci-artifact` | `true`,`false` | `false` | Attestations are formatted as OCI artifacts. (see Notes for BuildKit v0.32.0+) |
| `unpack` | `true`,`false` | `false` | Unpack image after creation (for use with containerd). |
| `store` | `true`,`false` | `true` | Store the result images to the worker's (e.g. containerd) image store and ensure the image has all blobs in the content store. Ignored if the worker has no image store (e.g. OCI workers). |
| `annotation.<key>` | String | | Attach an annotation with the given `key` and `value` to the built image. |

`name` is a CSV value inside the `--output` value; quote the complete `name` field for multiple names:

```console
$ docker buildx build \
    --output 'type=image,"name=registry.example.com/myapp:1.0,registry.example.com/myapp:latest",push=true' .
```

Alternatively repeat the `--tag` flag.

## Notes

- Starting with BuildKit v0.32.0, attestations are stored as OCI artifacts when OCI media types are enabled (`oci-mediatypes=true`) even if `oci-artifact` is not set; set `BUILDX_NO_DEFAULT_OCI_ARTIFACT=1` to make Buildx set `oci-artifact=false`. The table default reflects the exporter attribute itself. (Source: build variables page.)

### Annotations

```console
$ docker buildx build \
    --output "type=<type>,name=<registry>/<image>,annotation.org.opencontainers.image.title=<title>" .
```

## Related

- [Exporters overview](./exporters.md)
- [Annotations](./annotations.md)
- [OCI and Docker exporters](./exporter-oci-docker.md)
