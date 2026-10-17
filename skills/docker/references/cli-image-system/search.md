---
source: https://docs.docker.com/reference/cli/docker/search/
---

# docker search

Search Docker Hub for images.

## Signature / Usage

```console
$ docker search [OPTIONS] TERM
```

```console
$ docker search busybox
$ docker search --filter=stars=3 --no-trunc busybox
$ docker search --filter is-official=true --filter stars=3 busybox
$ docker search --format "{{.Name}}: {{.StarCount}}" nginx
$ docker search --format "table {{.Name}}\t{{.IsOfficial}}" nginx
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `-f`, `--filter` |  | Filter output based on conditions provided |
| `--format` |  | Pretty-print search using a Go template |
| `--limit` |  | Max number of search results |
| `--no-trunc` |  | Don't truncate output |

Supported filters (`key=value`; pass multiple flags for multiple filters):

| Filter | Description |
| --- | --- |
| `stars` | int, number of stars the image has |
| `is-automated` | boolean, whether the image is automated (deprecated) |
| `is-official` | boolean, whether the image is official |

`--format` placeholders:

| Placeholder | Description |
| --- | --- |
| `.Name` | Image Name |
| `.Description` | Image description |
| `.StarCount` | Number of stars for the image |
| `.IsOfficial` | "OK" if image is official |

## Notes

- If `--limit` is not set, the default is set by the daemon.
- With `--format`, output is exactly as the template declares; the `table` directive adds column headers.
- The `is-automated` filter is deprecated.

## Related

- [docker image pull](./image-pull.md)
- [docker login](./login.md)
