---
source: https://docs.docker.com/reference/cli/docker/volume/create/
---

# docker volume create

Create a volume that containers can consume and store data in. If no name is given, Docker generates a random name.

## Signature / Usage

```console
$ docker volume create [OPTIONS] [VOLUME]
$ docker volume create hello
$ docker run -d -v hello:/world busybox ls /world
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `--availability` | `active` | API 1.42+ **Swarm** Cluster Volume availability (`active`, `pause`, `drain`) |
| `-d`, `--driver` | `local` | Specify volume driver name |
| `--group` |  | API 1.42+ **Swarm** Cluster Volume group (cluster volumes) |
| `--label` |  | Set metadata for a volume |
| `--limit-bytes` |  | API 1.42+ **Swarm** Maximum size of the Cluster Volume in bytes |
| `-o`, `--opt` |  | Set driver specific options |
| `--required-bytes` |  | API 1.42+ **Swarm** Minimum size of the Cluster Volume in bytes |
| `--scope` | `single` | API 1.42+ **Swarm** Cluster Volume access scope (`single`, `multi`) |
| `--secret` |  | API 1.42+ **Swarm** Cluster Volume secrets |
| `--sharing` | `none` | API 1.42+ **Swarm** Cluster Volume access sharing (`none`, `readonly`, `onewriter`, `all`) |
| `--topology-preferred` |  | API 1.42+ **Swarm** A topology that the Cluster Volume would be preferred in |
| `--topology-required` |  | API 1.42+ **Swarm** A topology that the Cluster Volume must be accessible from |
| `--type` | `block` | API 1.42+ **Swarm** Cluster Volume access type (`mount`, `block`) |

## Notes

- The official CLI help text (docker/cli v29.8.2 cli/command/volume/create.go) labels --limit-bytes as Minimum and --required-bytes as Maximum, but the values are passed to the CSI CapacityRange LimitBytes (upper bound) and RequiredBytes (lower bound); the descriptions here follow the actual mapping.
- Docker doesn't support relative paths for mount points inside the container. Multiple containers can use the same volume.
- Volume names must be unique among drivers: the same name cannot be used with two different drivers (error: `A volume named "hello" already exists with the "some-other" driver. Choose a different volume name.`). Reusing a name on the same driver reuses the existing volume without error.
- `-o` / `--opt` options are passed directly to the volume driver; their meaning differs per driver.
- The built-in `local` driver accepts no options on Windows. On Linux and Docker Desktop it accepts options similar to the Linux `mount` command; pass `--opt` multiple times (some, such as `o`, take comma-separated lists).

```console
$ docker volume create --driver local \
    --opt type=tmpfs \
    --opt device=tmpfs \
    --opt o=size=100m,uid=1000 \
    foo
```

```console
$ docker volume create --driver local \
    --opt type=nfs \
    --opt o=addr=192.168.1.1,rw \
    --opt device=:/path/to/dir \
    foo
```

- A `btrfs` example uses `--opt type=btrfs --opt device=/dev/sda2`.

## Related

- [docker volume ls](./volume-ls.md)
- [docker volume inspect](./volume-inspect.md)
- [docker volume rm](./volume-rm.md)
