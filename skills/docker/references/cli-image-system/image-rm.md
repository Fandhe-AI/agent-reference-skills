---
source: https://docs.docker.com/reference/cli/docker/image/rm/
---

# docker image rm

Remove one or more images. Aliases: `docker image remove`, `docker rmi`.

## Signature / Usage

```console
$ docker image rm [OPTIONS] IMAGE [IMAGE...]
```

```console
$ docker rmi test1:latest
$ docker rmi -f fd484f19954f
$ docker rmi localhost:5000/test/busybox@sha256:cbbf2f9a99b47fc460d422812b6a5adff7dfee951d8fa2e4a98caa0382cfbdbf
$ docker image rm --platform linux/amd64,linux/ppc64le myimage
```

## Options / Props

| Option | Default | Description |
| --- | --- | --- |
| `-f`, `--force` |  | Force removal of the image |
| `--no-prune` |  | Do not delete untagged parents |
| `--platform` |  | API 1.50+ Remove only the given platform variant. Formatted as `os[/arch[/variant]]` (e.g., `linux/amd64`) |

## Notes

- Removes (and un-tags) images from the host node, not from a registry. If an image has multiple tags, passing a tag only removes that tag; removing the last tag removes the image too. All tags referencing an image must be removed before the image itself is removed; digest references are removed automatically when the image is removed by tag.
- An image of a running container cannot be removed without `-f`. With `-f` and a short or long image ID, all tags matching that ID are untagged and the image removed.
- An image pulled by digest has no tag; remove it by `repo@sha256:...`.
- `--platform`: by default all platform variants are removed. Removing a specific platform removes it from all images that reference the same content and requires `--force`; without it a warning is produced and the removal is cancelled (`Content will be removed from all images referencing this variant`). Pass multiple platforms by repeating the flag or with a comma-separated list. Omitted architecture and variant default to the daemon's native values.

## Related

- [docker image ls](./image-ls.md)
- [docker image prune](./image-prune.md)
