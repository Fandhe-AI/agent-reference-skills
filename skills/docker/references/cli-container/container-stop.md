---
source: https://docs.docker.com/reference/cli/docker/container/stop/
---

# docker container stop

Stop one or more running containers. Alias: `docker stop`.

## Signature / Usage

```console
$ docker container stop [OPTIONS] CONTAINER [CONTAINER...]
$ docker stop my_container
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `-s`, `--signal` |  | Signal to send to the container |
| `-t`, `--timeout` |  | Seconds to wait before killing the container |

## Notes

- The main process receives `SIGTERM`, and after a grace period, `SIGKILL`. The first signal can be changed with the `STOPSIGNAL` Dockerfile instruction, or the `--stop-signal` option to `docker run` and `docker create`.
- `--signal`: a name in the form `SIG<NAME>` (e.g. `SIGKILL`) or an unsigned number matching a position in the kernel's syscall table (e.g. `9`). See `signal(7)`. The default is the image's `StopSignal`; if none is configured, `SIGTERM`.
- `--timeout`: seconds to wait after the signal before the container is forcibly killed with `SIGKILL`. `-1` means no timeout (wait indefinitely).
- The default timeout can be set with `--stop-timeout` at container creation; otherwise the daemon determines it: 10 seconds for Linux containers, 30 seconds for Windows containers.
- Distinct from other products' "container" concepts: LXC containers in proxmox-ve, ModelContainer in apple-data, CKContainer in apple-app-services, and item containers in windows-* skills are unrelated to Docker containers.

## Related

- [docker container kill](./container-kill.md)
- [docker container restart](./container-restart.md)
- [docker container rm](./container-rm.md)
