---
source: https://docs.docker.com/reference/cli/docker/container/attach/
---

# docker container attach

Attach local standard input, output, and error streams to a running container. Alias: `docker attach`.

## Signature / Usage

```console
$ docker container attach [OPTIONS] CONTAINER
$ docker attach topdemo
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `--detach-keys` |  | Override the key sequence for detaching a container |
| `--no-stdin` |  | Do not attach STDIN |
| `--sig-proxy` | `true` | Proxy all received signals to the process |

## Notes

- `attach` displays the output of the container's `ENTRYPOINT` and `CMD` process. It can look hung when the process is simply not writing output.
- You can attach to the same process multiple times simultaneously from different sessions on the Docker host.
- `CTRL-c` sends `SIGKILL` to the container; with `--sig-proxy` true (default) it sends `SIGINT`. If the container was run with `-i` and `-t`, detach with `CTRL-p CTRL-q` and leave it running.
- A process running as PID 1 ignores any signal with the default action, so it does not terminate on `SIGINT` or `SIGTERM` unless coded to do so.
- You can't redirect the standard input of `docker attach` while attaching to a TTY-enabled container (`-i` and `-t`).
- While attached, Docker uses a ~1MB memory buffer; once full, the API connection speed is affected. For performance-critical, output-heavy apps use `docker logs` instead.
- The exit code of the container's command is returned by `docker attach` to its caller.
- `--detach-keys` format: a letter `[a-Z]`, or `ctrl-` combined with `a-z`, `@`, `[`, `\\`, `_`, `^`. Examples: `a`, `ctrl-a`, `X`, `ctrl-\\`.
- Distinct from other products' "container" concepts: LXC containers in proxmox-ve, ModelContainer in apple-data, CKContainer in apple-app-services, and item containers in windows-* skills are unrelated to Docker containers.

## Related

- [docker container logs](./container-logs.md)
- [docker container exec](./container-exec.md)
- [docker container run](./container-run.md)
