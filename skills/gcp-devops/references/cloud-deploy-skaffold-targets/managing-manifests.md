---
source: https://docs.cloud.google.com/deploy/docs/using-skaffold/managing-manifests
---

# Managing manifests in Cloud Deploy

How Cloud Deploy renders manifests with Skaffold: raw manifests, Helm, Kustomize and kpt, different manifests per target through Skaffold profiles, and substituting an image at release creation. Rendering has two stages: the manifest tool generates the manifest, then Skaffold substitutes image references with the images in the release.

## Signature / Usage

### Generate a `skaffold.yaml`

```bash
gcloud components install skaffold
```

```bash
skaffold init --skip-build
```

Result (run in the repository that contains the manifests):

```yaml
apiVersion: skaffold/v4beta7
kind: Config
metadata:
  name: sample-app
manifests:
  rawYaml:
    - k8s-manifests/deployment.yaml
    - k8s-manifests/rbac.yaml
    - k8s-manifests/redis.yaml
    - k8s-manifests/service.yaml
```

### Render raw manifests

```text
manifests:
  rawYaml:
    - PATH_TO_MANIFEST
```

### Render with Helm

```yaml
apiVersion: skaffold/v4beta7
kind: Config
manifests:
  helm:
    releases:
      - name: RELEASE_NAME
        chartPath: PATH_TO_HELM_CHART
```

### Render with Kustomize

```yaml
apiVersion: skaffold/v4beta7
kind: Config
manifests:
  kustomize:
    paths:
      - PATH_TO_KUSTOMIZE
```

### Different manifests per target (profiles)

Raw manifests:

```yaml
apiVersion: skaffold/v4beta7
kind: Config
profiles:
  - name: prod
    manifests:
      rawYaml:
        - prod.yaml
  - name: staging
    manifests:
      rawYaml:
        - staging.yaml
```

Kustomize:

```yaml
apiVersion: skaffold/v4beta7
kind: Config
profiles:
  - name: prod
    manifests:
      kustomize:
        paths:
          - environments/prod
  - name: staging
    manifests:
      kustomize:
        paths:
          - environments/staging
```

Profiles are referenced per stage in the delivery pipeline config:

```text
serialPipeline:
  stages:
  - targetId: staging-target
    profiles:
    - staging
  - targetId: prod-target
    profiles:
    - prod
```

### Substitute a specific image at release creation

A manifest with a placeholder image name.

Adapted (not in the official docs): `apiVersion: v1` is not valid for a `Deployment`; the example uses `apps/v1`.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: getting-started
  labels:
    app: nginx
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: my-app-image
```

```bash
gcloud deploy releases create test-release-001 \
  --project=test-gke-using-deployment \
  --region=us-central1 \
  --delivery-pipeline=my-gke-demo-app-1 \
  --images=my-app-image=gcr.io/google-containers/nginx@sha256:f49a843c290594dcf4d193535d1f4ba8af7d56cea2cf79d1e9554f077f1e7aaa
```

## Options / Props

| Placeholder / flag | Description |
|--------------------|-------------|
| `RELEASE_NAME` | Name of the Helm chart instance for this release |
| `PATH_TO_HELM_CHART` | Local path to a packaged Helm chart or an unpacked chart directory |
| `PATH_TO_KUSTOMIZE` | Path to the Kustomization files; the default is `["."]` |
| `--images=NAME=TAG` | Replaces the placeholder image name in the manifest with the given (for example SHA-qualified) image |

## Notes

- Corrected from the official docs: the source's placeholder manifest says `apiVersion: v1` with `kind: Deployment`; changed to `apps/v1`.
- Caution (source): Skaffold will be removed from gcloud CLI releases after January 15, 2027 (install it per https://skaffold.dev/docs/install/ afterwards); the Skaffold GitHub repository will be archived on January 29, 2027. This affects `gcloud components install skaffold`.
- Supported renderers: raw manifests, Helm, Kustomize and kpt. When you first create a release, deployment to the first target happens automatically.
- Cloud Deploy calls `skaffold render` at release creation (replacing untagged image names with tagged ones) and `skaffold apply` when promoting.
- The `gcr.io/google-containers/nginx` image reference is copied exactly from the source and is illustrative only; for your own images use an Artifact Registry path such as `LOCATION-docker.pkg.dev/PROJECT/REPO/IMAGE` (Container Registry was shut down on March 18, 2025).
- Consider Artifact Registry for storing Helm charts or Kustomizations.
- Source: https://docs.cloud.google.com/deploy/docs/using-skaffold/managing-manifests (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [using-skaffold.md](./using-skaffold.md)
- [getting-started-skaffold.md](./getting-started-skaffold.md)
- [select-tool-version.md](./select-tool-version.md)
