---
source: https://docs.docker.com/reference/cli/docker/container/kill/
---

# docker container kill

Kill one or more running containers. Alias: `docker kill`.

## Signature / Usage

```console
$ docker container kill [OPTIONS] CONTAINER [CONTAINER...]
$ docker kill my_container
$ docker kill --signal=SIGHUP my_container
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `-s`, `--signal` |  | Signal to send to the container |

## Notes

- The container's main process is sent `SIGKILL` by default, or the signal given with `--signal`. A container can be referenced by ID, ID-prefix, or name.
- `--signal` accepts a name in the form `SIG<NAME>` (e.g. `SIGINT`) or an unsigned number matching a position in the kernel's syscall table (e.g. `2`). The `SIG` prefix is optional; these are equivalent: `--signal=SIGHUP`, `--signal=HUP`, `--signal=1`.
- A non-default signal may be non-terminal depending on the main process; `SIGHUP` in most cases is non-terminal and the container keeps running.
- `ENTRYPOINT` and `CMD` in shell form run as a child of `/bin/sh -c`, which does not pass signals, so the executable is not PID 1 and does not receive Unix signals.
- See `signal(7)` man page for standard Linux signals.
- Distinct from other products' "container" concepts: LXC containers in proxmox-ve, ModelContainer in apple-data, CKContainer in apple-app-services, and item containers in windows-* skills are unrelated to Docker containers.

## Related

- [docker container stop](./container-stop.md)
- [docker container restart](./container-restart.md)
