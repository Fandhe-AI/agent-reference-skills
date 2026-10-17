---
source: https://docs.docker.com/build/metadata/attestations/slsa-provenance/
---

# Provenance attestations

Provenance attestations record facts about the build: timestamps, build parameters and environment, version control metadata, source details, and materials (files, scripts) consumed. By default they follow SLSA provenance schema v0.2; SLSA Provenance v1 is optional via `version`.

## Signature / Usage

```console
$ docker buildx build --tag <namespace>/<image>:<version> \
    --attest type=provenance,mode=[min,max],version=[v0.2,v1] .
```

Shorthand: `--provenance=true`; with parameters `--provenance=mode=max,version=v1`.

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `mode` | `min` (default), `max` | Level of detail in the attestation. |
| `version` | `v0.2` (default), `v1` | SLSA provenance schema version. |

## Notes

### Mode

`min` includes: build timestamps, the frontend used, build materials, source repository and revision, build platform, reproducibility. It excludes values of build arguments, identities of secrets, and rich layer metadata, so it is safe for all builds.

`max` includes everything in `min` plus: the LLB definition of the build, Dockerfile information (including a full base64-encoded copy), and source maps relating build steps to image layers. Prefer `mode=max` when possible for analysis.

Min-mode attestation (abridged from the official example):

```json
{
  "_type": "https://in-toto.io/Statement/v0.1",
  "predicateType": "https://slsa.dev/provenance/v0.2",
  "predicate": {
    "builder": { "id": "" },
    "buildType": "https://mobyproject.org/buildkit@v1",
    "invocation": {
      "configSource": { "entryPoint": "Dockerfile" },
      "parameters": {
        "frontend": "gateway.v0",
        "args": { "cmdline": "docker/dockerfile:1", "source": "docker/dockerfile:1", "target": "binaries" },
        "locals": [{ "name": "context" }, { "name": "dockerfile" }]
      },
      "environment": { "platform": "linux/arm64" }
    },
    "metadata": {
      "reproducible": false,
      "completeness": { "parameters": true, "environment": true, "materials": false },
      "https://mobyproject.org/buildkit@v1#metadata": {
        "vcs": { "revision": "a9ba846486420e07d30db1107411ac3697ecab68", "source": "git@github.com:<org>/<repo>.git" }
      }
    }
  }
}
```

SLSA v1:

```console
$ docker buildx build --tag <namespace>/<image>:<version> \
    --attest type=provenance,mode=max,version=v1 .
```

### Inspecting Provenance

All provenance data is under `.Provenance`:

```console
$ docker buildx imagetools inspect <namespace>/<image>:<version> \
    --format "{{ json .Provenance.SLSA }}"
$ docker buildx imagetools inspect <namespace>/<image>:<version> \
    --format '{{ range (index .Provenance.SLSA.metadata "https://mobyproject.org/buildkit@v1#metadata").source.infos }}{{ if eq .filename "Dockerfile" }}{{ .data }}{{ end }}{{ end }}' | base64 -d
```

The second extracts the full Dockerfile source from `mode=max` provenance.

### Other notes

- `mode=max` exposes the values of build arguments. If you misuse build arguments to pass credentials or tokens, refactor to secret mounts, which never leak into provenance attestations.
- The max-mode official example additionally includes `buildConfig.llbDefinition`, source `locations` / `infos` (with the base64 Dockerfile `data`), and a `layers` map; those blocks are not reproduced here.

## Related

- [Build attestations](./attestations.md)
- [SBOM attestations](./sbom.md)
- [Build secrets](./secrets.md)
