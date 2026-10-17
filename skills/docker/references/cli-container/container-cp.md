---
source: https://docs.docker.com/reference/cli/docker/container/cp/
---

# docker container cp

Copy files/folders between a container and the local filesystem. Alias: `docker cp`.

## Signature / Usage

```console
$ docker container cp [OPTIONS] CONTAINER:SRC_PATH DEST_PATH|-
$ docker cp [OPTIONS] SRC_PATH|- CONTAINER:DEST_PATH

$ docker cp ./some_file CONTAINER:/work
$ docker cp CONTAINER:/var/logs/ /tmp/app_logs
$ docker cp CONTAINER:/var/logs/app.log - | tar x -O | grep "ERROR"
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `-a`, `--archive` |  | Archive mode (copy all uid/gid information) |
| `-L`, `--follow-link` |  | Always follow symlinks in SRC_PATH |
| `-q`, `--quiet` |  | Suppress progress output during copy. Progress output is automatically suppressed if no terminal is attached |

## Notes

- `CONTAINER` can be running or stopped. `SRC_PATH` / `DEST_PATH` can be a file or directory. `-` streams a tar archive from STDIN or to STDOUT.
- Container paths are relative to the container's `/`; the leading slash is optional. Local relative paths are relative to the current working directory.
- Behaves like Unix `cp -a`: directories copied recursively, permissions preserved if possible. Ownership is set to the user and primary group at the destination (files into a container get `UID:GID` of root; files to local get the invoking user's). With `-a`, ownership is set to the source's.
- `-L` follows symlinks in `SRC_PATH`; by default a local symlink itself, not its target, is copied. `docker cp` doesn't create parent directories for `DEST_PATH`.
- `SRC_PATH` file: `DEST_PATH` missing -> file created at `DEST_PATH`; missing and ends with `/` -> error; existing file -> overwritten; existing directory -> copied in using basename.
- `SRC_PATH` directory: `DEST_PATH` missing -> created, with the contents of the source copied in; existing file -> error; existing directory -> source directory copied into it, unless `SRC_PATH` ends with `/.`, in which case only its content is copied.
- `:` delimits `CONTAINER` and path. For a local path containing `:` use an explicit relative or absolute path such as `/path/to/file:name.txt` or `./file:name.txt`.
- Corner cases: cannot copy resources under `/proc`, `/sys`, `/dev`, tmpfs, and user-created mounts in the container. Workaround is manually running `tar` in `docker exec`:

```console
$ docker exec CONTAINER tar Ccf $(dirname SRC_PATH) - $(basename SRC_PATH) | tar Cxf DEST_PATH -
$ tar Ccf $(dirname SRC_PATH) - $(basename SRC_PATH) | docker exec -i CONTAINER tar Cxf DEST_PATH -
```

- With `-` as `SRC_PATH`, the tar content is extracted to `DEST_PATH` in the container, which must be a directory.
- Distinct from other products' "container" concepts: LXC containers in proxmox-ve, ModelContainer in apple-data, CKContainer in apple-app-services, and item containers in windows-* skills are unrelated to Docker containers.

## Related

- [docker container exec](./container-exec.md)
- [docker container export](./container-export.md)
