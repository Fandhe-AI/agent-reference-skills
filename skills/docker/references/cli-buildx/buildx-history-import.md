---
source: https://docs.docker.com/reference/cli/docker/buildx/history/import/
---

# docker buildx history import

Import a build record from a `.dockerbuild` archive into Docker Desktop, to view, inspect and analyze builds created in other environments or CI pipelines.

## Signature / Usage

```console
$ docker buildx history import [OPTIONS] -
$ docker buildx history import < mybuild.dockerbuild
```

## Options / Props

| Name | Default | Description |
| --- | --- | --- |
| `-f`, `--file` | | Import from a file path |

## Notes

- By default `import` automatically opens the imported build in Docker Desktop. Run `open` only to open a specific build or re-open later, e.g. `docker buildx history open ci-build`.

### Examples

```console
docker buildx history import --file ./artifacts/backend-build.dockerbuild
```

## Related

- [docker buildx history export](./buildx-history-export.md)
- [docker buildx history open](./buildx-history-open.md)
