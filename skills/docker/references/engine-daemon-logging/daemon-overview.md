---
source: https://docs.docker.com/engine/daemon/
---

# Docker daemon configuration overview

How to customize the Docker daemon, `dockerd`, with a JSON configuration file or startup flags. For users who installed Docker Engine manually; Docker Desktop users use its settings page.

## Signature / Usage

```console
$ dockerd --debug \
  --tls=true \
  --tlscert=/var/docker/server.pem \
  --tlskey=/var/docker/serverkey.pem \
  --host tcp://192.168.59.3:2376
```

Change the data directory:

```json
{
  "data-root": "/mnt/docker-data"
}
```

## Options / Props

Default configuration file location:

| OS and configuration | File location |
| --- | --- |
| Linux, regular setup | `/etc/docker/daemon.json` |
| Linux, rootless mode | `~/.config/docker/daemon.json` |
| Windows | `C:\ProgramData\docker\config\daemon.json` |

## Notes

- The JSON file is the preferred option. Flags and the file may be combined only if the same option is not set in both; otherwise the daemon won't start and prints an error.
- Rootless mode respects `XDG_CONFIG_HOME` (`$XDG_CONFIG_HOME/docker/daemon.json`). `dockerd --config-file` sets an explicit location.
- Starting with Docker Engine 29.5, `dockerd` on Windows can listen on a Unix socket (optional; the default Windows endpoint remains the `npipe` named pipe): `dockerd -H unix://C:/Users/<USER>/docker.sock --group docker-users` from an elevated PowerShell session. Without `--group`, only Administrators and `SYSTEM` can access the socket. Use a path in the user profile; a socket created directly under `C:\` can inherit a high integrity level that blocks access. Client: `docker -H unix://C:/Users/<USER>/docker.sock info`.
- Data directory defaults: `/var/lib/docker` on Linux, `C:\ProgramData\docker` on Windows.
- With the containerd image store (the default for Docker Engine 29.0 and later on fresh installations), image contents and container snapshots live in `/var/lib/containerd`; volumes and configs stay in `/var/lib/docker`. With classic storage drivers such as `overlay2` (default for upgraded installations), everything is in `/var/lib/docker`.
- `data-root` does not affect `/var/lib/containerd`; change that via the system containerd configuration (`/etc/containerd/config.toml`: `version = 2`, `root = "/mnt/containerd-data"`).
- Use a dedicated directory for each daemon; sharing one (e.g. an NFS share) causes errors that are hard to troubleshoot.

## Related

- [dockerd](./dockerd.md)
- [Start the daemon](./daemon-start.md)
- [Daemon proxy configuration](./daemon-proxy.md)
