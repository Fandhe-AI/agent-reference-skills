---
source: https://docs.docker.com/reference/cli/docker/system/df/
---

# docker system df

Show docker disk usage: the amount of disk space used by the Docker daemon.

## Signature / Usage

```console
$ docker system df [OPTIONS]
```

```console
$ docker system df

TYPE                TOTAL               ACTIVE              SIZE                RECLAIMABLE
Images              5                   2                   16.43 MB            11.63 MB (70%)
Containers          2                   0                   212 B               212 B (100%)
Local Volumes       2                   1                   36 B                0 B (0%)

$ docker system df -v
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `--format` |  | Format output using a custom template: `table` (default, with headers), `table TEMPLATE`, `json`, or `TEMPLATE` (Go template). See https://docs.docker.com/go/formatting/ |
| `-v`, `--verbose` |  | Show detailed information on space usage |

## Notes

- With `-v`, the output lists images, containers, and local volumes. In the image listing, `SHARED SIZE` is the space an image shares with another one (their common data), `UNIQUE SIZE` is space used only by that image, and `SIZE` is the virtual size (the sum of `SHARED SIZE` and `UNIQUE SIZE`).
- Network information isn't shown because it doesn't consume disk space.

## Related

- [docker system prune](./system-prune.md)
- [docker image prune](./image-prune.md)
