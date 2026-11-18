---
source: https://docs.cloud.google.com/build/docs/building/build-containers
---

# Build container images

Build Docker (Linux container) images with Cloud Build using a build config file, a plain `Dockerfile` (`--tag`), or Google Cloud's buildpacks (`--pack`), store them in Artifact Registry, optionally sign them with cosign, and run them. Cloud Build provides the supported prebuilt builder `gcr.io/cloud-builders/docker`. For Windows Server containers, see the gke-windows-builder tutorial linked from the source.

## Signature / Usage

### Build with a build config file

```yaml
steps:
- name: 'gcr.io/cloud-builders/docker'
  args: [ 'build', '-t', 'LOCATION-docker.pkg.dev/PROJECT_ID/REPOSITORY/IMAGE_NAME', '.' ]
```

If the `Dockerfile` is in another directory, add `-f` and its path:

```yaml
steps:
- name: 'gcr.io/cloud-builders/docker'
  args: [ 'build', '-t', 'LOCATION-docker.pkg.dev/PROJECT_ID/REPOSITORY/IMAGE_NAME', '-f', 'DOCKERFILE_PATH', '.' ]
```

Start the build (defaults to the config file and source in the current directory if omitted):

```bash
gcloud builds submit --config CONFIG_FILE_PATH SOURCE_DIRECTORY
```

### Build with a Dockerfile only

```bash
gcloud builds submit --tag LOCATION-docker.pkg.dev/PROJECT_ID/REPOSITORY/IMAGE_NAME
```

### Build with Google Cloud's buildpacks

Adapted (not in the official docs): the source writes `--pack builder=BUILDPACK_BUILDER, \` with a space after the comma, which splits the value; the key/value pairs are written as one comma-separated value as in the gcloud help (`--pack=[builder=BUILDER],[env=ENV],[image=IMAGE]`).

```bash
gcloud builds submit --pack=builder=BUILDPACK_BUILDER,env=ENVIRONMENT_VARIABLE,image=IMAGE_NAME
```

```bash
gcloud builds submit --pack image=us-docker.pkg.dev/gcb-docs-project/containers/gke/hello-app
```

### Store images in Artifact Registry

With the `images` field (stored after the build; image appears in build results):

```yaml
steps:
- name: 'gcr.io/cloud-builders/docker'
  args: [ 'build', '-t', 'LOCATION-docker.pkg.dev/PROJECT_ID/REPOSITORY/IMAGE_NAME', '.' ]
images: ['LOCATION-docker.pkg.dev/PROJECT_ID/REPOSITORY/IMAGE_NAME']
```

With an explicit `docker push` step (image not shown in build results):

```yaml
steps:
- name: 'gcr.io/cloud-builders/docker'
  args: ['build', '-t', 'LOCATION-docker.pkg.dev/PROJECT_ID/REPOSITORY/IMAGE_NAME', '.']
- name: 'gcr.io/cloud-builders/docker'
  args: ['push', 'LOCATION-docker.pkg.dev/PROJECT_ID/REPOSITORY/IMAGE_NAME']
```

Push as part of the flow and show the image in build results (use both):

```yaml
steps:
- name: 'gcr.io/cloud-builders/docker'
  args: ['build', '-t', 'LOCATION-docker.pkg.dev/PROJECT_ID/REPOSITORY/IMAGE_NAME', '.']
- name: 'gcr.io/cloud-builders/docker'
  args: ['push', 'LOCATION-docker.pkg.dev/PROJECT_ID/REPOSITORY/IMAGE_NAME']
images: ['LOCATION-docker.pkg.dev/PROJECT_ID/REPOSITORY/IMAGE_NAME']
```

OCI image via `artifacts.oci`:

```yaml
artifacts:
  oci:
  - file: 'OCI_IMAGE_PATH'
    registryPath: 'https://LOCATION-docker.pkg.dev/PROJECT_ID/REPOSITORY'
    tags: ["primary_image"]
```

### Sign images with cosign

Requires a user-specified service account with permission to generate ID tokens; it cannot be done with the default Cloud Build service account.

Adapted (not in the official docs): the digest file is written from `RepoDigests` after the push (the registry manifest digest) instead of `{{.Id}}`, and `$_IMAGE` is quoted.

```yaml
steps:
- name: 'gcr.io/cloud-builders/docker'
  id: 'tag-and-push'
  script: |
    #!/bin/sh
    set -e
    docker build -t "$_IMAGE" .
    docker push "$_IMAGE"
    docker inspect --format '{{index .RepoDigests 0}}' "$_IMAGE" >image_with_digest
- name: 'gcr.io/cloud-builders/gcloud'
  id: 'generate-token'
  script: |
    #!/bin/sh
    set -e
    gcloud auth print-identity-token --audiences=sigstore > token
- name: 'gcr.io/cloud-builders/docker'
  id: 'sign-image'
  script: |
    #!/bin/sh
    set -e
    docker run \
    --network=cloudbuild \
    --mount source=home-volume,target=/builder/home \
    --rm \
    -e SIGSTORE_NO_CACHE=true \
    -e HOME=/builder/home \
    gcr.io/projectsigstore/cosign \
    sign --identity-token=$(cat token) $(cat image_with_digest) -y
service_account: '$_SERVICE_ACCOUNT'
artifacts:
  images:
  - $_IMAGE
substitutions:
  _IMAGE: 'LOCATION-docker.pkg.dev/PROJECT_ID/REPOSITORY/IMAGE_NAME'
  _SERVICE_ACCOUNT_ID: 'SERVICE_ACCOUNT_ID'
  _SERVICE_ACCOUNT: projects/${PROJECT_ID}/serviceAccounts/${_SERVICE_ACCOUNT_ID}
options:
  env:
  - '_IMAGE=$_IMAGE'
  dynamic_substitutions: true
  logging: CLOUD_LOGGING_ONLY
```

Verify the signature locally (install cosign first):

```bash
cosign verify \
--certificate-identity=SERVICE_ACCOUNT_ID \
--certificate-oidc-issuer=https://accounts.google.com \
IMAGE
```

### Run the built image

```bash
gcloud auth configure-docker us-central1-docker.pkg.dev,asia-northeast1-docker.pkg.dev
```

```bash
docker run LOCATION-docker.pkg.dev/PROJECT_ID/REPOSITORY/IMAGE_NAME
```

## Options / Props

| Name | Description |
|------|-------------|
| `LOCATION` | Regional or multi-regional location of the Artifact Registry repository (for example `us-east1` or `us`) |
| `PROJECT_ID` | Google Cloud project ID |
| `REPOSITORY` | Artifact Registry repository name |
| `IMAGE_NAME` | Container image name |
| `DOCKERFILE_PATH` | Path to the `Dockerfile` |
| `CONFIG_FILE_PATH` / `SOURCE_DIRECTORY` | Build config path and source path or URL |
| `BUILDPACK_BUILDER` | Buildpacks builder; default `gcr.io/buildpacks/builder` |
| `OCI_IMAGE_PATH` | Local directory containing the OCI image, e.g. `/.pack/layout-repo/my-app` |
| `SERVICE_ACCOUNT_ID` | Email of the user-specified service account, e.g. `service-account-name@project-id.iam.gserviceaccount.com`; for `cosign verify` the account expected to have built the image |
| `IMAGE` (verify) | Full image name including the sha256 digest |

## Notes

- Corrected from the official docs: the cosign example wrote `docker inspect $_IMAGE --format "$_IMAGE@{{.Id}}"`. `.Id` is the local image ID (the digest of the image configuration), not the manifest digest the registry stores, so `IMAGE@<Id>` does not name the pushed image; after `docker push`, `{{index .RepoDigests 0}}` gives `REGISTRY/REPOSITORY/IMAGE@sha256:<manifest digest>`.
- `images` vs `docker push`: only images listed in `images` appear on the build's **Build description** page, in `Build.get()` and in `gcloud builds list`.
- Verify signatures against the immutable digest, not a mutable tag.
- Corrected from the official docs: the `--pack` continuation (see above).
- Source inconsistency: the cosign example writes the snake_case keys `service_account` and `dynamic_substitutions`, while the build config schema lists `serviceAccount` and `dynamicSubstitutions`. The example is kept as the source writes it; prefer the schema's camelCase names. A build with a user-specified service account needs a logging setting; the example sets `logging: CLOUD_LOGGING_ONLY`.
- The identity token is written to the `token` file in the workspace and passed to `cosign` on the command line; it is a short-lived credential, but do not print it or upload the workspace as an artifact.
- `gcr.io/cloud-builders/*` builders are hosted on Artifact Registry and are unaffected by the Container Registry shutdown.
- The source also shows JSON forms of every config, a second `--pack` example using `^--^` as the list separator (`gcloud topic escaping`) with a `gcr.io/my-project/myimage` image, and a JSON cosign config that uses `gcloud container images describe` (Container Registry command). They are omitted.
- Dockerfile authoring and the Docker CLI are covered by the `docker` skill; this page covers building and storing images with Cloud Build.
- Source: https://docs.cloud.google.com/build/docs/building/build-containers (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [speeding-up-builds.md](./speeding-up-builds.md)
- [deploy-cloud-run.md](./deploy-cloud-run.md)
- Store build artifacts in Artifact Registry: https://docs.cloud.google.com/artifact-registry/docs/configure-cloud-build
- Authorize service-to-service access: https://docs.cloud.google.com/build/docs/securing-builds/authorize-service-to-service-access
