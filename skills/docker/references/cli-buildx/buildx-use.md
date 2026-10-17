---
source: https://docs.docker.com/reference/cli/docker/buildx/use/
---

# docker buildx use

Switches the current builder instance. Build commands invoked afterwards run on the specified builder. Alternatively, a context name can be used to switch to the default builder of that context.

## Signature / Usage

```console
$ docker buildx use [OPTIONS] NAME
$ docker buildx use mybuilder
```

## Options / Props

| Name | Default | Description |
| --- | --- | --- |
| `--default` | | Set builder as default for current context |
| `--global` | | Builder persists context changes |

## Notes

- The global `--builder` flag (same as `docker buildx --builder`) overrides the configured builder instance for a single invocation.
- `docker buildx build` (and other `docker buildx` build commands) use the selected builder, but `docker build` always defaults to the default builder for backwards compatibility; pass `--builder` or set `BUILDX_BUILDER` to use the selected builder with `docker build` (see Builders).

## Related

- [Builders](../build/builders.md)
- [docker buildx create](./buildx-create.md)
- [docker buildx ls](./buildx-ls.md)
