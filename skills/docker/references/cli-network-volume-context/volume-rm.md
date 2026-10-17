---
source: https://docs.docker.com/reference/cli/docker/volume/rm/
---

# docker volume rm

Remove one or more volumes. Alias: `docker volume remove`.

## Signature / Usage

```console
$ docker volume rm [OPTIONS] VOLUME [VOLUME...]
$ docker volume rm hello
hello
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `-f`, `--force` |  | API 1.25+ Force the removal of one or more volumes |

## Notes

- A volume that is in use by a container cannot be removed.

## Related

- [docker volume prune](./volume-prune.md)
- [docker volume ls](./volume-ls.md)
