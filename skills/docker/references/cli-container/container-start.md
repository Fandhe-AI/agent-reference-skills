---
source: https://docs.docker.com/reference/cli/docker/container/start/
---

# docker container start

Start one or more stopped containers. Alias: `docker start`.

## Signature / Usage

```console
$ docker container start [OPTIONS] CONTAINER [CONTAINER...]
$ docker start my_container
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `-a`, `--attach` |  | Attach STDOUT/STDERR and forward signals |
| `--checkpoint` |  | **experimental (daemon)** Restore from this checkpoint |
| `--checkpoint-dir` |  | **experimental (daemon)** Use a custom checkpoint storage directory |
| `--detach-keys` |  | Override the key sequence for detaching a container |
| `-i`, `--interactive` |  | Attach container's STDIN |

## Notes

- Distinct from other products' "container" concepts: LXC containers in proxmox-ve, ModelContainer in apple-data, CKContainer in apple-app-services, and item containers in windows-* skills are unrelated to Docker containers.

## Related

- [docker container create](./container-create.md)
- [docker container stop](./container-stop.md)
- [docker container restart](./container-restart.md)
