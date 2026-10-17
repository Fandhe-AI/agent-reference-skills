---
source: https://docs.docker.com/reference/cli/docker/context/use/
---

# docker context use

Set the default context for the Docker CLI by updating the CLI config (`~/.docker/config.json`).

## Signature / Usage

```bash
$ docker context use CONTEXT
$ docker context use my-context
my-context
```

## Notes

- The change is persistent and affects all shells and sessions that share that config, not just the current terminal.
- For a single command use the global flag: `docker --context my-context ps`.
- For the current shell session set `DOCKER_CONTEXT` (`export DOCKER_CONTEXT=my-context`); stop overriding with `unset DOCKER_CONTEXT`.
- Switch back with `docker context use default`.

## Related

- [docker context show](./context-show.md)
- [docker context create](./context-create.md)
