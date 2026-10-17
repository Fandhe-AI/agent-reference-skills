---
source: https://docs.docker.com/reference/dockerfile/#entrypoint
---

# ENTRYPOINT

Configures a container that runs as an executable.

## Signature / Usage

```dockerfile
# exec form (preferred)
ENTRYPOINT ["executable", "param1", "param2"]
# shell form
ENTRYPOINT command param1 param2
```

```dockerfile
FROM ubuntu
ENTRYPOINT ["top", "-b"]
CMD ["-c"]
```

## Notes

- Command line arguments to `docker run <image>` are appended after all elements of an exec form `ENTRYPOINT` and override all elements specified using `CMD`. `docker run <image> -d` passes `-d` to the entry point. Override `ENTRYPOINT` with `docker run --entrypoint` (this can only set the binary to exec; no `sh -c` is used).
- The shell form ignores any `CMD` or `docker run` arguments and starts your `ENTRYPOINT` as a subcommand of `/bin/sh -c`, which does not pass signals. The executable is not `PID 1` and won't receive `SIGTERM` from `docker stop <container>`.
- Only the last `ENTRYPOINT` in the Dockerfile has an effect.
- When combining exec form `ENTRYPOINT` with `CMD`, use the exec form of `CMD` too; the shell form of `CMD` is wrapped in `/bin/sh -c`, so the `ENTRYPOINT` receives a shell invocation as its argument.
- Run Apache in the foreground (`PID 1`):

  ```dockerfile
  FROM debian:stable
  RUN apt-get update && apt-get install -y apache2
  EXPOSE 80 443
  VOLUME ["/var/www", "/var/log/apache2", "/etc/apache2"]
  ENTRYPOINT ["/usr/sbin/apache2ctl", "-D", "FOREGROUND"]
  ```

- Adapted: `--force-yes` from the official example is omitted because it bypasses apt's package authentication checks.
- A starter script ensures the final executable receives Unix signals by using `exec` and `gosu`:

  ```bash
  #!/usr/bin/env bash
  set -e

  if [ "$1" = 'postgres' ]; then
      chown -R postgres "$PGDATA"

      if [ -z "$(ls -A "$PGDATA")" ]; then
          gosu postgres initdb
      fi

      exec gosu postgres "$@"
  fi

  exec "$@"
  ```

- For cleanup on shutdown or coordinating multiple executables, the `ENTRYPOINT` script must receive Unix signals and pass them on (the source example uses `trap "echo TRAPed signal" HUP INT QUIT TERM`, `apachectl start`, then `apachectl stop`).
- Shell form: to make `docker stop` signal a long-running executable correctly, start it with `exec`:

  ```dockerfile
  FROM ubuntu
  ENTRYPOINT exec top -b
  ```

  Without `exec` (`ENTRYPOINT top -b` + `CMD -- --ignored-param1`), `top` is not `PID 1` and `docker stop` sends `SIGKILL` after the timeout (about 10 seconds in the source output).

### Understand how CMD and ENTRYPOINT interact

1. A Dockerfile should specify at least one of `CMD` or `ENTRYPOINT`.
2. `ENTRYPOINT` should be defined when using the container as an executable.
3. `CMD` defines default arguments for an `ENTRYPOINT` command or an ad-hoc command.
4. `CMD` is overridden when running the container with alternative arguments.

Command executed per combination:

| | No ENTRYPOINT | ENTRYPOINT exec_entry p1_entry | ENTRYPOINT ["exec_entry", "p1_entry"] |
| --- | --- | --- | --- |
| **No CMD** | error, not allowed | /bin/sh -c exec_entry p1_entry | exec_entry p1_entry |
| **CMD ["exec_cmd", "p1_cmd"]** | exec_cmd p1_cmd | /bin/sh -c exec_entry p1_entry | exec_entry p1_entry exec_cmd p1_cmd |
| **CMD exec_cmd p1_cmd** | /bin/sh -c exec_cmd p1_cmd | /bin/sh -c exec_entry p1_entry | exec_entry p1_entry /bin/sh -c exec_cmd p1_cmd |

If `CMD` is defined from the base image, setting `ENTRYPOINT` resets `CMD` to an empty value; `CMD` must then be defined in the current image.

## Related

- [cmd.md](./cmd.md)
- [shell-and-exec-form.md](./shell-and-exec-form.md)
- [stopsignal.md](./stopsignal.md)
