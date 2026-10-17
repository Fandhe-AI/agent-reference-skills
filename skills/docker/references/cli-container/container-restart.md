---
source: https://docs.docker.com/reference/cli/docker/container/restart/
---

# docker container restart

Restart one or more containers. Alias: `docker restart`.

## Signature / Usage

```console
$ docker container restart [OPTIONS] CONTAINER [CONTAINER...]
$ docker restart my_container
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `-s`, `--signal` |  | Signal to send to the container |
| `-t`, `--timeout` |  | Seconds to wait before killing the container |

## Notes

- `--signal` sends the system call signal to the container to exit: a name in the form `SIG<NAME>` (e.g. `SIGKILL`) or an unsigned number matching a position in the kernel's syscall table (e.g. `9`). See `signal(7)`.
- The default signal is the image's `StopSignal`, set via the `STOPSIGNAL` Dockerfile instruction or `--stop-signal` at container creation. If none is configured, `SIGTERM` is used.
- `--timeout` is the number of seconds to wait for the container to stop after the signal. If it does not exit, it is forcibly killed with `SIGKILL`. `-1` means no timeout (wait indefinitely).
- The default timeout can be set with `--stop-timeout` at container creation; otherwise the daemon determines it: 10 seconds for Linux containers, 30 seconds for Windows containers.
- Distinct from other products' "container" concepts: LXC containers in proxmox-ve, ModelContainer in apple-data, CKContainer in apple-app-services, and item containers in windows-* skills are unrelated to Docker containers.

## Related

- [docker container stop](./container-stop.md)
- [docker container start](./container-start.md)
- [docker container kill](./container-kill.md)
