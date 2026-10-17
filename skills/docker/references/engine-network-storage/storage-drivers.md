---
source: https://docs.docker.com/engine/storage/drivers/
---

# Storage drivers

Storage drivers store image layers and the container's writable layer. This page describes the classic drivers (such as `overlay2`); the concepts (layers, copy-on-write) still apply with the containerd image store.

## Signature / Usage

```dockerfile
# syntax=docker/dockerfile:1

FROM ubuntu:22.04
LABEL org.opencontainers.image.authors="org@example.com"
COPY . /app
RUN make /app
RUN rm -r $HOME/.cache
CMD python /app/app.py
```

Inspect sizes and layers:

```console
$ docker ps --size --format "table {{.ID}}\t{{.Image}}\t{{.Names}}\t{{.Size}}"
$ docker image history acme/my-final-image:1.0
$ docker image inspect --format "{{json .RootFS.Layers}}" acme/my-base-image:1.0
```

## Notes

- Docker Engine 29.0+ uses the containerd image store by default on fresh installations (snapshotters, not classic storage drivers). On such systems the commands and examples here don't reflect how images are stored; see the containerd image store page.
- Writable-layer data doesn't persist after the container is deleted. Storage drivers optimize space efficiency but write speed is lower than native, especially with copy-on-write; use volumes for write-intensive data, data that must outlive the container, and data shared between containers.
- An image is a stack of layers, each (except the writable top) read-only. Commands that modify the filesystem create a layer; `LABEL` and `CMD` only change metadata (no layer). Adding and removing files both create layers; a removed `$HOME/.cache` still counts toward image size in the earlier layer.
- A container = image + a thin writable container layer. Multiple containers share the same image and have their own writable layer. All drivers use stackable layers and copy-on-write (CoW).
- `docker ps -s`: `size` is the writable layer; `virtual size` is the read-only image data plus the writable layer. Don't sum virtual sizes. Total also excludes log files of the logging driver, volumes/bind mounts, config files, swap, and checkpoints.
- CoW: a file is copied up into the writable layer the first time it is modified (for `overlay2`: search layers top-down, then `copy_up` of the first copy found). Changing metadata (permissions, ownership) can also trigger `copy_up`. The overhead occurs only on the first modification; large files, many layers and deep directory trees make it more noticeable.
- Layers are stored once under `/var/lib/docker/` (e.g. `/var/lib/docker/overlay2`) and shared across images and when pushing/pulling. The `vfs` driver doesn't provide CoW: a full copy of the image data is created for each container.
- `<missing>` in `docker image history` means the step was built on another system or with BuildKit (BuildKit no longer needs intermediate images for caching).

## Related

- [Select a storage driver](./select-storage-driver.md)
- [OverlayFS storage driver](./overlayfs-driver.md)
- [containerd image store](./containerd-image-store.md)
- [Volumes](./volumes.md)
