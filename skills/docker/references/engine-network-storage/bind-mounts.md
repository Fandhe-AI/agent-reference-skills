---
source: https://docs.docker.com/engine/storage/bind-mounts/
---

# Bind mounts

A bind mount mounts a file or directory from the host machine into a container. Unlike a volume, no new directory is created in Docker's storage directory.

## Signature / Usage

```console
$ docker run --mount type=bind,src=<host-path>,dst=<container-path>
$ docker run --volume <host-path>:<container-path>
```

## Options / Props

`--mount type=bind` options:

| Option | Description |
| --- | --- |
| `source`, `src` | Location of the file or directory on the host (absolute or relative path). |
| `destination`, `dst`, `target` | Path where it is mounted in the container. Must be absolute. |
| `readonly`, `ro` | Mount read-only. |
| `bind-propagation` | Change bind propagation. |
| `bind-create-src` | Automatically create the source directory on the host if it doesn't exist (default: `--mount` errors). |
| `bind-recursive` | Handling of submounts (see values below). `--mount` only. |

`bind-recursive` values:

| Value | Description |
| --- | --- |
| `enabled` (default) | Read-only mounts are made recursively read-only if kernel is v5.12+; otherwise submounts are read-write. |
| `disabled` | Submounts are ignored. |
| `writable` | Submounts are read-write. |
| `readonly` | Submounts are read-only. Requires kernel v5.12+. |

`-v` / `--volume` third-field options: `readonly`/`ro`, `z`, `Z` (SELinux labeling), and propagation `rprivate` (default), `private`, `rshared`, `shared`, `rslave`, `slave`.

```console
$ docker run --mount type=bind,src=.,dst=/project,ro,bind-propagation=rshared
$ docker run -v .:/project:ro,rshared
```

Propagation settings:

| Setting | Description |
| --- | --- |
| `shared` | Sub-mounts of the original are exposed to replica mounts, and sub-mounts of replicas are propagated to the original. |
| `slave` | Like shared but one direction: the replica sees the original's sub-mounts, not vice versa. |
| `private` | Sub-mounts are not exposed to replicas, and vice versa. |
| `rshared` | Same as shared, also for nested mount points. |
| `rslave` | Same as slave, also for nested mount points. |
| `rprivate` | Default. Same as private, including nested mount points. |

## Notes

- Bind mounts have write access to host files by default; processes in a container can create, modify, or delete important host files (security implications). Use `readonly`/`ro` to prevent writes.
- Bind mounts are created on the Docker daemon host, not the client: with a remote daemon you can't bind-mount client files. Docker Desktop transparently handles bind mounts with its VM. Containers with bind mounts are tied to the host's directory structure.
- Mounting over a non-empty container directory obscures its contents (no straightforward way to reveal them; recreate the container without the mount).
- `--volume` auto-creates a missing host source as a directory; `--mount` errors with `bind source path does not exist` unless `bind-create-src` is set.
- Recursive read-only mounts need Linux kernel 5.12+; `bind-recursive=readonly` on an older kernel errors.
- Bind propagation defaults to `rprivate`, is configurable only for bind mounts, and only on Linux hosts; not supported with Docker Desktop. The host filesystem must already support propagation.
- SELinux: `z` = content shared among multiple containers, `Z` = private/unshared. Affects the host files themselves; bind-mounting a system directory such as `/home` or `/usr` with `Z` can render the host inoperable. Not possible with `--mount`. With services, SELinux labels and `:ro` are ignored (moby/moby#32579).
- Compose:

```yaml
services:
  frontend:
    image: node:lts
    volumes:
      - type: bind
        source: ./static
        target: /opt/app/static
```

## Related

- [Volumes](./volumes.md)
- [tmpfs mounts](./tmpfs.md)
- [Storage](./storage-overview.md)
