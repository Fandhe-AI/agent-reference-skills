---
source: https://docs.docker.com/reference/cli/docker/context/ls/
---

# docker context ls

List contexts. The currently active context is indicated with an `*`. Alias: `docker context list`.

## Signature / Usage

```console
$ docker context ls [OPTIONS]

NAME                DESCRIPTION                               DOCKER ENDPOINT                      ORCHESTRATOR
default *           Current DOCKER_HOST based configuration   unix:///var/run/docker.sock          swarm
production                                                    tcp:///prod.corp.example.com:2376
staging                                                       tcp:///stage.corp.example.com:2376
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `--format` |  | Format output: `table` (default), `table TEMPLATE`, `json`, or a Go `TEMPLATE`. See https://docs.docker.com/go/formatting/ |
| `-q`, `--quiet` |  | Only show context names |

## Related

- [docker context show](./context-show.md)
- [docker context use](./context-use.md)
