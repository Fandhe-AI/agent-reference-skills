---
source: https://docs.cloud.google.com/build/docs/securing-builds/generate-validate-build-provenance
---

# Generate and validate build provenance

Build provenance is verifiable data about a build: digests of built images, input source locations, build arguments and build duration. Cloud Build generates provenance that meets SLSA level 3 assurance, based on SLSA specification versions 0.1 and 1.0, and records `buildType` details for the SLSA v1.0 spec (see https://docs.cloud.google.com/build/gcb-buildtypes/google-worker/v1).

## Signature / Usage

### Generate provenance for container images

Use the `images` field (not an explicit `docker push` step) and set `requestedVerifyOption: VERIFIED`; the build succeeds only if provenance is generated.

```yaml
steps:
- name: 'gcr.io/cloud-builders/docker'
  args: [ 'build', '-t', 'LOCATION-docker.pkg.dev/PROJECT_ID/REPOSITORY/IMAGE', '.' ]
images: ['LOCATION-docker.pkg.dev/PROJECT_ID/REPOSITORY/IMAGE']
```

In the `options` section of the build config, set `requestedVerifyOption` to `VERIFIED`:

```yaml
options:
  requestedVerifyOption: VERIFIED
```

### View provenance for a container image

```bash
gcloud artifacts docker images describe \
LOCATION-docker.pkg.dev/PROJECT_ID/REPOSITORY/IMAGE@sha256:HASH \
--show-provenance --format=FORMAT
```

### View provenance for non-container artifacts

For standalone Go, Java (Maven), Python and Node.js (npm) applications uploaded to Artifact Registry, run a build with one of the Cloud Build language guides, note the `BuildID`, then call the Container Analysis API.

```bash
alias gcurl='curl -H "Authorization: Bearer $(gcloud auth print-access-token)" -H "Content-Type: application/json"'

PROJECT_ID="PROJECT_ID"
LOCATION="LOCATION"
BUILD_ID="BUILD_ID"

FILTER="kind%3D%22BUILD%22%20AND%20build.inTotoSlsaProvenanceV1.predicate.runDetails.metadata.invocationId%3D%22https%3A%2F%2Fcloudbuild.googleapis.com%2Fv1%2Fprojects%2F${PROJECT_ID}%2Flocations%2F${LOCATION}%2Fbuilds%2F${BUILD_ID}%22"

gcurl "https://containeranalysis.googleapis.com/v1/projects/${PROJECT_ID}/occurrences?filter=${FILTER}"
```

### Validate provenance with the SLSA verifier

Install slsa-verifier version 2.1 or higher.

```bash
go install github.com/slsa-framework/slsa-verifier/v2/cli/slsa-verifier@VERSION
```

```bash
export IMAGE=LOCATION-docker.pkg.dev/PROJECT_ID/REPOSITORY/IMAGE@sha256:HASH
```

```bash
gcloud auth configure-docker LOCATION-docker.pkg.dev
```

Adapted (not in the official docs): `$IMAGE` is quoted so the digest reference is passed as one argument.

```bash
gcloud artifacts docker images describe "$IMAGE" --format json --show-provenance > provenance.json
```

```bash
slsa-verifier verify-image "$IMAGE" \
--provenance-path provenance.json \
--source-uri SOURCE \
--builder-id=BUILDER_ID
```

Add `--print-provenance` to print the validated provenance for a policy engine. Output is `PASSED: Verified SLSA provenance` or `FAILED: SLSA verification failed: <error details>`.

### Validate provenance metadata with gcloud, jq and openssl

```bash
mkdir provenance && cd provenance
```

Adapted (not in the official docs): the source fetches the `builtByGCB` key (`--key builtByGCB`) but then verifies `signatures[0]` (`provenanceSigner`). This fetches the public key named by the `keyid` of `signatures[0]`, the signature verified below.

```bash
KEYID=$(gcloud artifacts docker images describe \
LOCATION-docker.pkg.dev/PROJECT_ID/REPOSITORY/IMAGE@sha256:HASH --show-provenance \
  --format=json | jq -r '.provenance_summary.provenance[] | select(.build.intotoStatement.predicateType == "https://slsa.dev/provenance/v0.1") | .envelope.signatures[0].keyid')
gcloud kms keys versions get-public-key "${KEYID##*/}" \
  --key="${KEYID%/cryptoKeyVersions/*}" --output-file=my-key.pub
```

Decode the payload (SLSA v0.1 shown; change `predicateType` to `https://slsa.dev/provenance/v1` for v1.0).

```bash
gcloud artifacts docker images describe \
LOCATION-docker.pkg.dev/PROJECT_ID/REPOSITORY/IMAGE@sha256:HASH --show-provenance \
  --format=json | jq -r '.provenance_summary.provenance[] | select(.build.intotoStatement.predicateType == "https://slsa.dev/provenance/v0.1") | .envelope.payload' | tr '\-_' '+/' | base64 -d > provenance.json
```

Decode the signature.

```bash
gcloud artifacts docker images describe LOCATION-docker.pkg.dev/PROJECT_ID/REPOSITORY/IMAGE@sha256:HASH --show-provenance \
--format=json | jq -r '.provenance_summary.provenance[] | select(.build.intotoStatement.predicateType == "https://slsa.dev/provenance/v0.1") | .envelope.signatures[0].sig' | tr '\-_' '+/' | base64 -d > signature.bin
```

The first signature (`provenanceSigner`) is over the PAE-formatted envelope; transform the provenance into `"DSSEv1" + SP + LEN(type) + SP + type + SP + LEN(body) + SP + body` before verifying.

Adapted (not in the official docs): the source builds the PAE with `echo -n "... $(cat provenance.json)" > provenance.json`, which drops trailing newlines from the body (so the bytes no longer match `LEN(body)`) and overwrites the payload. This writes the header with `printf` and appends the payload bytes unchanged to a separate file, `pae.bin`.

```bash
LEN=$(wc -c < provenance.json | tr -d ' ')
{ printf 'DSSEv1 28 application/vnd.in-toto+json %s ' "${LEN}"; cat provenance.json; } > pae.bin
```

```bash
openssl dgst -sha256 -verify my-key.pub -signature signature.bin pae.bin
```

After a successful validation the output is `Verified OK`.

## Options / Props

| Placeholder | Meaning |
|---|---|
| `LOCATION` | Regional or multi-regional location of the Artifact Registry repository |
| `PROJECT_ID` | Google Cloud project ID |
| `REPOSITORY` | Artifact Registry repository name |
| `IMAGE` | Container image name |
| `HASH` | sha256 hash of the image, found in the build output |
| `FORMAT` | Optional gcloud output format |
| `LOCATION` (curl example) | Region where the build ran, for example `us-central1` |
| `BUILD_ID` | ID of the build of interest |
| `SOURCE` | Source repository URI of the image, for example `github.com/my-repo/my-application` |
| `BUILDER_ID` | Unique builder ID, for example `https://cloudbuild.googleapis.com/GoogleHostedWorker` |

### Provenance output notes

| Item | Behavior |
|---|---|
| `digest` / `fileHash` | Refer to the same object; `digest` is hex-encoded (SLSA 1.0), `fileHash` is base64 (SLSA 0.1) |
| Signatures (SLSA 0.1) | Two signatures on `envelope`: `provenanceSigner` (DSSE-conformant, verifiable in Binary Authorization policies, recommended for new usages) and `builtByGCB` (legacy) |
| `resolvedDependencies` | Dependencies you specify in the build file are included here |
| Payload | Base64 encoded provenance metadata; the output is long |

## Notes

- Source: https://docs.cloud.google.com/build/docs/securing-builds/generate-validate-build-provenance (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Limitations: Cloud Build generates provenance only for artifacts stored in Artifact Registry. Repository attachments, including provenance, are not subject to cleanup policies; they are deleted when the image they are attached to is deleted (https://docs.cloud.google.com/artifact-registry/docs/store-artifact-metadata-in-attachments#attach-cleanup).
- Cloud Build cannot generate provenance if the image is pushed to Artifact Registry with an explicit `docker push` step; use the `images` field.
- Before you begin: enable the Cloud Build, Container Analysis and Artifact Registry APIs (needs `serviceusage.services.enable`), install gcloud (run `gcloud components update` for the latest), have source code and an Artifact Registry repository.
- The source's example output was omitted. It shows `image_summary` (`digest`, `fully_qualified_digest`, `registry`, `repository`, `slsa_build_level`) and `provenance_summary` with an `inTotoSlsaProvenanceV1` statement (`buildDefinition` with `buildType: https://cloud.google.com/build/gcb-buildtypes/google-worker/v1`, `externalParameters`, `internalParameters.systemSubstitutions`, `resolvedDependencies`; `runDetails` with builder id `https://cloudbuild.googleapis.com/GoogleHostedWorker`), the DSSE `envelope` with `payloadType: application/vnd.in-toto+json` and signatures keyed by `projects/verified-builder/locations/global/keyRings/attestor/cryptoKeys/google-hosted-worker/cryptoKeyVersions/1`.
- To record verifiable metadata about the service account that initiated a build, see https://docs.cloud.google.com/build/docs/building/build-containers#use-cosign.
- Both SLSA 0.1 and 1.0 provenance are stored when available; to filter for 1.0 use `predicateType` `https://slsa.dev/provenance/v1` in the jq commands.
- The PAE transform applies to the first signature (`provenanceSigner`). To verify the second signature (`builtByGCB`, `signatures[1]`), take `KEYID` and the signature from `signatures[1]`, skip the PAE step and verify `provenance.json` itself.
- Source inconsistency: the public key command uses `--key builtByGCB` (the legacy second signature) while the following commands decode `signatures[0]` (`provenanceSigner`) and apply the PAE transform. The source says to use the `keyid` field to choose the key, and its SLSA v1.0 example output shows `keyid` `projects/verified-builder/locations/global/keyRings/attestor/cryptoKeys/google-hosted-worker/cryptoKeyVersions/1`. Adapted from the official docs: the key command takes the key name from the `keyid` of the verified signature (the source's `--key builtByGCB` command does not match `signatures[0]`), and the PAE step writes to `pae.bin` with `printf` so the payload keeps its exact bytes. The `keyid` is assumed to have the form shown in the source's example output (`projects/.../cryptoKeyVersions/N`).
- The `gcloud container analysis occurrences list` variant shown in the source for non-container artifacts was omitted because that command is not present in the gcloud 593.0.0 help. The `curl` call to the Container Analysis API above is the equivalent. Filtering on nested JSON fields like `invocationId` can be slower than on top-level indexed fields in projects with many occurrences. Artifact Analysis and Binary Authorization are covered by the `gcp-security` skill.
- Adapted from the official docs: the source used `gcloud artifacts docker images describe $IMAGE` (unquoted variable).
- The source also shows Console (Security insights panel), the JSON form of the configs, and a `gcloud container analysis occurrences list` command.

## Related

- [cloud-build-service-account.md](./cloud-build-service-account.md)
- [cmek.md](./cmek.md)
