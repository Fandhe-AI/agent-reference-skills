---
source: https://docs.docker.com/reference/cli/docker/container/run/
---

# docker container run

Create and run a new container from an image. Alias: `docker run`.

## Signature / Usage

```console
$ docker container run [OPTIONS] IMAGE [COMMAND] [ARG...]

$ docker run --name test -d nginx:alpine
```

Runs a command in a new container, pulling the image if needed and starting the container. A stopped container can be restarted with all its previous changes intact using `docker start`; `docker ps -a` lists all containers including stopped ones.

## Options / Props

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
| `-d`, `--detach` |  | Run container in background and print container ID |
| `--detach-keys` |  | Override the key sequence for detaching a container |
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
| `--pull` | `missing` | Pull image before running (`always`, `missing`, `never`) |
| `-q`, `--quiet` |  | Suppress the pull output |
| `--read-only` |  | Mount the container's root filesystem as read only |
| `--restart` | `no` | Restart policy to apply when a container exits |
| `--rm` |  | Automatically remove the container and its associated anonymous volumes when it exits |
| `--runtime` |  | Runtime to use for this container |
| `--security-opt` |  | Security Options |
| `--shm-size` |  | Size of /dev/shm |
| `--sig-proxy` | `true` | Proxy received signals to the process |
| `--stop-signal` |  | Signal to stop the container |
| `--stop-timeout` |  | API 1.25+ Timeout (in seconds) to stop a container |
| `--storage-opt` |  | Storage driver options for the container |
| `--sysctl` |  | Sysctl options |
| `--tmpfs` |  | Mount a tmpfs directory |
| `-t`, `--tty` |  | Allocate a pseudo-TTY |
| `--ulimit` |  | Ulimit options |
| `--umask` | `<nil>` | API 1.56+ Set umask for the container |
| `--use-api-socket` |  | Bind mount Docker API socket and required auth |
| `-u`, `--user` |  | Username or UID (format: `<name\|uid>[:<group\|gid>]`) |
| `--userns` |  | User namespace to use |
| `--uts` |  | UTS namespace to use |
| `-v`, `--volume` |  | Bind mount a volume |
| `--volume-driver` |  | Optional volume driver for the container |
| `--volumes-from` |  | Mount volumes from the specified container(s) |
| `-w`, `--workdir` |  | Working directory inside the container |

## Notes

Naming, identity, lifecycle:

- `--name`: without it the daemon assigns a random name (e.g. `vibrant_cannon`). On a user-defined bridge network other containers can refer to the container by name via DNS (`docker run --name test --net mynet -d nginx:alpine`, then `docker run --net mynet busybox:latest ping test`).
- `--cidfile`: Docker creates a new file and writes the container ID to it. If the file already exists, Docker returns an error. Docker closes the file when `docker run` exits.
- `-d`: a detached container stops when its root process exits (with or without `--rm`). With `-d --rm` the container is additionally removed when it exits or when the daemon exits, whichever happens first. Don't pass `service x start` to a detached container; use e.g. `docker run -d -p 80:80 my_image nginx -g 'daemon off;'`. For I/O with a detached container use network connections or shared volumes.
- `--rm`: also removes anonymous volumes (like `docker rm -v`); named volumes are not removed. `docker run --rm -v /foo -v awesome:/bar busybox top` removes `/foo` but not `/bar`. Same logic for `--volumes-from`.
- `--restart` policies:

| Flag | Description |
| --- | --- |
| `no` | Don't automatically restart the container. (Default) |
| `on-failure[:max-retries]` | Restart if it exits with a non-zero exit code, optionally limited by `:max-retries`. Doesn't restart the container if the daemon restarts. |
| `always` | Always restart the container if it stops. If manually stopped, restarted only when the daemon restarts or the container itself is manually restarted. |
| `unless-stopped` | Like `always`, except when the container is stopped (manually or otherwise) it isn't restarted even after the daemon restarts. |

- Restart delay doubles from 100 ms (100, 200, 400, ...) up to a maximum of 1 minute, until the `on-failure` limit is hit or `docker stop` / `docker rm -f`. A successful restart (runs at least 10 seconds) resets the delay to 100 ms. A maximum count is valid only for `on-failure`. Restart count: `docker inspect -f "{{ .RestartCount }}" my-container`; last start: `docker inspect -f "{{ .State.StartedAt }}" my-container`. Combining `--restart` with `--rm` results in an error. On restart, attached clients are disconnected.
- `--stop-signal`: name `SIG<NAME>` or unsigned number; default is the image's `STOPSIGNAL`, or `SIGTERM`. `--stop-timeout`: seconds to wait before `SIGKILL`; `-1` waits indefinitely; the daemon default is 10 s (Linux) or 30 s (Windows).
- `--init`: runs an init as PID 1 (reaps zombie processes). The default is the first `docker-init` executable in the daemon's PATH, backed by tini.

Namespaces:

- `--pid`: `container:<name|id>` joins another container's PID namespace; `host` uses the host's. Example: `docker run --rm -it --pid=host alpine`, then `apk add --quiet htop`. To join another container: `docker run --rm -it --pid=container:my-nginx --cap-add SYS_PTRACE --security-opt seccomp=unconfined alpine`.
- `--userns`: if user namespaces are enabled on the daemon, `--userns=host` disables remapping for one container. `host` is the only valid value.
- `--uts`: `host` shares the host's UTS namespace. `--hostname` and `--domainname` can't be combined with `--uts=host`.
- `--ipc` values: `""` daemon default; `none` private IPC namespace with /dev/shm not mounted; `private`; `shareable`; `container:<name-or-ID>` joins another "shareable" container's IPC namespace; `host`. The daemon default is `private` or `shareable` depending on version and configuration.
- `--cgroup-parent` runs the container under a specific cgroup.

Privilege and security:

- `--privileged` enables all Linux kernel capabilities, disables the default seccomp and AppArmor profiles and the SELinux process label, grants access to all host devices, and makes `/sys` and cgroups mounts read-write. It exists for special cases like Docker-in-Docker. A privileged container is not a securely sandboxed process; prefer granting individual capabilities with `--cap-add`.
- `--security-opt` options:

| Option | Description |
| --- | --- |
| `label=user:USER` / `label=role:ROLE` / `label=type:TYPE` / `label=level:LEVEL` | Set the SELinux label user / role / type / level |
| `label=disable` | Turn off label confinement |
| `apparmor=PROFILE` | Set the apparmor profile |
| `no-new-privileges=true` | Disable container processes from gaining new privileges (`su` / `sudo` stop working; seccomp filters apply later) |
| `seccomp=unconfined` | Turn off seccomp confinement |
| `seccomp=builtin` | Use the default (built-in) seccomp profile |
| `seccomp=profile.json` | White-listed syscalls seccomp JSON file used as a seccomp filter |
| `systempaths=unconfined` | Turn off confinement for system paths (masked paths, read-only paths) |

- Automatic translation of MLS labels isn't supported. On Windows, `--security-opt` can specify `credentialspec` as `file://spec.txt` or `registry://keyname`.
- `--device`: `--device=/dev/sdc:/dev/xvdc`; default permissions are `read`, `write` and `mknod`, overridable with a third `:rwm` field (ignored if privileged). Not safe with ephemeral devices. On Windows the form is `--device=<IdType>/<Id>` with IdType `class` and a device interface class GUID, only for process-isolated containers (error under `hyperv`).
- CDI devices: `docker run --device=vendor.com/class=device-name --rm -it ubuntu`. CDI is Linux containers only and enabled by default since Docker Engine 28.3.0. Requires a valid CDI spec on the daemon host and the CDI feature enabled (see dockerd reference).
- `--device-cgroup-rule='c 42:* rmw'` allows access to dynamically created devices; initially present devices must still be added explicitly.
- `--gpus`: GPU access requires the NVIDIA container runtime to be installed first; `docker run -it --rm --gpus all ubuntu nvidia-smi`; specific GPUs via `--gpus device=GPU-<uuid>` or `--gpus '"device=0,2"'`. A GPU can also be given as a CDI device with `--device`. Installing the NVIDIA Container Toolkit is covered by dgx-spark; the ROCm container setup by amd-rocm.

Storage and filesystem:

- `-v`: `docker run -v "$(pwd):$(pwd)" -w "$(pwd)" -i -t ubuntu pwd` (upstream leaves the expansion unquoted; quoted here to avoid word splitting). Since Docker Engine 23 relative host paths work (`-v ./content:/content`). A missing host directory of a bind mount is created automatically on the host.
- `--mount` supports most `-v` options with a different syntax; `--volume` is not planned for deprecation, but `--mount` is recommended: `docker run -t -i --mount type=bind,src=/data,dst=/data busybox sh`.
- `--read-only` mounts the root filesystem read only, so writes go only to specified volumes: `docker run --read-only -v /icanwrite busybox touch /icanwrite/here`.
- `--tmpfs`: options are identical to `mount -t tmpfs -o`: `docker run -d --tmpfs /run:rw,noexec,nosuid,size=65536k my_image`.
- `--volumes-from`: mounts all defined volumes from referenced containers; suffix `:ro` / `:rw`. `:z` (shared label) / `:Z` (private unshared label) relabel volume content for SELinux.
- `--storage-opt size=120G` is only available for `btrfs`, `overlay2`, `windowsfilter`, and `zfs`. For `overlay2` it requires an `xfs` backing filesystem mounted with `pquota`.
- Windows containers: a volume or bind-mount destination must be a non-existing or empty directory, or a drive other than `C:`; bind-mount sources must be local directories, not files.
- `-w`: runs the command in the given directory; if it doesn't exist, Docker creates it inside the container.

Networking:

- `-p 127.0.0.1:80:8080/tcp` binds container port 8080 to TCP port 80 on `127.0.0.1`; `udp` and `sctp` also supported. Without an IP (e.g. `-p 80:80`) the port is published on all interfaces (`0.0.0.0`), externally accessible, even if UFW blocks that port, since Docker manages its own iptables rules.
- `--expose 80` exposes a port without publishing it. `-P` publishes all explicitly exposed ports (Dockerfile `EXPOSE` or `--expose`) to random ports in the range of `/proc/sys/net/ipv4/ip_local_port_range`.
- `--network`: repeat for multiple networks (`--network=my-net1 --network=my-net2`). The default bridge network only allows communication by internal IP; user-created bridge networks provide DNS by container name. Static IPs need a network created with `--subnet`. Extended syntax options (comma separated):

| Option | Top-level equivalent | Description |
| --- | --- | --- |
| `name` |  | The name of the network (mandatory) |
| `alias` | `--network-alias` | Add network-scoped alias for the container |
| `ip` | `--ip` | IPv4 address |
| `ip6` | `--ip6` | IPv6 address |
| `mac-address` | `--mac-address` | Container MAC address |
| `link-local-ip` | `--link-local-ip` | Container IPv4/IPv6 link-local addresses |
| `driver-opt` | `docker network connect --driver-opt` | Network driver options |
| `gw-priority` |  | Highest gw-priority provides the default gateway. Accepts positive and negative values |

- Per-interface sysctls (`net.ipv4.`, `net.ipv6.`, `net.mpls.`) via `driver-opt` label `com.docker.network.endpoint.sysctls`; the interface name must be the string `IFNAME`. Network drivers may restrict modifiable sysctls.
- `--add-host my-hostname=8.8.8.8` adds to `/etc/hosts`; IPv6 in square brackets; `:` separator also accepted. The special `host-gateway` value resolves to the host's internal IP, conventionally with hostname `host.docker.internal`: `docker run --add-host host.docker.internal=host-gateway curlimages/curl -s host.docker.internal:8000/hello`.

Streams, logging, environment:

- `-a` / `--attach` binds to `STDIN`, `STDOUT` or `STDERR`: `docker run -a stdin -a stdout -i -t ubuntu /bin/bash`; `echo "test" | docker run -i -a stdin ubuntu cat -`.
- `-i` keeps STDIN open: `echo hello | docker run --rm -i busybox cat`. `-t` allocates a pseudo-TTY (e.g. hides password echo in `docker run -it debian passwd root`); `-t` can be used without `-i`.
- `--detach-keys` format: a letter `[a-Z]`, or `ctrl-` combined with `a-z`, `@`, `[`, `\\`, `_`, `^`. A default for all containers can be set in the CLI configuration file.
- `--log-driver`: per-container logging driver; `--log-driver=none` disables logging (`docker logs` then errors: configured logging driver does not support reading).
- `-e` / `--env` / `--env-file`: `docker run -e MYVAR1 --env MYVAR2=foo --env-file ./env.list ubuntu bash`. Without `=` the CLI takes the value from the local environment; if not exported, the variable is unset in the container. Env-file syntax: `<variable>=value` or `<variable>`; lines beginning with `#` are comments, a `#` elsewhere is part of the value.
- `-l` / `--label` / `--label-file`: `docker run -l my-label --label com.example.foo=bar ubuntu bash`. Duplicate keys: the last value wins. Labels are not visible to processes in the container. Label-file lines are delimited by EOL; multiple `--label-file` flags allowed.
- `--pull`: `missing` (default; pull only if not in the local cache), `never` (error if missing), `always`.
- `--ulimit <type>=<soft>[:<hard>]`: without a hard limit the soft value is used for both; with no values they are inherited from the daemon's default ulimits. The `as` option is deprecated. Supported types: `core`, `cpu`, `data`, `fsize`, `locks`, `memlock`, `msgqueue`, `nice`, `nofile`, `nproc`, `rss`, `rtprio`, `rttime`, `sigpending`, `stack`. `nproc` limits processes per user, not per container.
- `--umask`: octal value; e.g. `022` yields `644` files and `755` directories. Without it the OCI runtime default applies (runc: `0022`, implementation-defined). Applies to the entrypoint, `docker exec` processes, and healthchecks (honored by runc). `docker run --rm --umask 077 busybox sh -c umask` prints `0077`.
- `--isolation`: on Linux only `default` (namespaces). On Windows: `default` (daemon `--exec-opt` or system default), `process` (shared-kernel; default on Windows server; needs the same kernel version as the host), `hyperv` (default on Windows client).
- `-m` / `--memory` sets an upper limit via the cgroup on Linux. On Windows, with `process` isolation the full host memory is reported; with `hyperv` a utility VM large enough for the limit is created.
- `--sysctl net.ipv4.ip_forward=1`: only namespaced sysctls. IPC namespace: `kernel.msgmax`, `kernel.msgmnb`, `kernel.msgmni`, `kernel.sem`, `kernel.shmall`, `kernel.shmmax`, `kernel.shmmni`, `kernel.shm_rmid_forced`, and `fs.mqueue.*` (not allowed with `--ipc=host`). Network namespace: `net.*` (not allowed with `--network=host`).
- Distinct from other products' "container" concepts: LXC containers in proxmox-ve, ModelContainer in apple-data, CKContainer in apple-app-services, and item containers in windows-* skills are unrelated to Docker containers.

## Related

- [docker container create](./container-create.md)
- [docker container exec](./container-exec.md)
- [docker container update](./container-update.md)
- [docker container ls](./container-ls.md)
