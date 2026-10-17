---
source: https://docs.docker.com/reference/cli/docker/buildx/imagetools/create/
---

# docker buildx imagetools create

Create a new manifest list based on source manifests. The sources can be manifest lists or single platform distribution manifests and must already exist in the registry where the new manifest is created.

## Signature / Usage

```console
$ docker buildx imagetools create [OPTIONS] [SOURCE...]
$ docker buildx imagetools create \
  --annotation "index:org.opencontainers.image.authors=dvdksn" \
  --tag foo/bar:latest \
  foo/bar:alpha foo/bar:beta foo/bar:gamma
```

## Options / Props

| Name | Default | Description |
| --- | --- | --- |
| `--annotation` | | Add annotation to the image |
| `--append` | | Append to existing manifest |
| `--dry-run` | | Show final image instead of pushing |
| `-f`, `--file` | | Read source descriptor from file |
| `--metadata-file` | | Write create result metadata to a file |
| `-p`, `--platform` | | Filter specified platforms of target image |
| `--prefer-index` | `true` | When only a single source is specified, prefer outputting an image index or manifest list instead of performing a carbon copy |
| `--progress` | `auto` | Set type of progress output (`auto`, `none`, `plain`, `rawjson`, `tty`). Use plain to show container output |
| `-t`, `--tag` | | Set reference for new image |

## Notes

- With a single source that is a manifest list or image index, create performs a carbon copy. With a single source that is not a list or index, the output is a manifest list; disable with `--prefer-index=false` to attempt to preserve the source manifest format.
- `--annotation` supports only the type prefixes `index:` and `manifest-descriptor:`; it doesn't support annotating manifests or OCI layouts.
- `--append` appends the new sources to an existing manifest list in the destination.
- `--dry-run` does not push, just shows the image.
- `-f` reads sources from files; a source can be a manifest digest, manifest reference, or a JSON OCI descriptor object. Annotations or extra platform properties such as `os.version` and `os.features` must be in the OCI descriptor JSON. The descriptor in the file is merged with an existing descriptor in the registry if present.
- `--metadata-file` writes JSON (e.g. `containerimage.descriptor`, `image.name`); the directory must exist and be writable.

### Examples

```console
$ docker buildx imagetools inspect --raw alpine | jq '.manifests[0] | .platform."os.version"="10.1"' > descr.json
$ docker buildx imagetools create -f descr.json myuser/image
```

## Related

- [docker buildx imagetools inspect](./buildx-imagetools-inspect.md)
- [Annotations](../build/annotations.md)
