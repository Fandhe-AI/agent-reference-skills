---
source: https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/concepts/sources-of-truth
---

# Sources of truth

Config Sync automates Kubernetes resource deployment from a central source of truth (Git repository, OCI image, or Helm chart) in place of manual `kubectl` commands.

## Signature / Usage

### Git repository (`git-sync` container)

```yaml
apiVersion: configsync.gke.io/v1beta1
kind: RootSync
metadata:
  name: root-sync
  namespace: config-management-system
spec:
  sourceType: git
  sourceFormat: unstructured
  git:
    repo: https://github.com/example/my-configs.git
    revision: main
    dir: cluster-configs
    auth: none # replace with your authentication method such as ssh or token
    period: 60s
```

### OCI image (`oci-sync` container)

```yaml
apiVersion: configsync.gke.io/v1beta1
kind: RootSync
metadata:
  name: root-sync
  namespace: config-management-system
spec:
  sourceType: oci
  sourceFormat: unstructured
  oci:
    image: us-central1-docker.pkg.dev/my-project/my-repo/my-config-image:v1.0.0
    dir: .
    auth: k8sserviceaccount
```

### Helm chart (`helm-sync` container)

Adapted (not in the official docs): the comment on `spec.helm.namespace` now says it sets the release namespace (`.Release.Namespace`); the source comment says it is the namespace "where the chart resources will be deployed".

```yaml
apiVersion: configsync.gke.io/v1beta1
kind: RootSync
metadata:
  name: root-sync
  namespace: config-management-system
spec:
  sourceType: helm
  helm:
    repo: oci://us-central1-docker.pkg.dev/my-project/my-helm-repo
    chart: my-chart
    version: 1.2.0
    auth: gcpserviceaccount
    gcpServiceAccountEmail: my-service-account@my-project.iam.gserviceaccount.com
    releaseName: my-chart-release
    namespace: my-app-namespace # Release namespace; only templates that use .Release.Namespace
```

## Options / Props

| Feature | Git repository | OCI image | Helm chart |
|---------|----------------|-----------|------------|
| Best for | General purpose configuration management; flexibility; human-readability | Immutable, versioned configurations; leveraging container infrastructure | Packaging and distributing complex applications |
| Mutability | Mutable | Immutable | Mutable (chart versions are immutable, but values can change) |
| Rollbacks | Revert commits or change branches | Deploy previous image tag | Rollback to a previous chart version |
| Tooling | Standard Git clients, CI/CD pipelines | Docker or Podman, container registries | Helm CLI, Helm repositories |
| Performance | Can be slower for large repositories | Faster, especially at scale | Fast when fetching from a chart repository |
| Authentication | Flexible (SSH, token), can be more complex | Simplified with Workload Identity Federation for GKE (for example Artifact Registry) | Simplified with Workload Identity Federation for GKE (for example Artifact Registry) |

## Notes

- Git: configure repository URL, branch, and revision (commit or tag). OCI usually needs a separate build-and-push process (for example into Artifact Registry). Helm charts can be pulled from a Helm repository (such as Artifact Registry) or a Git repository; Config Sync can alternatively render Helm through Kustomize.
- Different source types can be mixed on one cluster, for example a `RootSync` from Git for platform resources, a `RepoSync` from a Helm chart in one namespace, and another `RepoSync` from an OCI image in another.
- Workload Identity Federation for GKE here is distinct from Workload Identity Federation for external workloads (AWS / Azure / OIDC), which is in `gcp-foundation`.
- Corrected from the official docs: the Helm example comment says `namespace` is the "Namespace where the chart resources will be deployed". The Config Controller setup page describes the same field as "the target namespace for a release. It only sets a namespace for resources that contain `namespace: {{ .Release.Namespace }}` in their templates" (default `config-management-system`). Templates that hard-code a namespace, or omit it without using `.Release.Namespace`, are not moved; check `metadata.namespace` in the rendered manifests.
- Source (`spec.helm.namespace` behavior): https://docs.cloud.google.com/kubernetes-engine/config-controller/docs/setup (retrieved 2026-11-16)
- Source: https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/concepts/sources-of-truth (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [config-sync-configs.md](./config-sync-configs.md)
- [config-sync-architecture.md](./config-sync-architecture.md)
- [installing-config-sync.md](./installing-config-sync.md)
