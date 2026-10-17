---
source: https://docs.docker.com/engine/containers/run/
---

# Running containers

Docker runs processes in isolated containers. A container is a process which runs on a host (local or remote) with its own file system, its own networking, and its own isolated process tree separate from the host. This page details how to use `docker run`.

## Signature / Usage

```console
$ docker run [OPTIONS] IMAGE[:TAG|@DIGEST] [COMMAND] [ARG...]
```

Image reference forms: `docker run IMAGE[:TAG][@DIGEST]` and `docker create IMAGE[:TAG][@DIGEST]`. The tag defaults to `latest`. Digest example:

```console
$ docker run alpine@sha256:9cacb71397b640eca97488cf08582ae4e4068513101088e9f96c9814bfda95e0 date
```

Foreground / background:

```console
$ docker run -d nginx
$ docker logs -n 5 <container>
$ docker attach <container>
```

Container networking and mounts:

```console
$ docker network create my-net
$ docker run -d --name web --network my-net nginx:alpine
$ docker run --mount source=my_volume,target=/foo busybox
$ docker run -it --mount type=bind,source=[PATH],target=[PATH],bind-create-src busybox
```

## Options / Props

Container identifiers:

| Identifier type | Example value |
| --- | --- |
| UUID long identifier | `f78375b1c487e03c9438c729345e54db9d20cfa2ac1fc3494b6eb60872e74778` |
| UUID short identifier | `f78375b1c487` |
| Name | `evil_ptolemy` |

Exit status of `docker run`:

| Code | Meaning |
| --- | --- |
| `125` | Error is with the Docker daemon itself (e.g. `flag provided but not defined: --foo`) |
| `126` | The specified contained command can't be invoked |
| `127` | The contained command can't be found |
| other | Exit code of the provided container command |

Runtime resource constraints (see also resource-constraints):

| Option | Description |
| --- | --- |
| `-m`, `--memory=""` | Memory limit (`<number>[<unit>]`, unit `b`, `k`, `m`, `g`). Minimum is 6M. |
| `--memory-swap=""` | Total memory limit (memory + swap). |
| `--memory-reservation=""` | Memory soft limit. |
| `-c`, `--cpu-shares=0` | CPU shares (relative weight). |
| `--cpus=0.000` | Number of CPUs (fractional). 0.000 means no limit. |
| `--cpu-period=0` / `--cpu-quota=0` | CPU CFS period / quota. |
| `--cpuset-cpus=""` / `--cpuset-mems=""` | CPUs / memory nodes allowed (`0-3`, `0,1`). `--cpuset-mems` only effective on NUMA systems. |
| `--cpu-rt-period=0` / `--cpu-rt-runtime=0` | CPU real-time period / runtime, in microseconds. |
| `--blkio-weight=0` | Block IO weight, 10 to 1000. |
| `--blkio-weight-device=""` | `DEVICE_NAME:WEIGHT`. |
| `--device-read-bps` / `--device-write-bps` | `<device-path>:<number>[<unit>]` with unit `kb`, `mb`, `gb`. |
| `--device-read-iops` / `--device-write-iops` | `<device-path>:<number>`. |
| `--oom-kill-disable=false` | Disable the OOM killer for the container. |
| `--oom-score-adj=0` | Tune OOM preferences (-1000 to 1000). |
| `--memory-swappiness=""` | Integer 0 to 100. |
| `--shm-size=""` | Size of `/dev/shm` (`<number><unit>`, `b`, `k`, `m`, `g`); defaults to `64m`. |

Privilege and capabilities:

| Option | Description |
| --- | --- |
| `--cap-add` | Add Linux capabilities. |
| `--cap-drop` | Drop Linux capabilities. |
| `--privileged` | Give extended privileges to this container. |
| `--device=[]` | Run devices inside the container without `--privileged`. Append `:rwm` subset (`r`, `w`, `m`) to restrict. |
| `--group-add` | Add additional groups to run as. |

Capabilities kept by default (can be dropped): `AUDIT_WRITE`, `CHOWN`, `DAC_OVERRIDE`, `FOWNER`, `FSETID`, `KILL`, `MKNOD`, `NET_BIND_SERVICE`, `NET_RAW`, `SETFCAP`, `SETGID`, `SETPCAP`, `SETUID`, `SYS_CHROOT`.

Capabilities not granted by default (can be added): `AUDIT_CONTROL`, `AUDIT_READ`, `BLOCK_SUSPEND`, `BPF`, `CHECKPOINT_RESTORE` (kernel 5.9+), `DAC_READ_SEARCH`, `IPC_LOCK`, `IPC_OWNER`, `LEASE`, `LINUX_IMMUTABLE`, `MAC_ADMIN`, `MAC_OVERRIDE`, `NET_ADMIN`, `NET_BROADCAST`, `PERFMON`, `SYS_ADMIN`, `SYS_BOOT`, `SYS_MODULE`, `SYS_NICE`, `SYS_PACCT`, `SYS_PTRACE`, `SYS_RAWIO`, `SYS_RESOURCE`, `SYS_TIME`, `SYS_TTY_CONFIG`, `SYSLOG`, `WAKE_ALARM`.

Overriding image defaults:

| Option | Description |
| --- | --- |
| `--entrypoint=""` | Overwrite the default entrypoint set by the image. Passing `--entrypoint` clears any default `CMD`; `--entrypoint=""` resets it. |
| `-P`, `--publish-all` | Publish all exposed ports to random host ports. Only ports flagged exposed (Dockerfile `EXPOSE` or `--expose`). |
| `-p`, `--publish` | Map a single port or range of container ports to the host. Use `docker port` to see the mapping. |
| `-e` | Set an environment variable; naming a variable without a value propagates the host value. |
| `--health-cmd` | Command to run to check health. |
| `--health-interval` | Time between running the check. |
| `--health-retries` | Consecutive failures needed to report unhealthy. |
| `--health-timeout` | Maximum time to allow one check to run. |
| `--health-start-period` | Start period for the container to initialize before starting health-retries countdown. |
| `--health-start-interval` | Time between running the check during the start period. |
| `--no-healthcheck` | Disable any container-specified `HEALTHCHECK`. |
| `-u`, `--user` | `[ user \| user:group \| uid \| uid:gid \| user:gid \| uid:group ]`. Numeric ID range 0-2147483647; a username must exist in the container. |
| `-w`, `--workdir` | Override the working directory; created if it doesn't exist. |

Environment variables set for Linux containers: `HOME` (based on `USER`), `HOSTNAME`, `PATH`, `TERM` (`xterm` if a pseudo-TTY is allocated). None are set for Windows containers.

## Notes

- Docker (OCI) containers are distinct from Proxmox LXC containers (proxmox-ve), `ModelContainer` (apple-data), `CKContainer` (apple-app-services), and item containers in the windows-* skills.
- You might need `sudo` unless an administrator creates a Unix group `docker` and adds users to it.
- `docker exec` expects a container identifier (name or ID), not an image reference. Use `docker ps -q --filter ancestor=nginx:alpine` to find container IDs by image.
- Containers on the same custom network can reach each other by container name as DNS hostname.
- Data in a container's writable layer is ephemeral. Volume names must start with an alphanumeric character followed by `a-z0-9`, `_`, `.` or `-`; `target` must be an absolute path.
- By default bind mounts require the source path to exist on the daemon host (error otherwise); `bind-create-src` creates it. Bind mounts are read-write by default.
- `--memory-swap` semantics: unset with `-m` set means swap equals memory (total 2x); `-1` means unlimited swap; equal to `--memory` means no swap.
- Always set `--memory-reservation` below the hard limit. Only disable the OOM killer on containers that also set `-m`.
- `--cpus=0.5` on 1 CPU equals `--cpu-period=50000 --cpu-quota=25000`. Default CFS period is 100ms.
- `--privileged` enables access to all host devices and reconfigures AppArmor or SELinux. For network interface changes prefer `--cap-add=NET_ADMIN`. FUSE mounts need both `--cap-add SYS_ADMIN` and `--device /dev/fuse`. The `CAP_` prefix is accepted; `ALL` is supported by both `--cap-add` and `--cap-drop`.
- The default seccomp profile adjusts to the selected capabilities.
- If the image sets both `ENTRYPOINT` and `CMD`, the command is appended as arguments to the entrypoint.

## Related

- [Resource constraints](./resource-constraints.md)
- [Start containers automatically](./restart-policies.md)
- [GPU access](./gpu.md)
- [docker container run](../cli-container/container-run.md)
- [Filter commands](./cli-filter.md)
