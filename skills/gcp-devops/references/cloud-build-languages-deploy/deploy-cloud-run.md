---
source: https://docs.cloud.google.com/build/docs/deploying-builds/deploy-cloud-run
---

# Deploy to Cloud Run from Cloud Build

Use Cloud Build to deploy an existing image, build and deploy an image, or automate deployment to Cloud Run with a trigger. This page covers the Cloud Build side only; Cloud Run itself is in the `gcp-run` skill. Cloud Deploy is the alternative for a continuous-delivery pipeline to Cloud Run.

## Signature / Usage

### Build, push and deploy

```yaml
steps:
# Build the image
- name: 'gcr.io/cloud-builders/docker'
  args: ['build', '-t', 'LOCATION-docker.pkg.dev/PROJECT_ID/REPOSITORY/IMAGE', '.']
# Push the image to Artifact Registry
- name: 'gcr.io/cloud-builders/docker'
  args: ['push', 'LOCATION-docker.pkg.dev/PROJECT_ID/REPOSITORY/IMAGE']
# Deploy image to Cloud Run
- name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
  entrypoint: gcloud
  args: ['run', 'deploy', 'SERVICE_NAME', '--image', 'LOCATION-docker.pkg.dev/PROJECT_ID/REPOSITORY/IMAGE', '--region', 'SERVICE_REGION']
images:
- 'LOCATION-docker.pkg.dev/PROJECT_ID/REPOSITORY/IMAGE'
```

Run it from the project root, where `LOCATION` is a supported build region:

```bash
gcloud builds submit --region=LOCATION
```

### Continuous deployment with a trigger

Tags the image with `$COMMIT_SHA`, which Cloud Build populates when triggered from a Git repository.

```yaml
steps:
# Build the image
- name: 'gcr.io/cloud-builders/docker'
  args: ['build', '-t', 'LOCATION-docker.pkg.dev/PROJECT_ID/REPOSITORY/IMAGE/SERVICE_NAME:$COMMIT_SHA', '.']
# Push the image to Artifact Registry
- name: 'gcr.io/cloud-builders/docker'
  args: ['push', 'LOCATION-docker.pkg.dev/PROJECT_ID/REPOSITORY/IMAGE/SERVICE_NAME:$COMMIT_SHA']
# Deploy image to Cloud Run
- name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
  entrypoint: gcloud
  args:
    - 'run'
    - 'deploy'
    - 'SERVICE_NAME'
    - '--image'
    - 'LOCATION-docker.pkg.dev/PROJECT_ID/REPOSITORY/IMAGE/SERVICE_NAME:$COMMIT_SHA'
    - '--region'
    - 'SERVICE_REGION'
images:
- 'LOCATION-docker.pkg.dev/PROJECT_ID/REPOSITORY/IMAGE/SERVICE_NAME:$COMMIT_SHA'
```

## Options / Props

### Roles for the build service account

The source says to enable these for the specified (user-specified) or default Cloud Build service account on the Cloud Build **Permissions** page.

| Role | Purpose |
|------|---------|
| Cloud Run Admin (`roles/run.admin`) | Deploy new services to Cloud Run; also choose a service account to impersonate when prompted |
| Storage Admin (`roles/storage.admin`) | Read and write Cloud Storage |
| Artifact Registry Writer (`roles/artifactregistry.writer`) | Pull from and write to Artifact Registry |
| Logs Writer (`roles/logging.logWriter`) | Write log entries to Cloud Logging |
| Cloud Build Editor (`roles/cloudbuild.builds.editor`) | Run builds |

`roles/run.admin` does not include `iam.serviceAccounts.actAs`. The source's **Assign Service Account User Role** panel (choose a service account to impersonate) is the console step that covers it: the build service account needs Service Account User (`roles/iam.serviceAccountUser`) on the service account the Cloud Run service runs as.

Adapted (not in the official docs): the console panel step as a gcloud command; it grants the role on the runtime service account only, not on the project.

```bash
gcloud iam service-accounts add-iam-policy-binding RUNTIME_SERVICE_ACCOUNT_EMAIL \
  --member="serviceAccount:BUILD_SERVICE_ACCOUNT_EMAIL" \
  --role="roles/iam.serviceAccountUser"
```

### Placeholders

| Name | Description |
|------|-------------|
| `REPOSITORY` | Artifact Registry repository the image is deployed from |
| `LOCATION` | Repository location, such as `us-east1` (in `gcloud builds submit --region`, a supported build region) |
| `PROJECT_ID` | Project where the image is stored |
| `SERVICE_NAME` | Cloud Run service name |
| `SERVICE_REGION` | Region of the Cloud Run service |
| `IMAGE` | Image name in Artifact Registry |
| `RUNTIME_SERVICE_ACCOUNT_EMAIL` | Service account the Cloud Run service runs as (its service identity) |
| `BUILD_SERVICE_ACCOUNT_EMAIL` | The user-specified or default Cloud Build service account |

## Notes

- Required APIs: Cloud Build, Cloud Run, Artifact Registry and Resource Manager. With VPC Service Controls, set up a private pool in the perimeter and configure Cloud Run for VPC Service Controls.
- `roles/run.admin` and `roles/storage.admin` are broad; grant them to a user-specified build service account, not the legacy or default account, and prefer narrower roles where possible. The source's Assign Service Account User Role step lets you choose a service account to impersonate.
- Adapted from the official docs: the source covers `iam.serviceAccounts.actAs` only through the console's Assign Service Account User Role panel. Deploying needs `roles/iam.serviceAccountUser` (which contains `iam.serviceAccounts.actAs`) on the Cloud Run service identity, as the Cloud Run troubleshooting page states for deployers (see the `gcp-run` skill); the page adds the per-service-account `gcloud iam service-accounts add-iam-policy-binding` form. Without it, `gcloud run deploy` from the build fails with `iam.serviceaccounts.actAs` denied.
- A trigger's region must match the region of the Cloud Run service it deploys to. The source's trigger creation is Console-only (event, source branch or tag, `cloudbuild.yaml` location).
- The source's note on making the deployed service public: a one-time change to the service IAM settings. Making a service public opens it to callers without authentication; nothing in these examples does it.
- The source states that `$COMMIT_SHA` is populated by Cloud Build when triggered from a Git repository, so the trigger example is meant for trigger-started builds.
- Sample repositories: `deploy-prebuilt` and `run-example-builddeploy` in GoogleCloudPlatform/cloud-build-samples.
- Source: https://docs.cloud.google.com/build/docs/deploying-builds/deploy-cloud-run (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [deploy-gke.md](./deploy-gke.md)
- [build-containers.md](./build-containers.md)
- Cloud Deploy to Cloud Run: https://docs.cloud.google.com/deploy/docs/deploy-app-run
- Creating and managing build triggers: https://docs.cloud.google.com/build/docs/automating-builds/create-manage-triggers
