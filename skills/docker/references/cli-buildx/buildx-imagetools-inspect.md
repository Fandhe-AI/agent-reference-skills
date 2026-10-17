---
source: https://docs.docker.com/reference/cli/docker/buildx/imagetools/inspect/
---

# docker buildx imagetools inspect

Show details of an image in the registry.

## Signature / Usage

```console
$ docker buildx imagetools inspect [OPTIONS] NAME
$ docker buildx imagetools inspect alpine
Name:      docker.io/library/alpine:latest
MediaType: application/vnd.docker.distribution.manifest.list.v2+json
Digest:    sha256:21a3deaa0d32a8057914f36584b5288d2e5ecc984380bc0118285c70fa8c9300

Manifests:
  Name:      docker.io/library/alpine:latest@sha256:e7d88de73db3d3fd9b2d63aa7f447a10fd0220b7cbf39803c803f2af9ba256b3
  MediaType: application/vnd.docker.distribution.manifest.v2+json
  Platform:  linux/amd64
```

## Options / Props

| Name | Default | Description |
| --- | --- | --- |
| `--format` | `{{.Manifest}}` | Format the output using the given Go template |
| `--raw` | | Show original, unformatted JSON manifest |

## Notes

- `--format` fields: `.Name` (reference of the image), `.Manifest` (manifest or manifest list), `.Image` (image config). Provenance and SBOM are available as `.Provenance` (SLSA) and `.SBOM` (SPDX) in the examples. A `json` template function renders JSON: `--format "{{json .Manifest}}"`; `--format "{{json .}}"` prints everything.
- Multi-platform images are supported for `.Image`, `.SLSA` and `.SBOM`. Pick a platform with the `index` template function: `--format '{{json (index .Image "linux/s390x")}}'`.
- `--raw` prints the original JSON manifest (pipe to `jq` to pretty-print).

### Examples

```console
$ docker buildx imagetools inspect alpine --format "{{.Name}}"
$ docker buildx imagetools inspect crazymax/buildkit:attest --format "{{json .Provenance}}"
$ docker buildx imagetools inspect --raw moby/buildkit:master | jq
```

## Related

- [docker buildx imagetools create](./buildx-imagetools-create.md)
- [Build attestations](../build/attestations.md)
