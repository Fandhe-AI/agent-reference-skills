---
source: https://docs.docker.com/build/metadata/attestations/
---

# Build attestations

Attestations describe how an image was built and what it contains. BuildKit creates them at build time and attaches them to the final image as metadata. Two types: SBOM (software artifacts the image contains or was built from) and Provenance (how the image was built).

## Signature / Usage

Provenance attestations with `mode=min` are added to images by default. Customize with `--provenance` and `--sbom`:

```bash
# Opt in to SBOM attestations:
docker buildx build --sbom=true .
# Opt in to max-level provenance attestations:
docker buildx build --provenance=mode=max .
# Opt out of provenance attestations:
docker buildx build --provenance=false .
```

Disable default provenance with the `BUILDX_NO_DEFAULT_ATTESTATIONS` environment variable.

## Notes

### Driver and image store support

Attestations attach to an image index, which the classic image store cannot hold. With the default `docker` driver on a classic image store the build fails:

```text
ERROR: failed to build: Attestation is not supported for the docker driver.
Switch to a different driver, or turn on the containerd image store, and try again.
```

| Driver | Attestation support |
| --- | --- |
| `docker` | Requires the containerd image store |
| `docker-container` | Supported |
| `kubernetes` and `remote` | Supported |

If you do not want to switch, opt out with `--provenance=false --sbom=false`. Pushing with `--push` keeps attestations; loading with `--load` brings back the image store requirement.

### Storage

- Attestations use the in-toto format; records are JSON blobs attached as a manifest in the image index, so they can be inspected in a registry without pulling the whole image.
- All BuildKit exporters support attestations. The `local` and `tar` exporters write attestations to JSON files in the root directory of the export.

Attestation manifest structure: each attestation manifest refers to a single image manifest (one platform variant) and contains a single layer (`application/vnd.in-toto+json`) with an annotation `in-toto.io/predicate-type`, e.g. `https://spdx.dev/Document`.

```json
{
  "schemaVersion": 2,
  "mediaType": "application/vnd.oci.image.manifest.v1+json",
  "config": {
    "mediaType": "application/vnd.oci.image.config.v1+json",
    "size": 167,
    "digest": "sha256:916d7437a36dd0e258e64d9c5a373ca5c9618eeb1555e79bd82066e593f9afae"
  },
  "layers": [
    {
      "mediaType": "application/vnd.in-toto+json",
      "size": 1833349,
      "digest": "sha256:3138024b98ed5aa8e3008285a458cd25a987202f2500ce1a9d07d8e1420f5491",
      "annotations": {
        "in-toto.io/predicate-type": "https://spdx.dev/Document"
      }
    }
  ]
}
```

### Attestations as OCI artifacts

With the `oci-artifact` option (`image` / `registry` exporters) set to `true`:

- An `artifactType` field is added with value `application/vnd.docker.attestation.manifest.v1+json`.
- `config` is an empty descriptor instead of a "dummy" config.
- A `subject` field is added, pointing to the image manifest the attestation refers to.

### Other notes

- Starting with BuildKit v0.32.0, attestations are stored as OCI artifacts when OCI media types are enabled; `BUILDX_NO_DEFAULT_OCI_ARTIFACT=1` makes Buildx set `oci-artifact=false` (see the build variables page).

## Related

- [SBOM attestations](./sbom.md)
- [Provenance attestations](./slsa-provenance.md)
- [Build variables](./build-variables.md)
