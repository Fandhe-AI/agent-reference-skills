---
source: https://docs.docker.com/engine/daemon/live-restore/
---

# Live restore

Keep containers running when the daemon becomes unavailable (crash, planned outage, upgrade).

## Signature / Usage

```json
{
  "live-restore": true
}
```

Restart the daemon, or on Linux reload without downtime: `systemctl reload docker` (with systemd), otherwise send `SIGHUP` to `dockerd`. Alternatively start manually with `dockerd --live-restore`.

## Notes

- Enable only one way (daemon configuration file or flag). The manual flag is not recommended because it doesn't set up the environment systemd or another process manager would.
- Not supported for Windows containers (works for Linux containers on Docker Desktop for Windows).
- Upgrades: supported only for patch releases (`YY.MM.x`), not major (`YY.MM`) upgrades. If you skip releases the daemon may not restore its connection and you must stop containers manually.
- Works only if daemon options such as bridge IP addresses and graph driver didn't change.
- If the daemon is down for a long time, containers may fill the FIFO log buffer (default 64K); a full log blocks container logging and requires a daemon restart to flush. On Linux the buffer follows `/proc/sys/fs/pipe-max-size`.
- Applies to standalone containers only, not Swarm services.

## Related

- [dockerd](./dockerd.md)
- [Docker daemon configuration overview](./daemon-overview.md)
