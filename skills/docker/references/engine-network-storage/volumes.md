---
source: https://docs.docker.com/engine/storage/volumes/
---

# Volumes

Volumes are persistent data stores for containers, created and managed by Docker (explicitly with `docker volume create`, or implicitly during container or service creation). A volume is stored in a directory on the Docker host and that directory is mounted into the container.

## Signature / Usage

```console
$ docker run --mount type=volume,src=<volume-name>,dst=<mount-path>
$ docker run --volume <volume-name>:<mount-path>
```

Manage volumes:

```console
$ docker volume create my-vol
$ docker volume ls
$ docker volume inspect my-vol
$ docker volume rm my-vol
$ docker volume prune
```

## Options / Props

`--mount type=volume` options:

| Option | Description |
| --- | --- |
| `source`, `src` | Name of the volume. Omitted for anonymous volumes. |
| `destination`, `dst`, `target` | Path where the file or directory is mounted in the container. |
| `volume-subpath` | Subdirectory within the volume to mount. Must exist in the volume before mounting. |
| `readonly`, `ro` | Mount the volume read-only. |
| `volume-nocopy` | Don't copy data at the destination into an empty volume (default: content is copied). |
| `volume-opt` | Key-value pair of driver option name and value; can be given more than once. |

`-v` / `--volume` form `[<volume-name>:]<mount-path>[:opts]`, options: `readonly`/`ro`, `volume-nocopy`.

```console
$ docker run --mount type=volume,src=myvolume,dst=/data,ro,volume-subpath=foo <image>
$ docker run -v myvolume:/data:ro
```

## Notes

- `--mount` is generally preferred (more explicit, supports all options). It is required to specify volume driver options, mount a volume subdirectory, or mount a volume into a Swarm service. With a driver that needs options, use `--mount`, not `-v`.
- Volumes use `rprivate` bind propagation, which isn't configurable for volumes.
- A volume's contents outlive containers; it can be mounted into multiple containers at once (including read-write for some and read-only for others) and isn't removed automatically when unused. Remove unused volumes with `docker volume prune`.
- Mounting a non-empty volume over existing container files obscures them; mounting an empty volume copies (propagates) the container's existing files into it by default. A volume that doesn't exist is created when a container is started with it.
- Anonymous volumes get a unique random name, persist after container removal unless the container was created with `--rm` (then the anonymous volume is destroyed; with `--volumes-from` it stays). They aren't reused or shared automatically.
- Compose: `volumes: - myapp:/home/node/app` plus a top-level `volumes: myapp:`; `external: true` references a volume created outside Compose.
- Services: with the `local` driver each service container gets its own local volume; removing a service doesn't remove its volumes.
- Volume drivers (e.g. `docker plugin install --grant-all-permissions rclone/docker-volume-rclone --alias rclone`; `docker volume create -d rclone --name rclonevolume -o type=sftp ...`) abstract external storage such as NFS or S3. To escape a comma-separated `volume-opt` list, quote the value with double quotes and the whole mount parameter with single quotes.
- NFS via the `local` driver: `--mount 'type=volume,source=nfsvolume,target=/app,volume-driver=local,volume-opt=type=nfs,volume-opt=device=:/var/docker-nfs,volume-opt=o=addr=10.0.0.10'` (NFSv4 adds `rw,nfsvers=4,async`). CIFS: `docker volume create --driver local --opt type=cifs --opt device=//host/share --opt o=addr=...,username=...,password=...,file_mode=0777,dir_mode=0777 --name cifs-volume` (`addr` is required when using a hostname).
- Block devices: with the `local` driver `--mount` forwards options unaltered to the Linux `mount` syscall (`mount -t <type> <device> <dst> -o <o>`). The documented loop-device procedure (`fallocate`, `mkfs.ext4`, `losetup`) is only an example, not a recommended general practice.
- Backup/restore/migrate via `--volumes-from`: `docker run --rm --volumes-from dbstore -v "$(pwd)":/backup ubuntu tar cvf /backup/backup.tar /dbdata`; restore with `tar xvf /backup/backup.tar --strip 1` in a container from the new volume. Adapted: `$(pwd)` is quoted (the official example leaves it unquoted).
- Adapted: the official page writes `docker plugin install ... --aliases rclone`; the CLI flag is `--alias` (docker/cli plugin/install.go), so it is corrected here.
- Adapted: the official option example uses `volume-subpath=/foo`; the daemon requires a relative path inside the volume (moby rejects non-local subpaths), and the subdirectory must already exist (e.g. `docker run --rm --mount src=myvolume,dst=/v alpine mkdir -p /v/foo`), so `foo` is used here.
- Prefer volumes to bind mounts for backup/migration, CLI/API management, Linux and Windows containers, safer sharing, pre-populated content, and high-performance I/O. They are a poor choice if you need to access files directly from the host.

## Related

- [Bind mounts](./bind-mounts.md)
- [tmpfs mounts](./tmpfs.md)
- [Storage](./storage-overview.md)
- [Storage drivers](./storage-drivers.md)
