---
source: https://docs.docker.com/reference/dockerfile/#healthcheck
---

# HEALTHCHECK

Tells Docker how to test a container to check that it's still working (e.g. detects a web server stuck in an infinite loop).

## Signature / Usage

```dockerfile
HEALTHCHECK [OPTIONS] CMD command   # check health by running a command inside the container
HEALTHCHECK NONE                     # disable any healthcheck inherited from the base image
```

```dockerfile
HEALTHCHECK --interval=5m --timeout=3s \
  CMD curl -f http://localhost/ || exit 1
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `--interval` | DURATION | `30s` | Time between checks. First check runs this long after container start, then again after each previous check completes. |
| `--timeout` | DURATION | `30s` | A check taking longer than this fails; the check process is stopped with `SIGKILL`. |
| `--start-period` | DURATION | `0s` | Initialization time; probe failures during it are not counted toward retries. |
| `--start-interval` | DURATION | `5s` | Time between checks during the start period. Requires Docker Engine 25.0 or later. |
| `--retries` | N | `3` | Consecutive failures needed to consider the container `unhealthy`. |

## Notes

- Status is initially `starting`; a passing check makes it `healthy`; after the retry count of consecutive failures it becomes `unhealthy`.
- If a check succeeds during the start period, the container is considered started and all consecutive failures count toward the maximum retries.
- Only one `HEALTHCHECK` per Dockerfile; only the last takes effect.
- The command after `CMD` can be a shell command or an exec array.
- Exit status: `0` success (healthy), `1` unhealthy, `2` reserved (don't use).
- Output text (UTF-8) written to stdout or stderr is stored in the health status and can be queried with `docker inspect`; only the first 4096 bytes are stored currently.
- When the health status changes, a `health_status` event is generated.

## Related

- [cmd.md](./cmd.md)
- [stopsignal.md](./stopsignal.md)
