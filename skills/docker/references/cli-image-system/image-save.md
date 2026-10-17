---
source: https://docs.docker.com/reference/cli/docker/image/save/
---

# docker image save

Save one or more images to a tar archive (streamed to STDOUT by default). Alias: `docker save`.

## Signature / Usage

```console
$ docker image save [OPTIONS] IMAGE [IMAGE...]
```

```console
$ docker save busybox > busybox.tar
$ docker save --output busybox.tar busybox
$ docker save myimage:latest | gzip > myimage_latest.tar.gz
$ docker save -o ubuntu.tar ubuntu:lucid ubuntu:saucy
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `-o`, `--output` |  | Write to a file, instead of STDOUT |
| `--platform` |  | API 1.48+ Save only the given platform(s). Formatted as a comma-separated list of `os[/arch[/variant]]` (e.g., `linux/amd64,linux/arm64/v8`) |

## Notes

- Produces a tarred repository containing all parent layers, and all tags and versions, or the specified `repo:tag`, for each argument. The archive can be restored with `docker load`.
- By default all platform variants present in the daemon's image store are saved; `--platform` restricts this. An error is produced if the platform is not in the local image store (`no suitable export target found for platform linux/s390x`). Omitted architecture and variant default to the daemon's native values.

```console
$ docker image save --platform=linux/riscv64 -o alpine-riscv.tar alpine:latest
```

## Related

- [docker image load](./image-load.md)
- [docker image import](./image-import.md)
