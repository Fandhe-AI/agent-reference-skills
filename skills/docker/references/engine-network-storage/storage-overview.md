---
source: https://docs.docker.com/engine/storage/
---

# Storage

Docker storage covers two concepts: container data persistence (volumes, bind mounts, tmpfs mounts) and daemon storage backends (containerd image store and storage drivers) for how image layers and container writable layers are stored on disk.

## Signature / Usage

```console
$ docker run --mount type=volume,src=<volume-name>,dst=<mount-path>
$ docker run --mount type=bind,src=<host-path>,dst=<container-path>
$ docker run --mount type=tmpfs,dst=<mount-path>
$ docker run --mount type=image,src=<image-reference>,dst=<container-path>
```

## Options / Props

| Mount type | Description |
| --- | --- |
| Volume mounts | Persistent storage managed by the Docker daemon; data survives container removal. Direct access to volume data on the host is unsupported, undefined behavior. Same raw performance as the host filesystem. |
| Bind mounts | Direct link between a host path and a container; non-Docker host processes and container processes can modify files simultaneously. |
| tmpfs mounts | Files stored in host memory (not persisted to the container's writable layer, but may be written to swap); lost when the container stops/restarts or the host reboots. |
| Image mounts | Contents of another image mounted read-only at a chosen path; require the containerd image store. |
| Named pipes | Communication between the Docker host and a container (Windows), e.g. connecting a tool to the Docker Engine API. |

## Notes

- By default all files created in a container are stored in a writable container layer on top of read-only, immutable image layers. This data doesn't persist when the container is destroyed, and is unique per container (hard to extract to the host or another container).
- Regardless of mount type, data looks the same inside the container: a directory or an individual file in the container's filesystem.
- Adapted: the official overview says tmpfs data is "not written to disk"; per the tmpfs mounts page it may be written to a swap file and thereby persisted, so don't rely on tmpfs alone for secrets on hosts with swap.
- Use volumes for performance-critical data processing and long-term storage; bind mounts when you need access from both the container and the host; tmpfs for temporary in-memory storage (caches, credentials, reduced disk I/O).

## Related

- [Volumes](./volumes.md)
- [Bind mounts](./bind-mounts.md)
- [tmpfs mounts](./tmpfs.md)
- [Image mounts](./image-mounts.md)
- [containerd image store](./containerd-image-store.md)
- [Storage drivers](./storage-drivers.md)
