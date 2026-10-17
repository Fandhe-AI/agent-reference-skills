---
source: https://docs.docker.com/engine/daemon/start/
---

# Start the daemon

Start the Docker daemon either through operating system utilities (systemd) or manually with `dockerd`.

## Signature / Usage

```console
$ sudo systemctl start docker
```

Manual start (foreground, logs to the terminal):

```console
$ dockerd

INFO[0000] +job init_networkdriver()
INFO[0000] +job serveapi(unix:///var/run/docker.sock)
INFO[0000] Listening for HTTP on unix (/var/run/docker.sock)
```

## Notes

- On a typical installation the daemon is started by a system utility; the command depends on the OS (see the per-OS Install Docker pages). On some systems such as Ubuntu and Debian the service starts automatically.
- To start Docker at boot, see "Configure Docker to start on boot" in the Linux post-install steps.
- `dockerd` may need `sudo`. Stop a manually started daemon with `Ctrl+C`.

## Related

- [dockerd](./dockerd.md)
- [Docker daemon configuration overview](./daemon-overview.md)
- [Read the daemon logs](./daemon-logs.md)
