---
source: https://docs.docker.com/reference/cli/docker/context/create/
---

# docker context create

Create a new context, which lets you switch the daemon your `docker` CLI connects to.

## Signature / Usage

```console
$ docker context create [OPTIONS] CONTEXT
$ docker context create \
    --docker host=unix:///var/run/docker.sock \
    my-context
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `--description` |  | Description of the context |
| `--docker` |  | set the docker endpoint |
| `--from` |  | create context from a named context |

## Notes

- `--from=<context-name>` creates a new context from an existing one: `docker context create --from existing-context my-context`.
- If `--from` is not set, the context is created from the current context. This can turn a `DOCKER_HOST` based script into a context: `source my-setup-script.sh` then `docker context create my-context`.
- `--docker from=<context-name>` sources the docker endpoint configuration from an existing context.
- Endpoint configuration and description can be modified later with `docker context update`.

## Related

- [docker context update](./context-update.md)
- [docker context use](./context-use.md)
- [docker context ls](./context-ls.md)
