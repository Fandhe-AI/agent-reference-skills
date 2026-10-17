---
source: https://docs.docker.com/build/exporters/local-tar/
---

# Local and tar exporters

The `local` and `tar` exporters output the root filesystem of the build result, useful for artifacts that are not container images. `local` exports files and directories; `tar` bundles them into a tarball.

## Signature / Usage

```console
$ docker buildx build --output type=local[,parameters] .
$ docker buildx build --output type=tar[,parameters] .
```

## Options / Props

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `dest` | String | | Path to copy files to |
| `platform-split` | Boolean | `true` | `local` exporter only. Split multi-platform outputs into platform subdirectories. |

## Notes

### Multi-platform builds

Given:

```dockerfile
FROM busybox AS build
ARG TARGETOS
ARG TARGETARCH
RUN mkdir /out && echo foo > /out/hello-$TARGETOS-$TARGETARCH

FROM scratch
COPY --from=build /out /
```

Default (split by platform) produces `output/linux_amd64/hello-linux-amd64` and `output/linux_arm64/hello-linux-arm64`:

```console
$ docker buildx build \
  --platform linux/amd64,linux/arm64 \
  --output type=local,dest=./output \
  .
```

Merge into one flat directory with `platform-split=false`:

```console
$ docker buildx build \
  --platform linux/amd64,linux/arm64 \
  --output type=local,dest=./output,platform-split=false \
  .
```

### Other notes

- With `platform-split=false`, if multiple platforms produce identical file names the export fails with an error.
- Single-platform builds export directly to `dest` without a platform subdirectory; set `platform-split=true` explicitly to get `linux_amd64/` even for a single platform.

## Related

- [Exporters overview](./exporters.md)
- [Export binaries](./export.md)
