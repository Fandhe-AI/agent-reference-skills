---
source: https://docs.docker.com/reference/compose-file/services/#depends_on
---

# services: depends_on / healthcheck / restart / lifecycle hooks

Service startup order, health checks, restart policy, stop behavior, and lifecycle hooks.

## Signature / Usage

```yml
services:
  web:
    build: .
    depends_on:
      db:
        condition: service_healthy
        restart: true
      redis:
        condition: service_started
  redis:
    image: redis
  db:
    image: postgres:18
```

## Notes

### `depends_on`

Controls the order of service startup and shutdown.

Short syntax only specifies service names. Compose creates services in dependency order (`db` and `redis` before `web` in the example below) and removes them in dependency order (`web` before `db` and `redis`). Compose guarantees dependency services have been started, but with short syntax does not wait for them to be "healthy".

```yml
services:
  web:
    build: .
    depends_on:
      - db
      - redis
  redis:
    image: redis
  db:
    image: postgres:18
```

Long syntax fields:

| Field | Description |
| --- | --- |
| `restart` | When `true`, Compose restarts this service after it updates the dependency service. Applies to an explicit restart controlled by a Compose operation, not to automated restart by the container runtime. Introduced in Docker Compose 2.17.0. |
| `condition` | Condition under which the dependency is considered satisfied: `service_started` (equivalent to short syntax), `service_healthy` (dependency expected to be "healthy" per `healthcheck`), `service_completed_successfully` (dependency expected to run to successful completion). |
| `required` | When `false`, Compose only warns if the dependency service isn't started or available. Default `true`. Introduced in Docker Compose 2.20.0. |

Compose waits for healthchecks to pass on dependencies marked `service_healthy`.

### `healthcheck`

Declares a check run to determine whether service containers are "healthy". Works the same way, with the same defaults, as the Dockerfile `HEALTHCHECK` instruction set by the image; the Compose file can override the values.

```yml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost"]
  interval: 1m30s
  timeout: 10s
  retries: 3
  start_period: 40s
  start_interval: 5s
```

- `interval`, `timeout`, `start_period`, and `start_interval` are specified as durations. Introduced in Docker Compose 2.20.2.
- `test` can be a string or a list. If a list, the first item must be `NONE`, `CMD` or `CMD-SHELL`. A string is equivalent to `CMD-SHELL` followed by that string. `CMD-SHELL` runs the command with the container's default shell (`/bin/sh` for Linux).

```yml
test: ["CMD-SHELL", "curl -f http://localhost || exit 1"]
```

```yml
test: curl -f https://localhost || exit 1
```

- `NONE` disables the healthcheck (mostly useful to disable the `HEALTHCHECK` set by the image). Alternatively set `disable: true`:

```yml
healthcheck:
  disable: true
```

### `restart`

Defines the policy the platform applies on container termination.

| Value | Behavior |
| --- | --- |
| `no` | Default. Does not restart the container under any circumstances. |
| `always` | Always restarts the container until its removal. |
| `on-failure[:max-retries]` | Restarts if the exit code indicates an error; optionally limits the number of restart retries the Docker daemon attempts. |
| `unless-stopped` | Restarts irrespective of the exit code but stops restarting when the service is stopped or removed. |

```yml
    restart: "no"
    restart: always
    restart: on-failure
    restart: on-failure:3
    restart: unless-stopped
```

### `init`

Runs an init process (PID 1) inside the container that forwards signals and reaps processes. Set to `true` to enable. The init binary used is platform specific.

```yml
services:
  web:
    image: alpine:latest
    init: true
```

### `post_start`

Defines a sequence of lifecycle hooks to run after a container has started. The exact timing is not guaranteed.

- `command`: required; shell form or exec form.
- `user`: the user to run the command; defaults to the main service command's user.
- `privileged`: run with privileged access.
- `working_dir`: working directory; defaults to the main service command's.
- `environment`: variables for the hook command (inherits the service environment; add or override).

```yaml
services:
  test:
    post_start:
      - command: ./do_something_on_startup.sh
        user: root
        privileged: true
        environment:
          - FOO=BAR
```

### `pre_start`

Defines a sequence of init containers to run before the service container is started. Each step runs to completion, in declared order, and the service container only starts once every step has exited `0`. A non-zero exit fails the bring-up of the service and its dependents.

Unlike `post_start` and `pre_stop`, each `pre_start` step runs in its own ephemeral container, created after the service container is created but before it is started. Fields:

- `command`: optional when the image's entrypoint already runs the intended command.
- `image`: image for the ephemeral container; defaults to the parent service's image.
- `user`, `privileged`, `working_dir`, `environment`: as for `post_start` (`user` defaults to the user declared in `image`, or the main service command's user when `image` is omitted).
- `per_replica: false`: whether the step runs once for the service as a whole before any replica starts.

Behavior: steps run only once the service's `depends_on` conditions are satisfied; the container joins the same networks as the service and shares its declared volume mounts. With `per_replica: false` and a scaled service, only shared mounts (named volumes, bind mounts) are usable; per-instance mounts (`tmpfs`, anonymous volumes) are not accessible (not an error). A step that already succeeded for its current definition is not re-run on a subsequent `up` or on restart under the `restart` policy; it runs again when its definition changes, when the previous run did not succeed, or when the service is recreated.

```yaml
services:
  app:
    image: myapp:latest
    depends_on:
      db:
        condition: service_healthy
    pre_start:
      - command: ["./manage.py", "migrate"]
      - image: busybox
        command: sh -c 'chown -R 1000:1000 /data'
    volumes:
      - data:/data

  db:
    image: postgres:16

volumes:
  data:
```

### `pre_stop`

Defines a sequence of lifecycle hooks to run before the container is stopped. These hooks won't run if the container stops by itself or is terminated suddenly. Configuration is equivalent to `post_start`.

### `stop_grace_period`

How long Compose waits when attempting to stop a container that doesn't handle SIGTERM (or the signal set with `stop_signal`) before sending SIGKILL. Specified as a duration. Default is 10 seconds.

```yml
    stop_grace_period: 1s
    stop_grace_period: 1m30s
```

### `stop_signal`

The signal Compose uses to stop the service containers. If unset, `SIGTERM` is sent.

```yml
stop_signal: SIGUSR1
```

### `attach`

When `attach` is `false`, Compose does not collect service logs until you explicitly request it. The default is `attach: true`.

### `stdin_open`

Runs the container with an allocated stdin (same as `-i`). Supported values are `true` or `false`.

### `tty`

Runs the container with a TTY (same as `-t` / `--tty`). Supported values are `true` or `false`.

### Other notes

- Docker Compose (container orchestration), not Jetpack Compose: see android-compose-ui / android-compose-components / android-compose-graphics-animation.

## Related

- [services: image / build / command / identity attributes](./services-image-command.md)
- [Compose Develop Specification](./develop.md)
- [Compose Deploy Specification](./deploy.md)
