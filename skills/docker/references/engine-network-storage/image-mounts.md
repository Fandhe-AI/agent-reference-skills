---
source: https://docs.docker.com/engine/storage/image-mounts/
---

# Image mounts

An image mount mounts the contents of another image into the container at a chosen path, read-only, without those files being part of the container's own image.

## Signature / Usage

```console
$ docker run --mount type=image,src=<image-reference>,dst=<container-path>
$ docker run --mount type=image,src=busybox,dst=/dbg,image-subpath=bin
```

## Options / Props

`--mount type=image` options:

| Option | Description |
| --- | --- |
| `source`, `src` | Reference of the image to mount, e.g. `busybox` or `busybox:musl`. The image must exist locally. |
| `destination`, `dst`, `target` | Path where the image is mounted in the container. Must be absolute. |
| `image-subpath` | Path inside the source image to mount instead of the image root. |

## Notes

- Requires the containerd image store; not available with the classic storage drivers.
- Always read-only; the container can't modify the mounted image. Created only with `--mount` (no `-v` equivalent).
- The source image must already exist in the daemon's image store; Docker doesn't pull it (otherwise: `No such image: busybox:musl`). Run `docker pull busybox:musl` first.
- Executables from a mounted image need a compatible runtime: a dynamically linked binary needs matching dynamic linker and shared libraries (a glibc binary fails in musl-based Alpine). Statically linked binaries or data-only mounts avoid this.
- Mounting over an existing directory obscures its contents.
- Use cases: debugging a minimal or hardened image lacking a shell (mount a tool-rich image such as `busybox`), sharing read-only assets (datasets, models, static content) across containers with different images, keeping application images small.
- Compose (the `image.subpath` option needs Docker Compose 2.35.0 or later):

```yaml
services:
  app:
    image: alpine:latest
    volumes:
      - type: image
        source: busybox
        target: /tools
        image:
          subpath: bin
```

- Verify with `docker inspect imgtest --format '{{ json .Mounts }}'` (`"Type":"image"`, `"RW":false`).

## Related

- [containerd image store](./containerd-image-store.md)
- [Volumes](./volumes.md)
- [Storage](./storage-overview.md)
