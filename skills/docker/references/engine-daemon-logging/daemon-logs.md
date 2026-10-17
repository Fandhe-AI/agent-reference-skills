---
source: https://docs.docker.com/engine/daemon/logs/
---

# Read the daemon logs

Where to find daemon logs, how to enable debugging, and how to force a stack trace.

## Signature / Usage

Enable debugging in `daemon.json`, then reload:

```json
{
  "debug": true
}
```

```console
$ sudo kill -SIGHUP $(pidof dockerd)
```

## Options / Props

| Operating system | Location |
| --- | --- |
| Linux | `journalctl -xu docker.service` (or `/var/log/syslog` or `/var/log/messages`, depending on distribution) |
| macOS (Docker Desktop) | `~/Library/Containers/com.docker.docker/Data/log/vm/init.log` |
| Windows (WSL2) | `%LOCALAPPDATA%\Docker\log\vm\init.log` |
| Windows (Windows containers) | Logs are in the Windows Event Log |

## Notes

- Docker Desktop writes `dockerd`, `containerd`, and other VM services to one JSON `init.log`; each line has a `"component"` field. Filter: `grep '"component":"dockerd"' ~/Library/Containers/com.docker.docker/Data/log/vm/init.log`.
- `log-level` values: `debug`, `info` (default), `warn`, `error`, `fatal`; if set it must be `info` or `debug` for debug output. On Windows hosts restart Docker instead of sending `HUP`. Manual alternative: restart with `-D`, which may use a different environment than startup scripts.
- Force a full stack trace (daemon keeps running) with `SIGUSR1`: `sudo kill -SIGUSR1 $(pidof dockerd)` on Linux; on Windows Server use `docker-signal` with `--pid=<PID of daemon>`. Look for `goroutine stacks written to /var/run/docker/goroutine-stacks-....log` in the daemon log.
- Not possible to generate a stack trace on Docker Desktop for Mac/Windows.
- Older Linux systems may log to `/var/log/messages`, `/var/log/daemon.log`, or `/var/log/docker.log`.

## Related

- [Troubleshooting the Docker daemon](./daemon-troubleshoot.md)
- [dockerd](./dockerd.md)
