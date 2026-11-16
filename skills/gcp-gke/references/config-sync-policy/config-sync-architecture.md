---
source: https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/concepts/architecture
---

# Config Sync architecture

Config Sync uses hosted components in Google Cloud and open source components on the GKE cluster to continuously reconcile cluster state with a central source of truth. The Fleet service manages the Config Sync components directly, without the legacy ConfigManagement Operator or `ConfigManagement` object; you must manually upgrade Config Sync as needed.

## Signature / Usage

### Override resource requests of non-reconciler components

`deploymentOverrides` in `apply-spec.yaml` (gcloud installation) sets requests and limits for Deployments that are not root or namespace reconcilers. Use `spec.override.resources` on a RootSync/RepoSync for reconcilers.

```yaml
applySpecVersion: 1
spec:
  configSync:
    enabled: true
    # ... other fields...
    deploymentOverrides:
    - name: reconciler-manager
      namespace: config-management-system
      containers:
      - name: reconciler-manager
        cpuRequest: 50m
        cpuLimit: 100m
        memoryRequest: 256Mi
        memoryLimit: 512Mi
```

## Options / Props

### Components added at each install step

| Step | Components |
|------|------------|
| Enabling Config Sync | `ConfigSync` CRD; `ConfigSync` object named `config-sync`; Deployment `reconciler-manager`; Deployment `resource-group-controller-manager`; Deployment `otel-collector`; optional Deployment `admission-webhook` (only if drift prevention is enabled) |
| Creating a `RootSync` | Reconciler Deployment `root-reconciler-ROOTSYNC_NAME` (`root-reconciler` for the `RootSync` named `root-sync`) |
| Creating a `RepoSync` | Reconciler Deployment `ns-reconciler-REPOSYNC_NAMESPACE-REPOSYNC_NAME-REPOSYNC_NAME_LENGTH` (`ns-reconciler-REPOSYNC_NAMESPACE` for the `RepoSync` named `repo-sync`) |

### Deployments

| Deployment | Namespace | Replicas | Containers |
|------------|-----------|----------|------------|
| `reconciler-manager` | `config-management-system` | 1 | 2: `reconciler-manager`, `otel-agent` |
| `root-reconciler` (one per `RootSync`) | `config-management-system` | 1 | 3-5 (see reconciler containers) |
| `ns-reconciler-.*` (one per `RepoSync`) | `config-management-system` | 1 | 3-5 |
| `otel-collector` | `config-management-monitoring` | 1 | 1: `otel-collector` (exports to Prometheus and Cloud Monitoring) |
| `resource-group-controller-manager` | `resource-group-system` | 1 | 2: `manager`, `otel-agent` |
| `admission-webhook` | `config-management-system` | 2 | 1: `admission-webhook` (only with drift prevention; disabled by default) |

### Deployment resource requests (same for all supported versions)

| Deployment | CPU request (m) per replica | Memory request (Mi) per replica |
|------------|-----------------------------|---------------------------------|
| `config-management-operator` | 100 | 200 |
| `resource-group-controller-manager` | 110 | 300 |
| `admission-webhook` (two replicas; double for totals) | 10 | 100 |
| `otel-collector` | 200 | 400 |
| `reconciler-manager` | 20 | 150 |

### Reconciler containers

| Container | Purpose | Condition |
|-----------|---------|-----------|
| `reconciler` | Syncing and drift remediation | Always |
| `otel-agent` | Sends metrics to the OpenTelemetry Collector | Always |
| `git-sync` | Pulls Git configs to a local directory | `spec.sourceType` is `git` |
| `helm-sync` | Pulls and renders Helm charts | `spec.sourceType` is `helm` |
| `oci-sync` | Pulls OCI images | `spec.sourceType` is `oci` |
| `gcenode-askpass-sidecar` | Caches Git credentials from the GKE metadata service | `spec.sourceType` is `git` and `spec.git.auth` is `gcenode` or `gcpserviceaccount` |
| `hydration-controller` | Builds Kustomize configurations | Source includes a `kustomize.yaml` file |

### Reconciler resource requests per container

| Container | Standard CPU (m) | Standard memory (Mi) | Autopilot CPU request and limit (m) | Autopilot memory request and limit (Mi) |
|-----------|------------------|----------------------|--------------------------------------|------------------------------------------|
| `reconciler` | 50 | 200 | 700 | 512 |
| `otel-agent` | 10 | 100 | 10 | 64 |
| `hydration-controller` (optional) | 10 | 100 | 200 | 256 |
| `git-sync` | 10 | 16 | 20 | 32 |
| `gcenode-askpass-sidecar` (optional) | 10 | 20 | 50 | 64 |
| `helm-sync` | 75 | 128 | 250 | 384 |
| `oci-sync` | 25 | 32 | 50 | 64 |

## Notes

- Reconciler Pods typically hold three to five containers; the source type decides which sync container is added.
- A validation webhook enforces a 63-character limit on the reconciler name `ns-reconciler-REPOSYNC_NAMESPACE-REPOSYNC_NAME-REPOSYNC_NAME_LENGTH`, even when the default `RepoSync` name is used.
- Fleet-created resources and objects (the `ConfigSync` object and the Deployments above) shouldn't be modified directly. Installation configuration can only be changed through the Google Cloud API; it can be monitored through either the Google Cloud API or the Kubernetes API.
- Each `RootSync`/`RepoSync` gets a `ResourceGroup` inventory object with the same name and namespace (for example `root-sync` in `config-management-system`). Don't create or modify `ResourceGroup` objects.
- Drift prevention (admission webhook) is optional; without it Config Sync still self-heals by reverting drift.
- By default the root reconciler of each `RootSync` has `cluster-admin` permission (can sync cluster- and namespace-scoped resources); change it with `spec.override.roleRefs`. `RepoSync` reconcilers use custom user-specified permissions in their namespace. `cluster-admin` is a broad grant; restrict it with `roleRefs` when only some resources are synced.
- The Fleet service can also manage the initial `RootSync` named `root-sync`; the fields exposed by `spec.configSync` of the config-management apply API are "managed" and editable only through the Google Cloud API, while unmanaged fields can be edited with `kubectl`. Manage `root-sync` with GitOps only through Config Connector or Terraform.
- Bundled Helm and Kustomize versions are in the `HELM_VERSION` and `KUSTOMIZE_VERSION` fields of the `Makefile` in `https://github.com/GoogleContainerTools/config-sync`.
- The example above is taken from https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/how-to/installing-config-sync (the architecture page itself has no code).
- Source: https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/concepts/architecture (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/how-to/installing-config-sync (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [config-sync-overview.md](./config-sync-overview.md)
- [installing-config-sync.md](./installing-config-sync.md)
- [config-sync-sources-of-truth.md](./config-sync-sources-of-truth.md)
