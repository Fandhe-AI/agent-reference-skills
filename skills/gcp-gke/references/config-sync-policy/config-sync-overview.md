---
source: https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/overview
---

# Config Sync overview

Config Sync is a GitOps service included with Google Kubernetes Engine (GKE) that automatically syncs configurations and policies across Kubernetes clusters from a central source of truth (a Git repository, OCI image, or Helm chart). It helps centrally manage fleets of clusters and prevent configuration drift.

## Signature / Usage

### Example RootSync (Git source)

Config Sync continuously reconciles a cluster to the source declared in a `RootSync` (cluster-wide) or `RepoSync` (namespace-scoped) object.

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

## Options / Props

| Advantage | Description |
|-----------|-------------|
| Integration with GKE and Google Cloud | Works with the Google Cloud console, Terraform, or Google Cloud CLI, and with Policy Controller, Workload Identity Federation for GKE, and Cloud Monitoring. |
| Built-in observability | Console dashboard with no extra setup shows sync status of all clusters and configs; the Google Cloud CLI can check reconciliation issues. |
| Scalable multi-cluster and multi-team management | Centralized platform administration plus delegated application management. |

| Use | Description |
|-----|-------------|
| Configuring clusters | Apply a common set of configuration and policies (for example Policy Controller constraints) to registered and connected clusters instead of repeatedly running `kubectl apply`. |
| Configuring namespaces | Provision namespaces with namespace-scoped policies such as RBAC roles to support multi-tenancy. |

## Notes

- Pricing: see GKE pricing (`https://docs.cloud.google.com/kubernetes-engine/pricing`).
- The RootSync snippet above is taken from https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/concepts/sources-of-truth (the overview page itself has no code).
- Policy Controller is deprecated; see [policy-controller-deprecation.md](./policy-controller-deprecation.md).
- Source: https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/kubernetes-engine/config-sync/docs/concepts/sources-of-truth (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [config-sync-architecture.md](./config-sync-architecture.md)
- [config-sync-sources-of-truth.md](./config-sync-sources-of-truth.md)
- [config-sync-configs.md](./config-sync-configs.md)
- [installing-config-sync.md](./installing-config-sync.md)
- [policy-controller-overview.md](./policy-controller-overview.md)
