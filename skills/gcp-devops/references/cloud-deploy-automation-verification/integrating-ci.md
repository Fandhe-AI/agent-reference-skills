---
source: https://docs.cloud.google.com/deploy/docs/integrating-ci
---

# Integrating Cloud Deploy with CI

To invoke a Cloud Deploy delivery pipeline from your continuous integration (CI) system, add a `gcloud deploy releases create` call at the point where the application is ready to be deployed. Your CI process builds and places the images so Cloud Deploy can reference them.

## Signature / Usage

### Create a release from CI

Adapted (not in the official docs): the source's `[KEY=VALUE,...]` / `[IMAGE_LIST]` optional-argument brackets are replaced by the help's concrete forms (`KEY=VALUE`, `NAME=TAG`).

```bash
gcloud deploy releases create RELEASE_NAME \
  --delivery-pipeline=PIPELINE_NAME \
  --region=REGION \
  --annotations=KEY=VALUE \
  --images=NAME=TAG
```

With a direct image reference:

```bash
gcloud deploy releases create my-release \
  --delivery-pipeline=web-app \
  --region=us-central1 \
  --images=image1=path/to/image1:v1@sha256:45db24
```

With a date and time in the release name (`'$DATE'` and `'$TIME'` must be single-quoted; UTC on the machine where the command runs):

```bash
gcloud deploy releases create rel-'$DATE'-'$TIME' \
  --delivery-pipeline=web-app \
  --region=us-central1 \
  --images=image1=path/to/image1:v1@sha256:45db24
```

With provenance annotations:

```bash
gcloud deploy releases create web-app-1029rel \
  --delivery-pipeline=web-app \
  --region=us-central1 \
  --annotations=commitId=0065ca0,author=user@company.com \
  --images=image1=path/to/image1:v1@sha256:45db24
```

### Cloud Build: Docker build, push, then create a release

This must be used as a Cloud Build SCM trigger because it relies on `$COMMIT_SHA`. Replace `REPO_LOCATION`, `IMAGE_NAME` and `PIPELINE_NAME`.

```yaml
steps:
# Build and tag using commit sha
- name: 'gcr.io/cloud-builders/docker'
  args: ['build', '.', '-t', 'REPO_LOCATION/$PROJECT_ID/IMAGE_NAME:${COMMIT_SHA}', '-f', 'Dockerfile']
# Push the container image
- name: 'gcr.io/cloud-builders/docker'
  args: ['push', 'REPO_LOCATION/$PROJECT_ID/IMAGE_NAME:${COMMIT_SHA}']
# Create release in Google Cloud Deploy
- name: gcr.io/google.com/cloudsdktool/cloud-sdk
  entrypoint: gcloud
  args:
    [
      "deploy", "releases", "create", "rel-${SHORT_SHA}",
      "--delivery-pipeline", "PIPELINE_NAME",
      "--region", "us-central1",
      "--annotations", "commitId=${REVISION_ID}",
      "--images", "IMAGE_NAME=REPO_LOCATION/$PROJECT_ID/IMAGE_NAME:${COMMIT_SHA}"
    ]
```

### Cloud Build: Skaffold build with a build artifacts file

```yaml
steps:
- name: gcr.io/k8s-skaffold/skaffold
  args:
    - skaffold
    - build
    - '--interactive=false'
    - '--file-output=/workspace/artifacts.json'
- name: gcr.io/google.com/cloudsdktool/cloud-sdk
  entrypoint: gcloud
  args:
    [
      "deploy", "releases", "create", "rel-${SHORT_SHA}",
      "--delivery-pipeline", "PIPELINE_NAME",
      "--region", "us-central1",
      "--annotations", "commitId=${REVISION_ID}",
      "--build-artifacts", "/workspace/artifacts.json"
    ]
```

## Options / Props

### releases create arguments

| Argument | Description |
|----------|-------------|
| `RELEASE_NAME` | Required. Dynamic names via `'$DATE'` / `'$TIME'` (single-quoted); `'rel-$TIME'` at 3:07pm UTC resolves to `rel-1507`. |
| `--delivery-pipeline` | Required. Name of the registered delivery pipeline. |
| `--region` | Region in which the release is created; need not be the region you deploy to. |
| `--annotations` | Optional key-value pairs (for example `commitId=0065ca0`) returned on `list` / `get` and shown in the console; use to track provenance. |
| `--images` | Comma-separated image-name-to-image-path replacements. The image name in the unrendered manifest is replaced by the full reference in the rendered manifest. Not needed with `--build-artifacts`. |
| `--build-artifacts` | Path to a Skaffold build artifacts output file. Use instead of `--images`. |

### Required IAM for the caller

| Requirement | Detail |
|-------------|--------|
| Role | `roles/clouddeploy.releaser` (or equivalent permissions). |
| `actAs` | On the service account used to deploy to the first target and the service account used for render. |
| Cloud Build trigger | The service account running the trigger needs `roles/clouddeploy.releaser` (or equivalent) and `actAs` to deploy to the first target. |

## Notes

- Prerequisites: the Cloud Deploy, Cloud Build, Cloud Storage and GKE APIs enabled (the source's link enables `clouddeploy.googleapis.com`, `cloudbuild.googleapis.com`, `storage-component.googleapis.com`, `container.googleapis.com`), at least one registered delivery pipeline, and at least one target that the pipeline references.
- A release name needs to be unique per committed change; the source uses `rel-${SHORT_SHA}`. The Skaffold example's prose says "based on the date" but the config uses `rel-${SHORT_SHA}`.
- The source also connects GitHub Actions through the `create-cloud-deploy-release` action and GitLab through the `create-cloud-deploy-release` component. Cloud Build is Google Cloud's managed build service; GitHub Actions workflows are in `github-docs`.
- Adapted from the official docs: the original `--annotations=[KEY=VALUE,...] \` and `--images=[IMAGE_LIST]` are written as `--annotations=KEY=VALUE \` and `--images=NAME=TAG`.
- Corrected from the official docs: the source names the `clouddeploy.releaser` role without its `roles/` prefix; the role ID is `roles/clouddeploy.releaser`.
- In the Docker build example `REPO_LOCATION/$PROJECT_ID/IMAGE_NAME` stands for the Artifact Registry image path; an Artifact Registry path also needs the repository name, `LOCATION-docker.pkg.dev/PROJECT_ID/REPOSITORY/IMAGE_NAME` (Container Registry was shut down on March 18, 2025). Keep tokens and passwords out of `args`, `env` and substitutions; use `availableSecrets` with `secretEnv`.
- Source: https://docs.cloud.google.com/deploy/docs/integrating-ci (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [cloud-deploy-service-account.md](./cloud-deploy-service-account.md)
- [automation.md](./automation.md)
