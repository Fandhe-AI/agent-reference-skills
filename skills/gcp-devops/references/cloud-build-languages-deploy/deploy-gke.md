---
source: https://docs.cloud.google.com/build/docs/deploying-builds/deploy-gke
---

# Deploy to GKE from Cloud Build

The `gke-deploy` builder is a wrapper around `kubectl` that deploys a containerized application to a GKE cluster: it rewrites the Kubernetes resource file to use the image digest instead of a tag, adds recommended labels, retrieves cluster credentials and waits for the submitted resources to be ready. A plain `kubectl` builder is also available; Helm and Kustomize users can use the community `helm` and `kustomize` builders. This page covers the Cloud Build side only; the cluster side is in the `gcp-gke` skill.

## Signature / Usage

### Deploy a prebuilt image

The fence is `text` because the source shows it as a fragment (`steps:` followed by `...`).

```text
steps:
...
# deploy container image to GKE
- name: "gcr.io/cloud-builders/gke-deploy"
  args:
  - run
  - --filename=KUBERNETES_RESOURCE_FILE
  - --location=CLUSTER_LOCATION
  - --cluster=CLUSTER
```

```bash
gcloud builds submit --region=LOCATION --project=PROJECT --config BUILD_CONFIG
```

### Build and deploy a new image

```yaml
steps:
  # build the container image
- name: "gcr.io/cloud-builders/docker"
  args: ["build", "-t", "LOCATION-docker.pkg.dev/PROJECT/REPOSITORY/IMAGE_NAME:TAG", "."]
  # push container image
- name: "gcr.io/cloud-builders/docker"
  args: ["push", "LOCATION-docker.pkg.dev/PROJECT/REPOSITORY/IMAGE_NAME:TAG"]
  # deploy container image to GKE
- name: "gcr.io/cloud-builders/gke-deploy"
  args:
  - run
  - --filename=KUBERNETES_RESOURCE_FILE
  - --image=LOCATION-docker.pkg.dev/PROJECT/REPOSITORY/IMAGE_NAME:TAG
  - --location=CLUSTER_LOCATION
  - --cluster=CLUSTER
```

### Reuse one config across clusters with substitutions

Set `_CLOUDSDK_COMPUTE_ZONE` and `_CLOUDSDK_CONTAINER_CLUSTER` in the trigger's substitution variables.

```text
steps:
...
# deploy container image to GKE
- name: "gcr.io/cloud-builders/gke-deploy"
  args:
  - run
  - --filename=KUBERNETES_RESOURCE_FILE
  - --image=LOCATION-docker.pkg.dev/PROJECT/REPOSITORY/IMAGE_NAME:TAG
  - --location=${_CLOUDSDK_COMPUTE_ZONE}
  - --cluster=${_CLOUDSDK_CONTAINER_CLUSTER}
```

## Options / Props

| Name | Description |
|------|-------------|
| `KUBERNETES_RESOURCE_FILE` | Path of the Kubernetes resource file, or a directory containing the files |
| `CLUSTER_LOCATION` | Region (location) of the cluster |
| `CLUSTER` | Name of the GKE cluster |
| `LOCATION` | In `gcloud builds submit --region`, a supported build location; in the image path, the Artifact Registry repository location (the source also describes it as a build location there) |
| `PROJECT` | Project ID |
| `IMAGE_NAME` / `TAG` | Image name (usually the app name) and tag; `$SHORT_SHA` is a good per-commit tag |
| Kubernetes Engine Developer role | Enable on the Cloud Build **Permissions** page (the source prints no role ID) |

## Notes

- `gke-deploy` can reference only one image per build config; in resource files with several image references, only images beginning with `LOCATION-docker.pkg.dev/PROJECT/REPOSITORY/IMAGE_NAME:TAG` are updated.
- When deploying to multiple clusters, the home directory persists across steps, so the previous step's `kubectl` context is reused; add the environment variable `KUBECONFIG=/tmp/kubeconfig` to each step to avoid this.
- The source says to add Kubernetes Engine Developer to "your account" and enable it on the Cloud Build Permissions page; apply it to the user-specified build service account, not the legacy or default one.
- `$SHORT_SHA` is available only for builds from a repository trigger, not manual builds.
- Cloud Source Repositories: effective June 17, 2024 it is not available to new customers (organizations that used it before are unaffected); use another repository host such as GitHub or Bitbucket. The source still lists it as a source host.
- Trigger creation is Console-only in the source (event, repository, branch or tag regex, configuration, substitution variables). Substitution names must start with `_` and be upper case.
- The two `...` fragments are kept as `text` fences because they are not complete YAML. The source also shows JSON forms and a Console flow to generate a Kubernetes resource file.
- Source: https://docs.cloud.google.com/build/docs/deploying-builds/deploy-gke (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [deploy-cloud-run.md](./deploy-cloud-run.md)
- [build-containers.md](./build-containers.md)
- Cloud Deploy: https://docs.cloud.google.com/deploy/docs
- GitOps-style CI/CD with Cloud Build: https://docs.cloud.google.com/kubernetes-engine/docs/tutorials/gitops-cloud-build
