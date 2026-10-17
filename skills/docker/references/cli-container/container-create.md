---
source: https://docs.docker.com/reference/cli/docker/container/create/
---

# docker container create

Create a new container without starting it. Alias: `docker create`.

## Signature / Usage

```console
$ docker container create [OPTIONS] IMAGE [COMMAND] [ARG...]

$ docker container create -i -t --name mycontainer alpine
$ docker container start --attach -i mycontainer
```

## Options / Props

Most options are shared with `docker run` (see [docker container run](./container-run.md)).

| Option | Default | Description |
| --- | --- | --- |
| `--add-host` |  | Add a custom host-to-IP mapping (host:ip) |
| `--annotation` |  | API 1.43+ Add an annotation to the container (passed through to the OCI runtime) |
| `-a`, `--attach` |  | Attach to STDIN, STDOUT or STDERR |
| `--blkio-weight` |  | Block IO (relative weight), between 10 and 1000, or 0 to disable (default 0) |
| `--blkio-weight-device` |  | Block IO weight (relative device weight) |
| `--cap-add` |  | Add Linux capabilities |
| `--cap-drop` |  | Drop Linux capabilities |
| `--cgroup-parent` |  | Optional parent cgroup for the container |
| `--cgroupns` |  | API 1.41+ Cgroup namespace to use (host\|private); `''` uses the daemon's default-cgroupns-mode (default) |
| `--cidfile` |  | Write the container ID to the file |
| `--cpu-count` |  | CPU count (Windows only) |
| `--cpu-percent` |  | CPU percent (Windows only) |
| `--cpu-period` |  | Limit CPU CFS (Completely Fair Scheduler) period |
| `--cpu-quota` |  | Limit CPU CFS (Completely Fair Scheduler) quota |
| `--cpu-rt-period` |  | API 1.25+ Limit CPU real-time period in microseconds |
| `--cpu-rt-runtime` |  | API 1.25+ Limit CPU real-time runtime in microseconds |
| `-c`, `--cpu-shares` |  | CPU shares (relative weight) |
| `--cpus` |  | API 1.25+ Number of CPUs |
| `--cpuset-cpus` |  | CPUs in which to allow execution (0-3, 0,1) |
| `--cpuset-mems` |  | MEMs in which to allow execution (0-3, 0,1) |
| `--device` |  | Add a host device to the container |
| `--device-cgroup-rule` |  | Add a rule to the cgroup allowed devices list |
| `--device-read-bps` |  | Limit read rate (bytes per second) from a device |
| `--device-read-iops` |  | Limit read rate (IO per second) from a device |
| `--device-write-bps` |  | Limit write rate (bytes per second) to a device |
| `--device-write-iops` |  | Limit write rate (IO per second) to a device |
| `--dns` |  | Set custom DNS servers |
| `--dns-option` |  | Set DNS options |
| `--dns-search` |  | Set custom DNS search domains |
| `--domainname` |  | Container NIS domain name |
| `--entrypoint` |  | Overwrite the default ENTRYPOINT of the image |
| `-e`, `--env` |  | Set environment variables |
| `--env-file` |  | Read in a file of environment variables |
| `--expose` |  | Expose a port or a range of ports |
| `--gpus` |  | API 1.40+ GPU devices to add to the container ('all' to pass all GPUs) |
| `--group-add` |  | Add additional groups to join |
| `--health-cmd` |  | Command to run to check health |
| `--health-interval` |  | Time between running the check (ms\|s\|m\|h) (default 0s) |
| `--health-retries` |  | Consecutive failures needed to report unhealthy |
| `--health-start-interval` |  | API 1.44+ Time between running the check during the start period (ms\|s\|m\|h) (default 0s) |
| `--health-start-period` |  | API 1.29+ Start period for the container to initialize before starting health-retries countdown (ms\|s\|m\|h) (default 0s) |
| `--health-timeout` |  | Maximum time to allow one check to run (ms\|s\|m\|h) (default 0s) |
| `--help` |  | Print usage |
| `-h`, `--hostname` |  | Container host name |
| `--init` |  | API 1.25+ Run an init inside the container that forwards signals and reaps processes |
| `-i`, `--interactive` |  | Keep STDIN open even if not attached |
| `--io-maxbandwidth` |  | Maximum IO bandwidth limit for the system drive (Windows only) |
| `--io-maxiops` |  | Maximum IOps limit for the system drive (Windows only) |
| `--ip` | `<nil>` | IPv4 address (e.g., 172.30.100.104) |
| `--ip6` | `<nil>` | IPv6 address (e.g., 2001:db8::33) |
| `--ipc` |  | IPC mode to use |
| `--isolation` |  | Container isolation technology |
| `-l`, `--label` |  | Set meta data on a container |
| `--label-file` |  | Read in a line delimited file of labels |
| `--link` |  | Add link to another container |
| `--link-local-ip` |  | Container IPv4/IPv6 link-local addresses |
| `--log-driver` |  | Logging driver for the container |
| `--log-opt` |  | Log driver options |
| `--mac-address` |  | Container MAC address (e.g., 92:d0:c6:0a:29:33) |
| `-m`, `--memory` |  | Memory limit |
| `--memory-reservation` |  | Memory soft limit |
| `--memory-swap` |  | Swap limit equal to memory plus swap: '-1' to enable unlimited swap |
| `--memory-swappiness` | `-1` | Tune container memory swappiness (0 to 100) |
| `--mount` |  | Attach a filesystem mount to the container |
| `--name` |  | Assign a name to the container |
| `--network` |  | Connect a container to a network |
| `--network-alias` |  | Add network-scoped alias for the container |
| `--no-healthcheck` |  | Disable any container-specified HEALTHCHECK |
| `--oom-kill-disable` |  | Disable OOM Killer |
| `--oom-score-adj` |  | Tune host's OOM preferences (-1000 to 1000) |
| `--pid` |  | PID namespace to use |
| `--pids-limit` |  | Tune container pids limit (set -1 for unlimited) |
| `--platform` |  | API 1.32+ Set platform if server is multi-platform capable |
| `--privileged` |  | Give extended privileges to this container |
| `-p`, `--publish` |  | Publish a container's port(s) to the host |
| `-P`, `--publish-all` |  | Publish all exposed ports to random ports |
| `--pull` | `missing` | Pull image before creating (`always`, `missing`, `never`) |
| `-q`, `--quiet` |  | Suppress the pull output |
| `--read-only` |  | Mount the container's root filesystem as read only |
| `--restart` | `no` | Restart policy to apply when a container exits |
| `--rm` |  | Automatically remove the container and its associated anonymous volumes when it exits |
| `--runtime` |  | Runtime to use for this container |
| `--security-opt` |  | Security Options |
| `--shm-size` |  | Size of /dev/shm |
| `--stop-signal` |  | Signal to stop the container |
| `--stop-timeout` |  | API 1.25+ Timeout (in seconds) to stop a container |
| `--storage-opt` |  | Storage driver options for the container |
| `--sysctl` |  | Sysctl options |
| `--tmpfs` |  | Mount a tmpfs directory |
| `-t`, `--tty` |  | Allocate a pseudo-TTY |
| `--ulimit` |  | Ulimit options |
| `--umask` | `<nil>` | API 1.56+ Set umask for the container |
| `--use-api-socket` |  | **experimental (CLI)** Bind mount Docker API socket and required auth |
| `-u`, `--user` |  | Username or UID (format: `<name\|uid>[:<group\|gid>]`) |
| `--userns` |  | User namespace to use |
| `--uts` |  | UTS namespace to use |
| `-v`, `--volume` |  | Bind mount a volume |
| `--volume-driver` |  | Optional volume driver for the container |
| `--volumes-from` |  | Mount volumes from the specified container(s) |
| `-w`, `--workdir` |  | Working directory inside the container |

## Notes

- The daemon creates a writeable container layer over the image and prepares it to run the command; the container ID is printed to `STDOUT`. Similar to `docker run -d` except the container is never started. Initial status is `created`. Start it later with `docker container start`.
- `docker run` performs a `docker create` before starting.
- Container volumes are initialized during the create phase (also for `docker run`):

```console
$ docker create -v /data --name data ubuntu
$ docker run --rm --volumes-from data ubuntu ls -la /data
```

- Distinct from other products' "container" concepts: LXC containers in proxmox-ve, ModelContainer in apple-data, CKContainer in apple-app-services, and item containers in windows-* skills are unrelated to Docker containers.
- `--gpus` passes GPUs to the container; installing the NVIDIA Container Toolkit is covered by dgx-spark; the ROCm container setup by amd-rocm.

## Related

- [docker container run](./container-run.md)
- [docker container start](./container-start.md)
