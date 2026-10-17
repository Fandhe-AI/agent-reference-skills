---
source: https://docs.docker.com/reference/cli/docker/buildx/rm/
---

# docker buildx rm

Removes the specified or current builder. It is a no-op attempting to remove the default builder.

## Signature / Usage

```console
$ docker buildx rm [OPTIONS] [NAME...]
$ docker buildx rm --all-inactive --force
```

## Options / Props

| Name | Default | Description |
| --- | --- | --- |
| `--all-inactive` | | Remove all inactive builders |
| `-f`, `--force` | | Do not prompt for confirmation |
| `--keep-daemon` | | Keep the BuildKit daemon running |
| `--keep-state` | | Keep BuildKit state |
| `--timeout` | `20s` | Override the default timeout for loading builder status |

## Notes

- `--all-inactive` removes builders that are not in running state and prompts for confirmation unless `--force` is set.
- `--keep-daemon` keeps the BuildKit daemon running after the buildx context is removed; useful when BuildKit daemons and buildx contexts are managed independently. Only supported by the `docker-container` and `kubernetes` drivers.
- `--keep-state` keeps BuildKit state so it can be reused by a new builder with the same name. Currently only supported by the `docker-container` driver.

## Related

- [docker buildx stop](./buildx-stop.md)
- [docker buildx create](./buildx-create.md)
