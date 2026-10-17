---
source: https://docs.docker.com/reference/cli/docker/buildx/history/logs/
---

# docker buildx history logs

Print the logs for a completed build in the same format as `--progress=plain`, showing the full logs for each step. By default shows logs for the most recent build on the current builder.

## Signature / Usage

```console
$ docker buildx history logs [OPTIONS] [REF]
$ docker buildx history logs ^1
```

## Options / Props

| Name | Default | Description |
| --- | --- | --- |
| `--progress` | `plain` | Set type of progress output (plain, rawjson, tty) |

## Notes

- An earlier build can be selected with an offset: `^1` is the build before the most recent, `^2` two steps back. A build ID also works.

### Examples

```console
$ docker buildx history logs qu2gsuo8ejqrwdfii23xkkckt
$ docker buildx history logs ^1 --progress rawjson
```

## Related

- [docker buildx history inspect](./buildx-history-inspect.md)
- [docker buildx history ls](./buildx-history-ls.md)
