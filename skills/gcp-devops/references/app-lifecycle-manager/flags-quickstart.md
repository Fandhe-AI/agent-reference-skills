---
source: https://docs.cloud.google.com/app-lifecycle-manager/flags/flags-quickstart
---

# Deploy feature flags (quickstart)

Create, deploy and use a feature flag with App Lifecycle Manager: build a Python Flask app image that reads the flag through an OpenFeature `flagd` provider, package a Terraform blueprint that deploys it to Cloud Run, create a unit kind, release and unit, then create the flag, a flag revision and release, and roll it out. All flag commands use the gcloud `beta` track.

## Signature / Usage

### Grant permissions to the App Lifecycle Manager service agent

The service agent is `service-PROJECT_NUMBER@gcp-sa-saasservicemgmt.iam.gserviceaccount.com`.

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
    --member="serviceAccount:service-PROJECT_NUMBER@gcp-sa-saasservicemgmt.iam.gserviceaccount.com" \
    --role="roles/saasservicemgmt.serviceAgent"
```

### Create an Artifact Registry repository

```bash
gcloud artifacts repositories create flags-quickstart \
    --repository-format=docker \
    --location=us-central1
```

### Build and push the application image

Run in the `alm_docker` directory that holds the Flask application (`flags.py`, `requirements.txt`, `Dockerfile`):

```bash
export DOCKER_REGISTRY="us-central1-docker.pkg.dev/PROJECT_ID/flags-quickstart"
export FULL_IMAGE_PATH="${DOCKER_REGISTRY}/flags-quickstart:latest"
docker build -t "${FULL_IMAGE_PATH}" .
docker push "${FULL_IMAGE_PATH}"
```

### Create the Terraform blueprint (`alm_terraform`)

`main.tf`:

```terraform
locals {
  config_path = "projects/${var.system_unit_project}/locations/${var.system_unit_location}/featureFlagsConfigs/${var.system_unit_name}"
  docker_image_path = "${var.system_unit_location}-docker.pkg.dev/${var.system_unit_project}/${var.docker_repo_name}/${var.docker_tag}"
}

provider "google" {
  project = var.system_unit_project
  region  = var.system_unit_location
}

resource "google_cloud_run_service" "flags_quickstart_service" {
  name     = var.cloud_run_service_name
  location = var.system_unit_location
  project  = var.system_unit_project

  template {
    spec {
      containers {
        image = local.docker_image_path 

        env {
          name  = "FLAGD_SOURCE_PROVIDER_ID"
          value = local.config_path
        }
      }
      service_account_name = var.actuation_sa
    }
  }
}
```

`variables.tf`:

```terraform
variable "actuation_sa" {
  description = "Actuation SA"
  type        = string
}

variable "system_unit_project" {
  description = "Project id - variable set by App Lifecycle Manager"
  type        = string
}

variable "system_unit_location" {
  description = "Location - variable set by App Lifecycle Manager"
  type        = string
}

variable "system_unit_name" {
  description = "Unit name- variable set by App Lifecycle Manager"
  type = string
}

variable "docker_repo_name" {
  description = "The name of the Artifact Registry repository where the Docker image is stored."
  type        = string
  default     = "flags-quickstart"
}

variable "docker_tag" {
  description = "The tag of the Docker image to deploy."
  type        = string
  default     = "flags-quickstart:latest"
}

variable "cloud_run_service_name" {
  description = "Name for the Cloud Run service to be created."
  type        = string
  default     = "saas-flags-quickstart-svc"
}
```

### Package the blueprint and create a unit

In the Terraform directory, `Dockerfile`:

```docker
# syntax=docker/dockerfile:1-labs
FROM scratch
COPY --exclude=Dockerfile --exclude=.git --exclude=.gitignore . /
```

Adapted (not in the official docs): the `$IMAGE_NAME`, `$ENGINE_TYPE` and `$ENGINE_VERSION` expansions are quoted.

```bash
IMAGE_NAME="us-central1-docker.pkg.dev/PROJECT_ID/flags-quickstart/flags-quickstart-blueprint:latest"
ENGINE_TYPE=inframanager
ENGINE_VERSION=1.5.7

docker buildx build -t "$IMAGE_NAME" \
  --push \
  --annotation "com.easysaas.engine.type=$ENGINE_TYPE" \
  --annotation "com.easysaas.engine.version=$ENGINE_VERSION" \
  --provenance=false .
```

Adapted (not in the official docs): `--blueprint-package=$IMAGE_NAME` is quoted.

```bash
# Create unit kind
gcloud beta app-lifecycle-manager unit-kinds create flags-unit-kind \
  --project=PROJECT_ID \
  --location=global \
  --saas=flags-quickstart-saas-offering

# Create release referencing the Blueprint image
gcloud beta app-lifecycle-manager releases create flags-release \
  --project=PROJECT_ID \
  --location=global \
  --unit-kind=flags-unit-kind \
  --blueprint-package="$IMAGE_NAME"
```

Adapted (not in the official docs): the source creates the unit kind and release only in `global` but the unit in `us-central1`; gcloud does not replicate App Lifecycle Manager resources across regions, so the SaaS offering, unit kind and release are also created in `us-central1` before the unit.

```bash
gcloud beta app-lifecycle-manager saas create flags-quickstart-saas-offering \
  --project=PROJECT_ID \
  --location=us-central1 \
  --locations=name=us-central1

gcloud beta app-lifecycle-manager unit-kinds create flags-unit-kind \
  --project=PROJECT_ID \
  --location=us-central1 \
  --saas=flags-quickstart-saas-offering

gcloud beta app-lifecycle-manager releases create flags-release \
  --project=PROJECT_ID \
  --location=us-central1 \
  --unit-kind=flags-unit-kind \
  --blueprint-package="$IMAGE_NAME"
```

```bash
gcloud beta app-lifecycle-manager units create flags-quickstart-unit \
  --project=PROJECT_ID \
  --location=us-central1 \
  --unit-kind=flags-unit-kind \
  --management-mode=user
```

### Create and provision the feature flag

Adapted (not in the official docs): `PROJECT_ID` is added because the source's later commands use `${PROJECT_ID}` without defining it (set it to your project ID).

```bash
export PROJECT_ID="YOUR_PROJECT_ID"
export FLAG_ID="quickstart-flag"
export FLAG_KEY="quickstart-flag"
export SAAS_OFFERING_ID="flags-quickstart-saas-offering"
export UNIT_KIND_ID="flags-unit-kind"
export UNIT_ID="flags-quickstart-unit"
export ROLLOUT_KIND_ID="flags-quickstart-rollout-kind"
export ROLLOUT_ID="flags-quickstart-rollout"
```

Adapted (not in the official docs): `--flag-value-type=BOOL` becomes `bool` (the gcloud 593.0.0 beta help lists `bool`, `double`, `int`, `string`) and the variable expansions are quoted.

```bash
gcloud beta app-lifecycle-manager flags create "${FLAG_ID}" \
  --project="${PROJECT_ID}" \
  --key="${FLAG_KEY}" \
  --flag-value-type=bool \
  --location=global \
  --unit-kind="${UNIT_KIND_ID}"
```

Adapted (not in the official docs): the variable expansions are quoted.

```bash
export FLAG_REVISION_ID="${FLAG_ID}-rev1"
gcloud beta app-lifecycle-manager flags revisions create "${FLAG_REVISION_ID}" \
  --project="${PROJECT_ID}" \
  --flag="${FLAG_ID}" \
  --location=global
```

Adapted (not in the official docs): the variable expansions are quoted.

```bash
export FLAG_RELEASE_ID="${FLAG_ID}-rel1"
gcloud beta app-lifecycle-manager flags releases create "${FLAG_RELEASE_ID}" \
  --project="${PROJECT_ID}" \
  --revisions="${FLAG_REVISION_ID}" \
  --unit-kind="${UNIT_KIND_ID}" \
  --location=global
```

Adapted (not in the official docs): the variable expansions are quoted.

```bash
gcloud beta app-lifecycle-manager rollout-kinds create "${ROLLOUT_KIND_ID}" \
  --project="${PROJECT_ID}" \
  --unit-kind="${UNIT_KIND_ID}" \
  --rollout-orchestration-strategy=Google.Cloud.Simple.AllAtOnce \
  --location=global
```

Adapted (not in the official docs): the variable expansions are quoted.

```bash
gcloud beta app-lifecycle-manager rollouts create "${ROLLOUT_ID}" \
  --project="${PROJECT_ID}" \
  --flag-release="${FLAG_RELEASE_ID}" \
  --rollout-kind="${ROLLOUT_KIND_ID}" \
  --location=global
```

## Options / Props

| Item | Value |
|------|-------|
| Service agent role | `roles/saasservicemgmt.serviceAgent` on the project |
| Blueprint annotations | `com.easysaas.engine.type=inframanager`, `com.easysaas.engine.version=1.5.7` |
| Unit kind / release / unit | `flags-unit-kind` / `flags-release` / `flags-quickstart-unit` (location `us-central1`, management mode `user`) |
| Rollout kind / rollout | `flags-quickstart-rollout-kind` (`Google.Cloud.Simple.AllAtOnce`) / `flags-quickstart-rollout` |

## Notes

- Adapted from the official docs: the source's `export PROJECT_ID` is missing (its later commands use `${PROJECT_ID}`), `--flag-value-type=BOOL` is `bool` (gcloud 593.0.0 beta help values), and unquoted `$IMAGE_NAME` / `$ENGINE_*` / `${...}` expansions are quoted. The source also shows `gcloud beta app-lifecycle-manager rollouts describe ROLLOUT_ID --project=PROJECT_ID --location=global` to monitor the rollout.
- Prerequisite: a SaaS offering (the commands use `flags-quickstart-saas-offering`; create it first as in the create-saas-offering page).
- The source's quickstart creates the unit but shows no provision operation and no `actuation_sa` value; for gcloud, `unit-operations create --provision --provision-release=RELEASE` is the form in the gcloud 593.0.0 help (see Console provisioning in the deploy-saas-offering page). The `flags create` command shows no `--variants` / `--evaluation-spec`. The flags overview says the service account used by the application needs `roles/saasconfig.viewer`; this quickstart does not show that grant for the `actuation_sa` the Terraform sets as the Cloud Run runtime service account. The `docker_tag` default `flags-quickstart:latest` is appended to the repository path in `docker_image_path`, as in the source.
- The Terraform has no IAM binding for `allUsers`, so it does not make the Cloud Run service public; the source's later "public endpoint" step (`curl YOUR_SERVICE_URL`) does not add one. Do not add `allUsers` / `--allow-unauthenticated` unless you intend to open the service.
- The track: the `flags` group and `rollouts create --flag-release` exist only in `gcloud beta` / `alpha`; the source uses `beta` for the flag, unit-kind, release, unit and rollout commands. Resource replication across regions is not automated for gcloud-created resources (see regionalization); the quickstart mixes `global` (unit kind, release, flag) and `us-central1` (unit).
- Adapted from the official docs: the SaaS offering, unit kind and release are also created in `us-central1` with gcloud, so the `us-central1` unit can reference `flags-unit-kind` (the regionalization page: replication is not automated for gcloud-created resources). If a resource already exists in `us-central1` (for example a SaaS offering created in the console, which replicates it), skip its create command.
- The source runs the Terraform with the actuation service account, which creates and can modify or delete the Cloud Run service; rollouts update live units. Use a disposable project.
- Clean up: if you deployed in a new project and no longer need it, delete it (Manage resources > select the project > Delete; type the project ID > Shut down). Caution from the source: if you delete a project, all the resources in the project are permanently deleted.
- The Python Flask application (`alm_docker/flags.py`, `requirements.txt`, and a `Dockerfile` with `FROM python:3.11-slim`), the zip packaging of the Terraform files, the expected startup log / endpoint output and the Console steps (Cloud Run Logs and Networking tabs) are omitted; see the source page. Other language guides are `flags-python`, `flags-java`, `flags-golang` (not in this skill).
- Source: https://docs.cloud.google.com/app-lifecycle-manager/flags/flags-quickstart (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [flags-overview.md](./flags-overview.md)
- [create-saas-offering.md](./create-saas-offering.md)
- [update-saas-offering.md](./update-saas-offering.md)
- [service-accounts.md](./service-accounts.md)
