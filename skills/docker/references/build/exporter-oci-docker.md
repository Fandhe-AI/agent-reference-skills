---
source: https://docs.docker.com/build/exporters/oci-docker/
---

# OCI and Docker exporters

The `oci` exporter outputs the build result into an OCI image layout tarball. The `docker` exporter does the same with a Docker image layout.

## Signature / Usage

```console
$ docker buildx build --output type=oci[,parameters] .
$ docker buildx build --output type=docker[,parameters] .
```

## Options / Props

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | String | | Specify image name(s) |
| `dest` | String | | Path |
| `tar` | `true`,`false` | `true` | Bundle the output into a tarball layout |
| `compression` | `uncompressed`,`gzip`,`estargz`,`zstd` | `gzip` | Compression type |
| `compression-level` | `0..22` | | Compression level |
| `force-compression` | `true`,`false` | `false` | Forcefully apply compression |
| `oci-mediatypes` | `true`,`false` | | Use OCI media types in exporter manifests. Defaults to `true` for `type=oci`, and `false` for `type=docker`. |
| `annotation.<key>` | String | | Attach an annotation with the given `key` and `value` to the built image |
| `rewrite-timestamp` | `true`,`false` | `false` | Rewrite file timestamps to the `SOURCE_DATE_EPOCH` value |

## Notes

### Annotations

```console
$ docker buildx build \
    --output "type=<type>,name=<registry>/<image>,annotation.org.opencontainers.image.title=<title>" .
```

### Other notes

- The `docker` build driver doesn't support these exporters for tarball / OCI-layout file output (see the "Tarball output" row of the drivers comparison); use `docker-container` or another driver to generate these outputs. Loading into the local image store still works with the `docker` driver: it loads automatically, and `--load` is shorthand for `--output type=docker`.

## Related

- [Exporters overview](./exporters.md)
- [Build drivers](./drivers.md)
- [Annotations](./annotations.md)
