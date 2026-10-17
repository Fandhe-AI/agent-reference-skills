---
source: https://docs.docker.com/reference/cli/docker/buildx/history/export/
---

# docker buildx history export

Export one or more build records to `.dockerbuild` archive files. The archives contain metadata, logs, and build outputs, and can be imported into Docker Desktop or shared across environments.

## Signature / Usage

```console
$ docker buildx history export [OPTIONS] [REF...]
$ docker buildx history export qu2gsuo8ejqrwdfii23xkkckt --output mybuild.dockerbuild
```

## Options / Props

| Name | Default | Description |
| --- | --- | --- |
| `--all` | | Export all build records for the builder |
| `--finalize` | | Ensure build records are finalized before exporting |
| `-o`, `--output` | | Output file path |

## Notes

- `--finalize`: clients can report their own traces concurrently, and not all traces may be saved by the time of the export; the flag ensures all traces are finalized.
- Output can be redirected with the shell: `docker buildx history export ^1 > mybuild.dockerbuild`.
- Find build IDs with `docker buildx history ls`. `--builder` selects a builder and `--debug` enables debug logging.

### Examples

```console
docker buildx history export --all -o all-builds.dockerbuild
docker buildx history export --builder builder0 ^1 -o builder0-build.dockerbuild
docker buildx history export --finalize qu2gsuo8ejqrwdfii23xkkckt -o finalized-build.dockerbuild
```

## Related

- [docker buildx history import](./buildx-history-import.md)
- [docker buildx history ls](./buildx-history-ls.md)
