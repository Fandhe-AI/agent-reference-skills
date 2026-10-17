---
source: https://docs.docker.com/engine/daemon/troubleshoot/
---

# Troubleshooting the Docker daemon

Common daemon, networking, and volume problems and their fixes.

## Signature / Usage

```console
$ docker info
$ env | grep DOCKER_HOST
$ unset DOCKER_HOST
```

Workaround when `hosts` in `daemon.json` conflicts with systemd's `-H` (`/etc/systemd/system/docker.service.d/docker.conf`, then `sudo systemctl daemon-reload`):

```systemd
[Service]
ExecStart=
ExecStart=/usr/bin/dockerd
```

## Notes

- "Cannot connect to the Docker daemon. Is 'docker daemon' running on this host?": daemon not running, or the client targets an unreachable host (check `DOCKER_HOST`). Check running state with `docker info`, `sudo systemctl is-active docker`, or find the `dockerd` process.
- Flag vs `daemon.json` conflict: the daemon fails with "the following directives are specified both as a flag and in the configuration file: hosts". On Debian/Ubuntu with systemd `-H` is always passed, so override `ExecStart` as above; without a `hosts` entry or `-H` Docker then fails to start. `hosts` in `daemon.json` isn't supported on Docker Desktop for Windows/Mac.
- Out of memory: containers or the daemon may be killed by the kernel OOM killer; ensure adequate host memory.
- Kernel compatibility: kernel older than 3.10 or missing modules breaks Docker; run `check-config.sh` (Linux only) from the moby repository.
- Swap limit warning ("Your kernel does not support swap limit capabilities"): can be ignored; to enable on Ubuntu/Debian set `GRUB_CMDLINE_LINUX="cgroup_enable=memory swapaccount=1"` in `/etc/default/grub`, run `sudo update-grub`, reboot. Overhead is about 1% of memory and 10% overall performance degradation.
- IP forwarding: with systemd-network and systemd 220+, `net.ipv4.conf.<interface>.forwarding` defaults to off; add `IPForward=kernel` (or `true`) in the `[Network]` section of the interface `.network` file on RHEL/CentOS/Fedora.
- DNS resolver warning (local `127.0.0.1` resolver found in `resolv.conf`): set `"dns": ["8.8.8.8", "8.8.4.4"]` in `daemon.json` and restart, or turn off `dnsmasq` (Ubuntu: comment `dns=dnsmasq` in `/etc/NetworkManager/NetworkManager.conf`; RHEL/CentOS/Fedora: stop and disable `dnsmasq`). Include at least one DNS server that resolves public addresses.
- Networks disappearing (`docker0` or custom networks): another service may modify Docker interfaces. Uninstall `netscript`; mark Docker interfaces un-managed (NetworkManager: `/etc/network/interfaces.d/20-docker0` with `iface docker0 inet manual`; systemd-networkd: `/etc/systemd/network/docker.network` with `[Match] Name=docker0 br-* veth*` and `[Link] Unmanaged=yes`); with Netplan via cloud-init add a `/etc/netplan/50-cloud-init.yml` config and `sudo netplan apply`.
- "Unable to remove filesystem": caused by a container (e.g. cAdvisor) bind-mounting `/var/lib/docker/`; find the process with `lsof` and stop that container, then retry removal.

## Related

- [Read the daemon logs](./daemon-logs.md)
- [Configure remote access for Docker daemon](./remote-access.md)
- [dockerd](./dockerd.md)
