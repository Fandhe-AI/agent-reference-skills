---
source: https://docs.docker.com/reference/cli/docker/image/ls/
---

# docker image ls

List images. Aliases: `docker image list`, `docker images`.

## Signature / Usage

```console
$ docker image ls [OPTIONS] [REPOSITORY[:TAG]]
```

```console
$ docker images
$ docker images java:8
$ docker images --filter "dangling=true"
$ docker images --format "table {{.ID}}\t{{.Repository}}\t{{.Tag}}"
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `-a`, `--all` |  | Show all images (default hides intermediate and dangling images) |
| `--digests` |  | Show digests |
| `-f`, `--filter` |  | Filter output based on conditions provided |
| `--format` |  | Format output using a custom template: `table` (default, with headers), `table TEMPLATE`, `json`, or `TEMPLATE` (Go template). See https://docs.docker.com/go/formatting/ |
| `--no-trunc` |  | Don't truncate output |
| `-q`, `--quiet` |  | Only show image IDs |
| `--tree` |  | API 1.47+ **experimental (CLI)** List multi-platform images as a tree (EXPERIMENTAL) |

Supported filters (`key=value`; repeat the flag for multiple filters):

| Filter | Description |
| --- | --- |
| `dangling` | boolean (true or false) |
| `label` | `label=<key>` or `label=<key>=<value>` |
| `before` | `<image-name>[:<tag>]`, `<image id>` or `<image@digest>`: images created before the given id or reference |
| `since` | `<image-name>[:<tag>]`, `<image id>` or `<image@digest>`: images created since the given id or reference |
| `reference` | pattern of an image reference |

`--format` placeholders:

| Placeholder | Description |
| --- | --- |
| `.ID` | Image ID |
| `.Repository` | Image repository |
| `.Tag` | Image tag |
| `.Digest` | Image digest |
| `.CreatedSince` | Elapsed time since the image was created |
| `.CreatedAt` | Time when the image was created |
| `.Size` | Image disk size |

## Notes

- By default only top-level images are shown; intermediate layers are hidden (use `-a` to include them). Untagged leaf images typically still appear as `<none>:<none>` rows; the official reference states that dangling images are also hidden by default, which does not match the usual output.
- `SIZE` is the cumulative space of the image and all its parent images, which is also the disk space used by the tar file created by `docker save`. An image with multiple repository names or tags is listed more than once (matching `IMAGE ID`) but counts toward `SIZE` once.
- `[REPOSITORY[:TAG]]` must be an exact match (`docker images jav` does not match `java`); if nothing matches, the list is empty.
- Images in the v2 or later format have a content-addressable `digest`; it can be used with `pull`, `create`, `run`, `rmi`, and in a Dockerfile `FROM`.
- The `dangling` filter shows untagged leaf images (left when a new build takes `repo:tag` away); combine with `docker rmi $(docker images -f "dangling=true" -q)` for batch cleanup.
- Multiple `reference` filters match A or B: `docker images --filter=reference='busy*:uclibc' --filter=reference='busy*:glibc'`.
- `docker image ls` does not support negative label filtering (`label!=`), which `docker image prune` does.

## Related

- [docker image prune](./image-prune.md)
- [docker image rm](./image-rm.md)
- [docker image history](./image-history.md)
