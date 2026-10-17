---
source: https://docs.docker.com/engine/containers/start-containers-automatically/
---

# Start containers automatically

Restart policies control whether containers start automatically when they exit, or when Docker restarts. Docker recommends restart policies over process managers.

## Signature / Usage

```console
$ docker run -d --name redis --restart unless-stopped redis
$ docker update --restart unless-stopped redis
$ docker update --restart unless-stopped $(docker ps -q)
```

## Options / Props

`--restart` values:

| Flag | Description |
| --- | --- |
| `no` | Don't automatically restart the container. (Default) |
| `on-failure[:max-retries]` | Restart if the container exits with a non-zero exit code. Optionally limit retries with `:max-retries`. Doesn't restart the container if the daemon restarts. |
| `always` | Always restart the container if it stops. If manually stopped, it's restarted only when the Docker daemon restarts or the container itself is manually restarted. |
| `unless-stopped` | Similar to `always`, except that when the container is stopped (manually or otherwise), it isn't restarted even after the Docker daemon restarts. |

## Notes

- Restart policies differ from `dockerd --live-restore`, which keeps containers running during a Docker upgrade (networking and user input are interrupted).
- A policy only takes effect after the container starts successfully: up for at least 10 seconds and monitored by Docker. This prevents restart loops for containers that never start.
- If you manually stop a container, the policy is ignored until the daemon restarts or the container is manually restarted.
- Restart policies only apply to containers; Swarm services use service restart flags.
- Foreground containers: stopping a container makes the attached CLI exit regardless of the policy. The container keeps restarting; re-attach between restarts with `docker container attach`.
- Process managers (e.g. systemd, supervisor): configure them to start the container with the same `docker start` or `docker service` command. Don't combine Docker restart policies with host-level process managers, as this creates conflicts.
- Process managers inside containers aren't Docker-aware, only monitor OS processes in the container, and Docker doesn't recommend this approach (platform-dependent, may differ between distribution versions).

## Related

- [Running containers](./running-containers.md)
- [docker container update](../cli-container/container-update.md)
- [Live restore](../engine-daemon-logging/live-restore.md)
