---
source: https://docs.docker.com/reference/cli/docker/image/inspect/
---

# docker image inspect

Display detailed information on one or more images.

## Signature / Usage

```console
$ docker image inspect [OPTIONS] IMAGE [IMAGE...]
```

```console
$ docker image inspect --format '{{.Os}}/{{.Architecture}}' imported:latest
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `-f`, `--format` |  | Format output using a custom template: `json` prints JSON; `TEMPLATE` prints using the given Go template. See https://docs.docker.com/go/formatting/ |
| `--platform` |  | API 1.49+ Inspect a specific platform of the multi-platform image. If the image or the server is not multi-platform capable, the command errors out if the platform does not match. `os[/arch[/variant]]`: explicit platform (e.g. linux/amd64) |

## Related

- [docker inspect](./inspect.md)
- [docker image ls](./image-ls.md)
