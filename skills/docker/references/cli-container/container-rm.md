---
source: https://docs.docker.com/reference/cli/docker/container/rm/
---

# docker container rm

Remove one or more containers. Aliases: `docker container remove`, `docker rm`.

## Signature / Usage

```console
$ docker container rm [OPTIONS] CONTAINER [CONTAINER...]
$ docker rm --force redis
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `-f`, `--force` |  | Force the removal of a running container (uses SIGKILL) |
| `-l`, `--link` |  | Remove the specified link |
| `-v`, `--volumes` |  | Remove anonymous volumes associated with the container |

## Notes

- `--link` (e.g. `docker rm --link /webapp/redis`) removes the legacy link between `/webapp` and `/redis` on the default bridge network. It does not disconnect either container from the network, so it is not a network-isolation control (the official reference phrases this as removing network communication between the two). It does not apply when `--link` is used with user-specified networks.
- `--force`: the main process in the container receives `SIGKILL`, then the container is removed.
- To remove all stopped containers use `docker container prune`; `docker system prune` also removes other unused resources. Alternatively combine with `docker ps -q`:

```console
$ docker rm $(docker ps --filter status=exited -q)
$ docker ps --filter status=exited -q | xargs docker rm
```

- Combining commands depends on shell features and the syntax may differ per shell; on Windows consider PowerShell or Bash.
- `--volumes` removes anonymous volumes only; a volume specified with a name is not removed. Example: after `docker create -v awesome:/foo -v /bar --name hello redis`, `docker rm -v hello` keeps the volume for `/foo` and removes the one for `/bar`. The same holds for volumes inherited with `--volumes-from`.
- Distinct from other products' "container" concepts: LXC containers in proxmox-ve, ModelContainer in apple-data, CKContainer in apple-app-services, and item containers in windows-* skills are unrelated to Docker containers.

## Related

- [docker container prune](./container-prune.md)
- [docker container stop](./container-stop.md)
