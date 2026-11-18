---
source: https://docs.cloud.google.com/deploy/docs/using-skaffold/getting-started-skaffold
---

# Getting started with Skaffold in Cloud Deploy

Minimum `skaffold.yaml` for a Cloud Deploy delivery pipeline (GKE, GKE attached clusters, Cloud Run), generating a `skaffold.yaml` from a single manifest, profiles, Kustomize / Helm support, and the Skaffold features Cloud Deploy does not support.

## Signature / Usage

### Minimum configuration (header, `manifests`, `deploy`)

The source shows these as separate fragments. Header:

```yaml
apiVersion: skaffold/v4beta7
kind: Config
```

`manifests` for GKE, GKE attached clusters or Cloud Run:

```yaml
manifests:
  rawYaml:
  - deployment.yaml
```

`deploy` for GKE / GKE attached clusters:

```yaml
deploy:
  kubectl: {}
```

`deploy` for Cloud Run targets:

```yaml
deploy:
  cloudrun: {}
```

### Have Cloud Deploy generate `skaffold.yaml` from a Kubernetes manifest

```bash
gcloud deploy releases create RELEASE_NAME --delivery-pipeline=PIPELINE_NAME --from-k8s-manifest=MANIFEST --region=REGION
```

For a Cloud Run service YAML use `--from-run-manifest` instead of `--from-k8s-manifest`.

### Kustomize: a `deploy` / `manifests` stanza per profile

```yaml
apiVersion: skaffold/v4beta7
kind: Config
build:
  artifacts:
    - image: my-app-web-profiles
      context: my-app-web-profiles
    - image: my-app-application-profiles
      context: my-app-application-profiles
  googleCloudBuild:
    projectId: ${PROJECT_ID}
profiles:
- name: local
  manifests:
    kustomize:
      paths:
        - my-app-application-profiles/kubernetes/local
- name: test
  manifests:
    kustomize:
      paths:
        - my-app-application-profiles/kubernetes/test
- name: staging
  manifests:
    kustomize:
      paths:
        - my-app-application-profiles/kubernetes/staging
- name: prod
  manifests:
    kustomize:
      paths:
        - my-app-application-profiles/kubernetes/prod
deploy:
  kubectl: {}
```

### Helm: a `helm` stanza

```yaml
apiVersion: skaffold/v4beta7
kind: Config
build:
  artifacts:
  - image: skaffold-helm-image
manifests:
  helm:
    releases:
    - name: skaffold-helm-image
      chartPath: charts
deploy:
  kubectl: {}
```

## Options / Props

### Required `skaffold.yaml` content

| Item | Requirement |
|------|-------------|
| Header | `apiVersion: skaffold/v4beta7` and `kind: Config` |
| `manifests` | For GKE, GKE attached clusters or Cloud Run: list of raw manifests (`rawYaml`), unless Helm / Kustomize renders them |
| `deploy` | `deploy.kubectl` for GKE / GKE attached clusters; `deploy.cloudrun` for Cloud Run |
| Custom targets | Header plus the custom actions the custom target uses, unless the custom target type references a remote Skaffold configuration |

### `gcloud deploy releases create` flags for generated configs

| Flag | Meaning |
|------|---------|
| `--from-k8s-manifest` | Generate `skaffold.yaml` from a Kubernetes manifest |
| `--from-run-manifest` | Generate `skaffold.yaml` from a Cloud Run service YAML |
| `--skaffold-file` / `--source` | Mutually exclusive with both `--from-*` flags (using them together is an error) |

### Features not supported in Cloud Deploy

| Feature | Detail |
|---------|--------|
| Lifecycle hooks | Skaffold lifecycle hooks cannot be used |
| Dynamic Skaffold modules | `--module=` selection not supported; static modules are supported |
| Helm namespace creation | Automatic creation of a namespace if it does not exist is not available |

## Notes

- Caution (source): Skaffold will be removed from gcloud CLI releases after January 15, 2027; install it per https://skaffold.dev/docs/install/. The Skaffold GitHub repository will be archived on January 29, 2027.
- Caution (source): the generated `skaffold.yaml` is not suitable for production workloads. It is for onboarding, learning and demos; for production use profiles per target. When starting from it, use the file in the rendering source archive (Cloud Storage `.tar.gz`, **Artifacts** tab of Release details), not the rendered file in Target artifacts.
- The generated file is placed in the Cloud Storage source staging directory after the release completes.
- In the Kustomize example, the `deploy` stanza name is the source's wording, but Skaffold uses the `manifests.kustomize` paths to render the manifest for the target, not to deploy. Cloud Deploy supports only `kubectl` as deployer, even with Helm.
- Skaffold `apiVersion` values are copied as the source writes them (`skaffold/v4beta7`).
- Helm charts can be on a file system, in a repository or in an OCI repository. Profiles can be used with Helm.
- In `dev` mode Skaffold watches sources and redeploys to e.g. minikube; stopping `dev` mode cleans up deployed artifacts. Cloud Code for VS Code / IntelliJ integrate Skaffold.
- The source also shows Console screenshots.
- Source: https://docs.cloud.google.com/deploy/docs/using-skaffold/getting-started-skaffold (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [using-skaffold.md](./using-skaffold.md)
- [managing-manifests.md](./managing-manifests.md)
- [gke-targets.md](./gke-targets.md)
- [run-targets.md](./run-targets.md)
- [custom-targets.md](./custom-targets.md)
