---
source: https://docs.docker.com/reference/cli/docker/context/export/
---

# docker context export

Export a context to a tar archive FILE or a tar stream on STDOUT, for use with `docker context import`.

## Signature / Usage

```console
$ docker context export [OPTIONS] CONTEXT [FILE|-]
$ docker context export my-context -
```

## Notes

- The default output filename is `<CONTEXT>.dockercontext`. Use `-` as the filename to export to `STDOUT`.

## Related

- [docker context import](./context-import.md)
