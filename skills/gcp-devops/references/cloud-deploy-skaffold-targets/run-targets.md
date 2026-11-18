---
source: https://docs.cloud.google.com/deploy/docs/run-targets
---

# Deploy to Cloud Run targets

Cloud Deploy deploys Cloud Run services, jobs and worker pools. You need a target with a `run` stanza, a `skaffold.yaml` with `deploy.cloudrun`, and a service / job / worker pool definition. All Cloud Deploy features work for services and worker pools; canary deployments are not supported for jobs.

## Signature / Usage

### Target configuration

```text
run:
 location: projects/[project_name]/locations/[region_name]
```

```yaml
apiVersion: deploy.cloud.google.com/v1
kind: Target
metadata:
 name: dev
description: development service
run:
 location: projects/my-app/locations/us-central1
```

### Skaffold configuration

```yaml
apiVersion: skaffold/v4beta7
kind: Config
metadata: 
  name: cloud-run-application
manifests:
  rawYaml:
  - service.yaml
deploy:
  cloudrun: {}
```

### Service definition (`service.yaml`)

Adapted (not in the official docs): `[SERVICE_NAME]` and `[IMAGE_PATH]` would parse as YAML lists; they are written as plain upper-case placeholders.

```yaml
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
 name: SERVICE_NAME
spec:
 template:
  spec:
   containers:
   - image: IMAGE_PATH
```

Copy an existing definition:

Adapted (not in the official docs): `[service_name]` becomes the upper-case placeholder `SERVICE_NAME`.

```bash
gcloud run services describe SERVICE_NAME --format=export
```

### Job definition (`job.yaml`)

Adapted (not in the official docs): the source's `spec.template` and the following `spec` are at the same indentation level (invalid structure); the Cloud Run Job schema nests `spec.template.spec.template.spec.containers` (as in the Cloud Run jobs documentation). Bracketed placeholders are replaced by upper-case ones.

```yaml
apiVersion: run.googleapis.com/v1
kind: Job
metadata:
 name: JOB_NAME
spec:
  template:
    spec:
      template:
        spec:
          containers:
          - image: IMAGE_PATH
```

Adapted (not in the official docs): `[job_name]` becomes `JOB_NAME`.

```bash
gcloud run jobs describe JOB_NAME --format=export
```

### Worker pool definition (`workerpool.yaml`)

Adapted (not in the official docs): bracketed placeholders replaced by upper-case ones (a bracketed value would parse as a YAML list).

```yaml
apiVersion: run.googleapis.com/v1
kind: WorkerPool
metadata:
 name: WORKERPOOL_NAME
 annotations:
  run.googleapis.com/launch-stage: BETA
spec:
  template:
   spec:
    containers:
    - image: IMAGE_PATH
```

Adapted (not in the official docs): `[workerpool_name]` becomes `WORKERPOOL_NAME`.

```bash
gcloud beta run worker-pools describe WORKERPOOL_NAME --format=export
```

### Deploy a Cloud Run function

Get the function's service YAML:

```bash
gcloud run services describe FUNCTION_NAME \
--format=export \
--region=REGION \
--project=PROJECT
```

Build the function into a container with Cloud Build:

```bash
gcloud builds submit --pack image=REGION-docker.pkg.dev/PROJECT/cloud-run-source-deploy/IMAGE_NAME \
--project=PROJECT \
--region=REGION
```

Create a release with Cloud Deploy:

```bash
gcloud deploy releases create RELEASE_NAME \
--project=DEPLOY_PROJECT \
--region=REGION \
--delivery-pipeline=DELIVERY_PIPELINE \
--images=IMAGE_TAG=REGION-docker.pkg.dev/PROJECT/cloud-run-source-deploy/IMAGE_NAME
```

## Options / Props

### Limitations and prerequisites

| Item | Detail |
|------|--------|
| Resources per target | One Cloud Run service, job or worker pool per target |
| Canary | Not supported for Cloud Run jobs; supported for services and worker pools |
| gcloud CLI | Version `541.0.0` or greater |
| Functions | Build the function into a container and deploy it as a Cloud Run service |
| Target location | `run.location`: `projects/<project>/locations/<region>`; any region Cloud Run supports |

### Definition file conventions

| Resource | Conventional file name | `kind` |
|----------|------------------------|--------|
| Service | `service.yaml` | `Service` (`serving.knative.dev/v1`) |
| Job | `job.yaml` | `Job` (`run.googleapis.com/v1`) |
| Worker pool | `workerpool.yaml` | `WorkerPool` (`run.googleapis.com/v1`, annotation `run.googleapis.com/launch-stage: BETA`) |

### Annotations to remove from a function's `service.yaml`

| Annotation |
|------------|
| `run.googleapis.com/build-base-image` |
| `run.googleapis.com/build-name` |
| `run.googleapis.com/build-source-location` |
| `run.googleapis.com/build-enable-automatic-updates` |

## Notes

- Corrected from the official docs: for functions the source says to replace the value in `spec.spec.containers.image`; a Cloud Run Service definition has no `spec.spec`, and the image is at `spec.template.spec.containers[].image` (as in the service definition on this page), so that path is used.
- Corrected from the official docs: bracketed placeholders such as `name: [SERVICE_NAME]` / `image: [IMAGE_PATH]`, and the job's mis-indented `spec` under `template` (the source shows `spec:` / `template:` / `spec:` at one level), were rewritten so the YAML parses.
- The job definition is corrected to the Cloud Run Job structure (`spec.template.spec.template.spec.containers`) shown on https://docs.cloud.google.com/run/docs/create-jobs (`gcp-run` skill); compare with the output of `gcloud run jobs describe JOB_NAME --format=export` before use.
- For functions: also replace the value in `spec.template.spec.containers[].image` with `IMAGE_TAG` (the `--images` flag then substitutes it), and separate the build step from the deploy step in CI. Cloud Run functions rebuild source on every deploy, so each target could get a different artifact, contrary to Cloud Deploy best practice.
- Targets must be in the same project and region as the delivery pipeline; the Cloud Run resources can be in other projects and regions if the execution service account has access. Recommended: a different project per Cloud Run service, job or worker pool; for more than one in the same project use Skaffold profiles.
- Cloud Deploy always uses the project and location from the target, even if `deploy.cloudrun` has values (leave `{}`).
- Redeploying a service creates a new revision from the new `service.yaml`; settings or labels absent from the new YAML are absent from the new revision.
- The `gcloud run ... describe` commands take the region from `--region` or the `run/region` property; a run with neither reports "You must specify a region" (gcloud 593.0.0). Add `--region=REGION` as in the function example when scripting.
- Jobs are not necessarily run after deploy; trigger them as in the Cloud Run docs (`gcp-run`).
- Multi-project deployment needs the execution service account to have access to those projects.
- The `[project_name]` / `[region_name]` target pattern is shown in a `text` fence as a resource-name pattern.
- The source also shows Console steps.
- Source: https://docs.cloud.google.com/deploy/docs/run-targets (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [gke-targets.md](./gke-targets.md)
- [parallel.md](./parallel.md)
- [getting-started-skaffold.md](./getting-started-skaffold.md)
