---
source: https://docs.docker.com/reference/cli/docker/buildx/history/rm/
---

# docker buildx history rm

Remove one or more build records from the current builder's history, by ID or offset, or all at once with `--all`.

## Signature / Usage

```console
$ docker buildx history rm [OPTIONS] [REF...]
$ docker buildx history rm ^1 ^2
```

## Options / Props

| Name | Default | Description |
| --- | --- | --- |
| `--all` | | Remove all build records |

### Examples

```console
docker buildx history rm qu2gsuo8ejqrwdfii23xkkckt qsiifiuf1ad9pa9qvppc0z1l3
docker buildx history rm --all
```

## Related

- [docker buildx history ls](./buildx-history-ls.md)
