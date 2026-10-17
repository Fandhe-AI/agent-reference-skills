---
source: https://docs.docker.com/engine/manage-resources/contexts/
---

# Docker contexts

Use contexts to manage multiple Docker daemons from a single client. Each context holds all information required to manage resources on a daemon: name and description, endpoint configuration, and TLS info.

## Signature / Usage

```console
$ docker context ls
NAME        DESCRIPTION                               DOCKER ENDPOINT               ERROR
default *                                             unix:///var/run/docker.sock

$ docker context create docker-test --docker host=tcp://docker:2375
$ docker context use docker-test
$ docker --context production container ls
```

Export, import and update:

```console
$ docker context export docker-test
Written file "docker-test.dockercontext"
$ docker context import docker-test docker-test.dockercontext
$ docker context update docker-test --description "Test context"
```

## Options / Props

Ways to select the active context (precedence over `docker context use`):

| Mechanism | Description |
| --- | --- |
| `DOCKER_CONTEXT` | Environment variable (`export DOCKER_CONTEXT=docker-test`, PowerShell `$env:DOCKER_CONTEXT='docker-test'`); overrides the context set with `docker context use`. |
| `--context` | Global flag to override the context for one command. |
| `DOCKER_HOST` / `--host` | Override the endpoint (the active-context asterisk is overridden by these). |

## Notes

- Verify your client supports contexts by running `docker context`.
- The asterisk in the `NAME` column marks the active context; `docker context inspect <name>` shows Endpoints, TLSMaterial and Storage.
- Each context is stored in its own `meta.json` below `~/.docker/contexts/`.
- Export files use the `.dockercontext` extension and can be imported on any host with the `docker` client. Format: `docker context import <context-name> <context-file>`.

## Related

- [Protect the Docker daemon socket](./protect-access.md)
- [docker context create](../cli-network-volume-context/context-create.md)
- [docker context use](../cli-network-volume-context/context-use.md)
