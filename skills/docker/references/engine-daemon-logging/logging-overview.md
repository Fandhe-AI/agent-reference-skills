---
source: https://docs.docker.com/engine/logging/
---

# View container logs

`docker logs` shows what a running container wrote to `STDOUT` and `STDERR`; `docker service logs` shows logs of all containers in a service.

## Signature / Usage

```console
$ docker logs <CONTAINER>
```

## Notes

- By default `docker logs` shows the command's `STDOUT` and `STDERR`, as if run interactively. The logged information and format depend almost entirely on the container's endpoint command.
- `docker logs` may show nothing useful if (1) a logging driver sends logs to a file, external host, or database and "dual logging" is disabled, or (2) the application writes to log files instead of `STDOUT`/`STDERR`.
- Workarounds for (2): the official `nginx` image symlinks `/var/log/nginx/access.log` to `/dev/stdout` and `error.log` to `/dev/stderr`; the official `httpd` image configures output to `/proc/self/fd/1` (STDOUT) and `/proc/self/fd/2` (STDERR).

## Related

- [Configure logging drivers](./logging-configure.md)
- [Use docker logs with remote logging drivers](./dual-logging.md)
- [docker container logs](../cli-container/container-logs.md)
