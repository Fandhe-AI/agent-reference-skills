---
source: https://docs.docker.com/reference/cli/docker/buildx/history/open/
---

# docker buildx history open

Open a build record in Docker Desktop for visual inspection. Requires Docker Desktop to be installed and running on the host machine.

## Signature / Usage

```console
$ docker buildx history open [OPTIONS] [REF]
$ docker buildx history open ^1
```

## Notes

- By default opens the most recent build on the current builder. `REF` is a build ID or a relative offset such as `^1`.

## Related

- [docker buildx history import](./buildx-history-import.md)
- [docker buildx history ls](./buildx-history-ls.md)
