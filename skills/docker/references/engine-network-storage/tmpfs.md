---
source: https://docs.docker.com/engine/storage/tmpfs/
---

# tmpfs mounts

A tmpfs mount lets a container create files outside its writable layer, persisted only in host memory. When the container stops the mount is removed and the files are lost. Linux only.

## Signature / Usage

```console
$ docker run --mount type=tmpfs,dst=<mount-path>
$ docker run --tmpfs <mount-path>
```

## Options / Props

`--mount type=tmpfs` options:

| Option | Description |
| --- | --- |
| `destination`, `dst`, `target` | Container path to mount into a tmpfs. |
| `tmpfs-size` | Size in bytes. If unset, the default maximum is 50% of the host's total RAM. |
| `tmpfs-mode` | File mode in octal, e.g. `700` or `0770`. Defaults to `1777` (world-writable). |

`--tmpfs <mount-path>[:opts]` options: `ro`, `rw` (default), `nosuid`, `suid` (default), `nodev`, `dev`, `exec`, `noexec`, `sync`, `async` (default), `dirsync`, `atime`, `noatime`, `diratime`, `nodiratime`, `size` (e.g. `size=64m`), `mode` (e.g. `mode=1777`), `uid`, `gid`, `nr_inodes` (e.g. `nr_inodes=400k`), `nr_blocks` (e.g. `nr_blocks=1024`).

```console
$ docker run --mount type=tmpfs,dst=/app,tmpfs-size=21474836480,tmpfs-mode=1770
$ docker run --tmpfs /data:noexec,size=1024,mode=1777
```

## Notes

- tmpfs data counts toward the container's memory cgroup limit (`--memory` / Compose `mem_limit`); a large `tmpfs-size` doesn't add RAM, and filling the mount can OOM the container.
- tmpfs mounts map directly to Linux tmpfs, so temporary data may be written to swap and thereby persisted to the filesystem.
- Mounting over existing container data obscures it (recreate the container without the mount to reveal it).
- Limitations: can't be shared between containers; Linux only; permissions set on tmpfs may reset after container restart (setting uid/gid can be a workaround).
- `--tmpfs` cannot be used with Swarm services (use `--mount`). There is no `source` for tmpfs mounts.
- Not all Linux `mount` tmpfs features are supported with `--tmpfs`; advanced options may require a privileged container (`docker run --privileged -it debian sh` then `mount -t tmpfs -o <options> tmpfs /data`), which grants elevated permissions and should be used only when necessary in trusted environments.
- Verify with `docker inspect tmptest --format '{{ json .Mounts }}'`.

## Related

- [Volumes](./volumes.md)
- [Bind mounts](./bind-mounts.md)
- [Storage](./storage-overview.md)
