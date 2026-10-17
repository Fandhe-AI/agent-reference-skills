---
source: https://docs.docker.com/reference/cli/dockerd/
---

# dockerd

`dockerd` is the persistent process that manages containers; Docker uses different binaries for the daemon and the client. This page covers the daemon flags, `daemon.json` keys, sockets, runtimes, and reload behavior.

## Signature / Usage

```markdown
Usage:	dockerd [OPTIONS]

A self-sufficient runtime for containers.

Options:
      --add-runtime runtime                   Register an additional OCI compatible runtime (default [])
      --allow-direct-routing                  Allow remote access to published ports on container IP addresses
      --apparmor-profile string               Path to AppArmor profile template
      --authorization-plugin list             Authorization plugins to load
      --bip string                            IPv4 address for the default bridge
      --bip6 string                           IPv6 address for the default bridge
  -b, --bridge string                         Attach containers to a network bridge
      --bridge-accept-fwmark string           In bridge networks, accept packets with this firewall mark/mask
      --cdi-spec-dir list                     CDI specification directories to use
      --cgroup-parent string                  Set parent cgroup for all containers
      --config-file string                    Daemon configuration file (default "/etc/docker/daemon.json")
      --containerd string                     containerd grpc address
      --containerd-namespace string           Containerd namespace to use (default "moby")
      --containerd-plugins-namespace string   Containerd namespace to use for plugins (default "plugins.moby")
      --cpu-rt-period int                     Limit the CPU real-time period in microseconds for the
                                              parent cgroup for all containers (not supported with cgroups v2)
      --cpu-rt-runtime int                    Limit the CPU real-time runtime in microseconds for the
                                              parent cgroup for all containers (not supported with cgroups v2)
      --cri-containerd                        start containerd with cri
      --data-root string                      Root directory of persistent Docker state (default "/var/lib/docker")
  -D, --debug                                 Enable debug mode
      --default-address-pool pool-options     Default address pools for node specific local networks
      --default-cgroupns-mode string          Default mode for containers cgroup namespace ("host" | "private") (default "private")
      --default-gateway ip                    Default gateway IPv4 address for the default bridge network
      --default-gateway-v6 ip                 Default gateway IPv6 address for the default bridge network
      --default-ipc-mode string               Default mode for containers ipc ("shareable" | "private") (default "private")
      --default-network-opt mapmap            Default network options (default map[])
      --default-runtime string                Default OCI runtime for containers (default "runc")
      --default-shm-size bytes                Default shm size for containers (default 64MiB)
      --default-stop-timeout int              Set the default container stop timeout in seconds (0 to terminate immediately) (default 10)
      --default-ulimit ulimit                 Default ulimits for containers (default [])
      --dns list                              DNS server to use
      --dns-opt list                          DNS options to use
      --dns-search list                       DNS search domains to use
      --exec-opt list                         Runtime execution options
      --exec-root string                      Root directory for execution state files (default "/var/run/docker")
      --experimental                          Enable experimental features
      --feature map                           Enable feature in the daemon
      --firewall-backend string               Firewall backend to use, iptables or nftables
      --fixed-cidr string                     IPv4 subnet for the default bridge network
      --fixed-cidr-v6 string                  IPv6 subnet for the default bridge network
  -G, --group string                          Group for the unix socket (default "docker")
      --help                                  Print usage
  -H, --host list                             Daemon socket(s) to connect to
      --host-gateway-ip list                  IP addresses that the special 'host-gateway' string in --add-host resolves to.
                                              Defaults to the IP addresses of the default bridge
      --http-proxy string                     HTTP proxy URL to use for outgoing traffic
      --https-proxy string                    HTTPS proxy URL to use for outgoing traffic
      --icc                                   Enable inter-container communication for the default bridge network (default true)
      --init                                  Run an init in the container to forward signals and reap processes
      --init-path string                      Path to the docker-init binary
      --insecure-registry list                Enable insecure registry communication
      --ip ip                                 Host IP for port publishing from the default bridge network (default 0.0.0.0)
      --ip-forward                            Enable IP forwarding in system configuration (default true)
      --ip-forward-no-drop                    Do not set the filter-FORWARD policy to DROP when enabling IP forwarding
      --ip-masq                               Enable IP masquerading for the default bridge network (default true)
      --ip6tables                             Enable addition of ip6tables rules (default true)
      --iptables                              Enable addition of iptables rules (default true)
      --ipv6                                  Enable IPv6 networking for the default bridge network
      --label list                            Set key=value labels to the daemon
      --live-restore                          Enable live restore of docker when containers are still running
      --log-driver string                     Default driver for container logs (default "json-file")
      --log-format string                     Set the logging format ("text"|"json") (default "text")
  -l, --log-level string                      Set the logging level ("debug"|"info"|"warn"|"error"|"fatal") (default "info")
      --log-opt map                           Default log driver options for containers (default map[])
      --max-concurrent-downloads int          Set the max concurrent downloads (default 3)
      --max-concurrent-uploads int            Set the max concurrent uploads (default 5)
      --max-download-attempts int             Set the max download attempts for each pull (default 5)
      --metrics-addr string                   Set default address and port to serve the metrics api on
      --mtu int                               Set the MTU for the default "bridge" network (default 1500)
      --network-control-plane-mtu int         Network Control plane MTU (default 1500)
      --no-new-privileges                     Set no-new-privileges by default for new containers
      --no-proxy string                       Comma-separated list of hosts or IP addresses for which the proxy is skipped
      --node-generic-resource list            Advertise user-defined resource
  -p, --pidfile string                        Path to use for daemon PID file (default "/var/run/docker.pid")
      --raw-logs                              Full timestamps without ANSI coloring
      --registry-mirror list                  Preferred registry mirror
      --rootless                              Enable rootless mode; typically used with RootlessKit
      --seccomp-profile string                Path to seccomp profile. Set to "unconfined" to disable the default seccomp profile (default "builtin")
      --selinux-enabled                       Enable selinux support
      --shutdown-timeout int                  Set the default shutdown timeout (default 15)
  -s, --storage-driver string                 Storage driver to use
      --storage-opt list                      Storage driver options
      --swarm-default-advertise-addr string   Set default address or interface for swarm advertised address
      --tls                                   Use TLS; implied by --tlsverify
      --tlscacert string                      Trust certs signed only by this CA (default "~/.docker/ca.pem")
      --tlscert string                        Path to TLS certificate file (default "~/.docker/cert.pem")
      --tlskey string                         Path to TLS key file (default "~/.docker/key.pem")
      --tlsverify                             Use TLS and verify the remote
      --userland-proxy                        Use userland proxy for loopback traffic (default true)
      --userland-proxy-path string            Path to the userland proxy binary
      --userns-remap string                   User/Group setting for user namespaces
      --validate                              Validate daemon configuration and exit
  -v, --version                               Print version information and quit
```

Options with [] may be specified multiple times.

Validate a configuration file without starting the daemon (non-zero exit code on invalid files):

```console
$ dockerd --validate --config-file=/tmp/valid-config.json
configuration OK

$ echo $?
0
```

Socket options (`-H` accepts `tcp://[host]:[port][path]` or `unix://path`; `fd://` for systemd socket activation):

```console
$ sudo dockerd -H unix:///var/run/docker.sock -H tcp://192.168.59.106 -H tcp://10.10.10.2
```

## Options / Props

Environment variables supported by the `dockerd` daemon:

| Variable | Description |
| --- | --- |
| `DOCKER_CERT_PATH` | Location of your authentication keys. Used both by the `docker` CLI and the `dockerd` daemon. |
| `DOCKER_DRIVER` | The storage driver to use. |
| `DOCKER_RAMDISK` | If set this disables `pivot_root`. |
| `DOCKER_TLS_VERIFY` | When set Docker uses TLS and verifies the remote. Used both by the `docker` CLI and the `dockerd` daemon. |
| `DOCKER_TMPDIR` | Location for temporary files created by the daemon. |
| `HTTP_PROXY` | Proxy URL for HTTP requests unless overridden by NoProxy. |
| `HTTPS_PROXY` | Proxy URL for HTTPS requests unless overridden by NoProxy. |
| `MOBY_DISABLE_PIGZ` | Disables the use of `unpigz` to decompress layers in parallel when pulling images, even if it is installed. |
| `NO_PROXY` | Comma-separated values specifying hosts that should be excluded from proxying. |

Options that can be reconfigured at runtime (reload via `SIGHUP` on Linux, global event `Global\docker-daemon-config-$PID` on Windows):

| Option | Description |
| --- | --- |
| `debug` | Toggles debug mode of the daemon. |
| `labels` | Replaces the daemon labels with a new set of labels. |
| `live-restore` | Toggles live restore. |
| `max-concurrent-downloads` | Configures the max concurrent downloads for each pull. |
| `max-concurrent-uploads` | Configures the max concurrent uploads for each push. |
| `max-download-attempts` | Configures the max download attempts for each pull. |
| `default-runtime` | Configures the runtime to be used if not is specified at container creation. |
| `default-stop-timeout` | Configures the timeout for stopping containers that have no container-specific timeout. |
| `runtimes` | Configures the list of available OCI runtimes that can be used to run containers. |
| `authorization-plugin` | Specifies the authorization plugins to use. |
| `insecure-registries` | Specifies a list of registries that the daemon should consider insecure. |
| `registry-mirrors` | Specifies a list of registry mirrors. |
| `shutdown-timeout` | Configures the daemon's existing configuration timeout with a new timeout for shutting down all containers. |
| `features` | Enables or disables specific features. |

## Notes

- Daemon configuration file: `/etc/docker/daemon.json` on Linux, `%programdata%\docker\config\daemon.json` on Windows; keys use the flag names, with the plural for repeatable flags (e.g. `labels` for `--label`). The daemon fails to start if an option is set both as a flag and in the file, regardless of value.
- `-H` default: `unix:///var/run/docker.sock` (requires `root` or `docker` group membership). On systemd-based systems `-H` is already set, so the `hosts` key in `daemon.json` conflicts.
- A TCP socket gives un-encrypted, un-authenticated access to the daemon by default. Conventional ports: `2375` (un-encrypted), `2376` (encrypted). Only TLS 1.0 and higher is supported for HTTPS sockets.
- The Docker client honors `DOCKER_HOST` and can connect over SSH (`docker -H ssh://me@example.com ps`); public key authentication is required, password authentication is not supported.
- Proxy: command-line and `daemon.json` options (`http-proxy`, `https-proxy`, `no-proxy`; Docker Engine 23.0 or later) take precedence over environment variables.
- Storage drivers on Linux: `overlay2` (preferred, default), `fuse-overlayfs`, `btrfs`, `zfs`; Windows supports only `windowsfilter`. Per-driver `--storage-opt` options: `zfs.fsname`, `btrfs.min_space`, `overlay2.size` (xfs with `pquota` only), `size` (windowsfilter, default 20G).
- Runtimes: default is runc. Shims on `PATH` can be used directly (`docker run --runtime io.containerd.kata.v2`). Register others under `runtimes` with `runtimeType` (+ optional `options`) for containerd shims, or `path` (+ optional `runtimeArgs`) for runc drop-in replacements; `--add-runtime <runtime>=<path>` does not support runtime args. `--containerd /run/containerd/containerd.sock` runs against a standalone containerd.
- cgroup driver: `--exec-opt native.cgroupdriver=systemd|cgroupfs`; omitted means `cgroupfs` on cgroup v1 hosts and `systemd` on cgroup v2 hosts with systemd available. Windows isolation: `--exec-opt isolation=hyperv` (default `hyperv` on Windows client, `process` on Windows server).
- `--default-stop-timeout` default is `10` seconds on Linux and `30` on Windows; `0` terminates immediately, negative is invalid. It can be reloaded without restart.
- `--insecure-registry` is for testing only; v1 registry operations are no longer supported (except `search`).
- CDI is enabled by default since Docker Engine 28.3.0 (Linux containers only); default spec dirs `/etc/cdi/` and `/var/run/cdi`; set with `cdi-spec-dirs` / `--cdi-spec-dir`; disable with `"features": {"cdi": false}`.
- `--feature` and the `features` field in `daemon.json` must not both be used (error). Documented feature options: `containerd-snapshotter`, `windows-dns-proxy` (Windows only; flagged for removal in a future release).
- `--log-format` / `log-format` (`text` default, `json`) must be configured through only one of the flag or the file. `--metrics-addr 127.0.0.1:9323` serves Prometheus-format metrics at `/metrics`.
- Running multiple daemons on one host is experimental; each daemon needs distinct `--bridge`, `--exec-root`, `--data-root`, `--pidfile`, `--host`, `--iptables`, `--config-file`, and `--tls*` values.
- `default-network-opts` / `--default-network-opt driver=opt=value` set default driver options for new networks only; existing networks are unaffected.
- `host-gateway-ips` (JSON array) / repeated `--host-gateway-ip` set what the special `host-gateway` value of `--add-host` resolves to; a single `host-gateway-ip` string is kept for compatibility.
- Running behind an `HTTPS_PROXY`: append the proxy CA certificate to `/etc/pki/tls/certs/ca-bundle.crt` and start with `HTTPS_PROXY=http://username:password@proxy:port/ dockerd`.
- Experimental features: `--experimental` or `"experimental": true` in `daemon.json`.

## Related

- [Docker daemon configuration overview](./daemon-overview.md)
- [Daemon proxy configuration](./daemon-proxy.md)
- [Configure remote access for Docker daemon](./remote-access.md)
- [Live restore](./live-restore.md)
- [Alternative container runtimes](./alternative-runtimes.md)
- [Configure logging drivers](./logging-configure.md)
