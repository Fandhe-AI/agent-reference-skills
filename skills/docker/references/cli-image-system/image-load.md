---
source: https://docs.docker.com/reference/cli/docker/image/load/
---

# docker image load

Load an image from a tar archive or STDIN. Alias: `docker load`. Restores both images and tags.

## Signature / Usage

```console
$ docker image load [OPTIONS]
```

```console
$ docker load < busybox.tar.gz
Loaded image: busybox:latest

$ docker load --input fedora.tar
Loaded image: fedora:rawhide
Loaded image: fedora:20
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `-i`, `--input` |  | Read from tar archive file, instead of STDIN |
| `--platform` |  | API 1.48+ Load only the given platform(s). Formatted as a comma-separated list of `os[/arch[/variant]]` (e.g., `linux/amd64,linux/arm64/v8`). |
| `-q`, `--quiet` |  | Suppress the load output |

## Notes

- Accepts a tar archive of an image or repository, even if compressed with gzip, bzip2, xz or zstd, from a file or STDIN.
- By default all platform variants present in the archive are loaded; `--platform` limits this. An error is produced if the platform is not in the archive (`requested platform (linux/ppc64le) not found: image might be filtered out`). Omitted architecture and variant default to the daemon's native values.

```console
$ docker image load -i image.tar --platform=linux/amd64
Loaded image: alpine:latest
```

## Related

- [docker image save](./image-save.md)
- [docker image import](./image-import.md)
