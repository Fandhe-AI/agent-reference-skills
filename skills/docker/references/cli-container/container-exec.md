---
source: https://docs.docker.com/reference/cli/docker/container/exec/
---

# docker container exec

Execute a command in a running container. Alias: `docker exec`.

## Signature / Usage

```console
$ docker container exec [OPTIONS] CONTAINER COMMAND [ARG...]
$ docker exec -d mycontainer touch /tmp/execWorks
$ docker exec -it mycontainer sh
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `-d`, `--detach` |  | Detached mode: run command in the background |
| `--detach-keys` |  | Override the key sequence for detaching a container |
| `-e`, `--env` |  | API 1.25+ Set environment variables |
| `--env-file` |  | API 1.25+ Read in a file of environment variables |
| `-i`, `--interactive` |  | Keep STDIN open even if not attached |
| `--privileged` |  | Give extended privileges to the command |
| `-t`, `--tty` |  | Allocate a pseudo-TTY |
| `-u`, `--user` |  | Username or UID (format: `<name\|uid>[:<group\|gid>]`) |
| `-w`, `--workdir` |  | API 1.35+ Working directory inside the container |

## Notes

- The command runs only while the container's primary process (PID 1) is running, and isn't restarted if the container is restarted. It runs in the container's default working directory.
- The command must be an executable; a chained or quoted command doesn't work. Works: `docker exec -it my_container sh -c "echo a && echo b"`. Doesn't work: `docker exec -it my_container "echo a && echo b"`.
- `docker exec` inherits the environment variables set at container creation. `-e` overrides or adds variables only for the exec'd process:

```console
$ docker exec -e VAR_A=1 -e VAR_B=2 mycontainer env
```

- `--workdir` sets an alternative working directory: `docker exec -it -w /root mycontainer pwd` prints `/root`.
- On a paused container, exec fails: `Error response from daemon: Container mycontainer is paused, unpause the container before exec` (exit code 1).
- `--privileged`: see `docker run --privileged`.
- Distinct from other products' "container" concepts: LXC containers in proxmox-ve, ModelContainer in apple-data, CKContainer in apple-app-services, and item containers in windows-* skills are unrelated to Docker containers.

## Related

- [docker container run](./container-run.md)
- [docker container attach](./container-attach.md)
- [docker container pause](./container-pause.md)
