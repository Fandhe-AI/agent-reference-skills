---
source: https://docs.cloud.google.com/build/docs/configuring-builds/create-basic-configuration
---

# Create a basic build configuration file

A build config file defines the fields Cloud Build needs to perform your tasks. You need one when you start builds with the `gcloud` CLI or with build triggers. It can be written in YAML (`cloudbuild.yaml`) or JSON (`cloudbuild.json`) in the project root directory. The only required field is the `name` of a step; every other field is optional.

## Signature / Usage

### A first step and its arguments

`name` points to a container image (a Cloud Builder or any publicly available image). `args` is passed to the builder's entrypoint; if the builder has no entrypoint, the first element of `args` is used as the entrypoint. `${PROJECT_ID}` is a default substitution resolved at build time.

```yaml
steps:
- name: 'gcr.io/cloud-builders/docker'
  args: ['build', '-t', 'us-central1-docker.pkg.dev/${PROJECT_ID}/my-docker-repo/my-image', '.']
```

### Complete example (YAML)

Builds and pushes an image to Artifact Registry, then runs a `gcloud` step with an `entrypoint`, a step `timeout` and `env` variables.

```yaml
steps:
  # Docker Build
  - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '-t', 
           'us-central1-docker.pkg.dev/${PROJECT_ID}/my-docker-repo/myimage', 
           '.']

  # Docker Push
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', 
           'us-central1-docker.pkg.dev/${PROJECT_ID}/my-docker-repo/myimage']

  # Entrypoint, timeout and environment variables
  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
    entrypoint: 'gcloud'
    timeout: 240s
    args: ['compute', 'instances', 
           'create-with-container', 'my-vm-name',
           '--container-image', 
           'us-central1-docker.pkg.dev/${PROJECT_ID}/my-docker-repo/myimage']
    env:
      - 'CLOUDSDK_COMPUTE_REGION=us-central1'
      - 'CLOUDSDK_COMPUTE_ZONE=us-central1-a'
```

### Complete example (JSON)

```json
{
   "steps": [
      {
         "name": "gcr.io/cloud-builders/docker",
         "args": [
            "build",
            "-t",
            "us-central1-docker.pkg.dev/${PROJECT_ID}/my-docker-repo/myimage",
            "."
         ]
      },
      {
         "name": "gcr.io/cloud-builders/docker",
         "args": [
            "push",
            "us-central1-docker.pkg.dev/${PROJECT_ID}/my-docker-repo/myimage"
         ]
      },
      {
         "name": "gcr.io/google.com/cloudsdktool/cloud-sdk",
         "entrypoint": "gcloud",
         "timeout": "240s",
         "args": [
            "compute",
            "instances",
            "create-with-container",
            "my-vm-name",
            "--container-image",
            "us-central1-docker.pkg.dev/${PROJECT_ID}/my-docker-repo/myimage"
         ],
         "env": [
            "CLOUDSDK_COMPUTE_REGION=us-central1",
            "CLOUDSDK_COMPUTE_ZONE=us-central1-a"
         ]
      }
   ]
}
```

## Options / Props

| Field | Where | Description |
|-------|-------|-------------|
| `name` | step | Container image that runs the step. The only required field. |
| `args` | step | Arguments passed to the builder's entrypoint (or, without an entrypoint, the first element is the entrypoint). |
| `entrypoint` | step | Overrides the image entrypoint, for example `gcloud`. |
| `env` | step | List of `KEY=value` environment variables for the step. |
| `timeout` | step | Step timeout, for example `240s`. |
| `tags`, `timeout` | build | Further build-level configuration; see the Build Configuration Overview for the full field list. |
| `options.machineType` | build (`options`) | Machine type for the build; set under `options`, not at the top level (see the build config file schema). |
| `images` | build | Images to push to Artifact Registry when the build succeeds. |
| `artifacts` | build | Non-container artifacts stored in Cloud Storage. |

## Notes

- Source: https://docs.cloud.google.com/build/docs/configuring-builds/create-basic-configuration (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- The example does not include all available fields; the full list is in the Build Configuration Overview (`https://docs.cloud.google.com/build/docs/build-config`).
- Deprecated: `gcloud compute instances create-with-container` is marked in the gcloud 593.0.0 help: "The option to deploy a container during VM creation using the container startup agent is deprecated. Use alternative services to run containers on your VMs." The source form is kept here only to illustrate `entrypoint`, `timeout` and `env`.
- `gcr.io/cloud-builders/*` builder images are hosted on Artifact Registry and are not affected by the Container Registry shutdown.
- The source also shows the step-by-step YAML and JSON fragments; they are folded into the complete examples above.

## Related

- [substitute-variable-values.md](./substitute-variable-values.md)
- [configure-build-step-order.md](./configure-build-step-order.md)
- [pass-data-between-steps.md](./pass-data-between-steps.md)
- [submit-build-via-cli-api.md](./submit-build-via-cli-api.md)
