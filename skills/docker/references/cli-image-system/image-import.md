---
source: https://docs.docker.com/reference/cli/docker/image/import/
---

# docker image import

Import the contents from a tarball to create a filesystem image. Alias: `docker import`.

## Signature / Usage

```console
$ docker image import [OPTIONS] file|URL|- [REPOSITORY[:TAG]]
```

```console
$ docker import https://example.com/exampleimage.tgz
$ cat exampleimage.tgz | docker import - exampleimagelocal:new
$ docker import /path/to/exampleimage.tgz
$ sudo tar -c . | docker import - exampleimagedir
$ docker import --change "ENV DEBUG=true" ./rootfs.tgz exampleimagedir
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `-c`, `--change` |  | Apply Dockerfile instruction to the created image |
| `-m`, `--message` |  | Set commit message for imported image |
| `--platform` |  | API 1.32+ Set platform if server is multi-platform capable |

## Notes

- Input can be a URL or `-` (STDIN). The URL can point to an archive (.tar, .tar.gz, .tgz, .bzip, .tar.xz, or .txz) containing a filesystem, or to an individual file on the Docker host (full path required). Remote locations use `http://` or `https://`. Archives are untarred relative to `/` (root).
- When tarring a local directory, use `sudo` so that file ownership (especially root ownership) is preserved.
- `--change` supports only metadata (configuration) Dockerfile instructions: `CMD`, `ENTRYPOINT`, `ENV`, `EXPOSE`, `HEALTHCHECK`, `LABEL`, `ONBUILD`, `STOPSIGNAL`, `USER`, `VOLUME`, `WORKDIR`. It can be repeated:

```console
$ docker import \
    --change "ENV DEBUG=true" \
    --change "LABEL LABEL1=hello" \
    --change "LABEL LABEL2=world" \
    ./rootfs.tgz exampleimagedir
```

- `--message` sets the "Comment" field of the image configuration, shown by `docker image history`.
- `--platform` (`os[/arch[/variant]]`, e.g. `linux/amd64`, `linux/arm64/v8`) overrides the daemon's native platform, e.g. when the root filesystem is for a different architecture or OS; a Linux image imported into a Windows daemon needs `--platform` (`docker import --platform=linux .\linuximage.tar`). Verify with `docker image inspect --format '{{.Os}}/{{.Architecture}}' imported:latest`.

## Related

- [docker image history](./image-history.md)
- [docker image load](./image-load.md)
- [docker image save](./image-save.md)
